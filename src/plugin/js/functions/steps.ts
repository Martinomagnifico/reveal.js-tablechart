import { STEPS_CLASS } from "../config";

/**
 * Stepping a chart with Reveal's own fragments.
 *
 * A presenter talks over a chart, so the chart has to arrive in the order the talk
 * does: apples, the apple number, then pears. Reveal already has the mechanism for
 * that, and authors already know it, so a row asks for a step the way anything
 * else on a slide does, except that it asks with `data-fragment` rather than the
 * class. Reveal's stylesheet hides `.fragment` unconditionally, and these rows are
 * the accessible table: with scripting off, a class would empty it.
 *
 * Tablechart builds the chart as if it had no steps. This reads the steps from
 * the table, makes the fragments Reveal will drive (one hidden element per step),
 * and gives every mark two numbers: `--step`, the step that reveals it, and `--i`,
 * its place in the run that animates with it. A mark knows its row by `data-row`,
 * its column by `data-series` and its annotation by `data-note`.
 */

interface Row {
	fragment: boolean;
	fragmentIndex: string | null;
	step: number | null;
	slot: number;
}

interface Series {
	fragment: boolean;
	fragmentIndex: string | null;
	step: number | null;
}

interface Note {
	step: number | null;
	after: number;
}

/** The steps of one chart. Null for a chart without steps. */
export interface Plan {
	rows: Row[];
	series: Series[];
	notes: Note[];
	count: number;
}

const ANNOTATIONS = ["axis-break", "trend", "bracket"];
const MARKS = "em, i, .fragment";

// Moves a step from where Markdown could put it, an italic label or Reveal's own
// `<!-- .element: class="fragment" -->`, onto the row or header, and takes it off
// the element, so Reveal does not make that a step too.
const stepFrom = (to: Element, from: Element): void => {
	to.setAttribute("data-fragment", "");
	const index = from.getAttribute("data-fragment-index");
	if (index !== null) to.setAttribute("data-fragment-index", index);
	from.classList.remove("fragment");
	from.removeAttribute("data-fragment-index");
	if (!from.classList.length) from.removeAttribute("class");
};

// The one element a label is wrapped in, when nothing else is written beside it.
const wrapperOf = (cell: Element): Element | null => {
	const nodes = Array.from(cell.childNodes).filter(
		(node) =>
			node.nodeType === Node.ELEMENT_NODE ||
			(node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
	);
	return nodes.length === 1 && nodes[0] instanceof Element ? nodes[0] : null;
};

/**
 * Reads the steps a Markdown table asks for: an italic label, or a `.fragment` on
 * a cell, steps its row, and an italic header steps its column. Run after
 * Tablechart's `prepare`, before `build`.
 */
export const readMarkdownSteps = (figure: HTMLElement): void => {
	const cells = [
		...Array.from(figure.querySelectorAll("tbody tr")).map((tr) => ({ owner: tr, cells: Array.from(tr.children) })),
		...Array.from(figure.querySelector("thead tr:last-child")?.children ?? [])
			.slice(1)
			.map((th) => ({ owner: th, cells: [th] })),
	];
	for (const { owner, cells: list } of cells) {
		for (const cell of list) if (cell.classList.contains("fragment")) stepFrom(owner, cell);
		const label = list[0];
		if (!label) continue;
		for (let mark = wrapperOf(label); mark?.matches(MARKS); mark = wrapperOf(label)) {
			stepFrom(owner, mark);
			mark.replaceWith(...mark.childNodes);
		}
	}
};

/**
 * Works out which step reveals each row, column and annotation, and each row's
 * place in its run.
 *
 * `data-fragment` on the figure steps every row; on a row it steps that row alone.
 * Rows sharing a `data-fragment-index` share a step, which is how a group arrives
 * in one go. A row that asks for nothing is there from the start, so a chart can
 * open on its totals and step the movements in. A column that asks for a step
 * arrives whole on it. An annotation arrives with the last step of the rows it is
 * about, or on a step of its own with `data-fragment`.
 */
export const planSteps = (figure: HTMLElement): { plan: Plan; indexes: (string | null)[] } | null => {
	const everyRow = figure.hasAttribute("data-fragment");
	const trs = Array.from(figure.querySelectorAll("tbody tr"));
	const heads = Array.from(figure.querySelector("thead tr:last-child")?.children ?? []).slice(1);
	const rows: Row[] = trs.map((tr) => ({
		fragment: everyRow || tr.hasAttribute("data-fragment"),
		fragmentIndex: tr.getAttribute("data-fragment-index"),
		step: null,
		slot: 0,
	}));
	const series: Series[] = heads.map((th) => ({
		fragment: th.hasAttribute("data-fragment"),
		fragmentIndex: th.getAttribute("data-fragment-index"),
		step: null,
	}));
	const specs = Array.from(figure.querySelectorAll<HTMLElement>("[data-annotation]")).filter((spec) =>
		ANNOTATIONS.includes(spec.getAttribute("data-annotation") ?? "")
	);
	if (!rows.some((row) => row.fragment) && !series.some((one) => one.fragment) && !specs.some((spec) => spec.hasAttribute("data-fragment")))
		return null;

	const indexes: (string | null)[] = [];
	const byIndex = new Map<string, number>();
	const filled: number[] = [];
	const stepFor = (shared: string | null): number => {
		let step = shared !== null ? byIndex.get(shared) : undefined;
		if (step === undefined) {
			step = indexes.length;
			indexes.push(shared);
			filled.push(0);
			if (shared !== null) byIndex.set(shared, step);
		}
		return step;
	};

	let unstepped = 0;
	for (const row of rows) {
		if (!row.fragment) {
			row.slot = unstepped++;
			continue;
		}
		row.step = stepFor(row.fragmentIndex);
		row.slot = filled[row.step]++;
	}
	for (const one of series) if (one.fragment) one.step = stepFor(one.fragmentIndex);

	const notes: Note[] = specs.map((spec) => {
		const bracket = spec.getAttribute("data-annotation") === "bracket";
		const read = (name: string, fallback: number) => {
			const asked = Number.parseInt(spec.getAttribute(name) ?? "", 10);
			return Number.isFinite(asked) ? asked - 1 : fallback;
		};
		const [from, to] = bracket ? [read("data-from", 0), read("data-to", rows.length - 1)] : [0, rows.length - 1];
		let step: number | null = null;
		for (let i = Math.min(from, to); i <= Math.max(from, to); i++) {
			const own = rows[i]?.step;
			if (own !== null && own !== undefined && (step === null || own > step)) step = own;
		}
		const asked = Number.parseInt(spec.getAttribute("data-series") ?? "1", 10) - 1;
		const seriesStep = series[asked]?.step ?? null;
		if (seriesStep !== null && (step === null || seriesStep > step)) step = seriesStep;
		if (spec.hasAttribute("data-fragment")) step = stepFor(spec.getAttribute("data-fragment-index"));
		const after = step === null ? rows.length : rows.filter((row) => row.step === step).length;
		return { step, after };
	});

	return { plan: { rows, series, notes, count: indexes.length }, indexes };
};

/**
 * The fragments themselves: one hidden element per step, with any index a row
 * asked for, so a chart's steps interleave with the bullets around it.
 */
export const createSteps = (figure: HTMLElement, indexes: (string | null)[]): void => {
	if (!indexes.length) return;
	const holder = document.createElement("span");
	holder.className = STEPS_CLASS;
	holder.setAttribute("aria-hidden", "true");
	for (const index of indexes) {
		const element = document.createElement("span");
		element.className = "fragment";
		if (index !== null) element.setAttribute("data-fragment-index", index);
		holder.appendChild(element);
	}
	figure.appendChild(holder);
	figure.setAttribute("data-steps", "");
	// A step adds a row, so a stepped chart builds across, also when "up" is asked for.
	figure.setAttribute("data-chart-animate", "across");
};

/**
 * Gives every mark of a built chart its step and its place in the run. Run after
 * every layout, because a layout makes the marks in the drawing again.
 */
export const applySteps = (figure: HTMLElement, plan: Plan): void => {
	const last = plan.rows.length - 1;
	const set = (element: HTMLElement | SVGElement, step: number | null, name: string, place: number) => {
		element.style.setProperty(name, String(place));
		// A stepped chart takes one step per piece, not a share of the whole line.
		element.style.removeProperty("--d");
		if (step === null) element.style.removeProperty("--step");
		else element.style.setProperty("--step", String(step));
	};
	for (const element of figure.querySelectorAll<HTMLElement | SVGElement>("[data-row], [data-series], [data-note]")) {
		if (element.closest("table")) continue;
		const note = Number(element.dataset.note);
		if (note > 0) {
			const one = plan.notes[note - 1];
			if (one) set(element, one.step, "--after", one.after);
			continue;
		}
		const row = element.dataset.row ? Number(element.dataset.row) - 1 : last;
		const column = element.dataset.series ? plan.series[Number(element.dataset.series) - 1] : undefined;
		// A column on a step of its own takes every mark in it there, counted from its
		// first row; otherwise each mark goes with its row.
		if (column && column.step !== null) set(element, column.step, "--i", row);
		else if (plan.rows[row]) set(element, plan.rows[row].step, "--i", plan.rows[row].slot);
	}
};

/**
 * How far into a stepped chart the deck has got: how many of its own fragments
 * are showing. Counted rather than tracked, so arriving by a deep link, jumping
 * to a fragment index or stepping back all land on the same answer.
 */
export const restep = (figure: HTMLElement): void => {
	const steps = figure.querySelectorAll(`:scope > .${STEPS_CLASS} > .fragment`);
	if (!steps.length) return;
	let taken = 0;
	for (const step of steps) if (step.classList.contains("visible")) taken++;
	figure.style.setProperty("--tablechart-step", String(taken));
};
