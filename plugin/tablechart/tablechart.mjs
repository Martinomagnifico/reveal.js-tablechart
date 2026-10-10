 /*****************************************************************
 *
 * reveal.js-tablechart for Reveal.js 
 * Version 1.0.2
 * 
 * @link
 * https://github.com/martinomagnifico/reveal.js-tablechart
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT
 * 
 * Copyright (C) 2026 Martijn De Jongh (Martino)
 *
 ******************************************************************/


//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = "tablechart", u = "tablechart-plot", d = "tablechart-categories", f = "tablechart-value", p = "tablechart-bar", m = "tablechart-piece", h = "tablechart-rule", g = "tablechart-connector", _ = "tablechart-line", v = "tablechart-head", y = "tablechart-badge", b = "tablechart-caption", x = "tablechart-slice", S = "tablechart-divide", C = "tablechart-series", w = "tablechart-area", T = "tablechart-area-fill", E = "tablechart-name", D = "tablechart-legend", O = "tablechart-point", k = "tablechart-hole", A = "tablechart-centre", j = "tablechart-leader", M = "tablechart-break", N = "is-placed", P = "tablechart-pointer", F = "tablechart-sr", I = "tablechart-minus", L = "is-shown", R = "tablechart-queued", z = "tablechart-controls", B = 1e3, ee = {
	selector: "[data-chart]",
	aspect: .38,
	barfill: .58,
	ringfill: .42,
	animate: !0,
	entrance: .5,
	labels: "outside",
	shape: "straight",
	closing: "down",
	legend: !1,
	hover: !0,
	totallabel: "Total",
	controls: !0,
	previouslabel: "Previous",
	nextlabel: "Next",
	stephint: "step of the chart",
	threshold: .5,
	replay: !1,
	langattribute: "data-i18n"
}, V = (e, t) => `${e}:${t}`, te = "http://www.w3.org/2000/svg", H = (e) => Math.round(e * 100) / 100, U = (e, t = {}) => {
	let n = document.createElementNS(te, e);
	for (let e in t) {
		let r = t[e];
		n.setAttribute(e, String(typeof r == "number" ? H(r) : r));
	}
	return n;
}, W = (e, t) => [e, ...t.classes].join(" "), G = (e, t) => {
	let n = document.createElement("span");
	return n.className = e, n.inert = !0, t.appendChild(n), n;
}, K = (e, t, n, r, i) => {
	e.style.left = `${t / r * 100}%`, e.style.top = `${n / i * 100}%`;
}, q = 0, ne = (e, t, n, r) => {
	if (!t.length) return;
	let i = `tablechart-cut-${++q}`, a = U("mask", {
		id: i,
		maskUnits: "userSpaceOnUse"
	});
	a.appendChild(U("rect", {
		x: -n,
		y: -r,
		width: n * 3,
		height: r * 3,
		fill: "white"
	}));
	for (let e of t) e.setAttribute("fill", "black"), a.appendChild(e);
	let o = e.querySelector(":scope > defs");
	o || (o = U("defs"), e.prepend(o)), o.appendChild(a);
	let s = U("g", { mask: `url(#${i})` });
	for (let t of Array.from(e.childNodes)) t !== o && s.appendChild(t);
	e.appendChild(s);
}, re = 0, ie = (e) => Array.from(e.querySelectorAll(`.${p}`)).map((e) => {
	let t = e.tagName === "rect" ? [e] : Array.from(e.querySelectorAll("rect")), n = (e, t) => Number(e.getAttribute(t)), r = Math.min(...t.map((e) => n(e, "x"))), i = Math.min(...t.map((e) => n(e, "y"))), a = Math.max(...t.map((e) => n(e, "x") + n(e, "width"))), o = Math.max(...t.map((e) => n(e, "y") + n(e, "height")));
	return {
		row: Number(e.dataset.row),
		x: r,
		y: i,
		width: a - r,
		height: o - i,
		sideways: e.dataset.grow === "right"
	};
}), ae = {
	create: () => null,
	draw(e, t, n) {
		let { rows: r, y: i, svg: a, breakAt: o } = n;
		if (o === null) return;
		let s = e.getAttribute("data-mark") === "zigzag", c = (e, t) => {
			let n = e.sideways ? e.height : e.width, r = n * .09, i = n + r * 2, a = i * .3, o = i * .06;
			if (e.sideways) {
				let n = e.y - r;
				if (!s) return [[t - a / 2, n], [t + a / 2, n + i]];
				let c = i / 3;
				return [
					[t - o, n],
					[t + o, n + c],
					[t - o, n + 2 * c],
					[t + o, n + i]
				];
			}
			let c = e.x - r;
			if (!s) return [[c, t + a / 2], [c + i, t - a / 2]];
			let l = i / 3;
			return [
				[c, t + o],
				[c + l, t - o],
				[c + 2 * l, t + o],
				[c + i, t - o]
			];
		}, l = (e, t = !1) => e.map(([e, t], n) => `${n === 0 ? "M" : "L"} ${e.toFixed(1)} ${t.toFixed(1)}`).join(" ") + (t ? " Z" : ""), u = `tablechart-break-${++re}`, d = U("mask", {
			id: u,
			maskUnits: "userSpaceOnUse"
		});
		d.appendChild(U("rect", {
			x: -1e3,
			y: -n.height,
			width: B * 3,
			height: n.height * 3,
			fill: "white"
		}));
		let f = [], p = i(o);
		for (let e of ie(a)) {
			let t = e.sideways ? n.breakX : p;
			if (t === void 0 || !(e.sideways ? e.x < t && e.x + e.width > t : e.y < p && e.y + e.height > p)) continue;
			let [i, o] = e.sideways ? [c(e, t), c(e, t + n.breakGap)] : [c(e, p - n.breakGap), c(e, p)];
			d.appendChild(U("path", {
				d: l([...i, ...o.slice().reverse()], !0),
				fill: "black"
			})), f.push(i, o);
			let s = V("--after", r[e.row - 1]?.slot ?? 0);
			for (let e of [i, o]) a.appendChild(U("path", {
				class: M,
				"data-part": "edge",
				"data-note": n.note,
				d: l(e),
				style: s
			}));
		}
		if (!f.length) return;
		let m = Array.from(a.querySelectorAll(`.${M}`)), h = U("g", { mask: `url(#${u})` });
		for (let e of Array.from(a.childNodes)) m.includes(e) || h.appendChild(e);
		let g = U("defs");
		g.appendChild(d), a.prepend(g, h);
	}
}, J = (e) => {
	let t = -Infinity;
	for (let n of e) t = Math.max(t, n);
	return t;
}, oe = (e) => (e.split(/[.,]/)[1] || "").length, se = (e, t) => new Intl.NumberFormat(t || document.documentElement.lang || void 0, {
	minimumFractionDigits: e,
	maximumFractionDigits: e
}), ce = (e, t, n) => {
	let r = se(t, n).formatToParts(e), i = r[0]?.type === "minusSign" ? r[0].value : "";
	return [i, r.slice(+!!i).map((e) => e.value).join("")];
}, le = (e) => Number.parseFloat((e.match(/-?[\d.,]+/) || ["NaN"])[0].replace(",", ".")), ue = (e, t) => {
	let n = document.createElement("span");
	if (n.className = y, n.inert = !0, e.childElementCount > 0) for (let t of Array.from(e.children)) n.appendChild(t.cloneNode(!0));
	else {
		n.textContent = (e.textContent || "").trim();
		let t = e.getAttribute("data-i18n");
		t && n.setAttribute("data-i18n", t);
	}
	return t.appendChild(n), n;
}, de = (e, t, n, r) => {
	let i = le(e?.textContent || ""), a = Number.isNaN(i) ? !0 : Math.abs(t - i) <= .5, o = {
		label: n,
		computed: t,
		stated: i,
		agrees: a
	};
	r.checks.push(o), a || console.warn(`[${l}] An annotation reads ${i}%, but ${n} is ${t.toFixed(1)}%. The chart shows what you wrote; this is only a check.`);
}, fe = (e, t) => (t - e) / Math.abs(e) * 100, pe = (e, t) => {
	let n = (t, n) => {
		let r = Number.parseInt(e.getAttribute(t) ?? "", 10);
		return Number.isFinite(r) ? r - 1 : n;
	};
	return [n("data-from", 0), n("data-to", t - 1)];
}, me = {
	create: ue,
	draw(e, t, n) {
		let { rows: r, cx: i, y: a, unit: o, labelHeight: s, badgeHeight: c, height: u, svg: d, after: f } = n, [p, m] = pe(e, r.length), h = r[p], g = r[m];
		if (!h || !g) {
			console.warn(`[${l}] A bracket points at a row that is not there (row ${p + 1} to ${m + 1}, of ${r.length}).`);
			return;
		}
		let y = 7 * o, b = 4 * o, x = i(p), S = i(m), C = Math.min(a(h.value), a(g.value)) - s - b - c * .9, w = (e) => a(e) - s - b, T = `M ${x} ${w(h.value)} L ${x} ${C} L ${S} ${C} L ${S} ${w(g.value) - y}`, E = (w(h.value) - C + Math.abs(S - x) + (w(g.value) - y - C)) / o + 1;
		d.appendChild(U("path", {
			class: _,
			"data-note": n.note,
			d: T,
			style: `--len:${E.toFixed(1)}; ${V("--after", f)}`
		}));
		let D = w(g.value);
		d.appendChild(U("polygon", {
			class: v,
			"data-note": n.note,
			points: `${S},${D} ${S - y * .45},${D - y} ${S + y * .45},${D - y}`,
			style: V("--after", f)
		})), t && (K(t, (x + S) / 2, C, B, u), t.style.setProperty("--after", String(f))), de(t, fe(h.value, g.value), `${h.value} to ${g.value}`, n);
	}
}, he = /* @__PURE__ */ new WeakMap(), ge = (e) => {
	let t = [...e].filter((e) => !!e), n = t.map((e) => ({
		width: e.offsetWidth,
		height: e.offsetHeight
	}));
	t.forEach((e, t) => he.set(e, n[t]));
}, Y = (e) => he.get(e) ?? {
	width: e.offsetWidth,
	height: e.offsetHeight
}, _e = (e, t, n) => ((t / e) ** (1 / n) - 1) * 100, ve = {
	create: ue,
	draw(e, t, n) {
		let { rows: r, cx: i, y: a, unit: o, labelHeight: s, height: c, svg: l, values: u, after: d } = n, f = r[0], p = r[r.length - 1];
		if (!f || !p) return;
		let m = s + 18 * o, h = 10 * o, g = 10 * o, y = i(0), b = a(f.value) - m, x = i(r.length - 1), S = a(p.value) - m, C = 0;
		r.forEach((e, t) => {
			let n = x === y ? 0 : (i(t) - y) / (x - y), r = b + n * (S - b) - (a(e.value) - m);
			r > C && (C = r);
		}), b -= C, S -= C;
		let w = x - y, T = S - b, E = Math.hypot(w, T) || 1, D = w / E, O = T / E;
		y -= D * h, b -= O * h, x += D * h, S += O * h;
		let k = Number.parseFloat(e.getAttribute("data-at") || "0.5");
		if (t) {
			let e = y + (x - y) * k, n = b + (S - b) * k, c = Y(t).width * o / 2, l = n + Y(t).height * o / 2 + 8 * o, d = 0;
			r.forEach((t, n) => {
				let r = (u[n] ? Y(u[n]).width : 0) * o / 2;
				if (Math.abs(i(n) - e) >= c + r) return;
				let f = a(t.value) - 7 * o - s;
				d = Math.max(d, l - f);
			}), b -= d, S -= d;
		}
		let A = x - D * g, j = S - O * g, M = Math.hypot(A - y, j - b) / o + 1;
		l.appendChild(U("line", {
			class: _,
			"data-note": n.note,
			x1: y,
			y1: b,
			x2: A,
			y2: j,
			style: `--len:${M.toFixed(1)}; ${V("--after", d)}`
		}));
		let N = -O, P = D, F = g * .42;
		l.appendChild(U("polygon", {
			class: v,
			"data-note": n.note,
			points: [
				`${x},${S}`,
				`${A + N * F},${j + P * F}`,
				`${A - N * F},${j - P * F}`
			].join(" "),
			style: V("--after", d)
		})), t && (K(t, y + (x - y) * k, b + (S - b) * k, B, c), t.style.setProperty("--after", String(d)));
		let I = Number.parseFloat(e.getAttribute("data-years") || "");
		!Number.isNaN(I) && I > 0 && de(t, _e(f.value, p.value, I), `${f.value} to ${p.value} over ${I} years`, n);
	}
}, ye = (e, t, n, r, i) => {
	if (!r) return e / t * n;
	let { lo: a, hi: o, gap: s, share: c } = r, l = n * c, u = (n - l - i) / (a + (t - o)), d = l / (o - a);
	return e <= a ? e * u : e <= s ? a * u + (e - a) * d : e <= o ? a * u + (e - a) * d + i : a * u + l + i + (e - o) * u;
}, be = (e, t, n) => {
	let r = .15, i = Math.min(e * .7 / (t + (t - 1) * r), n), a = t * i + (t - 1) * i * r;
	return {
		size: i,
		gap: i * r,
		offset: (e) => -a / 2 + e * i * 1.15
	};
}, xe = (e, t, n) => {
	let r = e.series[n], i = e.series.some((e) => e.focus) && !r.focus;
	return {
		"data-series": n + 1,
		...i && { "data-muted": "" },
		style: `--n:${n}; --m:${+!!i}; --palette:var(--tablechart-color-${n + 1}); ${V("--i", t.slot)}`
	};
}, X = (e, t) => {
	let n = 0;
	return Array.from({ length: t }, (t, r) => {
		let i = e.cells[r] ?? e.cells[0], a = n;
		return !i.missing && i.value > 0 && (n += i.value), {
			from: a,
			to: n,
			cell: i
		};
	});
}, Se = (e, t) => X(e, t).at(-1)?.to ?? 0, Ce = (e, t, n) => {
	let r = t.series.some((e) => e.focus);
	e.style.setProperty("--n", String(n)), e.style.setProperty("--m", r && !t.series[n].focus ? "1" : "0"), e.style.setProperty("--palette", `var(--tablechart-color-${n + 1})`);
}, we = (e, t, n, r = {}) => {
	let i = U("g", {
		class: W(p, t),
		"data-kind": "bar",
		"data-row": n + 1,
		...r,
		"data-stack": "",
		style: V("--i", t.slot)
	});
	return e.svg.appendChild(i), (a, o) => {
		let s = r["data-grow"] === void 0 ? {} : { "data-grow": r["data-grow"] };
		i.appendChild(U("rect", {
			...o,
			class: W(m, t),
			"data-row": n + 1,
			...s,
			...xe(e, t, a)
		}));
	};
}, Te = 6, Ee = (e, t, n) => e.some((e) => Y(e).width * n > t - Te * n), De = (e, t, n) => t >= Y(e).height * n * 1.6, Oe = (e, t, n) => t >= Y(e).width * n * 1.5, ke = (e, t, n, r, i = .7) => {
	e.style.setProperty(r, "1");
	let a = 1;
	for (let e of t) {
		let { size: t, room: r } = n(e);
		t > r && (a = Math.min(a, r / t));
	}
	let o = a >= i ? a : 0;
	return e.style.setProperty(r, String(o || i)), o;
}, Ae = (e, t) => (e.sort((e, t) => e.y - t.y), e.forEach((n, r) => {
	let i = e[r - 1];
	i && n.y < i.y + t && (n.y = i.y + t);
}), e), je = {
	segments: (e) => e.map((e) => ({
		...e,
		from: 0,
		to: e.value,
		kind: "bar"
	})),
	series: !0,
	legend: "box",
	stackable: !0,
	totals: !0,
	breakable: !0,
	aspect: .5,
	minHeight: ({ labelHeight: e, nameHeight: t, rows: n, series: r, stacked: i }) => {
		let a = e * 1.1, o = r > 1 && !i ? a * (r + .15 * (r - 1)) / .7 : a / .58;
		return n * Math.max(o, t * 1.2);
	},
	categories: "beside",
	headroom: () => 0,
	draw(e) {
		let { segments: t, height: n, unit: r, svg: i, values: a, categories: o, config: s, barMax: c } = e, l = e.series.length > 1, u = Math.max(J(o.map((e) => Y(e).width * r)), 0), d = Math.min(u + 10 * r, B * .42), f = B - 4 * r, m = e.stacked ? Math.max(J(e.rows.map((t) => Se(t, e.series.length))), 0) || 1 : Math.max(J(e.rows.flatMap((t) => t.cells.slice(0, e.series.length).map((e) => Math.abs(e.value)))), 0) || 1, g = Math.max(m, e.squeeze?.hi ?? 0), _ = (t, n) => ye(Math.abs(t), g, n, e.squeeze, e.breakGap), v = n / t.length, y = (e) => (e + .5) * v, b = Math.min(v * s.barfill, c), x = be(v, e.series.length, c), S = a[0] ?? e.totals[0], C = S ? Y(S).height * r * .56 : 0, w = Math.max(((l && !e.stacked ? x.size : b) - C) / 2, 5 * r), T = (e) => Y(e).width * r, E = (e) => e.length ? J(e.map(T)) + w + 4 * r : 0, D = e.stacked ? E(e.totals) : l ? E(e.seriesValues.flat()) : 0;
		if (!l) for (let e = 0; e < 3; e++) {
			let e = f - d - D, n = E(t.map((e, t) => ({
				seg: e,
				label: a[t]
			})).filter(({ seg: t, label: n }) => !Oe(n, _(t.value, e), r)).map(({ label: e }) => e));
			if (n <= D) break;
			D = n;
		}
		let O = f - d - D, k = (e) => d + _(e, O);
		if (e.squeeze && (e.breakX = k(e.squeeze.gap)), e.stacked) {
			e.rows.forEach((t, i) => {
				let a = we(e, t, i, { "data-grow": "right" }), s = y(i) - b / 2, c = X(t, e.series.length);
				c.forEach(({ from: t, to: o, cell: c }, l) => {
					let u = e.seriesValues[l][i];
					if (u.dataset.place = "none", c.missing || o === t) return;
					let d = k(t), f = k(o);
					a(l, {
						x: d,
						y: s,
						width: Math.max(f - d, 1),
						height: b
					}), u.dataset.place = "inside", u.toggleAttribute("data-left-out", !Oe(u, f - d, r) || Y(u).height * r > b), Ce(u, e, l), K(u, (d + f) / 2, y(i), B, n);
				});
				let l = e.totals[i];
				l && (l.dataset.place = "after", K(l, k(c.at(-1)?.to ?? 0) + w, y(i), B, n));
				let u = o[i];
				u && K(u, d - 8 * r, y(i), B, n);
			}), i.appendChild(U("line", {
				class: h,
				x1: d,
				x2: d,
				y1: 0,
				y2: n
			}));
			return;
		}
		if (l) {
			e.plot.dataset.grouped = "";
			let t = e.seriesValues.flat().filter((e) => e.dataset.missing === void 0), a = ke(e.plot, t, (e) => ({
				size: Y(e).height * r,
				room: x.size + x.gap * .5
			}), "--tablechart-fit");
			e.rows.forEach((t, s) => {
				e.series.forEach((r, o) => {
					let c = t.cells[o] ?? t.cells[0], l = e.seriesValues[o][s];
					if (c.missing) {
						l.dataset.place = "none";
						return;
					}
					let u = k(c.value), f = y(s) + x.offset(o);
					i.appendChild(U("rect", {
						class: W(p, t),
						"data-kind": "bar",
						"data-row": s + 1,
						"data-grow": "right",
						x: d,
						y: f,
						width: Math.max(u - d, 1),
						height: x.size,
						...xe(e, t, o)
					})), l.dataset.place = "after", l.toggleAttribute("data-left-out", !a), K(l, u + w, f + x.size / 2, B, n);
				});
				let c = o[s];
				c && K(c, d - 8 * r, y(s), B, n);
			}), i.appendChild(U("line", {
				class: h,
				x1: d,
				x2: d,
				y1: 0,
				y2: n
			}));
			return;
		}
		let A = t.map((e, t) => Oe(a[t], k(e.value) - d, r));
		t.forEach((t, s) => {
			let c = k(t.value), l = y(s);
			i.appendChild(U("rect", {
				class: W(p, t),
				"data-kind": t.kind,
				"data-row": s + 1,
				"data-grow": "right",
				x: d,
				y: l - b / 2,
				width: Math.max(c - d, 1),
				height: b,
				style: V("--i", t.slot)
			}));
			let u = a[s], f = Math.max(Math.min(w, c - d - T(u) - 6 * r), 6 * r);
			u.dataset.place = A[s] ? "inside" : "after", u.dataset.kind = t.kind, K(u, A[s] ? e.insideAlign === "center" ? (d + c) / 2 : e.insideAlign === "start" ? d + f + T(u) / 2 : c - f - T(u) / 2 : c + w, l, B, n);
			let m = o[s];
			m && K(m, d - 8 * r, l, B, n);
		}), i.appendChild(U("line", {
			class: h,
			x1: d,
			x2: d,
			y1: 0,
			y2: n
		}));
	}
}, Me = {
	segments: (e) => e.map((e) => ({
		...e,
		from: 0,
		to: e.value,
		kind: "bar"
	})),
	series: !0,
	legend: "box",
	stackable: !0,
	totals: !0,
	breakable: !0,
	headroom: ({ labelHeight: e, badgeHeight: t, hasAnnotations: n, unit: r }) => e + 4 * r + (n ? t * 1.6 : 0),
	draw(e) {
		let { segments: t, cx: n, y: r, barWidth: i, height: a, unit: o, svg: s, values: c, labels: l, insideAlign: u } = e, d = r(0);
		if (e.stacked) {
			e.rows.forEach((t, s) => {
				let c = we(e, t, s), l = n(s) - i / 2;
				X(t, e.series.length).forEach(({ from: t, to: u, cell: d }, f) => {
					let p = e.seriesValues[f][s];
					if (p.dataset.place = "none", d.missing || u === t) return;
					let m = r(u), h = r(t);
					c(f, {
						x: l,
						y: m,
						width: i,
						height: Math.max(h - m, 1)
					}), p.dataset.place = "inside", p.toggleAttribute("data-left-out", !De(p, h - m, o) || Y(p).width * o > i - 4 * o), Ce(p, e, f), K(p, n(s), (m + h) / 2, B, a);
				});
				let u = e.totals[s], d = X(t, e.series.length).at(-1)?.to ?? 0;
				u && (u.dataset.place = "outside", K(u, n(s), r(d) - 4 * o, B, a));
			}), s.appendChild(U("line", {
				class: h,
				x1: 0,
				x2: B,
				y1: d,
				y2: d
			}));
			return;
		}
		if (e.series.length > 1) {
			let t = be(n(1) - n(0) || n(0) * 2, e.series.length, e.barMax);
			e.plot.dataset.grouped = "";
			let i = e.seriesValues.flat().filter((e) => e.dataset.missing === void 0), c = ke(e.plot, i, (e) => ({
				size: Y(e).width * o,
				room: t.size + t.gap * .5
			}), "--tablechart-fit");
			e.rows.forEach((i, l) => {
				e.series.forEach((u, f) => {
					let m = i.cells[f] ?? i.cells[0], h = e.seriesValues[f][l], g = n(l) + t.offset(f);
					if (m.missing) {
						h.dataset.place = "none";
						return;
					}
					let _ = r(m.value);
					s.appendChild(U("rect", {
						class: W(p, i),
						"data-kind": "bar",
						"data-row": l + 1,
						x: g,
						y: _,
						width: t.size,
						height: Math.max(d - _, 1),
						...xe(e, i, f)
					})), h.dataset.place = "outside", h.toggleAttribute("data-left-out", !c), K(h, g + t.size / 2, _ - 4 * o, B, a);
				});
			}), s.appendChild(U("line", {
				class: h,
				x1: 0,
				x2: B,
				y1: d,
				y2: d
			}));
			return;
		}
		let f = Ee(c, i, o), m = t.map((e, t) => l === "inside" && !f && !e.missing && De(c[t], d - r(e.value), o)), g = c[0] ? Y(c[0]).height * o * .56 : 0, _ = Infinity;
		for (let [e, t] of c.entries()) m[e] && (_ = Math.min(_, (i - Y(t).width * o) / 2));
		t.forEach((e, t) => {
			let l = r(e.value);
			if (e.missing) {
				K(c[t], n(t), d - 4 * o, B, a), c[t].dataset.place = "outside";
				return;
			}
			s.appendChild(U("rect", {
				class: W(p, e),
				"data-kind": e.kind,
				"data-row": t + 1,
				x: n(t) - i / 2,
				y: l,
				width: i,
				height: Math.max(d - l, 1),
				style: V("--i", e.slot)
			}));
			let f = Math.min(_, (d - l - g) / 2), h = u === "center" ? (l + d) / 2 : u === "start" ? d - f - g / 2 : l + f + g / 2;
			K(c[t], n(t), m[t] ? h : l - 4 * o, B, a), c[t].dataset.place = m[t] ? "inside" : "outside";
		}), s.appendChild(U("line", {
			class: h,
			x1: 0,
			x2: B,
			y1: d,
			y2: d
		}));
	}
}, Ne = 0, Pe = (e) => e.filter((e) => !e.isTotal), Fe = {
	aspect: .66,
	centre: !0,
	headroom: () => 0,
	segments: (e) => e.map((e) => ({
		...e,
		from: 0,
		to: e.value,
		kind: "bar"
	})),
	draw({ rows: e, height: t, unit: n, labelHeight: r, svg: i, values: a, config: o, centre: s }) {
		let c = B / 2, l = t / 2, u = Pe(e).reduce((e, t) => e + Math.abs(t.value), 0);
		if (!u) return;
		let d = r * 1.2 + 10 * n, f = Math.max(Math.min(B, t) / 2 - d, 10), p = f * o.ringfill, m = f - p / 2, h = 2 * Math.PI * m, g = [], _ = 0, v = 0;
		if (e.forEach((e, o) => {
			let s = a[o];
			if (e.isTotal) {
				s.dataset.place = "none";
				return;
			}
			let d = Math.abs(e.value) / u * h, y = _ / h * 2 * Math.PI - Math.PI / 2;
			g.push(y), i.appendChild(U("circle", {
				class: W(x, e),
				"data-slice": v + 1,
				"data-row": o + 1,
				cx: c,
				cy: l,
				r: m,
				"stroke-width": p,
				transform: `rotate(-90 ${c} ${l})`,
				"stroke-dasharray": `${d.toFixed(1)} ${(h - d).toFixed(1)}`,
				"stroke-dashoffset": (-_).toFixed(1),
				style: `--n:${v}; --palette:var(--tablechart-color-${v + 1}); --arc:${d.toFixed(1)}; --circ:${h.toFixed(1)}; ${V("--i", e.slot)}`
			}));
			let b = y + d / h * Math.PI, S = Math.cos(b), C = Math.sin(b);
			i.appendChild(U("line", {
				class: j,
				x1: c + S * (f + 2 * n),
				y1: l + C * (f + 2 * n),
				x2: c + S * (f + 7 * n),
				y2: l + C * (f + 7 * n),
				"data-row": o + 1,
				style: V("--i", e.slot)
			}));
			let w = f + 9 * n, T = Y(s).width * n / 2;
			K(s, c + S * (w + Math.abs(S) * T), l + C * (w + Math.abs(C) * r * .7), B, t), s.dataset.place = "around", _ += d, v += 1;
		}), g.length > 1) {
			let e = m - p / 2 - 1, n = m + p / 2 + 1, r = `tablechart-slices-${++Ne}`, a = U("mask", {
				id: r,
				maskUnits: "userSpaceOnUse"
			});
			a.appendChild(U("rect", {
				x: 0,
				y: 0,
				width: B,
				height: t,
				fill: "white"
			}));
			for (let t of g) a.appendChild(U("line", {
				class: S,
				x1: c + Math.cos(t) * e,
				y1: l + Math.sin(t) * e,
				x2: c + Math.cos(t) * n,
				y2: l + Math.sin(t) * n
			}));
			let o = U("g", { mask: `url(#${r})` });
			for (let e of Array.from(i.querySelectorAll(`.${x}`))) o.appendChild(e);
			let s = U("defs");
			s.appendChild(a), i.prepend(s, o);
		}
		s && K(s, c, l, B, t);
	}
}, Ie = [
	"circle",
	"square",
	"diamond"
], Le = (e, t) => {
	let n = e[t]?.marker?.toLowerCase().split(/\s+/) ?? [], r = Ie.find((e) => n.includes(e));
	return {
		shape: r ?? Ie[Math.floor(t / 2) % Ie.length],
		open: n.includes("open") || !n.includes("filled") && !r && t % 2 == 1
	};
}, Re = (e, t, n, r, i = {}) => {
	if (e === "square") {
		let e = r * .88;
		return U("rect", {
			x: t - e,
			y: n - e,
			width: e * 2,
			height: e * 2,
			...i
		});
	}
	if (e === "diamond") {
		let e = r * 1.2;
		return U("polygon", {
			points: `${t},${n - e} ${t + e},${n} ${t},${n + e} ${t - e},${n}`,
			...i
		});
	}
	return U("circle", {
		cx: t,
		cy: n,
		r,
		...i
	});
}, Z = (e) => Number(e.toFixed(2));
function ze(e, t) {
	let n = e.length;
	if (n < 2) return e.map(() => 0);
	let r = (n) => (t[n + 1] - t[n]) / (e[n + 1] - e[n] || 1), i = Array(n).fill(0);
	for (let t = 1; t < n - 1; t++) {
		let n = r(t - 1), a = r(t);
		if (n * a <= 0) continue;
		let o = e[t] - e[t - 1], s = e[t + 1] - e[t], c = (n * s + a * o) / (o + s || 1), l = Math.min(2 * Math.abs(n), 2 * Math.abs(a), Math.abs(c));
		i[t] = Math.sign(n) * l || 0;
	}
	if (n === 2) return i[0] = r(0), i[1] = r(0), i;
	let a = (n, r, i) => {
		let a = e[r] - e[n];
		return a ? (3 * ((t[r] - t[n]) / a) - i) / 2 : i;
	};
	return i[0] = a(0, 1, i[1]), i[n - 1] = a(n - 2, n - 1, i[n - 2]), i;
}
function Be(e, t, n, r) {
	let i = (t[0] - e[0]) / 3;
	return [[e[0] + i, e[1] + n * i], [t[0] - i, t[1] - r * i]];
}
function Ve(e, t, n, r) {
	let [i, a] = Be(e, t, n, r), o = ([e, t]) => `${Z(e)},${Z(t)}`;
	return `C${o(i)} ${o(a)} ${o(t)}`;
}
function He(e, t, n) {
	let r = Array(e).fill(0), i = [], a = () => {
		ze(i.map((e) => n(e)[0]), i.map((e) => n(e)[1])).forEach((e, t) => {
			r[i[t]] = e;
		}), i = [];
	};
	for (let n = 0; n < e; n++) t(n) ? a() : i.push(n);
	return a(), r;
}
var Ue = (e) => e.map((e) => ({
	...e,
	from: 0,
	to: e.value,
	kind: "bar"
})), We = (e) => ({
	segments: Ue,
	series: !0,
	stackable: !0,
	swatch: e ? "box" : void 0,
	headroom: ({ labelHeight: e, unit: t }) => e * 1.6 + 6 * t,
	footroom: ({ labelHeight: t, unit: n, series: r, focused: i, stacked: a }) => !e && !a && r === 2 && !i ? t + 7 * n : 0,
	draw(t) {
		let { rows: n, series: r, seriesValues: i, names: a, cx: o, y: s, height: c, unit: l, labelHeight: u, svg: d, stacked: f } = t, p = t.shape === "step", m = t.shape === "smooth", g = r.length > 1, _ = r.some((e) => e.focus), v = n.length - 1, y = s(0), b = n.length > 1 ? o(1) - o(0) : o(0) * 2;
		d.style.setProperty("--tablechart-base", `${Z(y)}px`);
		let x = (e) => `--rise:${Z(y - e)}px; `, S = (e, t) => n[t]?.cells[e] ?? n[t]?.cells[0], E = (e, t) => !S(e, t) || !!S(e, t)?.missing, D = n.map((e) => f ? X(e, r.length) : null), A = (e, t) => D[t]?.[e].to ?? S(e, t)?.value ?? 0, j = (e, t) => D[t]?.[e].from ?? 0, M = (e, t) => [o(t), s(A(e, t))], N = r.map((e, t) => {
			if (!g) return {
				attrs: {},
				ink: ""
			};
			let n = _ && !e.focus;
			return {
				attrs: {
					"data-series": t + 1,
					...n && { "data-muted": "" }
				},
				ink: `--n:${t}; --m:${+!!n}; --palette:var(--tablechart-color-${t + 1}); `
			};
		}), P = Math.min(v, 6), F = v > 0 ? P / (p ? n.length : v) : 1, I = (e) => e * F, L = (e) => `--i:${Z(I(e))}`, R = (e) => {
			let t = [], r = -1;
			return n.forEach((n, i) => {
				E(e, i) || (r < 0 && (r = i), (i === v || E(e, i + 1)) && ((p || i > r) && t.push([r, i]), r = -1));
			}), t;
		}, z = (e, t) => `--i:${Z(I(e) + 1)}; --d:${Z(I(p ? t + 1 : t) - I(e))}`, ee = (e, t) => ({
			"data-from": e + 1,
			"data-to": t + 1,
			...p && { "data-flat": "" }
		}), V = m ? r.map((e, t) => He(n.length, (e) => E(t, e), (e) => M(t, e))) : [], te = m && e ? r.map((e, t) => He(n.length, (e) => E(t, e), (e) => [o(e), s(j(t, e))])) : [], H = (e, t, n) => {
			let r = [];
			return e.forEach(([i, a], o) => {
				p ? (r.push(`H${Z(i + n * b / 2)}`), o < e.length - 1 && r.push(`V${Z(e[o + 1][1])}`)) : o > 0 && r.push(t ? Ve(e[o - 1], [i, a], t[o - 1], t[o]) : `L${Z(i)},${Z(a)}`);
			}), r;
		}, W = (e, t, r, i) => n.slice(t, r + 1).map((n, r) => [o(t + r), s(i(e, t + r))]), G = (e, t, n, r) => m ? e[t].slice(n, r + 1) : null, q = (e) => o(e) - (p ? b / 2 : 0), re = (e) => o(e) + (p ? b / 2 : 0), ie = (e) => {
			let t = U("g", {
				class: w,
				...N[e].attrs,
				...f && { "data-stacked": "" },
				style: N[e].ink
			}), n = R(e), r = U("g", {
				class: T,
				style: `--rows:${Z(P + 1)}; ${n.length ? z(...n[0]) : ""}`
			});
			t.appendChild(r);
			for (let [t, i] of n) {
				let n = W(e, t, i, A), a = W(e, t, i, j), o = G(te, e, t, i)?.reverse() ?? null, s = [
					`M${Z(q(t))},${Z(a[0][1])}`,
					`L${Z(q(t))},${Z(n[0][1])}`,
					...H(n, G(V, e, t, i), 1),
					`L${Z(re(i))},${Z(a[a.length - 1][1])}`,
					...H(a.reverse(), o, -1),
					"Z"
				].join(" ");
				r.appendChild(U("path", {
					d: s,
					...ee(t, i),
					style: z(t, i)
				}));
			}
			d.appendChild(t);
		}, ae = (e) => {
			let t = r[e];
			for (let [n, r] of R(e)) {
				let i = W(e, n, r, A), a = [`M${Z(q(n))},${Z(i[0][1])}`, ...H(i, G(V, e, n, r), 1)].join(" ");
				d.appendChild(U("path", {
					class: C,
					...N[e].attrs,
					d: a,
					...t.line && { "data-line": t.line },
					...ee(n, r),
					style: `${N[e].ink}${z(n, r)}`
				}));
			}
		};
		e && r.forEach((e, t) => ie(t)), r.forEach((e, t) => ae(t)), p || (() => {
			let e = r.map((e, t) => g ? Le(r, t) : {
				shape: "circle",
				open: !1
			}), t = (t, n, r) => {
				let [i, a] = M(t, n);
				return Re(e[t].shape, i, a, 4 * l, {
					...r,
					style: `${r.style ?? ""}${x(a)}${L(n)}`
				});
			}, i = (e) => n.map((e, t) => t).filter((t) => !E(e, t));
			ne(d, r.flatMap((n, r) => e[r].open ? i(r).map((e) => t(r, e, {
				class: k,
				"data-row": e + 1,
				...g && { "data-series": r + 1 }
			})) : []), B, c), r.forEach((n, r) => {
				for (let n of i(r)) d.appendChild(t(r, n, {
					class: O,
					...N[r].attrs,
					"data-marker": e[r].shape,
					...e[r].open && { "data-open": "" },
					"data-row": n + 1,
					style: N[r].ink
				}));
			});
		})();
		let J = (e, t) => {
			let n = t;
			for (; n < v && !E(e, n + 1) && S(e, n + 1)?.value === S(e, t)?.value;) n++;
			return n;
		}, oe = (t, n) => {
			let i = S(t, n);
			if (!i || i.missing || p && n > 0 && !E(t, n - 1) && S(t, n - 1)?.value === i.value || _ && !r[t].focus) return "none";
			if (f) return "middle";
			if (!g || _ || r.length > 2) return "above";
			let a = S(1 - t, n);
			return !a || a.missing || i.value > a.value || i.value === a.value && t === 0 || e && M(t, n)[1] + 7 * l + u > y ? "above" : "below";
		}, se = (e, t) => !f && !p ? g && !_ && r.length > 2 : Y(i[e][t]).width * l > (p ? J(e, t) - t + 1 : 1) * b - 4 * l || f && s(j(e, t)) - s(A(e, t)) < u * 1.2;
		i.forEach((e, t) => {
			e.forEach((e, n) => {
				e.style.setProperty("--i", String(Z(p ? (I(n) + I(n + 1)) / 2 : I(n))));
				let r = oe(t, n);
				if (e.dataset.place = r === "above" ? "outside" : r, e.toggleAttribute("data-left-out", r !== "none" && se(t, n)), p && r !== "none" ? e.dataset.rowEnd = String(J(t, n) + 1) : delete e.dataset.rowEnd, r === "none") return;
				let i = Y(e).width * l / 2 + 4 * l, a = o(n);
				p ? a = (o(n) + o(J(t, n))) / 2 : r === "middle" && n === 0 ? a += i : r === "middle" && n === v && (a -= i);
				let u = s(A(t, n)), d = {
					middle: (s(j(t, n)) - u) / 2,
					above: -7 * l,
					below: 7 * l
				};
				K(e, a, u + d[r], B, c);
			});
		});
		let ce = a.map((e, t) => {
			let n = v;
			for (; n > 0 && E(t, n);) n--;
			let [r, i] = M(t, n);
			return {
				name: e,
				x: (p ? r + b / 2 : r) + 10 * l,
				y: f ? (i + s(j(t, n))) / 2 : i
			};
		}), le = (a[0] ? Y(a[0]).height : 0) * l;
		for (let e of Ae(ce, le)) K(e.name, e.x, e.y, B, c);
		let ue = !e && !f && r.length === 2 && !_ ? c - 2 * l : y;
		d.appendChild(U("line", {
			class: h,
			x1: 0,
			x2: o(v) + o(0),
			y1: ue,
			y2: ue
		}));
	}
}), Ge = We(!1), Ke = We(!0), qe = /* @__PURE__ */ new Set(), Je = (e, t) => {
	if (Math.abs(e - t) <= Math.abs(t) / 100) return;
	let n = `[${l}] A total reads ${e}, but the steps before it add up to ${Number(t.toFixed(6))}. The chart shows what you wrote; this is only a check.`;
	qe.has(n) || (qe.add(n), console.warn(n));
}, Ye = {
	segments: (e) => {
		let t = 0, n = !1;
		return e.map((e) => {
			if (e.isTotal) return n && Je(e.value, t), n = !1, t = e.value, {
				...e,
				from: 0,
				to: e.value,
				kind: "total"
			};
			let r = t;
			return t += e.value, n = !0, {
				...e,
				from: r,
				to: t,
				kind: e.value >= 0 ? "up" : "down"
			};
		});
	},
	breakable: !0,
	headroom: ({ labelHeight: e, badgeHeight: t, hasAnnotations: n, unit: r }) => e + 6 * r + (n ? t * 1.6 : 0),
	draw({ segments: e, cx: t, y: n, barWidth: r, height: i, unit: a, svg: o, values: s, breakAt: c, closing: l, insideAlign: u }) {
		let d = n(0), f = Ee(s, r, a), m = u ?? "center", _ = e.map((t, r) => {
			let i = n(Math.max(t.from, t.to)), o = Math.abs(n(t.from) - n(t.to)), u = c !== null && Math.min(t.from, t.to) < c && Math.max(t.from, t.to) > c;
			return {
				top: i,
				length: o,
				down: t.kind === "down" || t.kind === "total" && r > 0 && r === e.length - 1 && l === "down",
				inside: !u && !f && De(s[r], o, a)
			};
		}), v = s[0] ? Y(s[0]).height * a * .56 : 0, y = Infinity;
		for (let [e, t] of _.entries()) t.inside && (y = Math.min(y, (r - Y(s[e]).width * a) / 2));
		e.forEach((i, a) => {
			let s = e[a + 1];
			if (!s) return;
			let c = n(i.to), l = t(a) + r / 2, u = t(a + 1) - r / 2;
			o.appendChild(U("line", {
				class: g,
				x1: l,
				x2: u,
				y1: c,
				y2: c,
				"data-row": a + 2,
				style: V("--i", s.slot)
			}));
		}), e.forEach((e, n) => {
			let { top: c, length: l, down: u, inside: d } = _[n];
			o.appendChild(U("rect", {
				class: W(p, e),
				"data-kind": e.kind,
				"data-row": n + 1,
				"data-grow": u ? "down" : "up",
				x: t(n) - r / 2,
				y: c,
				width: r,
				height: Math.max(l, 1),
				style: V("--i", e.slot)
			}));
			let f = s[n], h = Math.min(y, (l - v) / 2), g = c + h + v / 2, b = c + l - h - v / 2, x = m === "center" ? c + l / 2 : m === "end" === u ? b : g;
			f.dataset.place = d ? "inside" : "outside", f.dataset.kind = e.kind;
			let S = d ? x : e.kind === "down" ? c + l + Y(f).height * a + 3 * a : c - 3 * a;
			K(f, t(n), S, B, i);
		}), o.appendChild(U("line", {
			class: h,
			x1: 0,
			x2: B,
			y1: d,
			y2: d
		}));
	}
}, Q = {
	enabled: !1,
	log(...e) {
		Q.enabled && console.log(`[${l}]`, ...e);
	},
	timed(e, t, n) {
		if (!Q.enabled) return n();
		let r = performance.now(), i = n(), a = performance.now() - r, o = t.querySelectorAll("tbody tr").length;
		return a > 50 ? console.warn(`[${l}] ${e} took ${a.toFixed(1)} ms for ${o} rows, more than 50 ms.`, t) : Q.log(`${e} took ${a.toFixed(1)} ms for ${o} rows.`, t), i;
	}
}, Xe = (e) => {
	let t = (e?.textContent || "").trim(), n = t.match(/^(.*?)(-?\d+(?:[.,]\d+)?)(.*)$/);
	return {
		raw: t,
		number: n?.[2] ?? "",
		prefix: n?.[1] ?? "",
		suffix: n?.[3] ?? "",
		missing: !n,
		value: n ? Number.parseFloat(n[2].replace(",", ".")) : 0
	};
}, Ze = (e, t = "data-i18n") => Array.from(e.querySelectorAll("tbody tr")).map((e, n) => {
	let r = e.querySelector("th"), i = Array.from(e.querySelectorAll("td")).map(Xe);
	return i.length || i.push(Xe(null)), {
		...i[0],
		label: (r?.textContent || "").trim(),
		key: t && r?.getAttribute(t) || null,
		cells: i,
		classes: Array.from(e.classList),
		isTotal: e.getAttribute("data-kind") === "total",
		slot: n
	};
}), Qe = (e) => Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1), $e = (e) => e === "dashed" || e === "dotted" ? e : null, et = (e, t, n = "data-i18n") => {
	let r = Qe(e), i = Math.max(1, J(t.map((e) => e.cells.length)));
	return Array.from({ length: i }, (e, t) => {
		let i = r[t];
		return {
			name: (i?.textContent || "").trim(),
			key: n && i?.getAttribute(n) || null,
			focus: i?.getAttribute("data-kind") === "focus",
			marker: i?.getAttribute("data-marker") ?? null,
			line: $e(i?.getAttribute("data-line"))
		};
	});
}, tt = (e, t) => {
	if (!t) return;
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = r.getAttribute("data-chart-keys") || null;
		if (!e) continue;
		if (n.has(e)) {
			let t = n.get(e) + 1;
			n.set(e, t), console.warn(`[${l}] Two charts on the page have data-chart-keys="${e}". If two charts use the same keys, they get the same translations. This one uses "${e}-${t}".`), e = `${e}-${t}`;
		} else n.set(e, 1);
		r.querySelectorAll("tbody th").forEach((n, r) => {
			n.getAttribute(t) || n.setAttribute(t, `${e}-row${r + 1}`);
		});
		let i = Qe(r);
		i.length > 1 && i.forEach((n, r) => {
			n.getAttribute(t) || n.setAttribute(t, `${e}-col${r + 1}`);
		}), Q?.log?.(`Keys for "${e}" written onto ${r.querySelectorAll("tbody th").length} rows`);
	}
}, nt = [
	"axis-break",
	"trend",
	"bracket"
], rt = (e) => {
	let t = e.hasAttribute("data-fragment"), n = Array.from(e.querySelectorAll("tbody tr")), r = Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1), i = Array.from(e.querySelectorAll("[data-annotation]")).filter((e) => nt.includes(e.getAttribute("data-annotation") ?? "")), a = (e) => e.hasAttribute("data-fragment"), o = n.map((e) => Array.from(e.querySelectorAll(":scope > td")));
	if (!t && !n.some(a) && !r.some(a) && !o.flat().some(a) && !i.some(a)) return null;
	let s = [], c = /* @__PURE__ */ new Map(), l = [], u = (e) => {
		let t = e === null ? void 0 : c.get(e);
		return t === void 0 && (t = s.length, s.push(e), l.push(0), e !== null && c.set(e, t)), t;
	}, d = 0, f = e.getAttribute("data-chart") === "donut", p = (e) => f && e.getAttribute("data-kind") === "total", m = n.map((e) => {
		if (p(e)) return {
			step: null,
			slot: 0
		};
		if (!t && !a(e)) return {
			step: null,
			slot: d++
		};
		let n = u(e.getAttribute("data-fragment-index"));
		return {
			step: n,
			slot: l[n]++
		};
	}), h = Math.max(-1, ...m.map((e) => e.step ?? -1));
	if (h >= 0) for (let [e, t] of n.entries()) p(t) && (m[e] = {
		step: h,
		slot: l[h]++
	});
	let g = r.map((e) => ({ step: a(e) ? u(e.getAttribute("data-fragment-index")) : null })), _ = o.map((e) => e.map(() => ({
		step: null,
		slot: 0
	}))), v = Math.max(0, ...o.map((e) => e.length));
	for (let e = 0; e < v; e++) for (let [t, n] of o.entries()) {
		let r = n[e];
		if (!r || !a(r)) continue;
		let i = u(r.getAttribute("data-fragment-index"));
		_[t][e] = {
			step: i,
			slot: l[i]++
		};
	}
	return {
		rows: m,
		series: g,
		cells: _,
		notes: i.map((e) => {
			let t = (t, n) => {
				let r = Number.parseInt(e.getAttribute(t) ?? "", 10);
				return Number.isFinite(r) ? r - 1 : n;
			}, [n, r] = e.getAttribute("data-annotation") === "bracket" ? [t("data-from", 0), t("data-to", m.length - 1)] : [0, m.length - 1], i = null;
			for (let e = Math.min(n, r); e <= Math.max(n, r); e++) for (let t of [m[e]?.step ?? null, ...(_[e] ?? []).map((e) => e.step)]) t !== null && (i === null || t > i) && (i = t);
			let o = g[t("data-series", 0)]?.step ?? null;
			o !== null && (i === null || o > i) && (i = o), a(e) && (i = u(e.getAttribute("data-fragment-index")));
			let s = i === null ? m.length : m.filter((e) => e.step === i).length;
			return {
				step: i,
				after: s
			};
		}),
		count: s.length,
		indexes: s
	};
}, it = (e) => {
	let t = e.plan;
	if (!t) return;
	let n = (t) => t === null || e.step - t >= 1;
	for (let r of e.figure.querySelectorAll("[data-from]")) {
		let e = Number(r.dataset.from) - 1, i = Number(r.dataset.to) - 1, a = r.closest("[data-series]")?.dataset.series, o = a ? Number(a) - 1 : 0, s = t.series[o], c = (e) => t.cells[e]?.[o]?.step ?? t.rows[e]?.step ?? null, l = e - 1;
		if (s && s.step !== null) l = n(s.step) ? i : e - 1;
		else for (; l < i && n(c(l + 1));) l++;
		let u = r.hasAttribute("data-flat") ? (l - e + 1) / (i - e + 1) : i > e ? Math.max(0, l - e) / (i - e) : 0;
		r.style.setProperty("--reveal", String(u));
	}
}, at = (e) => {
	let t = e.plan;
	if (!t) return;
	let n = t.rows.length - 1, r = (e) => t.series.map((n, r) => t.cells[e]?.[r]?.step ?? n.step ?? t.rows[e]?.step ?? null), i = (e) => {
		let t = r(e);
		return t.some((e) => e === null) ? null : Math.min(...t);
	}, a = new Set(e.totals), o = (e, t, n, r) => {
		e.style.setProperty(n, String(r)), e.style.removeProperty("--d"), t === null ? e.style.removeProperty("--step") : e.style.setProperty("--step", String(t));
	};
	for (let s of e.figure.querySelectorAll("[data-row], [data-series], [data-note]")) {
		if (s.closest("table, .tablechart-controls") || s.hasAttribute("data-from")) continue;
		let e = Number(s.dataset.note);
		if (e > 0) {
			let n = t.notes[e - 1];
			n && o(s, n.step, "--after", n.after);
			continue;
		}
		let c = s.dataset.row ? Number(s.dataset.row) - 1 : n;
		if (s.classList.contains("tablechart-connector")) {
			let e = t.rows[c - 1], n = t.rows[c];
			if (e && n) {
				let t = (e.step ?? -1) > (n.step ?? -1);
				o(s, t ? e.step : n.step, "--i", t ? e.slot + 1 : n.slot);
			}
			continue;
		}
		if (a.has(s)) {
			let e = r(c).filter((e) => e !== null);
			o(s, e.length ? Math.max(...e) : null, "--i", t.rows[c]?.slot ?? 0);
			continue;
		}
		if (s.hasAttribute("data-stack")) {
			o(s, i(c), "--i", t.rows[c]?.slot ?? 0);
			continue;
		}
		let l = s.dataset.series ? Number(s.dataset.series) - 1 : 0, u = s.dataset.series ? t.series[l] : void 0;
		if (s.classList.contains("tablechart-piece")) {
			let e = r(c)[l] ?? null, n = t.cells[c]?.[l];
			o(s, e === i(c) ? null : e, "--i", n && n.step !== null ? n.slot : c);
			continue;
		}
		if (s.dataset.place === "legend") {
			let e = Math.min(...t.cells.map((e) => e[l]?.step ?? Infinity));
			o(s, u?.step ?? (Number.isFinite(e) ? e : null), "--i", 0);
			continue;
		}
		let d = t.cells[c]?.[l];
		d && d.step !== null ? o(s, d.step, "--i", d.slot) : u && u.step !== null ? o(s, u.step, "--i", c) : t.rows[c] && o(s, t.rows[c].step, "--i", t.rows[c].slot);
	}
	let s = e.figure.querySelector(`.${A}`);
	if (s) {
		let e = [...t.rows, ...t.cells.flat()].map((e) => e.step ?? -1), n = Math.max(-1, ...e);
		n < 0 ? o(s, null, "--i", 0) : o(s, n, "--i", e.filter((e) => e === n).length);
	}
	it(e);
}, ot = (e, t, n = !1) => {
	let r = e.plan;
	if (!r) return;
	let i = Math.min(Math.max(Math.round(t), 0), r.count), a = i !== e.step;
	e.step = i, e.figure.style.setProperty("--tablechart-step", String(i)), it(e);
	let [o, s] = e.controls?.querySelectorAll("button") ?? [];
	o && (o.disabled = i === 0), s && (s.disabled = i === r.count), a && !n && e.figure.dispatchEvent(new CustomEvent("tablechart:step", {
		bubbles: !0,
		detail: {
			step: i,
			steps: r.count
		}
	}));
}, st = (e, t, n) => {
	let r = document.createElement("div");
	r.className = z;
	let i = (r) => {
		let i = document.createElement("button");
		i.type = "button", i.className = `tablechart-${r}`, i.dataset.go = r;
		let a = document.createElement("span");
		a.className = "tablechart-control-icon", a.setAttribute("aria-hidden", "true");
		let o = U("svg", {
			viewBox: "0 0 16 16",
			focusable: "false"
		});
		o.appendChild(U("path", { d: r === "next" ? "M6 3l5 5-5 5" : "M10 3L5 8l5 5" })), a.appendChild(o);
		let s = document.createElement("span");
		s.className = "tablechart-control-label", s.textContent = e[r];
		let c = t[r];
		c && n && s.setAttribute(n, c);
		let l = document.createElement("span");
		return l.className = F, l.textContent = e.hint, t.hint && n && l.setAttribute(n, t.hint), i.append(...r === "next" ? [
			s,
			l,
			a
		] : [
			a,
			s,
			l
		]), i;
	};
	return r.append(i("previous"), i("next")), r;
}, ct = {
	area: Ke,
	bar: je,
	column: Me,
	donut: Fe,
	line: Ge,
	waterfall: Ye
}, lt = {
	"axis-break": ae,
	trend: ve,
	bracket: me
}, ut = Object.keys(lt), dt = (e) => {
	let t = "";
	for (let n = e.previousSibling; n && (t = (n.textContent ?? "") + t, !t.trim()); n = n.previousSibling);
	return t.trim();
}, ft = [
	"straight",
	"step",
	"smooth"
], pt = (e, t) => {
	let n = e.dataset.chartShape;
	return n && ft.includes(n) ? n : ft.includes(t.shape) ? t.shape : "straight";
}, mt = (e) => {
	for (let t of e.querySelectorAll("br")) {
		if (t.previousElementSibling?.classList.contains("tablechart-sr") || /[.!?:;,…]$/.test(dt(t))) continue;
		let e = document.createElement("span");
		e.className = F, e.textContent = ". ", t.before(e);
	}
}, ht = (e, t, n) => {
	let r = e.querySelector("table");
	if (!r) return null;
	let i = r.querySelector("tfoot [data-chart-total]");
	if (i) return i.dataset.value = t.dataset.value ?? "0", i;
	let a = (r.tFoot ?? r.createTFoot()).insertRow(), o = document.createElement("th");
	o.scope = "row", o.textContent = n.totallabel;
	let s = e.getAttribute("data-chart-keys");
	s && n.langattribute && o.setAttribute(n.langattribute, `${s}-total`);
	let c = a.insertCell();
	return c.setAttribute("data-chart-total", ""), c.dataset.value = t.dataset.value ?? "0", a.prepend(o), c;
}, gt = 0, _t = (e) => {
	let t = e.querySelector(":scope > figcaption");
	if (!t) return;
	mt(t);
	let n = (e) => e.hasAttribute("aria-label") || e.hasAttribute("aria-labelledby"), r = (e) => {
		t.id ||= `tablechart-caption-${++gt}`, e.setAttribute("aria-labelledby", t.id);
	};
	e.tagName === "FIGURE" && !n(e) && r(e);
	let i = e.querySelector("table");
	i && !n(i) && !i.querySelector(":scope > caption") && r(i);
}, vt = (e, t, n = null) => {
	let r = n ?? (e.getAttribute("data-chart") || "column"), i = ct[r];
	if (!i) return console.warn(`[${l}] Unknown chart type "${r}". Known types: ${Object.keys(ct).join(", ")}.`), e.setAttribute("data-chart-empty", ""), null;
	let a = Ze(e, t.langattribute);
	if (!a.length) return console.warn(`[${l}] A chart has no rows in its table, so there is nothing to draw.`), e.setAttribute("data-chart-empty", ""), null;
	_t(e);
	let o = et(e, a, t.langattribute);
	o.length > 1 && !i.series && (console.warn(`[${l}] A ${r} chart draws one series; only the first of the table's ${o.length} value columns is used.`), o = o.slice(0, 1));
	let s = o.length > 1;
	s && e.style.setProperty("--tablechart-series-count", String(o.length));
	let c = e.hasAttribute("data-chart-stack");
	c && !i.stackable && console.warn(`[${l}] A ${r} chart cannot be stacked.`);
	let p = c && !!i.stackable && s;
	p && a.some((e) => e.cells.slice(0, o.length).some((e) => e.value < 0)) && console.warn(`[${l}] A stacked chart has a value below zero. It takes no room in the stack.`);
	let m = document.createElement("div");
	m.className = u, m.setAttribute("aria-hidden", "true");
	let h = U("svg", {
		role: "presentation",
		focusable: "false"
	});
	m.appendChild(h), e.appendChild(m);
	let g = i.centre ? a.filter((e) => !e.isTotal) : a, _ = Math.max(0, J(g.flatMap((e) => e.cells.slice(0, o.length).map((e) => oe(e.number))))), v = o.map((e, t) => a.map((e, n) => {
		let r = e.cells[t] ?? e.cells[0], i = G(f, m);
		return i.classList.add(...e.classes), i.dataset.value = String(r.value), r.prefix && (i.dataset.prefix = r.prefix), r.suffix && (i.dataset.suffix = r.suffix), r.missing && (i.dataset.missing = r.raw), s && (i.dataset.series = String(t + 1)), i.dataset.row = String(n + 1), i.style.setProperty("--i", String(e.slot)), i;
	})), y = v[0], b = p && i.totals ? a.map((e, t) => {
		let n = G(f, m);
		n.classList.add(...e.classes), n.dataset.kind = "total", n.dataset.row = String(t + 1), n.dataset.value = String(Se(e, o.length));
		let r = e.cells[0];
		return r.prefix && (n.dataset.prefix = r.prefix), r.suffix && (n.dataset.suffix = r.suffix), n.style.setProperty("--i", String(e.slot)), n;
	}) : [], x = a[a.length - 1], S = o.some((e) => e.focus), C = e.getAttribute("data-chart-legend"), w = s && (C === null ? t.legend || i.legend !== void 0 : C !== "false") ? document.createElement("div") : null;
	w && (w.className = D, w.setAttribute("aria-hidden", "true"), w.inert = !0);
	let T = s ? o.map((n, r) => {
		let a = G(E, w ?? m);
		w && (a.dataset.place = "legend");
		let s = i.legend ?? i.swatch;
		if (s && (a.dataset.swatch = s), a.textContent = n.name, !s && pt(e, t) !== "step") {
			let e = Le(o, r);
			a.dataset.marker = e.shape, a.toggleAttribute("data-open", e.open);
		}
		return n.line && !s && (a.dataset.line = n.line), n.key && t.langattribute && a.setAttribute(t.langattribute, n.key), a.dataset.series = String(r + 1), a.style.setProperty("--n", String(r)), a.style.setProperty("--palette", `var(--tablechart-color-${r + 1})`), a.style.setProperty("--m", S && !n.focus ? "1" : "0"), a.style.setProperty("--i", String(x.slot)), a;
	}) : [], O = i.centre ? G(A, m) : null;
	if (O) {
		let e = a.find((e) => e.isTotal), t = e ? e.value : a.reduce((e, t) => e + Math.abs(t.value), 0);
		O.dataset.value = String(t), e && (O.dataset.decimals = String(oe(e.number)));
	}
	let k = O && !a.some((e) => e.isTotal) ? ht(e, O, t) : null, j = i.categories === "beside", M = document.createElement("div");
	M.className = d, M.setAttribute("aria-hidden", "true"), M.inert = !0, j ? M.dataset.place = "beside" : i.centre && (M.dataset.place = "key"), M.style.setProperty("--tablechart-columns", String(a.length));
	let N = 0;
	for (let [e, n] of a.entries()) {
		let r = document.createElement("span");
		r.classList.add(...n.classes), r.textContent = n.label, n.key && t.langattribute && r.setAttribute(t.langattribute, n.key), i.centre && (r.dataset.kind = n.isTotal ? "total" : "slice", n.isTotal || (r.dataset.slice = String(N + 1), r.style.setProperty("--n", String(N)), r.style.setProperty("--palette", `var(--tablechart-color-${N + 1})`), N += 1)), r.style.setProperty("--i", String(n.slot)), r.dataset.row = String(e + 1), M.appendChild(r);
	}
	(j ? m : e).appendChild(M), w && e.appendChild(w);
	let P = t.animate ? rt(e) : null;
	P && (e.setAttribute("data-steps", ""), e.setAttribute("data-chart-animate", "across"));
	let F = e.getAttribute("data-chart-keys"), I = P && t.controls ? st({
		previous: t.previouslabel,
		next: t.nextlabel,
		hint: t.stephint
	}, {
		previous: F && `${F}-previous`,
		next: F && `${F}-next`,
		hint: F && `${F}-step`
	}, t.langattribute) : null;
	I && e.appendChild(I);
	let L = Array.from(e.querySelectorAll("[data-annotation]")).map((e) => {
		let t = e.getAttribute("data-annotation"), n = lt[t];
		if (!n) return console.warn(`[${l}] Unknown annotation "${t}". Known annotations: ${Object.keys(lt).join(", ")}.`), null;
		let r = Number.parseInt(e.getAttribute("data-series") ?? "1", 10), i = r >= 1 && r <= o.length ? r - 1 : 0;
		return r !== i + 1 && console.warn(`[${l}] An annotation reads line ${r}, which the chart does not have; it reads the first.`), {
			spec: e,
			type: n,
			badge: n.create(e, m),
			series: i,
			after: a.length
		};
	}).filter((e) => e !== null);
	if (t.animate) {
		let n = e.getAttribute("data-chart-animate"), i = (n === "up" || n === "across" ? n : t.animate) === "up" && (r === "line" || r === "area");
		e.setAttribute("data-animate", i ? "up" : "");
	}
	let R = {
		figure: e,
		plot: m,
		svg: h,
		rows: a,
		decimals: _,
		type: i,
		values: y,
		series: o,
		seriesValues: v,
		names: w ? [] : T,
		categories: Array.from(M.children),
		centre: O,
		stacked: p,
		totals: b,
		totalCell: k,
		rowAt: null,
		rowBox: null,
		annotations: L,
		checks: [],
		plan: P,
		step: 0,
		controls: I
	};
	return I?.addEventListener("click", (e) => {
		let t = e.target.closest("button")?.dataset.go;
		t && ot(R, R.step + (t === "next" ? 1 : -1));
	}), ot(R, 0, !0), t.hover && e.getAttribute("data-chart-hover") !== "false" && Tt(R), Ct(R, t), R;
}, yt = (e) => {
	let t = getComputedStyle(e).getPropertyValue("--tablechart-inside-align").trim();
	return t === "start" || t === "center" || t === "end" ? t : null;
}, bt = (e, t, n, r) => {
	let i = getComputedStyle(e), a = (i.getPropertyValue(n).trim() || r).match(/^(\d+(?:\.\d+)?)(px|%|em|rem)$/);
	if (!a) return null;
	let o = Number(a[1]);
	return a[2] === "%" ? o / 100 * B : o * (a[2] === "em" ? Number.parseFloat(i.fontSize) : a[2] === "rem" ? Number.parseFloat(getComputedStyle(document.documentElement).fontSize) : 1) * t;
}, xt = (e, t) => bt(e, t, "--tablechart-bar-max", "60px") ?? Infinity, St = (e, t) => {
	let { plot: n, svg: r, rows: i, type: a, values: o, series: s, seriesValues: c, names: u, annotations: d } = e, f = n.clientWidth;
	if (!f) return !1;
	let p = B / f, m = Number.parseFloat(e.figure.dataset.chartAspect ?? ""), h = B * (m > 0 ? m : a.aspect ?? t.aspect);
	n.classList.add(N);
	for (let t of [...c.flat(), ...e.totals]) delete t.dataset.place;
	n.style.removeProperty("--tablechart-fit"), ge([
		...c.flat(),
		...e.totals,
		...u,
		...e.categories,
		...d.map((e) => e.badge)
	]);
	let g = (o[0] ? Y(o[0]).height : 0) * p, _ = d[0]?.badge ? Y(d[0].badge).height * p : 0, v = Math.max(h, bt(e.figure, p, "--tablechart-min-height", "200px") ?? 0, a.minHeight?.({
		labelHeight: g,
		nameHeight: Math.max(0, J(e.categories.map((e) => Y(e).height))) * p,
		unit: p,
		rows: i.length,
		series: s.length,
		stacked: e.stacked
	}) ?? 0), y = e.stacked ? i.map((e) => {
		let t = Se(e, s.length);
		return {
			...e,
			value: t,
			cells: e.cells.map((e, n) => n === 0 ? {
				...e,
				value: t
			} : e)
		};
	}) : i, b = (a.segments ?? ((e) => e.map((e) => ({
		...e,
		from: 0,
		to: e.value,
		kind: "bar"
	}))))(e.stacked ? y.map((e) => ({
		...e,
		cells: [e.cells[0]]
	})) : i), x = {
		labelHeight: g,
		badgeHeight: _,
		hasAnnotations: d.length > 0,
		unit: p,
		series: s.length,
		focused: s.some((e) => e.focus),
		stacked: e.stacked
	}, S = a.headroom?.(x) ?? g, C = 2 * p + (a.footroom?.(x) ?? 0), w = S, T = e.stacked ? Math.max(J(y.map((e) => e.value)), 0) : Math.max(J(b.flatMap((e) => [
		e.from,
		e.to,
		e.value
	])), J(i.flatMap((e) => e.cells.slice(0, s.length).map((e) => e.value)))), E = v - w - C, D = T * 1.02, O = d.find((e) => e.spec.getAttribute("data-annotation") === "axis-break")?.spec, A = (e) => {
		let t = Number.parseFloat(O?.getAttribute(e) ?? "");
		return Number.isFinite(t) ? t : null;
	}, j = A("data-from") ?? A("data-at"), M = A("data-to"), P = null;
	if (O && (j !== null || M !== null)) {
		let e = j ?? 0, t = M ?? D, n = M === null ? e : j === null ? t : (e + t) / 2, r = O.getAttribute("data-size"), i = r?.match(/^\s*(\d+(?:\.\d+)?)\s*%\s*$/);
		r !== null && !i && console.warn(`[${l}] data-size="${r}" is not a percentage, such as 30%. Using the default.`);
		let o = Math.min(Math.max(i ? Number(i[1]) / 100 : M === null ? .22 : .3, .05), .8), s = b.filter((n) => (n.kind === "up" || n.kind === "down") && Math.max(n.from, n.to) > e && Math.min(n.from, n.to) < t);
		a.breakable ? e < 0 || t <= e || t > D || e === 0 && t === D ? console.warn(`[${l}] A break from ${e} to ${t} does not fit a scale that runs from 0 to ${T}.`) : s.length ? console.warn(`[${l}] A break from ${e} to ${t} would cut a step that floats. Keep it below or above the steps.`) : P = {
			lo: e,
			hi: t,
			gap: n,
			share: o
		} : console.warn(`[${l}] This kind of chart cannot break its scale.`);
	}
	let F = P ? P.gap : null, I = (P && bt(e.figure, p, "--tablechart-break-gap", "")) ?? 13, L = v - C, R = (e) => L - e / D * E;
	if (P) {
		let { lo: e, hi: t, gap: n, share: r } = P, i = E * r, a = (E - i - I) / (e + (D - t)), o = i / (t - e);
		R = (r) => r <= e ? L - r * a : r <= n ? L - e * a - (r - e) * o : r <= t ? L - e * a - (r - e) * o - I : L - e * a - i - I - (r - t) * a;
	}
	let z = u.length ? J(u.map((e) => Y(e).width)) * p + 12 * p : 0, ee = e.categories[0]?.parentElement;
	ee && (ee.style.paddingRight = z ? `${z / B * 100}%` : "");
	let V = (B - z) / i.length, te = (e) => (e + .5) * V, W = (e) => e >= 0 && e < i.length ? e : null;
	e.rowAt = a.centre ? null : a.categories === "beside" ? (e, t) => W(Math.floor(t * p / (v / i.length))) : (e) => W(Math.floor(e * p / V));
	let G = V / B * 100, K = 100 / i.length;
	e.rowBox = a.categories === "beside" ? (e) => [
		0,
		e * K,
		100,
		K
	] : (e) => [
		e * G,
		0,
		G,
		100
	], r.setAttribute("viewBox", `0 0 ${B} ${H(v)}`), r.textContent = "", e.checks = [];
	let q = {
		rows: i,
		segments: b,
		cx: te,
		y: R,
		barWidth: Math.min(V * t.barfill, xt(e.figure, p)),
		barMax: xt(e.figure, p),
		height: v,
		unit: p,
		labelHeight: g,
		badgeHeight: _,
		after: i.length,
		note: 0,
		labels: e.figure.dataset.chartLabels === "inside" || e.figure.dataset.chartLabels !== "outside" && t.labels === "inside" ? "inside" : "outside",
		closing: (e.figure.dataset.chartClosing ?? t.closing) === "up" ? "up" : "down",
		insideAlign: yt(e.figure),
		breakAt: F,
		squeeze: P,
		breakGap: I,
		stacked: e.stacked,
		shape: pt(e.figure, t),
		totals: e.totals,
		svg: r,
		plot: n,
		values: o,
		series: s,
		seriesValues: c,
		names: u,
		categories: e.categories,
		centre: e.centre,
		config: t,
		checks: e.checks
	};
	a.draw(q);
	for (let [t, n] of d.entries()) {
		n.badge?.setAttribute("data-note", String(t + 1));
		let r = n.series, a = (e) => ({
			...e,
			...e.cells[r] ?? e.cells[0]
		});
		n.type.draw(n.spec, n.badge, {
			...q,
			...e.stacked && {
				rows: y,
				...e.totals.length && { values: e.totals }
			},
			...r > 0 && !e.stacked && {
				rows: i.map(a),
				segments: b.map((e) => {
					let t = a(e);
					return e.kind === "bar" ? {
						...t,
						to: t.value
					} : t;
				}),
				values: c[r]
			},
			after: n.after,
			note: t + 1
		});
	}
	at(e);
	let re = e.categories[0]?.parentElement;
	return re && a.categories !== "beside" && !a.centre && ke(re, e.categories.filter((e) => e.offsetParent !== null), (e) => ({
		size: e.scrollWidth,
		room: e.clientWidth
	}), "--tablechart-name-fit"), ne(r, d.flatMap(({ badge: e }) => {
		if (!(e instanceof HTMLElement) || !e.offsetWidth) return [];
		let t = e.offsetWidth * p, n = e.offsetHeight * p, r = Number.parseFloat(e.style.left) / 100 * B, i = Number.parseFloat(e.style.top) / 100 * v, a = getComputedStyle(e).borderTopLeftRadius, o = a.endsWith("%") ? Number.parseFloat(a) / 100 : null, s = (Number.parseFloat(a) || 0) * p;
		return [U("rect", {
			class: k,
			"data-for": "badge",
			"data-note": e.dataset.note ?? "",
			x: r - t / 2,
			y: i - n / 2,
			width: t,
			height: n,
			rx: o === null ? s : t * o,
			ry: o === null ? s : n * o,
			style: ["--after", "--step"].map((t) => e.style.getPropertyValue(t) && `${t}:${e.style.getPropertyValue(t)}`).filter(Boolean).join("; ")
		})];
	}), B, v), !0;
}, Ct = (e, t) => {
	let n = [
		...e.seriesValues.flat(),
		...e.totals,
		...e.totalCell ? [e.totalCell] : []
	];
	for (let r of e.centre ? [...n, e.centre] : n) {
		let { missing: n, prefix: i = "", suffix: a = "" } = r.dataset;
		if (n !== void 0) {
			r.textContent = n;
			continue;
		}
		let [o, s] = ce(Number.parseFloat(r.dataset.value || "0"), r.dataset.decimals ? Number(r.dataset.decimals) : e.decimals, t.locale);
		if (r.textContent = i + (i ? o : "") + s + a, o && !i) {
			let e = document.createElement("span");
			e.className = I, e.textContent = o, r.prepend(e);
		}
	}
}, wt = (e, t) => {
	e.figure.classList.toggle(L, t), t || e.plot.removeAttribute("data-pointed");
}, Tt = (e) => {
	let { plot: t } = e, n = () => [...e.seriesValues.flat(), ...e.totals], r = (e, t) => {
		let n = Number(e.dataset.row), r = Number(e.dataset.rowEnd ?? n);
		return t >= n && t <= r;
	};
	t.setAttribute("data-hover", "");
	let i = document.createElement("div");
	i.className = P, t.prepend(i);
	let a = () => {
		t.removeAttribute("data-active");
		for (let e of n()) e.removeAttribute("data-active");
	}, o = (o) => {
		if (!t.classList.contains("is-placed") || !e.rowAt) return;
		let s = t.getBoundingClientRect(), c = s.width / t.offsetWidth || 1, l = e.rowAt((o.clientX - s.left) / c, (o.clientY - s.top) / c), u = l === null ? null : l + 1, d = (e) => e.dataset.place !== "none", f = u === null ? [] : n().filter((e) => r(e, u) && d(e));
		if (!n().some((e) => e.hasAttribute("data-left-out") && d(e)) || !f.length) return a();
		t.setAttribute("data-pointed", ""), t.setAttribute("data-active", String(u));
		let [p, m, h, g] = e.rowBox?.(u - 1) ?? [
			0,
			0,
			0,
			0
		];
		Object.assign(i.style, {
			left: `${p}%`,
			top: `${m}%`,
			width: `${h}%`,
			height: `${g}%`
		});
		for (let e of n()) e.toggleAttribute("data-active", f.includes(e));
	};
	t.addEventListener("pointermove", o), t.addEventListener("pointerdown", o), t.addEventListener("pointerleave", (e) => {
		e.pointerType === "mouse" && a();
	}), document.addEventListener("pointerdown", (e) => {
		t.contains(e.target) || a();
	});
}, Et = (e) => e === "id" || e === "style" || e.startsWith("data-chart"), Dt = /^\s*(?:Table)?:\s+/, Ot = (e) => e?.tagName === "P" && Dt.test(e.textContent ?? ""), kt = (e) => {
	let t = document.createElement("figcaption");
	for (let { name: n, value: r } of Array.from(e.attributes)) t.setAttribute(n, r);
	let n = e.firstChild;
	n?.nodeType === Node.TEXT_NODE && (n.textContent = (n.textContent ?? "").replace(Dt, ""), n.textContent || n.remove());
	let r = Array.from(e.childNodes), i = r.findIndex((e) => e.nodeName === "BR");
	if (t.append(...i === -1 ? r : r.slice(0, i + 1)), i !== -1 && i < r.length - 1) {
		let e = document.createElement("span");
		e.append(...r.slice(i + 1)), t.append(e);
	}
	return e.remove(), t;
}, At = /^\s*([a-z][\w-]*)((?:\s+[\w-]+=[^\s:]+)*)\s*(:\s*|$)/, jt = (e) => {
	let t = Rt(e);
	return t?.tagName === "P" ? t : e;
}, Mt = (e) => {
	let t = jt(e).firstChild;
	if (t?.nodeType !== Node.TEXT_NODE) return null;
	let n = At.exec(t.textContent ?? "");
	if (!n || !ut.includes(n[1]) || !n[3] && t.nextSibling) return null;
	let r = n[2].trim().split(/\s+/).filter(Boolean).map((e) => e.split("="));
	return {
		name: n[1],
		options: r,
		text: t,
		length: n[0].length
	};
}, Nt = (e) => {
	if (e?.tagName !== "UL" && e?.tagName !== "OL") return null;
	let t = Array.from(e.children), n = t.map((e) => e.hasAttribute("data-annotation") ? null : Mt(e));
	return !t.length || t.some((e, t) => !n[t] && !e.hasAttribute("data-annotation")) ? null : (t.forEach((e, t) => {
		let r = n[t], i = jt(e);
		if (i !== e && i.replaceWith(...i.childNodes), r) {
			e.setAttribute("data-annotation", r.name);
			for (let [t, n] of r.options) e.setAttribute(`data-${t}`, n);
			r.text.textContent = (r.text.textContent ?? "").slice(r.length);
		}
		e.children.length && Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.textContent?.trim()).forEach((e, t) => {
			let n = document.createElement("span");
			t === 0 && e instanceof HTMLElement && e.matches("em, i") ? (n.className = b, n.append(...e.childNodes), e.replaceWith(n)) : e.nodeType === Node.TEXT_NODE && (n.textContent = (e.textContent ?? "").trim(), e.replaceWith(n));
		});
	}), e.classList.add("chart-annotations"), e);
}, Pt = (e, t) => {
	for (let { name: n, value: r } of Array.from(e.attributes)) (n === "class" || Et(n)) && (t.setAttribute(n, r), e.removeAttribute(n));
}, Ft = (e) => e.map((e) => {
	let t = e.closest("p"), n = Ot(t) ? t : e;
	if (n.tagName !== "TABLE" && n.tagName !== "P") return n;
	let r = document.createElement("div");
	Pt(e, r), e.classList.length || e.removeAttribute("class");
	let i = n.tagName === "TABLE" ? n : null, a = n.previousElementSibling, o = n.nextElementSibling, s = i ? Ot(a) ? a : Ot(o) ? o : null : n;
	i && s === o && (o = o?.nextElementSibling ?? null);
	let c = o?.classList.contains("chart-annotations") ? o : Nt(o);
	return n.replaceWith(r), s && r.append(kt(s)), i && r.append(i), c && r.append(c), Q?.log?.(`A ${i ? "table" : "caption"} with chart attributes was wrapped in a figure of its own`), r;
}), It = (e, t = []) => {
	let n = document.createElement("table");
	if (t.length) {
		let e = n.createTHead().insertRow();
		e.append(document.createElement("th"));
		for (let n of t) {
			let t = document.createElement("th");
			t.textContent = n, e.append(t);
		}
	}
	let r = n.createTBody();
	for (let t of e) {
		let e = r.insertRow();
		t.kind === "total" && (e.dataset.kind = "total");
		let n = document.createElement("th");
		n.textContent = String(t.label ?? ""), e.append(n);
		for (let n of t.values ?? [t.value ?? null]) e.insertCell().textContent = n === null ? "" : String(n);
	}
	return n;
}, Lt = async (e) => {
	await Promise.all(e.filter((e) => e.hasAttribute("data-chart-src")).map(async (e) => {
		let t = e.getAttribute("data-chart-src");
		for (let t of e.querySelectorAll("table")) t.remove();
		try {
			let n = await fetch(t);
			if (!n.ok) throw Error(`${n.status} ${n.statusText}`);
			let r = await n.json(), i = Array.isArray(r) ? r : r?.rows;
			if (!Array.isArray(i)) throw Error("no array of rows in it");
			let a = Array.isArray(r?.series) ? r.series.map(String) : [], o = e.querySelector(":scope > figcaption"), s = It(i, a);
			o ? o.after(s) : e.prepend(s), Q?.log?.(`Read ${i.length} rows from "${t}"`);
		} catch (e) {
			let n = window.location.protocol === "file:";
			console.warn(`[${l}] Could not read the chart data in "${t}": ${e.message}.` + (n ? " A page opened from the file system cannot fetch files; open the page from a server instead." : ""));
		}
	}));
}, Rt = (e) => {
	let t = Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.TEXT_NODE && e.textContent?.trim());
	return t.length === 1 && t[0] instanceof HTMLElement ? t[0] : null;
}, zt = "strong, b, span.total", Bt = (e) => {
	for (let t of e) {
		for (let e of t.querySelectorAll("tbody tr")) {
			let t = e.cells[0];
			if (t?.tagName !== "TD" || e.cells.length < 2) continue;
			let n = document.createElement("th");
			for (let { name: e, value: r } of Array.from(t.attributes)) n.setAttribute(e, r);
			n.append(...t.childNodes), t.replaceWith(n);
			for (let t = Rt(n); t?.matches(zt); t = Rt(n)) e.dataset.kind = "total", t.replaceWith(...t.childNodes);
		}
		let e = Array.from(t.querySelector("thead tr:last-child")?.children ?? []);
		for (let t of e.slice(1)) for (let e = Rt(t); e?.matches(zt); e = Rt(t)) t.setAttribute("data-kind", "focus"), e.replaceWith(...e.childNodes);
	}
}, Vt = "data-chart-made", Ht = (e, t) => {
	let n = Number.parseFloat(e.dataset.chartEntrance ?? ""), r = Number.isFinite(n) ? n : t.entrance;
	return Math.min(Math.max(r, 0), 1);
}, Ut = async (e, t) => {
	let n = Ft(e.filter((e) => !e.hasAttribute(Vt)));
	return await Lt(n), Bt(n), tt(n, t.langattribute), n;
}, Wt = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	var n = function(e) {
		return r(e) && !i(e);
	};
	function r(e) {
		return !!e && typeof e == "object";
	}
	function i(e) {
		var t = Object.prototype.toString.call(e);
		return t === "[object RegExp]" || t === "[object Date]" || o(e);
	}
	var a = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.element") : 60103;
	function o(e) {
		return e.$$typeof === a;
	}
	function s(e) {
		return Array.isArray(e) ? [] : {};
	}
	function c(e, t) {
		return t.clone !== !1 && t.isMergeableObject(e) ? g(s(e), e, t) : e;
	}
	function l(e, t, n) {
		return e.concat(t).map(function(e) {
			return c(e, n);
		});
	}
	function u(e, t) {
		if (!t.customMerge) return g;
		var n = t.customMerge(e);
		return typeof n == "function" ? n : g;
	}
	function d(e) {
		return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
			return Object.propertyIsEnumerable.call(e, t);
		}) : [];
	}
	function f(e) {
		return Object.keys(e).concat(d(e));
	}
	function p(e, t) {
		try {
			return t in e;
		} catch {
			return !1;
		}
	}
	function m(e, t) {
		return p(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
	}
	function h(e, t, n) {
		var r = {};
		return n.isMergeableObject(e) && f(e).forEach(function(t) {
			r[t] = c(e[t], n);
		}), f(t).forEach(function(i) {
			m(e, i) || (r[i] = p(e, i) && n.isMergeableObject(t[i]) ? u(i, n)(e[i], t[i], n) : c(t[i], n));
		}), r;
	}
	function g(e, t, r) {
		r ||= {}, r.arrayMerge = r.arrayMerge || l, r.isMergeableObject = r.isMergeableObject || n, r.cloneUnlessOtherwiseSpecified = c;
		var i = Array.isArray(t);
		return i === Array.isArray(e) ? i ? r.arrayMerge(e, t, r) : h(e, t, r) : c(t, r);
	}
	g.all = function(e, t) {
		if (!Array.isArray(e)) throw Error("first argument should be an array");
		return e.reduce(function(e, n) {
			return g(e, n, t);
		}, {});
	}, t.exports = g;
})))(), 1), Gt = Object.defineProperty, Kt = (e, t) => {
	let n = {};
	for (var r in e) Gt(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Gt(n, Symbol.toStringTag, { value: "Module" }), n;
}, qt = [
	".js",
	".min.js",
	".mjs"
], Jt = (() => {
	let e = import.meta;
	if (typeof e?.url == "string" && e.url !== "") return e.url;
	let t = typeof document < "u" ? document.currentScript : null;
	return t && "src" in t && t.src ? t.src : "";
})(), Yt = (e) => {
	let t = e.lastIndexOf("/");
	return t === -1 ? "" : e.slice(0, t + 1);
}, Xt = (e) => {
	let t = e.split(/[?#]/)[0];
	return t.slice(t.lastIndexOf("/") + 1);
}, Zt = (e, t) => qt.some((n) => e === `${t}${n}`), Qt = [
	/\/@fs\//,
	/\/@id\//,
	/\/\.vite\/deps\//,
	/[?&][vt]=/
], $t = (e) => Qt.some((t) => t.test(e)), en = (e) => {
	if (typeof document < "u") {
		let t = qt.map((t) => `script[src$="${e}${t}"]`).join(", "), n = document.querySelector(t)?.getAttribute("src");
		if (n) return { directory: Yt(n) };
	}
	return Jt && !$t(Jt) && Zt(Xt(Jt), e) ? { directory: Yt(Jt) } : { directory: null };
}, tn = (e) => en(e).directory !== null, nn = /* @__PURE__ */ new Map(), rn = (e = "") => {
	let t = nn.get(e);
	if (t) return t;
	let n = typeof window < "u", r = typeof document < "u", i = import.meta, a = !1;
	try {
		a = typeof module < "u" && !!module?.hot;
	} catch {}
	let o = !1;
	try {
		o = !!i?.hot;
	} catch {}
	let s = a || o, c = !1;
	try {
		c = i?.env?.DEV === !0;
	} catch {}
	let l = e !== "" && tn(e), u = {
		hasResolvableSource: l,
		hasWindow: n,
		hasDocument: r,
		isBundled: !l,
		isDevelopment: s || c,
		hasHMR: s,
		isViteDev: c
	};
	return nn.set(e, u), u;
}, an = class {
	defaultConfig;
	pluginInit;
	pluginId;
	mergedConfig = null;
	userConfigData = null;
	data = {};
	constructor(e, t, n) {
		typeof e == "string" ? (this.pluginId = e, this.pluginInit = t, this.defaultConfig = n || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
	}
	initializeConfig(e) {
		let t = this.defaultConfig, n = e.getConfig()[this.pluginId] || {};
		this.userConfigData = n, this.mergedConfig = (0, Wt.default)(t, n, {
			arrayMerge: (e, t) => t,
			clone: !0
		});
	}
	getCurrentConfig() {
		if (!this.mergedConfig) throw Error("Plugin configuration has not been initialized");
		return this.mergedConfig;
	}
	getData() {
		return Object.keys(this.data).length > 0 ? this.data : void 0;
	}
	get userConfig() {
		return this.userConfigData || {};
	}
	getEnvironmentInfo = () => rn(this.pluginId);
	init(e) {
		if (this.initializeConfig(e), this.pluginInit) return this.pluginInit(this, e, this.getCurrentConfig());
	}
	createInterface(e = {}) {
		return {
			id: this.pluginId,
			init: (e) => this.init(e),
			getConfig: () => this.getCurrentConfig(),
			getData: () => this.getData(),
			...e
		};
	}
}, on = "data-css-id", sn = (e, t) => new Promise((n, r) => {
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = t, i.setAttribute(on, e);
	let a = setTimeout(() => {
		i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Timeout loading CSS from: ${t}`));
	}, 5e3);
	i.onload = () => {
		clearTimeout(a), n();
	}, i.onerror = () => {
		clearTimeout(a), i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Failed to load CSS from: ${t}`));
	}, document.head.appendChild(i);
}), cn = (e) => document.querySelectorAll(`[${on}="${e}"]`).length > 0, ln = 1e4, un = (e) => new Promise((t) => {
	if ($(e)) return t(!0);
	if (typeof MutationObserver > "u") return t(!1);
	let n = !1, r = (e) => {
		n || (n = !0, i.disconnect(), clearTimeout(o), window.removeEventListener("load", a), t(e));
	}, i = new MutationObserver(() => {
		$(e) && r(!0);
	});
	i.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributeFilter: ["href", "rel"]
	});
	let a = () => requestAnimationFrame(() => r($(e)));
	document.readyState === "complete" ? a() : window.addEventListener("load", a, { once: !0 });
	let o = setTimeout(() => r($(e)), ln);
}), $ = (e) => {
	if (cn(e)) return !0;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
	} catch {
		return !1;
	}
}, dn = ((e) => new Proxy(e, { get: (e, t) => {
	if (t in e) return e[t];
	let n = t.toString();
	if (typeof console[n] == "function") return (...t) => {
		e.debugLog(n, ...t);
	};
} }))(new class {
	debugMode = !1;
	label = "DEBUG";
	groupDepth = 0;
	pending = null;
	emit(e, t) {
		if (this.pending) {
			this.pending.push([e, t]);
			return;
		}
		let n = typeof e == "function" ? e : console[e];
		typeof n == "function" && n.call(console, ...t);
	}
	flush() {
		let e = this.pending;
		if (this.pending = null, e) for (let [t, n] of e) this.emit(t, n);
	}
	initialize(e, t = "DEBUG") {
		this.debugMode = e, this.label = t;
	}
	group = (...e) => {
		this.debugMode && this.groupDepth === 0 && !this.pending && (this.pending = []), this.debugLog("group", ...e), this.groupDepth++;
	};
	groupCollapsed = (...e) => {
		this.debugMode && this.groupDepth === 0 && !this.pending && (this.pending = []), this.debugLog("groupCollapsed", ...e), this.groupDepth++;
	};
	groupEnd = () => {
		this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"), this.groupDepth === 0 && this.flush());
	};
	error = (...e) => {
		let t = this.debugMode;
		this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = t;
	};
	table = (e, t, n) => {
		if (this.debugMode) try {
			typeof e == "string" && t !== void 0 && typeof t != "string" ? (this.groupDepth === 0 ? this.emit("log", [`[${this.label}]: ${e}`]) : this.emit("log", [e]), n ? this.emit("table", [t, n]) : this.emit("table", [t])) : (this.groupDepth === 0 && this.emit("log", [`[${this.label}]: Table data`]), typeof t == "object" && Array.isArray(t) ? this.emit("table", [e, t]) : this.emit("table", [e]));
		} catch (t) {
			this.emit("error", [`[${this.label}]: Error showing table:`, t]), this.emit("log", [`[${this.label}]: Raw data:`, e]);
		}
	};
	formatAndLog = (e, t) => {
		if (this.debugMode) try {
			this.groupDepth > 0 ? this.emit(e, t) : t.length > 0 && typeof t[0] == "string" ? this.emit(e, [`[${this.label}]: ${t[0]}`, ...t.slice(1)]) : this.emit(e, [`[${this.label}]:`, ...t]);
		} catch (e) {
			this.emit("error", [`[${this.label}]: Error in logging:`, e]), this.emit("log", [`[${this.label}]: Original log data:`, ...t]);
		}
	};
	debugLog(e, ...t) {
		let n = console[e];
		if (!(!this.debugMode && e !== "error" || typeof n != "function")) {
			if (e === "group" || e === "groupCollapsed") {
				t.length > 0 && typeof t[0] == "string" ? this.emit(e, [`[${this.label}]: ${t[0]}`, ...t.slice(1)]) : this.emit(e, [`[${this.label}]:`, ...t]);
				return;
			}
			if (e === "groupEnd") {
				this.emit(e, []);
				return;
			}
			if (e === "table") {
				t.length === 1 ? this.table(t[0]) : t.length === 2 ? (t[0], this.table(t[0], t[1])) : t.length >= 3 && this.table(t[0], t[1], t[2]);
				return;
			}
			this.groupDepth > 0 ? this.emit(e, t) : t.length > 0 && typeof t[0] == "string" ? this.emit(e, [`[${this.label}]: ${t[0]}`, ...t.slice(1)]) : this.emit(e, [`[${this.label}]:`, ...t]);
		}
	}
}()), fn = /* @__PURE__ */ new Set(), pn = (e, t) => {
	let n = `${e}::${t}`;
	fn.has(n) || (fn.add(n), console.warn(`[${e}] ${t}`));
}, mn = (e) => [`dist/plugin/${e}/${e}.css`, `plugin/${e}/${e}.css`], hn = (e) => typeof e == "string" && e.trim() !== "", gn = async (e, t) => {
	let { cssautoload: n, csspath: r, debug: i = !1 } = t;
	if (n === !1 || r === !1) return i && console.log(`[${e}] CSS loading is switched off`), { status: "skipped" };
	if (hn(r)) {
		let t = r.trim(), n = $(e), a = n && !!document.querySelector(`[data-css-id="${e}"]`);
		try {
			return await sn(e, t), i && console.log(`[${e}] CSS loaded from: ${t}`), n && pn(e, `Loaded CSS from ${t}, but a stylesheet for this plugin was already on the page (${a ? "a tagged <link>" : "an import or inline <style>"}) — csspath adds one, it cannot remove one. Both are live and the cascade decides. Remove the other import or <link>, or drop csspath.`), {
				status: "loaded",
				path: t
			};
		} catch {
			return console.warn(`[${e}] Could not load CSS from: ${t}`), {
				status: "failed",
				path: t
			};
		}
	}
	if ($(e)) return i && console.log(`[${e}] CSS is already imported, skipping`), { status: "present" };
	let { directory: a } = en(e);
	if (a !== null || n === !0) {
		let t = [...a === null ? [] : [`${a}${e}.css`], ...mn(e)].filter((e, t, n) => n.indexOf(e) === t);
		for (let n of t) try {
			return await sn(e, n), i && console.log(`[${e}] CSS loaded from: ${n}`), {
				status: "loaded",
				path: n
			};
		} catch {
			i && console.log(`[${e}] No CSS at: ${n}`);
		}
		return console.warn(`[${e}] Could not load CSS. Tried: ${t.join(", ")}. Import the stylesheet yourself, or set csspath to where it is.`), { status: "failed" };
	}
	return un(e).then((t) => {
		t || pn(e, `CSS could not be autoloaded here, because the plugin is part of a bundle. Import it once in your own code: import 'reveal.js-${e}/${e}.css'`);
	}), { status: "advised" };
};
async function _n(e, t) {
	if ("getEnvironmentInfo" in e && t) {
		let n = e, r = n.userConfig, i = "cssautoload" in r && r.cssautoload !== "auto" ? t.cssautoload : void 0;
		return gn(n.pluginId, {
			...t,
			cssautoload: i
		});
	}
	let { id: n, cssautoload: r, csspath: i, debug: a } = e;
	return gn(n, {
		cssautoload: r === "auto" ? void 0 : r,
		csspath: i,
		debug: a
	});
}
var vn = /* @__PURE__ */ Kt({
	ENTRANCE_ATTRIBUTE: () => xn,
	IN_EVENT: () => bn,
	SHOWN_EVENT: () => yn,
	announce: () => kn,
	markPending: () => On,
	pendingAround: () => jn,
	reset: () => An,
	stateOf: () => Tn,
	whenShown: () => Mn
}), yn = "entranceshown", bn = "entrancein", xn = "data-entrance", Sn = {
	pending: 0,
	shown: 1,
	in: 2
}, Cn = Symbol.for("reveal.js-plugintoolkit.entranceTimers"), wn = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Tn(e) {
	let t = e.getAttribute(xn);
	return t === "pending" || t === "shown" || t === "in" ? t : null;
}
function En(e, t) {
	if (e.setAttribute(xn, t), t === "pending") return;
	let n = {
		element: e,
		state: t
	};
	e.dispatchEvent(new CustomEvent(t === "shown" ? yn : bn, {
		bubbles: !0,
		detail: n
	}));
}
function Dn(e) {
	for (let t of e[Cn] ?? []) window.clearTimeout(t);
	delete e[Cn];
}
function On(e) {
	Dn(e), En(e, "pending");
}
function kn(e, t) {
	Dn(e);
	let n = Math.max(0, t.delay ?? 0), r = Math.max(0, t.duration), i = Number.parseFloat(e.dataset.entranceAt ?? ""), a = Number.isFinite(i) ? Math.min(1, Math.max(0, i)) : .5;
	En(e, "pending"), e[Cn] = [window.setTimeout(() => En(e, "shown"), n + r * a), window.setTimeout(() => {
		Tn(e) === "pending" && En(e, "shown"), En(e, "in"), delete e[Cn];
	}, n + r)];
}
function An(e) {
	On(e);
}
function jn(e, t = "shown") {
	let n = [];
	for (let r = e; r && r.tagName !== "SECTION"; r = r.parentElement) {
		let e = Tn(r);
		e && Sn[e] < Sn[t] && n.push(r);
	}
	return n;
}
function Mn(e, t = "shown", n) {
	if (n?.aborted) return Promise.resolve(!1);
	if (wn()) return Promise.resolve(!0);
	let r = jn(e, t);
	return r.length ? new Promise((i) => {
		let a = () => {
			jn(e, t).length || (s(), i(!0));
		}, o = () => {
			s(), i(!1);
		}, s = () => {
			for (let e of r) e.removeEventListener(yn, a), e.removeEventListener(bn, a);
			n?.removeEventListener("abort", o);
		};
		for (let e of r) e.addEventListener(yn, a), e.addEventListener(bn, a);
		n?.addEventListener("abort", o);
	}) : Promise.resolve(!0);
}
//#endregion
//#region src/plugin/js/config.ts
var Nn = "tablechart", Pn = "tablechart-steps", Fn = [
	"together",
	"delay",
	"after"
], In = {
	...ee,
	controls: !1,
	sequence: "together",
	sequencedelay: 0,
	cssautoload: !0,
	csspath: ""
}, Ln = "em, i, .fragment", Rn = (e, t) => {
	e.setAttribute("data-fragment", "");
	let n = t.getAttribute("data-fragment-index");
	n !== null && e.setAttribute("data-fragment-index", n), t.classList.remove("fragment"), t.removeAttribute("data-fragment-index"), t.classList.length || t.removeAttribute("class");
}, zn = (e) => {
	let t = Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.TEXT_NODE && e.textContent?.trim());
	return t.length === 1 && t[0] instanceof Element ? t[0] : null;
}, Bn = (e) => {
	let t = [...Array.from(e.querySelectorAll("tbody tr")).map((e) => ({
		owner: e,
		cells: Array.from(e.children)
	})), ...Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1).map((e) => ({
		owner: e,
		cells: [e]
	}))];
	for (let { owner: e, cells: n } of t) {
		for (let t of n) t.classList.contains("fragment") && Rn(e, t);
		let t = n[0];
		if (t) for (let n = zn(t); n?.matches(Ln); n = zn(t)) Rn(e, n), n.replaceWith(...n.childNodes);
	}
}, Vn = (e, t) => {
	if (!t.length) return;
	let n = document.createElement("span");
	n.className = Pn, n.setAttribute("aria-hidden", "true");
	for (let e of t) {
		let t = document.createElement("span");
		t.className = "fragment", e !== null && t.setAttribute("data-fragment-index", e), n.appendChild(t);
	}
	e.appendChild(n);
}, Hn = (e) => {
	let t = e.querySelectorAll(`:scope > .${Pn} > .fragment`);
	if (!t.length) return null;
	let n = 0;
	for (let e of t) e.classList.contains("visible") && n++;
	return n;
}, Un = "tablechart-measuring", { pendingAround: Wn, whenShown: Gn } = vn, Kn = (e) => {
	for (let t = e.parentElement; t && t.tagName !== "SECTION"; t = t.parentElement) if (t.dataset.entrance) return !0;
	return !1;
}, qn = (e) => Math.max(0, ...getComputedStyle(e ?? document.body).transitionDuration.split(",").map((e) => Number.parseFloat(e) * 1e3 || 0)), Jn = async (e, t, n) => {
	let r = t.getConfig(), i = r.view === "print" || /print-pdf/gi.test(window.location.search);
	dn && (n.debug || r.debug) && (dn.initialize(!0, Nn), dn.log("Tablechart debugging enabled."));
	let a = t.getViewportElement() ?? document.body, o = Array.from(a.querySelectorAll(n.selector));
	if (!o.length) return;
	n.langattribute = r.internation?.langattribute || n.langattribute;
	let s = /* @__PURE__ */ new Map();
	for (let e of o) {
		let t = e.closest("section") ?? a;
		s.set(t, [...s.get(t) ?? [], e]);
	}
	let c = (await Promise.all([...s.values()].map((e) => Ut(e, n)))).flat(), l = n.animate && !i;
	if (l) for (let e of c) Bn(e);
	let u = c.map((e) => vt(e, l ? n : {
		...n,
		animate: !1
	})).filter((e) => e !== null);
	for (let e of u) e.plan && Vn(e.figure, e.plan.indexes);
	for (let { figure: e } of u) {
		let t = e.querySelector(":scope > figcaption");
		if (!t?.id || t.dataset.name) continue;
		let n = t.parentElement?.closest("[id], [data-name]"), r = n?.dataset.name || n?.id;
		r && (t.dataset.name = r);
	}
	await _n(e, n);
	let d = () => {
		a.classList.add(Un), t.layout(), a.classList.remove(Un);
	};
	window.addEventListener("load", d, { once: !0 });
	let f = !1;
	t.on("ready", () => {
		f = !0;
	});
	let p = !1, m = () => {
		f && !p && (p = !0, requestAnimationFrame(() => {
			p = !1, d();
		}));
	}, h = (e) => {
		if (!e.figure.closest("section")?.classList.contains("present")) return !1;
		let t = e.figure.closest(".fragment");
		return !t || t.classList.contains("visible");
	}, g = /* @__PURE__ */ new WeakMap(), _ = !0, v = window.matchMedia("(prefers-reduced-motion: reduce)"), y = (e) => {
		let t = e.figure.closest("[data-chart-sequence]"), r = t?.dataset.chartSequence, i = n.sequence;
		r && Fn.includes(r) ? i = r : r && console.warn(`Tablechart: data-chart-sequence="${r}" is not one of ${Fn.join(", ")}.`);
		let a = Number.parseFloat(t?.dataset.chartDelay ?? "");
		return {
			group: t ?? e.figure.closest("section"),
			mode: v.matches ? "together" : i,
			delay: Number.isFinite(a) ? a : n.sequencedelay
		};
	}, b = /* @__PURE__ */ new Map(), x = (e) => new Promise((t) => setTimeout(t, e)), S = async (e) => {
		await new Promise(requestAnimationFrame), await Promise.allSettled(e.getAnimations({ subtree: !0 }).map((e) => e.finished));
	}, C = async (e) => {
		if (v.matches) return;
		if (Wn(e.figure, "shown").length) {
			await Gn(e.figure, "shown");
			return;
		}
		await new Promise(requestAnimationFrame);
		let t = e.figure.getAnimations().filter((e) => e instanceof CSSAnimation);
		for (let n = e.figure.parentElement; n && n.tagName !== "SECTION"; n = n.parentElement) t.push(...n.getAnimations());
		let r = 0;
		for (let i of t) {
			let t = i.effect?.getComputedTiming(), a = Number(t?.activeDuration ?? 0);
			if (!t || !Number.isFinite(a)) continue;
			let o = Number(t.delay ?? 0) + a * Ht(e.figure, n);
			r = Math.max(r, o - Number(i.currentTime ?? 0));
		}
		r > 0 && await x(r);
	}, w = async (e, t, n) => {
		let r = { live: !0 };
		for (let t of e) b.set(t, r);
		if (!(t !== "together" && e.some((e) => Kn(e.figure)) && (await Promise.all(e.map((e) => Gn(e.figure, "in"))), !r.live))) for (let [i, a] of e.entries()) {
			if (i > 0 && (t === "after" && await S(e[i - 1].figure), n && await x(n)), await C(a), !r.live) return;
			a.figure.classList.remove(R), wt(a, !0);
		}
	}, T = () => {
		let e = /* @__PURE__ */ new Map();
		for (let t of u) {
			let n = Hn(t.figure);
			if (n !== null && ot(t, n), !(g.has(t) && h(t))) {
				let e = b.get(t);
				e && (e.live = !1), b.delete(t), wt(t, !1), t.figure.classList.toggle(R, y(t).mode !== "together" && !Kn(t.figure));
				continue;
			}
			if (t.figure.classList.contains("is-shown") || b.has(t)) continue;
			let { group: r, mode: i, delay: a } = y(t);
			if (i === "together" || !r) {
				t.figure.classList.remove(R), w([t], "together", 0);
				continue;
			}
			Kn(t.figure) || t.figure.classList.add(R);
			let o = e.get(r) ?? {
				mode: i,
				delay: a,
				charts: []
			};
			o.charts.push(t), e.set(r, o);
		}
		for (let { mode: t, delay: n, charts: r } of e.values()) w(r, t, n);
	}, E = !1, D = () => {
		E || (E = !0, requestAnimationFrame(() => {
			E = !1, T();
		}));
	}, O = (e) => {
		let t = e.plot.clientWidth;
		if (!t || t === g.get(e)) return;
		let r = !g.has(e), a = e.figure.offsetHeight;
		St(e, n) && (g.set(e, t), e.figure.offsetHeight !== a && m(), i && wt(e, !0), r && n.animate && _ && D());
	};
	for (let e of u) {
		O(e);
		let t = !1, n = e.figure.offsetHeight;
		new ResizeObserver(() => {
			t || (t = !0, requestAnimationFrame(() => {
				t = !1, O(e), e.figure.offsetHeight !== n && (n = e.figure.offsetHeight, m());
			}));
		}).observe(e.figure);
	}
	if (new MutationObserver(() => {
		for (let e of u) Ct(e, n);
		requestAnimationFrame(() => requestAnimationFrame(() => {
			for (let e of u) g.delete(e), O(e);
		}));
	}).observe(document.documentElement, {
		attributes: !0,
		attributeFilter: ["lang"]
	}), n.animate) {
		let e, n = () => {
			clearTimeout(e), _ = !0, T();
		};
		t.on("slidetransitionend", async () => {
			let e = t.getCurrentSlide(), r = [e, e?.parentElement?.matches("section.stack") ? e.parentElement : null].flatMap((e) => e ? e.getAnimations() : []).filter((e) => e.playState === "running");
			await Promise.all(r.map((e) => e.finished.catch(() => void 0))), t.getCurrentSlide() === e && n();
		}), t.on("slidechanged", () => {
			_ = !1, clearTimeout(e), e = setTimeout(n, qn(t.getCurrentSlide()) + 50);
		}), t.on("ready", n), t.on("fragmentshown", T), t.on("fragmenthidden", T), T();
	}
	dn?.log?.(`Tablechart started ${u.length} chart(s).`);
}, Yn = () => new an(Nn, Jn, In).createInterface();
//#endregion
export { Yn as default };
