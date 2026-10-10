import { type Config as TablechartConfig, defaultConfig as tablechartDefaults } from "@martinomagnifico/tablechart/core";

// The plugin id, and the prefix on anything this plugin prints to the console.
export const PLUGIN_ID = "tablechart";

// The hidden fragments that drive the steps of a stepped chart.
export const STEPS_CLASS = "tablechart-steps";

export { QUEUED_CLASS, SHOWN_CLASS } from "@martinomagnifico/tablechart/core";

/** How the charts in one group follow each other. See `Config.sequence`. */
export type Sequence = "together" | "delay" | "after";
export const SEQUENCES: readonly Sequence[] = ["together", "delay", "after"];

/** The options of Tablechart, and the ones only a presentation needs. */
export interface Config extends TablechartConfig {
	/**
	 * How the charts on one slide follow each other, as PowerPoint puts it:
	 * `together` starts them all at once, `delay` starts each `sequencedelay`
	 * milliseconds after the one before it started, and `after` starts each once
	 * the one before it has finished, `sequencedelay` later. A slide, or any
	 * element holding charts, says otherwise with `data-chart-sequence` and
	 * `data-chart-delay`.
	 */
	sequence: Sequence;
	/** Milliseconds between two charts in a `delay` or an `after` sequence. */
	sequencedelay: number;
	/** Load the stylesheet of the plugin by itself. */
	cssautoload: boolean;
	/** Where the stylesheet is, if it is not next to the plugin. */
	csspath: string;
}

export const defaultConfig: Config = {
	...tablechartDefaults,
	// Reveal's fragments step a chart, so it has no buttons of its own.
	controls: false,
	sequence: "together",
	sequencedelay: 0,
	cssautoload: true,
	csspath: "",
};
