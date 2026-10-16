import { PLUGIN_ID } from "../config";

// The same check Tablechart's own `init()` does, which a presentation does not use.
// The old names work until the next minor version of Tablechart; remove this with them.

const OLD_NAMES: [string, string][] = [
	["--tablechart-duration", "--tablechart-animation-element-duration"],
	["--tablechart-stagger", "--tablechart-animation-stagger, a share of the element time"],
	["--tablechart-easing", "--tablechart-animation-ease"],
	["--tablechart-category-size", "--tablechart-name-size"],
	["--tablechart-category-padding", "--tablechart-name-padding"],
	["--tablechart-categories-gap", "--tablechart-name-gap"],
	["--tablechart-inside-align", "--tablechart-value-align"],
	["--tablechart-bar-ink", "--tablechart-bar-value-color"],
	["--tablechart-piece-ink", "--tablechart-piece-value-color"],
	["--tablechart-up-ink", "--tablechart-up-value-color"],
	["--tablechart-down-ink", "--tablechart-down-value-color"],
	["--tablechart-total-ink", "--tablechart-total-value-color"],
	["--tablechart-series-ink", "--tablechart-series-own-color"],
	["--tablechart-dash", "--tablechart-series-dash"],
	["--tablechart-dot", "--tablechart-series-dot"],
	["--tablechart-muted-share", "--tablechart-series-muted-share"],
	["--tablechart-rule-color", "--tablechart-baseline-color"],
	["--tablechart-rule-width", "--tablechart-baseline-width"],
	["--tablechart-rule-opacity", "--tablechart-baseline-opacity"],
	["--tablechart-key-size", "--tablechart-legend-key-size"],
	["--tablechart-controls-justify", "--tablechart-control-justify"],
	["--tablechart-controls-gap", "--tablechart-control-gap"],
];

const OLD_MOTIONS: Record<string, string> = { up: "grow", across: "sweep" };

/** Lists in the console, once, the old variable names, `animate` values and options that the charts still use. */
export const warnOldNames = (
	figures: HTMLElement[],
	config: { animate?: unknown; hover?: unknown }
): void => {
	const motion = (value: unknown) => {
		const now = OLD_MOTIONS[String(value)];
		return now ? [`"${value}" is now "${now}"`] : [];
	};
	const used = new Set(motion(config.animate));
	if (config.hover !== undefined) used.add(`the "hover" option is now "tooltip"`);
	for (const figure of figures) {
		if (figure.hasAttribute("data-chart-hover"))
			used.add("data-chart-hover is now data-chart-tooltip");
		const style = getComputedStyle(figure);
		for (const [old, now] of OLD_NAMES)
			if (style.getPropertyValue(old).trim()) used.add(`${old} is now ${now}`);
		for (const one of motion(figure.getAttribute("data-chart-animate"))) used.add(one);
	}
	if (!used.size) return;
	console.warn(
		`[${PLUGIN_ID}] ${[...used].join("; ")}. The old names work until the next minor version.`
	);
};
