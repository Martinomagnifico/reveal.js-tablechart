import "@martinomagnifico/tablechart/style.css";
import "../css/index.scss";

import { scatter } from "@martinomagnifico/tablechart/additional-types";
import {
	addType,
	build,
	type ChartState,
	entranceOf,
	layout,
	prepare,
	relabel,
	setShown,
	stepTo,
} from "@martinomagnifico/tablechart/core";
import {
	pluginDebug as debug,
	PluginBase,
	pluginCSS,
	type RevealInstance,
} from "reveal.js-plugintoolkit";
import {
	type Config,
	defaultConfig,
	PLUGIN_ID,
	QUEUED_CLASS,
	SEQUENCES,
	type Sequence,
	SHOWN_CLASS,
} from "./config";

// On the viewport while the deck measures its slides. See `measure` below.
const MEASURING_CLASS = "tablechart-measuring";

// The entrance signal: a container that animates in, for example with Appearance,
// says when it is shown and when it is in.
import { entranceTools } from "reveal.js-plugintoolkit";
import { createSteps, readMarkdownSteps, restep } from "./functions/steps";

const { pendingAround, whenShown } = entranceTools;

// The additional types of Tablechart: a presentation has every type, without loading another script.
addType("scatter", scatter);

// A figure inside something that announces its entrance, such as an Appearance
// container. It waits for the signal, and in a sequence it does not hide whole:
// its container is already in view.
const inContainer = (figure: HTMLElement): boolean => {
	for (
		let node = figure.parentElement;
		node && node.tagName !== "SECTION";
		node = node.parentElement
	) {
		if (node.dataset.entrance) return true;
	}
	return false;
};

// The longest transition the browser reports for a slide, in milliseconds. Read
// rather than assumed, so a deck's transition speed, a slide's own
// `data-transition-speed`, and `transition: "none"` all come out right.
const transitionMS = (section: HTMLElement | null): number =>
	Math.max(
		0,
		...getComputedStyle(section ?? document.body)
			.transitionDuration.split(",")
			.map((duration) => Number.parseFloat(duration) * 1000 || 0)
	);

const init = async (
	plugin: PluginBase<Config>,
	deck: RevealInstance,
	config: Config
): Promise<void> => {
	const deckConfig = deck.getConfig() as {
		debug?: boolean;
		view?: string;
		internation?: { langattribute?: string };
	};

	// Reveal settles this from the query string before a plugin starts, so a chart
	// knows it is going to paper while it is still being made. The older spelling is
	// read too, since a deck may still be linked to with it.
	const printing = deckConfig.view === "print" || /print-pdf/gi.test(window.location.search);

	if (debug && (config.debug || deckConfig.debug)) {
		debug.initialize(true, PLUGIN_ID);
		debug.log("Tablechart debugging enabled.");
	}

	const viewport = deck.getViewportElement() ?? document.body;
	const found = Array.from(viewport.querySelectorAll<HTMLElement>(config.selector));

	// The tooltip goes in the slides, so it has their scale on every screen, unless a deck says otherwise.
	config.tooltipparent ??= viewport.querySelector<HTMLElement>(".slides");
	if (!found.length) return;

	// Internation names the attribute it translates by; a deck using it with a
	// renamed attribute should get its chart labels tagged the same way.
	config.langattribute = deckConfig.internation?.langattribute || config.langattribute;

	// A chart from Markdown or from a JSON file becomes the same table an HTML chart
	// has, and translation keys are added. The fetch is awaited here, in init,
	// because Reveal starts the next plugin only once this one is done: a
	// translation plugin after Tablechart still finds every label. Then every
	// chart is built, with all its text, before anything is laid out.
	// A slide at a time: Internation translates per slide, so two charts may use the
	// same translation keys on different slides.
	const slides = new Map<Element, HTMLElement[]>();
	for (const element of found) {
		const slide = element.closest("section") ?? viewport;
		slides.set(slide, [...(slides.get(slide) ?? []), element]);
	}
	const figures = (
		await Promise.all([...slides.values()].map((group) => prepare(group, config)))
	).flat();
	// The colour behind a chart: its own --tablechart-surface, the background of its slide, or that of the deck.
	const behind = getComputedStyle(viewport).backgroundColor;
	const deckColour = behind && behind !== "rgba(0, 0, 0, 0)" ? behind : "Canvas";
	for (const figure of figures) {
		const style = getComputedStyle(figure);
		const own = style.getPropertyValue("--tablechart-surface").trim();
		const slide = figure.closest<HTMLElement>("section[data-background-color]")?.dataset
			.backgroundColor;
		const surface = own || slide || deckColour;
		if (own) figure.dataset.surface = "";
		else figure.style.setProperty("--tablechart-surface", surface);
		// A dark theme does not set `color-scheme: dark`, so a tooltip would be white with light text.
		if (!style.getPropertyValue("--tablechart-tooltip-surface").trim()) {
			figure.style.setProperty(
				"--tablechart-tooltip-surface",
				`oklch(from ${surface} calc(l + 0.06) c h)`
			);
		}
	}
	// On paper, and without animation, nobody steps through a chart, so it has no steps and is shown whole.
	const stepping = config.animate && !printing;
	if (stepping) for (const figure of figures) readMarkdownSteps(figure);

	const charts = figures
		.map((figure) => build(figure, stepping ? config : { ...config, animate: false }))
		.filter((state): state is ChartState => state !== null);
	// Tablechart plans the steps of a chart; Reveal's fragments drive them, one hidden fragment per step.
	for (const state of charts) if (state.plan) createSteps(state.figure, state.plan.indexes);

	// Internation before 2.1.0 looked up keys under the caption's generated id; `data-name` points it back to the slide.
	// TODO: remove once decks use Internation 2.1.0 or later, which always looks up keys under the slide.
	for (const { figure } of charts) {
		const caption = figure.querySelector<HTMLElement>(":scope > figcaption");
		if (!caption?.id || caption.dataset.name) continue;
		const scope = caption.parentElement?.closest<HTMLElement>("[id], [data-name]");
		const name = scope?.dataset.name || scope?.id;
		if (name) caption.dataset.name = name;
	}

	await pluginCSS(plugin, config);

	// Reveal centres a slide on the height it measures, and it measures before pass
	// 3 has given the figure one. Whatever pass 3 then adds hangs below the centre
	// the deck settled on, so the deck is asked to measure again. Only a deck that
	// opens straight onto a chart slide sees it — a reload with `history: true` —
	// because every later slide change lays the deck out anyway.
	//
	// Reveal measures the height a slide's content reaches, and an element that
	// another plugin such as Appearance is sliding in reaches further while it
	// moves. So while the deck measures, transforms on the slides are switched off,
	// and the slide is centred on where everything ends up. It is switched on again
	// before the browser draws anything, so nothing moves on screen.
	const measure = () => {
		viewport.classList.add(MEASURING_CLASS);
		// `layout()` has been on the deck since 3.x; the toolkit's interface only
		// names what the toolkit itself calls.
		(deck as unknown as { layout(): void }).layout();
		viewport.classList.remove(MEASURING_CLASS);
	};

	// Reveal lays the deck out again when the page has loaded, while elements may
	// be moving in. This runs right after it, so the slide is centred again before
	// it is drawn.
	window.addEventListener("load", measure, { once: true });

	// Deck-wide, and once a frame: a re-layout can resize the very figures that
	// asked for it, and one pass settles every chart that moved in that frame. Only
	// once the deck is ready: before that, the deck's own first layout measures the
	// charts as they are.
	let ready = false;
	deck.on("ready", () => {
		ready = true;
	});
	let recentring = false;
	// Not while the deck is moving. A chart on a slide that has just come within
	// reach is laid out then, and asks for this, but the slides that move are laid
	// out again in the middle of their transition, and Safari shows that as a jump.
	// The settle below measures once they have come to rest.
	let recentreLater = false;
	const recentre = () => {
		if (!ready || recentring) return;
		if (!settled) {
			recentreLater = true;
			return;
		}
		recentring = true;
		requestAnimationFrame(() => {
			recentring = false;
			measure();
		});
	};

	// What counts as a chart being up. A figure inside a fragment waits for that
	// fragment rather than for the slide: the same rule a list follows, where the
	// container opens and what is inside it builds. The nearest fragment decides, so
	// a figure in a fragmented panel follows the panel rather than itself.
	const shown = (state: ChartState): boolean => {
		if (!state.figure.closest("section")?.classList.contains("present")) return false;
		const fragment = state.figure.closest(".fragment");
		return fragment ? fragment.classList.contains("visible") : true;
	};

	// A figure is only shown once it has marks to show. A bar made inside a figure
	// that is already showing has no earlier style to animate from, so it arrives
	// finished — which is what a deck opening straight onto a chart slide does, and
	// why the numbers, made in pass 2, would animate there while the bars and the
	// connectors, made in pass 3, would not. The width each chart was last drawn at
	// doubles as the record of whether it has been drawn at all.
	const placed = new WeakMap<ChartState, number>();

	// False while the deck is moving. A chart drawn mid-transition is left to the
	// settle below, so that it animates on a slide that has come to rest.
	let settled = true;

	// True until the presenter first moves: a slide change or a fragment. With
	// `buildonload: false`, a chart on the slide the deck opens on is simply there,
	// as a reload leaves it, rather than building.
	let opening = true;

	// --- sequencing ---------------------------------------------------------------
	// Which charts start together, and how the rest follow them. The nearest element
	// naming a sequence holds a group; a chart with none is grouped by its slide,
	// under the deck's default. With reduced motion there is nothing to wait for, so
	// every group plays at once.
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

	const sequenceOf = (state: ChartState) => {
		const holder = state.figure.closest<HTMLElement>("[data-chart-sequence]");
		const asked = holder?.dataset.chartSequence;
		let mode: Sequence = config.sequence;
		if (asked && SEQUENCES.includes(asked as Sequence)) mode = asked as Sequence;
		else if (asked)
			console.warn(
				`Tablechart: data-chart-sequence="${asked}" is not one of ${SEQUENCES.join(", ")}.`
			);
		const delay = Number.parseFloat(holder?.dataset.chartDelay ?? "");
		return {
			group: holder ?? state.figure.closest("section"),
			mode: reduced.matches ? "together" : mode,
			delay: Number.isFinite(delay) ? delay : config.sequencedelay,
		};
	};

	// A group being played, shared by its charts. Leaving the slide, or stepping
	// back past a chart, calls the rest of it off, so no chart starts on a slide
	// nobody is looking at any more.
	const runs = new Map<ChartState, { live: boolean }>();

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// A chart has finished when every transition it started has. They are read off
	// the browser rather than worked out, so the stagger, the durations, the
	// annotations and whatever a deck has set its tokens to are all counted. A
	// frame first, so the class just set has become transitions to wait on.
	const finished = async (figure: HTMLElement): Promise<void> => {
		await new Promise(requestAnimationFrame);
		await Promise.allSettled(figure.getAnimations({ subtree: true }).map((a) => a.finished));
	};

	// A chart in something that animates in, such as a panel animated by Appearance
	// or a fragment, starts when that animation is halfway (or `data-chart-entrance`), so it builds in a panel
	// that can already be seen. Everything between the figure and its slide counts,
	// and the figure itself, but only for an animation: its own fade is a transition.
	// A frame first, because the plugin that animates may react to the same event
	// after this one. Without an animation, or with reduced motion, there is nothing
	// to wait for.
	const entrance = async (state: ChartState): Promise<void> => {
		if (reduced.matches) return;
		// A container that announces itself says when it is far enough in, so that is
		// waited for instead of worked out. What follows is for animations that do not
		// announce.
		if (pendingAround(state.figure, "shown").length) {
			await whenShown(state.figure, "shown");
			return;
		}
		await new Promise(requestAnimationFrame);
		const animations: Animation[] = state.figure
			.getAnimations()
			.filter((a) => a instanceof CSSAnimation);
		for (
			let parent = state.figure.parentElement;
			parent && parent.tagName !== "SECTION";
			parent = parent.parentElement
		) {
			animations.push(...parent.getAnimations());
		}
		let left = 0;
		for (const animation of animations) {
			const timing = animation.effect?.getComputedTiming();
			const duration = Number(timing?.activeDuration ?? 0);
			if (!timing || !Number.isFinite(duration)) continue;
			const moment = Number(timing.delay ?? 0) + duration * entranceOf(state.figure, config);
			left = Math.max(left, moment - Number(animation.currentTime ?? 0));
		}
		if (left > 0) await wait(left);
	};

	const play = async (charts: ChartState[], mode: Sequence, delay: number) => {
		const run = { live: true };
		for (const state of charts) runs.set(state, run);
		// A sequence of charts in containers that come in plays once they are all in:
		// the containers first, then the charts in turn.
		if (mode !== "together" && charts.some((state) => inContainer(state.figure))) {
			await Promise.all(charts.map((state) => whenShown(state.figure, "in")));
			if (!run.live) return;
		}
		for (const [i, state] of charts.entries()) {
			if (i > 0) {
				if (mode === "after") await finished(charts[i - 1].figure);
				if (delay) await wait(delay);
			}
			await entrance(state);
			if (!run.live) return;
			state.figure.classList.remove(QUEUED_CLASS);
			setShown(state, true);
		}
	};

	const sync = () => {
		const groups = new Map<Element, { mode: Sequence; delay: number; charts: ChartState[] }>();

		for (const state of charts) {
			const taken = restep(state.figure);
			if (taken !== null) stepTo(state, taken);

			if (!(placed.has(state) && shown(state))) {
				const up = state.figure.classList.contains(SHOWN_CLASS);
				// With `replay: false`, a chart that has built stays built. Not one with
				// steps, which follows its fragments.
				if (up && !config.replay && !state.plan) continue;
				const run = runs.get(state);
				if (run) run.live = false;
				runs.delete(state);
				// On a slide that has gone, nobody sees the marks move back, so they are
				// back at once, rather than building backwards off screen for seconds.
				setShown(
					state,
					false,
					up && !state.figure.closest("section")?.classList.contains("present")
				);
				// A chart in a sequence is hidden whole until its turn comes round, so
				// coming back to the slide does not flash the frames of charts to come.
				// Not in a container, which is in view already.
				state.figure.classList.toggle(
					QUEUED_CLASS,
					sequenceOf(state).mode !== "together" && !inContainer(state.figure)
				);
				continue;
			}

			// Already up, or already waiting its turn.
			if (state.figure.classList.contains(SHOWN_CLASS) || runs.has(state)) continue;

			// On the slide the deck opens on, without `buildonload`: there at once, its
			// text and annotations too. Not in a container that comes in, such as an
			// Appearance panel, which builds when it is in.
			if (opening && !config.buildonload && !inContainer(state.figure)) {
				state.figure.classList.remove(QUEUED_CLASS);
				setShown(state, true, true);
				continue;
			}

			const { group, mode, delay } = sequenceOf(state);
			if (mode === "together" || !group) {
				state.figure.classList.remove(QUEUED_CLASS);
				void play([state], "together", 0);
				continue;
			}
			// Not in a container, which is in view already.
			if (!inContainer(state.figure)) state.figure.classList.add(QUEUED_CLASS);
			const members = groups.get(group) ?? { mode, delay, charts: [] };
			members.charts.push(state);
			groups.set(group, members);
		}

		// In the order they stand in the document, which is the order they are read.
		for (const { mode, delay, charts } of groups.values()) void play(charts, mode, delay);
	};

	// Once a frame, so the charts placed in the same frame, as on a page that opens
	// on their slide, start as one group and keep their sequence.
	let syncing = false;
	const syncSoon = () => {
		if (syncing) return;
		syncing = true;
		requestAnimationFrame(() => {
			syncing = false;
			sync();
		});
	};

	// Pass 3, whenever a figure has a width. A slide that is not showing has none,
	// so this cannot be done here and now. The observer stays connected, so a
	// resize re-places what is already there instead of rebuilding it.
	const place = (state: ChartState): void => {
		// Geometry follows the width and nothing else, so a resize that left the width
		// alone has nothing to redraw. It matters because pass 3 rebuilds every mark:
		// one rebuilt halfway through its animation loses it and lands finished.
		const width = state.plot.clientWidth;
		if (!width || width === placed.get(state)) return;

		const first = !placed.has(state);
		const before = state.figure.offsetHeight;
		if (!layout(state, config)) return;
		placed.set(state, width);
		if (state.figure.offsetHeight !== before) recentre();
		// On paper, nobody steps through the deck: every chart is shown whole.
		if (printing) setShown(state, true);
		// Reading the height above has settled the new marks' starting style, so the
		// class can land and be animated from rather than arriving with them —
		// through sync, so a chart placed late still takes its turn in a sequence.
		if (first && config.animate && settled) syncSoon();
	};

	for (const state of charts) {
		place(state);

		// The redraw happens a frame after the observer speaks, not inside it. Pass 3
		// changes the height of the very element being watched, and a resize made from
		// within a resize callback is what makes a browser report that its loop did
		// not settle — harmless, but it is an error in somebody's console. A frame
		// later it is an ordinary write, and the guard keeps a burst to one pass.
		//
		// A chart can also get taller without a new width, for example when a web
		// font has loaded and its text has grown. The deck is then asked to centre the
		// slide again, so a deck opened straight onto it is not left too high.
		let queued = false;
		let height = state.figure.offsetHeight;
		new ResizeObserver(() => {
			if (queued) return;
			queued = true;
			requestAnimationFrame(() => {
				queued = false;
				place(state);
				if (state.figure.offsetHeight !== height) {
					height = state.figure.offsetHeight;
					recentre();
				}
			});
		}).observe(state.figure);
	}

	// Numbers follow the document's language without the chart being rebuilt. The
	// names may now be longer or shorter, so the charts are laid out again, a frame
	// later, after a translation plugin has had its turn.
	new MutationObserver(() => {
		for (const state of charts) relabel(state, config);
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				for (const state of charts) {
					placed.delete(state);
					place(state);
				}
			})
		);
	}).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

	if (config.animate) {
		// A chart waits for its slide to come to rest: bars growing while the slide
		// they sit on is still moving read as one smeared gesture. Reveal only fires
		// slidetransitionend when a transition actually ran, so a timer as long as the
		// slide's own transition stands in for the decks and the steps that have none.
		// Whichever comes first wins, and the grace keeps that normally being the event.
		let settling: ReturnType<typeof setTimeout>;
		const settle = () => {
			clearTimeout(settling);
			settled = true;
			if (recentreLater) {
				recentreLater = false;
				recentre();
			}
			sync();
		};
		// Reveal sends slidetransitionend for the first transition that ends on any
		// section while a change runs, not only on the slide that moved. A section
		// elsewhere in the deck can end one straight away, and then the event comes
		// long before this slide has arrived. So the slide's own transitions, and its
		// stack's, are waited for. With none running this settles at once.
		deck.on("slidetransitionend", async () => {
			const slide = deck.getCurrentSlide();
			const stack = slide?.parentElement?.matches("section.stack")
				? slide.parentElement
				: null;
			const moving = [slide, stack]
				.flatMap((el) => (el ? el.getAnimations() : []))
				.filter((animation) => animation.playState === "running");
			// A transition that is cancelled, because the deck moved on, rejects.
			await Promise.all(moving.map((animation) => animation.finished.catch(() => undefined)));
			if (deck.getCurrentSlide() === slide) settle();
		});
		deck.on("slidechanged", () => {
			// Reveal goes to the slide in the address as it starts, before it is ready:
			// that is still the slide the deck opens on.
			if (ready) opening = false;
			settled = false;
			clearTimeout(settling);
			settling = setTimeout(settle, transitionMS(deck.getCurrentSlide()) + 50);
		});
		deck.on("ready", settle);

		// A fragment is a keypress rather than a move: nothing is sliding, so the
		// chart it holds can build at once. Going back hides it again, which resets
		// the marks so that the step can be played a second time.
		const step = () => {
			opening = false;
			sync();
		};
		deck.on("fragmentshown", step);
		deck.on("fragmenthidden", step);

		sync();
	}

	debug?.log?.(`Tablechart started ${charts.length} chart(s).`);
};

export default () => {
	const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
	return plugin.createInterface();
};
