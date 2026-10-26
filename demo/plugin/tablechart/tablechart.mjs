 /*****************************************************************
 *
 * reveal.js-tablechart for Reveal.js 
 * Version 1.1.3
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


// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = "tablechart", u = "tablechart-plot", d = "tablechart-value", f = "tablechart-bar", p = "tablechart-rule", m = "tablechart-line", h = "tablechart-reference", g = "tablechart-head", _ = "tablechart-slice", v = "tablechart-name", y = "tablechart-legend", b = "tablechart-point", x = "tablechart-hole", S = "tablechart-centre", C = "tablechart-break", w = "is-placed", T = "tablechart-sr", E = "is-shown", D = "is-at-once", O = "tablechart-queued", k = "tablechart-axis", A = "tablechart-tick", j = "tablechart-grid", M = 1e3, N = {
	selector: "[data-chart]",
	aspect: .38,
	barfill: .58,
	ringfill: .42,
	animate: !0,
	entrance: .5,
	labels: "outside",
	shape: "straight",
	legend: !1,
	axis: !1,
	grid: !1,
	names: !0,
	tooltip: "auto",
	tooltipparent: null,
	table: "never",
	totallabel: "Total",
	controls: !0,
	previouslabel: "Previous",
	nextlabel: "Next",
	stephint: "step of the chart",
	threshold: .5,
	replay: !1,
	langattribute: "data-i18n"
}, P = "cubic-bezier(0.3, 0.3, 0.6, 1)", F = (e, t, n = 1) => ({
	start: e,
	span: t,
	easing: e + t >= n - 1e-4 ? P : "linear"
}), I = (e, t) => `${e}:${t}`, L = "http://www.w3.org/2000/svg", R = (e) => Math.round(e * 100) / 100, z = (e, t = {}) => {
	let n = document.createElementNS(L, e);
	for (let e in t) {
		let r = t[e];
		n.setAttribute(e, String(typeof r == "number" ? R(r) : r));
	}
	return n;
}, B = (e, t) => [e, ...t.classes].join(" "), V = (e, t) => {
	let n = document.createElement("span");
	return n.className = e, n.inert = !0, t.appendChild(n), n;
}, H = (e, t, n, r, i) => {
	e.style.left = `${t / r * 100}%`, e.style.top = `${n / i * 100}%`;
}, U = 0, W = 0, ee = (e) => {
	let t = e.querySelector(":scope > defs");
	return t || (t = z("defs"), e.prepend(t)), t;
}, te = (e) => {
	let [t, n, r, i, a, o] = [
		"x",
		"y",
		"width",
		"height",
		"rx",
		"ry"
	].map((t) => Number(e.getAttribute(t)) || 0), s = Math.min(a, r / 2), c = Math.min(o, i / 2), l = (e, t) => s && c ? `a${R(s)},${R(c)} 0 0 1 ${R(e)},${R(t)}` : "";
	return `M${R(t + s)},${R(n)}h${R(r - 2 * s)}${l(s, c)}v${R(i - 2 * c)}${l(-s, c)}h${R(2 * s - r)}${l(-s, -c)}v${R(2 * c - i)}${l(s, -c)}z`;
}, ne = (e, t, n, r, i) => {
	if (!t.length || !i.length) return;
	let a = `tablechart-clip-${++W}`, o = z("clipPath", {
		id: a,
		clipPathUnits: "userSpaceOnUse"
	}), s = `M${-n},${-r}h${n * 3}v${r * 3}h${-n * 3}z`;
	o.appendChild(z("path", {
		d: s + t.map(te).join(""),
		"clip-rule": "evenodd"
	})), ee(e).appendChild(o);
	for (let e of i) e.setAttribute("clip-path", `url(#${a})`);
}, re = (e, t, n, r, i, a) => {
	if (!t.length) return;
	let o = `tablechart-cut-${++U}`, s = z("mask", {
		id: o,
		maskUnits: "userSpaceOnUse"
	});
	s.appendChild(z("rect", {
		x: -n,
		y: -r,
		width: n * 3,
		height: r * 3,
		fill: "white"
	}));
	for (let e of t) e.setAttribute("fill", "black"), s.appendChild(e);
	let c = ee(e);
	if (c.appendChild(s), i) {
		for (let e of i) e.setAttribute("mask", `url(#${o})`);
		return;
	}
	let l = null;
	for (let t of Array.from(e.childNodes)) t !== c && (a && t instanceof Element && t.matches(a) ? (l = null, e.appendChild(t)) : (l ??= e.appendChild(z("g", { mask: `url(#${o})` })), l.appendChild(t)));
}, ie = 0, ae = (e) => Array.from(e.querySelectorAll(`.${f}`)).map((e) => {
	let t = e.tagName === "rect" ? [e] : Array.from(e.querySelectorAll("rect")), n = (e, t) => Number(e.getAttribute(t)), r = Math.min(...t.map((e) => n(e, "x"))), i = Math.min(...t.map((e) => n(e, "y"))), a = Math.max(...t.map((e) => n(e, "x") + n(e, "width"))), o = Math.max(...t.map((e) => n(e, "y") + n(e, "height"))), s = ["--start", "--span"].map((t) => e.style.getPropertyValue(t) && `${t}:${e.style.getPropertyValue(t)}`).filter(Boolean).join("; ");
	return {
		row: Number(e.dataset.row),
		x: r,
		y: i,
		width: a - r,
		height: o - i,
		sideways: e.dataset.grow === "right",
		part: s
	};
}), oe = {
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
		}, l = (e, t = !1) => e.map(([e, t], n) => `${n === 0 ? "M" : "L"} ${e.toFixed(1)} ${t.toFixed(1)}`).join(" ") + (t ? " Z" : ""), u = `tablechart-break-${++ie}`, d = z("mask", {
			id: u,
			maskUnits: "userSpaceOnUse"
		});
		d.appendChild(z("rect", {
			x: -M,
			y: -n.height,
			width: M * 3,
			height: n.height * 3,
			fill: "white"
		}));
		let f = [], p = i(o);
		for (let e of ae(a)) {
			let t = e.sideways ? n.breakX : p;
			if (t === void 0 || !(e.sideways ? e.x < t && e.x + e.width > t : e.y < p && e.y + e.height > p)) continue;
			let [i, o] = e.sideways ? [c(e, t), c(e, t + n.breakGap)] : [c(e, p - n.breakGap), c(e, p)];
			d.appendChild(z("path", {
				d: l([...i, ...o.slice().reverse()], !0),
				fill: "black"
			})), f.push(i, o);
			let s = [I("--after", r[e.row - 1]?.slot ?? 0), e.part].filter(Boolean).join("; ");
			for (let e of [i, o]) a.appendChild(z("path", {
				class: C,
				"data-part": "edge",
				"data-note": n.note,
				d: l(e),
				style: s
			}));
		}
		if (!f.length) return;
		let m = Array.from(a.querySelectorAll(`.${C}`)), h = z("g", { mask: `url(#${u})` });
		for (let e of Array.from(a.childNodes)) m.includes(e) || h.appendChild(e);
		let g = z("defs");
		g.appendChild(d), a.prepend(g, h);
	}
}, G = (e) => {
	let t = -Infinity;
	for (let n of e) t = Math.max(t, n);
	return t;
}, K = (e) => (e.split(/[.,]/)[1] || "").length, se = (e, t) => new Intl.NumberFormat(t || document.documentElement.lang || void 0, {
	minimumFractionDigits: e,
	maximumFractionDigits: e
}), ce = (e, t, n) => {
	let r = se(t, n).formatToParts(e), i = r[0]?.type === "minusSign" ? r[0].value : "";
	return [i, r.slice(+!!i).map((e) => e.value).join("")];
}, le = (e) => Number.parseFloat((e.match(/-?[\d.,]+/) || ["NaN"])[0].replace(",", ".")), ue = (e, t) => {
	let n = document.createElement("span");
	if (n.className = "tablechart-badge", n.inert = !0, e.childElementCount > 0) for (let t of Array.from(e.children)) n.appendChild(t.cloneNode(!0));
	else {
		n.textContent = (e.textContent || "").trim();
		let t = e.getAttribute("data-i18n");
		t && n.setAttribute("data-i18n", t);
	}
	return t.appendChild(n), n;
}, de = (e, t, n, r, i = "%") => {
	let a = e?.textContent || "", o = le(a), s = i ? .5 : .5 * 10 ** -K(a.match(/-?[\d.,]+/)?.[0] ?? ""), c = Number.isNaN(o) ? !0 : Math.abs(t - o) <= s + 1e-9, u = {
		label: n,
		computed: t,
		stated: o,
		agrees: c
	};
	r.checks.push(u), c || console.warn(`[${l}] An annotation reads ${o}${i}, but ${n} is ${Number(t.toFixed(2))}${i}. The chart shows your number.`);
}, fe = (e, t) => (t - e) / Math.abs(e) * 100, q = (e, t) => {
	let n = (t, n) => {
		let r = Number.parseInt(e.getAttribute(t) ?? "", 10);
		return Number.isFinite(r) ? r - 1 : n;
	};
	return [n("data-from", 0), n("data-to", t - 1)];
}, pe = {
	create: ue,
	draw(e, t, n) {
		let { rows: r, cx: i, y: a, unit: o, labelHeight: s, badgeHeight: c, height: u, svg: d, after: f } = n, [p, h] = q(e, r.length), _ = r[p], v = r[h];
		if (!_ || !v) {
			console.warn(`[${l}] A bracket points at a row that is not there (row ${p + 1} to ${h + 1}, of ${r.length}).`);
			return;
		}
		let y = 7 * o, b = 4 * o, x = i(p), S = i(h), C = Math.min(a(_.value), a(v.value)) - s - b - c * .9, w = (e) => a(e) - s - b, T = `M ${x} ${w(_.value)} L ${x} ${C} L ${S} ${C} L ${S} ${w(v.value) - y}`, E = (w(_.value) - C + Math.abs(S - x) + (w(v.value) - y - C)) / o + 1;
		d.appendChild(z("path", {
			class: m,
			"data-note": n.note,
			d: T,
			style: `--len:${E.toFixed(1)}; ${I("--after", f)}`
		}));
		let D = w(v.value);
		d.appendChild(z("polygon", {
			class: g,
			"data-note": n.note,
			points: `${S},${D} ${S - y * .45},${D - y} ${S + y * .45},${D - y}`,
			style: I("--after", f)
		})), t && (H(t, (x + S) / 2, C, 1e3, u), t.style.setProperty("--after", String(f))), de(t, fe(_.value, v.value), `${_.value} to ${v.value}`, n);
	}
}, me = (e, t) => e[0] < t[0] + t[2] && t[0] < e[0] + e[2] && e[1] < t[1] + t[3] && t[1] < e[1] + e[3], he = (e, t) => e[0] >= t[0] && e[1] >= t[1] && e[0] + e[2] <= t[0] + t[2] && e[1] + e[3] <= t[1] + t[3], ge = (e, t, n) => {
	if (e.length > 400) return e.map(() => null);
	let r = 1;
	for (let t of e) for (let [, , e, n] of t) r = Math.max(r, e, n);
	let i = /* @__PURE__ */ new Map(), a = ([e, t, n, i]) => {
		let a = [];
		for (let o = Math.floor(e / r); o <= Math.floor((e + n) / r); o++) for (let e = Math.floor(t / r); e <= Math.floor((t + i) / r); e++) a.push(`${o} ${e}`);
		return a;
	}, o = (e) => {
		for (let t of a(e)) i.get(t)?.push(e) ?? i.set(t, [e]);
	}, s = (e) => he(e, n) && a(e).every((t) => !i.get(t)?.some((t) => me(e, t)));
	return t.forEach(o), e.map((e) => {
		let t = e.findIndex(s);
		return t < 0 ? null : (o(e[t]), t);
	});
}, _e = /* @__PURE__ */ new WeakMap(), ve = (e) => {
	let t = [...e].filter((e) => !!e), n = t.map((e) => ({
		width: e.offsetWidth,
		height: e.offsetHeight
	}));
	t.forEach((e, t) => _e.set(e, n[t]));
}, J = (e) => _e.get(e) ?? {
	width: e.offsetWidth,
	height: e.offsetHeight
}, ye = (e, t, n) => {
	let r = n.reduce((e, t) => e + t, 0);
	if (e === "mean") return r ? t.reduce((e, t, r) => e + t * n[r], 0) / r : null;
	if (e === "median") {
		let e = t.map((e, t) => [e, n[t]]).sort((e, t) => e[0] - t[0]), i = 0;
		for (let [t, [n, a]] of e.entries()) {
			if (i += a, Math.abs(i - r / 2) < 1e-9 && e[t + 1]) return (n + e[t + 1][0]) / 2;
			if (i > r / 2) return n;
		}
		return null;
	}
	let i = Number.parseFloat(e);
	return Number.isFinite(i) ? i : null;
}, be = {
	create(e, t) {
		if (!e.textContent?.trim()) return null;
		let n = ue(e, t);
		return n.dataset.kind = "reference", n;
	},
	draw(e, t, n) {
		let { rows: r, cx: i, y: a, x: o, height: s, unit: c, svg: u, after: d } = n, f = r.filter((e) => !e.isTotal && !e.missing), p = e.hasAttribute("data-name"), m = (e.getAttribute(p ? "data-name" : "data-value") ?? "").trim(), g, _, v;
		if (p) {
			let e = f.map((e) => le(e.label));
			if (n.categories[0]?.parentElement?.dataset.place === "beside" || e.some(Number.isNaN)) {
				console.warn(`[${l}] A reference line among the names needs names that are numbers, under columns or points.`);
				return;
			}
			let t = ye(m, e, f.map((e) => e.value)), a = t === null ? -1 : e.findIndex((n, r) => n <= t && t <= (e[r + 1] ?? n)), [o, s] = [f[a], f[a + 1] ?? f[a]].map((e) => i(r.indexOf(e))), c = t === null || a < 0 || e[a + 1] === void 0 || e[a + 1] === e[a] ? 0 : (t - e[a]) / (e[a + 1] - e[a]);
			v = t, _ = a < 0 ? null : o + c * (s - o), g = !1;
		} else {
			let t = !!n.frame && e.getAttribute("data-axis") === "y", r = n.frame ? n.series.flatMap((e, t) => e.group ? [] : [t])[+!!t] ?? 0 : 0;
			v = ye(m, f.map((e) => e.cells[r]?.value ?? e.value), f.map(() => 1)), g = t || !o, _ = v === null ? null : o && !t ? o(v) : a(v);
		}
		if (_ === null || v === null) {
			console.warn(`[${l}] A reference line needs a number, "mean" or "median", not "${m}".`);
			return;
		}
		let [y, b, x, S] = n.frame ? [
			n.frame[0],
			n.frame[1],
			n.frame[0] + n.frame[2],
			n.frame[1] + n.frame[3]
		] : [
			0,
			0,
			r.length > 0 ? i(r.length - 1) + i(0) : M,
			o ? s : a(0)
		];
		if (u.insertBefore(z("line", {
			class: h,
			"data-note": n.note,
			...e.getAttribute("data-line") === "dotted" && { "data-line": "dotted" },
			...g ? {
				x1: y,
				x2: x,
				y1: _,
				y2: _
			} : {
				x1: _,
				x2: _,
				y1: b,
				y2: S
			},
			style: I("--after", d)
		}), u.querySelector(":scope > .tablechart-point")), t) {
			let e = J(t).width * c, r = J(t).height * c, i = 4 * c, a = g ? [
				[
					x - e,
					_ - r / 2,
					e,
					r
				],
				[
					x - e,
					_ - r - i,
					e,
					r
				],
				[
					x - e,
					_ + i,
					e,
					r
				]
			] : [
				b,
				b + r,
				b + 2 * r
			].flatMap((t) => [
				[
					_ - e / 2,
					t,
					e,
					r
				],
				[
					_ + i,
					t,
					e,
					r
				],
				[
					_ - i - e,
					t,
					e,
					r
				]
			]), [o] = ge([a], n.taken, [
				0,
				0,
				M,
				s
			]), l = a[o ?? 0];
			n.taken.push(l), H(t, l[0] + e / 2, l[1] + r / 2, M, s), t.style.setProperty("--after", String(d)), (m === "mean" || m === "median") && de(t, v, `the ${m}`, n, "");
		}
	}
}, xe = (e, t, n) => ((t / e) ** (1 / n) - 1) * 100, Se = {
	create: ue,
	draw(e, t, n) {
		let { rows: r, cx: i, y: a, unit: o, labelHeight: s, height: c, svg: l, values: u, after: d } = n, f = r[0], p = r[r.length - 1];
		if (!f || !p) return;
		let h = s + 18 * o, _ = 10 * o, v = 10 * o, y = i(0), b = a(f.value) - h, x = i(r.length - 1), S = a(p.value) - h, C = 0;
		r.forEach((e, t) => {
			let n = x === y ? 0 : (i(t) - y) / (x - y), r = b + n * (S - b) - (a(e.value) - h);
			r > C && (C = r);
		}), b -= C, S -= C;
		let w = x - y, T = S - b, E = Math.hypot(w, T) || 1, D = w / E, O = T / E;
		y -= D * _, b -= O * _, x += D * _, S += O * _;
		let k = Number.parseFloat(e.getAttribute("data-at") || "0.5");
		if (t) {
			let e = y + (x - y) * k, n = b + (S - b) * k, c = J(t).width * o / 2, l = n + J(t).height * o / 2 + 8 * o, d = 0;
			r.forEach((t, n) => {
				let r = (u[n] ? J(u[n]).width : 0) * o / 2;
				if (Math.abs(i(n) - e) >= c + r) return;
				let f = a(t.value) - 7 * o - s;
				d = Math.max(d, l - f);
			}), b -= d, S -= d;
		}
		let A = x - D * v, j = S - O * v, M = Math.hypot(A - y, j - b) / o + 1;
		l.appendChild(z("line", {
			class: m,
			"data-note": n.note,
			x1: y,
			y1: b,
			x2: A,
			y2: j,
			style: `--len:${M.toFixed(1)}; ${I("--after", d)}`
		}));
		let N = -O, P = D, F = v * .42;
		l.appendChild(z("polygon", {
			class: g,
			"data-note": n.note,
			points: [
				`${x},${S}`,
				`${A + N * F},${j + P * F}`,
				`${A - N * F},${j - P * F}`
			].join(" "),
			style: I("--after", d)
		})), t && (H(t, y + (x - y) * k, b + (S - b) * k, 1e3, c), t.style.setProperty("--after", String(d)));
		let L = Number.parseFloat(e.getAttribute("data-years") || "");
		!Number.isNaN(L) && L > 0 && de(t, xe(f.value, p.value, L), `${f.value} to ${p.value} over ${L} years`, n);
	}
}, Ce = (e, t, n, r, i) => {
	if (!r) return e / t * n;
	let { lo: a, hi: o, gap: s, share: c } = r, l = n * c, u = (n - l - i) / (a + (t - o)), d = l / (o - a);
	return e <= a ? e * u : e <= s ? a * u + (e - a) * d : e <= o ? a * u + (e - a) * d + i : a * u + l + i + (e - o) * u;
}, we = (e, t, n) => {
	let r = .15, i = Math.min(e * .7 / (t + (t - 1) * r), n), a = t * i + (t - 1) * i * r;
	return {
		size: i,
		gap: i * r,
		offset: (e) => -a / 2 + e * i * 1.15
	};
}, Te = (e, t, n) => {
	let r = e.series[n], i = e.series.some((e) => e.focus) && !r.focus;
	return {
		"data-series": n + 1,
		...i && { "data-muted": "" },
		style: `--n:${n}; --m:${+!!i}; --palette:var(--tablechart-color-${n + 1}); ${I("--i", t.slot)}`
	};
}, Ee = (e, t, n = !1) => {
	let r = 0, i = 0;
	return Array.from({ length: t }, (t, a) => {
		let o = e.cells[a] ?? e.cells[0], s = o.missing ? 0 : o.value;
		if (n) {
			let e = r;
			return r += s, {
				from: e,
				to: r,
				cell: o
			};
		}
		if (s < 0) {
			let e = i;
			return i += s, {
				from: e,
				to: i,
				cell: o
			};
		}
		let c = r;
		return r += s, {
			from: c,
			to: r,
			cell: o
		};
	});
}, Y = (e, t, n = !1) => {
	let r = Ee(e, t, n);
	return {
		top: Math.max(0, ...r.map((e) => e.to)),
		bottom: Math.min(0, ...r.map((e) => e.to))
	};
}, De = (e, t) => {
	let { top: n, bottom: r } = Y(e, t);
	return n + r;
}, Oe = (e, t, n) => {
	let r = t.series.some((e) => e.focus);
	e.style.setProperty("--n", String(n)), e.style.setProperty("--m", r && !t.series[n].focus ? "1" : "0"), e.style.setProperty("--palette", `var(--tablechart-color-${n + 1})`);
}, ke = (e, t, n, r = {}, i = "") => {
	let a = {
		class: B(f, t),
		"data-kind": "bar",
		"data-row": n + 1,
		...r
	}, o = I("--i", t.slot) + (i ? `; transform-origin: ${i}` : ""), s = z("g", {
		...a,
		"data-stack": "",
		style: o
	});
	return e.svg.appendChild(s), (i, a) => {
		let o = r["data-grow"] === void 0 ? {} : { "data-grow": r["data-grow"] };
		s.appendChild(z("rect", {
			...o,
			...a,
			class: B("tablechart-piece", t),
			"data-row": n + 1,
			...Te(e, t, i)
		}));
	};
}, Ae = 6, je = (e, t, n) => e.some((e) => J(e).width * n > t - Ae * n), Me = (e, t, n) => t >= J(e).height * n * 1.6, X = (e, t, n) => t >= J(e).width * n * 1.5, Ne = (e, t, n, r, i = .7) => {
	e.style.setProperty(r, "1");
	let a = 1;
	for (let e of t) {
		let { size: t, room: r } = n(e);
		t > r && (a = Math.min(a, r / t));
	}
	let o = a >= i ? a : 0;
	return e.style.setProperty(r, String(o || i)), o;
}, Pe = (e, t) => (e.sort((e, t) => e.y - t.y), e.forEach((n, r) => {
	let i = e[r - 1];
	i && n.y < i.y + t && (n.y = i.y + t);
}), e), Fe = {
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
		let { segments: t, height: n, unit: r, svg: i, values: a, categories: o, config: s, barMax: c } = e, l = e.series.length > 1, u = Math.max(G(o.map((e) => J(e).width * r)), 0), d = Math.min(u + 10 * r, M * .42);
		o[0]?.parentElement?.style.setProperty("--_beside", `${((d - 8 * r) / M * 100).toFixed(2)}%`);
		let m = M - 4 * r, h = e.stacked ? Math.max(G(e.rows.map((t) => Y(t, e.series.length).top)), 0) || 1 : Math.max(G(e.rows.flatMap((t) => t.cells.slice(0, e.series.length).map((e) => Math.abs(e.value)))), 0) || 1, g = e.stacked ? Math.max(G(e.rows.map((t) => -Y(t, e.series.length).bottom)), 0) : Math.max(G(e.rows.flatMap((t) => t.cells.slice(0, e.series.length).map((e) => -e.value))), 0), _ = Math.max(h, e.domain?.[1] ?? 0), v = Math.max(g, -(e.domain?.[0] ?? 0)), y = Math.max(_, e.squeeze?.hi ?? 0) + v, b = (t, n) => Ce(Math.abs(t), y, n, e.squeeze, e.breakGap), x = n / t.length, S = (e) => (e + .5) * x, C = Math.min(x * s.barfill, c), w = we(x, e.series.length, c), T = a[0] ?? e.totals[0], E = T ? J(T).height * r * .56 : 0, D = Math.max(((l && !e.stacked ? w.size : C) - E) / 2, 5 * r), O = (e) => J(e).width * r, k = (e) => e.length ? G(e.map(O)) + D + 4 * r : 0, A = (t, n) => (e.rows[n].cells[t] ?? e.rows[n].cells[0]).value, j = e.seriesValues.flatMap((e, t) => e.map((e, n) => ({
			label: e,
			value: A(t, n)
		}))), N = (t) => {
			let n = Y(e.rows[t], e.series.length);
			return n.top === 0 && n.bottom < 0;
		}, P = e.stacked ? k(e.totals.filter((e, t) => !N(t))) : l ? k(j.filter((e) => e.value >= 0).map((e) => e.label)) : 0, F = e.stacked ? k(e.totals.filter((e, t) => N(t))) : l ? k(j.filter((e) => e.value < 0).map((e) => e.label)) : 0;
		if (!l && !e.stacked) for (let e = 0; e < 3; e++) {
			let e = m - d - P - F, n = t.map((e, t) => ({
				seg: e,
				label: a[t]
			})).filter(({ seg: t, label: n }) => !X(n, b(t.value, e), r)), i = k(n.filter(({ seg: e }) => e.value >= 0).map(({ label: e }) => e)), o = k(n.filter(({ seg: e }) => e.value < 0).map(({ label: e }) => e));
			if (i <= P && o <= F) break;
			P = Math.max(P, i), F = Math.max(F, o);
		}
		let L = m - d - P - F, R = d + F + b(v, L), V = (e) => e < 0 ? R - b(e, L) : R + b(e, L);
		if (e.squeeze && (e.breakX = V(e.squeeze.gap)), e.x = V, e.stacked) {
			e.rows.forEach((t, i) => {
				let a = Y(t, e.series.length), s = ke(e, t, i, { "data-grow": "right" }, a.bottom < 0 ? `${R - V(a.bottom)}px center` : ""), c = S(i) - C / 2;
				Ee(t, e.series.length).forEach(({ from: t, to: a, cell: o }, l) => {
					let u = e.seriesValues[l][i];
					if (u.dataset.place = "none", o.missing || a === t) return;
					let d = Math.min(V(t), V(a)), f = Math.max(V(t), V(a));
					s(l, {
						x: d,
						y: c,
						width: Math.max(f - d, 1),
						height: C,
						...a < t && { "data-grow": "left" }
					}), u.dataset.place = "inside", u.toggleAttribute("data-left-out", !X(u, f - d, r) || J(u).height * r > C), Oe(u, e, l), H(u, (d + f) / 2, S(i), M, n);
				});
				let l = e.totals[i];
				l && (l.dataset.place = N(i) ? "before" : "after", H(l, N(i) ? V(a.bottom) - D : V(a.top) + D, S(i), 1e3, n));
				let u = o[i];
				u && H(u, d - 8 * r, S(i), 1e3, n);
			}), i.appendChild(z("line", {
				class: p,
				x1: R,
				x2: R,
				y1: 0,
				y2: n
			}));
			return;
		}
		if (l) {
			e.plot.dataset.grouped = "";
			let t = e.seriesValues.flat().filter((e) => e.dataset.missing === void 0), a = Ne(e.plot, t, (e) => ({
				size: J(e).height * r,
				room: w.size + w.gap * .5
			}), "--_fit");
			e.rows.forEach((t, s) => {
				e.series.forEach((r, o) => {
					let c = t.cells[o] ?? t.cells[0], l = e.seriesValues[o][s];
					if (c.missing) {
						l.dataset.place = "none";
						return;
					}
					let u = V(c.value), d = c.value < 0, p = S(s) + w.offset(o), m = Math.max(Math.abs(u - R), 1);
					c.value !== 0 && i.appendChild(z("rect", {
						class: B(f, t),
						"data-kind": "bar",
						"data-row": s + 1,
						"data-grow": d ? "left" : "right",
						x: d ? R - m : R,
						y: p,
						width: m,
						height: w.size,
						...Te(e, t, o)
					})), l.dataset.place = d ? "before" : "after", l.toggleAttribute("data-left-out", !a), H(l, d ? u - D : u + D, p + w.size / 2, M, n);
				});
				let c = o[s];
				c && H(c, d - 8 * r, S(s), 1e3, n);
			}), i.appendChild(z("line", {
				class: p,
				x1: R,
				x2: R,
				y1: 0,
				y2: n
			}));
			return;
		}
		let U = t.map((e, t) => X(a[t], Math.abs(V(e.value) - R), r));
		t.forEach((t, s) => {
			let c = V(t.value), l = S(s), u = t.value < 0, p = Math.abs(c - R), m = Math.max(p, 1);
			t.value !== 0 && i.appendChild(z("rect", {
				class: B(f, t),
				"data-kind": t.kind,
				"data-row": s + 1,
				"data-grow": u ? "left" : "right",
				x: u ? R - m : R,
				y: l - C / 2,
				width: m,
				height: C,
				style: I("--i", t.slot)
			}));
			let h = a[s], g = Math.max(Math.min(D, p - O(h) - 6 * r), 6 * r), _ = u ? 1 : -1;
			h.dataset.place = U[s] ? "inside" : u ? "before" : "after", h.dataset.kind = t.kind, H(h, U[s] ? e.insideAlign === "center" ? (R + c) / 2 : e.insideAlign === "start" ? R - _ * (g + O(h) / 2) : c + _ * (g + O(h) / 2) : c - _ * D, l, M, n);
			let v = o[s];
			v && H(v, d - 8 * r, l, 1e3, n);
		}), i.appendChild(z("line", {
			class: p,
			x1: R,
			x2: R,
			y1: 0,
			y2: n
		}));
	}
}, Ie = {
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
				let c = Y(t, e.series.length), l = ke(e, t, s, {}, c.bottom < 0 ? `center ${d - r(c.top)}px` : ""), u = n(s) - i / 2;
				Ee(t, e.series.length).forEach(({ from: t, to: c, cell: d }, f) => {
					let p = e.seriesValues[f][s];
					if (p.dataset.place = "none", d.missing || c === t) return;
					let m = Math.min(r(c), r(t)), h = Math.max(r(c), r(t));
					l(f, {
						x: u,
						y: m,
						width: i,
						height: Math.max(h - m, 1),
						...c < t && { "data-grow": "down" }
					}), p.dataset.place = "inside", p.toggleAttribute("data-left-out", !Me(p, h - m, o) || J(p).width * o > i - 4 * o), Oe(p, e, f), H(p, n(s), (m + h) / 2, M, a);
				});
				let f = e.totals[s];
				if (f) {
					let e = c.top === 0 && c.bottom < 0;
					f.dataset.place = e ? "below" : "outside", H(f, n(s), e ? r(c.bottom) + 4 * o : r(c.top) - 4 * o, M, a);
				}
			}), s.appendChild(z("line", {
				class: p,
				x1: 0,
				x2: M,
				y1: d,
				y2: d
			}));
			return;
		}
		if (e.series.length > 1) {
			let t = we(n(1) - n(0) || n(0) * 2, e.series.length, e.barMax);
			e.plot.dataset.grouped = "";
			let i = e.seriesValues.flat().filter((e) => e.dataset.missing === void 0), c = Ne(e.plot, i, (e) => ({
				size: J(e).width * o,
				room: t.size + t.gap * .5
			}), "--_fit");
			e.rows.forEach((i, l) => {
				e.series.forEach((u, p) => {
					let m = i.cells[p] ?? i.cells[0], h = e.seriesValues[p][l], g = n(l) + t.offset(p);
					if (m.missing) {
						h.dataset.place = "none";
						return;
					}
					let _ = r(m.value), v = m.value < 0, y = Math.max(Math.abs(d - _), 1);
					m.value !== 0 && s.appendChild(z("rect", {
						class: B(f, i),
						"data-kind": "bar",
						"data-row": l + 1,
						...v && { "data-grow": "down" },
						x: g,
						y: v ? d : d - y,
						width: t.size,
						height: y,
						...Te(e, i, p)
					})), h.dataset.place = v ? "below" : "outside", h.toggleAttribute("data-left-out", !c), H(h, g + t.size / 2, v ? _ + 4 * o : _ - 4 * o, M, a);
				});
			}), s.appendChild(z("line", {
				class: p,
				x1: 0,
				x2: M,
				y1: d,
				y2: d
			}));
			return;
		}
		let m = je(c, i, o), h = t.map((e, t) => l === "inside" && !m && !e.missing && Me(c[t], Math.abs(d - r(e.value)), o)), g = c[0] ? J(c[0]).height * o * .56 : 0, _ = Infinity;
		for (let [e, t] of c.entries()) h[e] && (_ = Math.min(_, (i - J(t).width * o) / 2));
		t.forEach((e, t) => {
			let l = r(e.value), p = e.value < 0;
			if (e.missing) {
				H(c[t], n(t), d - 4 * o, M, a), c[t].dataset.place = "outside";
				return;
			}
			let m = Math.max(Math.abs(d - l), 1);
			e.value !== 0 && s.appendChild(z("rect", {
				class: B(f, e),
				"data-kind": e.kind,
				"data-row": t + 1,
				...p && { "data-grow": "down" },
				x: n(t) - i / 2,
				y: p ? d : d - m,
				width: i,
				height: m,
				style: I("--i", e.slot)
			}));
			let v = p ? -1 : 1, y = Math.min(_, (Math.abs(d - l) - g) / 2), b = u === "center" ? (l + d) / 2 : u === "start" ? d - v * (y + g / 2) : l + v * (y + g / 2), x = p ? l + 4 * o : l - 4 * o;
			H(c[t], n(t), h[t] ? b : x, M, a), c[t].dataset.place = h[t] ? "inside" : p ? "below" : "outside";
		}), s.appendChild(z("line", {
			class: p,
			x1: 0,
			x2: M,
			y1: d,
			y2: d
		}));
	}
}, Le = 0, Re = (e) => e.filter((e) => !e.isTotal), ze = {
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
		let c = M / 2, l = t / 2, u = Re(e).reduce((e, t) => e + Math.abs(t.value), 0);
		if (!u) return;
		let d = r * 1.2 + 10 * n, f = Math.max(Math.min(M, t) / 2 - d, 10), p = f * o.ringfill, m = f - p / 2, h = 2 * Math.PI * m, g = [], v = 0, y = 0, b = 0;
		if (e.forEach((e, o) => {
			let s = a[o];
			if (e.isTotal) {
				s.dataset.place = "none";
				return;
			}
			let d = Math.abs(e.value) / u, x = F(b, d), S = `--share:${d.toFixed(4)}; --start:${x.start.toFixed(4)}; --span:${x.span.toFixed(4)};`, C = d * h, w = v / h * 2 * Math.PI - Math.PI / 2;
			g.push(w), i.appendChild(z("circle", {
				class: B(_, e),
				"data-slice": y + 1,
				"data-row": o + 1,
				cx: c,
				cy: l,
				r: m,
				"stroke-width": p,
				transform: `rotate(-90 ${c} ${l})`,
				"stroke-dasharray": `${C.toFixed(1)} ${(h - C).toFixed(1)}`,
				"stroke-dashoffset": (-v).toFixed(1),
				style: `--n:${y}; --palette:var(--tablechart-color-${y + 1}); --arc:${C.toFixed(1)}; --circ:${h.toFixed(1)}; ${S} --ease:${x.easing}; ${I("--i", e.slot)}`
			}));
			let T = w + C / h * Math.PI, E = Math.cos(T), D = Math.sin(T);
			i.appendChild(z("line", {
				class: "tablechart-leader",
				x1: c + E * (f + 2 * n),
				y1: l + D * (f + 2 * n),
				x2: c + E * (f + 7 * n),
				y2: l + D * (f + 7 * n),
				"data-row": o + 1,
				style: `${S} ${I("--i", e.slot)}`
			})), s.style.setProperty("--start", x.start.toFixed(4)), s.style.setProperty("--span", x.span.toFixed(4));
			let O = f + 9 * n, k = J(s).width * n / 2;
			H(s, c + E * (O + Math.abs(E) * k), l + D * (O + Math.abs(D) * r * .7), 1e3, t), s.dataset.place = "around", v += C, b += d, y += 1;
		}), g.length > 1) {
			let e = m - p / 2 - 1, n = m + p / 2 + 1, r = `tablechart-slices-${++Le}`, a = z("mask", {
				id: r,
				maskUnits: "userSpaceOnUse"
			});
			a.appendChild(z("rect", {
				x: 0,
				y: 0,
				width: M,
				height: t,
				fill: "white"
			}));
			for (let t of g) a.appendChild(z("line", {
				class: "tablechart-divide",
				x1: c + Math.cos(t) * e,
				y1: l + Math.sin(t) * e,
				x2: c + Math.cos(t) * n,
				y2: l + Math.sin(t) * n
			}));
			let o = z("g", { mask: `url(#${r})` });
			for (let e of Array.from(i.querySelectorAll(`.${_}`))) o.appendChild(e);
			let s = z("defs");
			s.appendChild(a), i.prepend(s, o);
		}
		s && H(s, c, l, 1e3, t);
	}
}, Be = [
	"circle",
	"square",
	"diamond"
], Ve = (e, t) => {
	let n = e[t]?.marker?.toLowerCase().split(/\s+/) ?? [], r = Be.find((e) => n.includes(e));
	return {
		shape: r ?? Be[Math.floor(t / 2) % Be.length],
		open: n.includes("open") || !n.includes("filled") && !r && t % 2 == 1
	};
}, He = (e, t, n, r, i = {}) => {
	if (e === "square") {
		let e = r * .88;
		return z("rect", {
			x: t - e,
			y: n - e,
			width: e * 2,
			height: e * 2,
			...i
		});
	}
	if (e === "diamond") {
		let e = r * 1.2;
		return z("polygon", {
			points: `${t},${n - e} ${t + e},${n} ${t},${n + e} ${t - e},${n}`,
			...i
		});
	}
	if (e === "triangle") {
		let e = r * 1.3;
		return z("polygon", {
			points: `${t},${n - e} ${t + e * .87},${n + e / 2} ${t - e * .87},${n + e / 2}`,
			...i
		});
	}
	return z("circle", {
		cx: t,
		cy: n,
		r,
		...i
	});
}, Z = (e) => Number(e.toFixed(2));
function Ue(e, t) {
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
function We(e, t, n, r) {
	let i = (t[0] - e[0]) / 3;
	return [[e[0] + i, e[1] + n * i], [t[0] - i, t[1] - r * i]];
}
function Ge(e, t, n, r) {
	let [i, a] = We(e, t, n, r), o = ([e, t]) => `${Z(e)},${Z(t)}`;
	return `C${o(i)} ${o(a)} ${o(t)}`;
}
function Ke(e, t, n) {
	let r = Array(e).fill(0), i = [], a = () => {
		Ue(i.map((e) => n(e)[0]), i.map((e) => n(e)[1])).forEach((e, t) => {
			r[i[t]] = e;
		}), i = [];
	};
	for (let n = 0; n < e; n++) t(n) ? a() : i.push(n);
	return a(), r;
}
var qe = (e) => e.map((e) => ({
	...e,
	from: 0,
	to: e.value,
	kind: "bar"
})), Je = (e) => ({
	segments: qe,
	series: !0,
	stackable: !0,
	running: !0,
	swatch: e ? "box" : void 0,
	headroom: ({ labelHeight: e, unit: t }) => e * 1.6 + 6 * t,
	footroom: ({ labelHeight: t, unit: n, series: r, focused: i, stacked: a }) => !e && !a && r === 2 && !i ? t + 7 * n : 0,
	draw(t) {
		let { rows: n, series: r, seriesValues: i, names: a, cx: o, y: s, height: c, unit: l, labelHeight: u, svg: d, stacked: f } = t, m = t.shape === "step", h = t.shape === "smooth", g = r.length > 1, _ = r.some((e) => e.focus), v = n.length - 1, y = s(0), b = n.length > 1 ? o(1) - o(0) : o(0) * 2;
		d.style.setProperty("--_base", `${Z(y)}px`);
		let S = (e) => `--rise:${Z(y - e)}px; `, C = (e, t) => n[t]?.cells[e] ?? n[t]?.cells[0], w = (e, t) => !C(e, t) || !!C(e, t)?.missing, T = n.map((e) => f ? Ee(e, r.length, !0) : null), E = (e, t) => T[t]?.[e].to ?? C(e, t)?.value ?? 0, D = (e, t) => T[t]?.[e].from ?? 0, O = (e, t) => [o(t), s(E(e, t))], k = r.map((e, t) => {
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
		}), A = Math.min(v, 6);
		t.plot.style.setProperty("--count", String(A + 1));
		let j = v > 0 ? A / (m ? n.length : v) : 1, N = (e) => e * j, P = (e) => `--i:${Z(N(e))}`, F = (e) => {
			let t = [], r = -1;
			return n.forEach((n, i) => {
				w(e, i) || (r < 0 && (r = i), (i === v || w(e, i + 1)) && ((m || i > r) && t.push([r, i]), r = -1));
			}), t;
		}, I = (e, t) => `--i:${Z(N(e) + 1)}; --d:${Z(N(m ? t + 1 : t) - N(e))}`, L = (e, t) => ({
			"data-from": e + 1,
			"data-to": t + 1,
			...m && { "data-flat": "" }
		}), R = h ? r.map((e, t) => Ke(n.length, (e) => w(t, e), (e) => O(t, e))) : [], B = h && e ? r.map((e, t) => Ke(n.length, (e) => w(t, e), (e) => [o(e), s(D(t, e))])) : [], V = (e, t, n) => {
			let r = [];
			return e.forEach(([i, a], o) => {
				m ? (r.push(`H${Z(i + n * b / 2)}`), o < e.length - 1 && r.push(`V${Z(e[o + 1][1])}`)) : o > 0 && r.push(t ? Ge(e[o - 1], [i, a], t[o - 1], t[o]) : `L${Z(i)},${Z(a)}`);
			}), r;
		}, U = (e, t, r, i) => n.slice(t, r + 1).map((n, r) => [o(t + r), s(i(e, t + r))]), W = (e, t, n, r) => h ? e[t].slice(n, r + 1) : null, ee = (e) => o(e) - (m ? b / 2 : 0), te = (e) => o(e) + (m ? b / 2 : 0), ne = (e) => {
			let t = z("g", {
				class: "tablechart-area",
				...k[e].attrs,
				...f && { "data-stacked": "" },
				style: k[e].ink
			}), n = F(e), r = z("g", {
				class: "tablechart-area-fill",
				style: `--rows:${Z(A + 1)}; ${n.length ? I(...n[0]) : ""}`
			});
			t.appendChild(r);
			for (let [t, i] of n) {
				let n = U(e, t, i, E), a = U(e, t, i, D), o = W(B, e, t, i)?.reverse() ?? null, s = [
					`M${Z(ee(t))},${Z(a[0][1])}`,
					`L${Z(ee(t))},${Z(n[0][1])}`,
					...V(n, W(R, e, t, i), 1),
					`L${Z(te(i))},${Z(a[a.length - 1][1])}`,
					...V(a.reverse(), o, -1),
					"Z"
				].join(" ");
				r.appendChild(z("path", {
					d: s,
					...L(t, i),
					style: I(t, i)
				}));
			}
			d.appendChild(t);
		}, ie = (e) => {
			let t = r[e];
			for (let [n, r] of F(e)) {
				let i = U(e, n, r, E), a = [`M${Z(ee(n))},${Z(i[0][1])}`, ...V(i, W(R, e, n, r), 1)].join(" ");
				d.appendChild(z("path", {
					class: "tablechart-series",
					...k[e].attrs,
					d: a,
					...t.line && { "data-line": t.line },
					...L(n, r),
					style: `${k[e].ink}${I(n, r)}`
				}));
			}
		};
		e && r.forEach((e, t) => ne(t)), r.forEach((e, t) => ie(t)), m || (() => {
			let e = r.map((e, t) => g ? Ve(r, t) : {
				shape: "circle",
				open: !1
			}), t = (t, n, r) => {
				let [i, a] = O(t, n);
				return He(e[t].shape, i, a, 4 * l, {
					...r,
					style: `${r.style ?? ""}${S(a)}${P(n)}`
				});
			}, i = (e) => n.map((e, t) => t).filter((t) => !w(e, t)), a = r.flatMap((n, r) => e[r].open ? i(r).map((e) => t(r, e, {
				class: x,
				"data-row": e + 1,
				...g && { "data-series": r + 1 }
			})) : []);
			re(d, a, 1e3, c), r.forEach((n, r) => {
				for (let n of i(r)) d.appendChild(t(r, n, {
					class: "tablechart-point",
					...k[r].attrs,
					"data-marker": e[r].shape,
					...e[r].open && { "data-open": "" },
					"data-row": n + 1,
					style: k[r].ink
				}));
			});
		})();
		let ae = (e, t) => {
			let n = t;
			for (; n < v && !w(e, n + 1) && C(e, n + 1)?.value === C(e, t)?.value;) n++;
			return n;
		}, oe = (t, n) => {
			let i = C(t, n);
			if (!i || i.missing || m && n > 0 && !w(t, n - 1) && C(t, n - 1)?.value === i.value || _ && !r[t].focus) return "none";
			if (f) return "middle";
			let a = i.value < 0 ? "below" : "above";
			if (!g || _ || r.length > 2) return a;
			let o = C(1 - t, n);
			return !o || o.missing ? a : i.value > o.value || i.value === o.value && t === 0 || e && i.value >= 0 && O(t, n)[1] + 7 * l + u > y ? "above" : "below";
		}, G = g && !_ && r.length > 2 && !f && !m, K = /* @__PURE__ */ new Map();
		if (G) {
			let e = n.flatMap((e, t) => r.map((e, n) => ({
				s: n,
				i: t,
				value: C(n, t)?.value ?? 0
			}))).filter(({ s: e, i: t }) => oe(e, t) !== "none").sort((e, t) => e.i - t.i || t.value - e.value || e.s - t.s), t = (e) => e < 0 ? ["below", "above"] : ["above", "below"], a = ge(e.map(({ s: e, i: n, value: r }) => {
				let a = J(i[e][n]).width * l, [o, s] = O(e, n);
				return t(r).map((e) => [
					o - a / 2,
					e === "above" ? s - 7 * l - u : s + 7 * l,
					a,
					u
				]);
			}), r.flatMap((e, t) => n.flatMap((e, n) => {
				if (w(t, n)) return [];
				let [r, i] = O(t, n);
				return [[
					r - 4 * l,
					i - 4 * l,
					8 * l,
					8 * l
				]];
			})), [
				0,
				0,
				o(v) + o(0),
				c
			]);
			e.forEach(({ s: e, i: n, value: r }, o) => K.set(i[e][n], a[o] === null ? null : t(r)[a[o]]));
		}
		let se = (e, t) => G ? K.get(i[e][t]) === null : !f && !m ? !1 : J(i[e][t]).width * l > (m ? ae(e, t) - t + 1 : 1) * b - 4 * l || f && e > 0 && E(e, t) < D(e, t) ? !0 : f && Math.abs(s(D(e, t)) - s(E(e, t))) < u * 1.2;
		i.forEach((e, t) => {
			e.forEach((e, n) => {
				e.style.setProperty("--i", String(Z(m ? (N(n) + N(n + 1)) / 2 : N(n))));
				let r = K.get(e) ?? oe(t, n);
				if (e.dataset.place = r === "above" ? "outside" : r, e.toggleAttribute("data-left-out", r !== "none" && se(t, n)), m && r !== "none" ? e.dataset.rowEnd = String(ae(t, n) + 1) : delete e.dataset.rowEnd, r === "none") return;
				let i = J(e).width * l / 2 + 4 * l, a = o(n);
				m ? a = (o(n) + o(ae(t, n))) / 2 : r === "middle" && n === 0 ? a += i : r === "middle" && n === v && (a -= i);
				let u = s(E(t, n)), d = {
					middle: (s(D(t, n)) - u) / 2,
					above: -7 * l,
					below: 7 * l
				};
				H(e, a, u + d[r], M, c);
			});
		});
		let ce = a.map((e, t) => {
			let n = v;
			for (; n > 0 && w(t, n);) n--;
			let [r, i] = O(t, n);
			return {
				name: e,
				x: (m ? r + b / 2 : r) + 10 * l,
				y: f ? (i + s(D(t, n))) / 2 : i
			};
		}), le = (a[0] ? J(a[0]).height : 0) * l;
		for (let e of Pe(ce, le)) H(e.name, e.x, e.y, M, c);
		let ue = n.some((e) => e.cells.some((e) => !e.missing && e.value < 0)), de = !e && !f && r.length === 2 && !_ && !ue ? c - 2 * l : y;
		d.appendChild(z("line", {
			class: p,
			x1: 0,
			x2: o(v) + o(0),
			y1: de,
			y2: de
		}));
	}
}), Ye = Je(!1), Xe = Je(!0), Ze = /* @__PURE__ */ new Set(), Qe = (e, t) => {
	if (Math.abs(e - t) <= Math.abs(t) / 100) return;
	let n = `[${l}] A total reads ${e}, but the steps before it add up to ${Number(t.toFixed(6))}. The chart shows your number.`;
	Ze.has(n) || (Ze.add(n), console.warn(n));
}, $e = {
	segments: (e) => {
		let t = 0, n = !1;
		return e.map((e) => {
			if (e.isTotal) return n && Qe(e.value, t), n = !1, t = e.value, {
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
	draw({ segments: e, cx: t, y: n, barWidth: r, height: i, unit: a, svg: o, values: s, breakAt: c, insideAlign: l }) {
		let u = n(0), d = je(s, r, a), m = l ?? "center", h = e.map((t, r) => {
			let i = n(Math.max(t.from, t.to)), o = Math.abs(n(t.from) - n(t.to)), l = c !== null && Math.min(t.from, t.to) < c && Math.max(t.from, t.to) > c, u = t.kind === "total" && r > 0 && r === e.length - 1;
			return {
				top: i,
				length: o,
				down: t.kind === "down" || t.kind === "total" && (u ? t.to >= 0 : t.to < 0),
				inside: !l && !d && Me(s[r], o, a)
			};
		}), g = s[0] ? J(s[0]).height * a * .56 : 0, _ = Infinity;
		for (let [e, t] of h.entries()) t.inside && (_ = Math.min(_, (r - J(s[e]).width * a) / 2));
		let v = e.length, y = (e, t, n = !1) => `--start:${(e / v).toFixed(4)}; --span:${(t / v).toFixed(4)}; --ease:${n ? P : "linear"};`;
		e.forEach((i, a) => {
			let s = e[a + 1];
			if (!s) return;
			let c = n(i.to), l = t(a) + r / 2, u = t(a + 1) - r / 2;
			o.appendChild(z("line", {
				class: "tablechart-connector",
				x1: l,
				x2: u,
				y1: c,
				y2: c,
				"data-row": a + 2,
				style: `${I("--i", s.slot)}; ${y(a + 1, 1 / 3)}`
			}));
		}), e.forEach((n, c) => {
			let { top: l, length: u, down: d, inside: p } = h[c];
			o.appendChild(z("rect", {
				class: B(f, n),
				"data-kind": n.kind,
				"data-row": c + 1,
				"data-grow": d ? "down" : "up",
				x: t(c) - r / 2,
				y: l,
				width: r,
				height: Math.max(u, 1),
				style: `${I("--i", n.slot)}; ${y(c, 1, c === e.length - 1)}`
			}));
			let b = s[c];
			b.style.setProperty("--start", (c / v).toFixed(4)), b.style.setProperty("--span", (1 / v).toFixed(4));
			let x = Math.min(_, (u - g) / 2), S = l + x + g / 2, C = l + u - x - g / 2, w = m === "center" ? l + u / 2 : m === "end" === d ? C : S;
			b.dataset.place = p ? "inside" : "outside", b.dataset.kind = n.kind;
			let T = p ? w : n.kind === "down" ? l + u + J(b).height * a + 3 * a : l - 3 * a;
			H(b, t(c), T, M, i);
		}), o.appendChild(z("line", {
			class: p,
			x1: 0,
			x2: M,
			y1: u,
			y2: u
		}));
	}
}, et = {
	enabled: !1,
	log(...e) {
		et.enabled && console.log(`[${l}]`, ...e);
	},
	timed(e, t, n) {
		if (!et.enabled) return n();
		let r = performance.now(), i = n(), a = performance.now() - r, o = t.querySelectorAll("tbody tr").length;
		return a > 50 ? console.warn(`[${l}] ${e} took ${a.toFixed(1)} ms for ${o} rows, more than 50 ms.`, t) : et.log(`${e} took ${a.toFixed(1)} ms for ${o} rows.`, t), i;
	}
}, tt = (e) => {
	let t = (e?.textContent || "").trim(), n = t.match(/^(.*?)(-?\d+(?:[.,]\d+)?)(.*)$/);
	return {
		raw: t,
		number: n?.[2] ?? "",
		prefix: n?.[1] ?? "",
		suffix: n?.[3] ?? "",
		missing: !n,
		value: n ? Number.parseFloat(n[2].replace(",", ".")) : 0
	};
}, nt = (e, t = "data-i18n") => Array.from(e.querySelectorAll("tbody tr")).map((e, n) => {
	let r = e.querySelector("th"), i = Array.from(e.querySelectorAll("td")).map(tt);
	return i.length || i.push(tt(null)), {
		...i[0],
		label: (r?.textContent || "").trim(),
		key: t && r?.getAttribute(t) || null,
		cells: i,
		classes: Array.from(e.classList),
		isTotal: e.getAttribute("data-kind") === "total",
		slot: n
	};
}), rt = (e) => Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1), it = (e) => e === "dashed" || e === "dotted" ? e : null, at = (e, t, n = "data-i18n") => {
	let r = rt(e), i = Math.max(1, G(t.map((e) => e.cells.length)));
	return Array.from({ length: i }, (e, t) => {
		let i = r[t];
		return {
			name: (i?.textContent || "").trim(),
			key: n && i?.getAttribute(n) || null,
			focus: i?.getAttribute("data-kind") === "focus",
			marker: i?.getAttribute("data-marker") ?? null,
			line: it(i?.getAttribute("data-line")),
			group: !!i?.hasAttribute("data-group")
		};
	});
}, ot = (e, t) => {
	if (!t) return;
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = r.getAttribute("data-chart-keys") || null;
		if (!e) continue;
		if (n.has(e)) {
			let t = n.get(e) + 1;
			n.set(e, t), console.warn(`[${l}] Two charts have data-chart-keys="${e}", so this one uses "${e}-${t}" to keep their translations apart.`), e = `${e}-${t}`;
		} else n.set(e, 1);
		r.querySelectorAll("tbody th").forEach((n, r) => {
			n.getAttribute(t) || n.setAttribute(t, `${e}-row${r + 1}`);
		});
		let i = rt(r);
		i.length > 1 && i.forEach((n, r) => {
			n.getAttribute(t) || n.setAttribute(t, `${e}-col${r + 1}`);
		}), i.forEach((n, i) => {
			if (!n.hasAttribute("data-group")) return;
			let a = [];
			r.querySelectorAll(`tbody tr > td:nth-of-type(${i + 1})`).forEach((n) => {
				let r = (n.textContent || "").trim();
				a.includes(r) || a.push(r), n.getAttribute(t) || n.setAttribute(t, `${e}-group${a.indexOf(r) + 1}`);
			});
		}), et?.log?.(`Keys for "${e}" written onto ${r.querySelectorAll("tbody th").length} rows`);
	}
}, st = (e) => Number(e.toPrecision(12)), ct = (e, t) => {
	let n = e / Math.max(1, t) || 1, r = 10 ** Math.floor(Math.log10(n)), i = n / r;
	return st((i < 1.42 ? 1 : i < 3.17 ? 2 : i < 7.08 ? 5 : 10) * r);
}, lt = (e, t, n) => {
	let r = [];
	for (let i = Math.ceil(e / n - 1e-9); i * n <= t + n * 1e-9; i++) r.push(st(i * n));
	return r;
}, ut = (e, t = e) => {
	do {
		let t = Math.round(e / 10 ** Math.floor(Math.log10(e) + 1e-9));
		e = st(e * (t === 2 ? 2.5 : 2));
	} while (Math.abs(e / t - Math.round(e / t)) > 1e-9);
	return e;
}, dt = (e) => {
	let t = (e ?? "").trim().split(/\s+/).map(Number.parseFloat);
	return t.length > 1 && t.every(Number.isFinite) ? t.sort((e, t) => e - t) : null;
}, ft = (e, t, n) => {
	if (n && n.length > 2) return {
		min: n[0],
		max: n[n.length - 1],
		step: 0,
		ticks: n
	};
	let r = n?.[0] ?? -G(e.map((e) => -e)), i = n?.[1] ?? G(e);
	if (!n) {
		let e = (i - r || Math.abs(i) || 1) * .05;
		r -= e, i += e;
	}
	let a = ct(i - r, t);
	return {
		min: r,
		max: i,
		step: a,
		ticks: lt(r, i, a)
	};
}, pt = (e, t) => {
	let { step: n, ticks: r } = e;
	for (; n && r.length > 2 && !t(r);) n = ut(n, e.step), r = lt(e.min, e.max, n);
	return {
		...e,
		step: n,
		ticks: r
	};
}, mt = [
	"axis-break",
	"trend",
	"bracket"
], ht = (e) => {
	let t = e.hasAttribute("data-fragment"), n = Array.from(e.querySelectorAll("tbody tr")), r = Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1), i = Array.from(e.querySelectorAll("[data-annotation]")).filter((e) => mt.includes(e.getAttribute("data-annotation") ?? "")), a = (e) => e.hasAttribute("data-fragment"), o = n.map((e) => Array.from(e.querySelectorAll(":scope > td")));
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
}, gt = (e) => {
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
}, _t = (e) => {
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
	let s = e.figure.querySelector(`.${S}`);
	if (s) {
		let e = [...t.rows, ...t.cells.flat()].map((e) => e.step ?? -1), n = Math.max(-1, ...e);
		n < 0 ? o(s, null, "--i", 0) : o(s, n, "--i", e.filter((e) => e === n).length);
	}
	let c = [...t.rows, ...t.cells.flat()].map((e) => e.slot + 1), l = t.series.some((e) => e.step !== null) ? t.rows.length : 1;
	e.plot.style.setProperty("--count", String(Math.max(l, ...c)));
	let u = e.figure.querySelectorAll(`.${f}`), d = u[u.length - 1];
	if (e.figure.dataset.chart === "waterfall" && d?.dataset.kind === "total" && u.length > 1) {
		let e = Number(d.dataset.row) - 1;
		(t.rows[e - 1]?.step ?? -1) > (t.rows[e]?.step ?? -1) && (d.dataset.grow = d.dataset.grow === "down" ? "up" : "down");
	}
	let p = Array.from(e.figure.querySelectorAll(`.${_}`));
	if (p.length) {
		let t = (e) => e.style.getPropertyValue("--step") || "none", n = (e) => Number(e.style.getPropertyValue("--share") || 0), r = p.length, i = Math.max(0, p.findIndex((e, n) => t(e) !== t(p[(n - 1 + r) % r]))), a = [];
		for (let e = 0; e < r; e++) {
			let n = p[(i + e) % r], o = a[a.length - 1];
			o && t(o[0]) === t(n) ? o.push(n) : a.push([n]);
		}
		let o = /* @__PURE__ */ new Map();
		for (let e of a) {
			let t = e.reduce((e, t) => e + n(t), 0), r = 0;
			for (let i of e) o.set(i.dataset.row ?? "", F(r, n(i), t)), r += n(i);
		}
		for (let t of e.figure.querySelectorAll("[data-row]")) {
			let e = o.get(t.dataset.row ?? "");
			e && t.style.getPropertyValue("--start") && (t.style.setProperty("--start", e.start.toFixed(4)), t.style.setProperty("--span", e.span.toFixed(4)), t.classList.contains("tablechart-slice") && t.style.setProperty("--ease", e.easing));
		}
	}
	gt(e);
}, vt = (e, t, n = !1) => {
	let r = e.plan;
	if (!r) return;
	let i = Math.min(Math.max(Math.round(t), 0), r.count), a = i !== e.step;
	e.step = i, e.figure.style.setProperty("--_step", String(i)), gt(e);
	let [o, s] = e.controls?.querySelectorAll("button") ?? [];
	o && (o.disabled = i === 0), s && (s.disabled = i === r.count), a && !n && e.figure.dispatchEvent(new CustomEvent("tablechart:step", {
		bubbles: !0,
		detail: {
			step: i,
			steps: r.count
		}
	}));
}, yt = (e, t, n) => {
	let r = document.createElement("div");
	r.className = "tablechart-controls";
	let i = (r) => {
		let i = document.createElement("button");
		i.type = "button", i.className = `tablechart-${r}`, i.dataset.go = r;
		let a = document.createElement("span");
		a.className = "tablechart-control-icon", a.setAttribute("aria-hidden", "true");
		let o = z("svg", {
			viewBox: "0 0 16 16",
			focusable: "false"
		});
		o.appendChild(z("path", { d: r === "next" ? "M6 3l5 5-5 5" : "M10 3L5 8l5 5" })), a.appendChild(o);
		let s = document.createElement("span");
		s.className = "tablechart-control-label", s.textContent = e[r];
		let c = t[r];
		c && n && s.setAttribute(n, c);
		let l = document.createElement("span");
		return l.className = T, l.textContent = e.hint, t.hint && n && l.setAttribute(n, t.hint), i.append(...r === "next" ? [
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
}, bt = (e, t, n, r = {
	x: 0,
	y: 0,
	scale: 1
}, i = 2, a = 8, o = 12) => {
	let s = e.getBoundingClientRect(), c = s.width, l = s.height, u = Number.parseFloat(getComputedStyle(e).borderLeftWidth) || 0, d = t.getBoundingClientRect().height / 2 + (i - u) * r.scale, f = o * r.scale, { clientWidth: p, clientHeight: m } = document.documentElement, h = n.top - a, g = m - n.bottom - a, _ = l + d <= h ? !0 : l + d <= g ? !1 : h >= g, v = _ ? n.top - d - l : n.bottom + d, y = n.left + n.width / 2, b = Math.max(a, Math.min(y - c / 2, p - c - a));
	e.style.left = `${(b - r.x) / r.scale}px`, e.style.top = `${(Math.max(a, Math.min(v, m - l - a)) - r.y) / r.scale}px`, e.dataset.side = _ ? "top" : "bottom", t.style.left = `${Math.max(f, Math.min(y - b, c - f)) / r.scale - u}px`;
}, xt = "tablechart-tooltip", St = [
	"--tablechart-surface",
	"--tablechart-tooltip-surface",
	"--tablechart-tooltip-color",
	"--tablechart-tooltip-border",
	"--tablechart-tooltip-radius",
	"--tablechart-tooltip-padding",
	"--tablechart-tooltip-shadow"
], Q = null, Ct, wt, $ = null, Tt = null, Et = 0, Dt = () => {
	clearTimeout(Et), Q && $ && (Q.hidden = !0, $ = null, Tt = null);
}, Ot = !1, kt = !0, At = NaN, jt = NaN, Mt = !1, Nt = () => {
	if (Mt) return;
	Mt = !0, document.addEventListener("pointermove", (e) => {
		e.pointerType === "mouse" && (kt = e.screenX !== At || e.screenY !== jt, At = e.screenX, jt = e.screenY, kt && (Ot = !1));
	}, {
		capture: !0,
		passive: !0
	});
	let e = () => {
		Ot = !0, Dt();
	};
	document.addEventListener("keydown", e, !0), window.addEventListener("scroll", e, {
		capture: !0,
		passive: !0
	});
}, Pt = (e, t) => t / Number.parseFloat(getComputedStyle(e).width) || 1, Ft = (e) => {
	let t = e.tooltipparent;
	return (typeof t == "string" ? document.querySelector(t) : t) ?? document.body;
}, It = () => {
	clearTimeout(Et), Et = window.setTimeout(Dt, 120);
}, Lt = () => {
	let e = document.createElement("div");
	return e.className = xt, e.setAttribute("aria-hidden", "true"), e.hidden = !0, Ct = document.createElement("div"), wt = document.createElement("div"), wt.className = `${xt}-arrow`, e.append(Ct, wt), document.body.append(e), e.addEventListener("pointerenter", () => clearTimeout(Et)), e.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && It()), document.addEventListener("pointerdown", (t) => {
		let n = t.target;
		$ && !$.plot.contains(n) && !e.contains(n) && Dt();
	}), window.addEventListener("resize", Dt), e;
}, Rt = (e, t) => {
	let n = t ? t.style.getPropertyValue("--step") : "x";
	return n === "" || Number(n) < e.step;
}, zt = (e, t) => {
	let n = e.svg.querySelector(`[data-series="${t + 1}"]:not(.tablechart-hole)`);
	if (!n) return;
	let r = getComputedStyle(n);
	return r.fill && r.fill !== "none" ? r.fill : r.stroke;
}, Bt = (e, t, n) => {
	let r = e.series.length > 1, i = [];
	for (let [n, a] of e.seriesValues.entries()) {
		if (!Rt(e, a[t])) continue;
		let o = r ? e.figure.querySelector(`.tablechart-name[data-series="${n + 1}"]`) : null;
		i.push({
			name: r ? o?.textContent ?? e.series[n].name : "",
			value: a[t].textContent ?? "",
			colour: r ? zt(e, n) : void 0,
			sample: o ? {
				marker: o.dataset.marker ?? null,
				open: o.hasAttribute("data-open"),
				line: o.dataset.line ?? null,
				box: o.dataset.swatch === "box"
			} : void 0
		});
	}
	let a = e.totals[t];
	return i.length > 1 && Rt(e, a) && i.push({
		name: n.totallabel,
		value: a.textContent ?? ""
	}), i;
}, Vt = (e, t) => {
	if (e.type.centre && e.values[t]) return e.values[t].getBoundingClientRect();
	let n = e.svg.querySelectorAll(`[data-row="${t + 1}"]:not(.tablechart-connector, .tablechart-leader)`), r = null;
	for (let e of n) {
		let t = e.getBoundingClientRect();
		(t.width || t.height) && (r = r ? new DOMRect(Math.min(r.left, t.left), Math.min(r.top, t.top), Math.max(r.right, t.right) - Math.min(r.left, t.left), Math.max(r.bottom, t.bottom) - Math.min(r.top, t.top)) : t);
	}
	if (r) return r;
	let i = e.plot.getBoundingClientRect(), [a, o, s, c] = e.rowBox?.(t) ?? [
		0,
		0,
		100,
		100
	];
	return new DOMRect(i.left + i.width * a / 100, i.top + i.height * o / 100, i.width * s / 100, i.height * c / 100);
}, Ht = (e, t, n) => {
	if (clearTimeout(Et), $ === e && Tt === t) return;
	let r = (e.type.tooltip ?? Bt)(e, t, n);
	if (!r.length) return Dt();
	$ && $ !== e && Dt(), Q ??= Lt();
	let i = (e, t, n, r = !1, i) => {
		let a = document.createElement("div");
		if (a.className = `${xt}-line`, n) {
			let e = document.createElement("span");
			e.className = `${xt}-key`, e.style.background = n, i?.box ? e.dataset.sample = "box" : i && (e.dataset.sample = "line", i.marker && (e.dataset.marker = i.marker), i.line && (e.dataset.line = i.line), e.toggleAttribute("data-open", i.open)), a.append(e);
		}
		let o = document.createElement("span");
		if (o.className = `${xt}-${r ? "title" : "name"}`, o.textContent = e, a.append(o), t) {
			e && o.append(":");
			let n = document.createElement("span");
			n.className = `${xt}-value`, n.textContent = t, a.append(n);
		}
		return a;
	}, a = e.categories[t]?.textContent ?? e.rows[t].label, o = r.length === 1 && !r[0].name, s = r.every((e) => e.name && !e.value);
	Ct.replaceChildren(...s ? [] : [i(a, o ? r[0].value : "", void 0, !0)], ...o ? [] : r.map(({ name: e, value: t, colour: n, sample: r }) => i(e, t, n, !1, r)));
	let c = getComputedStyle(e.figure);
	for (let e of St) {
		let t = c.getPropertyValue(e).trim();
		t ? Q.style.setProperty(e, t) : Q.style.removeProperty(e);
	}
	Q.style.setProperty("--_color", c.color), Q.style.colorScheme = c.colorScheme, Q.style.fontFamily = c.fontFamily;
	let l = Ft(n);
	Q.parentElement !== l && l.append(Q), $ = e, Tt = t, Q.hidden = !1, Q.style.left = "0px", Q.style.top = "0px";
	let u = Q.getBoundingClientRect(), d = {
		x: u.left,
		y: u.top,
		scale: Pt(Q, u.width)
	}, f = Pt(e.plot, e.plot.getBoundingClientRect().width);
	Q.style.fontSize = `${Number.parseFloat(c.fontSize) * f / d.scale}px`, bt(Q, wt, Vt(e, t), d);
}, Ut = (e, t, n = !1) => {
	let { plot: r } = e;
	r.setAttribute("data-hover", ""), Nt();
	let i = (t) => {
		if (e.rowAt) {
			let n = r.getBoundingClientRect(), i = Pt(r, n.width);
			return e.rowAt((t.clientX - n.left) / i, (t.clientY - n.top) / i);
		}
		let n = t.target.closest?.("[data-row]")?.getAttribute("data-row");
		return n ? Number(n) - 1 : null;
	}, a = /* @__PURE__ */ new Set(), o = (e) => {
		for (let t of a) if (!t.isConnected) a.delete(t);
		else if (t.getAttribute("data-row") === String(e + 1)) return !0;
		return !1;
	}, s = null, c = (a) => {
		if (a.type === "pointerdown") Ot = !1;
		else if (a.pointerType === "mouse" && (!kt || Ot)) return;
		if (!r.classList.contains("is-placed") || !e.figure.classList.contains("is-shown")) return;
		if (n && !e.figure.hasAttribute("data-left-out")) return $ === e ? Dt() : void 0;
		let c = i(a);
		if (s = c, c === null || o(c)) return $ === e ? Dt() : void 0;
		Ht(e, c, t);
	}, l = (t) => {
		let n = t.target;
		return e.svg.contains(n) && n.hasAttribute("data-row") ? n : null;
	};
	e.svg.addEventListener("transitionrun", (e) => {
		let t = l(e);
		t && a.add(t);
	});
	let u = (n) => {
		let r = l(n);
		if (!r) return;
		a.delete(r);
		let i = Number(r.getAttribute("data-row")) - 1;
		s === i && !o(i) && !Ot && Ht(e, i, t);
	};
	e.svg.addEventListener("transitionend", u), e.svg.addEventListener("transitioncancel", u), r.addEventListener("pointermove", c), r.addEventListener("pointerdown", c), r.addEventListener("pointerleave", (t) => {
		t.pointerType === "mouse" && (s = null, $ === e && It());
	});
}, Wt = {
	area: Xe,
	bar: Fe,
	column: Ie,
	donut: ze,
	line: Ye,
	waterfall: $e
}, Gt = (e, t) => {
	Wt[e] = t;
}, Kt = {
	"axis-break": oe,
	trend: Se,
	bracket: pe,
	reference: be
}, qt = Object.keys(Kt), Jt = (e) => {
	let t = "";
	for (let n = e.previousSibling; n && (t = (n.textContent ?? "") + t, !t.trim()); n = n.previousSibling);
	return t.trim();
}, Yt = [
	"straight",
	"step",
	"smooth"
], Xt = (e, t, n, r, i) => {
	let a = t === r, [o, s, c] = a ? [
		Math.min(e, n),
		Math.max(e, n),
		t
	] : [
		Math.min(t, r),
		Math.max(t, r),
		e
	], l = i.filter(([e, t, n, r]) => a ? t <= c && c <= t + r : e <= c && c <= e + n).map(([e, t, n, r]) => a ? [e, e + n] : [t, t + r]).sort((e, t) => e[0] - t[0]), u = [], d = o;
	for (let [e, t] of l) e > d && u.push([d, Math.min(e, s)]), d = Math.max(d, t);
	return d < s && u.push([d, s]), u.map(([e, t]) => a ? `M${R(e)},${R(c)}H${R(t)}` : `M${R(c)},${R(e)}V${R(t)}`).join("");
}, Zt = (e, t) => {
	let [n, r, i, a] = [
		"x1",
		"y1",
		"x2",
		"y2"
	].map((t) => Number(e.getAttribute(t))), o = z("path", { d: Xt(n, r, i, a, t) });
	for (let { name: t, value: n } of Array.from(e.attributes)) /^[xy][12]$/.test(t) || o.setAttribute(t, n);
	e.replaceWith(o);
}, Qt = (e) => Array.from((e.getAttribute("d") ?? "").matchAll(/M(-?[\d.]+),(-?[\d.]+)([HV])(-?[\d.]+)/g), ([, e, t, n, r]) => n === "H" ? [
	+e,
	+t,
	+r,
	+t
] : [
	+e,
	+t,
	+e,
	+r
]), $t = (e, [t, n, r, i]) => e.map(([e, a, o, s]) => a === s ? n <= a && a <= n + i && Math.max(e, t) < Math.min(o, t + r) ? `M${R(Math.max(e, t))},${R(a)}H${R(Math.min(o, t + r))}` : "" : t <= e && e <= t + r && Math.max(a, n) < Math.min(s, n + i) ? `M${R(e)},${R(Math.max(a, n))}V${R(Math.min(s, n + i))}` : "").join(""), en = (e, t, n) => {
	let r = e.getAttribute(t);
	return r === null ? n : r !== "false";
}, tn = (e, t) => !!t.animate && e.getAttribute("data-chart-animate") !== "false", nn = (e, t) => {
	let n = e.dataset.chartShape;
	return n && Yt.includes(n) ? n : Yt.includes(t.shape) ? t.shape : "straight";
}, rn = (e) => {
	for (let t of e.querySelectorAll("br")) {
		if (t.previousElementSibling?.classList.contains("tablechart-sr") || /[.!?:;,…]$/.test(Jt(t))) continue;
		let e = document.createElement("span");
		e.className = T, e.textContent = ". ", t.before(e);
	}
}, an = (e, t, n) => {
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
}, on = 0, sn = (e) => {
	let t = e.querySelector(":scope > figcaption");
	if (!t) return;
	rn(t);
	let n = (e) => e.hasAttribute("aria-label") || e.hasAttribute("aria-labelledby"), r = (e) => {
		t.id ||= `tablechart-caption-${++on}`, e.setAttribute("aria-labelledby", t.id);
	};
	e.tagName === "FIGURE" && !n(e) && r(e);
	let i = e.querySelector("table");
	i && !n(i) && !i.querySelector(":scope > caption") && r(i);
}, cn = (e, t, n = null) => {
	let r = n ?? (e.getAttribute("data-chart") || "column"), i = Wt[r];
	if (!i) return console.warn(`[${l}] Unknown chart type "${r}". Known types: ${Object.keys(Wt).join(", ")}.`), e.setAttribute("data-chart-empty", ""), null;
	let a = nt(e, t.langattribute);
	if (!a.length) return console.warn(e.querySelector("table") ? `[${l}] A chart has no rows in its table, so there is nothing to draw.` : `[${l}] A chart has no table, so there is nothing to draw.`, e), e.setAttribute("data-chart-empty", ""), null;
	sn(e);
	let o = at(e, a, t.langattribute);
	o.length > 1 && !i.series && !i.columns && (console.warn(`[${l}] A ${r} chart uses only the first of its ${o.length} value columns.`), o = o.slice(0, 1));
	let s = o.length > 1;
	s && e.style.setProperty("--_series-count", String(o.length));
	let c = e.hasAttribute("data-chart-stack");
	c && !i.stackable && console.warn(`[${l}] A ${r} chart cannot be stacked.`);
	let f = c && !!i.stackable && s, p = document.createElement("div");
	p.className = u, p.setAttribute("aria-hidden", "true");
	let m = z("svg", {
		role: "presentation",
		focusable: "false"
	});
	p.appendChild(m), e.appendChild(p);
	let h = i.centre ? a.filter((e) => !e.isTotal) : a, g = Math.max(0, G(h.flatMap((e) => e.cells.slice(0, o.length).map((e) => K(e.number))))), _ = o.map((e, t) => Math.max(0, G(a.map((e) => K(e.cells[t]?.number ?? ""))))), y = document.createElement("div");
	y.className = "tablechart-values", p.appendChild(y);
	let b = o.map((e, t) => a.map((e, n) => {
		let r = e.cells[t] ?? e.cells[0], a = V(d, y);
		return a.classList.add(...e.classes), a.dataset.value = String(r.value), r.prefix && (a.dataset.prefix = r.prefix), r.suffix && (a.dataset.suffix = r.suffix), r.missing && (a.dataset.missing = r.raw), s && (a.dataset.series = String(t + 1)), i.columns && (a.dataset.decimals = String(_[t])), a.dataset.row = String(n + 1), a.style.setProperty("--i", String(e.slot)), i.numbers === !1 && (t || n) && (a.dataset.place = "none"), a;
	})), x = b[0], C = f && i.totals ? a.map((e, t) => {
		let n = V(d, y);
		n.classList.add(...e.classes), n.dataset.kind = "total", n.dataset.row = String(t + 1), n.dataset.value = String(De(e, o.length));
		let r = e.cells[0];
		return r.prefix && (n.dataset.prefix = r.prefix), r.suffix && (n.dataset.suffix = r.suffix), n.style.setProperty("--i", String(e.slot)), n;
	}) : [], w = a[a.length - 1], T = o.some((e) => e.focus), E = e.getAttribute("data-chart-legend"), D = s && !i.columns && (E === null ? t.legend || i.legend !== void 0 : E !== "false") ? document.createElement("div") : null;
	D && (D.className = "tablechart-legend", D.setAttribute("aria-hidden", "true"), D.inert = !0);
	let O = s && !i.columns ? o.map((n, r) => {
		let a = V(v, D ?? p);
		D && (a.dataset.place = "legend");
		let s = i.legend ?? i.swatch;
		if (s && (a.dataset.swatch = s), a.textContent = n.name, !s && nn(e, t) !== "step") {
			let e = Ve(o, r);
			a.dataset.marker = e.shape, a.toggleAttribute("data-open", e.open);
		}
		return n.line && !s && (a.dataset.line = n.line), n.key && t.langattribute && a.setAttribute(t.langattribute, n.key), a.dataset.series = String(r + 1), a.style.setProperty("--n", String(r)), a.style.setProperty("--palette", `var(--tablechart-color-${r + 1})`), a.style.setProperty("--m", T && !n.focus ? "1" : "0"), a.style.setProperty("--i", String(w.slot)), a;
	}) : [], j = i.centre ? V(S, p) : null;
	if (j) {
		let e = a.find((e) => e.isTotal), t = e ? e.value : a.reduce((e, t) => e + Math.abs(t.value), 0);
		j.dataset.value = String(t), e && (j.dataset.decimals = String(K(e.number)));
	}
	let M = j && !a.some((e) => e.isTotal) ? an(e, j, t) : null, N = i.categories === "beside", P = document.createElement("div");
	P.className = "tablechart-categories", P.setAttribute("aria-hidden", "true"), P.inert = !0, N ? P.dataset.place = "beside" : i.centre && (P.dataset.place = "key"), P.style.setProperty("--_columns", String(a.length));
	let F = 0;
	for (let [e, n] of a.entries()) {
		let r = document.createElement("span");
		r.classList.add(...n.classes), r.textContent = n.label, n.key && t.langattribute && r.setAttribute(t.langattribute, n.key), i.centre && (r.dataset.kind = n.isTotal ? "total" : "slice", n.isTotal || (r.dataset.slice = String(F + 1), r.style.setProperty("--n", String(F)), r.style.setProperty("--palette", `var(--tablechart-color-${F + 1})`), F += 1)), r.style.setProperty("--i", String(n.slot)), r.dataset.row = String(e + 1), P.appendChild(r);
	}
	(N ? p : e).appendChild(P), D && e.appendChild(D);
	let I = o.filter((e) => !e.group), L = !i.axes && !i.centre && en(e, "data-chart-axis", t.axis), R = i.axes ? {
		titles: I.slice(0, 2).map((e, n) => {
			let r = V(`${k}-title`, p);
			return r.dataset.axis = n ? "y" : "x", r.textContent = e.name, e.key && t.langattribute && r.setAttribute(t.langattribute, e.key), r;
		}),
		ticks: V(`${A}s`, p),
		numbers: !0
	} : L || !i.centre && en(e, "data-chart-grid", t.grid) ? {
		titles: [],
		ticks: V(`${A}s`, p),
		numbers: L
	} : null;
	i.text?.({
		figure: e,
		plot: p,
		rows: a,
		series: o,
		config: t
	});
	let B = tn(e, t) && !i.axes ? ht(e) : null;
	i.axes && e.querySelector("[data-fragment]") && et.log(`A ${r} chart has no steps, so it is shown whole.`, e), B && e.setAttribute("data-steps", "");
	let H = e.getAttribute("data-chart-keys"), U = B && t.controls ? yt({
		previous: t.previouslabel,
		next: t.nextlabel,
		hint: t.stephint
	}, {
		previous: H && `${H}-previous`,
		next: H && `${H}-next`,
		hint: H && `${H}-step`
	}, t.langattribute) : null;
	U && e.appendChild(U);
	let W = e.getAttribute("data-chart-table"), ee = W && un.includes(W) ? W : t.table;
	if (ee === "never") e.removeAttribute("data-table");
	else {
		e.setAttribute("data-table", ee);
		let t = e.querySelector(":scope > table");
		t && e.append(t);
	}
	let te = Array.from(e.querySelectorAll("[data-annotation]")).map((e) => {
		let t = e.getAttribute("data-annotation"), n = Kt[t];
		if (!n) return console.warn(`[${l}] Unknown annotation "${t}". Known annotations: ${Object.keys(Kt).join(", ")}.`), null;
		let r = Number.parseInt(e.getAttribute("data-series") ?? "1", 10), i = r >= 1 && r <= o.length ? r - 1 : 0;
		return r !== i + 1 && console.warn(`[${l}] An annotation reads line ${r}, which is not there; it reads line 1.`), {
			spec: e,
			type: n,
			badge: n.create(e, p),
			series: i,
			after: a.length
		};
	}).filter((e) => e !== null);
	tn(e, t) && e.setAttribute("data-animate", dn(e, r, t, !!B));
	let ne = {
		figure: e,
		plot: p,
		svg: m,
		rows: a,
		decimals: g,
		type: i,
		values: x,
		series: o,
		seriesValues: b,
		names: D ? [] : O,
		categories: Array.from(P.children),
		centre: j,
		axes: R,
		stacked: f,
		totals: C,
		totalCell: M,
		rowAt: null,
		rowBox: null,
		annotations: te,
		checks: [],
		plan: B,
		step: 0,
		controls: U
	}, re = () => yn(e, m);
	m.addEventListener("transitionend", re), m.addEventListener("transitioncancel", re), U?.addEventListener("click", (e) => {
		let t = e.target.closest("button")?.dataset.go;
		t && vt(ne, ne.step + (t === "next" ? 1 : -1));
	}), vt(ne, 0, !0);
	let ie = e.getAttribute("data-chart-tooltip"), ae = ie === "false" ? !1 : ie === "auto" ? "auto" : ie !== null || t.tooltip;
	return ae && Ut(ne, t, ae === "auto"), gn(ne, t), ne;
}, ln = {
	grow: "grow",
	sweep: "sweep"
}, un = [
	"never",
	"auto",
	"print",
	"always"
], dn = (e, t, n, r) => {
	let i = t === "line" || t === "area", a = ln[e.getAttribute("data-chart-animate") ?? ""] ?? ln[String(n.animate)];
	return i ? r ? "sweep" : a ?? "sweep" : t === "donut" || t === "waterfall" ? a ?? "grow" : "grow";
}, fn = (e) => {
	let t = getComputedStyle(e).getPropertyValue("--tablechart-value-align").trim();
	return t === "start" || t === "center" || t === "end" ? t : null;
}, pn = (e, t, n, r) => {
	let i = getComputedStyle(e), a = (i.getPropertyValue(n).trim() || r).match(/^(\d+(?:\.\d+)?)(px|%|em|rem)$/);
	if (!a) return null;
	let o = Number(a[1]);
	return a[2] === "%" ? o / 100 * M : o * (a[2] === "em" ? Number.parseFloat(i.fontSize) : a[2] === "rem" ? Number.parseFloat(getComputedStyle(document.documentElement).fontSize) : 1) * t;
}, mn = (e, t) => pn(e, t, "--tablechart-bar-max", "60px") ?? Infinity, hn = (e, t) => {
	let { plot: n, svg: r, rows: i, type: a, values: o, series: s, seriesValues: c, names: u, annotations: d } = e, f = Number.parseFloat(e.figure.dataset.chartAspect ?? ""), p = f > 0 ? f : a.aspect ?? t.aspect, _ = a.categories === "beside", v = e.axes && !a.axes ? e.axes : null, y = _ ? null : e.categories[0]?.parentElement, b = null;
	if (v) {
		n.style.margin = "", y && (y.style.marginLeft = "");
		let r = n.clientWidth;
		if (!r) return !1;
		let o = a.segments?.(i) ?? [], c = e.stacked ? i.flatMap((e) => Object.values(Y(e, s.length, a.running))) : o.some((e) => e.kind === "up" || e.kind === "down") ? o.flatMap((e) => [e.from, e.to]) : i.flatMap((e) => e.cells.slice(0, s.length).filter((e) => !e.missing).map((e) => e.value)), l = Math.min(0, -G(c.map((e) => -e))), u = Math.max(0, G(c)), d = Number.parseFloat(getComputedStyle(n).fontSize) || 16, { chartScaleY: f, chartScale: m } = e.figure.dataset, h = dt(f ?? m);
		if (h && h.length > 2) b = {
			min: h[0],
			max: h[h.length - 1],
			step: 0,
			ticks: h
		};
		else {
			let [e, t] = h ?? [l, u], n = ct(t - e, Math.max((_ ? r / 9 : r * p / 3) / d, 2)), i = (e, t) => h ? e : Number(((t ? Math.ceil : Math.floor)(e / n - 1e-9 * (t ? 1 : -1)) * n).toPrecision(12)), a = i(e, !1), o = i(t, !0);
			b = {
				min: a,
				max: o,
				step: n,
				ticks: lt(a, o, n)
			};
		}
		v.ticks.textContent = "";
		let g = i.find((e) => !e.missing), x = G(b.ticks.map((e) => K(String(e))));
		for (let e of b.ticks) {
			let n = V(A, v.ticks);
			n.dataset.value = String(e), n.dataset.place = "none", g?.prefix && (n.dataset.prefix = g.prefix), g?.suffix && (n.dataset.suffix = g.suffix), _n(n, x, t.locale);
		}
		if (v.numbers) {
			let e = Array.from(v.ticks.children);
			for (let t of e) delete t.dataset.place;
			ve(e), _ ? n.style.marginBottom = `${(e[0] ? J(e[0]).height : 0) + 6}px` : (n.style.marginLeft = `${G([0, ...e.map((e) => J(e).width)]) + 10}px`, y && (y.style.marginLeft = n.style.marginLeft));
		}
	}
	let S = n.clientWidth;
	if (!S) return !1;
	let C = M / S, T = M * p;
	n.classList.add(w);
	let E = a.numbers === !1 ? o.slice(0, 1) : [...c.flat(), ...e.totals];
	for (let e of E) delete e.dataset.place;
	n.style.removeProperty("--_fit"), e.categories[0]?.parentElement?.style.removeProperty("--_beside");
	let D = a.axes ? e.axes : null, O = [];
	if (D) {
		let r = Number.parseFloat(getComputedStyle(n).fontSize) || 16, a = s.flatMap((e, t) => e.group ? [] : [t]).slice(0, 2), o = i.filter((e) => a.every((t) => e.cells[t] && !e.cells[t].missing)), { chartScaleX: c, chartScaleY: l, chartScale: u } = e.figure.dataset, d = [dt(c), dt(l ?? u)];
		O = a.map((e, t) => ft(o.length ? o.map((t) => t.cells[e].value) : [0, 1], Math.max(t ? T / C / (r * 4) : S / (r * 9), 4), d[t])), D.ticks.textContent = "", O.forEach((e, n) => {
			let r = o[0]?.cells[a[n]], i = G(e.ticks.map((e) => K(String(e))));
			for (let a of e.ticks) {
				let e = V(A, D.ticks);
				e.dataset.axis = n ? "y" : "x", e.dataset.value = String(a), r?.prefix && (e.dataset.prefix = r.prefix), r?.suffix && (e.dataset.suffix = r.suffix), _n(e, i, t.locale);
			}
		});
	}
	let N = D ? Array.from(D.ticks.children) : [];
	ve([
		...c.flat(),
		...e.totals,
		...u,
		...e.categories,
		...d.map((e) => e.badge),
		...D?.titles ?? [],
		...N
	]);
	let P = (o[0] ? J(o[0]).height : 0) * C;
	a.numbers === !1 && o[0] && (o[0].dataset.place = "none");
	let F = d[0]?.badge ? J(d[0].badge).height * C : 0, I = Math.max(T, pn(e.figure, C, "--tablechart-min-height", "200px") ?? 0, a.minHeight?.({
		labelHeight: P,
		nameHeight: Math.max(0, G(e.categories.map((e) => J(e).height))) * C,
		unit: C,
		rows: i.length,
		series: s.length,
		stacked: e.stacked
	}) ?? 0), L = e.stacked ? i.map((e) => {
		let t = De(e, s.length);
		return {
			...e,
			value: t,
			cells: e.cells.map((e, n) => n === 0 ? {
				...e,
				value: t
			} : e)
		};
	}) : i, B = (a.segments ?? ((e) => e.map((e) => ({
		...e,
		from: 0,
		to: e.value,
		kind: "bar"
	}))))(e.stacked ? L.map((e) => ({
		...e,
		cells: [e.cells[0]]
	})) : i), U = {
		labelHeight: P,
		badgeHeight: F,
		hasAnnotations: d.length > 0,
		unit: C,
		series: s.length,
		focused: s.some((e) => e.focus),
		stacked: e.stacked
	}, W = Math.max(((t) => e.stacked ? t(i.map((e) => Y(e, s.length, a.running).top)) : t([...B.flatMap((e) => [
		e.from,
		e.to,
		e.value
	]), ...i.flatMap((e) => e.cells.slice(0, s.length).map((e) => e.value))]))(G), 0), ee = B.some((e) => e.kind === "up" || e.kind === "down") ? B.flatMap((e) => [e.from, e.to]) : e.stacked ? i.map((e) => Y(e, s.length, a.running).bottom) : i.flatMap((e) => e.cells.slice(0, s.length).map((e) => e.value)), te = Math.min(-G(ee.map((e) => -e)), 0), ie = a.headroom?.(U) ?? P, ae = 2 * C + (a.footroom?.(U) ?? 0) + (te < 0 ? P + 4 * C : 0), oe = I - ie - ae, se = b ? Math.max(b.max, W) : W * 1.02, ce = b ? Math.min(b.min, te) : te * 1.02, le = d.find((e) => e.spec.getAttribute("data-annotation") === "axis-break")?.spec, ue = (e) => {
		let t = Number.parseFloat(le?.getAttribute(e) ?? "");
		return Number.isFinite(t) ? t : null;
	}, de = ue("data-from") ?? ue("data-at"), fe = ue("data-to"), q = null;
	if (le && (de !== null || fe !== null)) {
		let e = de ?? 0, t = fe ?? se, n = fe === null ? e : de === null ? t : (e + t) / 2, r = le.getAttribute("data-size"), i = r?.match(/^\s*(\d+(?:\.\d+)?)\s*%\s*$/);
		r !== null && !i && console.warn(`[${l}] data-size="${r}" is not a percentage, such as 30%. Using the default.`);
		let o = Math.min(Math.max(i ? Number(i[1]) / 100 : fe === null ? .22 : .3, .05), .8), s = B.filter((n) => (n.kind === "up" || n.kind === "down") && Math.max(n.from, n.to) > e && Math.min(n.from, n.to) < t);
		a.breakable ? te < 0 ? console.warn(`[${l}] A chart with values below zero cannot break its scale.`) : e < 0 || t <= e || t > se || e === 0 && t === se ? console.warn(`[${l}] A break from ${e} to ${t} does not fit a scale that runs from 0 to ${W}.`) : s.length ? console.warn(`[${l}] A break from ${e} to ${t} would cut a step that floats. Keep it below or above the steps.`) : q = {
			lo: e,
			hi: t,
			gap: n,
			share: o
		} : console.warn(`[${l}] This kind of chart cannot break its scale.`);
	}
	let pe = q ? q.gap : null, me = (q && pn(e.figure, C, "--tablechart-break-gap", "")) ?? 13, he = I - ae, ge = se - ce || 1, _e = (e) => he - (e - ce) / ge * oe;
	if (q) {
		let { lo: e, hi: t, gap: n, share: r } = q, i = oe * r, a = (oe - i - me) / (e + (se - t)), o = i / (t - e);
		_e = (r) => r <= e ? he - r * a : r <= n ? he - e * a - (r - e) * o : r <= t ? he - e * a - (r - e) * o - me : he - e * a - i - me - (r - t) * a;
	}
	let ye, be, xe = [];
	if (D) {
		let e = 6 * C, [t, n] = D.titles, r = (e) => e ? J(e).width * C : 0, i = (e) => e ? J(e).height * C : 0, a = N.filter((e) => e.dataset.axis === "x"), o = N.filter((e) => e.dataset.axis === "y"), s = i(N[0]), c = r(n) + G([0, ...o.map(r)]) + 2 * e, l = s / 2;
		be = [
			c,
			l,
			M - c - G([0, ...a.map(r)]) / 2,
			I - l - i(t) - s - 2 * e
		];
		let [u, d, f, p] = be, [m, h] = O, g = (e) => u + (e - m.min) / (m.max - m.min || 1) * f, _ = (e) => d + p - (e - h.min) / (h.max - h.min || 1) * p;
		ye = g, _e = _;
		let v = (e) => r(a.find((t) => Number(t.dataset.value) === e));
		xe = [pt(m, (t) => t.every((n, r) => !r || g(n) - g(t[r - 1]) > (v(n) + v(t[r - 1])) / 2 + e)).ticks, pt(h, (t) => t.every((n, r) => !r || _(t[r - 1]) - _(n) > s + e / 2)).ticks];
		for (let t of N) {
			let n = Number(t.dataset.value), r = t.dataset.axis === "x" ? 0 : 1, i = xe[r].includes(n);
			t.dataset.place = i ? r ? "before" : "below" : "none", i && H(t, r ? u - e : g(n), r ? _(n) : d + p + e, 1e3, I);
		}
		t && H(t, u + f / 2, I - i(t), 1e3, I), n && H(n, 0, d + p / 2, 1e3, I);
	}
	let Se = u.length ? G(u.map((e) => J(e).width)) * C + 12 * C : 0, Ce = e.categories[0]?.parentElement;
	Ce && (Ce.style.paddingRight = Se ? `${Se / 1e3 * 100}%` : "");
	let we = (M - Se) / i.length, Te = (e) => (e + .5) * we, Ee = (e) => e >= 0 && e < i.length ? e : null;
	e.rowAt = a.centre ? null : a.categories === "beside" ? (e, t) => Ee(Math.floor(t * C / (I / i.length))) : (e) => Ee(Math.floor(e * C / we));
	let Oe = we / M * 100, ke = 100 / i.length;
	if (e.rowBox = a.categories === "beside" ? (e) => [
		0,
		e * ke,
		100,
		ke
	] : (e) => [
		e * Oe,
		0,
		Oe,
		100
	], r.setAttribute("viewBox", `0 0 1000 ${R(I)}`), r.textContent = "", be && ye) {
		let [n, i, a, o] = be, [s, c] = xe, l = ye;
		en(e.figure, "data-chart-grid", t.grid) && r.appendChild(z("path", {
			class: j,
			d: [...s.map((e) => `M${R(l(e))},${R(i)}V${R(i + o)}`), ...c.map((e) => `M${R(n)},${R(_e(e))}H${R(n + a)}`)].join("")
		})), r.appendChild(z("path", {
			class: k,
			d: [
				`M${R(n)},${R(i)}V${R(i + o)}H${R(n + a)}`,
				...s.map((e) => `M${R(l(e))},${R(i + o)}v${R(4 * C)}`),
				...c.map((e) => `M${R(n)},${R(_e(e))}h${R(-4 * C)}`)
			].join("")
		}));
	}
	e.checks = [];
	let Ae = {
		rows: i,
		segments: B,
		cx: Te,
		y: _e,
		x: ye,
		frame: be,
		length: (t, n) => pn(e.figure, C, t, n),
		barWidth: Math.min(we * t.barfill, mn(e.figure, C)),
		barMax: mn(e.figure, C),
		height: I,
		unit: C,
		labelHeight: P,
		badgeHeight: F,
		after: i.length,
		note: 0,
		labels: e.figure.dataset.chartLabels === "inside" || e.figure.dataset.chartLabels !== "outside" && t.labels === "inside" ? "inside" : "outside",
		insideAlign: fn(e.figure),
		breakAt: pe,
		squeeze: q,
		breakGap: me,
		domain: b ? [b.min, b.max] : null,
		stacked: e.stacked,
		shape: nn(e.figure, t),
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
		checks: e.checks,
		taken: []
	};
	if (n.style.setProperty("--count", String(Math.max(1, ...i.map((e) => e.slot + 1)))), a.draw(Ae), Ae.rowAt && (e.rowAt = Ae.rowAt), v && b) {
		let n = 6 * C, i = _ && Ae.x ? Ae.x : _e, a = Array.from(v.ticks.children), o = (e) => J(a.find((t) => Number(t.dataset.value) === e) ?? a[0]), s = pt(b, (e) => e.every((t, r) => !r || (_ ? i(t) - i(e[r - 1]) > (o(t).width + o(e[r - 1]).width) / 2 * C + n : i(e[r - 1]) - i(t) > o(t).height * C + n / 2))).ticks.filter((e) => !q || e <= q.lo || e >= q.hi);
		for (let e of a) {
			let t = Number(e.dataset.value), r = v.numbers && s.includes(t);
			e.dataset.place = r ? _ ? "below" : "before" : "none", r && H(e, _ ? i(t) : -n, _ ? I + n : i(t), 1e3, I);
		}
		let c = M - Se;
		en(e.figure, "data-chart-grid", t.grid) && r.prepend(z("path", {
			class: j,
			d: s.map((e) => _ ? `M${R(i(e))},0V${R(I)}` : `M0,${R(i(e))}H${R(c)}`).join("")
		})), v.numbers && r.appendChild(z("path", {
			class: k,
			d: [_ ? `M${R(i(b.min))},${R(I)}H${R(i(b.max))}` : `M0,${R(i(b.max))}V${R(i(b.min))}`, ...s.map((e) => _ ? `M${R(i(e))},${R(I)}v${R(4 * C)}` : `M0,${R(i(e))}h${R(-4 * C)}`)].join("")
		}));
	}
	for (let [t, r] of d.entries()) {
		r.badge?.setAttribute("data-note", String(t + 1));
		let a = r.series, o = (e) => ({
			...e,
			...e.cells[a] ?? e.cells[0]
		});
		r.type.draw(r.spec, r.badge, {
			...Ae,
			...e.stacked && {
				rows: L,
				...e.totals.length && { values: e.totals }
			},
			...a > 0 && !e.stacked && {
				rows: i.map(o),
				segments: B.map((e) => {
					let t = o(e);
					return e.kind === "bar" ? {
						...t,
						to: t.value
					} : t;
				}),
				values: c[a]
			},
			after: e.plan ? r.after : Math.min(r.after, Number(n.style.getPropertyValue("--count")) || r.after),
			note: t + 1
		});
	}
	_t(e);
	let je = e.categories[0]?.parentElement;
	je && a.categories !== "beside" && !a.centre && Ne(je, e.categories.filter((e) => e.offsetParent !== null), (e) => ({
		size: e.scrollWidth,
		room: e.clientWidth
	}), "--_name-fit");
	let Me = d.flatMap(({ badge: e }) => {
		if (!(e instanceof HTMLElement) || !e.offsetWidth) return [];
		let t = e.offsetWidth * C, n = e.offsetHeight * C, r = Number.parseFloat(e.style.left) / 100 * M, i = Number.parseFloat(e.style.top) / 100 * I, a = getComputedStyle(e).borderTopLeftRadius, o = a.endsWith("%") ? Number.parseFloat(a) / 100 : null, s = (Number.parseFloat(a) || 0) * C;
		return [z("rect", {
			class: x,
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
	}), X = r.querySelector(`.${j}`), Pe = Array.from(r.querySelectorAll(`.${h}`));
	if (X || Pe.length) {
		let t = n.getBoundingClientRect(), i = M / t.width, o = getComputedStyle(n), s = Number.parseFloat(o.lineHeight) / Number.parseFloat(o.fontSize) || 1.2, l = [
			...c.flat(),
			...e.totals,
			...a.categories === "beside" ? e.categories : []
		].flatMap((e) => {
			if (e.dataset.place === "none" || e.hidden || e.hasAttribute("data-left-out")) return [];
			let n = e.getBoundingClientRect(), r = n.height * i / s, a = Array.from(e.style).filter((e) => e.startsWith("--")).map((t) => `${t}:${e.style.getPropertyValue(t)}`);
			return n.width ? [z("rect", {
				class: x,
				"data-for": "text",
				x: (n.left - t.left) * i - 3 * C,
				y: (n.top - t.top) * i + (n.height * i - r) / 2 - C,
				width: n.width * i + 6 * C,
				height: r + 2 * C,
				style: a.join("; ")
			})] : [];
		}), u = (e) => [
			"x",
			"y",
			"width",
			"height"
		].map((t) => Number(e.getAttribute(t)));
		for (let e of Pe) Zt(e, [...l, ...Me].map(u));
		if (X && e.plan) re(r, l, M, I, [X]);
		else if (X) {
			let e = [...l, ...Me], t = Qt(X);
			X.setAttribute("d", t.map(([t, n, r, i]) => Xt(t, n, r, i, e.map(u))).join(""));
			for (let n of e) {
				let e = $t(t, u(n)), r = n.dataset.for === "badge" ? "badge" : "";
				e && X.after(z("path", {
					class: j,
					"data-gap": r,
					d: e,
					style: n.getAttribute("style") ?? ""
				}));
			}
		}
	}
	ne(r, Me, M, I, Array.from(r.querySelectorAll(`.${m}, .${g}`))), re(r, Me, M, I, void 0, [
		h,
		m,
		g,
		...e.plan ? [] : [j]
	].map((e) => `.${e}`).join(", ")), e.figure.hasAttribute("data-animate") && !e.figure.hasAttribute("data-steps") && !e.figure.classList.contains("is-shown") && bn(r);
	let Fe = (e) => e.dataset.missing !== void 0 || a.centre && i[Number(e.dataset.row) - 1]?.isTotal, Ie = (e) => e.dataset.place !== "none" && !e.hasAttribute("data-left-out"), Le = (e, t) => {
		let n = Number(e.dataset.row);
		return t.some((e) => Ie(e) && Number(e.dataset.row) <= n && n <= Number(e.dataset.rowEnd ?? e.dataset.row));
	};
	return e.figure.toggleAttribute("data-left-out", (a.columns ? [e.categories] : [...c, e.totals]).some((e) => e.some((t) => !Fe(t) && !Ie(t) && !Le(t, e)))), !0;
}, gn = (e, t) => {
	let n = [
		...e.seriesValues.flat(),
		...e.totals,
		...e.totalCell ? [e.totalCell] : []
	];
	for (let r of e.centre ? [...n, e.centre] : n) r.dataset.missing === void 0 ? _n(r, r.dataset.decimals ? Number(r.dataset.decimals) : e.decimals, t.locale) : r.textContent = r.dataset.missing;
}, _n = (e, t, n) => {
	let { prefix: r = "", suffix: i = "" } = e.dataset, [a, o] = ce(Number.parseFloat(e.dataset.value || "0"), t, n);
	if (e.textContent = r + (r ? a : "") + o + i, a && !r) {
		let t = document.createElement("span");
		t.className = "tablechart-minus", t.textContent = a, e.prepend(t);
	}
}, vn = (e, t, n = !1) => {
	!t && !e.figure.hasAttribute("data-steps") && bn(e.svg), n ? (e.figure.classList.add(D), e.figure.classList.toggle(E, t), e.figure.offsetWidth, t && xn(e.svg), requestAnimationFrame(() => e.figure.classList.remove(D))) : (e.figure.classList.toggle(E, t), t && requestAnimationFrame(() => requestAnimationFrame(() => yn(e.figure, e.svg))));
}, yn = (e, t) => {
	e.classList.contains("is-shown") && Array.from(t.querySelectorAll("[data-mask]")).every((e) => !e.getAnimations({ subtree: !0 }).length) && xn(t);
}, bn = (e) => {
	for (let t of e.querySelectorAll("[mask^=\"url(#tablechart-cut-\"]")) t.dataset.mask = t.getAttribute("mask") ?? "", t.removeAttribute("mask");
}, xn = (e) => {
	for (let t of e.querySelectorAll("[data-mask]")) t.setAttribute("mask", t.dataset.mask ?? ""), t.removeAttribute("data-mask");
}, Sn = (e) => e === "id" || e === "style" || e.startsWith("data-chart"), Cn = /^\s*(?:Table)?:\s+/, wn = (e) => e?.tagName === "P" && Cn.test(e.textContent ?? ""), Tn = (e) => {
	let t = document.createElement("figcaption");
	for (let { name: n, value: r } of Array.from(e.attributes)) t.setAttribute(n, r);
	let n = e.firstChild;
	n?.nodeType === Node.TEXT_NODE && (n.textContent = (n.textContent ?? "").replace(Cn, ""), n.textContent || n.remove());
	let r = Array.from(e.childNodes), i = r.findIndex((e) => e.nodeName === "BR");
	if (t.append(...i === -1 ? r : r.slice(0, i + 1)), i !== -1 && i < r.length - 1) {
		let e = document.createElement("span");
		e.append(...r.slice(i + 1)), t.append(e);
	}
	return e.remove(), t;
}, En = /^\s*([a-z][\w-]*)((?:\s+[\w-]+=[^\s:]+)*)\s*(:\s*|$)/, Dn = (e) => {
	let t = Fn(e);
	return t?.tagName === "P" ? t : e;
}, On = (e) => {
	let t = Dn(e).firstChild;
	if (t?.nodeType !== Node.TEXT_NODE) return null;
	let n = En.exec(t.textContent ?? "");
	if (!n || !qt.includes(n[1]) || !n[3] && t.nextSibling) return null;
	let r = n[2].trim().split(/\s+/).filter(Boolean).map((e) => e.split("="));
	return {
		name: n[1],
		options: r,
		text: t,
		length: n[0].length
	};
}, kn = (e) => {
	if (e?.tagName !== "UL" && e?.tagName !== "OL") return null;
	let t = Array.from(e.children), n = t.map((e) => e.hasAttribute("data-annotation") ? null : On(e));
	return !t.length || t.some((e, t) => !n[t] && !e.hasAttribute("data-annotation")) ? null : (t.forEach((e, t) => {
		let r = n[t], i = Dn(e);
		if (i !== e && i.replaceWith(...i.childNodes), r) {
			e.setAttribute("data-annotation", r.name);
			for (let [t, n] of r.options) e.setAttribute(`data-${t}`, n);
			r.text.textContent = (r.text.textContent ?? "").slice(r.length);
		}
		e.children.length && Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.textContent?.trim()).forEach((e, t) => {
			let n = document.createElement("span");
			t === 0 && e instanceof HTMLElement && e.matches("em, i") ? (n.className = "tablechart-caption", n.append(...e.childNodes), e.replaceWith(n)) : e.nodeType === Node.TEXT_NODE && (n.textContent = (e.textContent ?? "").trim(), e.replaceWith(n));
		});
	}), e.classList.add("chart-annotations"), e);
}, An = (e, t) => {
	for (let { name: n, value: r } of Array.from(e.attributes)) (n === "class" || Sn(n)) && (t.setAttribute(n, r), e.removeAttribute(n));
}, jn = (e) => e.map((e) => {
	let t = e.closest("p"), n = wn(t) ? t : e;
	if (n.tagName !== "TABLE" && n.tagName !== "P") return n;
	let r = document.createElement("figure");
	An(e, r), e.classList.length || e.removeAttribute("class");
	let i = n.tagName === "TABLE" ? n : null, a = n.previousElementSibling, o = n.nextElementSibling, s = i ? wn(a) ? a : wn(o) ? o : null : n;
	i && s === o && (o = o?.nextElementSibling ?? null);
	let c = o?.classList.contains("chart-annotations") ? o : kn(o);
	return n.replaceWith(r), s && r.append(Tn(s)), i && r.append(i), c && r.append(c), et?.log?.(`A ${i ? "table" : "caption"} with chart attributes was wrapped in a figure of its own`), r;
}), Mn = (e, t, n, r = document.createElement("table")) => {
	for (let e of r.querySelectorAll(":scope > tbody, :scope > tfoot, :scope > tr")) e.remove();
	if (!r.tHead && (t.length || n)) {
		let e = r.createTHead().insertRow(), i = document.createElement("th");
		i.textContent = n, e.append(i);
		for (let n of t) {
			let t = document.createElement("th");
			t.textContent = n, e.append(t);
		}
	}
	let i = document.createElement("tbody");
	r.append(i);
	for (let t of e) {
		let e = i.insertRow();
		t.kind === "total" && (e.dataset.kind = "total");
		let n = document.createElement("th");
		n.textContent = String(t.label ?? ""), e.append(n);
		for (let n of t.values ?? [t.value ?? null]) e.insertCell().textContent = n === null ? "" : String(n);
	}
	return r;
}, Nn = (e) => {
	if (!e || typeof e != "object") return;
	let t = Object.entries(e), n = (e) => e === null || typeof e == "string" || typeof e == "number";
	if (t.length && t.every(([, e]) => n(e) || Array.isArray(e) && e.every(n))) return t.map(([e, t]) => Array.isArray(t) ? {
		label: e,
		values: t
	} : {
		label: e,
		value: t
	});
}, Pn = async (e) => {
	await Promise.all(e.filter((e) => e.hasAttribute("data-chart-src")).map(async (e) => {
		let t = e.getAttribute("data-chart-src"), n = Array.from(e.querySelectorAll("table")).find((e) => e.tHead) ?? null;
		for (let t of e.querySelectorAll("table")) t !== n && t.remove();
		try {
			let r = await fetch(t);
			if (!r.ok) throw Error(`${r.status} ${r.statusText}`);
			let i = await r.json(), a = Array.isArray(i) ? i : i?.rows ? Array.isArray(i.rows) ? i.rows : Nn(i.rows) : Nn(i);
			if (!Array.isArray(a)) throw Error("no rows in it: a list of rows, an object with rows, or names with their values");
			let o = Mn(a, Array.isArray(i?.series) ? i.series.map(String) : [], typeof i?.label == "string" ? i.label : "", n ?? void 0);
			if (!n) {
				let t = e.querySelector(":scope > figcaption");
				t ? t.after(o) : e.prepend(o);
			}
			o.tHead || et?.log?.(`The table from "${t}" has no header row, so a screen reader cannot name its columns.`), et?.log?.(`Read ${a.length} rows from "${t}"`);
		} catch (e) {
			let n = window.location.protocol === "file:";
			console.warn(`[${l}] Could not read the chart data in "${t}": ${e.message}.` + (n ? " A page opened as a file cannot fetch files; open it from a server." : ""));
		}
	}));
}, Fn = (e) => {
	let t = Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.TEXT_NODE && e.textContent?.trim());
	return t.length === 1 && t[0] instanceof HTMLElement ? t[0] : null;
}, In = "strong, b, span.total", Ln = (e) => {
	for (let t of e) {
		for (let e of t.querySelectorAll("tbody tr")) {
			let t = e.cells[0];
			if (t?.tagName !== "TD" || e.cells.length < 2) continue;
			let n = document.createElement("th");
			for (let { name: e, value: r } of Array.from(t.attributes)) n.setAttribute(e, r);
			n.append(...t.childNodes), t.replaceWith(n);
			for (let t = Fn(n); t?.matches(In); t = Fn(n)) e.dataset.kind = "total", t.replaceWith(...t.childNodes);
		}
		let e = Array.from(t.querySelector("thead tr:last-child")?.children ?? []);
		for (let t of e.slice(1)) for (let e = Fn(t); e?.matches(In); e = Fn(t)) t.setAttribute("data-kind", "focus"), e.replaceWith(...e.childNodes);
	}
}, Rn = "data-chart-made", zn = (e, t) => {
	let n = Number.parseFloat(e.dataset.chartEntrance ?? ""), r = Number.isFinite(n) ? n : t.entrance;
	return Math.min(Math.max(r, 0), 1);
}, Bn = !1, Vn = (e) => {
	let t = e.find((e) => e.tagName !== "FIGURE");
	!Bn && t && (Bn = !0, console.warn(`[${l}] A chart is a <${t.tagName.toLowerCase()}>. Use a <figure> with a <figcaption>, so the chart has a title, also for screen readers.`, t));
}, Hn = async (e, t) => {
	let n = jn(e.filter((e) => !e.hasAttribute(Rn)));
	return Vn(n), await Pn(n), Ln(n), ot(n, t.langattribute), n;
}, Un = [
	"circle",
	"triangle",
	"square",
	"diamond"
], Wn = [
	"right",
	"left",
	"above",
	"below",
	"right",
	"left",
	"right",
	"left"
], Gn = (e) => {
	let t = e.flatMap((e, t) => e.group ? [] : [t]);
	return {
		x: t[0],
		y: t[1],
		size: t[2],
		group: e.findIndex((e) => e.group)
	};
}, Kn = (e, t) => t < 0 ? [] : [...new Set(e.map((e) => e.cells[t]?.raw ?? ""))], qn = (e, t, n) => e.cells[t]?.missing || e.cells[n]?.missing ? null : `${e.cells[t]?.value} ${e.cells[n]?.value}`, Jn = {
	aspect: .62,
	categories: "beside",
	columns: !0,
	axes: !0,
	numbers: !1,
	text({ figure: e, plot: t, rows: n, series: r, config: i }) {
		let { x: a, y: o, size: s, group: c } = Gn(r), l = t.querySelector(":scope > .tablechart-categories")?.children ?? [], u = /* @__PURE__ */ new Map();
		n.forEach((e, t) => {
			let n = qn(e, a, o);
			n && (u.get(n)?.push(t) ?? u.set(n, [t]));
		});
		let d = (e) => s === void 0 ? 0 : Math.abs(n[e].cells[s]?.value ?? 0);
		for (let e of u.values()) {
			if (e.length < 2) continue;
			let t = e.reduce((e, t) => d(t) > d(e) ? t : e);
			for (let n of e) {
				let r = l[n];
				n === t ? r?.setAttribute("data-more", String(e.length - 1)) : r?.setAttribute("data-same", "");
			}
		}
		let f = Kn(n, c);
		if (f.length < 2 && s === void 0) return;
		let p = document.createElement("div");
		p.className = y, p.setAttribute("aria-hidden", "true"), p.inert = !0;
		let m = Array.from(e.querySelectorAll(`tbody tr > td:nth-of-type(${c + 1})`)), h = (e, t) => {
			let n = V(v, p);
			return n.dataset.place = "legend", n.dataset.line = "none", n.textContent = e, t && i.langattribute && n.setAttribute(i.langattribute, t), n;
		};
		f.length > 1 && f.forEach((e, t) => {
			let n = i.langattribute ? m.find((t) => t.textContent?.trim() === e)?.getAttribute(i.langattribute) : null, r = h(e, n);
			r.dataset.marker = Un[t % Un.length], r.style.setProperty("--n", String(t)), r.style.setProperty("--palette", `var(--tablechart-color-${t + 1})`);
		}), s !== void 0 && (h(r[s].name, r[s].key).dataset.marker = "size"), e.appendChild(p);
	},
	draw(e) {
		let { rows: t, series: n, x: r, y: i, frame: a, unit: o, svg: s, categories: c, height: l, config: u, plot: d } = e;
		if (!r || !a) return;
		let f = Gn(n), p = Kn(t, f.group), m = p.length > 1, h = (e.length("--tablechart-marker-size", "10px") ?? 10 * o) / 2, g = (e.length("--tablechart-bubble-max", "24px") ?? 24 * o) / 2, _ = (e) => f.size === void 0 ? void 0 : e.cells[f.size], v = G(t.map((e) => Math.abs(_(e)?.value ?? 0))), y = t.flatMap((e, t) => {
			let n = e.cells[f.x], a = e.cells[f.y];
			if (!n || !a || n.missing || a.missing) return [];
			let o = _(e), s = o && !o.missing && v > 0 ? Math.max(h * .6, Math.sqrt(Math.abs(o.value) / v) * g) : h, c = m ? p.indexOf(e.cells[f.group]?.raw ?? "") : -1;
			return [{
				i: t,
				px: r(n.value),
				py: i(a.value),
				r: s,
				g: c
			}];
		}), x = Math.min(y.length - 1, 6);
		d.style.setProperty("--count", String(x + 1));
		let S = new Map([...y].sort((e, t) => e.px - t.px || e.i - t.i).map((e, t) => [e.i, x ? R(t * x / (y.length - 1)) : 0])), C = [...y].sort((e, t) => t.r - e.r || e.i - t.i);
		for (let e of C) {
			let t = m ? Un[e.g % Un.length] : "circle";
			s.appendChild(He(t, e.px, e.py, e.r, {
				class: b,
				"data-row": e.i + 1,
				"data-marker": t,
				style: `--i:${S.get(e.i)}; ${m ? `--n:${e.g}; --palette:var(--tablechart-color-${e.g + 1})` : ""}`
			}));
		}
		let w = d.parentElement?.getAttribute("data-chart-names"), T = w == null ? u.names : w !== "false", E = 4 * o, D = [
			a[0] + 1.5 * E,
			a[1],
			a[2] - 1.5 * E,
			a[3] - 1.5 * E
		], [O, k, A, j] = D, N = C.map(({ i: e, px: t, py: n, r }) => {
			if (c[e].hasAttribute("data-same")) return [];
			let { width: i, height: a } = J(c[e]), s = i * o, l = a * o, u = l * .1, d = r * .7 + E / 2, f = (e, t) => [
				Math.max(O, Math.min(e, O + A - s)),
				Math.max(k, Math.min(t, k + j - l)) + u,
				s,
				l - 2 * u
			];
			return [
				f(t + r + E, n - l / 2),
				f(t - r - E - s, n - l / 2),
				f(t - s / 2, n - r - E - l),
				f(t - s / 2, n + r + E),
				f(t + d, n - d - l),
				f(t - d - s, n - d - l),
				f(t + d, n + d),
				f(t - d - s, n + d)
			];
		}), P = T ? ge(N, y.map(({ px: e, py: t, r: n }) => [
			e - n,
			t - n,
			2 * n,
			2 * n
		]), D) : C.map(() => null);
		for (let e of c) e.hidden = !0, e.dataset.missing = "";
		C.forEach((e, t) => {
			let n = c[e.i], r = P[t];
			if (n.hidden = !1, delete n.dataset.missing, n.style.setProperty("--i", String(S.get(e.i))), n.toggleAttribute("data-left-out", r === null), r === null) return;
			n.dataset.side = Wn[r];
			let [i, a, , s] = N[t][r];
			H(n, i, a - (J(n).height * o - s) / 2, M, l);
		}), e.rowAt = (e, t) => {
			let n = null, r = 6 * o;
			for (let i of y) {
				let a = Math.max(Math.hypot(i.px - e * o, i.py - t * o) - i.r, 0);
				(a < r || a === r && n && i.r < n.r) && (r = a, n = i);
			}
			return n ? n.i : null;
		};
	},
	tooltip(e, t) {
		let { x: n, y: r } = Gn(e.series), i = qn(e.rows[t], n, r), a = e.rows.flatMap((e, a) => a === t || i !== null && qn(e, n, r) === i ? [a] : []), o = a.filter((t) => e.categories[t]?.hasAttribute("data-more"));
		return [...o, ...a.filter((e) => !o.includes(e))].map((t) => ({
			name: e.categories[t]?.textContent ?? "",
			value: ""
		}));
	}
}, Yn = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
})))(), 1), Xn = Object.defineProperty, Zn = (e, t) => {
	let n = {};
	for (var r in e) Xn(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Xn(n, Symbol.toStringTag, { value: "Module" }), n;
}, Qn = [
	".js",
	".min.js",
	".mjs"
], $n = (() => {
	let e = import.meta;
	if (typeof e?.url == "string" && e.url !== "") return e.url;
	let t = typeof document < "u" ? document.currentScript : null;
	return t && "src" in t && t.src ? t.src : "";
})(), er = (e) => {
	let t = e.lastIndexOf("/");
	return t === -1 ? "" : e.slice(0, t + 1);
}, tr = (e) => {
	let t = e.split(/[?#]/)[0];
	return t.slice(t.lastIndexOf("/") + 1);
}, nr = (e, t) => Qn.some((n) => e === `${t}${n}`), rr = [
	/\/@fs\//,
	/\/@id\//,
	/\/\.vite\/deps\//,
	/[?&][vt]=/
], ir = (e) => rr.some((t) => t.test(e)), ar = (e) => {
	if (typeof document < "u") {
		let t = Qn.map((t) => `script[src$="${e}${t}"]`).join(", "), n = document.querySelector(t)?.getAttribute("src");
		if (n) return { directory: er(n) };
	}
	return $n && !ir($n) && nr(tr($n), e) ? { directory: er($n) } : { directory: null };
}, or = (e) => ar(e).directory !== null, sr = /* @__PURE__ */ new Map(), cr = (e = "") => {
	let t = sr.get(e);
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
	let l = e !== "" && or(e), u = {
		hasResolvableSource: l,
		hasWindow: n,
		hasDocument: r,
		isBundled: !l,
		isDevelopment: s || c,
		hasHMR: s,
		isViteDev: c
	};
	return sr.set(e, u), u;
}, lr = class {
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
		this.userConfigData = n, this.mergedConfig = (0, Yn.default)(t, n, {
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
	getEnvironmentInfo = () => cr(this.pluginId);
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
}, ur = "data-css-id", dr = (e, t) => new Promise((n, r) => {
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = t, i.setAttribute(ur, e);
	let a = setTimeout(() => {
		i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Timeout loading CSS from: ${t}`));
	}, 5e3);
	i.onload = () => {
		clearTimeout(a), n();
	}, i.onerror = () => {
		clearTimeout(a), i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Failed to load CSS from: ${t}`));
	}, document.head.appendChild(i);
}), fr = (e) => document.querySelectorAll(`[${ur}="${e}"]`).length > 0, pr = 1e4, mr = (e) => new Promise((t) => {
	if (hr(e)) return t(!0);
	if (typeof MutationObserver > "u") return t(!1);
	let n = !1, r = (e) => {
		n || (n = !0, i.disconnect(), clearTimeout(o), window.removeEventListener("load", a), t(e));
	}, i = new MutationObserver(() => {
		hr(e) && r(!0);
	});
	i.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributeFilter: ["href", "rel"]
	});
	let a = () => requestAnimationFrame(() => r(hr(e)));
	document.readyState === "complete" ? a() : window.addEventListener("load", a, { once: !0 });
	let o = setTimeout(() => r(hr(e)), pr);
}), hr = (e) => {
	if (fr(e)) return !0;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
	} catch {
		return !1;
	}
}, gr = ((e) => new Proxy(e, { get: (e, t) => {
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
}()), _r = /* @__PURE__ */ new Set(), vr = (e, t) => {
	let n = `${e}::${t}`;
	_r.has(n) || (_r.add(n), console.warn(`[${e}] ${t}`));
}, yr = (e) => [`dist/plugin/${e}/${e}.css`, `plugin/${e}/${e}.css`], br = (e) => typeof e == "string" && e.trim() !== "", xr = async (e, t) => {
	let { cssautoload: n, csspath: r, debug: i = !1 } = t;
	if (n === !1 || r === !1) return i && console.log(`[${e}] CSS loading is switched off`), { status: "skipped" };
	if (br(r)) {
		let t = r.trim(), n = hr(e), a = n && !!document.querySelector(`[data-css-id="${e}"]`);
		try {
			return await dr(e, t), i && console.log(`[${e}] CSS loaded from: ${t}`), n && vr(e, `Loaded CSS from ${t}, but a stylesheet for this plugin was already on the page (${a ? "a tagged <link>" : "an import or inline <style>"}) — csspath adds one, it cannot remove one. Both are live and the cascade decides. Remove the other import or <link>, or drop csspath.`), {
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
	if (hr(e)) return i && console.log(`[${e}] CSS is already imported, skipping`), { status: "present" };
	let { directory: a } = ar(e);
	if (a !== null || n === !0) {
		let t = [...a === null ? [] : [`${a}${e}.css`], ...yr(e)].filter((e, t, n) => n.indexOf(e) === t);
		for (let n of t) try {
			return await dr(e, n), i && console.log(`[${e}] CSS loaded from: ${n}`), {
				status: "loaded",
				path: n
			};
		} catch {
			i && console.log(`[${e}] No CSS at: ${n}`);
		}
		return console.warn(`[${e}] Could not load CSS. Tried: ${t.join(", ")}. Import the stylesheet yourself, or set csspath to where it is.`), { status: "failed" };
	}
	return mr(e).then((t) => {
		t || vr(e, `CSS could not be autoloaded here, because the plugin is part of a bundle. Import it once in your own code: import 'reveal.js-${e}/${e}.css'`);
	}), { status: "advised" };
};
async function Sr(e, t) {
	if ("getEnvironmentInfo" in e && t) {
		let n = e, r = n.userConfig, i = "cssautoload" in r && r.cssautoload !== "auto" ? t.cssautoload : void 0;
		return xr(n.pluginId, {
			...t,
			cssautoload: i
		});
	}
	let { id: n, cssautoload: r, csspath: i, debug: a } = e;
	return xr(n, {
		cssautoload: r === "auto" ? void 0 : r,
		csspath: i,
		debug: a
	});
}
var Cr = /* @__PURE__ */ Zn({
	ENTRANCE_ATTRIBUTE: () => Er,
	IN_EVENT: () => Tr,
	SHOWN_EVENT: () => wr,
	announce: () => Pr,
	markPending: () => Nr,
	pendingAround: () => Ir,
	reset: () => Fr,
	stateOf: () => Ar,
	whenShown: () => Lr
}), wr = "entranceshown", Tr = "entrancein", Er = "data-entrance", Dr = {
	pending: 0,
	shown: 1,
	in: 2
}, Or = Symbol.for("reveal.js-plugintoolkit.entranceTimers"), kr = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Ar(e) {
	let t = e.getAttribute(Er);
	return t === "pending" || t === "shown" || t === "in" ? t : null;
}
function jr(e, t) {
	if (e.setAttribute(Er, t), t === "pending") return;
	let n = {
		element: e,
		state: t
	};
	e.dispatchEvent(new CustomEvent(t === "shown" ? wr : Tr, {
		bubbles: !0,
		detail: n
	}));
}
function Mr(e) {
	for (let t of e[Or] ?? []) window.clearTimeout(t);
	delete e[Or];
}
function Nr(e) {
	Mr(e), jr(e, "pending");
}
function Pr(e, t) {
	Mr(e);
	let n = Math.max(0, t.delay ?? 0), r = Math.max(0, t.duration), i = Number.parseFloat(e.dataset.entranceAt ?? ""), a = Number.isFinite(i) ? Math.min(1, Math.max(0, i)) : .5;
	jr(e, "pending"), e[Or] = [window.setTimeout(() => jr(e, "shown"), n + r * a), window.setTimeout(() => {
		Ar(e) === "pending" && jr(e, "shown"), jr(e, "in"), delete e[Or];
	}, n + r)];
}
function Fr(e) {
	Nr(e);
}
function Ir(e, t = "shown") {
	let n = [];
	for (let r = e; r && r.tagName !== "SECTION"; r = r.parentElement) {
		let e = Ar(r);
		e && Dr[e] < Dr[t] && n.push(r);
	}
	return n;
}
function Lr(e, t = "shown", n) {
	if (n?.aborted) return Promise.resolve(!1);
	if (kr()) return Promise.resolve(!0);
	let r = Ir(e, t);
	return r.length ? new Promise((i) => {
		let a = () => {
			Ir(e, t).length || (s(), i(!0));
		}, o = () => {
			s(), i(!1);
		}, s = () => {
			for (let e of r) e.removeEventListener(wr, a), e.removeEventListener(Tr, a);
			n?.removeEventListener("abort", o);
		};
		for (let e of r) e.addEventListener(wr, a), e.addEventListener(Tr, a);
		n?.addEventListener("abort", o);
	}) : Promise.resolve(!0);
}
// src/plugin/js/config.ts
var Rr = "tablechart", zr = "tablechart-steps", Br = [
	"together",
	"delay",
	"after"
], Vr = {
	...N,
	controls: !1,
	replay: !0,
	sequence: "together",
	sequencedelay: 0,
	buildonload: !0,
	cssautoload: !0,
	csspath: ""
}, Hr = "em, i, .fragment", Ur = (e, t) => {
	e.setAttribute("data-fragment", "");
	let n = t.getAttribute("data-fragment-index");
	n !== null && e.setAttribute("data-fragment-index", n), t.classList.remove("fragment"), t.removeAttribute("data-fragment-index"), t.classList.length || t.removeAttribute("class");
}, Wr = (e) => {
	let t = Array.from(e.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE || e.nodeType === Node.TEXT_NODE && e.textContent?.trim());
	return t.length === 1 && t[0] instanceof Element ? t[0] : null;
}, Gr = (e) => {
	let t = [...Array.from(e.querySelectorAll("tbody tr")).map((e) => ({
		owner: e,
		cells: Array.from(e.children)
	})), ...Array.from(e.querySelector("thead tr:last-child")?.children ?? []).slice(1).map((e) => ({
		owner: e,
		cells: [e]
	}))];
	for (let { owner: e, cells: n } of t) {
		for (let t of n) t.classList.contains("fragment") && Ur(e, t);
		let t = n[0];
		if (t) for (let n = Wr(t); n?.matches(Hr); n = Wr(t)) Ur(e, n), n.replaceWith(...n.childNodes);
	}
}, Kr = (e, t) => {
	if (!t.length) return;
	let n = document.createElement("span");
	n.className = zr, n.setAttribute("aria-hidden", "true");
	for (let e of t) {
		let t = document.createElement("span");
		t.className = "fragment", e !== null && t.setAttribute("data-fragment-index", e), n.appendChild(t);
	}
	e.appendChild(n);
}, qr = (e) => {
	let t = e.querySelectorAll(`:scope > .${zr} > .fragment`);
	if (!t.length) return null;
	let n = 0;
	for (let e of t) e.classList.contains("visible") && n++;
	return n;
}, Jr = "tablechart-measuring", { pendingAround: Yr, whenShown: Xr } = Cr;
Gt("scatter", Jn);
var Zr = (e) => {
	for (let t = e.parentElement; t && t.tagName !== "SECTION"; t = t.parentElement) if (t.dataset.entrance) return !0;
	return !1;
}, Qr = (e) => Math.max(0, ...getComputedStyle(e ?? document.body).transitionDuration.split(",").map((e) => Number.parseFloat(e) * 1e3 || 0)), $r = async (e, t, n) => {
	let r = t.getConfig(), i = r.view === "print" || /print-pdf/gi.test(window.location.search);
	gr && (n.debug || r.debug) && (gr.initialize(!0, Rr), gr.log("Tablechart debugging enabled."));
	let a = t.getViewportElement() ?? document.body, o = Array.from(a.querySelectorAll(n.selector));
	if (n.tooltipparent ??= a.querySelector(".slides"), !o.length) return;
	n.langattribute = r.internation?.langattribute || n.langattribute;
	let s = /* @__PURE__ */ new Map();
	for (let e of o) {
		let t = e.closest("section") ?? a;
		s.set(t, [...s.get(t) ?? [], e]);
	}
	let c = (await Promise.all([...s.values()].map((e) => Hn(e, n)))).flat(), l = n.animate && !i;
	if (l) for (let e of c) Gr(e);
	let u = c.map((e) => cn(e, l ? n : {
		...n,
		animate: !1
	})).filter((e) => e !== null);
	for (let e of u) e.plan && Kr(e.figure, e.plan.indexes);
	for (let { figure: e } of u) {
		let t = e.querySelector(":scope > figcaption");
		if (!t?.id || t.dataset.name) continue;
		let n = t.parentElement?.closest("[id], [data-name]"), r = n?.dataset.name || n?.id;
		r && (t.dataset.name = r);
	}
	await Sr(e, n);
	let d = () => {
		a.classList.add(Jr), t.layout(), a.classList.remove(Jr);
	};
	window.addEventListener("load", d, { once: !0 });
	let f = !1;
	t.on("ready", () => {
		f = !0;
	});
	let p = !1, m = !1, h = () => {
		f && !p && (v ? (p = !0, requestAnimationFrame(() => {
			p = !1, d();
		})) : m = !0);
	}, g = (e) => {
		if (!e.figure.closest("section")?.classList.contains("present")) return !1;
		let t = e.figure.closest(".fragment");
		return !t || t.classList.contains("visible");
	}, _ = /* @__PURE__ */ new WeakMap(), v = !0, y = !0, b = window.matchMedia("(prefers-reduced-motion: reduce)"), x = (e) => {
		let t = e.figure.closest("[data-chart-sequence]"), r = t?.dataset.chartSequence, i = n.sequence;
		r && Br.includes(r) ? i = r : r && console.warn(`Tablechart: data-chart-sequence="${r}" is not one of ${Br.join(", ")}.`);
		let a = Number.parseFloat(t?.dataset.chartDelay ?? "");
		return {
			group: t ?? e.figure.closest("section"),
			mode: b.matches ? "together" : i,
			delay: Number.isFinite(a) ? a : n.sequencedelay
		};
	}, S = /* @__PURE__ */ new Map(), C = (e) => new Promise((t) => setTimeout(t, e)), w = async (e) => {
		await new Promise(requestAnimationFrame), await Promise.allSettled(e.getAnimations({ subtree: !0 }).map((e) => e.finished));
	}, T = async (e) => {
		if (b.matches) return;
		if (Yr(e.figure, "shown").length) {
			await Xr(e.figure, "shown");
			return;
		}
		await new Promise(requestAnimationFrame);
		let t = e.figure.getAnimations().filter((e) => e instanceof CSSAnimation);
		for (let n = e.figure.parentElement; n && n.tagName !== "SECTION"; n = n.parentElement) t.push(...n.getAnimations());
		let r = 0;
		for (let i of t) {
			let t = i.effect?.getComputedTiming(), a = Number(t?.activeDuration ?? 0);
			if (!t || !Number.isFinite(a)) continue;
			let o = Number(t.delay ?? 0) + a * zn(e.figure, n);
			r = Math.max(r, o - Number(i.currentTime ?? 0));
		}
		r > 0 && await C(r);
	}, D = async (e, t, n) => {
		let r = { live: !0 };
		for (let t of e) S.set(t, r);
		if (!(t !== "together" && e.some((e) => Zr(e.figure)) && (await Promise.all(e.map((e) => Xr(e.figure, "in"))), !r.live))) for (let [i, a] of e.entries()) {
			if (i > 0 && (t === "after" && await w(e[i - 1].figure), n && await C(n)), await T(a), !r.live) return;
			a.figure.classList.remove(O), vn(a, !0);
		}
	}, k = () => {
		let e = /* @__PURE__ */ new Map();
		for (let t of u) {
			let r = qr(t.figure);
			if (r !== null && vt(t, r), !(_.has(t) && g(t))) {
				let e = t.figure.classList.contains(E);
				if (e && !n.replay && !t.plan) continue;
				let r = S.get(t);
				r && (r.live = !1), S.delete(t), vn(t, !1, e && !t.figure.closest("section")?.classList.contains("present")), t.figure.classList.toggle(O, x(t).mode !== "together" && !Zr(t.figure));
				continue;
			}
			if (t.figure.classList.contains("is-shown") || S.has(t)) continue;
			if (y && !n.buildonload && !Zr(t.figure)) {
				t.figure.classList.remove(O), vn(t, !0, !0);
				continue;
			}
			let { group: i, mode: a, delay: o } = x(t);
			if (a === "together" || !i) {
				t.figure.classList.remove(O), D([t], "together", 0);
				continue;
			}
			Zr(t.figure) || t.figure.classList.add(O);
			let s = e.get(i) ?? {
				mode: a,
				delay: o,
				charts: []
			};
			s.charts.push(t), e.set(i, s);
		}
		for (let { mode: t, delay: n, charts: r } of e.values()) D(r, t, n);
	}, A = !1, j = () => {
		A || (A = !0, requestAnimationFrame(() => {
			A = !1, k();
		}));
	}, M = (e) => {
		let t = e.plot.clientWidth;
		if (!t || t === _.get(e)) return;
		let r = !_.has(e), a = e.figure.offsetHeight;
		hn(e, n) && (_.set(e, t), e.figure.offsetHeight !== a && h(), i && vn(e, !0), r && n.animate && v && j());
	};
	for (let e of u) {
		M(e);
		let t = !1, n = e.figure.offsetHeight;
		new ResizeObserver(() => {
			t || (t = !0, requestAnimationFrame(() => {
				t = !1, M(e), e.figure.offsetHeight !== n && (n = e.figure.offsetHeight, h());
			}));
		}).observe(e.figure);
	}
	if (new MutationObserver(() => {
		for (let e of u) gn(e, n);
		requestAnimationFrame(() => requestAnimationFrame(() => {
			for (let e of u) _.delete(e), M(e);
		}));
	}).observe(document.documentElement, {
		attributes: !0,
		attributeFilter: ["lang"]
	}), n.animate) {
		let e, n = () => {
			clearTimeout(e), v = !0, m && (m = !1, h()), k();
		};
		t.on("slidetransitionend", async () => {
			let e = t.getCurrentSlide(), r = [e, e?.parentElement?.matches("section.stack") ? e.parentElement : null].flatMap((e) => e ? e.getAnimations() : []).filter((e) => e.playState === "running");
			await Promise.all(r.map((e) => e.finished.catch(() => void 0))), t.getCurrentSlide() === e && n();
		}), t.on("slidechanged", () => {
			f && (y = !1), v = !1, clearTimeout(e), e = setTimeout(n, Qr(t.getCurrentSlide()) + 50);
		}), t.on("ready", n);
		let r = () => {
			y = !1, k();
		};
		t.on("fragmentshown", r), t.on("fragmenthidden", r), k();
	}
	gr?.log?.(`Tablechart started ${u.length} chart(s).`);
}, ei = () => new lr(Rr, $r, Vr).createInterface();
export { ei as default };
