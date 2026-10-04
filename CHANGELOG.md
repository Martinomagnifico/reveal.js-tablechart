# Changelog

## [Unreleased]

### Changed
- A chart inside an element that animates in, such as an Appearance container, builds when that element says it is shown, with the entrance signal of reveal.js-plugintoolkit 1.2.7. For elements animated by a plugin that does not give the signal, it still builds when their CSS animation is half way.
- A sequence (`data-chart-sequence`) of charts inside such elements waits until the elements are all in, then plays the charts in turn. Before, the sequence started its own timing at the same time as the elements, so a chart could build after its element and out of step with it.
- A chart waiting its turn inside such an element is no longer hidden whole: its caption and key show, and only its marks wait.

### Fixed
- A chart could start while its slide was still moving in. Reveal sends `slidetransitionend` for the first transition that ends on any section, and a section elsewhere in the deck can end one straight away. Tablechart now waits for the slide itself, and the stack it moves with, to finish moving. Appearance 1.4.3 had the same fix.

## [0.1.0]

### Added

- First version. Charts in a Reveal.js presentation, made with
  [Tablechart](https://martinomagnifico.github.io/tablechart/): column, bar,
  line, area, waterfall and donut charts, with annotations.
- A chart builds when its slide is shown, once the slide has stopped moving, and
  is reset when you leave the slide.
- A chart in a fragment builds when the fragment is shown. A chart inside an
  element that animates in builds when that animation is halfway.
- Steps: `data-fragment` on a row, a column header, an annotation or the figure,
  and `data-fragment-index` to share a step with other fragments.
- `data-chart-sequence` and `data-chart-delay` play the charts on a slide one
  after the other. The `sequence` and `sequencedelay` options set it for the
  whole presentation.
- Markdown: an element comment makes a table a chart. A bold name makes a total
  and an italic name a step.
- Works with Internation: translation keys use Internation's attribute, and are
  checked per slide.
- When printed, every chart is shown whole.
- In a presentation, chart text is `0.34em`, the background colour is the
  presentation's, and a legend has a thin box.
- When a presentation opens straight onto a slide, the slide is centred on where
  its content ends up, also while another plugin animates elements in.
