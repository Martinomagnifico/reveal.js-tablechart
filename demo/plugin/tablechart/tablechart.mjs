 /*****************************************************************
 *
 * reveal.js-tablechart for Reveal.js 
 * Version 0.1.0
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
}) : o, n)), l = "tablechart", u = "tablechart-plot", d = "tablechart-categories", f = "tablechart-value", p = "tablechart-bar", m = "tablechart-piece", h = "tablechart-rule", g = "tablechart-connector", _ = "tablechart-line", v = "tablechart-head", y = "tablechart-badge", b = "tablechart-caption", x = "tablechart-slice", S = "tablechart-divide", C = "tablechart-series", w = "tablechart-area", T = "tablechart-area-fill", E = "tablechart-name", D = "tablechart-legend", O = "tablechart-point", k = "tablechart-hole", A = "tablechart-centre", j = "tablechart-leader", M = "tablechart-break", N = "is-placed", P = "tablechart-pointer", F = "tablechart-sr", I = "is-shown", L = "tablechart-queued", R = 1e3, z = {
	selector: "[data-chart]",
	aspect: .38,
	barfill: .58,
	ringfill: .42,
	animate: !0,
	labels: "outside",
	legend: !1,
	hover: !0,
	totallabel: "Total",
	threshold: .5,
	replay: !1,
	langattribute: "data-i18n"
}, B = (e, t) => `${e}:${t}`, V = "http://www.w3.org/2000/svg", H = (e, t = {}) => {
	let n = document.createElementNS(V, e);
	for (let e in t) n.setAttribute(e, String(t[e]));
	return n;
}, U = (e, t) => [e, ...t.classes].join(" "), W = (e, t) => {
	let n = document.createElement("span");
	return n.className = e, n.inert = !0, t.appendChild(n), n;
}, G = (e, t, n, r, i) => {
	e.style.left = `${t / r * 100}%`, e.style.top = `${n / i * 100}%`;
}, ee = 0, te = (e, t, n, r) => {
	if (!t.length) return;
	let i = `tablechart-cut-${++ee}`, a = H("mask", {
		id: i,
		maskUnits: "userSpaceOnUse"
	});
	a.appendChild(H("rect", {
		x: -n,
		y: -r,
		width: n * 3,
		height: r * 3,
		fill: "white"
	}));
	for (let e of t) e.setAttribute("fill", "black"), a.appendChild(e);
	let o = e.querySelector(":scope > defs");
	o || (o = H("defs"), e.prepend(o)), o.appendChild(a);
	let s = H("g", { mask: `url(#${i})` });
	for (let t of Array.from(e.childNodes)) t !== o && s.appendChild(t);
	e.appendChild(s);
}, ne = 0, re = {
	create: () => null,
	draw(e, t, n) {
		let { segments: r, cx: i, y: a, barWidth: o, svg: s, breakAt: c } = n;
		if (c === null) return;
		let l = a(c), u = o + o * .09 * 2, d = e.getAttribute("data-mark") === "zigzag", f = u * .3, p = (e, t) => {
			let n = e - u / 2;
			if (!d) return [[n, t + f / 2], [n + u, t - f / 2]];
			let r = u / 6, i = [[n, t]];
			for (let e = 0; e < 6; e++) i.push([n + r * (e + 1), t + (e % 2 == 0 ? -3.38 : 3.38)]);
			return i;
		}, m = (e, t = !1) => e.map(([e, t], n) => `${n === 0 ? "M" : "L"} ${e.toFixed(1)} ${t.toFixed(1)}`).join(" ") + (t ? " Z" : ""), h = `tablechart-break-${++ne}`, g = H("mask", {
			id: h,
			maskUnits: "userSpaceOnUse"
		});
		g.appendChild(H("rect", {
			x: -1e3,
			y: -n.height,
			width: R * 3,
			height: n.height * 3,
			fill: "white"
		}));
		let _ = [];
		for (let [e, t] of r.entries()) {
			if (Math.min(t.from, t.to) >= c || Math.max(t.from, t.to) <= c) continue;
			let r = i(e), a = p(r, l - 13), o = p(r, l);
			g.appendChild(H("path", {
				d: m([...a, ...o.slice().reverse()], !0),
				fill: "black"
			})), _.push(a, o);
			let u = B("--after", t.slot);
			for (let e of [a, o]) s.appendChild(H("path", {
				class: M,
				"data-part": "edge",
				"data-note": n.note,
				d: m(e),
				style: u
			}));
		}
		if (!_.length) return;
		let v = Array.from(s.querySelectorAll(`.${M}`)), y = H("g", { mask: `url(#${h})` });
		for (let e of Array.from(s.childNodes)) v.includes(e) || y.appendChild(e);
		let b = H("defs");
		b.appendChild(g), s.prepend(b, y);
	}
}, ie = (e) => (e.split(/[.,]/)[1] || "").length, ae = (e, t, n) => new Intl.NumberFormat(n || document.documentElement.lang || void 0, {
	minimumFractionDigits: t,
	maximumFractionDigits: t
}).format(e), oe = (e) => Number.parseFloat((e.match(/-?[\d.,]+/) || ["NaN"])[0].replace(",", ".")), se = (e, t) => {
	let n = document.createElement("span");
	if (n.className = y, n.inert = !0, e.childElementCount > 0) for (let t of Array.from(e.children)) n.appendChild(t.cloneNode(!0));
	else {
		n.textContent = (e.textContent || "").trim();
		let t = e.getAttribute("data-i18n");
		t && n.setAttribute("data-i18n", t);
	}
	return t.appendChild(n), n;
}, ce = (e, t, n, r) => {
	let i = oe(e?.textContent || ""), a = Number.isNaN(i) ? !0 : Math.abs(t - i) <= .5, o = {
		label: n,
		computed: t,
		stated: i,
		agrees: a
	};
	r.checks.push(o), a || console.warn(`[${l}] An annotation reads ${i}%, but ${n} is ${t.toFixed(1)}%. The chart shows what you wrote; this is only a check.`);
}, le = (e, t) => (t - e) / Math.abs(e) * 100, ue = (e, t) => {
	let n = (t, n) => {
		let r = Number.parseInt(e.getAttribute(t) ?? "", 10);
		return Number.isFinite(r) ? r - 1 : n;
	};
	return [n("data-from", 0), n("data-to", t - 1)];
}, de = {
	create: se,
	draw(e, t, n) {
		let { rows: r, cx: i, y: a, unit: o, labelHeight: s, badgeHeight: c, height: u, svg: d, after: f } = n, [p, m] = ue(e, r.length), h = r[p], g = r[m];
		if (!h || !g) {
			console.warn(`[${l}] A bracket points at a row that is not there (row ${p + 1} to ${m + 1}, of ${r.length}).`);
			return;
		}
		let y = 7 * o, b = 4 * o, x = i(p), S = i(m), C = Math.min(a(h.value), a(g.value)) - s - b - c * .9, w = (e) => a(e) - s - b, T = `M ${x} ${w(h.value)} L ${x} ${C} L ${S} ${C} L ${S} ${w(g.value) - y}`, E = (w(h.value) - C + Math.abs(S - x) + (w(g.value) - y - C)) / o + 1;
		d.appendChild(H("path", {
			class: _,
			"data-note": n.note,
			d: T,
			style: `--len:${E.toFixed(1)}; ${B("--after", f)}`
		}));
		let D = w(g.value);
		d.appendChild(H("polygon", {
			class: v,
			"data-note": n.note,
			points: `${S},${D} ${S - y * .45},${D - y} ${S + y * .45},${D - y}`,
			style: B("--after", f)
		})), t && (G(t, (x + S) / 2, C, R, u), t.style.setProperty("--after", String(f))), ce(t, le(h.value, g.value), `${h.value} to ${g.value}`, n);
	}
}, fe = (e, t, n) => ((t / e) ** (1 / n) - 1) * 100, pe = {
	create: se,
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
			let e = y + (x - y) * k, n = b + (S - b) * k, c = t.offsetWidth * o / 2, l = n + t.offsetHeight * o / 2 + 8 * o, d = 0;
			r.forEach((t, n) => {
				let r = (u[n]?.offsetWidth || 0) * o / 2;
				if (Math.abs(i(n) - e) >= c + r) return;
				let f = a(t.value) - 7 * o - s;
				d = Math.max(d, l - f);
			}), b -= d, S -= d;
		}
		let A = x - D * g, j = S - O * g, M = Math.hypot(A - y, j - b) / o + 1;
		l.appendChild(H("line", {
			class: _,
			"data-note": n.note,
			x1: y,
			y1: b,
			x2: A,
			y2: j,
			style: `--len:${M.toFixed(1)}; ${B("--after", d)}`
		}));
		let N = -O, P = D, F = g * .42;
		l.appendChild(H("polygon", {
			class: v,
			"data-note": n.note,
			points: [
				`${x},${S}`,
				`${A + N * F},${j + P * F}`,
				`${A - N * F},${j - P * F}`
			].join(" "),
			style: B("--after", d)
		})), t && (G(t, y + (x - y) * k, b + (S - b) * k, R, c), t.style.setProperty("--after", String(d)));
		let I = Number.parseFloat(e.getAttribute("data-years") || "");
		!Number.isNaN(I) && I > 0 && ce(t, fe(f.value, p.value, I), `${f.value} to ${p.value} over ${I} years`, n);
	}
}, me = (e, t, n) => {
	let r = .15, i = Math.min(e * .7 / (t + (t - 1) * r), n), a = t * i + (t - 1) * i * r;
	return {
		size: i,
		gap: i * r,
		offset: (e) => -a / 2 + e * i * 1.15
	};
}, he = (e, t, n) => {
	let r = e.series[n], i = e.series.some((e) => e.focus) && !r.focus;
	return {
		"data-series": n + 1,
		...i && { "data-muted": "" },
		style: `--n:${n}; --m:${+!!i}; --palette:var(--tablechart-color-${n + 1}); ${B("--i", t.slot)}`
	};
}, K = (e, t) => {
	let n = 0;
	return Array.from({ length: t }, (t, r) => {
		let i = e.cells[r] ?? e.cells[0], a = n;
		return !i.missing && i.value > 0 && (n += i.value), {
			from: a,
			to: n,
			cell: i
		};
	});
}, ge = (e, t) => K(e, t).at(-1)?.to ?? 0, _e = (e, t, n) => {
	let r = t.series.some((e) => e.focus);
	e.style.setProperty("--n", String(n)), e.style.setProperty("--m", r && !t.series[n].focus ? "1" : "0"), e.style.setProperty("--palette", `var(--tablechart-color-${n + 1})`);
}, ve = (e, t, n, r = {}) => {
	let i = H("g", {
		class: U(p, t),
		"data-kind": "bar",
		"data-row": n + 1,
		...r,
		"data-stack": "",
		style: B("--i", t.slot)
	});
	return e.svg.appendChild(i), (n, r) => {
		i.appendChild(H("rect", {
			...r,
			class: U(m, t),
			...he(e, t, n)
		}));
	};
}, ye = 6, be = (e, t, n) => e.some((e) => e.offsetWidth * n > t - ye * n), xe = (e, t, n) => t >= e.offsetHeight * n * 1.6, Se = (e, t, n) => t >= e.offsetWidth * n * 1.5, Ce = (e, t, n, r, i = .7) => {
	e.style.setProperty(r, "1");
	let a = 1;
	for (let e of t) {
		let { size: t, room: r } = n(e);
		t > r && (a = Math.min(a, r / t));
	}
	let o = a >= i ? a : 0;
	return e.style.setProperty(r, String(o || i)), o;
}, we = (e, t) => (e.sort((e, t) => e.y - t.y), e.forEach((n, r) => {
	let i = e[r - 1];
	i && n.y < i.y + t && (n.y = i.y + t);
}), e), Te = {
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
	aspect: .5,
	minHeight: ({ labelHeight: e, nameHeight: t, rows: n, series: r, stacked: i }) => {
		let a = e * 1.1, o = r > 1 && !i ? a * (r + .15 * (r - 1)) / .7 : a / .58;
		return n * Math.max(o, t * 1.2);
	},
	categories: "beside",
	headroom: () => 0,
	draw(e) {
		let { segments: t, height: n, unit: r, svg: i, values: a, categories: o, config: s, barMax: c } = e, l = e.series.length > 1, u = Math.max(...o.map((e) => e.offsetWidth * r), 0), d = Math.min(u + 10 * r, R * .42), f = R - 4 * r, m = e.stacked ? Math.max(...e.rows.map((t) => ge(t, e.series.length)), 0) || 1 : Math.max(...e.rows.flatMap((t) => t.cells.slice(0, e.series.length).map((e) => Math.abs(e.value))), 0) || 1, g = (e) => e.offsetWidth * r, _ = (e) => e.length ? Math.max(...e.map(g)) + 9 * r : 0, v = e.stacked ? _(e.totals) : l ? _(e.seriesValues.flat()) : 0;
		if (!l) for (let e = 0; e < 3; e++) {
			let e = f - d - v, n = _(t.map((e, t) => ({
				seg: e,
				label: a[t]
			})).filter(({ seg: t, label: n }) => !Se(n, Math.abs(t.value) / m * e, r)).map(({ label: e }) => e));
			if (n <= v) break;
			v = n;
		}
		let y = f - d - v, b = (e) => d + Math.abs(e) / m * y, x = n / t.length, S = (e) => (e + .5) * x, C = Math.min(x * s.barfill, c);
		if (e.stacked) {
			e.rows.forEach((t, i) => {
				let a = ve(e, t, i, { "data-grow": "right" }), s = S(i) - C / 2, c = K(t, e.series.length);
				c.forEach(({ from: t, to: o, cell: c }, l) => {
					let u = e.seriesValues[l][i];
					if (u.dataset.place = "none", c.missing || o === t) return;
					let d = b(t), f = b(o);
					a(l, {
						x: d,
						y: s,
						width: Math.max(f - d, 1),
						height: C
					}), u.dataset.place = "inside", u.toggleAttribute("data-left-out", !Se(u, f - d, r) || u.offsetHeight * r > C), _e(u, e, l), G(u, (d + f) / 2, S(i), R, n);
				});
				let l = e.totals[i];
				l && (l.dataset.place = "after", G(l, b(c.at(-1)?.to ?? 0) + 5 * r, S(i), R, n));
				let u = o[i];
				u && G(u, d - 8 * r, S(i), R, n);
			}), i.appendChild(H("line", {
				class: h,
				x1: d,
				x2: d,
				y1: 0,
				y2: n
			}));
			return;
		}
		if (l) {
			let t = me(x, e.series.length, c);
			e.plot.dataset.grouped = "";
			let a = e.seriesValues.flat().filter((e) => e.dataset.missing === void 0), s = Ce(e.plot, a, (e) => ({
				size: e.offsetHeight * r,
				room: t.size + t.gap * .5
			}), "--tablechart-fit");
			e.rows.forEach((a, c) => {
				e.series.forEach((o, l) => {
					let u = a.cells[l] ?? a.cells[0], f = e.seriesValues[l][c];
					if (u.missing) {
						f.dataset.place = "none";
						return;
					}
					let m = b(u.value), h = S(c) + t.offset(l);
					i.appendChild(H("rect", {
						class: U(p, a),
						"data-kind": "bar",
						"data-row": c + 1,
						"data-grow": "right",
						x: d,
						y: h,
						width: Math.max(m - d, 1),
						height: t.size,
						...he(e, a, l)
					})), f.dataset.place = "after", f.toggleAttribute("data-left-out", !s), G(f, m + 5 * r, h + t.size / 2, R, n);
				});
				let l = o[c];
				l && G(l, d - 8 * r, S(c), R, n);
			}), i.appendChild(H("line", {
				class: h,
				x1: d,
				x2: d,
				y1: 0,
				y2: n
			}));
			return;
		}
		t.forEach((e, t) => {
			let s = b(e.value), c = S(t);
			i.appendChild(H("rect", {
				class: U(p, e),
				"data-kind": e.kind,
				"data-row": t + 1,
				"data-grow": "right",
				x: d,
				y: c - C / 2,
				width: Math.max(s - d, 1),
				height: C,
				style: B("--i", e.slot)
			}));
			let l = a[t], u = Se(l, s - d, r);
			l.dataset.place = u ? "inside" : "after", l.dataset.kind = e.kind, G(l, u ? s - 6 * r - l.offsetWidth * r / 2 : s + 5 * r, c, R, n);
			let f = o[t];
			f && G(f, d - 8 * r, c, R, n);
		}), i.appendChild(H("line", {
			class: h,
			x1: d,
			x2: d,
			y1: 0,
			y2: n
		}));
	}
}, Ee = {
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
		let { segments: t, cx: n, y: r, barWidth: i, height: a, unit: o, svg: s, values: c, labels: l } = e, u = r(0);
		if (e.stacked) {
			e.rows.forEach((t, s) => {
				let c = ve(e, t, s), l = n(s) - i / 2;
				K(t, e.series.length).forEach(({ from: t, to: u, cell: d }, f) => {
					let p = e.seriesValues[f][s];
					if (p.dataset.place = "none", d.missing || u === t) return;
					let m = r(u), h = r(t);
					c(f, {
						x: l,
						y: m,
						width: i,
						height: Math.max(h - m, 1)
					}), p.dataset.place = "inside", p.toggleAttribute("data-left-out", !xe(p, h - m, o) || p.offsetWidth * o > i - 4 * o), _e(p, e, f), G(p, n(s), (m + h) / 2, R, a);
				});
				let u = e.totals[s], d = K(t, e.series.length).at(-1)?.to ?? 0;
				u && (u.dataset.place = "outside", G(u, n(s), r(d) - 4 * o, R, a));
			}), s.appendChild(H("line", {
				class: h,
				x1: 0,
				x2: R,
				y1: u,
				y2: u
			}));
			return;
		}
		if (e.series.length > 1) {
			let t = me(n(1) - n(0) || n(0) * 2, e.series.length, e.barMax);
			e.plot.dataset.grouped = "";
			let i = e.seriesValues.flat().filter((e) => e.dataset.missing === void 0), c = Ce(e.plot, i, (e) => ({
				size: e.offsetWidth * o,
				room: t.size + t.gap * .5
			}), "--tablechart-fit");
			e.rows.forEach((i, l) => {
				e.series.forEach((d, f) => {
					let m = i.cells[f] ?? i.cells[0], h = e.seriesValues[f][l], g = n(l) + t.offset(f);
					if (m.missing) {
						h.dataset.place = "none";
						return;
					}
					let _ = r(m.value);
					s.appendChild(H("rect", {
						class: U(p, i),
						"data-kind": "bar",
						"data-row": l + 1,
						x: g,
						y: _,
						width: t.size,
						height: Math.max(u - _, 1),
						...he(e, i, f)
					})), h.dataset.place = "outside", h.toggleAttribute("data-left-out", !c), G(h, g + t.size / 2, _ - 4 * o, R, a);
				});
			}), s.appendChild(H("line", {
				class: h,
				x1: 0,
				x2: R,
				y1: u,
				y2: u
			}));
			return;
		}
		let d = be(c, i, o);
		t.forEach((e, t) => {
			let f = r(e.value);
			if (e.missing) {
				G(c[t], n(t), u - 4 * o, R, a), c[t].dataset.place = "outside";
				return;
			}
			s.appendChild(H("rect", {
				class: U(p, e),
				"data-kind": e.kind,
				"data-row": t + 1,
				x: n(t) - i / 2,
				y: f,
				width: i,
				height: Math.max(u - f, 1),
				style: B("--i", e.slot)
			}));
			let m = u - f, h = l === "inside" && !d && xe(c[t], m, o);
			G(c[t], n(t), h ? f + m / 2 : f - 4 * o, R, a), c[t].dataset.place = h ? "inside" : "outside";
		}), s.appendChild(H("line", {
			class: h,
			x1: 0,
			x2: R,
			y1: u,
			y2: u
		}));
	}
}, De = 0, Oe = (e) => e.filter((e) => !e.isTotal), ke = {
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
		let c = R / 2, l = t / 2, u = Oe(e).reduce((e, t) => e + Math.abs(t.value), 0);
		if (!u) return;
		let d = r * 1.2 + 10 * n, f = Math.max(Math.min(R, t) / 2 - d, 10), p = f * o.ringfill, m = f - p / 2, h = 2 * Math.PI * m, g = [], _ = 0, v = 0;
		if (e.forEach((e, o) => {
			let s = a[o];
			if (e.isTotal) {
				s.dataset.place = "none";
				return;
			}
			let d = Math.abs(e.value) / u * h, y = _ / h * 2 * Math.PI - Math.PI / 2;
			g.push(y), i.appendChild(H("circle", {
				class: U(x, e),
				"data-slice": v + 1,
				"data-row": o + 1,
				cx: c,
				cy: l,
				r: m,
				"stroke-width": p,
				transform: `rotate(-90 ${c} ${l})`,
				"stroke-dasharray": `${d.toFixed(1)} ${(h - d).toFixed(1)}`,
				"stroke-dashoffset": (-_).toFixed(1),
				style: `--n:${v}; --palette:var(--tablechart-color-${v + 1}); --arc:${d.toFixed(1)}; --circ:${h.toFixed(1)}; ${B("--i", e.slot)}`
			}));
			let b = y + d / h * Math.PI, S = Math.cos(b), C = Math.sin(b);
			i.appendChild(H("line", {
				class: j,
				x1: c + S * (f + 2 * n),
				y1: l + C * (f + 2 * n),
				x2: c + S * (f + 7 * n),
				y2: l + C * (f + 7 * n),
				"data-row": o + 1,
				style: B("--i", e.slot)
			}));
			let w = f + 9 * n, T = s.offsetWidth * n / 2;
			G(s, c + S * (w + Math.abs(S) * T), l + C * (w + Math.abs(C) * r * .7), R, t), s.dataset.place = "around", _ += d, v += 1;
		}), g.length > 1) {
			let e = m - p / 2 - 1, n = m + p / 2 + 1, r = `tablechart-slices-${++De}`, a = H("mask", {
				id: r,
				maskUnits: "userSpaceOnUse"
			});
			a.appendChild(H("rect", {
				x: 0,
				y: 0,
				width: R,
				height: t,
				fill: "white"
			}));
			for (let t of g) a.appendChild(H("line", {
				class: S,
				x1: c + Math.cos(t) * e,
				y1: l + Math.sin(t) * e,
				x2: c + Math.cos(t) * n,
				y2: l + Math.sin(t) * n
			}));
			let o = H("g", { mask: `url(#${r})` });
			for (let e of Array.from(i.querySelectorAll(`.${x}`))) o.appendChild(e);
			let s = H("defs");
			s.appendChild(a), i.prepend(s, o);
		}
		s && G(s, c, l, R, t);
	}
}, Ae = [
	"circle",
	"square",
	"diamond"
], je = (e, t) => {
	let n = e[t]?.marker?.toLowerCase().split(/\s+/) ?? [], r = Ae.find((e) => n.includes(e));
	return {
		shape: r ?? Ae[Math.floor(t / 2) % Ae.length],
		open: n.includes("open") || !n.includes("filled") && !r && t % 2 == 1
	};
}, Me = (e, t, n, r, i = {}) => {
	if (e === "square") {
		let e = r * .88;
		return H("rect", {
			x: t - e,
			y: n - e,
			width: e * 2,
			height: e * 2,
			...i
		});
	}
	if (e === "diamond") {
		let e = r * 1.2;
		return H("polygon", {
			points: `${t},${n - e} ${t + e},${n} ${t},${n + e} ${t - e},${n}`,
			...i
		});
	}
	return H("circle", {
		cx: t,
		cy: n,
		r,
		...i
	});
}, Ne = (e) => e.map((e) => ({
	...e,
	from: 0,
	to: e.value,
	kind: "bar"
})), Pe = (e) => ({
	segments: Ne,
	breakable: !0,
	series: !0,
	stackable: !0,
	swatch: e ? "box" : void 0,
	headroom: ({ labelHeight: e, unit: t }) => e * 1.6 + 6 * t,
	footroom: ({ labelHeight: t, unit: n, series: r, focused: i, stacked: a }) => !e && !a && r === 2 && !i ? t + 7 * n : 0,
	draw(t) {
		let { rows: n, series: r, seriesValues: i, names: a, cx: o, y: s, height: c, unit: l, labelHeight: u, svg: d, stacked: f } = t, p = t.shape === "step", m = s(0), g = r.length > 1, _ = r.some((e) => e.focus), v = n.length - 1, y = (e, t) => n[t]?.cells[e] ?? n[t]?.cells[0], b = n.map((e) => f ? K(e, r.length) : null), x = (e, t) => b[t]?.[e].to ?? y(e, t)?.value ?? 0, S = (e, t) => b[t]?.[e].from ?? 0, E = (e, t) => [o(t), s(x(e, t))], D = (e, t) => !y(e, t) || !!y(e, t)?.missing, A = r.map((e, t) => {
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
		}), j = (e, t) => B("--i", n[t].slot), M = n.length > 1 ? o(1) - o(0) : o(0) * 2, N = (e) => n.map((t, n) => ({
			i: n,
			next: n < v && !D(e, n + 1)
		})).filter(({ i: t, next: n }) => !D(e, t) && (p || n));
		if (e && r.forEach((e, t) => {
			let r = H("g", {
				class: w,
				...A[t].attrs,
				...f && { "data-stacked": "" },
				style: A[t].ink
			}), i = N(t), a = H("g", {
				class: T,
				style: `--rows:${n.length}; ${i.length ? j(t, p ? i[0].i : i[0].i + 1) : ""}`
			});
			r.appendChild(a);
			for (let { i: e, next: n } of i) {
				let r = p ? o(e) - M / 2 : o(e), i = p ? o(e) + M / 2 : o(e + 1), [c, u] = [s(x(t, e)), s(S(t, e))], [d, f] = p ? [c, u] : [s(x(t, e + 1)), s(S(t, e + 1))], m = p ? e + 1 : e + 2, h = p ? n : e + 1 < v && !D(t, e + 2), g = h ? 1.5 * l : 0, _ = (e, t, n, r) => (t - e) / (r - n), y = (e, t, n) => [p ? e : e + _(t, e, r, i) * g, p ? n : e + _(e, n, i, o(m)) * g], b = h ? Math.max(...y(d, c, s(x(t, m)))) : d, C = h ? Math.min(...y(f, u, s(S(t, m)))) : f;
				b >= C && (g = 0);
				let w = p ? [
					[r, u],
					[r, c],
					[i, c],
					[i, b],
					[i + g, b],
					[i + g, C],
					[i, C],
					[i, u]
				] : [
					[r, u],
					[r, c],
					[i, d],
					[i + g, b],
					[i + g, C],
					[i, f]
				];
				a.appendChild(H("polygon", {
					points: w.map((e) => e.join(",")).join(" "),
					"data-row": (p ? e : e + 1) + 1,
					style: j(t, p ? e : e + 1)
				}));
			}
			d.appendChild(r);
		}), r.forEach((e, t) => {
			let n = 0;
			for (let { i: r, next: i } of N(t)) {
				let a = p ? [
					[o(r) - M / 2, s(x(t, r))],
					[o(r) + M / 2, s(x(t, r))],
					...i ? [[o(r) + M / 2, s(x(t, r + 1))]] : []
				] : [E(t, r), E(t, r + 1)], c = 1;
				for (let e = 1; e < a.length; e++) {
					let [[t, n], [r, i]] = [a[e - 1], a[e]];
					c += Math.hypot(r - t, i - n) / l;
				}
				d.appendChild(H("polyline", {
					class: C,
					...A[t].attrs,
					points: a.map((e) => e.join(",")).join(" "),
					...e.line && { "data-line": e.line },
					"data-row": (p ? r : r + 1) + 1,
					style: `${A[t].ink}--len:${c.toFixed(1)}; --along:${(-n).toFixed(1)}; ${j(t, p ? r : r + 1)}`
				})), n += c - 1;
			}
		}), !p) {
			let e = r.map((e, t) => g ? je(r, t) : {
				shape: "circle",
				open: !1
			});
			te(d, r.flatMap((t, r) => e[r].open ? n.flatMap((t, n) => {
				if (D(r, n)) return [];
				let [i, a] = E(r, n);
				return [Me(e[r].shape, i, a, 4 * l, {
					class: k,
					"data-row": n + 1,
					...g && { "data-series": r + 1 },
					style: j(r, n)
				})];
			}) : []), R, c), r.forEach((t, r) => {
				n.forEach((t, n) => {
					if (D(r, n)) return;
					let [i, a] = E(r, n);
					d.appendChild(Me(e[r].shape, i, a, 4 * l, {
						class: O,
						...A[r].attrs,
						"data-marker": e[r].shape,
						...e[r].open && { "data-open": "" },
						"data-row": n + 1,
						style: `${A[r].ink}${j(r, n)}`
					}));
				});
			});
		}
		let P = (e, t) => {
			let n = t;
			for (; n < v && !D(e, n + 1) && y(e, n + 1)?.value === y(e, t)?.value;) n++;
			return n;
		}, F = (t, n) => {
			let i = y(t, n);
			if (!i || i.missing || p && n > 0 && !D(t, n - 1) && y(t, n - 1)?.value === i.value || _ && !r[t].focus) return "none";
			if (f) return "middle";
			if (!g || _ || r.length > 2) return "above";
			let a = y(1 - t, n);
			return !a || a.missing || i.value > a.value || i.value === a.value && t === 0 || e && E(t, n)[1] + 7 * l + u > m ? "above" : "below";
		}, I = (e, t) => !f && !p ? g && !_ && r.length > 2 : i[e][t].offsetWidth * l > (p ? P(e, t) - t + 1 : 1) * M - 4 * l || f && s(S(e, t)) - s(x(e, t)) < u * 1.2;
		i.forEach((e, t) => {
			e.forEach((e, n) => {
				let r = F(t, n);
				if (e.dataset.place = r === "above" ? "outside" : r, e.toggleAttribute("data-left-out", r !== "none" && I(t, n)), p && r !== "none" ? e.dataset.rowEnd = String(P(t, n) + 1) : delete e.dataset.rowEnd, r === "none") return;
				let i = e.offsetWidth * l / 2 + 4 * l, a = p ? (o(n) + o(P(t, n))) / 2 : r === "middle" && n === 0 ? o(n) + i : r === "middle" && n === v ? o(n) - i : o(n), u = s(x(t, n));
				G(e, a, r === "middle" ? (u + s(S(t, n))) / 2 : r === "above" ? u - 7 * l : u + 7 * l, R, c);
			});
		});
		let L = a.map((e, t) => {
			let n = v;
			for (; n > 0 && D(t, n);) n--;
			let [r, i] = E(t, n);
			return {
				name: e,
				x: (p ? r + M / 2 : r) + 10 * l,
				y: f ? (i + s(S(t, n))) / 2 : i
			};
		}), z = (a[0]?.offsetHeight || 0) * l;
		for (let e of we(L, z)) G(e.name, e.x, e.y, R, c);
		let V = !e && !f && r.length === 2 && !_ ? c - 2 * l : m;
		d.appendChild(H("line", {
			class: h,
			x1: 0,
			x2: o(v) + o(0),
			y1: V,
			y2: V
		}));
	}
}), Fe = Pe(!1), Ie = Pe(!0), Le = {
	segments: (e) => {
		let t = 0;
		return e.map((e) => {
			if (e.isTotal) return t = e.value, {
				...e,
				from: 0,
				to: e.value,
				kind: "total"
			};
			let n = t;
			return t += e.value, {
				...e,
				from: n,
				to: t,
				kind: e.value >= 0 ? "up" : "down"
			};
		});
	},
	breakable: !0,
	headroom: ({ labelHeight: e, badgeHeight: t, hasAnnotations: n, unit: r }) => e + 6 * r + (n ? t * 1.6 : 0),
	draw({ segments: e, cx: t, y: n, barWidth: r, height: i, unit: a, svg: o, values: s, breakAt: c }) {
		let l = n(0), u = be(s, r, a);
		e.forEach((i, a) => {
			let s = e[a + 1];
			if (!s) return;
			let c = n(i.to), l = t(a) + r / 2, u = t(a + 1) - r / 2;
			o.appendChild(H("line", {
				class: g,
				x1: l,
				x2: u,
				y1: c,
				y2: c,
				"data-row": a + 2,
				style: B("--i", s.slot)
			}));
		}), e.forEach((e, l) => {
			let d = n(Math.max(e.from, e.to)), f = Math.abs(n(e.from) - n(e.to));
			o.appendChild(H("rect", {
				class: U(p, e),
				"data-kind": e.kind,
				"data-row": l + 1,
				"data-grow": e.kind === "down" ? "down" : "up",
				x: t(l) - r / 2,
				y: d,
				width: r,
				height: Math.max(f, 1),
				style: B("--i", e.slot)
			}));
			let m = s[l], h = !(c !== null && Math.min(e.from, e.to) < c && Math.max(e.from, e.to) > c) && !u && xe(m, f, a);
			m.dataset.place = h ? "inside" : "outside", m.dataset.kind = e.kind;
			let g = h ? d + f / 2 : e.kind === "down" ? d + f + m.offsetHeight * a + 3 * a : d - 3 * a;
			G(m, t(l), g, R, i);
		}), o.appendChild(H("line", {
			class: h,
			x1: 0,
			x2: R,
			y1: l,
			y2: l
		}));
	}
}, q = {
	enabled: !1,
	log(...e) {
		q.enabled && console.log(`[${l}]`, ...e);
	}
}, Re = (e) => {
	let t = (e?.textContent || "").trim(), n = t.match(/^(.*?)(-?\d+(?:[.,]\d+)?)(.*)$/);
	return {
		raw: t,
		number: n?.[2] ?? "",
		prefix: n?.[1] ?? "",
		suffix: n?.[3] ?? "",
		missing: !n,
		value: n ? Number.parseFloat(n[2].replace(",", ".")) : 0
	};
}, ze = (e, t = "data-i18n") => Array.from(e.querySelectorAll("tbody tr")).map((e, n) => {
	let r = e.querySelector("th"), i = Array.from(e.querySelectorAll("td")).map(Re);
	return i.length || i.push(Re(null)), {
		...i[0],
		label: (r?.textContent || "").trim(),
		key: t && r?.getAttribute(t) || null,
		cells: i,
		classes: Array.from(e.classList),
		isTotal: e.getAttribute("data-kind") === "total",
		slot: n
	};
}), Be = (e) => Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1), Ve = (e) => e === "dashed" || e === "dotted" ? e : null, He = (e, t, n = "data-i18n") => {
	let r = Be(e), i = Math.max(1, ...t.map((e) => e.cells.length));
	return Array.from({ length: i }, (e, t) => {
		let i = r[t];
		return {
			name: (i?.textContent || "").trim(),
			key: n && i?.getAttribute(n) || null,
			focus: i?.getAttribute("data-kind") === "focus",
			marker: i?.getAttribute("data-marker") ?? null,
			line: Ve(i?.getAttribute("data-line"))
		};
	});
}, Ue = (e, t) => {
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
		let i = Be(r);
		i.length > 1 && i.forEach((n, r) => {
			n.getAttribute(t) || n.setAttribute(t, `${e}-col${r + 1}`);
		}), q?.log?.(`Keys for "${e}" written onto ${r.querySelectorAll("tbody th").length} rows`);
	}
}, We = {
	area: Ie,
	bar: Te,
	column: Ee,
	donut: ke,
	line: Fe,
	waterfall: Le
}, Ge = {
	"axis-break": re,
	trend: pe,
	bracket: de
}, Ke = Object.keys(Ge), qe = (e) => {
	let t = "";
	for (let n = e.previousSibling; n && (t = (n.textContent ?? "") + t, !t.trim()); n = n.previousSibling);
	return t.trim();
}, Je = (e) => {
	for (let t of e.querySelectorAll("br")) {
		if (t.previousElementSibling?.classList.contains("tablechart-sr") || /[.!?:;,…]$/.test(qe(t))) continue;
		let e = document.createElement("span");
		e.className = F, e.textContent = ". ", t.before(e);
	}
}, Ye = (e, t, n) => {
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
}, Xe = 0, Ze = (e) => {
	let t = e.querySelector(":scope > figcaption");
	if (!t) return;
	Je(t);
	let n = (e) => e.hasAttribute("aria-label") || e.hasAttribute("aria-labelledby"), r = (e) => {
		t.id ||= `tablechart-caption-${++Xe}`, e.setAttribute("aria-labelledby", t.id);
	};
	e.tagName === "FIGURE" && !n(e) && r(e);
	let i = e.querySelector("table");
	i && !n(i) && !i.querySelector(":scope > caption") && r(i);
}, Qe = (e, t, n = null) => {
	let r = n ?? (e.getAttribute("data-chart") || "column"), i = We[r];
	if (!i) return console.warn(`[${l}] Unknown chart type "${r}". Known types: ${Object.keys(We).join(", ")}.`), null;
	let a = ze(e, t.langattribute);
	if (!a.length) return console.warn(`[${l}] A chart has no rows in its table, so there is nothing to draw.`), null;
	Ze(e);
	let o = He(e, a, t.langattribute);
	o.length > 1 && !i.series && (console.warn(`[${l}] A ${r} chart draws one series; only the first of the table's ${o.length} value columns is used.`), o = o.slice(0, 1));
	let s = o.length > 1;
	s && e.style.setProperty("--tablechart-series-count", String(o.length));
	let c = e.hasAttribute("data-chart-stack");
	c && !i.stackable && console.warn(`[${l}] A ${r} chart cannot be stacked.`);
	let p = c && !!i.stackable && s;
	p && a.some((e) => e.cells.slice(0, o.length).some((e) => e.value < 0)) && console.warn(`[${l}] A stacked chart has a value below zero. It takes no room in the stack.`);
	let m = document.createElement("div");
	m.className = u, m.setAttribute("aria-hidden", "true");
	let h = H("svg", {
		role: "presentation",
		focusable: "false"
	});
	m.appendChild(h), e.appendChild(m);
	let g = i.centre ? a.filter((e) => !e.isTotal) : a, _ = Math.max(0, ...g.flatMap((e) => e.cells.slice(0, o.length).map((e) => ie(e.number)))), v = o.map((e, t) => a.map((e, n) => {
		let r = e.cells[t] ?? e.cells[0], i = W(f, m);
		return i.classList.add(...e.classes), i.dataset.value = String(r.value), r.prefix && (i.dataset.prefix = r.prefix), r.suffix && (i.dataset.suffix = r.suffix), r.missing && (i.dataset.missing = r.raw), s && (i.dataset.series = String(t + 1)), i.dataset.row = String(n + 1), i.style.setProperty("--i", String(e.slot)), i;
	})), y = v[0], b = p && i.totals ? a.map((e, t) => {
		let n = W(f, m);
		n.classList.add(...e.classes), n.dataset.kind = "total", n.dataset.row = String(t + 1), n.dataset.value = String(ge(e, o.length));
		let r = e.cells[0];
		return r.prefix && (n.dataset.prefix = r.prefix), r.suffix && (n.dataset.suffix = r.suffix), n.style.setProperty("--i", String(e.slot)), n;
	}) : [], x = a[a.length - 1], S = o.some((e) => e.focus), C = e.getAttribute("data-chart-legend"), w = s && (C === null ? t.legend || i.legend !== void 0 : C !== "false") ? document.createElement("div") : null;
	w && (w.className = D, w.setAttribute("aria-hidden", "true"), w.inert = !0);
	let T = s ? o.map((n, r) => {
		let a = W(E, w ?? m);
		w && (a.dataset.place = "legend");
		let s = i.legend ?? i.swatch;
		if (s && (a.dataset.swatch = s), a.textContent = n.name, !s && e.dataset.chartShape !== "step") {
			let e = je(o, r);
			a.dataset.marker = e.shape, a.toggleAttribute("data-open", e.open);
		}
		return n.line && !s && (a.dataset.line = n.line), n.key && t.langattribute && a.setAttribute(t.langattribute, n.key), a.dataset.series = String(r + 1), a.style.setProperty("--n", String(r)), a.style.setProperty("--palette", `var(--tablechart-color-${r + 1})`), a.style.setProperty("--m", S && !n.focus ? "1" : "0"), a.style.setProperty("--i", String(x.slot)), a;
	}) : [], O = i.centre ? W(A, m) : null;
	if (O) {
		let e = a.find((e) => e.isTotal), t = e ? e.value : a.reduce((e, t) => e + Math.abs(t.value), 0);
		O.dataset.value = String(t), e && (O.dataset.decimals = String(ie(e.number)));
	}
	let k = O && !a.some((e) => e.isTotal) ? Ye(e, O, t) : null, j = i.categories === "beside", M = document.createElement("div");
	M.className = d, M.setAttribute("aria-hidden", "true"), M.inert = !0, j ? M.dataset.place = "beside" : i.centre && (M.dataset.place = "key"), M.style.setProperty("--tablechart-columns", String(a.length));
	let N = 0;
	for (let e of a) {
		let n = document.createElement("span");
		n.classList.add(...e.classes), n.textContent = e.label, e.key && t.langattribute && n.setAttribute(t.langattribute, e.key), i.centre && (n.dataset.kind = e.isTotal ? "total" : "slice", e.isTotal || (n.dataset.slice = String(N + 1), n.style.setProperty("--n", String(N)), n.style.setProperty("--palette", `var(--tablechart-color-${N + 1})`), N += 1)), n.style.setProperty("--i", String(e.slot)), n.dataset.row = String(a.indexOf(e) + 1), M.appendChild(n);
	}
	(j ? m : e).appendChild(M), w && e.appendChild(w);
	let P = Array.from(e.querySelectorAll("[data-annotation]")).map((e) => {
		let t = e.getAttribute("data-annotation"), n = Ge[t];
		if (!n) return console.warn(`[${l}] Unknown annotation "${t}". Known annotations: ${Object.keys(Ge).join(", ")}.`), null;
		let r = Number.parseInt(e.getAttribute("data-series") ?? "1", 10), i = r >= 1 && r <= o.length ? r - 1 : 0;
		return r !== i + 1 && console.warn(`[${l}] An annotation reads line ${r}, which the chart does not have; it reads the first.`), {
			spec: e,
			type: n,
			badge: n.create(e, m),
			series: i,
			after: a.length
		};
	}).filter((e) => e !== null);
	t.animate && e.setAttribute("data-animate", "");
	let F = {
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
		annotations: P,
		checks: []
	};
	return t.hover && e.getAttribute("data-chart-hover") !== "false" && it(F), nt(F, t), F;
}, $e = (e, t, n, r) => {
	let i = getComputedStyle(e), a = (i.getPropertyValue(n).trim() || r).match(/^(\d+(?:\.\d+)?)(px|%|em|rem)$/);
	if (!a) return null;
	let o = Number(a[1]);
	return a[2] === "%" ? o / 100 * R : o * (a[2] === "em" ? Number.parseFloat(i.fontSize) : a[2] === "rem" ? Number.parseFloat(getComputedStyle(document.documentElement).fontSize) : 1) * t;
}, et = (e, t) => $e(e, t, "--tablechart-bar-max", "60px") ?? Infinity, tt = (e, t) => {
	let { plot: n, svg: r, rows: i, type: a, values: o, series: s, seriesValues: c, names: u, annotations: d } = e, f = n.clientWidth;
	if (!f) return !1;
	let p = R / f, m = Number.parseFloat(e.figure.dataset.chartAspect ?? ""), h = R * (m > 0 ? m : a.aspect ?? t.aspect);
	n.classList.add(N);
	let g = (o[0]?.offsetHeight || 0) * p, _ = d[0]?.badge ? d[0].badge.offsetHeight * p : 0, v = Math.max(h, $e(e.figure, p, "--tablechart-min-height", "200px") ?? 0, a.minHeight?.({
		labelHeight: g,
		nameHeight: Math.max(0, ...e.categories.map((e) => e.offsetHeight)) * p,
		unit: p,
		rows: i.length,
		series: s.length,
		stacked: e.stacked
	}) ?? 0), y = e.stacked ? i.map((e) => {
		let t = ge(e, s.length);
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
	}, S = a.headroom?.(x) ?? g, C = 2 * p + (a.footroom?.(x) ?? 0), w = S, T = e.stacked ? Math.max(...y.map((e) => e.value), 0) : Math.max(...b.flatMap((e) => [
		e.from,
		e.to,
		e.value
	]), ...i.flatMap((e) => e.cells.slice(0, s.length).map((e) => e.value))), E = v - w - C, D = T * 1.02, O = d.find((e) => e.spec.getAttribute("data-annotation") === "axis-break")?.spec, A = (e) => {
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
	let F = P ? P.gap : null, I = v - C, L = (e) => I - e / D * E;
	if (P) {
		let { lo: e, hi: t, gap: n, share: r } = P, i = E * r, a = (E - i - 13) / (e + (D - t)), o = i / (t - e);
		L = (r) => r <= e ? I - r * a : r <= n ? I - e * a - (r - e) * o : r <= t ? I - e * a - (r - e) * o - 13 : I - e * a - i - 13 - (r - t) * a;
	}
	let z = u.length ? Math.max(...u.map((e) => e.offsetWidth)) * p + 12 * p : 0, B = e.categories[0]?.parentElement;
	B && (B.style.paddingRight = z ? `${z / R * 100}%` : "");
	let V = (R - z) / i.length, U = (e) => (e + .5) * V, W = (e) => e >= 0 && e < i.length ? e : null;
	e.rowAt = a.centre ? null : a.categories === "beside" ? (e, t) => W(Math.floor(t * p / (v / i.length))) : (e) => W(Math.floor(e * p / V));
	let G = V / R * 100, ee = 100 / i.length;
	e.rowBox = a.categories === "beside" ? (e) => [
		0,
		e * ee,
		100,
		ee
	] : (e) => [
		e * G,
		0,
		G,
		100
	], r.setAttribute("viewBox", `0 0 ${R} ${v}`), r.textContent = "", e.checks = [];
	let ne = {
		rows: i,
		segments: b,
		cx: U,
		y: L,
		barWidth: Math.min(V * t.barfill, et(e.figure, p)),
		barMax: et(e.figure, p),
		height: v,
		unit: p,
		labelHeight: g,
		badgeHeight: _,
		after: i.length,
		note: 0,
		labels: e.figure.dataset.chartLabels === "inside" || e.figure.dataset.chartLabels !== "outside" && t.labels === "inside" ? "inside" : "outside",
		breakAt: F,
		stacked: e.stacked,
		shape: e.figure.dataset.chartShape === "step" ? "step" : "straight",
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
	a.draw(ne);
	let re = e.categories[0]?.parentElement;
	re && a.categories !== "beside" && Ce(re, e.categories.filter((e) => e.offsetParent !== null), (e) => ({
		size: e.scrollWidth,
		room: e.clientWidth
	}), "--tablechart-name-fit");
	for (let [t, n] of d.entries()) {
		n.badge?.setAttribute("data-note", String(t + 1));
		let r = n.series, a = (e) => ({
			...e,
			...e.cells[r] ?? e.cells[0]
		});
		n.type.draw(n.spec, n.badge, {
			...ne,
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
	return te(r, d.flatMap(({ badge: e }) => {
		if (!(e instanceof HTMLElement) || !e.offsetWidth) return [];
		let t = e.offsetWidth * p, n = e.offsetHeight * p, r = Number.parseFloat(e.style.left) / 100 * R, i = Number.parseFloat(e.style.top) / 100 * v, a = getComputedStyle(e).borderTopLeftRadius, o = a.endsWith("%") ? Number.parseFloat(a) / 100 : null, s = (Number.parseFloat(a) || 0) * p;
		return [H("rect", {
			class: k,
			"data-for": "badge",
			"data-note": e.dataset.note ?? "",
			x: r - t / 2,
			y: i - n / 2,
			width: t,
			height: n,
			rx: o === null ? s : t * o,
			ry: o === null ? s : n * o,
			style: ["--after"].map((t) => e.style.getPropertyValue(t) && `${t}:${e.style.getPropertyValue(t)}`).filter(Boolean).join("; ")
		})];
	}), R, v), !0;
}, nt = (e, t) => {
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
		r.textContent = i + ae(Number.parseFloat(r.dataset.value || "0"), r.dataset.decimals ? Number(r.dataset.decimals) : e.decimals, t.locale) + a;
	}
}, rt = (e, t) => {
	e.figure.classList.toggle(I, t), t || e.plot.removeAttribute("data-pointed");
}, it = (e) => {
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
}, at = (e) => e === "id" || e === "style" || e.startsWith("data-chart"), ot = /^\s*(?:Table)?:\s+/, st = (e) => e?.tagName === "P" && ot.test(e.textContent ?? ""), ct = (e) => {
	let t = document.createElement("figcaption");
	for (let { name: n, value: r } of Array.from(e.attributes)) t.setAttribute(n, r);
	let n = e.firstChild;
	n?.nodeType === Node.TEXT_NODE && (n.textContent = (n.textContent ?? "").replace(ot, ""), n.textContent || n.remove());
	let r = Array.from(e.childNodes), i = r.findIndex((e) => e.nodeName === "BR");
	if (t.append(...i === -1 ? r : r.slice(0, i + 1)), i !== -1 && i < r.length - 1) {
		let e = document.createElement("span");
		e.append(...r.slice(i + 1)), t.append(e);
	}
	return e.remove(), t;
}, lt = /^\s*([a-z][\w-]*)((?:\s+[\w-]+=[^\s:]+)*)\s*(:\s*|$)/, ut = (e) => {
	let t = J(e);
	return t?.tagName === "P" ? t : e;
}, dt = (e) => {
	let t = ut(e).firstChild;
	if (t?.nodeType !== Node.TEXT_NODE) return null;
	let n = lt.exec(t.textContent ?? "");
	if (!n || !Ke.includes(n[1]) || !n[3] && t.nextSibling) return null;
	let r = n[2].trim().split(/\s+/).filter(Boolean).map((e) => e.split("="));
	return {
		name: n[1],
		options: r,
		text: t,
		length: n[0].length
	};
}, ft = (e) => {
	if (e?.tagName !== "UL" && e?.tagName !== "OL") return null;
	let t = Array.from(e.children), n = t.map((e) => e.hasAttribute("data-annotation") ? null : dt(e));
	return !t.length || t.some((e, t) => !n[t] && !e.hasAttribute("data-annotation")) ? null : (t.forEach((e, t) => {
		let r = n[t], i = ut(e);
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
}, pt = (e, t) => {
	for (let { name: n, value: r } of Array.from(e.attributes)) (n === "class" || at(n)) && (t.setAttribute(n, r), e.removeAttribute(n));
}, mt = (e) => e.map((e) => {
	let t = e.closest("p"), n = st(t) ? t : e;
	if (n.tagName !== "TABLE" && n.tagName !== "P") return n;
	let r = document.createElement("div");
	pt(e, r), e.classList.length || e.removeAttribute("class");
	let i = n.tagName === "TABLE" ? n : null, a = n.previousElementSibling, o = n.nextElementSibling, s = i ? st(a) ? a : st(o) ? o : null : n;
	i && s === o && (o = o?.nextElementSibling ?? null);
	let c = o?.classList.contains("chart-annotations") ? o : ft(o);
	return n.replaceWith(r), s && r.append(ct(s)), i && r.append(i), c && r.append(c), q?.log?.(`A ${i ? "table" : "caption"} with chart attributes was wrapped in a figure of its own`), r;
}), ht = (e, t = []) => {
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
}, gt = async (e) => {
	await Promise.all(e.filter((e) => e.hasAttribute("data-chart-src")).map(async (e) => {
		let t = e.getAttribute("data-chart-src");
		for (let t of e.querySelectorAll("table")) t.remove();
		try {
			let n = await fetch(t);
			if (!n.ok) throw Error(`${n.status} ${n.statusText}`);
			let r = await n.json(), i = Array.isArray(r) ? r : r?.rows;
			if (!Array.isArray(i)) throw Error("no array of rows in it");
			let a = Array.isArray(r?.series) ? r.series.map(String) : [], o = e.querySelector(":scope > figcaption"), s = ht(i, a);
			o ? o.after(s) : e.prepend(s), q?.log?.(`Read ${i.length} rows from "${t}"`);
		} catch (e) {
			let n = window.location.protocol === "file:";
			console.warn(`[${l}] Could not read the chart data in "${t}": ${e.message}.` + (n ? " A page opened from the file system cannot fetch files; open the page from a server instead." : ""));
		}
	}));
}, J = (e) => {
	let t = Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.TEXT_NODE && e.textContent?.trim());
	return t.length === 1 && t[0] instanceof HTMLElement ? t[0] : null;
}, _t = "strong, b, span.total", vt = (e) => {
	for (let t of e) {
		for (let e of t.querySelectorAll("tbody tr")) {
			let t = e.cells[0];
			if (t?.tagName !== "TD" || e.cells.length < 2) continue;
			let n = document.createElement("th");
			for (let { name: e, value: r } of Array.from(t.attributes)) n.setAttribute(e, r);
			n.append(...t.childNodes), t.replaceWith(n);
			for (let t = J(n); t?.matches(_t); t = J(n)) e.dataset.kind = "total", t.replaceWith(...t.childNodes);
		}
		let e = Array.from(t.querySelector("thead tr:last-child")?.children ?? []);
		for (let t of e.slice(1)) for (let e = J(t); e?.matches(_t); e = J(t)) t.setAttribute("data-kind", "focus"), e.replaceWith(...e.childNodes);
	}
}, yt = "data-chart-made", bt = async (e, t) => {
	let n = mt(e.filter((e) => !e.hasAttribute(yt)));
	return await gt(n), vt(n), Ue(n, t.langattribute), n;
}, xt = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
})))(), 1), St = Object.defineProperty, Ct = (e, t) => {
	let n = {};
	for (var r in e) St(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || St(n, Symbol.toStringTag, { value: "Module" }), n;
}, wt = [
	".js",
	".min.js",
	".mjs"
], Y = (() => {
	let e = import.meta;
	if (typeof e?.url == "string" && e.url !== "") return e.url;
	let t = typeof document < "u" ? document.currentScript : null;
	return t && "src" in t && t.src ? t.src : "";
})(), Tt = (e) => {
	let t = e.lastIndexOf("/");
	return t === -1 ? "" : e.slice(0, t + 1);
}, Et = (e) => {
	let t = e.split(/[?#]/)[0];
	return t.slice(t.lastIndexOf("/") + 1);
}, Dt = (e, t) => wt.some((n) => e === `${t}${n}`), Ot = [
	/\/@fs\//,
	/\/@id\//,
	/\/\.vite\/deps\//,
	/[?&][vt]=/
], kt = (e) => Ot.some((t) => t.test(e)), At = (e) => {
	if (typeof document < "u") {
		let t = wt.map((t) => `script[src$="${e}${t}"]`).join(", "), n = document.querySelector(t)?.getAttribute("src");
		if (n) return { directory: Tt(n) };
	}
	return Y && !kt(Y) && Dt(Et(Y), e) ? { directory: Tt(Y) } : { directory: null };
}, jt = (e) => At(e).directory !== null, Mt = /* @__PURE__ */ new Map(), Nt = (e = "") => {
	let t = Mt.get(e);
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
	let l = e !== "" && jt(e), u = {
		hasResolvableSource: l,
		hasWindow: n,
		hasDocument: r,
		isBundled: !l,
		isDevelopment: s || c,
		hasHMR: s,
		isViteDev: c
	};
	return Mt.set(e, u), u;
}, Pt = class {
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
		this.userConfigData = n, this.mergedConfig = (0, xt.default)(t, n, {
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
	getEnvironmentInfo = () => Nt(this.pluginId);
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
}, Ft = "data-css-id", It = (e, t) => new Promise((n, r) => {
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = t, i.setAttribute(Ft, e);
	let a = setTimeout(() => {
		i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Timeout loading CSS from: ${t}`));
	}, 5e3);
	i.onload = () => {
		clearTimeout(a), n();
	}, i.onerror = () => {
		clearTimeout(a), i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Failed to load CSS from: ${t}`));
	}, document.head.appendChild(i);
}), Lt = (e) => document.querySelectorAll(`[${Ft}="${e}"]`).length > 0, Rt = 1e4, zt = (e) => new Promise((t) => {
	if (X(e)) return t(!0);
	if (typeof MutationObserver > "u") return t(!1);
	let n = !1, r = (e) => {
		n || (n = !0, i.disconnect(), clearTimeout(o), window.removeEventListener("load", a), t(e));
	}, i = new MutationObserver(() => {
		X(e) && r(!0);
	});
	i.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributeFilter: ["href", "rel"]
	});
	let a = () => requestAnimationFrame(() => r(X(e)));
	document.readyState === "complete" ? a() : window.addEventListener("load", a, { once: !0 });
	let o = setTimeout(() => r(X(e)), Rt);
}), X = (e) => {
	if (Lt(e)) return !0;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
	} catch {
		return !1;
	}
}, Z = ((e) => new Proxy(e, { get: (e, t) => {
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
}()), Bt = /* @__PURE__ */ new Set(), Vt = (e, t) => {
	let n = `${e}::${t}`;
	Bt.has(n) || (Bt.add(n), console.warn(`[${e}] ${t}`));
}, Ht = (e) => [`dist/plugin/${e}/${e}.css`, `plugin/${e}/${e}.css`], Ut = (e) => typeof e == "string" && e.trim() !== "", Wt = async (e, t) => {
	let { cssautoload: n, csspath: r, debug: i = !1 } = t;
	if (n === !1 || r === !1) return i && console.log(`[${e}] CSS loading is switched off`), { status: "skipped" };
	if (Ut(r)) {
		let t = r.trim(), n = X(e), a = n && !!document.querySelector(`[data-css-id="${e}"]`);
		try {
			return await It(e, t), i && console.log(`[${e}] CSS loaded from: ${t}`), n && Vt(e, `Loaded CSS from ${t}, but a stylesheet for this plugin was already on the page (${a ? "a tagged <link>" : "an import or inline <style>"}) — csspath adds one, it cannot remove one. Both are live and the cascade decides. Remove the other import or <link>, or drop csspath.`), {
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
	if (X(e)) return i && console.log(`[${e}] CSS is already imported, skipping`), { status: "present" };
	let { directory: a } = At(e);
	if (a !== null || n === !0) {
		let t = [...a === null ? [] : [`${a}${e}.css`], ...Ht(e)].filter((e, t, n) => n.indexOf(e) === t);
		for (let n of t) try {
			return await It(e, n), i && console.log(`[${e}] CSS loaded from: ${n}`), {
				status: "loaded",
				path: n
			};
		} catch {
			i && console.log(`[${e}] No CSS at: ${n}`);
		}
		return console.warn(`[${e}] Could not load CSS. Tried: ${t.join(", ")}. Import the stylesheet yourself, or set csspath to where it is.`), { status: "failed" };
	}
	return zt(e).then((t) => {
		t || Vt(e, `CSS could not be autoloaded here, because the plugin is part of a bundle. Import it once in your own code: import 'reveal.js-${e}/${e}.css'`);
	}), { status: "advised" };
};
async function Gt(e, t) {
	if ("getEnvironmentInfo" in e && t) {
		let n = e, r = n.userConfig, i = "cssautoload" in r && r.cssautoload !== "auto" ? t.cssautoload : void 0;
		return Wt(n.pluginId, {
			...t,
			cssautoload: i
		});
	}
	let { id: n, cssautoload: r, csspath: i, debug: a } = e;
	return Wt(n, {
		cssautoload: r === "auto" ? void 0 : r,
		csspath: i,
		debug: a
	});
}
var Kt = /* @__PURE__ */ Ct({
	ENTRANCE_ATTRIBUTE: () => Jt,
	IN_EVENT: () => qt,
	SHOWN_EVENT: () => Q,
	announce: () => tn,
	markPending: () => en,
	pendingAround: () => rn,
	reset: () => nn,
	stateOf: () => Qt,
	whenShown: () => an
}), Q = "entranceshown", qt = "entrancein", Jt = "data-entrance", Yt = {
	pending: 0,
	shown: 1,
	in: 2
}, Xt = Symbol.for("reveal.js-plugintoolkit.entranceTimers"), Zt = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Qt(e) {
	let t = e.getAttribute(Jt);
	return t === "pending" || t === "shown" || t === "in" ? t : null;
}
function $(e, t) {
	if (e.setAttribute(Jt, t), t === "pending") return;
	let n = {
		element: e,
		state: t
	};
	e.dispatchEvent(new CustomEvent(t === "shown" ? Q : qt, {
		bubbles: !0,
		detail: n
	}));
}
function $t(e) {
	for (let t of e[Xt] ?? []) window.clearTimeout(t);
	delete e[Xt];
}
function en(e) {
	$t(e), $(e, "pending");
}
function tn(e, t) {
	$t(e);
	let n = Math.max(0, t.delay ?? 0), r = Math.max(0, t.duration), i = Number.parseFloat(e.dataset.entranceAt ?? ""), a = Number.isFinite(i) ? Math.min(1, Math.max(0, i)) : .5;
	$(e, "pending"), e[Xt] = [window.setTimeout(() => $(e, "shown"), n + r * a), window.setTimeout(() => {
		Qt(e) === "pending" && $(e, "shown"), $(e, "in"), delete e[Xt];
	}, n + r)];
}
function nn(e) {
	en(e);
}
function rn(e, t = "shown") {
	let n = [];
	for (let r = e; r && r.tagName !== "SECTION"; r = r.parentElement) {
		let e = Qt(r);
		e && Yt[e] < Yt[t] && n.push(r);
	}
	return n;
}
function an(e, t = "shown", n) {
	if (n?.aborted) return Promise.resolve(!1);
	if (Zt()) return Promise.resolve(!0);
	let r = rn(e, t);
	return r.length ? new Promise((i) => {
		let a = () => {
			rn(e, t).length || (s(), i(!0));
		}, o = () => {
			s(), i(!1);
		}, s = () => {
			for (let e of r) e.removeEventListener(Q, a), e.removeEventListener(qt, a);
			n?.removeEventListener("abort", o);
		};
		for (let e of r) e.addEventListener(Q, a), e.addEventListener(qt, a);
		n?.addEventListener("abort", o);
	}) : Promise.resolve(!0);
}
//#endregion
//#region src/plugin/js/config.ts
var on = "tablechart", sn = "tablechart-steps", cn = [
	"together",
	"delay",
	"after"
], ln = {
	...z,
	sequence: "together",
	sequencedelay: 0,
	cssautoload: !0,
	csspath: ""
}, un = [
	"axis-break",
	"trend",
	"bracket"
], dn = "em, i, .fragment", fn = (e, t) => {
	e.setAttribute("data-fragment", "");
	let n = t.getAttribute("data-fragment-index");
	n !== null && e.setAttribute("data-fragment-index", n), t.classList.remove("fragment"), t.removeAttribute("data-fragment-index"), t.classList.length || t.removeAttribute("class");
}, pn = (e) => {
	let t = Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.TEXT_NODE && e.textContent?.trim());
	return t.length === 1 && t[0] instanceof Element ? t[0] : null;
}, mn = (e) => {
	let t = [...Array.from(e.querySelectorAll("tbody tr")).map((e) => ({
		owner: e,
		cells: Array.from(e.children)
	})), ...Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1).map((e) => ({
		owner: e,
		cells: [e]
	}))];
	for (let { owner: e, cells: n } of t) {
		for (let t of n) t.classList.contains("fragment") && fn(e, t);
		let t = n[0];
		if (t) for (let n = pn(t); n?.matches(dn); n = pn(t)) fn(e, n), n.replaceWith(...n.childNodes);
	}
}, hn = (e) => {
	let t = e.hasAttribute("data-fragment"), n = Array.from(e.querySelectorAll("tbody tr")), r = Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1), i = n.map((e) => ({
		fragment: t || e.hasAttribute("data-fragment"),
		fragmentIndex: e.getAttribute("data-fragment-index"),
		step: null,
		slot: 0
	})), a = r.map((e) => ({
		fragment: e.hasAttribute("data-fragment"),
		fragmentIndex: e.getAttribute("data-fragment-index"),
		step: null
	})), o = Array.from(e.querySelectorAll("[data-annotation]")).filter((e) => un.includes(e.getAttribute("data-annotation") ?? ""));
	if (!i.some((e) => e.fragment) && !a.some((e) => e.fragment) && !o.some((e) => e.hasAttribute("data-fragment"))) return null;
	let s = [], c = /* @__PURE__ */ new Map(), l = [], u = (e) => {
		let t = e === null ? void 0 : c.get(e);
		return t === void 0 && (t = s.length, s.push(e), l.push(0), e !== null && c.set(e, t)), t;
	}, d = 0;
	for (let e of i) {
		if (!e.fragment) {
			e.slot = d++;
			continue;
		}
		e.step = u(e.fragmentIndex), e.slot = l[e.step]++;
	}
	for (let e of a) e.fragment && (e.step = u(e.fragmentIndex));
	return {
		plan: {
			rows: i,
			series: a,
			notes: o.map((e) => {
				let t = e.getAttribute("data-annotation") === "bracket", n = (t, n) => {
					let r = Number.parseInt(e.getAttribute(t) ?? "", 10);
					return Number.isFinite(r) ? r - 1 : n;
				}, [r, o] = t ? [n("data-from", 0), n("data-to", i.length - 1)] : [0, i.length - 1], s = null;
				for (let e = Math.min(r, o); e <= Math.max(r, o); e++) {
					let t = i[e]?.step;
					t != null && (s === null || t > s) && (s = t);
				}
				let c = Number.parseInt(e.getAttribute("data-series") ?? "1", 10) - 1, l = a[c]?.step ?? null;
				l !== null && (s === null || l > s) && (s = l), e.hasAttribute("data-fragment") && (s = u(e.getAttribute("data-fragment-index")));
				let d = s === null ? i.length : i.filter((e) => e.step === s).length;
				return {
					step: s,
					after: d
				};
			}),
			count: s.length
		},
		indexes: s
	};
}, gn = (e, t) => {
	if (!t.length) return;
	let n = document.createElement("span");
	n.className = sn, n.setAttribute("aria-hidden", "true");
	for (let e of t) {
		let t = document.createElement("span");
		t.className = "fragment", e !== null && t.setAttribute("data-fragment-index", e), n.appendChild(t);
	}
	e.appendChild(n), e.setAttribute("data-steps", "");
}, _n = (e, t) => {
	let n = t.rows.length - 1, r = (e, t, n, r) => {
		e.style.setProperty(n, String(r)), t === null ? e.style.removeProperty("--step") : e.style.setProperty("--step", String(t));
	};
	for (let i of e.querySelectorAll("[data-row], [data-series], [data-note]")) {
		if (i.closest("table")) continue;
		let e = Number(i.dataset.note);
		if (e > 0) {
			let n = t.notes[e - 1];
			n && r(i, n.step, "--after", n.after);
			continue;
		}
		let a = i.dataset.row ? Number(i.dataset.row) - 1 : n, o = i.dataset.series ? t.series[Number(i.dataset.series) - 1] : void 0;
		o && o.step !== null ? r(i, o.step, "--i", a) : t.rows[a] && r(i, t.rows[a].step, "--i", t.rows[a].slot);
	}
}, vn = (e) => {
	let t = e.querySelectorAll(`:scope > .${sn} > .fragment`);
	if (!t.length) return;
	let n = 0;
	for (let e of t) e.classList.contains("visible") && n++;
	e.style.setProperty("--tablechart-step", String(n));
}, yn = "tablechart-measuring", { pendingAround: bn, whenShown: xn } = Kt, Sn = (e) => {
	for (let t = e.parentElement; t && t.tagName !== "SECTION"; t = t.parentElement) if (t.dataset.entrance) return !0;
	return !1;
}, Cn = (e) => Math.max(0, ...getComputedStyle(e ?? document.body).transitionDuration.split(",").map((e) => Number.parseFloat(e) * 1e3 || 0)), wn = async (e, t, n) => {
	let r = t.getConfig(), i = r.view === "print" || /print-pdf/gi.test(window.location.search);
	Z && (n.debug || r.debug) && (Z.initialize(!0, on), Z.log("Tablechart debugging enabled."));
	let a = t.getViewportElement() ?? document.body, o = Array.from(a.querySelectorAll(n.selector));
	if (!o.length) return;
	n.langattribute = r.internation?.langattribute || n.langattribute;
	let s = /* @__PURE__ */ new Map();
	for (let e of o) {
		let t = e.closest("section") ?? a;
		s.set(t, [...s.get(t) ?? [], e]);
	}
	let c = (await Promise.all([...s.values()].map((e) => bt(e, n)))).flat(), l = /* @__PURE__ */ new WeakMap();
	if (n.animate && !i) for (let e of c) {
		mn(e);
		let t = hn(e);
		t && (l.set(e, t.plan), gn(e, t.indexes));
	}
	let u = c.map((e) => Qe(e, n)).filter((e) => e !== null);
	for (let { figure: e } of u) {
		let t = e.querySelector(":scope > figcaption");
		if (!t?.id || t.dataset.name) continue;
		let n = t.parentElement?.closest("[id], [data-name]"), r = n?.dataset.name || n?.id;
		r && (t.dataset.name = r);
	}
	await Gt(e, n);
	let d = () => {
		a.classList.add(yn), t.layout(), a.classList.remove(yn);
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
		r && cn.includes(r) ? i = r : r && console.warn(`Tablechart: data-chart-sequence="${r}" is not one of ${cn.join(", ")}.`);
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
		if (bn(e.figure, "shown").length) {
			await xn(e.figure, "shown");
			return;
		}
		await new Promise(requestAnimationFrame);
		let t = e.figure.getAnimations().filter((e) => e instanceof CSSAnimation);
		for (let n = e.figure.parentElement; n && n.tagName !== "SECTION"; n = n.parentElement) t.push(...n.getAnimations());
		let n = 0;
		for (let e of t) {
			let t = e.effect?.getComputedTiming(), r = Number(t?.activeDuration ?? 0);
			if (!t || !Number.isFinite(r)) continue;
			let i = Number(t.delay ?? 0) + r / 2;
			n = Math.max(n, i - Number(e.currentTime ?? 0));
		}
		n > 0 && await x(n);
	}, w = async (e, t, n) => {
		let r = { live: !0 };
		for (let t of e) b.set(t, r);
		if (!(t !== "together" && e.some((e) => Sn(e.figure)) && (await Promise.all(e.map((e) => xn(e.figure, "in"))), !r.live))) for (let [i, a] of e.entries()) {
			if (i > 0 && (t === "after" && await S(e[i - 1].figure), n && await x(n)), await C(a), !r.live) return;
			a.figure.classList.remove(L), rt(a, !0);
		}
	}, T = () => {
		let e = /* @__PURE__ */ new Map();
		for (let t of u) {
			if (vn(t.figure), !(g.has(t) && h(t))) {
				let e = b.get(t);
				e && (e.live = !1), b.delete(t), rt(t, !1), t.figure.classList.toggle(L, y(t).mode !== "together" && !Sn(t.figure));
				continue;
			}
			if (t.figure.classList.contains("is-shown") || b.has(t)) continue;
			let { group: n, mode: r, delay: i } = y(t);
			if (r === "together" || !n) {
				t.figure.classList.remove(L), w([t], "together", 0);
				continue;
			}
			Sn(t.figure) || t.figure.classList.add(L);
			let a = e.get(n) ?? {
				mode: r,
				delay: i,
				charts: []
			};
			a.charts.push(t), e.set(n, a);
		}
		for (let { mode: t, delay: n, charts: r } of e.values()) w(r, t, n);
	}, E = (e) => {
		let t = e.plot.clientWidth;
		if (!t || t === g.get(e)) return;
		let r = !g.has(e), a = e.figure.offsetHeight;
		if (!tt(e, n)) return;
		g.set(e, t);
		let o = l.get(e.figure);
		o && _n(e.figure, o), e.figure.offsetHeight !== a && m(), i && rt(e, !0), r && n.animate && _ && T();
	};
	for (let e of u) {
		E(e);
		let t = !1, n = e.figure.offsetHeight;
		new ResizeObserver(() => {
			t || (t = !0, requestAnimationFrame(() => {
				t = !1, E(e), e.figure.offsetHeight !== n && (n = e.figure.offsetHeight, m());
			}));
		}).observe(e.figure);
	}
	if (new MutationObserver(() => {
		for (let e of u) nt(e, n);
		requestAnimationFrame(() => requestAnimationFrame(() => {
			for (let e of u) g.delete(e), E(e);
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
			_ = !1, clearTimeout(e), e = setTimeout(n, Cn(t.getCurrentSlide()) + 50);
		}), t.on("ready", n), t.on("fragmentshown", T), t.on("fragmenthidden", T), T();
	}
	Z?.log?.(`Tablechart started ${u.length} chart(s).`);
}, Tn = () => new Pt(on, wn, ln).createInterface();
//#endregion
export { Tn as default };
