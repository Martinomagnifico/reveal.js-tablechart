# Changelog

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
