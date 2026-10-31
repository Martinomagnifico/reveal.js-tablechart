# Changelog

## [1.2.3] - 2026-10-31

### Changed
- Uses Tablechart 1.2.3 and its changes: numbers inside bars that choose between two colours, APCA from the draft of WCAG 3 as an option, and fixes for scatter charts, steps and Safari.
- The contrast check runs for every chart, also without `debug`. A PDF of the presentation has the same colours as the screen.
- Tablechart measures the colour behind a chart, so the plugin no longer sets `--tablechart-surface`. A chart on a card or on a slide with its own background no longer needs it.

### Removed
- The background in the colour of `--tablechart-surface` on a chart that sets it. The colour behind a chart is now measured, so the box no longer needs to show it.

### Deprecated
- `--tablechart-bar-value-color` and the other `-value-color` variables. They go in Tablechart 1.3.0; `--tablechart-value-on-dark` and `--tablechart-value-on-light` replace them.


## [1.2.2] - 2026-10-30

### Changed
- Uses Tablechart 1.2.2 and its changes: a line over columns, notes, colour ranges, readable numbers inside bars, and the same animation timing for every chart type.
- The background colour of a chart is that of its slide, or else that of the deck. A slide with its own background no longer needs `--tablechart-surface`.
- A chart with its own `--tablechart-surface` has that colour as its background. So the box shows the colour that its slices and lines are mixed with.
- A tooltip is a little lighter than the background colour of its chart. On a light slide it was dark.


## [1.1.3] - 2026-10-26

### Changed
- Uses Tablechart 1.1.3 and its changes: annotation badges and charts that show directly.
- A chart on the previous slide resets at once. Before, it built backwards off screen.

### Added
- `buildonload` option. `true` (the default) builds the charts on the slide the deck opens on, also after a reload. `false` shows them directly, with their labels and annotations.
- `replay` option. `true` (the default) builds a chart again each time its slide comes back. `false` builds it once, and it stays built. A chart with steps follows its fragments either way.

### Fixed
- Slides that move up or down no longer jump halfway through the transition. The plugin measured the deck again during the move, and its measuring rule also affected the vertical slides. It now leaves slides and chart marks alone, and measures once the slides have stopped moving.


## [1.1.2] - 2026-10-23

### Changed
- Uses Tablechart 1.1.2 and its changes: Performance fixes.


## [1.1.1] - 2026-10-23

### Changed
- Uses Tablechart 1.1.1 and its changes.


## [1.1.0] - 2026-10-23

Uses Tablechart 1.1.0.

### Added

- Scatter and bubble charts: `data-chart="scatter"`. Tablechart has them in its additional types; the plugin adds them, so a presentation needs no other script.
- A Scatter page in the demo.
- An axis and gridlines slide on the column, bar, line, area and waterfall pages, and in the main demo.
- The readme lists the chart types, with links to their demo pages.
- From Tablechart 1.1.0: a value axis (`data-chart-axis`) and gridlines (`data-chart-grid`), a reference line annotation, and `data-chart-animate="false"`.

### Removed

- The console list of old variable names and `animate` values. Tablechart 1.1.0 no longer has them.



## [1.0.7] - 2026-10-14

Uses Tablechart 1.0.7.

### Fixed
- Tooltip size error is now fixed.



## [1.0.6] - 2026-10-14

Uses Tablechart 1.0.6.

### Added

- Tooltips: on a chart that leaves numbers out, point at a row or tap it to see its values. The `tooltip` option and `data-chart-tooltip` set it: `"auto"` by default, `true` always, `false` never.
- `--tablechart-tooltip-surface`, `-color`, `-border`, `-radius`, `-padding` and `-shadow`.
- A Tooltips page in the demo, and a Tooltips slide in the main demo.

### Changed

- In a presentation, a tooltip has the background of the slide, a bit lighter. A dark theme does not say it is dark, so the tooltip was white with light text.
- The console also lists the old `hover` option and `data-chart-hover`.

### Removed

- The band behind a row that is pointed at, and `--tablechart-pointer-color`: the tooltip shows the row.

### Fixed

- A key that shows the next slide closes the tooltip, and the next slide does not open one under a mouse that rests. It stayed open for a moment while the next slide came in.




## [1.0.4] - 2026-10-14

Uses Tablechart 1.0.4.

### Added

- Values below zero on column, bar, line, area and waterfall charts, also in stacks.
- `data-chart-animate="sweep"` on a donut draws the ring in one sweep, and on a waterfall builds it at one speed.
- `--tablechart-animation-element-duration`, `--tablechart-animation-stagger` and `--tablechart-animation-max` set the timing of a chart.
- The console lists the old variable names and `animate` values that a presentation still uses.

### Changed

- A large chart builds within 2s.
- A waterfall builds one step at a time: a column, then its connector, then the next column.
- New names for the CSS variables, such as `--tablechart-animation-` and `--tablechart-name-`. The old names work until the next minor version.
- `data-chart-animate` takes `grow` and `sweep`. `up` and `across` are the old names.
- The demo uses the new variable names and `grow`.

### Removed

- The `closing` option and `data-chart-closing`. The last total of a waterfall always grows from the last connector to the baseline, except when the columns is there at the start.

### Fixed

- A chart's hidden table no longer adds empty pages in print.
- With steps, the last total of a waterfall grows from the baseline if the column before it is not there yet.
- The link to the Data page in the readme.
- The "Animation speed" slide in the demo used a variable that does not exist.




## [1.0.2] - 2026-10-10

Now at version 1!

### Added

- Point by point steps: `data-fragment` on a cell. One line point by point, then the next.
- Stacked columns and bars build layer by layer, or piece by piece.

### Changed

- Steps are now handled by Tablechart itself.
- No Previous and Next buttons in a presentation: `controls` is `false` by default.
- A line or area with steps is one path, shown up to the last step taken.

### Fixed

- In a chart with steps, the legend is shown from the start.
- In a donut with steps, the number in the middle comes with the last slice.




## [0.1.3] - 2026-10-07

### Added

- Smooth lines and areas: `data-chart-shape="smooth"`.
- Lines and areas that grow up from zero: `data-chart-animate="up"`.
- `data-chart-entrance` and the `entrance` option: how far an element that animates in is in before its chart builds.

### Changed

- A chart in an Appearance container builds when the container says it is shown.
- A sequence of charts in such containers waits until all of them are in.
- A chart waiting its turn in such a container shows its caption and key.

### Fixed

- A chart could start while its slide was still moving in.
- A sequence on the first slide of a presentation now plays in turn.




## [0.1.0]

First version: Tablechart charts in Reveal.js.

### Added

- Charts build when their slide is shown, and reset when you leave it.
- Charts in fragments and in elements that animate in.
- Steps with `data-fragment` and `data-fragment-index`.
- Sequences with `data-chart-sequence` and `data-chart-delay`.
- Charts from Markdown tables.
- Works with Internation.
- Charts are shown whole when printed.
