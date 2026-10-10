import { STEPS_CLASS } from "../config";

// Stepping a chart with Reveal's fragments: Tablechart plans the steps (`data-fragment`), and one hidden fragment per step drives them.

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
};

/**
 * How far into a stepped chart the deck has got: how many of its own fragments
 * are showing. Counted rather than tracked, so arriving by a deep link, jumping
 * to a fragment index or stepping back all land on the same answer.
 */
export const restep = (figure: HTMLElement): number | null => {
	const steps = figure.querySelectorAll(`:scope > .${STEPS_CLASS} > .fragment`);
	if (!steps.length) return null;
	let taken = 0;
	for (const step of steps) if (step.classList.contains("visible")) taken++;
	return taken;
};
