# Changelog

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
