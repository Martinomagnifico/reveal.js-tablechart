<!-- .slide: class="title-slide" -->

# Tablechart <!-- .element: class="title" -->

### for Reveal.js: Using Markdown <!-- .element: class="subtitle" -->

---

### A Markdown table

Write a Markdown table. To make it a chart, add a comment after it.

<div class="split">

| Season | Apples |
| --- | --- |
| Spring | 58 |
| Summer | 72 |
| Autumn | 70 |
<!-- .element: class="tablechart" data-chart="column" -->

```markdown [6]
| Season | Apples |
| --- | --- |
| Spring | 58 |
| Summer | 72 |
| Autumn | 70 |
<!-- .element: data-chart="column" -->
```

</div>

---

### Totals

If a label is bold, the row is a total. This is the same as `data-kind="total"` in HTML.

<div class="split">

| Step | Apples |
| --- | --- |
| **Picked** | 74.5 |
| Windfalls | 28.2 |
| **Pressed** | 102.7 |
<!-- .element: class="tablechart" data-chart="waterfall" -->

```markdown [3,5]
| Step | Apples |
| --- | --- |
| **Picked** | 74.5 |
| Windfalls | 28.2 |
| **Pressed** | 102.7 |
<!-- .element: data-chart="waterfall" -->
```

</div>

---

### Step by step

If a label is in italics, the row appears on a step. Reveal's fragment comment also works, and can set the step with `data-fragment-index`.

<div class="split">

| Grove | Apples |
| --- | --- |
| North | 58 |
| *South* | 72 |
| East <!-- .element: class="fragment" --> | 70 |
<!-- .element: class="tablechart" data-chart="column" -->

```markdown [4-5]
| Grove | Apples |
| --- | --- |
| North | 58 |
| *South* | 72 |
| East <!-- .element: class="fragment" --> | 70 |
<!-- .element: data-chart="column" -->
```

</div>

---

### A caption and annotations

If a paragraph starts with `: `, it is the caption. A list after it holds the annotations.

<div class="split">

| Season | Litres |
| --- | --- |
| Last season | 251.5 |
| This season | 279.6 |
<!-- .element: class="tablechart" data-chart="column" -->

: **Apple juice**  
thousands of litres

- bracket: +11%

```markdown [7-10]
| Season | Litres |
| --- | --- |
| Last season | 251.5 |
| This season | 279.6 |
<!-- .element: data-chart="column" -->

: **Apple juice**  
thousands of litres

- bracket: +11%
```

</div>

---

### Annotation options

Put options before the colon. If an item starts in italics, that text is shown above the callout.

<div class="split">

| Year | Apples per tree |
| --- | --- |
| 2016 | 41 |
| 2019 | 58 |
| 2022 | 77 |
| 2025 | 105 |
<!-- .element: class="tablechart" data-chart="column" -->

: **Apples per tree**

- trend years=9 at=0.46: *A year* +11%

```markdown [11]
| Year | Apples per tree |
| --- | --- |
| 2016 | 41 |
| 2019 | 58 |
| 2022 | 77 |
| 2025 | 105 |
<!-- .element: data-chart="column" -->

: **Apples per tree**

- trend years=9 at=0.46: *A year* +11%
```

</div>

---

### Several lines

Each value column is a line. The column header is the name of the line.

<div class="split">

| Year | North | South |
| --- | --- | --- |
| 2016 | 41 | 30 |
| 2019 | 58 | 39 |
| 2022 | 77 | 52 |
| 2025 | 105 | 61 |
<!-- .element: class="tablechart" data-chart="line" -->

: **Apples per tree**

```markdown [1]
| Year | North | South |
| --- | --- | --- |
| 2016 | 41 | 30 |
| 2019 | 58 | 39 |
| 2022 | 77 | 52 |
| 2025 | 105 | 61 |
<!-- .element: data-chart="line" -->

: **Apples per tree**
```

</div>

---

### Highlight a line

If a header is bold, the other lines are shown fainter. If a header is in italics, that line appears on a step.

<div class="split">

| Year | **North** | South | *East* |
| --- | --- | --- | --- |
| 2016 | 41 | 30 | 22 |
| 2019 | 58 | 39 | 35 |
| 2022 | 77 | 52 | 41 |
| 2025 | 105 | 61 | 70 |
<!-- .element: class="tablechart" data-chart="line" -->

: **Apples per tree**

- trend years=9 at=0.4: *A year* +11%

```markdown [1,11]
| Year | **North** | South | *East* |
| --- | --- | --- | --- |
| 2016 | 41 | 30 | 22 |
| 2019 | 58 | 39 | 35 |
| 2022 | 77 | 52 | 41 |
| 2025 | 105 | 61 | 70 |
<!-- .element: data-chart="line" -->

: **Apples per tree**

- trend years=9 at=0.4: *A year* +11%
```

</div>

---

### From a JSON file

If the data is in a JSON file, put the comment on the caption and set `data-chart-src` to the file.

<div class="split">

: **What happened to the crop**  
thousands of apples
<!-- .element: class="tablechart" data-chart="waterfall" data-chart-src="assets/data/crop.json" -->

<div class="stack">

```markdown [3]
: **What happened to the crop**  
thousands of apples
<!-- .element: data-chart="waterfall" data-chart-src="assets/data/crop.json" -->
```

```json
[
  { "label": "Picked", "value": "74.5", "kind": "total" },
  { "label": "Windfalls", "value": "28.2" },
  { "label": "Bruised", "value": "-16.1" },
  { "label": "Peelings", "value": "-13.3" },
  { "label": "Pressed", "value": "73.3", "kind": "total" }
]
```

</div>
</div>

---

#### That's it!

For everything else Tablechart does, see the [other demos](demo.html).
