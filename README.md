# Tablechart for Reveal.js

Simple charts in a Reveal.js presentation.

This plugin uses [Tablechart](https://martinomagnifico.github.io/tablechart/).
The chart types, annotations, numbers, translation keys and styling are described
there. This README only describes what is different in a presentation.


[<img src="screenshot.png" width="100%">](https://martinomagnifico.github.io/reveal.js-appearance/demo/demo.html)


## Install

Download the `plugin/tablechart` folder, and add it to your presentation:

```html
<script src="plugin/tablechart/tablechart.js"></script>
<script>
	Reveal.initialize({
		plugins: [Tablechart]
	});
</script>
```

The plugin loads its stylesheet by itself. To load it yourself, for example to
change it, set `cssautoload: false` and link `plugin/tablechart/tablechart.css`.

Or install it with npm:

```sh
npm install reveal.js-tablechart
```

```js
import Reveal from "reveal.js";
import Tablechart from "reveal.js-tablechart";
import "reveal.js-tablechart/tablechart.css";

Reveal.initialize({
	plugins: [Tablechart]
});
```

## A chart

A chart is a `figure` with `data-chart` and a table in it:

```html
<section>
	<figure data-chart="column">
		<figcaption><b>Apples picked</b><br><span>thousands</span></figcaption>
		<table>
			<tbody>
				<tr><th>Spring</th><td>58</td></tr>
				<tr><th>Summer</th><td>72</td></tr>
				<tr><th>Autumn</th><td>70</td></tr>
			</tbody>
		</table>
	</figure>
</section>
```

For the chart types and everything a table can say, see
[Data](https://martinomagnifico.github.io/tablechart/features/data.html) and the
chart types on the Tablechart site.

## When a chart builds

A chart builds when its slide is shown, once the slide has stopped moving. When
you leave the slide, the chart is reset, so it builds again when you come back.

If the figure is a fragment, or is inside one, the chart builds when that
fragment is shown:

```html
<figure class="fragment" data-chart="column">…</figure>
```

If the chart is inside an element that animates in, for example with
[Appearance](https://github.com/martinomagnifico/reveal.js-appearance), the chart
builds when that element says it is shown: half way in, unless the element says
otherwise with `data-entrance-at`. This is the entrance signal of
[reveal.js-plugintoolkit](https://github.com/martinomagnifico/reveal.js-plugintoolkit),
so it works with any plugin that gives it. For an element animated by a plugin
that does not give the signal, the chart builds when its CSS animation is half way.

## Steps

Add `data-fragment` to a row to show it on a step of its own. A row without it is
there from the start, so a chart can start with its totals.

```html
<tr data-fragment><th>Apples</th><td>128</td></tr>
<tr data-fragment><th>Pears</th><td>94</td></tr>
```

- Rows with the same `data-fragment-index` arrive together. The index is
  Reveal's own, so the steps of a chart can take turns with other fragments on
  the slide.
- `data-fragment` on the figure gives every row a step.
- `data-fragment` on a column header shows that line, or those bars, on a step of
  their own.
- An annotation arrives with the last step of the rows it is about.
  `data-fragment` on the annotation gives it a step of its own.

The rows ask with an attribute, not with the `fragment` class: Reveal hides
elements with that class, and the table must stay readable for screen readers.

## Several charts on a slide

`data-chart-sequence` on a slide, or on an element around the charts, plays them
one after the other, in the order they are in the page:

```html
<section data-chart-sequence="after" data-chart-delay="200">
	<figure data-chart="column">…</figure>
	<figure data-chart="column">…</figure>
</section>
```

| `data-chart-sequence` | Plays |
| --- | --- |
| `together` | every chart at once. This is the default. |
| `delay` | each chart `data-chart-delay` milliseconds after the one before it started |
| `after` | each chart once the one before it has finished, `data-chart-delay` milliseconds later |

The `sequence` and `sequencedelay` options set this for the whole presentation.

If the charts are inside elements that animate in, such as cards animated by
Appearance, the elements come in first. Once they are all in, the charts play one
after the other. A chart waiting its turn in such an element shows its caption and
key, and only its marks wait.

Without a sequence, each chart in such an element builds when its own element is
shown, so the animations of the elements set the timing.

## Markdown

With Reveal's Markdown plugin, add `data-chart` to a table with an element
comment after it. A paragraph that starts with `: ` is the title:

```markdown
: **Apples picked**

| Season | Apples |
| --- | --- |
| Spring | 58 |
| *Summer* | 72 |
| Autumn | 70 |
<!-- .element: data-chart="column" -->
```

- A name in **bold** in the first column makes the row a total.
- A name in *italics* shows the row on a step of its own. Reveal's
  `<!-- .element: class="fragment" -->` in a cell does the same, and can set
  `data-fragment-index`.
- In the header, a name in bold is highlighted, and a name in italics arrives on
  a step of its own.
- A list after the table is the annotations, such as `- bracket from=2 to=4: +24%`.

## Translation

The plugin works with
[Internation](https://github.com/martinomagnifico/reveal.js-internation). Add
`data-chart-keys` to a figure, and Internation translates the names in the chart
like other text on the slide. The numbers change with the language. Two charts
on the same slide need different keys; on different slides they may be the same.

If Internation uses another attribute than `data-i18n`, the plugin uses that one
too. See
[Translation](https://martinomagnifico.github.io/tablechart/features/translation.html).

## Print

When the presentation is printed, with `?print-pdf`, every chart is shown whole,
without steps.

## Options

The options go in `tablechart` in the Reveal.js settings:

```js
Reveal.initialize({
	tablechart: {
		sequence: "together",
		legend: false
	},
	plugins: [Tablechart]
});
```

| Option | Default | Sets |
| --- | --- | --- |
| `sequence` | `"together"` | How the charts on a slide follow each other: `together`, `delay` or `after` |
| `sequencedelay` | `0` | The time between two charts in a sequence, in milliseconds |
| `animate` | `true` | If `false`, charts are shown whole, without animation and steps |
| `cssautoload` | `true` | Loads the stylesheet of the plugin |
| `csspath` | `""` | Where the stylesheet is, if it is not next to the plugin |

All other options are the same as in Tablechart. See
[Options](https://martinomagnifico.github.io/tablechart/reference/options.html).

## Styling

Charts use the text colour of the slide. In a presentation, the plugin sets a
few things differently from Tablechart:

- The text of a chart is smaller, `0.34em`, because the text of a slide is large.
  `--tablechart-font-size` changes it.
- The background colour of a chart is the background of the presentation,
  `--r-background-color`.
- A legend has a thin box around it.

For colours, light and dark slides and all CSS variables, see
[Styling](https://martinomagnifico.github.io/tablechart/styling/index.html).

## License

MIT licensed. Copyright © 2026 Martijn De Jongh (Martino).
