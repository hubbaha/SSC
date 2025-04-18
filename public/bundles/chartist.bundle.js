!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("Chartist", [], function () {
        return (t.Chartist = e());
      })
    : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.Chartist = e());
})(this, function () {
  var n = { version: "0.11.0" };
  return (
    (function (u, g, p) {
      "use strict";
      (p.namespaces = {
        svg: "http://www.w3.org/2000/svg",
        xmlns: "http://www.w3.org/2000/xmlns/",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        ct: "http://gionkunz.github.com/chartist-js/ct",
      }),
        (p.noop = function (t) {
          return t;
        }),
        (p.alphaNumerate = function (t) {
          return String.fromCharCode(97 + (t % 26));
        }),
        (p.extend = function (t) {
          var e, i, n;
          for (t = t || {}, e = 1; e < arguments.length; e++)
            for (var a in (i = arguments[e]))
              "object" != typeof (n = i[a]) || null === n || n instanceof Array
                ? (t[a] = n)
                : (t[a] = p.extend(t[a], n));
          return t;
        }),
        (p.replaceAll = function (t, e, i) {
          return t.replace(new RegExp(e, "g"), i);
        }),
        (p.ensureUnit = function (t, e) {
          return "number" == typeof t && (t += e), t;
        }),
        (p.quantity = function (t) {
          if ("string" != typeof t) return { value: t };
          var e = /^(\d+)\s*(.*)$/g.exec(t);
          return { value: +e[1], unit: e[2] || void 0 };
        }),
        (p.querySelector = function (t) {
          return t instanceof Node ? t : g.querySelector(t);
        }),
        (p.times = function (t) {
          return Array.apply(null, new Array(t));
        }),
        (p.sum = function (t, e) {
          return t + (e || 0);
        }),
        (p.mapMultiply = function (e) {
          return function (t) {
            return t * e;
          };
        }),
        (p.mapAdd = function (e) {
          return function (t) {
            return t + e;
          };
        }),
        (p.serialMap = function (n, a) {
          var r = [],
            t = Math.max.apply(
              null,
              n.map(function (t) {
                return t.length;
              }),
            );
          return (
            p.times(t).forEach(function (t, e) {
              var i = n.map(function (t) {
                return t[e];
              });
              r[e] = a.apply(null, i);
            }),
            r
          );
        }),
        (p.roundWithPrecision = function (t, e) {
          var i = Math.pow(10, e || p.precision);
          return Math.round(t * i) / i;
        }),
        (p.precision = 8),
        (p.escapingMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }),
        (p.serialize = function (t) {
          return null == t
            ? t
            : ("number" == typeof t
                ? (t = "" + t)
                : "object" == typeof t && (t = JSON.stringify({ data: t })),
              Object.keys(p.escapingMap).reduce(function (t, e) {
                return p.replaceAll(t, e, p.escapingMap[e]);
              }, t));
        }),
        (p.deserialize = function (t) {
          if ("string" != typeof t) return t;
          t = Object.keys(p.escapingMap).reduce(function (t, e) {
            return p.replaceAll(t, p.escapingMap[e], e);
          }, t);
          try {
            t = void 0 !== (t = JSON.parse(t)).data ? t.data : t;
          } catch (t) {}
          return t;
        }),
        (p.createSvg = function (e, t, i, n) {
          var a;
          return (
            (t = t || "100%"),
            (i = i || "100%"),
            Array.prototype.slice
              .call(e.querySelectorAll("svg"))
              .filter(function (t) {
                return t.getAttributeNS(p.namespaces.xmlns, "ct");
              })
              .forEach(function (t) {
                e.removeChild(t);
              }),
            ((a = new p.Svg("svg")
              .attr({ width: t, height: i })
              .addClass(n))._node.style.width = t),
            (a._node.style.height = i),
            e.appendChild(a._node),
            a
          );
        }),
        (p.normalizeData = function (t, e, i) {
          var n,
            a = { raw: t, normalized: {} };
          return (
            (a.normalized.series = p.getDataArray(
              { series: t.series || [] },
              e,
              i,
            )),
            (n = a.normalized.series.every(function (t) {
              return t instanceof Array;
            })
              ? Math.max.apply(
                  null,
                  a.normalized.series.map(function (t) {
                    return t.length;
                  }),
                )
              : a.normalized.series.length),
            (a.normalized.labels = (t.labels || []).slice()),
            Array.prototype.push.apply(
              a.normalized.labels,
              p
                .times(Math.max(0, n - a.normalized.labels.length))
                .map(function () {
                  return "";
                }),
            ),
            e && p.reverseData(a.normalized),
            a
          );
        }),
        (p.safeHasProperty = function (t, e) {
          return null !== t && "object" == typeof t && t.hasOwnProperty(e);
        }),
        (p.isDataHoleValue = function (t) {
          return null == t || ("number" == typeof t && isNaN(t));
        }),
        (p.reverseData = function (t) {
          t.labels.reverse(), t.series.reverse();
          for (var e = 0; e < t.series.length; e++)
            "object" == typeof t.series[e] && void 0 !== t.series[e].data
              ? t.series[e].data.reverse()
              : t.series[e] instanceof Array && t.series[e].reverse();
        }),
        (p.getDataArray = function (t, e, n) {
          return t.series.map(function t(e) {
            if (p.safeHasProperty(e, "value")) return t(e.value);
            if (p.safeHasProperty(e, "data")) return t(e.data);
            if (e instanceof Array) return e.map(t);
            if (!p.isDataHoleValue(e)) {
              if (n) {
                var i = {};
                return (
                  "string" == typeof n
                    ? (i[n] = p.getNumberOrUndefined(e))
                    : (i.y = p.getNumberOrUndefined(e)),
                  (i.x = e.hasOwnProperty("x")
                    ? p.getNumberOrUndefined(e.x)
                    : i.x),
                  (i.y = e.hasOwnProperty("y")
                    ? p.getNumberOrUndefined(e.y)
                    : i.y),
                  i
                );
              }
              return p.getNumberOrUndefined(e);
            }
          });
        }),
        (p.normalizePadding = function (t, e) {
          return (
            (e = e || 0),
            "number" == typeof t
              ? { top: t, right: t, bottom: t, left: t }
              : {
                  top: "number" == typeof t.top ? t.top : e,
                  right: "number" == typeof t.right ? t.right : e,
                  bottom: "number" == typeof t.bottom ? t.bottom : e,
                  left: "number" == typeof t.left ? t.left : e,
                }
          );
        }),
        (p.getMetaData = function (t, e) {
          var i = t.data ? t.data[e] : t[e];
          return i ? i.meta : void 0;
        }),
        (p.orderOfMagnitude = function (t) {
          return Math.floor(Math.log(Math.abs(t)) / Math.LN10);
        }),
        (p.projectLength = function (t, e, i) {
          return (e / i.range) * t;
        }),
        (p.getAvailableHeight = function (t, e) {
          return Math.max(
            (p.quantity(e.height).value || t.height()) -
              (e.chartPadding.top + e.chartPadding.bottom) -
              e.axisX.offset,
            0,
          );
        }),
        (p.getHighLow = function (t, e, a) {
          var r = {
              high:
                void 0 ===
                (e = p.extend({}, e, a ? e["axis" + a.toUpperCase()] : {})).high
                  ? -Number.MAX_VALUE
                  : +e.high,
              low: void 0 === e.low ? Number.MAX_VALUE : +e.low,
            },
            o = void 0 === e.high,
            s = void 0 === e.low;
          return (
            (o || s) &&
              (function t(e) {
                if (void 0 !== e)
                  if (e instanceof Array)
                    for (var i = 0; i < e.length; i++) t(e[i]);
                  else {
                    var n = a ? +e[a] : +e;
                    o && n > r.high && (r.high = n),
                      s && n < r.low && (r.low = n);
                  }
              })(t),
            (e.referenceValue || 0 === e.referenceValue) &&
              ((r.high = Math.max(e.referenceValue, r.high)),
              (r.low = Math.min(e.referenceValue, r.low))),
            r.high <= r.low &&
              (0 === r.low
                ? (r.high = 1)
                : r.low < 0
                  ? (r.high = 0)
                  : (0 < r.high || (r.high = 1), (r.low = 0))),
            r
          );
        }),
        (p.isNumeric = function (t) {
          return null !== t && isFinite(t);
        }),
        (p.isFalseyButZero = function (t) {
          return !t && 0 !== t;
        }),
        (p.getNumberOrUndefined = function (t) {
          return p.isNumeric(t) ? +t : void 0;
        }),
        (p.isMultiValue = function (t) {
          return "object" == typeof t && ("x" in t || "y" in t);
        }),
        (p.getMultiValue = function (t, e) {
          return p.isMultiValue(t)
            ? p.getNumberOrUndefined(t[e || "y"])
            : p.getNumberOrUndefined(t);
        }),
        (p.rho = function (t) {
          function i(t, e) {
            return t % e == 0 ? e : i(e, t % e);
          }
          function e(t) {
            return t * t + 1;
          }
          if (1 === t) return t;
          var n,
            a = 2,
            r = 2;
          if (t % 2 == 0) return 2;
          for (
            ;
            (a = e(a) % t),
              (r = e(e(r)) % t),
              1 === (n = i(Math.abs(a - r), t));

          );
          return n;
        }),
        (p.getBounds = function (t, e, i, n) {
          function a(t, e) {
            return t === (t += e) && (t *= 1 + (0 < e ? h : -h)), t;
          }
          var r,
            o,
            s,
            l = 0,
            u = { high: e.high, low: e.low };
          (u.valueRange = u.high - u.low),
            (u.oom = p.orderOfMagnitude(u.valueRange)),
            (u.step = Math.pow(10, u.oom)),
            (u.min = Math.floor(u.low / u.step) * u.step),
            (u.max = Math.ceil(u.high / u.step) * u.step),
            (u.range = u.max - u.min),
            (u.numberOfSteps = Math.round(u.range / u.step));
          var d = p.projectLength(t, u.step, u) < i,
            c = n ? p.rho(u.range) : 0;
          if (n && p.projectLength(t, 1, u) >= i) u.step = 1;
          else if (n && c < u.step && p.projectLength(t, c, u) >= i) u.step = c;
          else
            for (;;) {
              if (d && p.projectLength(t, u.step, u) <= i) u.step *= 2;
              else {
                if (d || !(p.projectLength(t, u.step / 2, u) >= i)) break;
                if (((u.step /= 2), n && u.step % 1 != 0)) {
                  u.step *= 2;
                  break;
                }
              }
              if (1e3 < l++)
                throw new Error(
                  "Exceeded maximum number of iterations while optimizing scale step!",
                );
            }
          var h = 2221e-19;
          for (
            u.step = Math.max(u.step, h), o = u.min, s = u.max;
            o + u.step <= u.low;

          )
            o = a(o, u.step);
          for (; s - u.step >= u.high; ) s = a(s, -u.step);
          (u.min = o), (u.max = s), (u.range = u.max - u.min);
          var f = [];
          for (r = u.min; r <= u.max; r = a(r, u.step)) {
            var g = p.roundWithPrecision(r);
            g !== f[f.length - 1] && f.push(g);
          }
          return (u.values = f), u;
        }),
        (p.polarToCartesian = function (t, e, i, n) {
          var a = ((n - 90) * Math.PI) / 180;
          return { x: t + i * Math.cos(a), y: e + i * Math.sin(a) };
        }),
        (p.createChartRect = function (t, e, i) {
          var n = !(!e.axisX && !e.axisY),
            a = n ? e.axisY.offset : 0,
            r = n ? e.axisX.offset : 0,
            o = t.width() || p.quantity(e.width).value || 0,
            s = t.height() || p.quantity(e.height).value || 0,
            l = p.normalizePadding(e.chartPadding, i);
          (o = Math.max(o, a + l.left + l.right)),
            (s = Math.max(s, r + l.top + l.bottom));
          var u = {
            padding: l,
            width: function () {
              return this.x2 - this.x1;
            },
            height: function () {
              return this.y1 - this.y2;
            },
          };
          return (
            n
              ? ("start" === e.axisX.position
                  ? ((u.y2 = l.top + r),
                    (u.y1 = Math.max(s - l.bottom, u.y2 + 1)))
                  : ((u.y2 = l.top),
                    (u.y1 = Math.max(s - l.bottom - r, u.y2 + 1))),
                "start" === e.axisY.position
                  ? ((u.x1 = l.left + a),
                    (u.x2 = Math.max(o - l.right, u.x1 + 1)))
                  : ((u.x1 = l.left),
                    (u.x2 = Math.max(o - l.right - a, u.x1 + 1))))
              : ((u.x1 = l.left),
                (u.x2 = Math.max(o - l.right, u.x1 + 1)),
                (u.y2 = l.top),
                (u.y1 = Math.max(s - l.bottom, u.y2 + 1))),
            u
          );
        }),
        (p.createGrid = function (t, e, i, n, a, r, o, s) {
          var l = {};
          (l[i.units.pos + "1"] = t),
            (l[i.units.pos + "2"] = t),
            (l[i.counterUnits.pos + "1"] = n),
            (l[i.counterUnits.pos + "2"] = n + a);
          var u = r.elem("line", l, o.join(" "));
          s.emit(
            "draw",
            p.extend(
              { type: "grid", axis: i, index: e, group: r, element: u },
              l,
            ),
          );
        }),
        (p.createGridBackground = function (t, e, i, n) {
          var a = t.elem(
            "rect",
            { x: e.x1, y: e.y2, width: e.width(), height: e.height() },
            i,
            !0,
          );
          n.emit("draw", { type: "gridBackground", group: t, element: a });
        }),
        (p.createLabel = function (t, e, i, n, a, r, o, s, l, u, d) {
          var c,
            h = {};
          if (
            ((h[a.units.pos] = t + o[a.units.pos]),
            (h[a.counterUnits.pos] = o[a.counterUnits.pos]),
            (h[a.units.len] = e),
            (h[a.counterUnits.len] = Math.max(0, r - 10)),
            u)
          ) {
            var f = g.createElement("span");
            (f.className = l.join(" ")),
              f.setAttribute("xmlns", p.namespaces.xhtml),
              (f.innerText = n[i]),
              (f.style[a.units.len] = Math.round(h[a.units.len]) + "px"),
              (f.style[a.counterUnits.len] =
                Math.round(h[a.counterUnits.len]) + "px"),
              (c = s.foreignObject(
                f,
                p.extend({ style: "overflow: visible;" }, h),
              ));
          } else c = s.elem("text", h, l.join(" ")).text(n[i]);
          d.emit(
            "draw",
            p.extend(
              {
                type: "label",
                axis: a,
                index: i,
                group: s,
                element: c,
                text: n[i],
              },
              h,
            ),
          );
        }),
        (p.getSeriesOption = function (t, e, i) {
          if (t.name && e.series && e.series[t.name]) {
            var n = e.series[t.name];
            return n.hasOwnProperty(i) ? n[i] : e[i];
          }
          return e[i];
        }),
        (p.optionsProvider = function (t, i, n) {
          function e(t) {
            var e = a;
            if (((a = p.extend({}, o)), i))
              for (r = 0; r < i.length; r++) {
                u.matchMedia(i[r][0]).matches && (a = p.extend(a, i[r][1]));
              }
            n &&
              t &&
              n.emit("optionsChanged", {
                previousOptions: e,
                currentOptions: a,
              });
          }
          var a,
            r,
            o = p.extend({}, t),
            s = [];
          if (!u.matchMedia)
            throw "window.matchMedia not found! Make sure you're using a polyfill.";
          if (i)
            for (r = 0; r < i.length; r++) {
              var l = u.matchMedia(i[r][0]);
              l.addListener(e), s.push(l);
            }
          return (
            e(),
            {
              removeMediaQueryListeners: function () {
                s.forEach(function (t) {
                  t.removeListener(e);
                });
              },
              getCurrentOptions: function () {
                return p.extend({}, a);
              },
            }
          );
        }),
        (p.splitIntoSegments = function (t, e, i) {
          i = p.extend({}, { increasingX: !1, fillHoles: !1 }, i);
          for (var n = [], a = !0, r = 0; r < t.length; r += 2)
            void 0 === p.getMultiValue(e[r / 2].value)
              ? i.fillHoles || (a = !0)
              : (i.increasingX && 2 <= r && t[r] <= t[r - 2] && (a = !0),
                a && (n.push({ pathCoordinates: [], valueData: [] }), (a = !1)),
                n[n.length - 1].pathCoordinates.push(t[r], t[r + 1]),
                n[n.length - 1].valueData.push(e[r / 2]));
          return n;
        });
    })(window, document, n),
    (function (t, e, p) {
      "use strict";
      (p.Interpolation = {}),
        (p.Interpolation.none = function (l) {
          return (
            (l = p.extend({}, { fillHoles: !1 }, l)),
            function (t, e) {
              for (
                var i = new p.Svg.Path(), n = !0, a = 0;
                a < t.length;
                a += 2
              ) {
                var r = t[a],
                  o = t[a + 1],
                  s = e[a / 2];
                void 0 !== p.getMultiValue(s.value)
                  ? (n ? i.move(r, o, !1, s) : i.line(r, o, !1, s), (n = !1))
                  : l.fillHoles || (n = !0);
              }
              return i;
            }
          );
        }),
        (p.Interpolation.simple = function (c) {
          c = p.extend({}, { divisor: 2, fillHoles: !1 }, c);
          var h = 1 / Math.max(1, c.divisor);
          return function (t, e) {
            for (
              var i, n, a, r = new p.Svg.Path(), o = 0;
              o < t.length;
              o += 2
            ) {
              var s = t[o],
                l = t[o + 1],
                u = (s - i) * h,
                d = e[o / 2];
              void 0 !== d.value
                ? (void 0 === a
                    ? r.move(s, l, !1, d)
                    : r.curve(i + u, n, s - u, l, s, l, !1, d),
                  (i = s),
                  (n = l),
                  (a = d))
                : c.fillHoles || (i = s = a = void 0);
            }
            return r;
          };
        }),
        (p.Interpolation.cardinal = function (u) {
          u = p.extend({}, { tension: 1, fillHoles: !1 }, u);
          var d = Math.min(1, Math.max(0, u.tension)),
            c = 1 - d;
          return function e(t, i) {
            var n = p.splitIntoSegments(t, i, { fillHoles: u.fillHoles });
            if (n.length) {
              if (1 < n.length) {
                var a = [];
                return (
                  n.forEach(function (t) {
                    a.push(e(t.pathCoordinates, t.valueData));
                  }),
                  p.Svg.Path.join(a)
                );
              }
              if (
                ((t = n[0].pathCoordinates),
                (i = n[0].valueData),
                t.length <= 4)
              )
                return p.Interpolation.none()(t, i);
              for (
                var r = new p.Svg.Path().move(t[0], t[1], !1, i[0]),
                  o = 0,
                  s = t.length;
                o < s - 2;
                o += 2
              ) {
                var l = [
                  { x: +t[o - 2], y: +t[o - 1] },
                  { x: +t[o], y: +t[o + 1] },
                  { x: +t[o + 2], y: +t[o + 3] },
                  { x: +t[o + 4], y: +t[o + 5] },
                ];
                s - 4 === o
                  ? (l[3] = l[2])
                  : o || (l[0] = { x: +t[o], y: +t[o + 1] }),
                  r.curve(
                    (d * (-l[0].x + 6 * l[1].x + l[2].x)) / 6 + c * l[2].x,
                    (d * (-l[0].y + 6 * l[1].y + l[2].y)) / 6 + c * l[2].y,
                    (d * (l[1].x + 6 * l[2].x - l[3].x)) / 6 + c * l[2].x,
                    (d * (l[1].y + 6 * l[2].y - l[3].y)) / 6 + c * l[2].y,
                    l[2].x,
                    l[2].y,
                    !1,
                    i[(o + 2) / 2],
                  );
              }
              return r;
            }
            return p.Interpolation.none()([]);
          };
        }),
        (p.Interpolation.monotoneCubic = function (g) {
          return (
            (g = p.extend({}, { fillHoles: !1 }, g)),
            function e(t, i) {
              var n = p.splitIntoSegments(t, i, {
                fillHoles: g.fillHoles,
                increasingX: !0,
              });
              if (n.length) {
                if (1 < n.length) {
                  var a = [];
                  return (
                    n.forEach(function (t) {
                      a.push(e(t.pathCoordinates, t.valueData));
                    }),
                    p.Svg.Path.join(a)
                  );
                }
                if (
                  ((t = n[0].pathCoordinates),
                  (i = n[0].valueData),
                  t.length <= 4)
                )
                  return p.Interpolation.none()(t, i);
                var r,
                  o,
                  s = [],
                  l = [],
                  u = t.length / 2,
                  d = [],
                  c = [],
                  h = [],
                  f = [];
                for (r = 0; r < u; r++)
                  (s[r] = t[2 * r]), (l[r] = t[2 * r + 1]);
                for (r = 0; r < u - 1; r++)
                  (h[r] = l[r + 1] - l[r]),
                    (f[r] = s[r + 1] - s[r]),
                    (c[r] = h[r] / f[r]);
                for (d[0] = c[0], d[u - 1] = c[u - 2], r = 1; r < u - 1; r++)
                  0 === c[r] || 0 === c[r - 1] || 0 < c[r - 1] != 0 < c[r]
                    ? (d[r] = 0)
                    : ((d[r] =
                        (3 * (f[r - 1] + f[r])) /
                        ((2 * f[r] + f[r - 1]) / c[r - 1] +
                          (f[r] + 2 * f[r - 1]) / c[r])),
                      isFinite(d[r]) || (d[r] = 0));
                for (
                  o = new p.Svg.Path().move(s[0], l[0], !1, i[0]), r = 0;
                  r < u - 1;
                  r++
                )
                  o.curve(
                    s[r] + f[r] / 3,
                    l[r] + (d[r] * f[r]) / 3,
                    s[r + 1] - f[r] / 3,
                    l[r + 1] - (d[r + 1] * f[r]) / 3,
                    s[r + 1],
                    l[r + 1],
                    !1,
                    i[r + 1],
                  );
                return o;
              }
              return p.Interpolation.none()([]);
            }
          );
        }),
        (p.Interpolation.step = function (d) {
          return (
            (d = p.extend({}, { postpone: !0, fillHoles: !1 }, d)),
            function (t, e) {
              for (
                var i, n, a, r = new p.Svg.Path(), o = 0;
                o < t.length;
                o += 2
              ) {
                var s = t[o],
                  l = t[o + 1],
                  u = e[o / 2];
                void 0 !== u.value
                  ? (void 0 === a
                      ? r.move(s, l, !1, u)
                      : (d.postpone ? r.line(s, n, !1, a) : r.line(i, l, !1, u),
                        r.line(s, l, !1, u)),
                    (i = s),
                    (n = l),
                    (a = u))
                  : d.fillHoles || (i = n = a = void 0);
              }
              return r;
            }
          );
        });
    })(window, document, n),
    (function (t, e, i) {
      "use strict";
      n.EventEmitter = function () {
        var n = [];
        return {
          addEventHandler: function (t, e) {
            (n[t] = n[t] || []), n[t].push(e);
          },
          removeEventHandler: function (t, e) {
            n[t] &&
              (e
                ? (n[t].splice(n[t].indexOf(e), 1),
                  0 === n[t].length && delete n[t])
                : delete n[t]);
          },
          emit: function (e, i) {
            n[e] &&
              n[e].forEach(function (t) {
                t(i);
              }),
              n["*"] &&
                n["*"].forEach(function (t) {
                  t(e, i);
                });
          },
        };
      };
    })(window, document),
    (function (t, e, r) {
      "use strict";
      r.Class = {
        extend: function (t, e) {
          var i = e || this.prototype || r.Class,
            n = Object.create(i);
          r.Class.cloneDefinitions(n, t);
          var a = function () {
            var t,
              e = n.constructor || function () {};
            return (
              (t = this === r ? Object.create(n) : this),
              e.apply(t, Array.prototype.slice.call(arguments, 0)),
              t
            );
          };
          return (a.prototype = n), (a.super = i), (a.extend = this.extend), a;
        },
        cloneDefinitions: function () {
          var t = (function (t) {
              var e = [];
              if (t.length) for (var i = 0; i < t.length; i++) e.push(t[i]);
              return e;
            })(arguments),
            i = t[0];
          return (
            t.splice(1, t.length - 1).forEach(function (e) {
              Object.getOwnPropertyNames(e).forEach(function (t) {
                delete i[t],
                  Object.defineProperty(
                    i,
                    t,
                    Object.getOwnPropertyDescriptor(e, t),
                  );
              });
            }),
            i
          );
        },
      };
    })(window, document, n),
    (function (r, t, o) {
      "use strict";
      o.Base = o.Class.extend({
        constructor: function (t, e, i, n, a) {
          (this.container = o.querySelector(t)),
            (this.data = e || {}),
            (this.data.labels = this.data.labels || []),
            (this.data.series = this.data.series || []),
            (this.defaultOptions = i),
            (this.options = n),
            (this.responsiveOptions = a),
            (this.eventEmitter = o.EventEmitter()),
            (this.supportsForeignObject = o.Svg.isSupported("Extensibility")),
            (this.supportsAnimations = o.Svg.isSupported(
              "AnimationEventsAttribute",
            )),
            (this.resizeListener = function () {
              this.update();
            }.bind(this)),
            this.container &&
              (this.container.__chartist__ &&
                this.container.__chartist__.detach(),
              (this.container.__chartist__ = this)),
            (this.initializeTimeoutId = setTimeout(
              function () {
                r.addEventListener("resize", this.resizeListener),
                  (this.optionsProvider = o.optionsProvider(
                    this.options,
                    this.responsiveOptions,
                    this.eventEmitter,
                  )),
                  this.eventEmitter.addEventHandler(
                    "optionsChanged",
                    function () {
                      this.update();
                    }.bind(this),
                  ),
                  this.options.plugins &&
                    this.options.plugins.forEach(
                      function (t) {
                        t instanceof Array ? t[0](this, t[1]) : t(this);
                      }.bind(this),
                    ),
                  this.eventEmitter.emit("data", {
                    type: "initial",
                    data: this.data,
                  }),
                  this.createChart(this.optionsProvider.getCurrentOptions()),
                  (this.initializeTimeoutId = void 0);
              }.bind(this),
              0,
            ));
        },
        optionsProvider: void 0,
        container: void 0,
        svg: void 0,
        eventEmitter: void 0,
        createChart: function () {
          throw new Error("Base chart type can't be instantiated!");
        },
        update: function (t, e, i) {
          return (
            t &&
              ((this.data = t || {}),
              (this.data.labels = this.data.labels || []),
              (this.data.series = this.data.series || []),
              this.eventEmitter.emit("data", {
                type: "update",
                data: this.data,
              })),
            e &&
              ((this.options = o.extend(
                {},
                i ? this.options : this.defaultOptions,
                e,
              )),
              this.initializeTimeoutId ||
                (this.optionsProvider.removeMediaQueryListeners(),
                (this.optionsProvider = o.optionsProvider(
                  this.options,
                  this.responsiveOptions,
                  this.eventEmitter,
                )))),
            this.initializeTimeoutId ||
              this.createChart(this.optionsProvider.getCurrentOptions()),
            this
          );
        },
        detach: function () {
          return (
            this.initializeTimeoutId
              ? r.clearTimeout(this.initializeTimeoutId)
              : (r.removeEventListener("resize", this.resizeListener),
                this.optionsProvider.removeMediaQueryListeners()),
            this
          );
        },
        on: function (t, e) {
          return this.eventEmitter.addEventHandler(t, e), this;
        },
        off: function (t, e) {
          return this.eventEmitter.removeEventHandler(t, e), this;
        },
        version: o.version,
        supportsForeignObject: !1,
      });
    })(window, document, n),
    (function (t, o, l) {
      "use strict";
      (l.Svg = l.Class.extend({
        constructor: function (t, e, i, n, a) {
          t instanceof Element
            ? (this._node = t)
            : ((this._node = o.createElementNS(l.namespaces.svg, t)),
              "svg" === t && this.attr({ "xmlns:ct": l.namespaces.ct })),
            e && this.attr(e),
            i && this.addClass(i),
            n &&
              (a && n._node.firstChild
                ? n._node.insertBefore(this._node, n._node.firstChild)
                : n._node.appendChild(this._node));
        },
        attr: function (i, t) {
          return "string" == typeof i
            ? t
              ? this._node.getAttributeNS(t, i)
              : this._node.getAttribute(i)
            : (Object.keys(i).forEach(
                function (t) {
                  if (void 0 !== i[t])
                    if (-1 !== t.indexOf(":")) {
                      var e = t.split(":");
                      this._node.setAttributeNS(l.namespaces[e[0]], t, i[t]);
                    } else this._node.setAttribute(t, i[t]);
                }.bind(this),
              ),
              this);
        },
        elem: function (t, e, i, n) {
          return new l.Svg(t, e, i, this, n);
        },
        parent: function () {
          return this._node.parentNode instanceof SVGElement
            ? new l.Svg(this._node.parentNode)
            : null;
        },
        root: function () {
          for (var t = this._node; "svg" !== t.nodeName; ) t = t.parentNode;
          return new l.Svg(t);
        },
        querySelector: function (t) {
          var e = this._node.querySelector(t);
          return e ? new l.Svg(e) : null;
        },
        querySelectorAll: function (t) {
          var e = this._node.querySelectorAll(t);
          return e.length ? new l.Svg.List(e) : null;
        },
        getNode: function () {
          return this._node;
        },
        foreignObject: function (t, e, i, n) {
          if ("string" == typeof t) {
            var a = o.createElement("div");
            (a.innerHTML = t), (t = a.firstChild);
          }
          t.setAttribute("xmlns", l.namespaces.xmlns);
          var r = this.elem("foreignObject", e, i, n);
          return r._node.appendChild(t), r;
        },
        text: function (t) {
          return this._node.appendChild(o.createTextNode(t)), this;
        },
        empty: function () {
          for (; this._node.firstChild; )
            this._node.removeChild(this._node.firstChild);
          return this;
        },
        remove: function () {
          return this._node.parentNode.removeChild(this._node), this.parent();
        },
        replace: function (t) {
          return this._node.parentNode.replaceChild(t._node, this._node), t;
        },
        append: function (t, e) {
          return (
            e && this._node.firstChild
              ? this._node.insertBefore(t._node, this._node.firstChild)
              : this._node.appendChild(t._node),
            this
          );
        },
        classes: function () {
          return this._node.getAttribute("class")
            ? this._node.getAttribute("class").trim().split(/\s+/)
            : [];
        },
        addClass: function (t) {
          return (
            this._node.setAttribute(
              "class",
              this.classes(this._node)
                .concat(t.trim().split(/\s+/))
                .filter(function (t, e, i) {
                  return i.indexOf(t) === e;
                })
                .join(" "),
            ),
            this
          );
        },
        removeClass: function (t) {
          var e = t.trim().split(/\s+/);
          return (
            this._node.setAttribute(
              "class",
              this.classes(this._node)
                .filter(function (t) {
                  return -1 === e.indexOf(t);
                })
                .join(" "),
            ),
            this
          );
        },
        removeAllClasses: function () {
          return this._node.setAttribute("class", ""), this;
        },
        height: function () {
          return this._node.getBoundingClientRect().height;
        },
        width: function () {
          return this._node.getBoundingClientRect().width;
        },
        animate: function (t, i, s) {
          return (
            void 0 === i && (i = !0),
            Object.keys(t).forEach(
              function (o) {
                function e(e, t) {
                  var i,
                    n,
                    a,
                    r = {};
                  e.easing &&
                    ((a =
                      e.easing instanceof Array
                        ? e.easing
                        : l.Svg.Easing[e.easing]),
                    delete e.easing),
                    (e.begin = l.ensureUnit(e.begin, "ms")),
                    (e.dur = l.ensureUnit(e.dur, "ms")),
                    a &&
                      ((e.calcMode = "spline"),
                      (e.keySplines = a.join(" ")),
                      (e.keyTimes = "0;1")),
                    t &&
                      ((e.fill = "freeze"),
                      (r[o] = e.from),
                      this.attr(r),
                      (n = l.quantity(e.begin || 0).value),
                      (e.begin = "indefinite")),
                    (i = this.elem(
                      "animate",
                      l.extend({ attributeName: o }, e),
                    )),
                    t &&
                      setTimeout(
                        function () {
                          try {
                            i._node.beginElement();
                          } catch (t) {
                            (r[o] = e.to), this.attr(r), i.remove();
                          }
                        }.bind(this),
                        n,
                      ),
                    s &&
                      i._node.addEventListener(
                        "beginEvent",
                        function () {
                          s.emit("animationBegin", {
                            element: this,
                            animate: i._node,
                            params: e,
                          });
                        }.bind(this),
                      ),
                    i._node.addEventListener(
                      "endEvent",
                      function () {
                        s &&
                          s.emit("animationEnd", {
                            element: this,
                            animate: i._node,
                            params: e,
                          }),
                          t && ((r[o] = e.to), this.attr(r), i.remove());
                      }.bind(this),
                    );
                }
                t[o] instanceof Array
                  ? t[o].forEach(
                      function (t) {
                        e.bind(this)(t, !1);
                      }.bind(this),
                    )
                  : e.bind(this)(t[o], i);
              }.bind(this),
            ),
            this
          );
        },
      })),
        (l.Svg.isSupported = function (t) {
          return o.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#" + t,
            "1.1",
          );
        });
      (l.Svg.Easing = {
        easeInSine: [0.47, 0, 0.745, 0.715],
        easeOutSine: [0.39, 0.575, 0.565, 1],
        easeInOutSine: [0.445, 0.05, 0.55, 0.95],
        easeInQuad: [0.55, 0.085, 0.68, 0.53],
        easeOutQuad: [0.25, 0.46, 0.45, 0.94],
        easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
        easeInCubic: [0.55, 0.055, 0.675, 0.19],
        easeOutCubic: [0.215, 0.61, 0.355, 1],
        easeInOutCubic: [0.645, 0.045, 0.355, 1],
        easeInQuart: [0.895, 0.03, 0.685, 0.22],
        easeOutQuart: [0.165, 0.84, 0.44, 1],
        easeInOutQuart: [0.77, 0, 0.175, 1],
        easeInQuint: [0.755, 0.05, 0.855, 0.06],
        easeOutQuint: [0.23, 1, 0.32, 1],
        easeInOutQuint: [0.86, 0, 0.07, 1],
        easeInExpo: [0.95, 0.05, 0.795, 0.035],
        easeOutExpo: [0.19, 1, 0.22, 1],
        easeInOutExpo: [1, 0, 0, 1],
        easeInCirc: [0.6, 0.04, 0.98, 0.335],
        easeOutCirc: [0.075, 0.82, 0.165, 1],
        easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
        easeInBack: [0.6, -0.28, 0.735, 0.045],
        easeOutBack: [0.175, 0.885, 0.32, 1.275],
        easeInOutBack: [0.68, -0.55, 0.265, 1.55],
      }),
        (l.Svg.List = l.Class.extend({
          constructor: function (t) {
            var n = this;
            this.svgElements = [];
            for (var e = 0; e < t.length; e++)
              this.svgElements.push(new l.Svg(t[e]));
            Object.keys(l.Svg.prototype)
              .filter(function (t) {
                return (
                  -1 ===
                  [
                    "constructor",
                    "parent",
                    "querySelector",
                    "querySelectorAll",
                    "replace",
                    "append",
                    "classes",
                    "height",
                    "width",
                  ].indexOf(t)
                );
              })
              .forEach(function (i) {
                n[i] = function () {
                  var e = Array.prototype.slice.call(arguments, 0);
                  return (
                    n.svgElements.forEach(function (t) {
                      l.Svg.prototype[i].apply(t, e);
                    }),
                    n
                  );
                };
              });
          },
        }));
    })(window, document, n),
    (function (t, e, s) {
      "use strict";
      function u(t, e, i, n, a, r) {
        var o = s.extend(
          { command: a ? t.toLowerCase() : t.toUpperCase() },
          e,
          r ? { data: r } : {},
        );
        i.splice(n, 0, o);
      }
      function a(a, r) {
        a.forEach(function (i, n) {
          o[i.command.toLowerCase()].forEach(function (t, e) {
            r(i, t, n, e, a);
          });
        });
      }
      var o = {
          m: ["x", "y"],
          l: ["x", "y"],
          c: ["x1", "y1", "x2", "y2", "x", "y"],
          a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"],
        },
        i = { accuracy: 3 };
      (s.Svg.Path = s.Class.extend({
        constructor: function (t, e) {
          (this.pathElements = []),
            (this.pos = 0),
            (this.close = t),
            (this.options = s.extend({}, i, e));
        },
        position: function (t) {
          return void 0 !== t
            ? ((this.pos = Math.max(0, Math.min(this.pathElements.length, t))),
              this)
            : this.pos;
        },
        remove: function (t) {
          return this.pathElements.splice(this.pos, t), this;
        },
        move: function (t, e, i, n) {
          return (
            u("M", { x: +t, y: +e }, this.pathElements, this.pos++, i, n), this
          );
        },
        line: function (t, e, i, n) {
          return (
            u("L", { x: +t, y: +e }, this.pathElements, this.pos++, i, n), this
          );
        },
        curve: function (t, e, i, n, a, r, o, s) {
          return (
            u(
              "C",
              { x1: +t, y1: +e, x2: +i, y2: +n, x: +a, y: +r },
              this.pathElements,
              this.pos++,
              o,
              s,
            ),
            this
          );
        },
        arc: function (t, e, i, n, a, r, o, s, l) {
          return (
            u(
              "A",
              { rx: +t, ry: +e, xAr: +i, lAf: +n, sf: +a, x: +r, y: +o },
              this.pathElements,
              this.pos++,
              s,
              l,
            ),
            this
          );
        },
        scale: function (i, n) {
          return (
            a(this.pathElements, function (t, e) {
              t[e] *= "x" === e[0] ? i : n;
            }),
            this
          );
        },
        translate: function (i, n) {
          return (
            a(this.pathElements, function (t, e) {
              t[e] += "x" === e[0] ? i : n;
            }),
            this
          );
        },
        transform: function (o) {
          return (
            a(this.pathElements, function (t, e, i, n, a) {
              var r = o(t, e, i, n, a);
              (r || 0 === r) && (t[e] = r);
            }),
            this
          );
        },
        parse: function (t) {
          var e = t
            .replace(/([A-Za-z])([0-9])/g, "$1 $2")
            .replace(/([0-9])([A-Za-z])/g, "$1 $2")
            .split(/[\s,]+/)
            .reduce(function (t, e) {
              return (
                e.match(/[A-Za-z]/) && t.push([]), t[t.length - 1].push(e), t
              );
            }, []);
          "Z" === e[e.length - 1][0].toUpperCase() && e.pop();
          var i = e.map(function (n) {
              var t = n.shift(),
                e = o[t.toLowerCase()];
              return s.extend(
                { command: t },
                e.reduce(function (t, e, i) {
                  return (t[e] = +n[i]), t;
                }, {}),
              );
            }),
            n = [this.pos, 0];
          return (
            Array.prototype.push.apply(n, i),
            Array.prototype.splice.apply(this.pathElements, n),
            (this.pos += i.length),
            this
          );
        },
        stringify: function () {
          var n = Math.pow(10, this.options.accuracy);
          return (
            this.pathElements.reduce(
              function (t, e) {
                var i = o[e.command.toLowerCase()].map(
                  function (t) {
                    return this.options.accuracy
                      ? Math.round(e[t] * n) / n
                      : e[t];
                  }.bind(this),
                );
                return t + e.command + i.join(",");
              }.bind(this),
              "",
            ) + (this.close ? "Z" : "")
          );
        },
        clone: function (t) {
          var e = new s.Svg.Path(t || this.close);
          return (
            (e.pos = this.pos),
            (e.pathElements = this.pathElements.slice().map(function (t) {
              return s.extend({}, t);
            })),
            (e.options = s.extend({}, this.options)),
            e
          );
        },
        splitByCommand: function (e) {
          var i = [new s.Svg.Path()];
          return (
            this.pathElements.forEach(function (t) {
              t.command === e.toUpperCase() &&
                0 !== i[i.length - 1].pathElements.length &&
                i.push(new s.Svg.Path()),
                i[i.length - 1].pathElements.push(t);
            }),
            i
          );
        },
      })),
        (s.Svg.Path.elementDescriptions = o),
        (s.Svg.Path.join = function (t, e, i) {
          for (var n = new s.Svg.Path(e, i), a = 0; a < t.length; a++)
            for (var r = t[a], o = 0; o < r.pathElements.length; o++)
              n.pathElements.push(r.pathElements[o]);
          return n;
        });
    })(window, document, n),
    (function (t, e, h) {
      "use strict";
      var a = {
        x: {
          pos: "x",
          len: "width",
          dir: "horizontal",
          rectStart: "x1",
          rectEnd: "x2",
          rectOffset: "y2",
        },
        y: {
          pos: "y",
          len: "height",
          dir: "vertical",
          rectStart: "y2",
          rectEnd: "y1",
          rectOffset: "x1",
        },
      };
      (h.Axis = h.Class.extend({
        constructor: function (t, e, i, n) {
          (this.units = t),
            (this.counterUnits = t === a.x ? a.y : a.x),
            (this.chartRect = e),
            (this.axisLength = e[t.rectEnd] - e[t.rectStart]),
            (this.gridOffset = e[t.rectOffset]),
            (this.ticks = i),
            (this.options = n);
        },
        createGridAndLabels: function (a, r, o, s, l) {
          var u = s["axis" + this.units.pos.toUpperCase()],
            d = this.ticks.map(this.projectValue.bind(this)),
            c = this.ticks.map(u.labelInterpolationFnc);
          d.forEach(
            function (t, e) {
              var i,
                n = { x: 0, y: 0 };
              (i = d[e + 1] ? d[e + 1] - t : Math.max(this.axisLength - t, 30)),
                (h.isFalseyButZero(c[e]) && "" !== c[e]) ||
                  ("x" === this.units.pos
                    ? ((t = this.chartRect.x1 + t),
                      (n.x = s.axisX.labelOffset.x),
                      "start" === s.axisX.position
                        ? (n.y =
                            this.chartRect.padding.top +
                            s.axisX.labelOffset.y +
                            (o ? 5 : 20))
                        : (n.y =
                            this.chartRect.y1 +
                            s.axisX.labelOffset.y +
                            (o ? 5 : 20)))
                    : ((t = this.chartRect.y1 - t),
                      (n.y = s.axisY.labelOffset.y - (o ? i : 0)),
                      "start" === s.axisY.position
                        ? (n.x = o
                            ? this.chartRect.padding.left +
                              s.axisY.labelOffset.x
                            : this.chartRect.x1 - 10)
                        : (n.x =
                            this.chartRect.x2 + s.axisY.labelOffset.x + 10)),
                  u.showGrid &&
                    h.createGrid(
                      t,
                      e,
                      this,
                      this.gridOffset,
                      this.chartRect[this.counterUnits.len](),
                      a,
                      [s.classNames.grid, s.classNames[this.units.dir]],
                      l,
                    ),
                  u.showLabel &&
                    h.createLabel(
                      t,
                      i,
                      e,
                      c,
                      this,
                      u.offset,
                      n,
                      r,
                      [
                        s.classNames.label,
                        s.classNames[this.units.dir],
                        "start" === u.position
                          ? s.classNames[u.position]
                          : s.classNames.end,
                      ],
                      o,
                      l,
                    ));
            }.bind(this),
          );
        },
        projectValue: function (t, e, i) {
          throw new Error("Base axis can't be instantiated!");
        },
      })),
        (h.Axis.units = a);
    })(window, document, n),
    (function (t, e, r) {
      "use strict";
      r.AutoScaleAxis = r.Axis.extend({
        constructor: function (t, e, i, n) {
          var a = n.highLow || r.getHighLow(e, n, t.pos);
          (this.bounds = r.getBounds(
            i[t.rectEnd] - i[t.rectStart],
            a,
            n.scaleMinSpace || 20,
            n.onlyInteger,
          )),
            (this.range = { min: this.bounds.min, max: this.bounds.max }),
            r.AutoScaleAxis.super.constructor.call(
              this,
              t,
              i,
              this.bounds.values,
              n,
            );
        },
        projectValue: function (t) {
          return (
            (this.axisLength *
              (+r.getMultiValue(t, this.units.pos) - this.bounds.min)) /
            this.bounds.range
          );
        },
      });
    })(window, document, n),
    (function (t, e, r) {
      "use strict";
      r.FixedScaleAxis = r.Axis.extend({
        constructor: function (t, e, i, n) {
          var a = n.highLow || r.getHighLow(e, n, t.pos);
          (this.divisor = n.divisor || 1),
            (this.ticks =
              n.ticks ||
              r.times(this.divisor).map(
                function (t, e) {
                  return a.low + ((a.high - a.low) / this.divisor) * e;
                }.bind(this),
              )),
            this.ticks.sort(function (t, e) {
              return t - e;
            }),
            (this.range = { min: a.low, max: a.high }),
            r.FixedScaleAxis.super.constructor.call(this, t, i, this.ticks, n),
            (this.stepLength = this.axisLength / this.divisor);
        },
        projectValue: function (t) {
          return (
            (this.axisLength *
              (+r.getMultiValue(t, this.units.pos) - this.range.min)) /
            (this.range.max - this.range.min)
          );
        },
      });
    })(window, document, n),
    (function (t, e, r) {
      "use strict";
      r.StepAxis = r.Axis.extend({
        constructor: function (t, e, i, n) {
          r.StepAxis.super.constructor.call(this, t, i, n.ticks, n);
          var a = Math.max(1, n.ticks.length - (n.stretch ? 1 : 0));
          this.stepLength = this.axisLength / a;
        },
        projectValue: function (t, e) {
          return this.stepLength * e;
        },
      });
    })(window, document, n),
    (function (t, e, m) {
      "use strict";
      var a = {
        axisX: {
          offset: 30,
          position: "end",
          labelOffset: { x: 0, y: 0 },
          showLabel: !0,
          showGrid: !0,
          labelInterpolationFnc: m.noop,
          type: void 0,
        },
        axisY: {
          offset: 40,
          position: "start",
          labelOffset: { x: 0, y: 0 },
          showLabel: !0,
          showGrid: !0,
          labelInterpolationFnc: m.noop,
          type: void 0,
          scaleMinSpace: 20,
          onlyInteger: !1,
        },
        width: void 0,
        height: void 0,
        showLine: !0,
        showPoint: !0,
        showArea: !1,
        areaBase: 0,
        lineSmooth: !0,
        showGridBackground: !1,
        low: void 0,
        high: void 0,
        chartPadding: { top: 15, right: 15, bottom: 5, left: 10 },
        fullWidth: !1,
        reverseData: !1,
        classNames: {
          chart: "ct-chart-line",
          label: "ct-label",
          labelGroup: "ct-labels",
          series: "ct-series",
          line: "ct-line",
          point: "ct-point",
          area: "ct-area",
          grid: "ct-grid",
          gridGroup: "ct-grids",
          gridBackground: "ct-grid-background",
          vertical: "ct-vertical",
          horizontal: "ct-horizontal",
          start: "ct-start",
          end: "ct-end",
        },
      };
      m.Line = m.Base.extend({
        constructor: function (t, e, i, n) {
          m.Line.super.constructor.call(this, t, e, a, m.extend({}, a, i), n);
        },
        createChart: function (d) {
          var c = m.normalizeData(this.data, d.reverseData, !0);
          this.svg = m.createSvg(
            this.container,
            d.width,
            d.height,
            d.classNames.chart,
          );
          var h,
            f,
            t = this.svg.elem("g").addClass(d.classNames.gridGroup),
            g = this.svg.elem("g"),
            e = this.svg.elem("g").addClass(d.classNames.labelGroup),
            p = m.createChartRect(this.svg, d, a.padding);
          (h =
            void 0 === d.axisX.type
              ? new m.StepAxis(
                  m.Axis.units.x,
                  c.normalized.series,
                  p,
                  m.extend({}, d.axisX, {
                    ticks: c.normalized.labels,
                    stretch: d.fullWidth,
                  }),
                )
              : d.axisX.type.call(
                  m,
                  m.Axis.units.x,
                  c.normalized.series,
                  p,
                  d.axisX,
                )),
            (f =
              void 0 === d.axisY.type
                ? new m.AutoScaleAxis(
                    m.Axis.units.y,
                    c.normalized.series,
                    p,
                    m.extend({}, d.axisY, {
                      high: m.isNumeric(d.high) ? d.high : d.axisY.high,
                      low: m.isNumeric(d.low) ? d.low : d.axisY.low,
                    }),
                  )
                : d.axisY.type.call(
                    m,
                    m.Axis.units.y,
                    c.normalized.series,
                    p,
                    d.axisY,
                  )),
            h.createGridAndLabels(
              t,
              e,
              this.supportsForeignObject,
              d,
              this.eventEmitter,
            ),
            f.createGridAndLabels(
              t,
              e,
              this.supportsForeignObject,
              d,
              this.eventEmitter,
            ),
            d.showGridBackground &&
              m.createGridBackground(
                t,
                p,
                d.classNames.gridBackground,
                this.eventEmitter,
              ),
            c.raw.series.forEach(
              function (n, a) {
                var i = g.elem("g");
                i.attr({
                  "ct:series-name": n.name,
                  "ct:meta": m.serialize(n.meta),
                }),
                  i.addClass(
                    [
                      d.classNames.series,
                      n.className ||
                        d.classNames.series + "-" + m.alphaNumerate(a),
                    ].join(" "),
                  );
                var r = [],
                  o = [];
                c.normalized.series[a].forEach(
                  function (t, e) {
                    var i = {
                      x: p.x1 + h.projectValue(t, e, c.normalized.series[a]),
                      y: p.y1 - f.projectValue(t, e, c.normalized.series[a]),
                    };
                    r.push(i.x, i.y),
                      o.push({
                        value: t,
                        valueIndex: e,
                        meta: m.getMetaData(n, e),
                      });
                  }.bind(this),
                );
                var t = {
                    lineSmooth: m.getSeriesOption(n, d, "lineSmooth"),
                    showPoint: m.getSeriesOption(n, d, "showPoint"),
                    showLine: m.getSeriesOption(n, d, "showLine"),
                    showArea: m.getSeriesOption(n, d, "showArea"),
                    areaBase: m.getSeriesOption(n, d, "areaBase"),
                  },
                  e = (
                    "function" == typeof t.lineSmooth
                      ? t.lineSmooth
                      : t.lineSmooth
                        ? m.Interpolation.monotoneCubic()
                        : m.Interpolation.none()
                  )(r, o);
                if (
                  (t.showPoint &&
                    e.pathElements.forEach(
                      function (t) {
                        var e = i
                          .elem(
                            "line",
                            { x1: t.x, y1: t.y, x2: t.x + 0.01, y2: t.y },
                            d.classNames.point,
                          )
                          .attr({
                            "ct:value": [t.data.value.x, t.data.value.y]
                              .filter(m.isNumeric)
                              .join(","),
                            "ct:meta": m.serialize(t.data.meta),
                          });
                        this.eventEmitter.emit("draw", {
                          type: "point",
                          value: t.data.value,
                          index: t.data.valueIndex,
                          meta: t.data.meta,
                          series: n,
                          seriesIndex: a,
                          axisX: h,
                          axisY: f,
                          group: i,
                          element: e,
                          x: t.x,
                          y: t.y,
                        });
                      }.bind(this),
                    ),
                  t.showLine)
                ) {
                  var s = i.elem(
                    "path",
                    { d: e.stringify() },
                    d.classNames.line,
                    !0,
                  );
                  this.eventEmitter.emit("draw", {
                    type: "line",
                    values: c.normalized.series[a],
                    path: e.clone(),
                    chartRect: p,
                    index: a,
                    series: n,
                    seriesIndex: a,
                    seriesMeta: n.meta,
                    axisX: h,
                    axisY: f,
                    group: i,
                    element: s,
                  });
                }
                if (t.showArea && f.range) {
                  var l = Math.max(
                      Math.min(t.areaBase, f.range.max),
                      f.range.min,
                    ),
                    u = p.y1 - f.projectValue(l);
                  e.splitByCommand("M")
                    .filter(function (t) {
                      return 1 < t.pathElements.length;
                    })
                    .map(function (t) {
                      var e = t.pathElements[0],
                        i = t.pathElements[t.pathElements.length - 1];
                      return t
                        .clone(!0)
                        .position(0)
                        .remove(1)
                        .move(e.x, u)
                        .line(e.x, e.y)
                        .position(t.pathElements.length + 1)
                        .line(i.x, u);
                    })
                    .forEach(
                      function (t) {
                        var e = i.elem(
                          "path",
                          { d: t.stringify() },
                          d.classNames.area,
                          !0,
                        );
                        this.eventEmitter.emit("draw", {
                          type: "area",
                          values: c.normalized.series[a],
                          path: t.clone(),
                          series: n,
                          seriesIndex: a,
                          axisX: h,
                          axisY: f,
                          chartRect: p,
                          index: a,
                          group: i,
                          element: e,
                        });
                      }.bind(this),
                    );
                }
              }.bind(this),
            ),
            this.eventEmitter.emit("created", {
              bounds: f.bounds,
              chartRect: p,
              axisX: h,
              axisY: f,
              svg: this.svg,
              options: d,
            });
        },
      });
    })(window, document, n),
    (function (t, e, k) {
      "use strict";
      var o = {
        axisX: {
          offset: 30,
          position: "end",
          labelOffset: { x: 0, y: 0 },
          showLabel: !0,
          showGrid: !0,
          labelInterpolationFnc: k.noop,
          scaleMinSpace: 30,
          onlyInteger: !1,
        },
        axisY: {
          offset: 40,
          position: "start",
          labelOffset: { x: 0, y: 0 },
          showLabel: !0,
          showGrid: !0,
          labelInterpolationFnc: k.noop,
          scaleMinSpace: 20,
          onlyInteger: !1,
        },
        width: void 0,
        height: void 0,
        high: void 0,
        low: void 0,
        referenceValue: 0,
        chartPadding: { top: 15, right: 15, bottom: 5, left: 10 },
        seriesBarDistance: 15,
        stackBars: !1,
        stackMode: "accumulate",
        horizontalBars: !1,
        distributeSeries: !1,
        reverseData: !1,
        showGridBackground: !1,
        classNames: {
          chart: "ct-chart-bar",
          horizontalBars: "ct-horizontal-bars",
          label: "ct-label",
          labelGroup: "ct-labels",
          series: "ct-series",
          bar: "ct-bar",
          grid: "ct-grid",
          gridGroup: "ct-grids",
          gridBackground: "ct-grid-background",
          vertical: "ct-vertical",
          horizontal: "ct-horizontal",
          start: "ct-start",
          end: "ct-end",
        },
      };
      k.Bar = k.Base.extend({
        constructor: function (t, e, i, n) {
          k.Bar.super.constructor.call(this, t, e, o, k.extend({}, o, i), n);
        },
        createChart: function (f) {
          var g, t;
          f.distributeSeries
            ? ((g = k.normalizeData(
                this.data,
                f.reverseData,
                f.horizontalBars ? "x" : "y",
              )).normalized.series = g.normalized.series.map(function (t) {
                return [t];
              }))
            : (g = k.normalizeData(
                this.data,
                f.reverseData,
                f.horizontalBars ? "x" : "y",
              )),
            (this.svg = k.createSvg(
              this.container,
              f.width,
              f.height,
              f.classNames.chart +
                (f.horizontalBars ? " " + f.classNames.horizontalBars : ""),
            ));
          var e = this.svg.elem("g").addClass(f.classNames.gridGroup),
            i = this.svg.elem("g"),
            n = this.svg.elem("g").addClass(f.classNames.labelGroup);
          if (f.stackBars && 0 !== g.normalized.series.length) {
            var a = k.serialMap(g.normalized.series, function () {
              return Array.prototype.slice
                .call(arguments)
                .map(function (t) {
                  return t;
                })
                .reduce(
                  function (t, e) {
                    return {
                      x: t.x + (e && e.x) || 0,
                      y: t.y + (e && e.y) || 0,
                    };
                  },
                  { x: 0, y: 0 },
                );
            });
            t = k.getHighLow([a], f, f.horizontalBars ? "x" : "y");
          } else
            t = k.getHighLow(
              g.normalized.series,
              f,
              f.horizontalBars ? "x" : "y",
            );
          (t.high = +f.high || (0 === f.high ? 0 : t.high)),
            (t.low = +f.low || (0 === f.low ? 0 : t.low));
          var p,
            r,
            m,
            v,
            y,
            b = k.createChartRect(this.svg, f, o.padding);
          (r =
            f.distributeSeries && f.stackBars
              ? g.normalized.labels.slice(0, 1)
              : g.normalized.labels),
            f.horizontalBars
              ? ((p = v =
                  void 0 === f.axisX.type
                    ? new k.AutoScaleAxis(
                        k.Axis.units.x,
                        g.normalized.series,
                        b,
                        k.extend({}, f.axisX, {
                          highLow: t,
                          referenceValue: 0,
                        }),
                      )
                    : f.axisX.type.call(
                        k,
                        k.Axis.units.x,
                        g.normalized.series,
                        b,
                        k.extend({}, f.axisX, {
                          highLow: t,
                          referenceValue: 0,
                        }),
                      )),
                (m = y =
                  void 0 === f.axisY.type
                    ? new k.StepAxis(k.Axis.units.y, g.normalized.series, b, {
                        ticks: r,
                      })
                    : f.axisY.type.call(
                        k,
                        k.Axis.units.y,
                        g.normalized.series,
                        b,
                        f.axisY,
                      )))
              : ((m = v =
                  void 0 === f.axisX.type
                    ? new k.StepAxis(k.Axis.units.x, g.normalized.series, b, {
                        ticks: r,
                      })
                    : f.axisX.type.call(
                        k,
                        k.Axis.units.x,
                        g.normalized.series,
                        b,
                        f.axisX,
                      )),
                (p = y =
                  void 0 === f.axisY.type
                    ? new k.AutoScaleAxis(
                        k.Axis.units.y,
                        g.normalized.series,
                        b,
                        k.extend({}, f.axisY, {
                          highLow: t,
                          referenceValue: 0,
                        }),
                      )
                    : f.axisY.type.call(
                        k,
                        k.Axis.units.y,
                        g.normalized.series,
                        b,
                        k.extend({}, f.axisY, {
                          highLow: t,
                          referenceValue: 0,
                        }),
                      )));
          var x = f.horizontalBars
              ? b.x1 + p.projectValue(0)
              : b.y1 - p.projectValue(0),
            w = [];
          m.createGridAndLabels(
            e,
            n,
            this.supportsForeignObject,
            f,
            this.eventEmitter,
          ),
            p.createGridAndLabels(
              e,
              n,
              this.supportsForeignObject,
              f,
              this.eventEmitter,
            ),
            f.showGridBackground &&
              k.createGridBackground(
                e,
                b,
                f.classNames.gridBackground,
                this.eventEmitter,
              ),
            g.raw.series.forEach(
              function (l, u) {
                var d,
                  c,
                  h = u - (g.raw.series.length - 1) / 2;
                (d =
                  f.distributeSeries && !f.stackBars
                    ? m.axisLength / g.normalized.series.length / 2
                    : f.distributeSeries && f.stackBars
                      ? m.axisLength / 2
                      : m.axisLength / g.normalized.series[u].length / 2),
                  (c = i.elem("g")).attr({
                    "ct:series-name": l.name,
                    "ct:meta": k.serialize(l.meta),
                  }),
                  c.addClass(
                    [
                      f.classNames.series,
                      l.className ||
                        f.classNames.series + "-" + k.alphaNumerate(u),
                    ].join(" "),
                  ),
                  g.normalized.series[u].forEach(
                    function (t, e) {
                      var i, n, a, r;
                      if (
                        ((r =
                          f.distributeSeries && !f.stackBars
                            ? u
                            : f.distributeSeries && f.stackBars
                              ? 0
                              : e),
                        (i = f.horizontalBars
                          ? {
                              x:
                                b.x1 +
                                p.projectValue(
                                  t && t.x ? t.x : 0,
                                  e,
                                  g.normalized.series[u],
                                ),
                              y:
                                b.y1 -
                                m.projectValue(
                                  t && t.y ? t.y : 0,
                                  r,
                                  g.normalized.series[u],
                                ),
                            }
                          : {
                              x:
                                b.x1 +
                                m.projectValue(
                                  t && t.x ? t.x : 0,
                                  r,
                                  g.normalized.series[u],
                                ),
                              y:
                                b.y1 -
                                p.projectValue(
                                  t && t.y ? t.y : 0,
                                  e,
                                  g.normalized.series[u],
                                ),
                            }),
                        m instanceof k.StepAxis &&
                          (m.options.stretch ||
                            (i[m.units.pos] += d * (f.horizontalBars ? -1 : 1)),
                          (i[m.units.pos] +=
                            f.stackBars || f.distributeSeries
                              ? 0
                              : h *
                                f.seriesBarDistance *
                                (f.horizontalBars ? -1 : 1))),
                        (a = w[e] || x),
                        (w[e] = a - (x - i[m.counterUnits.pos])),
                        void 0 !== t)
                      ) {
                        var o = {};
                        (o[m.units.pos + "1"] = i[m.units.pos]),
                          (o[m.units.pos + "2"] = i[m.units.pos]),
                          !f.stackBars ||
                          ("accumulate" !== f.stackMode && f.stackMode)
                            ? ((o[m.counterUnits.pos + "1"] = x),
                              (o[m.counterUnits.pos + "2"] =
                                i[m.counterUnits.pos]))
                            : ((o[m.counterUnits.pos + "1"] = a),
                              (o[m.counterUnits.pos + "2"] = w[e])),
                          (o.x1 = Math.min(Math.max(o.x1, b.x1), b.x2)),
                          (o.x2 = Math.min(Math.max(o.x2, b.x1), b.x2)),
                          (o.y1 = Math.min(Math.max(o.y1, b.y2), b.y1)),
                          (o.y2 = Math.min(Math.max(o.y2, b.y2), b.y1));
                        var s = k.getMetaData(l, e);
                        (n = c
                          .elem("line", o, f.classNames.bar)
                          .attr({
                            "ct:value": [t.x, t.y]
                              .filter(k.isNumeric)
                              .join(","),
                            "ct:meta": k.serialize(s),
                          })),
                          this.eventEmitter.emit(
                            "draw",
                            k.extend(
                              {
                                type: "bar",
                                value: t,
                                index: e,
                                meta: s,
                                series: l,
                                seriesIndex: u,
                                axisX: v,
                                axisY: y,
                                chartRect: b,
                                group: c,
                                element: n,
                              },
                              o,
                            ),
                          );
                      }
                    }.bind(this),
                  );
              }.bind(this),
            ),
            this.eventEmitter.emit("created", {
              bounds: p.bounds,
              chartRect: b,
              axisX: v,
              axisY: y,
              svg: this.svg,
              options: f,
            });
        },
      });
    })(window, document, n),
    (function (t, e, D) {
      "use strict";
      function A(t, e, i) {
        var n = e.x > t.x;
        return (n && "explode" === i) || (!n && "implode" === i)
          ? "start"
          : (n && "implode" === i) || (!n && "explode" === i)
            ? "end"
            : "middle";
      }
      var a = {
        width: void 0,
        height: void 0,
        chartPadding: 5,
        classNames: {
          chartPie: "ct-chart-pie",
          chartDonut: "ct-chart-donut",
          series: "ct-series",
          slicePie: "ct-slice-pie",
          sliceDonut: "ct-slice-donut",
          sliceDonutSolid: "ct-slice-donut-solid",
          label: "ct-label",
        },
        startAngle: 0,
        total: void 0,
        donut: !1,
        donutSolid: !1,
        donutWidth: 60,
        showLabel: !0,
        labelOffset: 0,
        labelPosition: "inside",
        labelInterpolationFnc: D.noop,
        labelDirection: "neutral",
        reverseData: !1,
        ignoreEmptyValues: !1,
      };
      D.Pie = D.Base.extend({
        constructor: function (t, e, i, n) {
          D.Pie.super.constructor.call(this, t, e, a, D.extend({}, a, i), n);
        },
        createChart: function (m) {
          var v,
            t,
            y,
            b,
            x,
            w = D.normalizeData(this.data),
            k = [],
            S = m.startAngle;
          (this.svg = D.createSvg(
            this.container,
            m.width,
            m.height,
            m.donut ? m.classNames.chartDonut : m.classNames.chartPie,
          )),
            (t = D.createChartRect(this.svg, m, a.padding)),
            (y = Math.min(t.width() / 2, t.height() / 2)),
            (x =
              m.total ||
              w.normalized.series.reduce(function (t, e) {
                return t + e;
              }, 0));
          var _ = D.quantity(m.donutWidth);
          "%" === _.unit && (_.value *= y / 100),
            (y -= m.donut && !m.donutSolid ? _.value / 2 : 0),
            (b =
              "outside" === m.labelPosition || (m.donut && !m.donutSolid)
                ? y
                : "center" === m.labelPosition
                  ? 0
                  : m.donutSolid
                    ? y - _.value / 2
                    : y / 2),
            (b += m.labelOffset);
          var M = { x: t.x1 + t.width() / 2, y: t.y2 + t.height() / 2 },
            C =
              1 ===
              w.raw.series.filter(function (t) {
                return t.hasOwnProperty("value") ? 0 !== t.value : 0 !== t;
              }).length;
          w.raw.series.forEach(
            function (t, e) {
              k[e] = this.svg.elem("g", null, null);
            }.bind(this),
          ),
            m.showLabel && (v = this.svg.elem("g", null, null)),
            w.raw.series.forEach(
              function (t, e) {
                if (0 !== w.normalized.series[e] || !m.ignoreEmptyValues) {
                  k[e].attr({ "ct:series-name": t.name }),
                    k[e].addClass(
                      [
                        m.classNames.series,
                        t.className ||
                          m.classNames.series + "-" + D.alphaNumerate(e),
                      ].join(" "),
                    );
                  var i = 0 < x ? S + (w.normalized.series[e] / x) * 360 : 0,
                    n = Math.max(0, S - (0 === e || C ? 0 : 0.2));
                  359.99 <= i - n && (i = n + 359.99);
                  var a,
                    r,
                    o,
                    s = D.polarToCartesian(M.x, M.y, y, n),
                    l = D.polarToCartesian(M.x, M.y, y, i),
                    u = new D.Svg.Path(!m.donut || m.donutSolid)
                      .move(l.x, l.y)
                      .arc(y, y, 0, 180 < i - S, 0, s.x, s.y);
                  m.donut
                    ? m.donutSolid &&
                      ((o = y - _.value),
                      (a = D.polarToCartesian(
                        M.x,
                        M.y,
                        o,
                        S - (0 === e || C ? 0 : 0.2),
                      )),
                      (r = D.polarToCartesian(M.x, M.y, o, i)),
                      u.line(a.x, a.y),
                      u.arc(o, o, 0, 180 < i - S, 1, r.x, r.y))
                    : u.line(M.x, M.y);
                  var d = m.classNames.slicePie;
                  m.donut &&
                    ((d = m.classNames.sliceDonut),
                    m.donutSolid && (d = m.classNames.sliceDonutSolid));
                  var c = k[e].elem("path", { d: u.stringify() }, d);
                  if (
                    (c.attr({
                      "ct:value": w.normalized.series[e],
                      "ct:meta": D.serialize(t.meta),
                    }),
                    m.donut &&
                      !m.donutSolid &&
                      (c._node.style.strokeWidth = _.value + "px"),
                    this.eventEmitter.emit("draw", {
                      type: "slice",
                      value: w.normalized.series[e],
                      totalDataSum: x,
                      index: e,
                      meta: t.meta,
                      series: t,
                      group: k[e],
                      element: c,
                      path: u.clone(),
                      center: M,
                      radius: y,
                      startAngle: S,
                      endAngle: i,
                    }),
                    m.showLabel)
                  ) {
                    var h, f;
                    (h =
                      1 === w.raw.series.length
                        ? { x: M.x, y: M.y }
                        : D.polarToCartesian(M.x, M.y, b, S + (i - S) / 2)),
                      (f =
                        w.normalized.labels &&
                        !D.isFalseyButZero(w.normalized.labels[e])
                          ? w.normalized.labels[e]
                          : w.normalized.series[e]);
                    var g = m.labelInterpolationFnc(f, e);
                    if (g || 0 === g) {
                      var p = v
                        .elem(
                          "text",
                          {
                            dx: h.x,
                            dy: h.y,
                            "text-anchor": A(M, h, m.labelDirection),
                          },
                          m.classNames.label,
                        )
                        .text("" + g);
                      this.eventEmitter.emit("draw", {
                        type: "label",
                        index: e,
                        group: v,
                        element: p,
                        text: "" + g,
                        x: h.x,
                        y: h.y,
                      });
                    }
                  }
                  S = i;
                }
              }.bind(this),
            ),
            this.eventEmitter.emit("created", {
              chartRect: t,
              svg: this.svg,
              options: m,
            });
        },
        determineAnchorPosition: A,
      });
    })(window, document, n),
    n
  );
}),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define(["chartist"], function (t) {
          return (e.returnExportsGlobal = i(t));
        })
      : "object" == typeof exports
        ? (module.exports = i(require("chartist")))
        : (e["Chartist.plugins.tooltips"] = i(Chartist));
  })(this, function (t) {
    return (
      (function (u, v, y) {
        "use strict";
        function i(t) {
          var e = new RegExp("tooltip-show\\s*", "gi");
          t.className = t.className.replace(e, "").trim();
        }
        function b(t, e) {
          return (
            -1 < (" " + t.getAttribute("class") + " ").indexOf(" " + e + " ")
          );
        }
        var t = {
          currency: void 0,
          currencyFormatCallback: void 0,
          tooltipOffset: { x: 0, y: -20 },
          anchorToPoint: !1,
          appendToBody: !1,
          class: void 0,
          pointClass: "ct-point",
        };
        (y.plugins = y.plugins || {}),
          (y.plugins.tooltip = function (m) {
            return (
              (m = y.extend({}, t, m)),
              function (c) {
                function t(t, e, i) {
                  l.addEventListener(t, function (t) {
                    (e && !b(t.target, e)) || i(t);
                  });
                }
                function h(t) {
                  g = g || f.offsetHeight;
                  var e,
                    i,
                    n = -(p = p || f.offsetWidth) / 2 + m.tooltipOffset.x,
                    a = -g + m.tooltipOffset.y;
                  if (m.appendToBody)
                    (f.style.top = t.pageY + a + "px"),
                      (f.style.left = t.pageX + n + "px");
                  else {
                    var r = l.getBoundingClientRect(),
                      o = t.pageX - r.left - u.pageXOffset,
                      s = t.pageY - r.top - u.pageYOffset;
                    !0 === m.anchorToPoint &&
                      t.target.x2 &&
                      t.target.y2 &&
                      ((e = parseInt(t.target.x2.baseVal.value)),
                      (i = parseInt(t.target.y2.baseVal.value))),
                      (f.style.top = (i || s) + a + "px"),
                      (f.style.left = (e || o) + n + "px");
                  }
                }
                var e = m.pointClass;
                c instanceof y.Bar
                  ? (e = "ct-bar")
                  : c instanceof y.Pie &&
                    (e = c.options.donut ? "ct-slice-donut" : "ct-slice-pie");
                var l = c.container,
                  f = l.querySelector(".chartist-tooltip");
                f ||
                  (((f = v.createElement("div")).className = m.class
                    ? "chartist-tooltip " + m.class
                    : "chartist-tooltip"),
                  m.appendToBody ? v.body.appendChild(f) : l.appendChild(f));
                var g = f.offsetHeight,
                  p = f.offsetWidth;
                i(f),
                  t("mouseover", e, function (t) {
                    var e,
                      i,
                      n = t.target,
                      a = "",
                      r = (c instanceof y.Pie ? n : n.parentNode)
                        ? n.parentNode.getAttribute("ct:meta") ||
                          n.parentNode.getAttribute("ct:series-name")
                        : "",
                      o = n.getAttribute("ct:meta") || r || "",
                      s = !!o,
                      l = n.getAttribute("ct:value");
                    if (
                      (m.transformTooltipTextFnc &&
                        "function" == typeof m.transformTooltipTextFnc &&
                        (l = m.transformTooltipTextFnc(l)),
                      m.tooltipFnc && "function" == typeof m.tooltipFnc)
                    )
                      a = m.tooltipFnc(o, l);
                    else {
                      if (m.metaIsHTML) {
                        var u = v.createElement("textarea");
                        (u.innerHTML = o), (o = u.value);
                      }
                      if (
                        ((o =
                          '<span class="chartist-tooltip-meta">' +
                          o +
                          "</span>"),
                        s)
                      )
                        a += o + "<br>";
                      else if (c instanceof y.Pie) {
                        var d = (function (t, e) {
                          for (; (t = t.nextSibling) && !b(t, e); );
                          return t;
                        })(n, "ct-label");
                        d &&
                          (a += ((e = d).innerText || e.textContent) + "<br>");
                      }
                      l &&
                        (m.currency &&
                          (l =
                            null != m.currencyFormatCallback
                              ? m.currencyFormatCallback(l, m)
                              : m.currency +
                                l.replace(
                                  /(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
                                  "$1,",
                                )),
                        (a += l =
                          '<span class="chartist-tooltip-value">' +
                          l +
                          "</span>"));
                    }
                    a &&
                      ((f.innerHTML = a),
                      h(t),
                      b((i = f), "tooltip-show") ||
                        (i.className = i.className + " tooltip-show"),
                      (g = f.offsetHeight),
                      (p = f.offsetWidth));
                  }),
                  t("mouseout", e, function () {
                    i(f);
                  }),
                  t("mousemove", null, function (t) {
                    !1 === m.anchorToPoint && h(t);
                  });
              }
            );
          });
      })(window, document, t),
      t.plugins.tooltips
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return (t.returnExportsGlobal = e());
        })
      : "object" == typeof exports
        ? (module.exports = e())
        : (t["Chartist.plugins.ctAxisTitle"] = e());
  })(this, function () {
    return (
      (function (t, e, o) {
        "use strict";
        var i = {
            axisTitle: "",
            axisClass: "ct-axis-title",
            offset: { x: 0, y: 0 },
            textAnchor: "middle",
            flipText: !1,
          },
          n = { xAxis: i, yAxis: i };
        (o.plugins = o.plugins || {}),
          (o.plugins.ctAxisTitle = function (r) {
            return (
              (r = o.extend({}, n, r)),
              function (t) {
                t.on("created", function (t) {
                  if (!r.axisX.axisTitle && !r.axisY.axisTitle)
                    throw new Error(
                      "ctAxisTitle plugin - You must provide at least one axis title",
                    );
                  if (!t.axisX && !t.axisY)
                    throw new Error(
                      "ctAxisTitle plugin can only be used on charts that have at least one axis",
                    );
                  var e, i, n;
                  if (
                    (r.axisX.axisTitle &&
                      t.axisX &&
                      ((e =
                        t.axisX.axisLength / 2 +
                        t.options.axisX.offset +
                        t.options.chartPadding.left),
                      (i = t.options.chartPadding.top),
                      "end" === t.options.axisX.position &&
                        (i += t.axisY.axisLength),
                      (n = new o.Svg("text")).addClass(r.axisX.axisClass),
                      n.text(r.axisX.axisTitle),
                      n.attr({
                        x: e + r.axisX.offset.x,
                        y: i + r.axisX.offset.y,
                        "text-anchor": r.axisX.textAnchor,
                      }),
                      t.svg.append(n, !0)),
                    r.axisY.axisTitle && t.axisY)
                  ) {
                    (e = 0),
                      (i = t.axisY.axisLength / 2 + t.options.chartPadding.top),
                      "end" === t.options.axisY.position &&
                        (e = t.axisX.axisLength);
                    var a =
                      "rotate(" +
                      (r.axisY.flipTitle ? -90 : 90) +
                      ", " +
                      e +
                      ", " +
                      i +
                      ")";
                    (n = new o.Svg("text")).addClass(r.axisY.axisClass),
                      n.text(r.axisY.axisTitle),
                      n.attr({
                        x: e + r.axisY.offset.x,
                        y: i + r.axisY.offset.y,
                        transform: a,
                        "text-anchor": r.axisY.textAnchor,
                      }),
                      t.svg.append(n, !0);
                  }
                });
              }
            );
          });
      })(window, document, Chartist),
      Chartist.plugins.ctAxisTitle
    );
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define(["chartist"], function (t) {
          return (e.returnExportsGlobal = i(t));
        })
      : "object" == typeof exports
        ? (module.exports = i(require("chartist")))
        : (e["Chartist.plugins.legend"] = i(e.Chartist));
  })(this, function (r) {
    "use strict";
    var e = {
      className: "",
      classNames: !1,
      removeAll: !1,
      legendNames: !1,
      clickable: !0,
      onClick: null,
      position: "top",
    };
    return (
      (r.plugins = r.plugins || {}),
      (r.plugins.legend = function (h) {
        function f(t, e) {
          return t - e;
        }
        if (h && h.position) {
          if (
            !(
              "top" === h.position ||
              "bottom" === h.position ||
              h.position instanceof HTMLElement
            )
          )
            throw Error("The position you entered is not a valid position");
          if (h.position instanceof HTMLElement) {
            var t = h.position;
            delete h.position;
          }
        }
        return (
          (h = r.extend({}, e, h)),
          t && (h.position = t),
          function (o) {
            var t = o.container.querySelector(".ct-legend");
            if ((t && t.parentNode.removeChild(t), h.clickable)) {
              var e = o.data.series.map(function (t, e) {
                return (
                  "object" != typeof t && (t = { value: t }),
                  (t.className =
                    t.className ||
                    o.options.classNames.series + "-" + r.alphaNumerate(e)),
                  t
                );
              });
              o.data.series = e;
            }
            var s = document.createElement("ul"),
              i = o instanceof r.Pie;
            (s.className = "ct-legend"),
              o instanceof r.Pie && s.classList.add("ct-legend-inside"),
              "string" == typeof h.className &&
                0 < h.className.length &&
                s.classList.add(h.className);
            var l = [],
              u = o.data.series.slice(0),
              n = o.data.series,
              d = i && o.data.labels;
            if (d) {
              var c = o.data.labels.slice(0);
              n = o.data.labels;
            }
            n = h.legendNames || n;
            var a =
              Array.isArray(h.classNames) && h.classNames.length === n.length;
            n.forEach(function (t, e) {
              var i = document.createElement("li");
              (i.className = "ct-series-" + e),
                a && (i.className += " " + h.classNames[e]),
                i.setAttribute("data-legend", e),
                (i.textContent = t.name || t),
                s.appendChild(i);
            }),
              o.on("created", function (t) {
                if (h.position instanceof HTMLElement)
                  h.position.insertBefore(s, null);
                else
                  switch (h.position) {
                    case "top":
                      o.container.insertBefore(s, o.container.childNodes[0]);
                      break;
                    case "bottom":
                      o.container.insertBefore(s, null);
                  }
              }),
              h.clickable &&
                s.addEventListener("click", function (t) {
                  var e = t.target;
                  if (e.parentNode === s && e.hasAttribute("data-legend")) {
                    t.preventDefault();
                    var i = parseInt(e.getAttribute("data-legend")),
                      n = l.indexOf(i);
                    if (-1 < n) l.splice(n, 1), e.classList.remove("inactive");
                    else if (h.removeAll)
                      l.push(i), e.classList.add("inactive");
                    else if (1 < o.data.series.length)
                      l.push(i), e.classList.add("inactive");
                    else
                      (l = []),
                        Array.prototype.slice
                          .call(s.childNodes)
                          .forEach(function (t) {
                            t.classList.remove("inactive");
                          });
                    var a = u.slice(0);
                    if (d) var r = c.slice(0);
                    l.sort(f).reverse(),
                      l.forEach(function (t) {
                        a.splice(t, 1), d && r.splice(t, 1);
                      }),
                      h.onClick && h.onClick(o, t),
                      (o.data.series = a),
                      d && (o.data.labels = r),
                      o.update();
                  }
                });
          }
        );
      }),
      r.plugins.legend
    );
  }),
  (function (t) {
    if ("object" == typeof exports && "undefined" != typeof module)
      module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
      ("undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
            ? self
            : this
      ).Chart = t();
    }
  })(function () {
    return (function r(o, s, l) {
      function u(i, t) {
        if (!s[i]) {
          if (!o[i]) {
            var e = "function" == typeof require && require;
            if (!t && e) return e(i, !0);
            if (d) return d(i, !0);
            var n = new Error("Cannot find module '" + i + "'");
            throw ((n.code = "MODULE_NOT_FOUND"), n);
          }
          var a = (s[i] = { exports: {} });
          o[i][0].call(
            a.exports,
            function (t) {
              var e = o[i][1][t];
              return u(e || t);
            },
            a,
            a.exports,
            r,
            o,
            s,
            l,
          );
        }
        return s[i].exports;
      }
      for (
        var d = "function" == typeof require && require, t = 0;
        t < l.length;
        t++
      )
        u(l[t]);
      return u;
    })(
      {
        1: [
          function (t, e, i) {
            var r = t(5);
            function n(t) {
              if (t) {
                var e = [0, 0, 0],
                  i = 1,
                  n = t.match(/^#([a-fA-F0-9]{3})$/);
                if (n) {
                  n = n[1];
                  for (var a = 0; a < e.length; a++)
                    e[a] = parseInt(n[a] + n[a], 16);
                } else if ((n = t.match(/^#([a-fA-F0-9]{6})$/))) {
                  n = n[1];
                  for (a = 0; a < e.length; a++)
                    e[a] = parseInt(n.slice(2 * a, 2 * a + 2), 16);
                } else if (
                  (n = t.match(
                    /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                  ))
                ) {
                  for (a = 0; a < e.length; a++) e[a] = parseInt(n[a + 1]);
                  i = parseFloat(n[4]);
                } else if (
                  (n = t.match(
                    /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                  ))
                ) {
                  for (a = 0; a < e.length; a++)
                    e[a] = Math.round(2.55 * parseFloat(n[a + 1]));
                  i = parseFloat(n[4]);
                } else if ((n = t.match(/(\w+)/))) {
                  if ("transparent" == n[1]) return [0, 0, 0, 0];
                  if (!(e = r[n[1]])) return;
                }
                for (a = 0; a < e.length; a++) e[a] = d(e[a], 0, 255);
                return (i = i || 0 == i ? d(i, 0, 1) : 1), (e[3] = i), e;
              }
            }
            function a(t) {
              if (t) {
                var e = t.match(
                  /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                );
                if (e) {
                  var i = parseFloat(e[4]);
                  return [
                    d(parseInt(e[1]), 0, 360),
                    d(parseFloat(e[2]), 0, 100),
                    d(parseFloat(e[3]), 0, 100),
                    d(isNaN(i) ? 1 : i, 0, 1),
                  ];
                }
              }
            }
            function o(t) {
              if (t) {
                var e = t.match(
                  /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                );
                if (e) {
                  var i = parseFloat(e[4]);
                  return [
                    d(parseInt(e[1]), 0, 360),
                    d(parseFloat(e[2]), 0, 100),
                    d(parseFloat(e[3]), 0, 100),
                    d(isNaN(i) ? 1 : i, 0, 1),
                  ];
                }
              }
            }
            function s(t, e) {
              return (
                void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
                "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
              );
            }
            function l(t, e) {
              return (
                "rgba(" +
                Math.round((t[0] / 255) * 100) +
                "%, " +
                Math.round((t[1] / 255) * 100) +
                "%, " +
                Math.round((t[2] / 255) * 100) +
                "%, " +
                (e || t[3] || 1) +
                ")"
              );
            }
            function u(t, e) {
              return (
                void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
                "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
              );
            }
            function d(t, e, i) {
              return Math.min(Math.max(e, t), i);
            }
            function c(t) {
              var e = t.toString(16).toUpperCase();
              return e.length < 2 ? "0" + e : e;
            }
            e.exports = {
              getRgba: n,
              getHsla: a,
              getRgb: function (t) {
                var e = n(t);
                return e && e.slice(0, 3);
              },
              getHsl: function (t) {
                var e = a(t);
                return e && e.slice(0, 3);
              },
              getHwb: o,
              getAlpha: function (t) {
                var e = n(t);
                {
                  if (e) return e[3];
                  if ((e = a(t))) return e[3];
                  if ((e = o(t))) return e[3];
                }
              },
              hexString: function (t) {
                return "#" + c(t[0]) + c(t[1]) + c(t[2]);
              },
              rgbString: function (t, e) {
                if (e < 1 || (t[3] && t[3] < 1)) return s(t, e);
                return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
              },
              rgbaString: s,
              percentString: function (t, e) {
                if (e < 1 || (t[3] && t[3] < 1)) return l(t, e);
                var i = Math.round((t[0] / 255) * 100),
                  n = Math.round((t[1] / 255) * 100),
                  a = Math.round((t[2] / 255) * 100);
                return "rgb(" + i + "%, " + n + "%, " + a + "%)";
              },
              percentaString: l,
              hslString: function (t, e) {
                if (e < 1 || (t[3] && t[3] < 1)) return u(t, e);
                return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)";
              },
              hslaString: u,
              hwbString: function (t, e) {
                void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);
                return (
                  "hwb(" +
                  t[0] +
                  ", " +
                  t[1] +
                  "%, " +
                  t[2] +
                  "%" +
                  (void 0 !== e && 1 !== e ? ", " + e : "") +
                  ")"
                );
              },
              keyword: function (t) {
                return h[t.slice(0, 3)];
              },
            };
            var h = {};
            for (var f in r) h[r[f]] = f;
          },
          { 5: 5 },
        ],
        2: [
          function (t, e, i) {
            var d = t(4),
              n = t(1),
              o = function (t) {
                if (t instanceof o) return t;
                if (!(this instanceof o)) return new o(t);
                var e;
                if (
                  ((this.values = {
                    rgb: [0, 0, 0],
                    hsl: [0, 0, 0],
                    hsv: [0, 0, 0],
                    hwb: [0, 0, 0],
                    cmyk: [0, 0, 0, 0],
                    alpha: 1,
                  }),
                  "string" == typeof t)
                )
                  if ((e = n.getRgba(t))) this.setValues("rgb", e);
                  else if ((e = n.getHsla(t))) this.setValues("hsl", e);
                  else {
                    if (!(e = n.getHwb(t)))
                      throw new Error(
                        'Unable to parse color from string "' + t + '"',
                      );
                    this.setValues("hwb", e);
                  }
                else if ("object" == typeof t)
                  if (void 0 !== (e = t).r || void 0 !== e.red)
                    this.setValues("rgb", e);
                  else if (void 0 !== e.l || void 0 !== e.lightness)
                    this.setValues("hsl", e);
                  else if (void 0 !== e.v || void 0 !== e.value)
                    this.setValues("hsv", e);
                  else if (void 0 !== e.w || void 0 !== e.whiteness)
                    this.setValues("hwb", e);
                  else {
                    if (void 0 === e.c && void 0 === e.cyan)
                      throw new Error(
                        "Unable to parse color from object " +
                          JSON.stringify(t),
                      );
                    this.setValues("cmyk", e);
                  }
              };
            (o.prototype = {
              rgb: function () {
                return this.setSpace("rgb", arguments);
              },
              hsl: function () {
                return this.setSpace("hsl", arguments);
              },
              hsv: function () {
                return this.setSpace("hsv", arguments);
              },
              hwb: function () {
                return this.setSpace("hwb", arguments);
              },
              cmyk: function () {
                return this.setSpace("cmyk", arguments);
              },
              rgbArray: function () {
                return this.values.rgb;
              },
              hslArray: function () {
                return this.values.hsl;
              },
              hsvArray: function () {
                return this.values.hsv;
              },
              hwbArray: function () {
                var t = this.values;
                return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb;
              },
              cmykArray: function () {
                return this.values.cmyk;
              },
              rgbaArray: function () {
                var t = this.values;
                return t.rgb.concat([t.alpha]);
              },
              hslaArray: function () {
                var t = this.values;
                return t.hsl.concat([t.alpha]);
              },
              alpha: function (t) {
                return void 0 === t
                  ? this.values.alpha
                  : (this.setValues("alpha", t), this);
              },
              red: function (t) {
                return this.setChannel("rgb", 0, t);
              },
              green: function (t) {
                return this.setChannel("rgb", 1, t);
              },
              blue: function (t) {
                return this.setChannel("rgb", 2, t);
              },
              hue: function (t) {
                return (
                  t && (t = (t %= 360) < 0 ? 360 + t : t),
                  this.setChannel("hsl", 0, t)
                );
              },
              saturation: function (t) {
                return this.setChannel("hsl", 1, t);
              },
              lightness: function (t) {
                return this.setChannel("hsl", 2, t);
              },
              saturationv: function (t) {
                return this.setChannel("hsv", 1, t);
              },
              whiteness: function (t) {
                return this.setChannel("hwb", 1, t);
              },
              blackness: function (t) {
                return this.setChannel("hwb", 2, t);
              },
              value: function (t) {
                return this.setChannel("hsv", 2, t);
              },
              cyan: function (t) {
                return this.setChannel("cmyk", 0, t);
              },
              magenta: function (t) {
                return this.setChannel("cmyk", 1, t);
              },
              yellow: function (t) {
                return this.setChannel("cmyk", 2, t);
              },
              black: function (t) {
                return this.setChannel("cmyk", 3, t);
              },
              hexString: function () {
                return n.hexString(this.values.rgb);
              },
              rgbString: function () {
                return n.rgbString(this.values.rgb, this.values.alpha);
              },
              rgbaString: function () {
                return n.rgbaString(this.values.rgb, this.values.alpha);
              },
              percentString: function () {
                return n.percentString(this.values.rgb, this.values.alpha);
              },
              hslString: function () {
                return n.hslString(this.values.hsl, this.values.alpha);
              },
              hslaString: function () {
                return n.hslaString(this.values.hsl, this.values.alpha);
              },
              hwbString: function () {
                return n.hwbString(this.values.hwb, this.values.alpha);
              },
              keyword: function () {
                return n.keyword(this.values.rgb, this.values.alpha);
              },
              rgbNumber: function () {
                var t = this.values.rgb;
                return (t[0] << 16) | (t[1] << 8) | t[2];
              },
              luminosity: function () {
                for (
                  var t = this.values.rgb, e = [], i = 0;
                  i < t.length;
                  i++
                ) {
                  var n = t[i] / 255;
                  e[i] =
                    n <= 0.03928
                      ? n / 12.92
                      : Math.pow((n + 0.055) / 1.055, 2.4);
                }
                return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
              },
              contrast: function (t) {
                var e = this.luminosity(),
                  i = t.luminosity();
                return i < e
                  ? (e + 0.05) / (i + 0.05)
                  : (i + 0.05) / (e + 0.05);
              },
              level: function (t) {
                var e = this.contrast(t);
                return 7.1 <= e ? "AAA" : 4.5 <= e ? "AA" : "";
              },
              dark: function () {
                var t = this.values.rgb;
                return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128;
              },
              light: function () {
                return !this.dark();
              },
              negate: function () {
                for (var t = [], e = 0; e < 3; e++)
                  t[e] = 255 - this.values.rgb[e];
                return this.setValues("rgb", t), this;
              },
              lighten: function (t) {
                var e = this.values.hsl;
                return (e[2] += e[2] * t), this.setValues("hsl", e), this;
              },
              darken: function (t) {
                var e = this.values.hsl;
                return (e[2] -= e[2] * t), this.setValues("hsl", e), this;
              },
              saturate: function (t) {
                var e = this.values.hsl;
                return (e[1] += e[1] * t), this.setValues("hsl", e), this;
              },
              desaturate: function (t) {
                var e = this.values.hsl;
                return (e[1] -= e[1] * t), this.setValues("hsl", e), this;
              },
              whiten: function (t) {
                var e = this.values.hwb;
                return (e[1] += e[1] * t), this.setValues("hwb", e), this;
              },
              blacken: function (t) {
                var e = this.values.hwb;
                return (e[2] += e[2] * t), this.setValues("hwb", e), this;
              },
              greyscale: function () {
                var t = this.values.rgb,
                  e = 0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2];
                return this.setValues("rgb", [e, e, e]), this;
              },
              clearer: function (t) {
                var e = this.values.alpha;
                return this.setValues("alpha", e - e * t), this;
              },
              opaquer: function (t) {
                var e = this.values.alpha;
                return this.setValues("alpha", e + e * t), this;
              },
              rotate: function (t) {
                var e = this.values.hsl,
                  i = (e[0] + t) % 360;
                return (
                  (e[0] = i < 0 ? 360 + i : i), this.setValues("hsl", e), this
                );
              },
              mix: function (t, e) {
                var i = this,
                  n = t,
                  a = void 0 === e ? 0.5 : e,
                  r = 2 * a - 1,
                  o = i.alpha() - n.alpha(),
                  s = ((r * o == -1 ? r : (r + o) / (1 + r * o)) + 1) / 2,
                  l = 1 - s;
                return this.rgb(
                  s * i.red() + l * n.red(),
                  s * i.green() + l * n.green(),
                  s * i.blue() + l * n.blue(),
                ).alpha(i.alpha() * a + n.alpha() * (1 - a));
              },
              toJSON: function () {
                return this.rgb();
              },
              clone: function () {
                var t,
                  e,
                  i = new o(),
                  n = this.values,
                  a = i.values;
                for (var r in n)
                  n.hasOwnProperty(r) &&
                    ((t = n[r]),
                    "[object Array]" === (e = {}.toString.call(t))
                      ? (a[r] = t.slice(0))
                      : "[object Number]" === e
                        ? (a[r] = t)
                        : console.error("unexpected color value:", t));
                return i;
              },
            }),
              (o.prototype.spaces = {
                rgb: ["red", "green", "blue"],
                hsl: ["hue", "saturation", "lightness"],
                hsv: ["hue", "saturation", "value"],
                hwb: ["hue", "whiteness", "blackness"],
                cmyk: ["cyan", "magenta", "yellow", "black"],
              }),
              (o.prototype.maxes = {
                rgb: [255, 255, 255],
                hsl: [360, 100, 100],
                hsv: [360, 100, 100],
                hwb: [360, 100, 100],
                cmyk: [100, 100, 100, 100],
              }),
              (o.prototype.getValues = function (t) {
                for (var e = this.values, i = {}, n = 0; n < t.length; n++)
                  i[t.charAt(n)] = e[t][n];
                return 1 !== e.alpha && (i.a = e.alpha), i;
              }),
              (o.prototype.setValues = function (t, e) {
                var i,
                  n,
                  a = this.values,
                  r = this.spaces,
                  o = this.maxes,
                  s = 1;
                if ("alpha" === t) s = e;
                else if (e.length)
                  (a[t] = e.slice(0, t.length)), (s = e[t.length]);
                else if (void 0 !== e[t.charAt(0)]) {
                  for (i = 0; i < t.length; i++) a[t][i] = e[t.charAt(i)];
                  s = e.a;
                } else if (void 0 !== e[r[t][0]]) {
                  var l = r[t];
                  for (i = 0; i < t.length; i++) a[t][i] = e[l[i]];
                  s = e.alpha;
                }
                if (
                  ((a.alpha = Math.max(
                    0,
                    Math.min(1, void 0 === s ? a.alpha : s),
                  )),
                  "alpha" === t)
                )
                  return !1;
                for (i = 0; i < t.length; i++)
                  (n = Math.max(0, Math.min(o[t][i], a[t][i]))),
                    (a[t][i] = Math.round(n));
                for (var u in r) u !== t && (a[u] = d[t][u](a[t]));
                return !0;
              }),
              (o.prototype.setSpace = function (t, e) {
                var i = e[0];
                return void 0 === i
                  ? this.getValues(t)
                  : ("number" == typeof i &&
                      (i = Array.prototype.slice.call(e)),
                    this.setValues(t, i),
                    this);
              }),
              (o.prototype.setChannel = function (t, e, i) {
                var n = this.values[t];
                return void 0 === i
                  ? n[e]
                  : (i === n[e] || ((n[e] = i), this.setValues(t, n)), this);
              }),
              "undefined" != typeof window && (window.Color = o),
              (e.exports = o);
          },
          { 1: 1, 4: 4 },
        ],
        3: [
          function (t, e, i) {
            function a(t) {
              var e,
                i,
                n = t[0] / 255,
                a = t[1] / 255,
                r = t[2] / 255,
                o = Math.min(n, a, r),
                s = Math.max(n, a, r),
                l = s - o;
              return (
                s == o
                  ? (e = 0)
                  : n == s
                    ? (e = (a - r) / l)
                    : a == s
                      ? (e = 2 + (r - n) / l)
                      : r == s && (e = 4 + (n - a) / l),
                (e = Math.min(60 * e, 360)) < 0 && (e += 360),
                (i = (o + s) / 2),
                [
                  e,
                  100 * (s == o ? 0 : i <= 0.5 ? l / (s + o) : l / (2 - s - o)),
                  100 * i,
                ]
              );
            }
            function n(t) {
              var e,
                i,
                n = t[0],
                a = t[1],
                r = t[2],
                o = Math.min(n, a, r),
                s = Math.max(n, a, r),
                l = s - o;
              return (
                (i = 0 == s ? 0 : ((l / s) * 1e3) / 10),
                s == o
                  ? (e = 0)
                  : n == s
                    ? (e = (a - r) / l)
                    : a == s
                      ? (e = 2 + (r - n) / l)
                      : r == s && (e = 4 + (n - a) / l),
                (e = Math.min(60 * e, 360)) < 0 && (e += 360),
                [e, i, ((s / 255) * 1e3) / 10]
              );
            }
            function o(t) {
              var e = t[0],
                i = t[1],
                n = t[2];
              return [
                a(t)[0],
                100 * ((1 / 255) * Math.min(e, Math.min(i, n))),
                100 * (n = 1 - (1 / 255) * Math.max(e, Math.max(i, n))),
              ];
            }
            function s(t) {
              var e,
                i = t[0] / 255,
                n = t[1] / 255,
                a = t[2] / 255;
              return [
                100 *
                  ((1 - i - (e = Math.min(1 - i, 1 - n, 1 - a))) / (1 - e) ||
                    0),
                100 * ((1 - n - e) / (1 - e) || 0),
                100 * ((1 - a - e) / (1 - e) || 0),
                100 * e,
              ];
            }
            function l(t) {
              return M[JSON.stringify(t)];
            }
            function u(t) {
              var e = t[0] / 255,
                i = t[1] / 255,
                n = t[2] / 255;
              return [
                100 *
                  (0.4124 *
                    (e =
                      0.04045 < e
                        ? Math.pow((e + 0.055) / 1.055, 2.4)
                        : e / 12.92) +
                    0.3576 *
                      (i =
                        0.04045 < i
                          ? Math.pow((i + 0.055) / 1.055, 2.4)
                          : i / 12.92) +
                    0.1805 *
                      (n =
                        0.04045 < n
                          ? Math.pow((n + 0.055) / 1.055, 2.4)
                          : n / 12.92)),
                100 * (0.2126 * e + 0.7152 * i + 0.0722 * n),
                100 * (0.0193 * e + 0.1192 * i + 0.9505 * n),
              ];
            }
            function d(t) {
              var e = u(t),
                i = e[0],
                n = e[1],
                a = e[2];
              return (
                (n /= 100),
                (a /= 108.883),
                (i =
                  0.008856 < (i /= 95.047)
                    ? Math.pow(i, 1 / 3)
                    : 7.787 * i + 16 / 116),
                [
                  116 *
                    (n =
                      0.008856 < n
                        ? Math.pow(n, 1 / 3)
                        : 7.787 * n + 16 / 116) -
                    16,
                  500 * (i - n),
                  200 *
                    (n -
                      (a =
                        0.008856 < a
                          ? Math.pow(a, 1 / 3)
                          : 7.787 * a + 16 / 116)),
                ]
              );
            }
            function c(t) {
              var e,
                i,
                n,
                a,
                r,
                o = t[0] / 360,
                s = t[1] / 100,
                l = t[2] / 100;
              if (0 == s) return [(r = 255 * l), r, r];
              (e = 2 * l - (i = l < 0.5 ? l * (1 + s) : l + s - l * s)),
                (a = [0, 0, 0]);
              for (var u = 0; u < 3; u++)
                (n = o + (1 / 3) * -(u - 1)) < 0 && n++,
                  1 < n && n--,
                  (r =
                    6 * n < 1
                      ? e + 6 * (i - e) * n
                      : 2 * n < 1
                        ? i
                        : 3 * n < 2
                          ? e + (i - e) * (2 / 3 - n) * 6
                          : e),
                  (a[u] = 255 * r);
              return a;
            }
            function h(t) {
              var e = t[0] / 60,
                i = t[1] / 100,
                n = t[2] / 100,
                a = Math.floor(e) % 6,
                r = e - Math.floor(e),
                o = 255 * n * (1 - i),
                s = 255 * n * (1 - i * r),
                l = 255 * n * (1 - i * (1 - r));
              n *= 255;
              switch (a) {
                case 0:
                  return [n, l, o];
                case 1:
                  return [s, n, o];
                case 2:
                  return [o, n, l];
                case 3:
                  return [o, s, n];
                case 4:
                  return [l, o, n];
                case 5:
                  return [n, o, s];
              }
            }
            function f(t) {
              var e,
                i,
                n,
                a,
                o = t[0] / 360,
                s = t[1] / 100,
                l = t[2] / 100,
                u = s + l;
              switch (
                (1 < u && ((s /= u), (l /= u)),
                (n = 6 * o - (e = Math.floor(6 * o))),
                0 != (1 & e) && (n = 1 - n),
                (a = s + n * ((i = 1 - l) - s)),
                e)
              ) {
                default:
                case 6:
                case 0:
                  (r = i), (g = a), (b = s);
                  break;
                case 1:
                  (r = a), (g = i), (b = s);
                  break;
                case 2:
                  (r = s), (g = i), (b = a);
                  break;
                case 3:
                  (r = s), (g = a), (b = i);
                  break;
                case 4:
                  (r = a), (g = s), (b = i);
                  break;
                case 5:
                  (r = i), (g = s), (b = a);
              }
              return [255 * r, 255 * g, 255 * b];
            }
            function p(t) {
              var e = t[0] / 100,
                i = t[1] / 100,
                n = t[2] / 100,
                a = t[3] / 100;
              return [
                255 * (1 - Math.min(1, e * (1 - a) + a)),
                255 * (1 - Math.min(1, i * (1 - a) + a)),
                255 * (1 - Math.min(1, n * (1 - a) + a)),
              ];
            }
            function m(t) {
              var e,
                i,
                n,
                a = t[0] / 100,
                r = t[1] / 100,
                o = t[2] / 100;
              return (
                (i = -0.9689 * a + 1.8758 * r + 0.0415 * o),
                (n = 0.0557 * a + -0.204 * r + 1.057 * o),
                (e =
                  0.0031308 < (e = 3.2406 * a + -1.5372 * r + -0.4986 * o)
                    ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055
                    : (e *= 12.92)),
                (i =
                  0.0031308 < i
                    ? 1.055 * Math.pow(i, 1 / 2.4) - 0.055
                    : (i *= 12.92)),
                (n =
                  0.0031308 < n
                    ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055
                    : (n *= 12.92)),
                [
                  255 * (e = Math.min(Math.max(0, e), 1)),
                  255 * (i = Math.min(Math.max(0, i), 1)),
                  255 * (n = Math.min(Math.max(0, n), 1)),
                ]
              );
            }
            function v(t) {
              var e = t[0],
                i = t[1],
                n = t[2];
              return (
                (i /= 100),
                (n /= 108.883),
                (e =
                  0.008856 < (e /= 95.047)
                    ? Math.pow(e, 1 / 3)
                    : 7.787 * e + 16 / 116),
                [
                  116 *
                    (i =
                      0.008856 < i
                        ? Math.pow(i, 1 / 3)
                        : 7.787 * i + 16 / 116) -
                    16,
                  500 * (e - i),
                  200 *
                    (i -
                      (n =
                        0.008856 < n
                          ? Math.pow(n, 1 / 3)
                          : 7.787 * n + 16 / 116)),
                ]
              );
            }
            function y(t) {
              var e,
                i,
                n,
                a,
                r = t[0],
                o = t[1],
                s = t[2];
              return (
                (a =
                  r <= 8
                    ? ((i = (100 * r) / 903.3) / 100) * 7.787 + 16 / 116
                    : ((i = 100 * Math.pow((r + 16) / 116, 3)),
                      Math.pow(i / 100, 1 / 3))),
                [
                  (e =
                    e / 95.047 <= 0.008856
                      ? (e = (95.047 * (o / 500 + a - 16 / 116)) / 7.787)
                      : 95.047 * Math.pow(o / 500 + a, 3)),
                  i,
                  (n =
                    n / 108.883 <= 0.008859
                      ? (n = (108.883 * (a - s / 200 - 16 / 116)) / 7.787)
                      : 108.883 * Math.pow(a - s / 200, 3)),
                ]
              );
            }
            function x(t) {
              var e,
                i = t[0],
                n = t[1],
                a = t[2];
              return (
                (e = (360 * Math.atan2(a, n)) / 2 / Math.PI) < 0 && (e += 360),
                [i, Math.sqrt(n * n + a * a), e]
              );
            }
            function w(t) {
              return m(y(t));
            }
            function k(t) {
              var e,
                i = t[0],
                n = t[1];
              return (
                (e = (t[2] / 360) * 2 * Math.PI),
                [i, n * Math.cos(e), n * Math.sin(e)]
              );
            }
            function S(t) {
              return _[t];
            }
            e.exports = {
              rgb2hsl: a,
              rgb2hsv: n,
              rgb2hwb: o,
              rgb2cmyk: s,
              rgb2keyword: l,
              rgb2xyz: u,
              rgb2lab: d,
              rgb2lch: function (t) {
                return x(d(t));
              },
              hsl2rgb: c,
              hsl2hsv: function (t) {
                var e = t[0],
                  i = t[1] / 100,
                  n = t[2] / 100;
                return 0 !== n
                  ? [
                      e,
                      100 * ((2 * (i *= (n *= 2) <= 1 ? n : 2 - n)) / (n + i)),
                      100 * ((n + i) / 2),
                    ]
                  : [0, 0, 0];
              },
              hsl2hwb: function (t) {
                return o(c(t));
              },
              hsl2cmyk: function (t) {
                return s(c(t));
              },
              hsl2keyword: function (t) {
                return l(c(t));
              },
              hsv2rgb: h,
              hsv2hsl: function (t) {
                var e,
                  i,
                  n = t[0],
                  a = t[1] / 100,
                  r = t[2] / 100;
                return (
                  (e = a * r),
                  [
                    n,
                    100 * (e = (e /= (i = (2 - a) * r) <= 1 ? i : 2 - i) || 0),
                    100 * (i /= 2),
                  ]
                );
              },
              hsv2hwb: function (t) {
                return o(h(t));
              },
              hsv2cmyk: function (t) {
                return s(h(t));
              },
              hsv2keyword: function (t) {
                return l(h(t));
              },
              hwb2rgb: f,
              hwb2hsl: function (t) {
                return a(f(t));
              },
              hwb2hsv: function (t) {
                return n(f(t));
              },
              hwb2cmyk: function (t) {
                return s(f(t));
              },
              hwb2keyword: function (t) {
                return l(f(t));
              },
              cmyk2rgb: p,
              cmyk2hsl: function (t) {
                return a(p(t));
              },
              cmyk2hsv: function (t) {
                return n(p(t));
              },
              cmyk2hwb: function (t) {
                return o(p(t));
              },
              cmyk2keyword: function (t) {
                return l(p(t));
              },
              keyword2rgb: S,
              keyword2hsl: function (t) {
                return a(S(t));
              },
              keyword2hsv: function (t) {
                return n(S(t));
              },
              keyword2hwb: function (t) {
                return o(S(t));
              },
              keyword2cmyk: function (t) {
                return s(S(t));
              },
              keyword2lab: function (t) {
                return d(S(t));
              },
              keyword2xyz: function (t) {
                return u(S(t));
              },
              xyz2rgb: m,
              xyz2lab: v,
              xyz2lch: function (t) {
                return x(v(t));
              },
              lab2xyz: y,
              lab2rgb: w,
              lab2lch: x,
              lch2lab: k,
              lch2xyz: function (t) {
                return y(k(t));
              },
              lch2rgb: function (t) {
                return w(k(t));
              },
            };
            var _ = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50],
              },
              M = {};
            for (var C in _) M[JSON.stringify(_[C])] = C;
          },
          {},
        ],
        4: [
          function (t, e, i) {
            var a = t(3),
              r = function () {
                return new u();
              };
            for (var n in a) {
              r[n + "Raw"] = (function (e) {
                return function (t) {
                  return (
                    "number" == typeof t &&
                      (t = Array.prototype.slice.call(arguments)),
                    a[e](t)
                  );
                };
              })(n);
              var o = /(\w+)2(\w+)/.exec(n),
                s = o[1],
                l = o[2];
              (r[s] = r[s] || {})[l] = r[n] = (function (n) {
                return function (t) {
                  "number" == typeof t &&
                    (t = Array.prototype.slice.call(arguments));
                  var e = a[n](t);
                  if ("string" == typeof e || void 0 === e) return e;
                  for (var i = 0; i < e.length; i++) e[i] = Math.round(e[i]);
                  return e;
                };
              })(n);
            }
            var u = function () {
              this.convs = {};
            };
            (u.prototype.routeSpace = function (t, e) {
              var i = e[0];
              return void 0 === i
                ? this.getValues(t)
                : ("number" == typeof i && (i = Array.prototype.slice.call(e)),
                  this.setValues(t, i));
            }),
              (u.prototype.setValues = function (t, e) {
                return (
                  (this.space = t), (this.convs = {}), (this.convs[t] = e), this
                );
              }),
              (u.prototype.getValues = function (t) {
                var e = this.convs[t];
                if (!e) {
                  var i = this.space,
                    n = this.convs[i];
                  (e = r[i][t](n)), (this.convs[t] = e);
                }
                return e;
              }),
              ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (e) {
                u.prototype[e] = function (t) {
                  return this.routeSpace(e, arguments);
                };
              }),
              (e.exports = r);
          },
          { 3: 3 },
        ],
        5: [
          function (t, e, i) {
            e.exports = {
              aliceblue: [240, 248, 255],
              antiquewhite: [250, 235, 215],
              aqua: [0, 255, 255],
              aquamarine: [127, 255, 212],
              azure: [240, 255, 255],
              beige: [245, 245, 220],
              bisque: [255, 228, 196],
              black: [0, 0, 0],
              blanchedalmond: [255, 235, 205],
              blue: [0, 0, 255],
              blueviolet: [138, 43, 226],
              brown: [165, 42, 42],
              burlywood: [222, 184, 135],
              cadetblue: [95, 158, 160],
              chartreuse: [127, 255, 0],
              chocolate: [210, 105, 30],
              coral: [255, 127, 80],
              cornflowerblue: [100, 149, 237],
              cornsilk: [255, 248, 220],
              crimson: [220, 20, 60],
              cyan: [0, 255, 255],
              darkblue: [0, 0, 139],
              darkcyan: [0, 139, 139],
              darkgoldenrod: [184, 134, 11],
              darkgray: [169, 169, 169],
              darkgreen: [0, 100, 0],
              darkgrey: [169, 169, 169],
              darkkhaki: [189, 183, 107],
              darkmagenta: [139, 0, 139],
              darkolivegreen: [85, 107, 47],
              darkorange: [255, 140, 0],
              darkorchid: [153, 50, 204],
              darkred: [139, 0, 0],
              darksalmon: [233, 150, 122],
              darkseagreen: [143, 188, 143],
              darkslateblue: [72, 61, 139],
              darkslategray: [47, 79, 79],
              darkslategrey: [47, 79, 79],
              darkturquoise: [0, 206, 209],
              darkviolet: [148, 0, 211],
              deeppink: [255, 20, 147],
              deepskyblue: [0, 191, 255],
              dimgray: [105, 105, 105],
              dimgrey: [105, 105, 105],
              dodgerblue: [30, 144, 255],
              firebrick: [178, 34, 34],
              floralwhite: [255, 250, 240],
              forestgreen: [34, 139, 34],
              fuchsia: [255, 0, 255],
              gainsboro: [220, 220, 220],
              ghostwhite: [248, 248, 255],
              gold: [255, 215, 0],
              goldenrod: [218, 165, 32],
              gray: [128, 128, 128],
              green: [0, 128, 0],
              greenyellow: [173, 255, 47],
              grey: [128, 128, 128],
              honeydew: [240, 255, 240],
              hotpink: [255, 105, 180],
              indianred: [205, 92, 92],
              indigo: [75, 0, 130],
              ivory: [255, 255, 240],
              khaki: [240, 230, 140],
              lavender: [230, 230, 250],
              lavenderblush: [255, 240, 245],
              lawngreen: [124, 252, 0],
              lemonchiffon: [255, 250, 205],
              lightblue: [173, 216, 230],
              lightcoral: [240, 128, 128],
              lightcyan: [224, 255, 255],
              lightgoldenrodyellow: [250, 250, 210],
              lightgray: [211, 211, 211],
              lightgreen: [144, 238, 144],
              lightgrey: [211, 211, 211],
              lightpink: [255, 182, 193],
              lightsalmon: [255, 160, 122],
              lightseagreen: [32, 178, 170],
              lightskyblue: [135, 206, 250],
              lightslategray: [119, 136, 153],
              lightslategrey: [119, 136, 153],
              lightsteelblue: [176, 196, 222],
              lightyellow: [255, 255, 224],
              lime: [0, 255, 0],
              limegreen: [50, 205, 50],
              linen: [250, 240, 230],
              magenta: [255, 0, 255],
              maroon: [128, 0, 0],
              mediumaquamarine: [102, 205, 170],
              mediumblue: [0, 0, 205],
              mediumorchid: [186, 85, 211],
              mediumpurple: [147, 112, 219],
              mediumseagreen: [60, 179, 113],
              mediumslateblue: [123, 104, 238],
              mediumspringgreen: [0, 250, 154],
              mediumturquoise: [72, 209, 204],
              mediumvioletred: [199, 21, 133],
              midnightblue: [25, 25, 112],
              mintcream: [245, 255, 250],
              mistyrose: [255, 228, 225],
              moccasin: [255, 228, 181],
              navajowhite: [255, 222, 173],
              navy: [0, 0, 128],
              oldlace: [253, 245, 230],
              olive: [128, 128, 0],
              olivedrab: [107, 142, 35],
              orange: [255, 165, 0],
              orangered: [255, 69, 0],
              orchid: [218, 112, 214],
              palegoldenrod: [238, 232, 170],
              palegreen: [152, 251, 152],
              paleturquoise: [175, 238, 238],
              palevioletred: [219, 112, 147],
              papayawhip: [255, 239, 213],
              peachpuff: [255, 218, 185],
              peru: [205, 133, 63],
              pink: [255, 192, 203],
              plum: [221, 160, 221],
              powderblue: [176, 224, 230],
              purple: [128, 0, 128],
              rebeccapurple: [102, 51, 153],
              red: [255, 0, 0],
              rosybrown: [188, 143, 143],
              royalblue: [65, 105, 225],
              saddlebrown: [139, 69, 19],
              salmon: [250, 128, 114],
              sandybrown: [244, 164, 96],
              seagreen: [46, 139, 87],
              seashell: [255, 245, 238],
              sienna: [160, 82, 45],
              silver: [192, 192, 192],
              skyblue: [135, 206, 235],
              slateblue: [106, 90, 205],
              slategray: [112, 128, 144],
              slategrey: [112, 128, 144],
              snow: [255, 250, 250],
              springgreen: [0, 255, 127],
              steelblue: [70, 130, 180],
              tan: [210, 180, 140],
              teal: [0, 128, 128],
              thistle: [216, 191, 216],
              tomato: [255, 99, 71],
              turquoise: [64, 224, 208],
              violet: [238, 130, 238],
              wheat: [245, 222, 179],
              white: [255, 255, 255],
              whitesmoke: [245, 245, 245],
              yellow: [255, 255, 0],
              yellowgreen: [154, 205, 50],
            };
          },
          {},
        ],
        6: [
          function (Li, Ri, t) {
            var e, i;
            (e = this),
              (i = function () {
                "use strict";
                var t, n;
                function h() {
                  return t.apply(null, arguments);
                }
                function s(t) {
                  return (
                    t instanceof Array ||
                    "[object Array]" === Object.prototype.toString.call(t)
                  );
                }
                function l(t) {
                  return (
                    "[object Object]" === Object.prototype.toString.call(t)
                  );
                }
                function u(t) {
                  return (
                    t instanceof Date ||
                    "[object Date]" === Object.prototype.toString.call(t)
                  );
                }
                function d(t, e) {
                  var i,
                    n = [];
                  for (i = 0; i < t.length; ++i) n.push(e(t[i], i));
                  return n;
                }
                function f(t, e) {
                  return Object.prototype.hasOwnProperty.call(t, e);
                }
                function c(t, e) {
                  for (var i in e) f(e, i) && (t[i] = e[i]);
                  return (
                    f(e, "toString") && (t.toString = e.toString),
                    f(e, "valueOf") && (t.valueOf = e.valueOf),
                    t
                  );
                }
                function g(t, e, i, n) {
                  return xe(t, e, i, n, !0).utc();
                }
                function p(t) {
                  return (
                    null == t._pf &&
                      (t._pf = {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidMonth: null,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1,
                        parsedDateParts: [],
                        meridiem: null,
                      }),
                    t._pf
                  );
                }
                function m(t) {
                  if (null == t._isValid) {
                    var e = p(t),
                      i = n.call(e.parsedDateParts, function (t) {
                        return null != t;
                      });
                    (t._isValid =
                      !isNaN(t._d.getTime()) &&
                      e.overflow < 0 &&
                      !e.empty &&
                      !e.invalidMonth &&
                      !e.invalidWeekday &&
                      !e.nullInput &&
                      !e.invalidFormat &&
                      !e.userInvalidated &&
                      (!e.meridiem || (e.meridiem && i))),
                      t._strict &&
                        (t._isValid =
                          t._isValid &&
                          0 === e.charsLeftOver &&
                          0 === e.unusedTokens.length &&
                          void 0 === e.bigHour);
                  }
                  return t._isValid;
                }
                function v(t) {
                  var e = g(NaN);
                  return (
                    null != t ? c(p(e), t) : (p(e).userInvalidated = !0), e
                  );
                }
                function r(t) {
                  return void 0 === t;
                }
                n = Array.prototype.some
                  ? Array.prototype.some
                  : function (t) {
                      for (
                        var e = Object(this), i = e.length >>> 0, n = 0;
                        n < i;
                        n++
                      )
                        if (n in e && t.call(this, e[n], n, e)) return !0;
                      return !1;
                    };
                var o = (h.momentProperties = []);
                function y(t, e) {
                  var i, n, a;
                  if (
                    (r(e._isAMomentObject) ||
                      (t._isAMomentObject = e._isAMomentObject),
                    r(e._i) || (t._i = e._i),
                    r(e._f) || (t._f = e._f),
                    r(e._l) || (t._l = e._l),
                    r(e._strict) || (t._strict = e._strict),
                    r(e._tzm) || (t._tzm = e._tzm),
                    r(e._isUTC) || (t._isUTC = e._isUTC),
                    r(e._offset) || (t._offset = e._offset),
                    r(e._pf) || (t._pf = p(e)),
                    r(e._locale) || (t._locale = e._locale),
                    0 < o.length)
                  )
                    for (i in o) r((a = e[(n = o[i])])) || (t[n] = a);
                  return t;
                }
                var e = !1;
                function b(t) {
                  y(this, t),
                    (this._d = new Date(null != t._d ? t._d.getTime() : NaN)),
                    !1 === e && ((e = !0), h.updateOffset(this), (e = !1));
                }
                function x(t) {
                  return (
                    t instanceof b || (null != t && null != t._isAMomentObject)
                  );
                }
                function w(t) {
                  return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
                }
                function k(t) {
                  var e = +t,
                    i = 0;
                  return 0 !== e && isFinite(e) && (i = w(e)), i;
                }
                function S(t, e, i) {
                  var n,
                    a = Math.min(t.length, e.length),
                    r = Math.abs(t.length - e.length),
                    o = 0;
                  for (n = 0; n < a; n++)
                    ((i && t[n] !== e[n]) || (!i && k(t[n]) !== k(e[n]))) &&
                      o++;
                  return o + r;
                }
                function a(t) {
                  !1 === h.suppressDeprecationWarnings &&
                    "undefined" != typeof console &&
                    console.warn &&
                    console.warn("Deprecation warning: " + t);
                }
                function i(t, e) {
                  var i = !0;
                  return c(function () {
                    return (
                      null != h.deprecationHandler &&
                        h.deprecationHandler(null, t),
                      i &&
                        (a(
                          t +
                            "\nArguments: " +
                            Array.prototype.slice.call(arguments).join(", ") +
                            "\n" +
                            new Error().stack,
                        ),
                        (i = !1)),
                      e.apply(this, arguments)
                    );
                  }, e);
                }
                var _,
                  M = {};
                function C(t, e) {
                  null != h.deprecationHandler && h.deprecationHandler(t, e),
                    M[t] || (a(e), (M[t] = !0));
                }
                function D(t) {
                  return (
                    t instanceof Function ||
                    "[object Function]" === Object.prototype.toString.call(t)
                  );
                }
                function A(t, e) {
                  var i,
                    n = c({}, t);
                  for (i in e)
                    f(e, i) &&
                      (l(t[i]) && l(e[i])
                        ? ((n[i] = {}), c(n[i], t[i]), c(n[i], e[i]))
                        : null != e[i]
                          ? (n[i] = e[i])
                          : delete n[i]);
                  for (i in t)
                    f(t, i) && !f(e, i) && l(t[i]) && (n[i] = c({}, n[i]));
                  return n;
                }
                function T(t) {
                  null != t && this.set(t);
                }
                (h.suppressDeprecationWarnings = !1),
                  (h.deprecationHandler = null),
                  (_ = Object.keys
                    ? Object.keys
                    : function (t) {
                        var e,
                          i = [];
                        for (e in t) f(t, e) && i.push(e);
                        return i;
                      });
                var P = {};
                function I(t, e) {
                  var i = t.toLowerCase();
                  P[i] = P[i + "s"] = P[e] = t;
                }
                function O(t) {
                  return "string" == typeof t
                    ? P[t] || P[t.toLowerCase()]
                    : void 0;
                }
                function F(t) {
                  var e,
                    i,
                    n = {};
                  for (i in t) f(t, i) && (e = O(i)) && (n[e] = t[i]);
                  return n;
                }
                var L = {};
                function R(t, e) {
                  L[t] = e;
                }
                function V(e, i) {
                  return function (t) {
                    return null != t
                      ? (z(this, e, t), h.updateOffset(this, i), this)
                      : W(this, e);
                  };
                }
                function W(t, e) {
                  return t.isValid()
                    ? t._d["get" + (t._isUTC ? "UTC" : "") + e]()
                    : NaN;
                }
                function z(t, e, i) {
                  t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](i);
                }
                function E(t, e, i) {
                  var n = "" + Math.abs(t),
                    a = e - n.length;
                  return (
                    (0 <= t ? (i ? "+" : "") : "-") +
                    Math.pow(10, Math.max(0, a)).toString().substr(1) +
                    n
                  );
                }
                var B =
                    /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                  N = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                  Y = {},
                  H = {};
                function U(t, e, i, n) {
                  var a = n;
                  "string" == typeof n &&
                    (a = function () {
                      return this[n]();
                    }),
                    t && (H[t] = a),
                    e &&
                      (H[e[0]] = function () {
                        return E(a.apply(this, arguments), e[1], e[2]);
                      }),
                    i &&
                      (H[i] = function () {
                        return this.localeData().ordinal(
                          a.apply(this, arguments),
                          t,
                        );
                      });
                }
                function j(t, e) {
                  return t.isValid()
                    ? ((e = G(e, t.localeData())),
                      (Y[e] =
                        Y[e] ||
                        (function (n) {
                          var t,
                            a,
                            e,
                            r = n.match(B);
                          for (t = 0, a = r.length; t < a; t++)
                            H[r[t]]
                              ? (r[t] = H[r[t]])
                              : (r[t] = (e = r[t]).match(/\[[\s\S]/)
                                  ? e.replace(/^\[|\]$/g, "")
                                  : e.replace(/\\/g, ""));
                          return function (t) {
                            var e,
                              i = "";
                            for (e = 0; e < a; e++)
                              i +=
                                r[e] instanceof Function
                                  ? r[e].call(t, n)
                                  : r[e];
                            return i;
                          };
                        })(e)),
                      Y[e](t))
                    : t.localeData().invalidDate();
                }
                function G(t, e) {
                  var i = 5;
                  function n(t) {
                    return e.longDateFormat(t) || t;
                  }
                  for (N.lastIndex = 0; 0 <= i && N.test(t); )
                    (t = t.replace(N, n)), (N.lastIndex = 0), (i -= 1);
                  return t;
                }
                var q = /\d/,
                  X = /\d\d/,
                  Z = /\d{3}/,
                  J = /\d{4}/,
                  Q = /[+-]?\d{6}/,
                  $ = /\d\d?/,
                  K = /\d\d\d\d?/,
                  tt = /\d\d\d\d\d\d?/,
                  et = /\d{1,3}/,
                  it = /\d{1,4}/,
                  nt = /[+-]?\d{1,6}/,
                  at = /\d+/,
                  rt = /[+-]?\d+/,
                  ot = /Z|[+-]\d\d:?\d\d/gi,
                  st = /Z|[+-]\d\d(?::?\d\d)?/gi,
                  lt =
                    /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
                  ut = {};
                function dt(t, i, n) {
                  ut[t] = D(i)
                    ? i
                    : function (t, e) {
                        return t && n ? n : i;
                      };
                }
                function ct(t, e) {
                  return f(ut, t)
                    ? ut[t](e._strict, e._locale)
                    : new RegExp(
                        ht(
                          t
                            .replace("\\", "")
                            .replace(
                              /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                              function (t, e, i, n, a) {
                                return e || i || n || a;
                              },
                            ),
                        ),
                      );
                }
                function ht(t) {
                  return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                }
                var ft = {};
                function gt(t, i) {
                  var e,
                    n = i;
                  for (
                    "string" == typeof t && (t = [t]),
                      "number" == typeof i &&
                        (n = function (t, e) {
                          e[i] = k(t);
                        }),
                      e = 0;
                    e < t.length;
                    e++
                  )
                    ft[t[e]] = n;
                }
                function pt(t, a) {
                  gt(t, function (t, e, i, n) {
                    (i._w = i._w || {}), a(t, i._w, i, n);
                  });
                }
                var mt,
                  vt = 0,
                  yt = 1,
                  bt = 2,
                  xt = 3,
                  wt = 4,
                  kt = 5,
                  St = 6,
                  _t = 7,
                  Mt = 8;
                function Ct(t, e) {
                  return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
                }
                (mt = Array.prototype.indexOf
                  ? Array.prototype.indexOf
                  : function (t) {
                      var e;
                      for (e = 0; e < this.length; ++e)
                        if (this[e] === t) return e;
                      return -1;
                    }),
                  U("M", ["MM", 2], "Mo", function () {
                    return this.month() + 1;
                  }),
                  U("MMM", 0, 0, function (t) {
                    return this.localeData().monthsShort(this, t);
                  }),
                  U("MMMM", 0, 0, function (t) {
                    return this.localeData().months(this, t);
                  }),
                  I("month", "M"),
                  R("month", 8),
                  dt("M", $),
                  dt("MM", $, X),
                  dt("MMM", function (t, e) {
                    return e.monthsShortRegex(t);
                  }),
                  dt("MMMM", function (t, e) {
                    return e.monthsRegex(t);
                  }),
                  gt(["M", "MM"], function (t, e) {
                    e[yt] = k(t) - 1;
                  }),
                  gt(["MMM", "MMMM"], function (t, e, i, n) {
                    var a = i._locale.monthsParse(t, n, i._strict);
                    null != a ? (e[yt] = a) : (p(i).invalidMonth = t);
                  });
                var Dt = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
                  At =
                    "January_February_March_April_May_June_July_August_September_October_November_December".split(
                      "_",
                    );
                var Tt =
                  "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
                function Pt(t, e) {
                  var i;
                  if (!t.isValid()) return t;
                  if ("string" == typeof e)
                    if (/^\d+$/.test(e)) e = k(e);
                    else if (
                      "number" != typeof (e = t.localeData().monthsParse(e))
                    )
                      return t;
                  return (
                    (i = Math.min(t.date(), Ct(t.year(), e))),
                    t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i),
                    t
                  );
                }
                function It(t) {
                  return null != t
                    ? (Pt(this, t), h.updateOffset(this, !0), this)
                    : W(this, "Month");
                }
                var Ot = lt;
                var Ft = lt;
                function Lt() {
                  function t(t, e) {
                    return e.length - t.length;
                  }
                  var e,
                    i,
                    n = [],
                    a = [],
                    r = [];
                  for (e = 0; e < 12; e++)
                    (i = g([2e3, e])),
                      n.push(this.monthsShort(i, "")),
                      a.push(this.months(i, "")),
                      r.push(this.months(i, "")),
                      r.push(this.monthsShort(i, ""));
                  for (n.sort(t), a.sort(t), r.sort(t), e = 0; e < 12; e++)
                    (n[e] = ht(n[e])), (a[e] = ht(a[e]));
                  for (e = 0; e < 24; e++) r[e] = ht(r[e]);
                  (this._monthsRegex = new RegExp(
                    "^(" + r.join("|") + ")",
                    "i",
                  )),
                    (this._monthsShortRegex = this._monthsRegex),
                    (this._monthsStrictRegex = new RegExp(
                      "^(" + a.join("|") + ")",
                      "i",
                    )),
                    (this._monthsShortStrictRegex = new RegExp(
                      "^(" + n.join("|") + ")",
                      "i",
                    ));
                }
                function Rt(t) {
                  return Vt(t) ? 366 : 365;
                }
                function Vt(t) {
                  return (t % 4 == 0 && t % 100 != 0) || t % 400 == 0;
                }
                U("Y", 0, 0, function () {
                  var t = this.year();
                  return t <= 9999 ? "" + t : "+" + t;
                }),
                  U(0, ["YY", 2], 0, function () {
                    return this.year() % 100;
                  }),
                  U(0, ["YYYY", 4], 0, "year"),
                  U(0, ["YYYYY", 5], 0, "year"),
                  U(0, ["YYYYYY", 6, !0], 0, "year"),
                  I("year", "y"),
                  R("year", 1),
                  dt("Y", rt),
                  dt("YY", $, X),
                  dt("YYYY", it, J),
                  dt("YYYYY", nt, Q),
                  dt("YYYYYY", nt, Q),
                  gt(["YYYYY", "YYYYYY"], vt),
                  gt("YYYY", function (t, e) {
                    e[vt] = 2 === t.length ? h.parseTwoDigitYear(t) : k(t);
                  }),
                  gt("YY", function (t, e) {
                    e[vt] = h.parseTwoDigitYear(t);
                  }),
                  gt("Y", function (t, e) {
                    e[vt] = parseInt(t, 10);
                  }),
                  (h.parseTwoDigitYear = function (t) {
                    return k(t) + (68 < k(t) ? 1900 : 2e3);
                  });
                var Wt = V("FullYear", !0);
                function zt(t) {
                  var e = new Date(Date.UTC.apply(null, arguments));
                  return (
                    t < 100 &&
                      0 <= t &&
                      isFinite(e.getUTCFullYear()) &&
                      e.setUTCFullYear(t),
                    e
                  );
                }
                function Et(t, e, i) {
                  var n = 7 + e - i;
                  return -((7 + zt(t, 0, n).getUTCDay() - e) % 7) + n - 1;
                }
                function Bt(t, e, i, n, a) {
                  var r,
                    o,
                    s = 1 + 7 * (e - 1) + ((7 + i - n) % 7) + Et(t, n, a);
                  return (
                    (o =
                      s <= 0
                        ? Rt((r = t - 1)) + s
                        : s > Rt(t)
                          ? ((r = t + 1), s - Rt(t))
                          : ((r = t), s)),
                    { year: r, dayOfYear: o }
                  );
                }
                function Nt(t, e, i) {
                  var n,
                    a,
                    r = Et(t.year(), e, i),
                    o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1;
                  return (
                    o < 1
                      ? (n = o + Yt((a = t.year() - 1), e, i))
                      : o > Yt(t.year(), e, i)
                        ? ((n = o - Yt(t.year(), e, i)), (a = t.year() + 1))
                        : ((a = t.year()), (n = o)),
                    { week: n, year: a }
                  );
                }
                function Yt(t, e, i) {
                  var n = Et(t, e, i),
                    a = Et(t + 1, e, i);
                  return (Rt(t) - n + a) / 7;
                }
                U("w", ["ww", 2], "wo", "week"),
                  U("W", ["WW", 2], "Wo", "isoWeek"),
                  I("week", "w"),
                  I("isoWeek", "W"),
                  R("week", 5),
                  R("isoWeek", 5),
                  dt("w", $),
                  dt("ww", $, X),
                  dt("W", $),
                  dt("WW", $, X),
                  pt(["w", "ww", "W", "WW"], function (t, e, i, n) {
                    e[n.substr(0, 1)] = k(t);
                  });
                U("d", 0, "do", "day"),
                  U("dd", 0, 0, function (t) {
                    return this.localeData().weekdaysMin(this, t);
                  }),
                  U("ddd", 0, 0, function (t) {
                    return this.localeData().weekdaysShort(this, t);
                  }),
                  U("dddd", 0, 0, function (t) {
                    return this.localeData().weekdays(this, t);
                  }),
                  U("e", 0, 0, "weekday"),
                  U("E", 0, 0, "isoWeekday"),
                  I("day", "d"),
                  I("weekday", "e"),
                  I("isoWeekday", "E"),
                  R("day", 11),
                  R("weekday", 11),
                  R("isoWeekday", 11),
                  dt("d", $),
                  dt("e", $),
                  dt("E", $),
                  dt("dd", function (t, e) {
                    return e.weekdaysMinRegex(t);
                  }),
                  dt("ddd", function (t, e) {
                    return e.weekdaysShortRegex(t);
                  }),
                  dt("dddd", function (t, e) {
                    return e.weekdaysRegex(t);
                  }),
                  pt(["dd", "ddd", "dddd"], function (t, e, i, n) {
                    var a = i._locale.weekdaysParse(t, n, i._strict);
                    null != a ? (e.d = a) : (p(i).invalidWeekday = t);
                  }),
                  pt(["d", "e", "E"], function (t, e, i, n) {
                    e[n] = k(t);
                  });
                var Ht =
                  "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                    "_",
                  );
                var Ut = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
                var jt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
                var Gt = lt;
                var qt = lt;
                var Xt = lt;
                function Zt() {
                  function t(t, e) {
                    return e.length - t.length;
                  }
                  var e,
                    i,
                    n,
                    a,
                    r,
                    o = [],
                    s = [],
                    l = [],
                    u = [];
                  for (e = 0; e < 7; e++)
                    (i = g([2e3, 1]).day(e)),
                      (n = this.weekdaysMin(i, "")),
                      (a = this.weekdaysShort(i, "")),
                      (r = this.weekdays(i, "")),
                      o.push(n),
                      s.push(a),
                      l.push(r),
                      u.push(n),
                      u.push(a),
                      u.push(r);
                  for (
                    o.sort(t), s.sort(t), l.sort(t), u.sort(t), e = 0;
                    e < 7;
                    e++
                  )
                    (s[e] = ht(s[e])), (l[e] = ht(l[e])), (u[e] = ht(u[e]));
                  (this._weekdaysRegex = new RegExp(
                    "^(" + u.join("|") + ")",
                    "i",
                  )),
                    (this._weekdaysShortRegex = this._weekdaysRegex),
                    (this._weekdaysMinRegex = this._weekdaysRegex),
                    (this._weekdaysStrictRegex = new RegExp(
                      "^(" + l.join("|") + ")",
                      "i",
                    )),
                    (this._weekdaysShortStrictRegex = new RegExp(
                      "^(" + s.join("|") + ")",
                      "i",
                    )),
                    (this._weekdaysMinStrictRegex = new RegExp(
                      "^(" + o.join("|") + ")",
                      "i",
                    ));
                }
                function Jt() {
                  return this.hours() % 12 || 12;
                }
                function Qt(t, e) {
                  U(t, 0, 0, function () {
                    return this.localeData().meridiem(
                      this.hours(),
                      this.minutes(),
                      e,
                    );
                  });
                }
                function $t(t, e) {
                  return e._meridiemParse;
                }
                U("H", ["HH", 2], 0, "hour"),
                  U("h", ["hh", 2], 0, Jt),
                  U("k", ["kk", 2], 0, function () {
                    return this.hours() || 24;
                  }),
                  U("hmm", 0, 0, function () {
                    return "" + Jt.apply(this) + E(this.minutes(), 2);
                  }),
                  U("hmmss", 0, 0, function () {
                    return (
                      "" +
                      Jt.apply(this) +
                      E(this.minutes(), 2) +
                      E(this.seconds(), 2)
                    );
                  }),
                  U("Hmm", 0, 0, function () {
                    return "" + this.hours() + E(this.minutes(), 2);
                  }),
                  U("Hmmss", 0, 0, function () {
                    return (
                      "" +
                      this.hours() +
                      E(this.minutes(), 2) +
                      E(this.seconds(), 2)
                    );
                  }),
                  Qt("a", !0),
                  Qt("A", !1),
                  I("hour", "h"),
                  R("hour", 13),
                  dt("a", $t),
                  dt("A", $t),
                  dt("H", $),
                  dt("h", $),
                  dt("HH", $, X),
                  dt("hh", $, X),
                  dt("hmm", K),
                  dt("hmmss", tt),
                  dt("Hmm", K),
                  dt("Hmmss", tt),
                  gt(["H", "HH"], xt),
                  gt(["a", "A"], function (t, e, i) {
                    (i._isPm = i._locale.isPM(t)), (i._meridiem = t);
                  }),
                  gt(["h", "hh"], function (t, e, i) {
                    (e[xt] = k(t)), (p(i).bigHour = !0);
                  }),
                  gt("hmm", function (t, e, i) {
                    var n = t.length - 2;
                    (e[xt] = k(t.substr(0, n))),
                      (e[wt] = k(t.substr(n))),
                      (p(i).bigHour = !0);
                  }),
                  gt("hmmss", function (t, e, i) {
                    var n = t.length - 4,
                      a = t.length - 2;
                    (e[xt] = k(t.substr(0, n))),
                      (e[wt] = k(t.substr(n, 2))),
                      (e[kt] = k(t.substr(a))),
                      (p(i).bigHour = !0);
                  }),
                  gt("Hmm", function (t, e, i) {
                    var n = t.length - 2;
                    (e[xt] = k(t.substr(0, n))), (e[wt] = k(t.substr(n)));
                  }),
                  gt("Hmmss", function (t, e, i) {
                    var n = t.length - 4,
                      a = t.length - 2;
                    (e[xt] = k(t.substr(0, n))),
                      (e[wt] = k(t.substr(n, 2))),
                      (e[kt] = k(t.substr(a)));
                  });
                var Kt,
                  te = V("Hours", !0),
                  ee = {
                    calendar: {
                      sameDay: "[Today at] LT",
                      nextDay: "[Tomorrow at] LT",
                      nextWeek: "dddd [at] LT",
                      lastDay: "[Yesterday at] LT",
                      lastWeek: "[Last] dddd [at] LT",
                      sameElse: "L",
                    },
                    longDateFormat: {
                      LTS: "h:mm:ss A",
                      LT: "h:mm A",
                      L: "MM/DD/YYYY",
                      LL: "MMMM D, YYYY",
                      LLL: "MMMM D, YYYY h:mm A",
                      LLLL: "dddd, MMMM D, YYYY h:mm A",
                    },
                    invalidDate: "Invalid date",
                    ordinal: "%d",
                    ordinalParse: /\d{1,2}/,
                    relativeTime: {
                      future: "in %s",
                      past: "%s ago",
                      s: "a few seconds",
                      m: "a minute",
                      mm: "%d minutes",
                      h: "an hour",
                      hh: "%d hours",
                      d: "a day",
                      dd: "%d days",
                      M: "a month",
                      MM: "%d months",
                      y: "a year",
                      yy: "%d years",
                    },
                    months: At,
                    monthsShort: Tt,
                    week: { dow: 0, doy: 6 },
                    weekdays: Ht,
                    weekdaysMin: jt,
                    weekdaysShort: Ut,
                    meridiemParse: /[ap]\.?m?\.?/i,
                  },
                  ie = {};
                function ne(t) {
                  return t ? t.toLowerCase().replace("_", "-") : t;
                }
                function ae(t) {
                  var e = null;
                  if (!ie[t] && void 0 !== Ri && Ri && Ri.exports)
                    try {
                      (e = Kt._abbr), Li("./locale/" + t), re(e);
                    } catch (t) {}
                  return ie[t];
                }
                function re(t, e) {
                  var i;
                  return (
                    t && (i = r(e) ? se(t) : oe(t, e)) && (Kt = i), Kt._abbr
                  );
                }
                function oe(t, e) {
                  if (null === e) return delete ie[t], null;
                  var i = ee;
                  return (
                    (e.abbr = t),
                    null != ie[t]
                      ? (C(
                          "defineLocaleOverride",
                          "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.",
                        ),
                        (i = ie[t]._config))
                      : null != e.parentLocale &&
                        (null != ie[e.parentLocale]
                          ? (i = ie[e.parentLocale]._config)
                          : C(
                              "parentLocaleUndefined",
                              "specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/",
                            )),
                    (ie[t] = new T(A(i, e))),
                    re(t),
                    ie[t]
                  );
                }
                function se(t) {
                  var e;
                  if (
                    (t && t._locale && t._locale._abbr && (t = t._locale._abbr),
                    !t)
                  )
                    return Kt;
                  if (!s(t)) {
                    if ((e = ae(t))) return e;
                    t = [t];
                  }
                  return (function (t) {
                    for (var e, i, n, a, r = 0; r < t.length; ) {
                      for (
                        e = (a = ne(t[r]).split("-")).length,
                          i = (i = ne(t[r + 1])) ? i.split("-") : null;
                        0 < e;

                      ) {
                        if ((n = ae(a.slice(0, e).join("-")))) return n;
                        if (i && i.length >= e && S(a, i, !0) >= e - 1) break;
                        e--;
                      }
                      r++;
                    }
                    return null;
                  })(t);
                }
                function le(t) {
                  var e,
                    i = t._a;
                  return (
                    i &&
                      -2 === p(t).overflow &&
                      ((e =
                        i[yt] < 0 || 11 < i[yt]
                          ? yt
                          : i[bt] < 1 || i[bt] > Ct(i[vt], i[yt])
                            ? bt
                            : i[xt] < 0 ||
                                24 < i[xt] ||
                                (24 === i[xt] &&
                                  (0 !== i[wt] || 0 !== i[kt] || 0 !== i[St]))
                              ? xt
                              : i[wt] < 0 || 59 < i[wt]
                                ? wt
                                : i[kt] < 0 || 59 < i[kt]
                                  ? kt
                                  : i[St] < 0 || 999 < i[St]
                                    ? St
                                    : -1),
                      p(t)._overflowDayOfYear && (e < vt || bt < e) && (e = bt),
                      p(t)._overflowWeeks && -1 === e && (e = _t),
                      p(t)._overflowWeekday && -1 === e && (e = Mt),
                      (p(t).overflow = e)),
                    t
                  );
                }
                var ue =
                    /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                  de =
                    /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                  ce = /Z|[+-]\d\d(?::?\d\d)?/,
                  he = [
                    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                    ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                    ["YYYY-DDD", /\d{4}-\d{3}/],
                    ["YYYY-MM", /\d{4}-\d\d/, !1],
                    ["YYYYYYMMDD", /[+-]\d{10}/],
                    ["YYYYMMDD", /\d{8}/],
                    ["GGGG[W]WWE", /\d{4}W\d{3}/],
                    ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                    ["YYYYDDD", /\d{7}/],
                  ],
                  fe = [
                    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                    ["HH:mm", /\d\d:\d\d/],
                    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                    ["HHmmss", /\d\d\d\d\d\d/],
                    ["HHmm", /\d\d\d\d/],
                    ["HH", /\d\d/],
                  ],
                  ge = /^\/?Date\((\-?\d+)/i;
                function pe(t) {
                  var e,
                    i,
                    n,
                    a,
                    r,
                    o,
                    s = t._i,
                    l = ue.exec(s) || de.exec(s);
                  if (l) {
                    for (p(t).iso = !0, e = 0, i = he.length; e < i; e++)
                      if (he[e][1].exec(l[1])) {
                        (a = he[e][0]), (n = !1 !== he[e][2]);
                        break;
                      }
                    if (null == a) return void (t._isValid = !1);
                    if (l[3]) {
                      for (e = 0, i = fe.length; e < i; e++)
                        if (fe[e][1].exec(l[3])) {
                          r = (l[2] || " ") + fe[e][0];
                          break;
                        }
                      if (null == r) return void (t._isValid = !1);
                    }
                    if (!n && null != r) return void (t._isValid = !1);
                    if (l[4]) {
                      if (!ce.exec(l[4])) return void (t._isValid = !1);
                      o = "Z";
                    }
                    (t._f = a + (r || "") + (o || "")), ye(t);
                  } else t._isValid = !1;
                }
                function me(t, e, i) {
                  return null != t ? t : null != e ? e : i;
                }
                function ve(t) {
                  var e,
                    i,
                    n,
                    a,
                    r = [];
                  if (!t._d) {
                    var o, s;
                    for (
                      o = t,
                        s = new Date(h.now()),
                        n = o._useUTC
                          ? [
                              s.getUTCFullYear(),
                              s.getUTCMonth(),
                              s.getUTCDate(),
                            ]
                          : [s.getFullYear(), s.getMonth(), s.getDate()],
                        t._w &&
                          null == t._a[bt] &&
                          null == t._a[yt] &&
                          (function (t) {
                            var e, i, n, a, r, o, s, l;
                            null != (e = t._w).GG || null != e.W || null != e.E
                              ? ((r = 1),
                                (o = 4),
                                (i = me(e.GG, t._a[vt], Nt(we(), 1, 4).year)),
                                (n = me(e.W, 1)),
                                ((a = me(e.E, 1)) < 1 || 7 < a) && (l = !0))
                              : ((r = t._locale._week.dow),
                                (o = t._locale._week.doy),
                                (i = me(e.gg, t._a[vt], Nt(we(), r, o).year)),
                                (n = me(e.w, 1)),
                                null != e.d
                                  ? ((a = e.d) < 0 || 6 < a) && (l = !0)
                                  : null != e.e
                                    ? ((a = e.e + r),
                                      (e.e < 0 || 6 < e.e) && (l = !0))
                                    : (a = r));
                            n < 1 || n > Yt(i, r, o)
                              ? (p(t)._overflowWeeks = !0)
                              : null != l
                                ? (p(t)._overflowWeekday = !0)
                                : ((s = Bt(i, n, a, r, o)),
                                  (t._a[vt] = s.year),
                                  (t._dayOfYear = s.dayOfYear));
                          })(t),
                        t._dayOfYear &&
                          ((a = me(t._a[vt], n[vt])),
                          t._dayOfYear > Rt(a) &&
                            (p(t)._overflowDayOfYear = !0),
                          (i = zt(a, 0, t._dayOfYear)),
                          (t._a[yt] = i.getUTCMonth()),
                          (t._a[bt] = i.getUTCDate())),
                        e = 0;
                      e < 3 && null == t._a[e];
                      ++e
                    )
                      t._a[e] = r[e] = n[e];
                    for (; e < 7; e++)
                      t._a[e] = r[e] =
                        null == t._a[e] ? (2 === e ? 1 : 0) : t._a[e];
                    24 === t._a[xt] &&
                      0 === t._a[wt] &&
                      0 === t._a[kt] &&
                      0 === t._a[St] &&
                      ((t._nextDay = !0), (t._a[xt] = 0)),
                      (t._d = (
                        t._useUTC
                          ? zt
                          : function (t, e, i, n, a, r, o) {
                              var s = new Date(t, e, i, n, a, r, o);
                              return (
                                t < 100 &&
                                  0 <= t &&
                                  isFinite(s.getFullYear()) &&
                                  s.setFullYear(t),
                                s
                              );
                            }
                      ).apply(null, r)),
                      null != t._tzm &&
                        t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
                      t._nextDay && (t._a[xt] = 24);
                  }
                }
                function ye(t) {
                  if (t._f !== h.ISO_8601) {
                    (t._a = []), (p(t).empty = !0);
                    var e,
                      i,
                      n,
                      a,
                      r,
                      o,
                      s,
                      l,
                      u = "" + t._i,
                      d = u.length,
                      c = 0;
                    for (
                      n = G(t._f, t._locale).match(B) || [], e = 0;
                      e < n.length;
                      e++
                    )
                      (a = n[e]),
                        (i = (u.match(ct(a, t)) || [])[0]) &&
                          (0 < (r = u.substr(0, u.indexOf(i))).length &&
                            p(t).unusedInput.push(r),
                          (u = u.slice(u.indexOf(i) + i.length)),
                          (c += i.length)),
                        H[a]
                          ? (i ? (p(t).empty = !1) : p(t).unusedTokens.push(a),
                            (o = a),
                            (l = t),
                            null != (s = i) && f(ft, o) && ft[o](s, l._a, l, o))
                          : t._strict && !i && p(t).unusedTokens.push(a);
                    (p(t).charsLeftOver = d - c),
                      0 < u.length && p(t).unusedInput.push(u),
                      t._a[xt] <= 12 &&
                        !0 === p(t).bigHour &&
                        0 < t._a[xt] &&
                        (p(t).bigHour = void 0),
                      (p(t).parsedDateParts = t._a.slice(0)),
                      (p(t).meridiem = t._meridiem),
                      (t._a[xt] = (function (t, e, i) {
                        var n;
                        if (null == i) return e;
                        return null != t.meridiemHour
                          ? t.meridiemHour(e, i)
                          : (null != t.isPM &&
                              ((n = t.isPM(i)) && e < 12 && (e += 12),
                              n || 12 !== e || (e = 0)),
                            e);
                      })(t._locale, t._a[xt], t._meridiem)),
                      ve(t),
                      le(t);
                  } else pe(t);
                }
                function be(t) {
                  var e,
                    i,
                    n,
                    a,
                    r = t._i,
                    o = t._f;
                  return (
                    (t._locale = t._locale || se(t._l)),
                    null === r || (void 0 === o && "" === r)
                      ? v({ nullInput: !0 })
                      : ("string" == typeof r &&
                          (t._i = r = t._locale.preparse(r)),
                        x(r)
                          ? new b(le(r))
                          : (s(o)
                              ? (function (t) {
                                  var e, i, n, a, r;
                                  if (0 === t._f.length)
                                    return (
                                      (p(t).invalidFormat = !0),
                                      (t._d = new Date(NaN))
                                    );
                                  for (a = 0; a < t._f.length; a++)
                                    (r = 0),
                                      (e = y({}, t)),
                                      null != t._useUTC &&
                                        (e._useUTC = t._useUTC),
                                      (e._f = t._f[a]),
                                      ye(e),
                                      m(e) &&
                                        ((r += p(e).charsLeftOver),
                                        (r += 10 * p(e).unusedTokens.length),
                                        (p(e).score = r),
                                        (null == n || r < n) &&
                                          ((n = r), (i = e)));
                                  c(t, i || e);
                                })(t)
                              : u(r)
                                ? (t._d = r)
                                : o
                                  ? ye(t)
                                  : void 0 === (i = (e = t)._i)
                                    ? (e._d = new Date(h.now()))
                                    : u(i)
                                      ? (e._d = new Date(i.valueOf()))
                                      : "string" == typeof i
                                        ? ((n = e),
                                          null === (a = ge.exec(n._i))
                                            ? (pe(n),
                                              !1 === n._isValid &&
                                                (delete n._isValid,
                                                h.createFromInputFallback(n)))
                                            : (n._d = new Date(+a[1])))
                                        : s(i)
                                          ? ((e._a = d(
                                              i.slice(0),
                                              function (t) {
                                                return parseInt(t, 10);
                                              },
                                            )),
                                            ve(e))
                                          : "object" == typeof i
                                            ? (function (t) {
                                                if (!t._d) {
                                                  var e = F(t._i);
                                                  (t._a = d(
                                                    [
                                                      e.year,
                                                      e.month,
                                                      e.day || e.date,
                                                      e.hour,
                                                      e.minute,
                                                      e.second,
                                                      e.millisecond,
                                                    ],
                                                    function (t) {
                                                      return (
                                                        t && parseInt(t, 10)
                                                      );
                                                    },
                                                  )),
                                                    ve(t);
                                                }
                                              })(e)
                                            : "number" == typeof i
                                              ? (e._d = new Date(i))
                                              : h.createFromInputFallback(e),
                            m(t) || (t._d = null),
                            t))
                  );
                }
                function xe(t, e, i, n, a) {
                  var r,
                    o = {};
                  return (
                    "boolean" == typeof i && ((n = i), (i = void 0)),
                    ((l(t) &&
                      (function (t) {
                        var e;
                        for (e in t) return !1;
                        return !0;
                      })(t)) ||
                      (s(t) && 0 === t.length)) &&
                      (t = void 0),
                    (o._isAMomentObject = !0),
                    (o._useUTC = o._isUTC = a),
                    (o._l = i),
                    (o._i = t),
                    (o._f = e),
                    (o._strict = n),
                    (r = new b(le(be(o))))._nextDay &&
                      (r.add(1, "d"), (r._nextDay = void 0)),
                    r
                  );
                }
                function we(t, e, i, n) {
                  return xe(t, e, i, n, !1);
                }
                (h.createFromInputFallback = i(
                  "moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
                  function (t) {
                    t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
                  },
                )),
                  (h.ISO_8601 = function () {});
                var ke = i(
                    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
                    function () {
                      var t = we.apply(null, arguments);
                      return this.isValid() && t.isValid()
                        ? t < this
                          ? this
                          : t
                        : v();
                    },
                  ),
                  Se = i(
                    "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
                    function () {
                      var t = we.apply(null, arguments);
                      return this.isValid() && t.isValid()
                        ? this < t
                          ? this
                          : t
                        : v();
                    },
                  );
                function _e(t, e) {
                  var i, n;
                  if ((1 === e.length && s(e[0]) && (e = e[0]), !e.length))
                    return we();
                  for (i = e[0], n = 1; n < e.length; ++n)
                    (e[n].isValid() && !e[n][t](i)) || (i = e[n]);
                  return i;
                }
                function Me(t) {
                  var e = F(t),
                    i = e.year || 0,
                    n = e.quarter || 0,
                    a = e.month || 0,
                    r = e.week || 0,
                    o = e.day || 0,
                    s = e.hour || 0,
                    l = e.minute || 0,
                    u = e.second || 0,
                    d = e.millisecond || 0;
                  (this._milliseconds =
                    +d + 1e3 * u + 6e4 * l + 1e3 * s * 60 * 60),
                    (this._days = +o + 7 * r),
                    (this._months = +a + 3 * n + 12 * i),
                    (this._data = {}),
                    (this._locale = se()),
                    this._bubble();
                }
                function Ce(t) {
                  return t instanceof Me;
                }
                function De(t, i) {
                  U(t, 0, 0, function () {
                    var t = this.utcOffset(),
                      e = "+";
                    return (
                      t < 0 && ((t = -t), (e = "-")),
                      e + E(~~(t / 60), 2) + i + E(~~t % 60, 2)
                    );
                  });
                }
                De("Z", ":"),
                  De("ZZ", ""),
                  dt("Z", st),
                  dt("ZZ", st),
                  gt(["Z", "ZZ"], function (t, e, i) {
                    (i._useUTC = !0), (i._tzm = Te(st, t));
                  });
                var Ae = /([\+\-]|\d\d)/gi;
                function Te(t, e) {
                  var i = (e || "").match(t) || [],
                    n = ((i[i.length - 1] || []) + "").match(Ae) || ["-", 0, 0],
                    a = 60 * n[1] + k(n[2]);
                  return "+" === n[0] ? a : -a;
                }
                function Pe(t, e) {
                  var i, n;
                  return e._isUTC
                    ? ((i = e.clone()),
                      (n =
                        (x(t) || u(t) ? t.valueOf() : we(t).valueOf()) -
                        i.valueOf()),
                      i._d.setTime(i._d.valueOf() + n),
                      h.updateOffset(i, !1),
                      i)
                    : we(t).local();
                }
                function Ie(t) {
                  return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
                }
                function Oe() {
                  return !!this.isValid() && this._isUTC && 0 === this._offset;
                }
                h.updateOffset = function () {};
                var Fe =
                    /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
                  Le =
                    /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
                function Re(t, e) {
                  var i,
                    n,
                    a,
                    r = t,
                    o = null;
                  return (
                    Ce(t)
                      ? (r = { ms: t._milliseconds, d: t._days, M: t._months })
                      : "number" == typeof t
                        ? ((r = {}), e ? (r[e] = t) : (r.milliseconds = t))
                        : (o = Fe.exec(t))
                          ? ((i = "-" === o[1] ? -1 : 1),
                            (r = {
                              y: 0,
                              d: k(o[bt]) * i,
                              h: k(o[xt]) * i,
                              m: k(o[wt]) * i,
                              s: k(o[kt]) * i,
                              ms: k(o[St]) * i,
                            }))
                          : (o = Le.exec(t))
                            ? ((i = "-" === o[1] ? -1 : 1),
                              (r = {
                                y: Ve(o[2], i),
                                M: Ve(o[3], i),
                                w: Ve(o[4], i),
                                d: Ve(o[5], i),
                                h: Ve(o[6], i),
                                m: Ve(o[7], i),
                                s: Ve(o[8], i),
                              }))
                            : null == r
                              ? (r = {})
                              : "object" == typeof r &&
                                ("from" in r || "to" in r) &&
                                ((a = (function (t, e) {
                                  var i;
                                  if (!t.isValid() || !e.isValid())
                                    return { milliseconds: 0, months: 0 };
                                  (e = Pe(e, t)),
                                    t.isBefore(e)
                                      ? (i = We(t, e))
                                      : (((i = We(e, t)).milliseconds =
                                          -i.milliseconds),
                                        (i.months = -i.months));
                                  return i;
                                })(we(r.from), we(r.to))),
                                ((r = {}).ms = a.milliseconds),
                                (r.M = a.months)),
                    (n = new Me(r)),
                    Ce(t) && f(t, "_locale") && (n._locale = t._locale),
                    n
                  );
                }
                function Ve(t, e) {
                  var i = t && parseFloat(t.replace(",", "."));
                  return (isNaN(i) ? 0 : i) * e;
                }
                function We(t, e) {
                  var i = { milliseconds: 0, months: 0 };
                  return (
                    (i.months =
                      e.month() - t.month() + 12 * (e.year() - t.year())),
                    t.clone().add(i.months, "M").isAfter(e) && --i.months,
                    (i.milliseconds = +e - +t.clone().add(i.months, "M")),
                    i
                  );
                }
                function ze(t) {
                  return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t);
                }
                function Ee(n, a) {
                  return function (t, e) {
                    var i;
                    return (
                      null === e ||
                        isNaN(+e) ||
                        (C(
                          a,
                          "moment()." +
                            a +
                            "(period, number) is deprecated. Please use moment()." +
                            a +
                            "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.",
                        ),
                        (i = t),
                        (t = e),
                        (e = i)),
                      Be(this, Re((t = "string" == typeof t ? +t : t), e), n),
                      this
                    );
                  };
                }
                function Be(t, e, i, n) {
                  var a = e._milliseconds,
                    r = ze(e._days),
                    o = ze(e._months);
                  t.isValid() &&
                    ((n = null == n || n),
                    a && t._d.setTime(t._d.valueOf() + a * i),
                    r && z(t, "Date", W(t, "Date") + r * i),
                    o && Pt(t, W(t, "Month") + o * i),
                    n && h.updateOffset(t, r || o));
                }
                Re.fn = Me.prototype;
                var Ne = Ee(1, "add"),
                  Ye = Ee(-1, "subtract");
                function He(t) {
                  var e;
                  return void 0 === t
                    ? this._locale._abbr
                    : (null != (e = se(t)) && (this._locale = e), this);
                }
                (h.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
                  (h.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
                var Ue = i(
                  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
                  function (t) {
                    return void 0 === t ? this.localeData() : this.locale(t);
                  },
                );
                function je() {
                  return this._locale;
                }
                function Ge(t, e) {
                  U(0, [t, t.length], 0, e);
                }
                function qe(t, e, i, n, a) {
                  var r;
                  return null == t
                    ? Nt(this, n, a).year
                    : ((r = Yt(t, n, a)) < e && (e = r),
                      function (t, e, i, n, a) {
                        var r = Bt(t, e, i, n, a),
                          o = zt(r.year, 0, r.dayOfYear);
                        return (
                          this.year(o.getUTCFullYear()),
                          this.month(o.getUTCMonth()),
                          this.date(o.getUTCDate()),
                          this
                        );
                      }.call(this, t, e, i, n, a));
                }
                U(0, ["gg", 2], 0, function () {
                  return this.weekYear() % 100;
                }),
                  U(0, ["GG", 2], 0, function () {
                    return this.isoWeekYear() % 100;
                  }),
                  Ge("gggg", "weekYear"),
                  Ge("ggggg", "weekYear"),
                  Ge("GGGG", "isoWeekYear"),
                  Ge("GGGGG", "isoWeekYear"),
                  I("weekYear", "gg"),
                  I("isoWeekYear", "GG"),
                  R("weekYear", 1),
                  R("isoWeekYear", 1),
                  dt("G", rt),
                  dt("g", rt),
                  dt("GG", $, X),
                  dt("gg", $, X),
                  dt("GGGG", it, J),
                  dt("gggg", it, J),
                  dt("GGGGG", nt, Q),
                  dt("ggggg", nt, Q),
                  pt(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, n) {
                    e[n.substr(0, 2)] = k(t);
                  }),
                  pt(["gg", "GG"], function (t, e, i, n) {
                    e[n] = h.parseTwoDigitYear(t);
                  }),
                  U("Q", 0, "Qo", "quarter"),
                  I("quarter", "Q"),
                  R("quarter", 7),
                  dt("Q", q),
                  gt("Q", function (t, e) {
                    e[yt] = 3 * (k(t) - 1);
                  }),
                  U("D", ["DD", 2], "Do", "date"),
                  I("date", "D"),
                  R("date", 9),
                  dt("D", $),
                  dt("DD", $, X),
                  dt("Do", function (t, e) {
                    return t ? e._ordinalParse : e._ordinalParseLenient;
                  }),
                  gt(["D", "DD"], bt),
                  gt("Do", function (t, e) {
                    e[bt] = k(t.match($)[0]);
                  });
                var Xe = V("Date", !0);
                U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
                  I("dayOfYear", "DDD"),
                  R("dayOfYear", 4),
                  dt("DDD", et),
                  dt("DDDD", Z),
                  gt(["DDD", "DDDD"], function (t, e, i) {
                    i._dayOfYear = k(t);
                  }),
                  U("m", ["mm", 2], 0, "minute"),
                  I("minute", "m"),
                  R("minute", 14),
                  dt("m", $),
                  dt("mm", $, X),
                  gt(["m", "mm"], wt);
                var Ze = V("Minutes", !1);
                U("s", ["ss", 2], 0, "second"),
                  I("second", "s"),
                  R("second", 15),
                  dt("s", $),
                  dt("ss", $, X),
                  gt(["s", "ss"], kt);
                var Je,
                  Qe = V("Seconds", !1);
                for (
                  U("S", 0, 0, function () {
                    return ~~(this.millisecond() / 100);
                  }),
                    U(0, ["SS", 2], 0, function () {
                      return ~~(this.millisecond() / 10);
                    }),
                    U(0, ["SSS", 3], 0, "millisecond"),
                    U(0, ["SSSS", 4], 0, function () {
                      return 10 * this.millisecond();
                    }),
                    U(0, ["SSSSS", 5], 0, function () {
                      return 100 * this.millisecond();
                    }),
                    U(0, ["SSSSSS", 6], 0, function () {
                      return 1e3 * this.millisecond();
                    }),
                    U(0, ["SSSSSSS", 7], 0, function () {
                      return 1e4 * this.millisecond();
                    }),
                    U(0, ["SSSSSSSS", 8], 0, function () {
                      return 1e5 * this.millisecond();
                    }),
                    U(0, ["SSSSSSSSS", 9], 0, function () {
                      return 1e6 * this.millisecond();
                    }),
                    I("millisecond", "ms"),
                    R("millisecond", 16),
                    dt("S", et, q),
                    dt("SS", et, X),
                    dt("SSS", et, Z),
                    Je = "SSSS";
                  Je.length <= 9;
                  Je += "S"
                )
                  dt(Je, at);
                function $e(t, e) {
                  e[St] = k(1e3 * ("0." + t));
                }
                for (Je = "S"; Je.length <= 9; Je += "S") gt(Je, $e);
                var Ke = V("Milliseconds", !1);
                U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
                var ti = b.prototype;
                (ti.add = Ne),
                  (ti.calendar = function (t, e) {
                    var i = t || we(),
                      n = Pe(i, this).startOf("day"),
                      a = h.calendarFormat(this, n) || "sameElse",
                      r = e && (D(e[a]) ? e[a].call(this, i) : e[a]);
                    return this.format(
                      r || this.localeData().calendar(a, this, we(i)),
                    );
                  }),
                  (ti.clone = function () {
                    return new b(this);
                  }),
                  (ti.diff = function (t, e, i) {
                    var n, a, r, o;
                    return this.isValid() && (n = Pe(t, this)).isValid()
                      ? ((a = 6e4 * (n.utcOffset() - this.utcOffset())),
                        "year" === (e = O(e)) ||
                        "month" === e ||
                        "quarter" === e
                          ? ((s = this),
                            (l = n),
                            (c =
                              12 * (l.year() - s.year()) +
                              (l.month() - s.month())),
                            (h = s.clone().add(c, "months")),
                            (d =
                              l - h < 0
                                ? ((u = s.clone().add(c - 1, "months")),
                                  (l - h) / (h - u))
                                : ((u = s.clone().add(c + 1, "months")),
                                  (l - h) / (u - h))),
                            (o = -(c + d) || 0),
                            "quarter" === e
                              ? (o /= 3)
                              : "year" === e && (o /= 12))
                          : ((r = this - n),
                            (o =
                              "second" === e
                                ? r / 1e3
                                : "minute" === e
                                  ? r / 6e4
                                  : "hour" === e
                                    ? r / 36e5
                                    : "day" === e
                                      ? (r - a) / 864e5
                                      : "week" === e
                                        ? (r - a) / 6048e5
                                        : r)),
                        i ? o : w(o))
                      : NaN;
                    var s, l, u, d, c, h;
                  }),
                  (ti.endOf = function (t) {
                    return void 0 === (t = O(t)) || "millisecond" === t
                      ? this
                      : ("date" === t && (t = "day"),
                        this.startOf(t)
                          .add(1, "isoWeek" === t ? "week" : t)
                          .subtract(1, "ms"));
                  }),
                  (ti.format = function (t) {
                    t ||
                      (t = this.isUtc() ? h.defaultFormatUtc : h.defaultFormat);
                    var e = j(this, t);
                    return this.localeData().postformat(e);
                  }),
                  (ti.from = function (t, e) {
                    return this.isValid() &&
                      ((x(t) && t.isValid()) || we(t).isValid())
                      ? Re({ to: this, from: t })
                          .locale(this.locale())
                          .humanize(!e)
                      : this.localeData().invalidDate();
                  }),
                  (ti.fromNow = function (t) {
                    return this.from(we(), t);
                  }),
                  (ti.to = function (t, e) {
                    return this.isValid() &&
                      ((x(t) && t.isValid()) || we(t).isValid())
                      ? Re({ from: this, to: t })
                          .locale(this.locale())
                          .humanize(!e)
                      : this.localeData().invalidDate();
                  }),
                  (ti.toNow = function (t) {
                    return this.to(we(), t);
                  }),
                  (ti.get = function (t) {
                    return D(this[(t = O(t))]) ? this[t]() : this;
                  }),
                  (ti.invalidAt = function () {
                    return p(this).overflow;
                  }),
                  (ti.isAfter = function (t, e) {
                    var i = x(t) ? t : we(t);
                    return (
                      !(!this.isValid() || !i.isValid()) &&
                      ("millisecond" === (e = O(r(e) ? "millisecond" : e))
                        ? this.valueOf() > i.valueOf()
                        : i.valueOf() < this.clone().startOf(e).valueOf())
                    );
                  }),
                  (ti.isBefore = function (t, e) {
                    var i = x(t) ? t : we(t);
                    return (
                      !(!this.isValid() || !i.isValid()) &&
                      ("millisecond" === (e = O(r(e) ? "millisecond" : e))
                        ? this.valueOf() < i.valueOf()
                        : this.clone().endOf(e).valueOf() < i.valueOf())
                    );
                  }),
                  (ti.isBetween = function (t, e, i, n) {
                    return (
                      ("(" === (n = n || "()")[0]
                        ? this.isAfter(t, i)
                        : !this.isBefore(t, i)) &&
                      (")" === n[1] ? this.isBefore(e, i) : !this.isAfter(e, i))
                    );
                  }),
                  (ti.isSame = function (t, e) {
                    var i,
                      n = x(t) ? t : we(t);
                    return (
                      !(!this.isValid() || !n.isValid()) &&
                      ("millisecond" === (e = O(e || "millisecond"))
                        ? this.valueOf() === n.valueOf()
                        : ((i = n.valueOf()),
                          this.clone().startOf(e).valueOf() <= i &&
                            i <= this.clone().endOf(e).valueOf()))
                    );
                  }),
                  (ti.isSameOrAfter = function (t, e) {
                    return this.isSame(t, e) || this.isAfter(t, e);
                  }),
                  (ti.isSameOrBefore = function (t, e) {
                    return this.isSame(t, e) || this.isBefore(t, e);
                  }),
                  (ti.isValid = function () {
                    return m(this);
                  }),
                  (ti.lang = Ue),
                  (ti.locale = He),
                  (ti.localeData = je),
                  (ti.max = Se),
                  (ti.min = ke),
                  (ti.parsingFlags = function () {
                    return c({}, p(this));
                  }),
                  (ti.set = function (t, e) {
                    if ("object" == typeof t)
                      for (
                        var i = (function (t) {
                            var e = [];
                            for (var i in t)
                              e.push({ unit: i, priority: L[i] });
                            return (
                              e.sort(function (t, e) {
                                return t.priority - e.priority;
                              }),
                              e
                            );
                          })((t = F(t))),
                          n = 0;
                        n < i.length;
                        n++
                      )
                        this[i[n].unit](t[i[n].unit]);
                    else if (D(this[(t = O(t))])) return this[t](e);
                    return this;
                  }),
                  (ti.startOf = function (t) {
                    switch ((t = O(t))) {
                      case "year":
                        this.month(0);
                      case "quarter":
                      case "month":
                        this.date(1);
                      case "week":
                      case "isoWeek":
                      case "day":
                      case "date":
                        this.hours(0);
                      case "hour":
                        this.minutes(0);
                      case "minute":
                        this.seconds(0);
                      case "second":
                        this.milliseconds(0);
                    }
                    return (
                      "week" === t && this.weekday(0),
                      "isoWeek" === t && this.isoWeekday(1),
                      "quarter" === t &&
                        this.month(3 * Math.floor(this.month() / 3)),
                      this
                    );
                  }),
                  (ti.subtract = Ye),
                  (ti.toArray = function () {
                    var t = this;
                    return [
                      t.year(),
                      t.month(),
                      t.date(),
                      t.hour(),
                      t.minute(),
                      t.second(),
                      t.millisecond(),
                    ];
                  }),
                  (ti.toObject = function () {
                    var t = this;
                    return {
                      years: t.year(),
                      months: t.month(),
                      date: t.date(),
                      hours: t.hours(),
                      minutes: t.minutes(),
                      seconds: t.seconds(),
                      milliseconds: t.milliseconds(),
                    };
                  }),
                  (ti.toDate = function () {
                    return new Date(this.valueOf());
                  }),
                  (ti.toISOString = function () {
                    var t = this.clone().utc();
                    return 0 < t.year() && t.year() <= 9999
                      ? D(Date.prototype.toISOString)
                        ? this.toDate().toISOString()
                        : j(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                      : j(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
                  }),
                  (ti.toJSON = function () {
                    return this.isValid() ? this.toISOString() : null;
                  }),
                  (ti.toString = function () {
                    return this.clone()
                      .locale("en")
                      .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
                  }),
                  (ti.unix = function () {
                    return Math.floor(this.valueOf() / 1e3);
                  }),
                  (ti.valueOf = function () {
                    return this._d.valueOf() - 6e4 * (this._offset || 0);
                  }),
                  (ti.creationData = function () {
                    return {
                      input: this._i,
                      format: this._f,
                      locale: this._locale,
                      isUTC: this._isUTC,
                      strict: this._strict,
                    };
                  }),
                  (ti.year = Wt),
                  (ti.isLeapYear = function () {
                    return Vt(this.year());
                  }),
                  (ti.weekYear = function (t) {
                    return qe.call(
                      this,
                      t,
                      this.week(),
                      this.weekday(),
                      this.localeData()._week.dow,
                      this.localeData()._week.doy,
                    );
                  }),
                  (ti.isoWeekYear = function (t) {
                    return qe.call(
                      this,
                      t,
                      this.isoWeek(),
                      this.isoWeekday(),
                      1,
                      4,
                    );
                  }),
                  (ti.quarter = ti.quarters =
                    function (t) {
                      return null == t
                        ? Math.ceil((this.month() + 1) / 3)
                        : this.month(3 * (t - 1) + (this.month() % 3));
                    }),
                  (ti.month = It),
                  (ti.daysInMonth = function () {
                    return Ct(this.year(), this.month());
                  }),
                  (ti.week = ti.weeks =
                    function (t) {
                      var e = this.localeData().week(this);
                      return null == t ? e : this.add(7 * (t - e), "d");
                    }),
                  (ti.isoWeek = ti.isoWeeks =
                    function (t) {
                      var e = Nt(this, 1, 4).week;
                      return null == t ? e : this.add(7 * (t - e), "d");
                    }),
                  (ti.weeksInYear = function () {
                    var t = this.localeData()._week;
                    return Yt(this.year(), t.dow, t.doy);
                  }),
                  (ti.isoWeeksInYear = function () {
                    return Yt(this.year(), 1, 4);
                  }),
                  (ti.date = Xe),
                  (ti.day = ti.days =
                    function (t) {
                      if (!this.isValid()) return null != t ? this : NaN;
                      var e,
                        i,
                        n = this._isUTC
                          ? this._d.getUTCDay()
                          : this._d.getDay();
                      return null != t
                        ? ((e = t),
                          (i = this.localeData()),
                          (t =
                            "string" != typeof e
                              ? e
                              : isNaN(e)
                                ? "number" == typeof (e = i.weekdaysParse(e))
                                  ? e
                                  : null
                                : parseInt(e, 10)),
                          this.add(t - n, "d"))
                        : n;
                    }),
                  (ti.weekday = function (t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return null == t ? e : this.add(t - e, "d");
                  }),
                  (ti.isoWeekday = function (t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    if (null == t) return this.day() || 7;
                    var e,
                      i,
                      n =
                        ((e = t),
                        (i = this.localeData()),
                        "string" == typeof e
                          ? i.weekdaysParse(e) % 7 || 7
                          : isNaN(e)
                            ? null
                            : e);
                    return this.day(this.day() % 7 ? n : n - 7);
                  }),
                  (ti.dayOfYear = function (t) {
                    var e =
                      Math.round(
                        (this.clone().startOf("day") -
                          this.clone().startOf("year")) /
                          864e5,
                      ) + 1;
                    return null == t ? e : this.add(t - e, "d");
                  }),
                  (ti.hour = ti.hours = te),
                  (ti.minute = ti.minutes = Ze),
                  (ti.second = ti.seconds = Qe),
                  (ti.millisecond = ti.milliseconds = Ke),
                  (ti.utcOffset = function (t, e) {
                    var i,
                      n = this._offset || 0;
                    return this.isValid()
                      ? null != t
                        ? ("string" == typeof t
                            ? (t = Te(st, t))
                            : Math.abs(t) < 16 && (t *= 60),
                          !this._isUTC && e && (i = Ie(this)),
                          (this._offset = t),
                          (this._isUTC = !0),
                          null != i && this.add(i, "m"),
                          n !== t &&
                            (!e || this._changeInProgress
                              ? Be(this, Re(t - n, "m"), 1, !1)
                              : this._changeInProgress ||
                                ((this._changeInProgress = !0),
                                h.updateOffset(this, !0),
                                (this._changeInProgress = null))),
                          this)
                        : this._isUTC
                          ? n
                          : Ie(this)
                      : null != t
                        ? this
                        : NaN;
                  }),
                  (ti.utc = function (t) {
                    return this.utcOffset(0, t);
                  }),
                  (ti.local = function (t) {
                    return (
                      this._isUTC &&
                        (this.utcOffset(0, t),
                        (this._isUTC = !1),
                        t && this.subtract(Ie(this), "m")),
                      this
                    );
                  }),
                  (ti.parseZone = function () {
                    return (
                      this._tzm
                        ? this.utcOffset(this._tzm)
                        : "string" == typeof this._i &&
                          this.utcOffset(Te(ot, this._i)),
                      this
                    );
                  }),
                  (ti.hasAlignedHourOffset = function (t) {
                    return (
                      !!this.isValid() &&
                      ((t = t ? we(t).utcOffset() : 0),
                      (this.utcOffset() - t) % 60 == 0)
                    );
                  }),
                  (ti.isDST = function () {
                    return (
                      this.utcOffset() > this.clone().month(0).utcOffset() ||
                      this.utcOffset() > this.clone().month(5).utcOffset()
                    );
                  }),
                  (ti.isLocal = function () {
                    return !!this.isValid() && !this._isUTC;
                  }),
                  (ti.isUtcOffset = function () {
                    return !!this.isValid() && this._isUTC;
                  }),
                  (ti.isUtc = Oe),
                  (ti.isUTC = Oe),
                  (ti.zoneAbbr = function () {
                    return this._isUTC ? "UTC" : "";
                  }),
                  (ti.zoneName = function () {
                    return this._isUTC ? "Coordinated Universal Time" : "";
                  }),
                  (ti.dates = i(
                    "dates accessor is deprecated. Use date instead.",
                    Xe,
                  )),
                  (ti.months = i(
                    "months accessor is deprecated. Use month instead",
                    It,
                  )),
                  (ti.years = i(
                    "years accessor is deprecated. Use year instead",
                    Wt,
                  )),
                  (ti.zone = i(
                    "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
                    function (t, e) {
                      return null != t
                        ? ("string" != typeof t && (t = -t),
                          this.utcOffset(t, e),
                          this)
                        : -this.utcOffset();
                    },
                  )),
                  (ti.isDSTShifted = i(
                    "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
                    function () {
                      if (!r(this._isDSTShifted)) return this._isDSTShifted;
                      var t = {};
                      if ((y(t, this), (t = be(t))._a)) {
                        var e = t._isUTC ? g(t._a) : we(t._a);
                        this._isDSTShifted =
                          this.isValid() && 0 < S(t._a, e.toArray());
                      } else this._isDSTShifted = !1;
                      return this._isDSTShifted;
                    },
                  ));
                var ei = ti;
                function ii(t) {
                  return t;
                }
                var ni = T.prototype;
                function ai(t, e, i, n) {
                  var a = se(),
                    r = g().set(n, e);
                  return a[i](r, t);
                }
                function ri(t, e, i) {
                  if (
                    ("number" == typeof t && ((e = t), (t = void 0)),
                    (t = t || ""),
                    null != e)
                  )
                    return ai(t, e, i, "month");
                  var n,
                    a = [];
                  for (n = 0; n < 12; n++) a[n] = ai(t, n, i, "month");
                  return a;
                }
                function oi(t, e, i, n) {
                  e =
                    ("boolean" == typeof t
                      ? "number" == typeof e && ((i = e), (e = void 0))
                      : ((e = t),
                        (t = !1),
                        "number" == typeof (i = e) && ((i = e), (e = void 0))),
                    e || "");
                  var a,
                    r = se(),
                    o = t ? r._week.dow : 0;
                  if (null != i) return ai(e, (i + o) % 7, n, "day");
                  var s = [];
                  for (a = 0; a < 7; a++) s[a] = ai(e, (a + o) % 7, n, "day");
                  return s;
                }
                (ni.calendar = function (t, e, i) {
                  var n = this._calendar[t] || this._calendar.sameElse;
                  return D(n) ? n.call(e, i) : n;
                }),
                  (ni.longDateFormat = function (t) {
                    var e = this._longDateFormat[t],
                      i = this._longDateFormat[t.toUpperCase()];
                    return e || !i
                      ? e
                      : ((this._longDateFormat[t] = i.replace(
                          /MMMM|MM|DD|dddd/g,
                          function (t) {
                            return t.slice(1);
                          },
                        )),
                        this._longDateFormat[t]);
                  }),
                  (ni.invalidDate = function () {
                    return this._invalidDate;
                  }),
                  (ni.ordinal = function (t) {
                    return this._ordinal.replace("%d", t);
                  }),
                  (ni.preparse = ii),
                  (ni.postformat = ii),
                  (ni.relativeTime = function (t, e, i, n) {
                    var a = this._relativeTime[i];
                    return D(a) ? a(t, e, i, n) : a.replace(/%d/i, t);
                  }),
                  (ni.pastFuture = function (t, e) {
                    var i = this._relativeTime[0 < t ? "future" : "past"];
                    return D(i) ? i(e) : i.replace(/%s/i, e);
                  }),
                  (ni.set = function (t) {
                    var e, i;
                    for (i in t)
                      D((e = t[i])) ? (this[i] = e) : (this["_" + i] = e);
                    (this._config = t),
                      (this._ordinalParseLenient = new RegExp(
                        this._ordinalParse.source + "|" + /\d{1,2}/.source,
                      ));
                  }),
                  (ni.months = function (t, e) {
                    return s(this._months)
                      ? this._months[t.month()]
                      : this._months[
                          (this._months.isFormat || Dt).test(e)
                            ? "format"
                            : "standalone"
                        ][t.month()];
                  }),
                  (ni.monthsShort = function (t, e) {
                    return s(this._monthsShort)
                      ? this._monthsShort[t.month()]
                      : this._monthsShort[Dt.test(e) ? "format" : "standalone"][
                          t.month()
                        ];
                  }),
                  (ni.monthsParse = function (t, e, i) {
                    var n, a, r;
                    if (this._monthsParseExact)
                      return function (t, e, i) {
                        var n,
                          a,
                          r,
                          o = t.toLocaleLowerCase();
                        if (!this._monthsParse)
                          for (
                            this._monthsParse = [],
                              this._longMonthsParse = [],
                              this._shortMonthsParse = [],
                              n = 0;
                            n < 12;
                            ++n
                          )
                            (r = g([2e3, n])),
                              (this._shortMonthsParse[n] = this.monthsShort(
                                r,
                                "",
                              ).toLocaleLowerCase()),
                              (this._longMonthsParse[n] = this.months(
                                r,
                                "",
                              ).toLocaleLowerCase());
                        return i
                          ? "MMM" === e
                            ? -1 !== (a = mt.call(this._shortMonthsParse, o))
                              ? a
                              : null
                            : -1 !== (a = mt.call(this._longMonthsParse, o))
                              ? a
                              : null
                          : "MMM" === e
                            ? -1 !== (a = mt.call(this._shortMonthsParse, o))
                              ? a
                              : -1 !== (a = mt.call(this._longMonthsParse, o))
                                ? a
                                : null
                            : -1 !== (a = mt.call(this._longMonthsParse, o))
                              ? a
                              : -1 !== (a = mt.call(this._shortMonthsParse, o))
                                ? a
                                : null;
                      }.call(this, t, e, i);
                    for (
                      this._monthsParse ||
                        ((this._monthsParse = []),
                        (this._longMonthsParse = []),
                        (this._shortMonthsParse = [])),
                        n = 0;
                      n < 12;
                      n++
                    ) {
                      if (
                        ((a = g([2e3, n])),
                        i &&
                          !this._longMonthsParse[n] &&
                          ((this._longMonthsParse[n] = new RegExp(
                            "^" + this.months(a, "").replace(".", "") + "$",
                            "i",
                          )),
                          (this._shortMonthsParse[n] = new RegExp(
                            "^" +
                              this.monthsShort(a, "").replace(".", "") +
                              "$",
                            "i",
                          ))),
                        i ||
                          this._monthsParse[n] ||
                          ((r =
                            "^" +
                            this.months(a, "") +
                            "|^" +
                            this.monthsShort(a, "")),
                          (this._monthsParse[n] = new RegExp(
                            r.replace(".", ""),
                            "i",
                          ))),
                        i && "MMMM" === e && this._longMonthsParse[n].test(t))
                      )
                        return n;
                      if (i && "MMM" === e && this._shortMonthsParse[n].test(t))
                        return n;
                      if (!i && this._monthsParse[n].test(t)) return n;
                    }
                  }),
                  (ni.monthsRegex = function (t) {
                    return this._monthsParseExact
                      ? (f(this, "_monthsRegex") || Lt.call(this),
                        t ? this._monthsStrictRegex : this._monthsRegex)
                      : (f(this, "_monthsRegex") || (this._monthsRegex = Ft),
                        this._monthsStrictRegex && t
                          ? this._monthsStrictRegex
                          : this._monthsRegex);
                  }),
                  (ni.monthsShortRegex = function (t) {
                    return this._monthsParseExact
                      ? (f(this, "_monthsRegex") || Lt.call(this),
                        t
                          ? this._monthsShortStrictRegex
                          : this._monthsShortRegex)
                      : (f(this, "_monthsShortRegex") ||
                          (this._monthsShortRegex = Ot),
                        this._monthsShortStrictRegex && t
                          ? this._monthsShortStrictRegex
                          : this._monthsShortRegex);
                  }),
                  (ni.week = function (t) {
                    return Nt(t, this._week.dow, this._week.doy).week;
                  }),
                  (ni.firstDayOfYear = function () {
                    return this._week.doy;
                  }),
                  (ni.firstDayOfWeek = function () {
                    return this._week.dow;
                  }),
                  (ni.weekdays = function (t, e) {
                    return s(this._weekdays)
                      ? this._weekdays[t.day()]
                      : this._weekdays[
                          this._weekdays.isFormat.test(e)
                            ? "format"
                            : "standalone"
                        ][t.day()];
                  }),
                  (ni.weekdaysMin = function (t) {
                    return this._weekdaysMin[t.day()];
                  }),
                  (ni.weekdaysShort = function (t) {
                    return this._weekdaysShort[t.day()];
                  }),
                  (ni.weekdaysParse = function (t, e, i) {
                    var n, a, r;
                    if (this._weekdaysParseExact)
                      return function (t, e, i) {
                        var n,
                          a,
                          r,
                          o = t.toLocaleLowerCase();
                        if (!this._weekdaysParse)
                          for (
                            this._weekdaysParse = [],
                              this._shortWeekdaysParse = [],
                              this._minWeekdaysParse = [],
                              n = 0;
                            n < 7;
                            ++n
                          )
                            (r = g([2e3, 1]).day(n)),
                              (this._minWeekdaysParse[n] = this.weekdaysMin(
                                r,
                                "",
                              ).toLocaleLowerCase()),
                              (this._shortWeekdaysParse[n] = this.weekdaysShort(
                                r,
                                "",
                              ).toLocaleLowerCase()),
                              (this._weekdaysParse[n] = this.weekdays(
                                r,
                                "",
                              ).toLocaleLowerCase());
                        return i
                          ? "dddd" === e
                            ? -1 !== (a = mt.call(this._weekdaysParse, o))
                              ? a
                              : null
                            : "ddd" === e
                              ? -1 !==
                                (a = mt.call(this._shortWeekdaysParse, o))
                                ? a
                                : null
                              : -1 !== (a = mt.call(this._minWeekdaysParse, o))
                                ? a
                                : null
                          : "dddd" === e
                            ? -1 !== (a = mt.call(this._weekdaysParse, o))
                              ? a
                              : -1 !==
                                  (a = mt.call(this._shortWeekdaysParse, o))
                                ? a
                                : -1 !==
                                    (a = mt.call(this._minWeekdaysParse, o))
                                  ? a
                                  : null
                            : "ddd" === e
                              ? -1 !==
                                (a = mt.call(this._shortWeekdaysParse, o))
                                ? a
                                : -1 !== (a = mt.call(this._weekdaysParse, o))
                                  ? a
                                  : -1 !==
                                      (a = mt.call(this._minWeekdaysParse, o))
                                    ? a
                                    : null
                              : -1 !== (a = mt.call(this._minWeekdaysParse, o))
                                ? a
                                : -1 !== (a = mt.call(this._weekdaysParse, o))
                                  ? a
                                  : -1 !==
                                      (a = mt.call(this._shortWeekdaysParse, o))
                                    ? a
                                    : null;
                      }.call(this, t, e, i);
                    for (
                      this._weekdaysParse ||
                        ((this._weekdaysParse = []),
                        (this._minWeekdaysParse = []),
                        (this._shortWeekdaysParse = []),
                        (this._fullWeekdaysParse = [])),
                        n = 0;
                      n < 7;
                      n++
                    ) {
                      if (
                        ((a = g([2e3, 1]).day(n)),
                        i &&
                          !this._fullWeekdaysParse[n] &&
                          ((this._fullWeekdaysParse[n] = new RegExp(
                            "^" + this.weekdays(a, "").replace(".", ".?") + "$",
                            "i",
                          )),
                          (this._shortWeekdaysParse[n] = new RegExp(
                            "^" +
                              this.weekdaysShort(a, "").replace(".", ".?") +
                              "$",
                            "i",
                          )),
                          (this._minWeekdaysParse[n] = new RegExp(
                            "^" +
                              this.weekdaysMin(a, "").replace(".", ".?") +
                              "$",
                            "i",
                          ))),
                        this._weekdaysParse[n] ||
                          ((r =
                            "^" +
                            this.weekdays(a, "") +
                            "|^" +
                            this.weekdaysShort(a, "") +
                            "|^" +
                            this.weekdaysMin(a, "")),
                          (this._weekdaysParse[n] = new RegExp(
                            r.replace(".", ""),
                            "i",
                          ))),
                        i && "dddd" === e && this._fullWeekdaysParse[n].test(t))
                      )
                        return n;
                      if (
                        i &&
                        "ddd" === e &&
                        this._shortWeekdaysParse[n].test(t)
                      )
                        return n;
                      if (i && "dd" === e && this._minWeekdaysParse[n].test(t))
                        return n;
                      if (!i && this._weekdaysParse[n].test(t)) return n;
                    }
                  }),
                  (ni.weekdaysRegex = function (t) {
                    return this._weekdaysParseExact
                      ? (f(this, "_weekdaysRegex") || Zt.call(this),
                        t ? this._weekdaysStrictRegex : this._weekdaysRegex)
                      : (f(this, "_weekdaysRegex") ||
                          (this._weekdaysRegex = Gt),
                        this._weekdaysStrictRegex && t
                          ? this._weekdaysStrictRegex
                          : this._weekdaysRegex);
                  }),
                  (ni.weekdaysShortRegex = function (t) {
                    return this._weekdaysParseExact
                      ? (f(this, "_weekdaysRegex") || Zt.call(this),
                        t
                          ? this._weekdaysShortStrictRegex
                          : this._weekdaysShortRegex)
                      : (f(this, "_weekdaysShortRegex") ||
                          (this._weekdaysShortRegex = qt),
                        this._weekdaysShortStrictRegex && t
                          ? this._weekdaysShortStrictRegex
                          : this._weekdaysShortRegex);
                  }),
                  (ni.weekdaysMinRegex = function (t) {
                    return this._weekdaysParseExact
                      ? (f(this, "_weekdaysRegex") || Zt.call(this),
                        t
                          ? this._weekdaysMinStrictRegex
                          : this._weekdaysMinRegex)
                      : (f(this, "_weekdaysMinRegex") ||
                          (this._weekdaysMinRegex = Xt),
                        this._weekdaysMinStrictRegex && t
                          ? this._weekdaysMinStrictRegex
                          : this._weekdaysMinRegex);
                  }),
                  (ni.isPM = function (t) {
                    return "p" === (t + "").toLowerCase().charAt(0);
                  }),
                  (ni.meridiem = function (t, e, i) {
                    return 11 < t ? (i ? "pm" : "PM") : i ? "am" : "AM";
                  }),
                  re("en", {
                    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function (t) {
                      var e = t % 10;
                      return (
                        t +
                        (1 === k((t % 100) / 10)
                          ? "th"
                          : 1 === e
                            ? "st"
                            : 2 === e
                              ? "nd"
                              : 3 === e
                                ? "rd"
                                : "th")
                      );
                    },
                  }),
                  (h.lang = i(
                    "moment.lang is deprecated. Use moment.locale instead.",
                    re,
                  )),
                  (h.langData = i(
                    "moment.langData is deprecated. Use moment.localeData instead.",
                    se,
                  ));
                var si = Math.abs;
                function li(t, e, i, n) {
                  var a = Re(e, i);
                  return (
                    (t._milliseconds += n * a._milliseconds),
                    (t._days += n * a._days),
                    (t._months += n * a._months),
                    t._bubble()
                  );
                }
                function ui(t) {
                  return t < 0 ? Math.floor(t) : Math.ceil(t);
                }
                function di(t) {
                  return (4800 * t) / 146097;
                }
                function ci(t) {
                  return (146097 * t) / 4800;
                }
                function hi(t) {
                  return function () {
                    return this.as(t);
                  };
                }
                var fi = hi("ms"),
                  gi = hi("s"),
                  pi = hi("m"),
                  mi = hi("h"),
                  vi = hi("d"),
                  yi = hi("w"),
                  bi = hi("M"),
                  xi = hi("y");
                function wi(t) {
                  return function () {
                    return this._data[t];
                  };
                }
                var ki = wi("milliseconds"),
                  Si = wi("seconds"),
                  _i = wi("minutes"),
                  Mi = wi("hours"),
                  Ci = wi("days"),
                  Di = wi("months"),
                  Ai = wi("years");
                var Ti = Math.round,
                  Pi = { s: 45, m: 45, h: 22, d: 26, M: 11 };
                var Ii = Math.abs;
                function Oi() {
                  var t,
                    e,
                    i = Ii(this._milliseconds) / 1e3,
                    n = Ii(this._days),
                    a = Ii(this._months);
                  (e = w((t = w(i / 60)) / 60)), (i %= 60), (t %= 60);
                  var r = w(a / 12),
                    o = (a %= 12),
                    s = n,
                    l = e,
                    u = t,
                    d = i,
                    c = this.asSeconds();
                  return c
                    ? (c < 0 ? "-" : "") +
                        "P" +
                        (r ? r + "Y" : "") +
                        (o ? o + "M" : "") +
                        (s ? s + "D" : "") +
                        (l || u || d ? "T" : "") +
                        (l ? l + "H" : "") +
                        (u ? u + "M" : "") +
                        (d ? d + "S" : "")
                    : "P0D";
                }
                var Fi = Me.prototype;
                return (
                  (Fi.abs = function () {
                    var t = this._data;
                    return (
                      (this._milliseconds = si(this._milliseconds)),
                      (this._days = si(this._days)),
                      (this._months = si(this._months)),
                      (t.milliseconds = si(t.milliseconds)),
                      (t.seconds = si(t.seconds)),
                      (t.minutes = si(t.minutes)),
                      (t.hours = si(t.hours)),
                      (t.months = si(t.months)),
                      (t.years = si(t.years)),
                      this
                    );
                  }),
                  (Fi.add = function (t, e) {
                    return li(this, t, e, 1);
                  }),
                  (Fi.subtract = function (t, e) {
                    return li(this, t, e, -1);
                  }),
                  (Fi.as = function (t) {
                    var e,
                      i,
                      n = this._milliseconds;
                    if ("month" === (t = O(t)) || "year" === t)
                      return (
                        (e = this._days + n / 864e5),
                        (i = this._months + di(e)),
                        "month" === t ? i : i / 12
                      );
                    switch (
                      ((e = this._days + Math.round(ci(this._months))), t)
                    ) {
                      case "week":
                        return e / 7 + n / 6048e5;
                      case "day":
                        return e + n / 864e5;
                      case "hour":
                        return 24 * e + n / 36e5;
                      case "minute":
                        return 1440 * e + n / 6e4;
                      case "second":
                        return 86400 * e + n / 1e3;
                      case "millisecond":
                        return Math.floor(864e5 * e) + n;
                      default:
                        throw new Error("Unknown unit " + t);
                    }
                  }),
                  (Fi.asMilliseconds = fi),
                  (Fi.asSeconds = gi),
                  (Fi.asMinutes = pi),
                  (Fi.asHours = mi),
                  (Fi.asDays = vi),
                  (Fi.asWeeks = yi),
                  (Fi.asMonths = bi),
                  (Fi.asYears = xi),
                  (Fi.valueOf = function () {
                    return (
                      this._milliseconds +
                      864e5 * this._days +
                      (this._months % 12) * 2592e6 +
                      31536e6 * k(this._months / 12)
                    );
                  }),
                  (Fi._bubble = function () {
                    var t,
                      e,
                      i,
                      n,
                      a,
                      r = this._milliseconds,
                      o = this._days,
                      s = this._months,
                      l = this._data;
                    return (
                      (0 <= r && 0 <= o && 0 <= s) ||
                        (r <= 0 && o <= 0 && s <= 0) ||
                        ((r += 864e5 * ui(ci(s) + o)), (s = o = 0)),
                      (l.milliseconds = r % 1e3),
                      (t = w(r / 1e3)),
                      (l.seconds = t % 60),
                      (e = w(t / 60)),
                      (l.minutes = e % 60),
                      (i = w(e / 60)),
                      (l.hours = i % 24),
                      (s += a = w(di((o += w(i / 24))))),
                      (o -= ui(ci(a))),
                      (n = w(s / 12)),
                      (s %= 12),
                      (l.days = o),
                      (l.months = s),
                      (l.years = n),
                      this
                    );
                  }),
                  (Fi.get = function (t) {
                    return this[(t = O(t)) + "s"]();
                  }),
                  (Fi.milliseconds = ki),
                  (Fi.seconds = Si),
                  (Fi.minutes = _i),
                  (Fi.hours = Mi),
                  (Fi.days = Ci),
                  (Fi.weeks = function () {
                    return w(this.days() / 7);
                  }),
                  (Fi.months = Di),
                  (Fi.years = Ai),
                  (Fi.humanize = function (t) {
                    var e,
                      i,
                      n,
                      a,
                      r,
                      o,
                      s,
                      l,
                      u,
                      d,
                      c,
                      h = this.localeData(),
                      f =
                        ((i = !t),
                        (n = h),
                        (a = Re((e = this)).abs()),
                        (r = Ti(a.as("s"))),
                        (o = Ti(a.as("m"))),
                        (s = Ti(a.as("h"))),
                        (l = Ti(a.as("d"))),
                        (u = Ti(a.as("M"))),
                        (d = Ti(a.as("y"))),
                        ((c = (r < Pi.s && ["s", r]) ||
                          (o <= 1 && ["m"]) ||
                          (o < Pi.m && ["mm", o]) ||
                          (s <= 1 && ["h"]) ||
                          (s < Pi.h && ["hh", s]) ||
                          (l <= 1 && ["d"]) ||
                          (l < Pi.d && ["dd", l]) ||
                          (u <= 1 && ["M"]) ||
                          (u < Pi.M && ["MM", u]) ||
                          (d <= 1 && ["y"]) || ["yy", d])[2] = i),
                        (c[3] = 0 < +e),
                        (c[4] = n),
                        function (t, e, i, n, a) {
                          return a.relativeTime(e || 1, !!i, t, n);
                        }.apply(null, c));
                    return t && (f = h.pastFuture(+this, f)), h.postformat(f);
                  }),
                  (Fi.toISOString = Oi),
                  (Fi.toString = Oi),
                  (Fi.toJSON = Oi),
                  (Fi.locale = He),
                  (Fi.localeData = je),
                  (Fi.toIsoString = i(
                    "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
                    Oi,
                  )),
                  (Fi.lang = Ue),
                  U("X", 0, 0, "unix"),
                  U("x", 0, 0, "valueOf"),
                  dt("x", rt),
                  dt("X", /[+-]?\d+(\.\d{1,3})?/),
                  gt("X", function (t, e, i) {
                    i._d = new Date(1e3 * parseFloat(t, 10));
                  }),
                  gt("x", function (t, e, i) {
                    i._d = new Date(k(t));
                  }),
                  (h.version = "2.14.1"),
                  (t = we),
                  (h.fn = ei),
                  (h.min = function () {
                    return _e("isBefore", [].slice.call(arguments, 0));
                  }),
                  (h.max = function () {
                    return _e("isAfter", [].slice.call(arguments, 0));
                  }),
                  (h.now = function () {
                    return Date.now ? Date.now() : +new Date();
                  }),
                  (h.utc = g),
                  (h.unix = function (t) {
                    return we(1e3 * t);
                  }),
                  (h.months = function (t, e) {
                    return ri(t, e, "months");
                  }),
                  (h.isDate = u),
                  (h.locale = re),
                  (h.invalid = v),
                  (h.duration = Re),
                  (h.isMoment = x),
                  (h.weekdays = function (t, e, i) {
                    return oi(t, e, i, "weekdays");
                  }),
                  (h.parseZone = function () {
                    return we.apply(null, arguments).parseZone();
                  }),
                  (h.localeData = se),
                  (h.isDuration = Ce),
                  (h.monthsShort = function (t, e) {
                    return ri(t, e, "monthsShort");
                  }),
                  (h.weekdaysMin = function (t, e, i) {
                    return oi(t, e, i, "weekdaysMin");
                  }),
                  (h.defineLocale = oe),
                  (h.updateLocale = function (t, e) {
                    if (null != e) {
                      var i,
                        n = ee;
                      null != ie[t] && (n = ie[t]._config),
                        ((i = new T((e = A(n, e)))).parentLocale = ie[t]),
                        (ie[t] = i),
                        re(t);
                    } else
                      null != ie[t] &&
                        (null != ie[t].parentLocale
                          ? (ie[t] = ie[t].parentLocale)
                          : null != ie[t] && delete ie[t]);
                    return ie[t];
                  }),
                  (h.locales = function () {
                    return _(ie);
                  }),
                  (h.weekdaysShort = function (t, e, i) {
                    return oi(t, e, i, "weekdaysShort");
                  }),
                  (h.normalizeUnits = O),
                  (h.relativeTimeRounding = function (t) {
                    return void 0 === t
                      ? Ti
                      : "function" == typeof t && ((Ti = t), !0);
                  }),
                  (h.relativeTimeThreshold = function (t, e) {
                    return (
                      void 0 !== Pi[t] &&
                      (void 0 === e ? Pi[t] : ((Pi[t] = e), !0))
                    );
                  }),
                  (h.calendarFormat = function (t, e) {
                    var i = t.diff(e, "days", !0);
                    return i < -6
                      ? "sameElse"
                      : i < -1
                        ? "lastWeek"
                        : i < 0
                          ? "lastDay"
                          : i < 1
                            ? "sameDay"
                            : i < 2
                              ? "nextDay"
                              : i < 7
                                ? "nextWeek"
                                : "sameElse";
                  }),
                  (h.prototype = ei),
                  h
                );
              }),
              "object" == typeof t && void 0 !== Ri
                ? (Ri.exports = i())
                : (e.moment = i());
          },
          {},
        ],
        7: [
          function (t, e, i) {
            var n = t(27)();
            t(26)(n),
              t(22)(n),
              t(25)(n),
              t(21)(n),
              t(23)(n),
              t(24)(n),
              t(28)(n),
              t(32)(n),
              t(30)(n),
              t(31)(n),
              t(33)(n),
              t(29)(n),
              t(34)(n),
              t(35)(n),
              t(36)(n),
              t(37)(n),
              t(38)(n),
              t(41)(n),
              t(39)(n),
              t(40)(n),
              t(42)(n),
              t(43)(n),
              t(44)(n),
              t(15)(n),
              t(16)(n),
              t(17)(n),
              t(18)(n),
              t(19)(n),
              t(20)(n),
              t(8)(n),
              t(9)(n),
              t(10)(n),
              t(11)(n),
              t(12)(n),
              t(13)(n),
              t(14)(n),
              (window.Chart = e.exports = n);
          },
          {
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            34: 34,
            35: 35,
            36: 36,
            37: 37,
            38: 38,
            39: 39,
            40: 40,
            41: 41,
            42: 42,
            43: 43,
            44: 44,
            8: 8,
            9: 9,
          },
        ],
        8: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              i.Bar = function (t, e) {
                return (e.type = "bar"), new i(t, e);
              };
            };
          },
          {},
        ],
        9: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              i.Bubble = function (t, e) {
                return (e.type = "bubble"), new i(t, e);
              };
            };
          },
          {},
        ],
        10: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              i.Doughnut = function (t, e) {
                return (e.type = "doughnut"), new i(t, e);
              };
            };
          },
          {},
        ],
        11: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              i.Line = function (t, e) {
                return (e.type = "line"), new i(t, e);
              };
            };
          },
          {},
        ],
        12: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              i.PolarArea = function (t, e) {
                return (e.type = "polarArea"), new i(t, e);
              };
            };
          },
          {},
        ],
        13: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              i.Radar = function (t, e) {
                return (
                  (e.options = i.helpers.configMerge(
                    { aspectRatio: 1 },
                    e.options,
                  )),
                  (e.type = "radar"),
                  new i(t, e)
                );
              };
            };
          },
          {},
        ],
        14: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              (i.defaults.scatter = {
                hover: { mode: "single" },
                scales: {
                  xAxes: [
                    { type: "linear", position: "bottom", id: "x-axis-1" },
                  ],
                  yAxes: [{ type: "linear", position: "left", id: "y-axis-1" }],
                },
                tooltips: {
                  callbacks: {
                    title: function () {
                      return "";
                    },
                    label: function (t) {
                      return "(" + t.xLabel + ", " + t.yLabel + ")";
                    },
                  },
                },
              }),
                (i.controllers.scatter = i.controllers.line),
                (i.Scatter = function (t, e) {
                  return (e.type = "scatter"), new i(t, e);
                });
            };
          },
          {},
        ],
        15: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              var c = i.helpers;
              (i.defaults.bar = {
                hover: { mode: "label" },
                scales: {
                  xAxes: [
                    {
                      type: "category",
                      categoryPercentage: 0.8,
                      barPercentage: 0.9,
                      gridLines: { offsetGridLines: !0 },
                    },
                  ],
                  yAxes: [{ type: "linear" }],
                },
              }),
                (i.controllers.bar = i.DatasetController.extend({
                  dataElementType: i.elements.Rectangle,
                  initialize: function (t, e) {
                    i.DatasetController.prototype.initialize.call(this, t, e),
                      (this.getMeta().bar = !0);
                  },
                  getBarCount: function () {
                    var i = this,
                      n = 0;
                    return (
                      c.each(
                        i.chart.data.datasets,
                        function (t, e) {
                          i.chart.getDatasetMeta(e).bar &&
                            i.chart.isDatasetVisible(e) &&
                            ++n;
                        },
                        i,
                      ),
                      n
                    );
                  },
                  update: function (i) {
                    var n = this;
                    c.each(
                      n.getMeta().data,
                      function (t, e) {
                        n.updateElement(t, e, i);
                      },
                      n,
                    );
                  },
                  updateElement: function (t, e, i) {
                    var n = this,
                      a = n.getMeta(),
                      r = n.getScaleForId(a.xAxisID),
                      o = n.getScaleForId(a.yAxisID),
                      s = o.getBasePixel(),
                      l = n.chart.options.elements.rectangle,
                      u = t.custom || {},
                      d = n.getDataset();
                    c.extend(t, {
                      _xScale: r,
                      _yScale: o,
                      _datasetIndex: n.index,
                      _index: e,
                      _model: {
                        x: n.calculateBarX(e, n.index),
                        y: i ? s : n.calculateBarY(e, n.index),
                        label: n.chart.data.labels[e],
                        datasetLabel: d.label,
                        base: i ? s : n.calculateBarBase(n.index, e),
                        width: n.calculateBarWidth(e),
                        backgroundColor: u.backgroundColor
                          ? u.backgroundColor
                          : c.getValueAtIndexOrDefault(
                              d.backgroundColor,
                              e,
                              l.backgroundColor,
                            ),
                        borderSkipped: u.borderSkipped
                          ? u.borderSkipped
                          : l.borderSkipped,
                        borderColor: u.borderColor
                          ? u.borderColor
                          : c.getValueAtIndexOrDefault(
                              d.borderColor,
                              e,
                              l.borderColor,
                            ),
                        borderWidth: u.borderWidth
                          ? u.borderWidth
                          : c.getValueAtIndexOrDefault(
                              d.borderWidth,
                              e,
                              l.borderWidth,
                            ),
                      },
                    }),
                      t.pivot();
                  },
                  calculateBarBase: function (t, e) {
                    var i = this.getMeta(),
                      n = this.getScaleForId(i.yAxisID),
                      a = 0;
                    if (n.options.stacked) {
                      for (
                        var r = this.chart,
                          o = r.data.datasets,
                          s = Number(o[t].data[e]),
                          l = 0;
                        l < t;
                        l++
                      ) {
                        var u = o[l],
                          d = r.getDatasetMeta(l);
                        if (
                          d.bar &&
                          d.yAxisID === n.id &&
                          r.isDatasetVisible(l)
                        ) {
                          var c = Number(u.data[e]);
                          a += s < 0 ? Math.min(c, 0) : Math.max(c, 0);
                        }
                      }
                      return n.getPixelForValue(a);
                    }
                    return n.getBasePixel();
                  },
                  getRuler: function (t) {
                    var e,
                      i = this,
                      n = i.getMeta(),
                      a = i.getScaleForId(n.xAxisID),
                      r = i.getBarCount(),
                      o =
                        (e =
                          "category" === a.options.type
                            ? a.getPixelForTick(t + 1) - a.getPixelForTick(t)
                            : a.width / a.ticks.length) *
                        a.options.categoryPercentage,
                      s = (e - e * a.options.categoryPercentage) / 2,
                      l = o / r;
                    a.ticks.length !== i.chart.data.labels.length &&
                      (l *= a.ticks.length / i.chart.data.labels.length);
                    return {
                      datasetCount: r,
                      tickWidth: e,
                      categoryWidth: o,
                      categorySpacing: s,
                      fullBarWidth: l,
                      barWidth: l * a.options.barPercentage,
                      barSpacing: l - l * a.options.barPercentage,
                    };
                  },
                  calculateBarWidth: function (t) {
                    var e = this.getScaleForId(this.getMeta().xAxisID);
                    if (e.options.barThickness) return e.options.barThickness;
                    var i = this.getRuler(t);
                    return e.options.stacked ? i.categoryWidth : i.barWidth;
                  },
                  getBarIndex: function (t) {
                    var e,
                      i = 0;
                    for (e = 0; e < t; ++e)
                      this.chart.getDatasetMeta(e).bar &&
                        this.chart.isDatasetVisible(e) &&
                        ++i;
                    return i;
                  },
                  calculateBarX: function (t, e) {
                    var i = this,
                      n = i.getMeta(),
                      a = i.getScaleForId(n.xAxisID),
                      r = i.getBarIndex(e),
                      o = i.getRuler(t),
                      s = a.getPixelForValue(null, t, e, i.chart.isCombo);
                    return (
                      (s -= i.chart.isCombo ? o.tickWidth / 2 : 0),
                      a.options.stacked
                        ? s + o.categoryWidth / 2 + o.categorySpacing
                        : s +
                          o.barWidth / 2 +
                          o.categorySpacing +
                          o.barWidth * r +
                          o.barSpacing / 2 +
                          o.barSpacing * r
                    );
                  },
                  calculateBarY: function (t, e) {
                    var i = this,
                      n = i.getMeta(),
                      a = i.getScaleForId(n.yAxisID),
                      r = Number(i.getDataset().data[t]);
                    if (a.options.stacked) {
                      for (var o = 0, s = 0, l = 0; l < e; l++) {
                        var u = i.chart.data.datasets[l],
                          d = i.chart.getDatasetMeta(l);
                        if (
                          d.bar &&
                          d.yAxisID === a.id &&
                          i.chart.isDatasetVisible(l)
                        ) {
                          var c = Number(u.data[t]);
                          c < 0 ? (s += c || 0) : (o += c || 0);
                        }
                      }
                      return r < 0
                        ? a.getPixelForValue(s + r)
                        : a.getPixelForValue(o + r);
                    }
                    return a.getPixelForValue(r);
                  },
                  draw: function (t) {
                    var n = this,
                      a = t || 1;
                    c.each(
                      n.getMeta().data,
                      function (t, e) {
                        var i = n.getDataset().data[e];
                        null == i || isNaN(i) || t.transition(a).draw();
                      },
                      n,
                    );
                  },
                  setHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      i = t._index,
                      n = t.custom || {},
                      a = t._model;
                    (a.backgroundColor = n.hoverBackgroundColor
                      ? n.hoverBackgroundColor
                      : c.getValueAtIndexOrDefault(
                          e.hoverBackgroundColor,
                          i,
                          c.getHoverColor(a.backgroundColor),
                        )),
                      (a.borderColor = n.hoverBorderColor
                        ? n.hoverBorderColor
                        : c.getValueAtIndexOrDefault(
                            e.hoverBorderColor,
                            i,
                            c.getHoverColor(a.borderColor),
                          )),
                      (a.borderWidth = n.hoverBorderWidth
                        ? n.hoverBorderWidth
                        : c.getValueAtIndexOrDefault(
                            e.hoverBorderWidth,
                            i,
                            a.borderWidth,
                          ));
                  },
                  removeHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      i = t._index,
                      n = t.custom || {},
                      a = t._model,
                      r = this.chart.options.elements.rectangle;
                    (a.backgroundColor = n.backgroundColor
                      ? n.backgroundColor
                      : c.getValueAtIndexOrDefault(
                          e.backgroundColor,
                          i,
                          r.backgroundColor,
                        )),
                      (a.borderColor = n.borderColor
                        ? n.borderColor
                        : c.getValueAtIndexOrDefault(
                            e.borderColor,
                            i,
                            r.borderColor,
                          )),
                      (a.borderWidth = n.borderWidth
                        ? n.borderWidth
                        : c.getValueAtIndexOrDefault(
                            e.borderWidth,
                            i,
                            r.borderWidth,
                          ));
                  },
                })),
                (i.defaults.horizontalBar = {
                  hover: { mode: "label" },
                  scales: {
                    xAxes: [{ type: "linear", position: "bottom" }],
                    yAxes: [
                      {
                        position: "left",
                        type: "category",
                        categoryPercentage: 0.8,
                        barPercentage: 0.9,
                        gridLines: { offsetGridLines: !0 },
                      },
                    ],
                  },
                  elements: { rectangle: { borderSkipped: "left" } },
                  tooltips: {
                    callbacks: {
                      title: function (t, e) {
                        var i = "";
                        return (
                          0 < t.length &&
                            (t[0].yLabel
                              ? (i = t[0].yLabel)
                              : 0 < e.labels.length &&
                                t[0].index < e.labels.length &&
                                (i = e.labels[t[0].index])),
                          i
                        );
                      },
                      label: function (t, e) {
                        return (
                          (e.datasets[t.datasetIndex].label || "") +
                          ": " +
                          t.xLabel
                        );
                      },
                    },
                  },
                }),
                (i.controllers.horizontalBar = i.controllers.bar.extend({
                  updateElement: function (t, e, i) {
                    var n = this,
                      a = n.getMeta(),
                      r = n.getScaleForId(a.xAxisID),
                      o = n.getScaleForId(a.yAxisID),
                      s = r.getBasePixel(),
                      l = t.custom || {},
                      u = n.getDataset(),
                      d = n.chart.options.elements.rectangle;
                    c.extend(t, {
                      _xScale: r,
                      _yScale: o,
                      _datasetIndex: n.index,
                      _index: e,
                      _model: {
                        x: i ? s : n.calculateBarX(e, n.index),
                        y: n.calculateBarY(e, n.index),
                        label: n.chart.data.labels[e],
                        datasetLabel: u.label,
                        base: i ? s : n.calculateBarBase(n.index, e),
                        height: n.calculateBarHeight(e),
                        backgroundColor: l.backgroundColor
                          ? l.backgroundColor
                          : c.getValueAtIndexOrDefault(
                              u.backgroundColor,
                              e,
                              d.backgroundColor,
                            ),
                        borderSkipped: l.borderSkipped
                          ? l.borderSkipped
                          : d.borderSkipped,
                        borderColor: l.borderColor
                          ? l.borderColor
                          : c.getValueAtIndexOrDefault(
                              u.borderColor,
                              e,
                              d.borderColor,
                            ),
                        borderWidth: l.borderWidth
                          ? l.borderWidth
                          : c.getValueAtIndexOrDefault(
                              u.borderWidth,
                              e,
                              d.borderWidth,
                            ),
                      },
                      draw: function () {
                        var t = this._chart.ctx,
                          e = this._view,
                          i = e.height / 2,
                          n = e.y - i,
                          a = e.y + i,
                          r = e.base - (e.base - e.x),
                          o = e.borderWidth / 2;
                        e.borderWidth && ((n += o), (a -= o), (r += o)),
                          t.beginPath(),
                          (t.fillStyle = e.backgroundColor),
                          (t.strokeStyle = e.borderColor),
                          (t.lineWidth = e.borderWidth);
                        var s = [
                            [e.base, a],
                            [e.base, n],
                            [r, n],
                            [r, a],
                          ],
                          l = ["bottom", "left", "top", "right"].indexOf(
                            e.borderSkipped,
                            0,
                          );
                        function u(t) {
                          return s[(l + t) % 4];
                        }
                        -1 === l && (l = 0), t.moveTo.apply(t, u(0));
                        for (var d = 1; d < 4; d++) t.lineTo.apply(t, u(d));
                        t.fill(), e.borderWidth && t.stroke();
                      },
                      inRange: function (t, e) {
                        var i = this._view,
                          n = !1;
                        return (
                          i &&
                            (n =
                              i.x < i.base
                                ? e >= i.y - i.height / 2 &&
                                  e <= i.y + i.height / 2 &&
                                  t >= i.x &&
                                  t <= i.base
                                : e >= i.y - i.height / 2 &&
                                  e <= i.y + i.height / 2 &&
                                  t >= i.base &&
                                  t <= i.x),
                          n
                        );
                      },
                    }),
                      t.pivot();
                  },
                  calculateBarBase: function (t, e) {
                    var i = this.getMeta(),
                      n = this.getScaleForId(i.xAxisID),
                      a = 0;
                    if (n.options.stacked) {
                      for (
                        var r = this.chart,
                          o = r.data.datasets,
                          s = Number(o[t].data[e]),
                          l = 0;
                        l < t;
                        l++
                      ) {
                        var u = o[l],
                          d = r.getDatasetMeta(l);
                        if (
                          d.bar &&
                          d.xAxisID === n.id &&
                          r.isDatasetVisible(l)
                        ) {
                          var c = Number(u.data[e]);
                          a += s < 0 ? Math.min(c, 0) : Math.max(c, 0);
                        }
                      }
                      return n.getPixelForValue(a);
                    }
                    return n.getBasePixel();
                  },
                  getRuler: function (t) {
                    var e,
                      i = this,
                      n = i.getMeta(),
                      a = i.getScaleForId(n.yAxisID),
                      r = i.getBarCount(),
                      o =
                        (e =
                          "category" === a.options.type
                            ? a.getPixelForTick(t + 1) - a.getPixelForTick(t)
                            : a.width / a.ticks.length) *
                        a.options.categoryPercentage,
                      s = (e - e * a.options.categoryPercentage) / 2,
                      l = o / r;
                    a.ticks.length !== i.chart.data.labels.length &&
                      (l *= a.ticks.length / i.chart.data.labels.length);
                    return {
                      datasetCount: r,
                      tickHeight: e,
                      categoryHeight: o,
                      categorySpacing: s,
                      fullBarHeight: l,
                      barHeight: l * a.options.barPercentage,
                      barSpacing: l - l * a.options.barPercentage,
                    };
                  },
                  calculateBarHeight: function (t) {
                    var e = this.getScaleForId(this.getMeta().yAxisID);
                    if (e.options.barThickness) return e.options.barThickness;
                    var i = this.getRuler(t);
                    return e.options.stacked ? i.categoryHeight : i.barHeight;
                  },
                  calculateBarX: function (t, e) {
                    var i = this,
                      n = i.getMeta(),
                      a = i.getScaleForId(n.xAxisID),
                      r = Number(i.getDataset().data[t]);
                    if (a.options.stacked) {
                      for (var o = 0, s = 0, l = 0; l < e; l++) {
                        var u = i.chart.data.datasets[l],
                          d = i.chart.getDatasetMeta(l);
                        if (
                          d.bar &&
                          d.xAxisID === a.id &&
                          i.chart.isDatasetVisible(l)
                        ) {
                          var c = Number(u.data[t]);
                          c < 0 ? (s += c || 0) : (o += c || 0);
                        }
                      }
                      return r < 0
                        ? a.getPixelForValue(s + r)
                        : a.getPixelForValue(o + r);
                    }
                    return a.getPixelForValue(r);
                  },
                  calculateBarY: function (t, e) {
                    var i = this,
                      n = i.getMeta(),
                      a = i.getScaleForId(n.yAxisID),
                      r = i.getBarIndex(e),
                      o = i.getRuler(t),
                      s = a.getPixelForValue(null, t, e, i.chart.isCombo);
                    return (
                      (s -= i.chart.isCombo ? o.tickHeight / 2 : 0),
                      a.options.stacked
                        ? s + o.categoryHeight / 2 + o.categorySpacing
                        : s +
                          o.barHeight / 2 +
                          o.categorySpacing +
                          o.barHeight * r +
                          o.barSpacing / 2 +
                          o.barSpacing * r
                    );
                  },
                }));
            };
          },
          {},
        ],
        16: [
          function (t, e, i) {
            "use strict";
            e.exports = function (f) {
              var g = f.helpers;
              (f.defaults.bubble = {
                hover: { mode: "single" },
                scales: {
                  xAxes: [
                    { type: "linear", position: "bottom", id: "x-axis-0" },
                  ],
                  yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }],
                },
                tooltips: {
                  callbacks: {
                    title: function () {
                      return "";
                    },
                    label: function (t, e) {
                      var i = e.datasets[t.datasetIndex].label || "",
                        n = e.datasets[t.datasetIndex].data[t.index];
                      return i + ": (" + n.x + ", " + n.y + ", " + n.r + ")";
                    },
                  },
                },
              }),
                (f.controllers.bubble = f.DatasetController.extend({
                  dataElementType: f.elements.Point,
                  update: function (i) {
                    var n = this,
                      t = n.getMeta().data;
                    g.each(t, function (t, e) {
                      n.updateElement(t, e, i);
                    });
                  },
                  updateElement: function (t, e, i) {
                    var n = this,
                      a = n.getMeta(),
                      r = n.getScaleForId(a.xAxisID),
                      o = n.getScaleForId(a.yAxisID),
                      s = t.custom || {},
                      l = n.getDataset(),
                      u = l.data[e],
                      d = n.chart.options.elements.point,
                      c = n.index;
                    g.extend(t, {
                      _xScale: r,
                      _yScale: o,
                      _datasetIndex: c,
                      _index: e,
                      _model: {
                        x: i
                          ? r.getPixelForDecimal(0.5)
                          : r.getPixelForValue(
                              "object" == typeof u ? u : NaN,
                              e,
                              c,
                              n.chart.isCombo,
                            ),
                        y: i ? o.getBasePixel() : o.getPixelForValue(u, e, c),
                        radius: i ? 0 : s.radius ? s.radius : n.getRadius(u),
                        hitRadius: s.hitRadius
                          ? s.hitRadius
                          : g.getValueAtIndexOrDefault(
                              l.hitRadius,
                              e,
                              d.hitRadius,
                            ),
                      },
                    }),
                      f.DatasetController.prototype.removeHoverStyle.call(
                        n,
                        t,
                        d,
                      );
                    var h = t._model;
                    (h.skip = s.skip ? s.skip : isNaN(h.x) || isNaN(h.y)),
                      t.pivot();
                  },
                  getRadius: function (t) {
                    return t.r || this.chart.options.elements.point.radius;
                  },
                  setHoverStyle: function (t) {
                    f.DatasetController.prototype.setHoverStyle.call(this, t);
                    var e = this.chart.data.datasets[t._datasetIndex],
                      i = t._index,
                      n = t.custom || {};
                    t._model.radius = n.hoverRadius
                      ? n.hoverRadius
                      : g.getValueAtIndexOrDefault(
                          e.hoverRadius,
                          i,
                          this.chart.options.elements.point.hoverRadius,
                        ) + this.getRadius(e.data[i]);
                  },
                  removeHoverStyle: function (t) {
                    f.DatasetController.prototype.removeHoverStyle.call(
                      this,
                      t,
                      this.chart.options.elements.point,
                    );
                    var e =
                        this.chart.data.datasets[t._datasetIndex].data[
                          t._index
                        ],
                      i = t.custom || {};
                    t._model.radius = i.radius ? i.radius : this.getRadius(e);
                  },
                }));
            };
          },
          {},
        ],
        17: [
          function (t, e, i) {
            "use strict";
            e.exports = function (e) {
              var P = e.helpers,
                t = e.defaults;
              (t.doughnut = {
                animation: { animateRotate: !0, animateScale: !1 },
                aspectRatio: 1,
                hover: { mode: "single" },
                legendCallback: function (t) {
                  var e = [];
                  e.push('<ul class="' + t.id + '-legend">');
                  var i = t.data,
                    n = i.datasets,
                    a = i.labels;
                  if (n.length)
                    for (var r = 0; r < n[0].data.length; ++r)
                      e.push(
                        '<li><span style="background-color:' +
                          n[0].backgroundColor[r] +
                          '"></span>',
                      ),
                        a[r] && e.push(a[r]),
                        e.push("</li>");
                  return e.push("</ul>"), e.join("");
                },
                legend: {
                  labels: {
                    generateLabels: function (l) {
                      var u = l.data;
                      return u.labels.length && u.datasets.length
                        ? u.labels.map(function (t, e) {
                            var i = l.getDatasetMeta(0),
                              n = u.datasets[0],
                              a = i.data[e],
                              r = (a && a.custom) || {},
                              o = P.getValueAtIndexOrDefault,
                              s = l.options.elements.arc;
                            return {
                              text: t,
                              fillStyle: r.backgroundColor
                                ? r.backgroundColor
                                : o(n.backgroundColor, e, s.backgroundColor),
                              strokeStyle: r.borderColor
                                ? r.borderColor
                                : o(n.borderColor, e, s.borderColor),
                              lineWidth: r.borderWidth
                                ? r.borderWidth
                                : o(n.borderWidth, e, s.borderWidth),
                              hidden: isNaN(n.data[e]) || i.data[e].hidden,
                              index: e,
                            };
                          })
                        : [];
                    },
                  },
                  onClick: function (t, e) {
                    var i,
                      n,
                      a,
                      r = e.index,
                      o = this.chart;
                    for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)
                      (a = o.getDatasetMeta(i)).data[r].hidden =
                        !a.data[r].hidden;
                    o.update();
                  },
                },
                cutoutPercentage: 50,
                rotation: -0.5 * Math.PI,
                circumference: 2 * Math.PI,
                tooltips: {
                  callbacks: {
                    title: function () {
                      return "";
                    },
                    label: function (t, e) {
                      return (
                        e.labels[t.index] +
                        ": " +
                        e.datasets[t.datasetIndex].data[t.index]
                      );
                    },
                  },
                },
              }),
                (t.pie = P.clone(t.doughnut)),
                P.extend(t.pie, { cutoutPercentage: 0 }),
                (e.controllers.doughnut = e.controllers.pie =
                  e.DatasetController.extend({
                    dataElementType: e.elements.Arc,
                    linkScales: P.noop,
                    getRingIndex: function (t) {
                      for (var e = 0, i = 0; i < t; ++i)
                        this.chart.isDatasetVisible(i) && ++e;
                      return e;
                    },
                    update: function (i) {
                      var n = this,
                        t = n.chart,
                        e = t.chartArea,
                        a = t.options,
                        r = a.elements.arc,
                        o = e.right - e.left - r.borderWidth,
                        s = e.bottom - e.top - r.borderWidth,
                        l = Math.min(o, s),
                        u = { x: 0, y: 0 },
                        d = n.getMeta(),
                        c = a.cutoutPercentage,
                        h = a.circumference;
                      if (h < 2 * Math.PI) {
                        var f = a.rotation % (2 * Math.PI),
                          g =
                            (f +=
                              2 *
                              Math.PI *
                              (f >= Math.PI ? -1 : f < -Math.PI ? 1 : 0)) + h,
                          p = Math.cos(f),
                          m = Math.sin(f),
                          v = Math.cos(g),
                          y = Math.sin(g),
                          b =
                            (f <= 0 && 0 <= g) ||
                            (f <= 2 * Math.PI && 2 * Math.PI <= g),
                          x =
                            (f <= 0.5 * Math.PI && 0.5 * Math.PI <= g) ||
                            (f <= 2.5 * Math.PI && 2.5 * Math.PI <= g),
                          w =
                            (f <= -Math.PI && -Math.PI <= g) ||
                            (f <= Math.PI && Math.PI <= g),
                          k =
                            (f <= 0.5 * -Math.PI && 0.5 * -Math.PI <= g) ||
                            (f <= 1.5 * Math.PI && 1.5 * Math.PI <= g),
                          S = c / 100,
                          _ = w
                            ? -1
                            : Math.min(
                                p * (p < 0 ? 1 : S),
                                v * (v < 0 ? 1 : S),
                              ),
                          M = k
                            ? -1
                            : Math.min(
                                m * (m < 0 ? 1 : S),
                                y * (y < 0 ? 1 : S),
                              ),
                          C = b
                            ? 1
                            : Math.max(
                                p * (0 < p ? 1 : S),
                                v * (0 < v ? 1 : S),
                              ),
                          D = x
                            ? 1
                            : Math.max(
                                m * (0 < m ? 1 : S),
                                y * (0 < y ? 1 : S),
                              ),
                          A = 0.5 * (C - _),
                          T = 0.5 * (D - M);
                        (l = Math.min(o / A, s / T)),
                          (u = { x: -0.5 * (C + _), y: -0.5 * (D + M) });
                      }
                      (t.borderWidth = n.getMaxBorderWidth(d.data)),
                        (t.outerRadius = Math.max((l - t.borderWidth) / 2, 0)),
                        (t.innerRadius = Math.max(
                          c ? (t.outerRadius / 100) * c : 1,
                          0,
                        )),
                        (t.radiusLength =
                          (t.outerRadius - t.innerRadius) /
                          t.getVisibleDatasetCount()),
                        (t.offsetX = u.x * t.outerRadius),
                        (t.offsetY = u.y * t.outerRadius),
                        (d.total = n.calculateTotal()),
                        (n.outerRadius =
                          t.outerRadius -
                          t.radiusLength * n.getRingIndex(n.index)),
                        (n.innerRadius = n.outerRadius - t.radiusLength),
                        P.each(d.data, function (t, e) {
                          n.updateElement(t, e, i);
                        });
                    },
                    updateElement: function (t, e, i) {
                      var n = this,
                        a = n.chart,
                        r = a.chartArea,
                        o = a.options,
                        s = o.animation,
                        l = (r.left + r.right) / 2,
                        u = (r.top + r.bottom) / 2,
                        d = o.rotation,
                        c = o.rotation,
                        h = n.getDataset(),
                        f =
                          i && s.animateRotate
                            ? 0
                            : t.hidden
                              ? 0
                              : n.calculateCircumference(h.data[e]) *
                                (o.circumference / (2 * Math.PI)),
                        g = i && s.animateScale ? 0 : n.innerRadius,
                        p = i && s.animateScale ? 0 : n.outerRadius,
                        m = P.getValueAtIndexOrDefault;
                      P.extend(t, {
                        _datasetIndex: n.index,
                        _index: e,
                        _model: {
                          x: l + a.offsetX,
                          y: u + a.offsetY,
                          startAngle: d,
                          endAngle: c,
                          circumference: f,
                          outerRadius: p,
                          innerRadius: g,
                          label: m(h.label, e, a.data.labels[e]),
                        },
                      });
                      var v = t._model;
                      this.removeHoverStyle(t),
                        (i && s.animateRotate) ||
                          ((v.startAngle =
                            0 === e
                              ? o.rotation
                              : n.getMeta().data[e - 1]._model.endAngle),
                          (v.endAngle = v.startAngle + v.circumference)),
                        t.pivot();
                    },
                    removeHoverStyle: function (t) {
                      e.DatasetController.prototype.removeHoverStyle.call(
                        this,
                        t,
                        this.chart.options.elements.arc,
                      );
                    },
                    calculateTotal: function () {
                      var i,
                        n = this.getDataset(),
                        t = this.getMeta(),
                        a = 0;
                      return (
                        P.each(t.data, function (t, e) {
                          (i = n.data[e]),
                            isNaN(i) || t.hidden || (a += Math.abs(i));
                        }),
                        a
                      );
                    },
                    calculateCircumference: function (t) {
                      var e = this.getMeta().total;
                      return 0 < e && !isNaN(t) ? 2 * Math.PI * (t / e) : 0;
                    },
                    getMaxBorderWidth: function (t) {
                      for (
                        var e, i, n = 0, a = this.index, r = t.length, o = 0;
                        o < r;
                        o++
                      )
                        n =
                          (n =
                            n < (e = t[o]._model ? t[o]._model.borderWidth : 0)
                              ? e
                              : n) <
                          (i = t[o]._chart
                            ? t[o]._chart.config.data.datasets[a]
                                .hoverBorderWidth
                            : 0)
                            ? i
                            : n;
                      return n;
                    },
                  }));
            };
          },
          {},
        ],
        18: [
          function (t, e, i) {
            "use strict";
            e.exports = function (a) {
              var g = a.helpers;
              function f(t, e) {
                return g.getValueOrDefault(t.showLine, e.showLines);
              }
              (a.defaults.line = {
                showLines: !0,
                spanGaps: !1,
                hover: { mode: "label" },
                scales: {
                  xAxes: [{ type: "category", id: "x-axis-0" }],
                  yAxes: [{ type: "linear", id: "y-axis-0" }],
                },
              }),
                (a.controllers.line = a.DatasetController.extend({
                  datasetElementType: a.elements.Line,
                  dataElementType: a.elements.Point,
                  addElementAndReset: function (t) {
                    var e = this,
                      i = e.chart.options,
                      n = e.getMeta();
                    a.DatasetController.prototype.addElementAndReset.call(e, t),
                      f(e.getDataset(), i) &&
                        0 !== n.dataset._model.tension &&
                        e.updateBezierControlPoints();
                  },
                  update: function (t) {
                    var e,
                      i,
                      n,
                      a = this,
                      r = a.getMeta(),
                      o = r.dataset,
                      s = r.data || [],
                      l = a.chart.options,
                      u = l.elements.line,
                      d = a.getScaleForId(r.yAxisID),
                      c = a.getDataset(),
                      h = f(c, l);
                    for (
                      h &&
                        ((n = o.custom || {}),
                        void 0 !== c.tension &&
                          void 0 === c.lineTension &&
                          (c.lineTension = c.tension),
                        (o._scale = d),
                        (o._datasetIndex = a.index),
                        (o._children = s),
                        (o._model = {
                          spanGaps: c.spanGaps ? c.spanGaps : l.spanGaps,
                          tension: n.tension
                            ? n.tension
                            : g.getValueOrDefault(c.lineTension, u.tension),
                          backgroundColor: n.backgroundColor
                            ? n.backgroundColor
                            : c.backgroundColor || u.backgroundColor,
                          borderWidth: n.borderWidth
                            ? n.borderWidth
                            : c.borderWidth || u.borderWidth,
                          borderColor: n.borderColor
                            ? n.borderColor
                            : c.borderColor || u.borderColor,
                          borderCapStyle: n.borderCapStyle
                            ? n.borderCapStyle
                            : c.borderCapStyle || u.borderCapStyle,
                          borderDash: n.borderDash
                            ? n.borderDash
                            : c.borderDash || u.borderDash,
                          borderDashOffset: n.borderDashOffset
                            ? n.borderDashOffset
                            : c.borderDashOffset || u.borderDashOffset,
                          borderJoinStyle: n.borderJoinStyle
                            ? n.borderJoinStyle
                            : c.borderJoinStyle || u.borderJoinStyle,
                          fill: n.fill
                            ? n.fill
                            : void 0 !== c.fill
                              ? c.fill
                              : u.fill,
                          steppedLine: n.steppedLine
                            ? n.steppedLine
                            : g.getValueOrDefault(c.steppedLine, u.stepped),
                          scaleTop: d.top,
                          scaleBottom: d.bottom,
                          scaleZero: d.getBasePixel(),
                        }),
                        o.pivot()),
                        e = 0,
                        i = s.length;
                      e < i;
                      ++e
                    )
                      a.updateElement(s[e], e, t);
                    for (
                      h &&
                        0 !== o._model.tension &&
                        a.updateBezierControlPoints(),
                        e = 0,
                        i = s.length;
                      e < i;
                      ++e
                    )
                      s[e].pivot();
                  },
                  getPointBackgroundColor: function (t, e) {
                    var i = this.chart.options.elements.point.backgroundColor,
                      n = this.getDataset(),
                      a = t.custom || {};
                    return (
                      a.backgroundColor
                        ? (i = a.backgroundColor)
                        : n.pointBackgroundColor
                          ? (i = g.getValueAtIndexOrDefault(
                              n.pointBackgroundColor,
                              e,
                              i,
                            ))
                          : n.backgroundColor && (i = n.backgroundColor),
                      i
                    );
                  },
                  getPointBorderColor: function (t, e) {
                    var i = this.chart.options.elements.point.borderColor,
                      n = this.getDataset(),
                      a = t.custom || {};
                    return (
                      a.borderColor
                        ? (i = a.borderColor)
                        : n.pointBorderColor
                          ? (i = g.getValueAtIndexOrDefault(
                              n.pointBorderColor,
                              e,
                              i,
                            ))
                          : n.borderColor && (i = n.borderColor),
                      i
                    );
                  },
                  getPointBorderWidth: function (t, e) {
                    var i = this.chart.options.elements.point.borderWidth,
                      n = this.getDataset(),
                      a = t.custom || {};
                    return (
                      a.borderWidth
                        ? (i = a.borderWidth)
                        : n.pointBorderWidth
                          ? (i = g.getValueAtIndexOrDefault(
                              n.pointBorderWidth,
                              e,
                              i,
                            ))
                          : n.borderWidth && (i = n.borderWidth),
                      i
                    );
                  },
                  updateElement: function (t, e, i) {
                    var n,
                      a,
                      r = this,
                      o = r.getMeta(),
                      s = t.custom || {},
                      l = r.getDataset(),
                      u = r.index,
                      d = l.data[e],
                      c = r.getScaleForId(o.yAxisID),
                      h = r.getScaleForId(o.xAxisID),
                      f = r.chart.options.elements.point;
                    void 0 !== l.radius &&
                      void 0 === l.pointRadius &&
                      (l.pointRadius = l.radius),
                      void 0 !== l.hitRadius &&
                        void 0 === l.pointHitRadius &&
                        (l.pointHitRadius = l.hitRadius),
                      (n = h.getPixelForValue(
                        "object" == typeof d ? d : NaN,
                        e,
                        u,
                        r.chart.isCombo,
                      )),
                      (a = i ? c.getBasePixel() : r.calculatePointY(d, e, u)),
                      (t._xScale = h),
                      (t._yScale = c),
                      (t._datasetIndex = u),
                      (t._index = e),
                      (t._model = {
                        x: n,
                        y: a,
                        skip: s.skip || isNaN(n) || isNaN(a),
                        radius:
                          s.radius ||
                          g.getValueAtIndexOrDefault(
                            l.pointRadius,
                            e,
                            f.radius,
                          ),
                        pointStyle:
                          s.pointStyle ||
                          g.getValueAtIndexOrDefault(
                            l.pointStyle,
                            e,
                            f.pointStyle,
                          ),
                        backgroundColor: r.getPointBackgroundColor(t, e),
                        borderColor: r.getPointBorderColor(t, e),
                        borderWidth: r.getPointBorderWidth(t, e),
                        tension: o.dataset._model
                          ? o.dataset._model.tension
                          : 0,
                        steppedLine:
                          !!o.dataset._model && o.dataset._model.steppedLine,
                        hitRadius:
                          s.hitRadius ||
                          g.getValueAtIndexOrDefault(
                            l.pointHitRadius,
                            e,
                            f.hitRadius,
                          ),
                      });
                  },
                  calculatePointY: function (t, e, i) {
                    var n,
                      a,
                      r,
                      o = this.chart,
                      s = this.getMeta(),
                      l = this.getScaleForId(s.yAxisID),
                      u = 0,
                      d = 0;
                    if (l.options.stacked) {
                      for (n = 0; n < i; n++)
                        if (
                          ((a = o.data.datasets[n]),
                          "line" === (r = o.getDatasetMeta(n)).type &&
                            r.yAxisID === l.id &&
                            o.isDatasetVisible(n))
                        ) {
                          var c = Number(l.getRightValue(a.data[e]));
                          c < 0 ? (d += c || 0) : (u += c || 0);
                        }
                      var h = Number(l.getRightValue(t));
                      return h < 0
                        ? l.getPixelForValue(d + h)
                        : l.getPixelForValue(u + h);
                    }
                    return l.getPixelForValue(t);
                  },
                  updateBezierControlPoints: function () {
                    var t,
                      e,
                      i,
                      n,
                      a = this.getMeta(),
                      r = this.chart.chartArea,
                      o = (a.data || []).filter(function (t) {
                        return !t._model.skip;
                      }),
                      s = this.chart.options.elements.line.capBezierPoints;
                    function l(t, e, i) {
                      return s ? Math.max(Math.min(t, i), e) : t;
                    }
                    for (t = 0, e = o.length; t < e; ++t)
                      (i = o[t]._model),
                        (n = g.splineCurve(
                          g.previousItem(o, t)._model,
                          i,
                          g.nextItem(o, t)._model,
                          a.dataset._model.tension,
                        )),
                        (i.controlPointPreviousX = l(
                          n.previous.x,
                          r.left,
                          r.right,
                        )),
                        (i.controlPointPreviousY = l(
                          n.previous.y,
                          r.top,
                          r.bottom,
                        )),
                        (i.controlPointNextX = l(n.next.x, r.left, r.right)),
                        (i.controlPointNextY = l(n.next.y, r.top, r.bottom));
                  },
                  draw: function (t) {
                    var e,
                      i,
                      n = this.getMeta(),
                      a = n.data || [],
                      r = t || 1;
                    for (e = 0, i = a.length; e < i; ++e) a[e].transition(r);
                    for (
                      f(this.getDataset(), this.chart.options) &&
                        n.dataset.transition(r).draw(),
                        e = 0,
                        i = a.length;
                      e < i;
                      ++e
                    )
                      a[e].draw();
                  },
                  setHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      i = t._index,
                      n = t.custom || {},
                      a = t._model;
                    (a.radius =
                      n.hoverRadius ||
                      g.getValueAtIndexOrDefault(
                        e.pointHoverRadius,
                        i,
                        this.chart.options.elements.point.hoverRadius,
                      )),
                      (a.backgroundColor =
                        n.hoverBackgroundColor ||
                        g.getValueAtIndexOrDefault(
                          e.pointHoverBackgroundColor,
                          i,
                          g.getHoverColor(a.backgroundColor),
                        )),
                      (a.borderColor =
                        n.hoverBorderColor ||
                        g.getValueAtIndexOrDefault(
                          e.pointHoverBorderColor,
                          i,
                          g.getHoverColor(a.borderColor),
                        )),
                      (a.borderWidth =
                        n.hoverBorderWidth ||
                        g.getValueAtIndexOrDefault(
                          e.pointHoverBorderWidth,
                          i,
                          a.borderWidth,
                        ));
                  },
                  removeHoverStyle: function (t) {
                    var e = this,
                      i = e.chart.data.datasets[t._datasetIndex],
                      n = t._index,
                      a = t.custom || {},
                      r = t._model;
                    void 0 !== i.radius &&
                      void 0 === i.pointRadius &&
                      (i.pointRadius = i.radius),
                      (r.radius =
                        a.radius ||
                        g.getValueAtIndexOrDefault(
                          i.pointRadius,
                          n,
                          e.chart.options.elements.point.radius,
                        )),
                      (r.backgroundColor = e.getPointBackgroundColor(t, n)),
                      (r.borderColor = e.getPointBorderColor(t, n)),
                      (r.borderWidth = e.getPointBorderWidth(t, n));
                  },
                }));
            };
          },
          {},
        ],
        19: [
          function (t, e, i) {
            "use strict";
            e.exports = function (e) {
              var k = e.helpers;
              (e.defaults.polarArea = {
                scale: {
                  type: "radialLinear",
                  lineArc: !0,
                  ticks: { beginAtZero: !0 },
                },
                animation: { animateRotate: !0, animateScale: !0 },
                startAngle: -0.5 * Math.PI,
                aspectRatio: 1,
                legendCallback: function (t) {
                  var e = [];
                  e.push('<ul class="' + t.id + '-legend">');
                  var i = t.data,
                    n = i.datasets,
                    a = i.labels;
                  if (n.length)
                    for (var r = 0; r < n[0].data.length; ++r)
                      e.push(
                        '<li><span style="background-color:' +
                          n[0].backgroundColor[r] +
                          '">',
                      ),
                        a[r] && e.push(a[r]),
                        e.push("</span></li>");
                  return e.push("</ul>"), e.join("");
                },
                legend: {
                  labels: {
                    generateLabels: function (s) {
                      var l = s.data;
                      return l.labels.length && l.datasets.length
                        ? l.labels.map(function (t, e) {
                            var i = s.getDatasetMeta(0),
                              n = l.datasets[0],
                              a = i.data[e].custom || {},
                              r = k.getValueAtIndexOrDefault,
                              o = s.options.elements.arc;
                            return {
                              text: t,
                              fillStyle: a.backgroundColor
                                ? a.backgroundColor
                                : r(n.backgroundColor, e, o.backgroundColor),
                              strokeStyle: a.borderColor
                                ? a.borderColor
                                : r(n.borderColor, e, o.borderColor),
                              lineWidth: a.borderWidth
                                ? a.borderWidth
                                : r(n.borderWidth, e, o.borderWidth),
                              hidden: isNaN(n.data[e]) || i.data[e].hidden,
                              index: e,
                            };
                          })
                        : [];
                    },
                  },
                  onClick: function (t, e) {
                    var i,
                      n,
                      a,
                      r = e.index,
                      o = this.chart;
                    for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)
                      (a = o.getDatasetMeta(i)).data[r].hidden =
                        !a.data[r].hidden;
                    o.update();
                  },
                },
                tooltips: {
                  callbacks: {
                    title: function () {
                      return "";
                    },
                    label: function (t, e) {
                      return e.labels[t.index] + ": " + t.yLabel;
                    },
                  },
                },
              }),
                (e.controllers.polarArea = e.DatasetController.extend({
                  dataElementType: e.elements.Arc,
                  linkScales: k.noop,
                  update: function (i) {
                    var n = this,
                      t = n.chart,
                      e = t.chartArea,
                      a = n.getMeta(),
                      r = t.options,
                      o = r.elements.arc,
                      s = Math.min(e.right - e.left, e.bottom - e.top);
                    (t.outerRadius = Math.max((s - o.borderWidth / 2) / 2, 0)),
                      (t.innerRadius = Math.max(
                        r.cutoutPercentage
                          ? (t.outerRadius / 100) * r.cutoutPercentage
                          : 1,
                        0,
                      )),
                      (t.radiusLength =
                        (t.outerRadius - t.innerRadius) /
                        t.getVisibleDatasetCount()),
                      (n.outerRadius =
                        t.outerRadius - t.radiusLength * n.index),
                      (n.innerRadius = n.outerRadius - t.radiusLength),
                      (a.count = n.countVisibleElements()),
                      k.each(a.data, function (t, e) {
                        n.updateElement(t, e, i);
                      });
                  },
                  updateElement: function (t, e, i) {
                    for (
                      var n = this,
                        a = n.chart,
                        r = n.getDataset(),
                        o = a.options,
                        s = o.animation,
                        l = a.scale,
                        u = k.getValueAtIndexOrDefault,
                        d = a.data.labels,
                        c = n.calculateCircumference(r.data[e]),
                        h = l.xCenter,
                        f = l.yCenter,
                        g = 0,
                        p = n.getMeta(),
                        m = 0;
                      m < e;
                      ++m
                    )
                      isNaN(r.data[m]) || p.data[m].hidden || ++g;
                    var v = o.startAngle,
                      y = t.hidden
                        ? 0
                        : l.getDistanceFromCenterForValue(r.data[e]),
                      b = v + c * g,
                      x = b + (t.hidden ? 0 : c),
                      w = s.animateScale
                        ? 0
                        : l.getDistanceFromCenterForValue(r.data[e]);
                    k.extend(t, {
                      _datasetIndex: n.index,
                      _index: e,
                      _scale: l,
                      _model: {
                        x: h,
                        y: f,
                        innerRadius: 0,
                        outerRadius: i ? w : y,
                        startAngle: i && s.animateRotate ? v : b,
                        endAngle: i && s.animateRotate ? v : x,
                        label: u(d, e, d[e]),
                      },
                    }),
                      n.removeHoverStyle(t),
                      t.pivot();
                  },
                  removeHoverStyle: function (t) {
                    e.DatasetController.prototype.removeHoverStyle.call(
                      this,
                      t,
                      this.chart.options.elements.arc,
                    );
                  },
                  countVisibleElements: function () {
                    var i = this.getDataset(),
                      t = this.getMeta(),
                      n = 0;
                    return (
                      k.each(t.data, function (t, e) {
                        isNaN(i.data[e]) || t.hidden || n++;
                      }),
                      n
                    );
                  },
                  calculateCircumference: function (t) {
                    var e = this.getMeta().count;
                    return 0 < e && !isNaN(t) ? (2 * Math.PI) / e : 0;
                  },
                }));
            };
          },
          {},
        ],
        20: [
          function (t, e, i) {
            "use strict";
            e.exports = function (e) {
              var u = e.helpers;
              (e.defaults.radar = {
                scale: { type: "radialLinear" },
                elements: { line: { tension: 0 } },
              }),
                (e.controllers.radar = e.DatasetController.extend({
                  datasetElementType: e.elements.Line,
                  dataElementType: e.elements.Point,
                  linkScales: u.noop,
                  addElementAndReset: function (t) {
                    e.DatasetController.prototype.addElementAndReset.call(
                      this,
                      t,
                    ),
                      this.updateBezierControlPoints();
                  },
                  update: function (i) {
                    var n = this,
                      t = n.getMeta(),
                      e = t.dataset,
                      a = t.data,
                      r = e.custom || {},
                      o = n.getDataset(),
                      s = n.chart.options.elements.line,
                      l = n.chart.scale;
                    void 0 !== o.tension &&
                      void 0 === o.lineTension &&
                      (o.lineTension = o.tension),
                      u.extend(t.dataset, {
                        _datasetIndex: n.index,
                        _children: a,
                        _loop: !0,
                        _model: {
                          tension: r.tension
                            ? r.tension
                            : u.getValueOrDefault(o.lineTension, s.tension),
                          backgroundColor: r.backgroundColor
                            ? r.backgroundColor
                            : o.backgroundColor || s.backgroundColor,
                          borderWidth: r.borderWidth
                            ? r.borderWidth
                            : o.borderWidth || s.borderWidth,
                          borderColor: r.borderColor
                            ? r.borderColor
                            : o.borderColor || s.borderColor,
                          fill: r.fill
                            ? r.fill
                            : void 0 !== o.fill
                              ? o.fill
                              : s.fill,
                          borderCapStyle: r.borderCapStyle
                            ? r.borderCapStyle
                            : o.borderCapStyle || s.borderCapStyle,
                          borderDash: r.borderDash
                            ? r.borderDash
                            : o.borderDash || s.borderDash,
                          borderDashOffset: r.borderDashOffset
                            ? r.borderDashOffset
                            : o.borderDashOffset || s.borderDashOffset,
                          borderJoinStyle: r.borderJoinStyle
                            ? r.borderJoinStyle
                            : o.borderJoinStyle || s.borderJoinStyle,
                          scaleTop: l.top,
                          scaleBottom: l.bottom,
                          scaleZero: l.getBasePosition(),
                        },
                      }),
                      t.dataset.pivot(),
                      u.each(
                        a,
                        function (t, e) {
                          n.updateElement(t, e, i);
                        },
                        n,
                      ),
                      n.updateBezierControlPoints();
                  },
                  updateElement: function (t, e, i) {
                    var n = this,
                      a = t.custom || {},
                      r = n.getDataset(),
                      o = n.chart.scale,
                      s = n.chart.options.elements.point,
                      l = o.getPointPositionForValue(e, r.data[e]);
                    u.extend(t, {
                      _datasetIndex: n.index,
                      _index: e,
                      _scale: o,
                      _model: {
                        x: i ? o.xCenter : l.x,
                        y: i ? o.yCenter : l.y,
                        tension: a.tension
                          ? a.tension
                          : u.getValueOrDefault(
                              r.tension,
                              n.chart.options.elements.line.tension,
                            ),
                        radius: a.radius
                          ? a.radius
                          : u.getValueAtIndexOrDefault(
                              r.pointRadius,
                              e,
                              s.radius,
                            ),
                        backgroundColor: a.backgroundColor
                          ? a.backgroundColor
                          : u.getValueAtIndexOrDefault(
                              r.pointBackgroundColor,
                              e,
                              s.backgroundColor,
                            ),
                        borderColor: a.borderColor
                          ? a.borderColor
                          : u.getValueAtIndexOrDefault(
                              r.pointBorderColor,
                              e,
                              s.borderColor,
                            ),
                        borderWidth: a.borderWidth
                          ? a.borderWidth
                          : u.getValueAtIndexOrDefault(
                              r.pointBorderWidth,
                              e,
                              s.borderWidth,
                            ),
                        pointStyle: a.pointStyle
                          ? a.pointStyle
                          : u.getValueAtIndexOrDefault(
                              r.pointStyle,
                              e,
                              s.pointStyle,
                            ),
                        hitRadius: a.hitRadius
                          ? a.hitRadius
                          : u.getValueAtIndexOrDefault(
                              r.hitRadius,
                              e,
                              s.hitRadius,
                            ),
                      },
                    }),
                      (t._model.skip = a.skip
                        ? a.skip
                        : isNaN(t._model.x) || isNaN(t._model.y));
                  },
                  updateBezierControlPoints: function () {
                    var a = this.chart.chartArea,
                      r = this.getMeta();
                    u.each(r.data, function (t, e) {
                      var i = t._model,
                        n = u.splineCurve(
                          u.previousItem(r.data, e, !0)._model,
                          i,
                          u.nextItem(r.data, e, !0)._model,
                          i.tension,
                        );
                      (i.controlPointPreviousX = Math.max(
                        Math.min(n.previous.x, a.right),
                        a.left,
                      )),
                        (i.controlPointPreviousY = Math.max(
                          Math.min(n.previous.y, a.bottom),
                          a.top,
                        )),
                        (i.controlPointNextX = Math.max(
                          Math.min(n.next.x, a.right),
                          a.left,
                        )),
                        (i.controlPointNextY = Math.max(
                          Math.min(n.next.y, a.bottom),
                          a.top,
                        )),
                        t.pivot();
                    });
                  },
                  draw: function (t) {
                    var e = this.getMeta(),
                      i = t || 1;
                    u.each(e.data, function (t) {
                      t.transition(i);
                    }),
                      e.dataset.transition(i).draw(),
                      u.each(e.data, function (t) {
                        t.draw();
                      });
                  },
                  setHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      i = t.custom || {},
                      n = t._index,
                      a = t._model;
                    (a.radius = i.hoverRadius
                      ? i.hoverRadius
                      : u.getValueAtIndexOrDefault(
                          e.pointHoverRadius,
                          n,
                          this.chart.options.elements.point.hoverRadius,
                        )),
                      (a.backgroundColor = i.hoverBackgroundColor
                        ? i.hoverBackgroundColor
                        : u.getValueAtIndexOrDefault(
                            e.pointHoverBackgroundColor,
                            n,
                            u.getHoverColor(a.backgroundColor),
                          )),
                      (a.borderColor = i.hoverBorderColor
                        ? i.hoverBorderColor
                        : u.getValueAtIndexOrDefault(
                            e.pointHoverBorderColor,
                            n,
                            u.getHoverColor(a.borderColor),
                          )),
                      (a.borderWidth = i.hoverBorderWidth
                        ? i.hoverBorderWidth
                        : u.getValueAtIndexOrDefault(
                            e.pointHoverBorderWidth,
                            n,
                            a.borderWidth,
                          ));
                  },
                  removeHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      i = t.custom || {},
                      n = t._index,
                      a = t._model,
                      r = this.chart.options.elements.point;
                    (a.radius = i.radius
                      ? i.radius
                      : u.getValueAtIndexOrDefault(e.radius, n, r.radius)),
                      (a.backgroundColor = i.backgroundColor
                        ? i.backgroundColor
                        : u.getValueAtIndexOrDefault(
                            e.pointBackgroundColor,
                            n,
                            r.backgroundColor,
                          )),
                      (a.borderColor = i.borderColor
                        ? i.borderColor
                        : u.getValueAtIndexOrDefault(
                            e.pointBorderColor,
                            n,
                            r.borderColor,
                          )),
                      (a.borderWidth = i.borderWidth
                        ? i.borderWidth
                        : u.getValueAtIndexOrDefault(
                            e.pointBorderWidth,
                            n,
                            r.borderWidth,
                          ));
                  },
                }));
            };
          },
          {},
        ],
        21: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var i = t.helpers;
              (t.defaults.global.animation = {
                duration: 1e3,
                easing: "easeOutQuart",
                onProgress: i.noop,
                onComplete: i.noop,
              }),
                (t.Animation = t.Element.extend({
                  currentStep: null,
                  numSteps: 60,
                  easing: "",
                  render: null,
                  onAnimationProgress: null,
                  onAnimationComplete: null,
                })),
                (t.animationService = {
                  frameDuration: 17,
                  animations: [],
                  dropFrames: 0,
                  request: null,
                  addAnimation: function (t, e, i, n) {
                    var a = this;
                    n || (t.animating = !0);
                    for (var r = 0; r < a.animations.length; ++r)
                      if (a.animations[r].chartInstance === t)
                        return void (a.animations[r].animationObject = e);
                    a.animations.push({ chartInstance: t, animationObject: e }),
                      1 === a.animations.length && a.requestAnimationFrame();
                  },
                  cancelAnimation: function (e) {
                    var t = i.findIndex(this.animations, function (t) {
                      return t.chartInstance === e;
                    });
                    -1 !== t &&
                      (this.animations.splice(t, 1), (e.animating = !1));
                  },
                  requestAnimationFrame: function () {
                    var t = this;
                    null === t.request &&
                      (t.request = i.requestAnimFrame.call(window, function () {
                        (t.request = null), t.startDigest();
                      }));
                  },
                  startDigest: function () {
                    var t = this,
                      e = Date.now(),
                      i = 0;
                    1 < t.dropFrames &&
                      ((i = Math.floor(t.dropFrames)),
                      (t.dropFrames = t.dropFrames % 1));
                    for (var n = 0; n < t.animations.length; )
                      null === t.animations[n].animationObject.currentStep &&
                        (t.animations[n].animationObject.currentStep = 0),
                        (t.animations[n].animationObject.currentStep += 1 + i),
                        t.animations[n].animationObject.currentStep >
                          t.animations[n].animationObject.numSteps &&
                          (t.animations[n].animationObject.currentStep =
                            t.animations[n].animationObject.numSteps),
                        t.animations[n].animationObject.render(
                          t.animations[n].chartInstance,
                          t.animations[n].animationObject,
                        ),
                        t.animations[n].animationObject.onAnimationProgress &&
                          t.animations[n].animationObject.onAnimationProgress
                            .call &&
                          t.animations[
                            n
                          ].animationObject.onAnimationProgress.call(
                            t.animations[n].chartInstance,
                            t.animations[n],
                          ),
                        t.animations[n].animationObject.currentStep ===
                        t.animations[n].animationObject.numSteps
                          ? (t.animations[n].animationObject
                              .onAnimationComplete &&
                              t.animations[n].animationObject
                                .onAnimationComplete.call &&
                              t.animations[
                                n
                              ].animationObject.onAnimationComplete.call(
                                t.animations[n].chartInstance,
                                t.animations[n],
                              ),
                            (t.animations[n].chartInstance.animating = !1),
                            t.animations.splice(n, 1))
                          : ++n;
                    var a = (Date.now() - e) / t.frameDuration;
                    (t.dropFrames += a),
                      0 < t.animations.length && t.requestAnimationFrame();
                  },
                });
            };
          },
          {},
        ],
        22: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              (t.canvasHelpers = {}).drawPoint = function (t, e, i, n, a) {
                var r, o, s, l, u, d;
                if (
                  "object" != typeof e ||
                  ("[object HTMLImageElement]" !== (r = e.toString()) &&
                    "[object HTMLCanvasElement]" !== r)
                ) {
                  if (!(isNaN(i) || i <= 0)) {
                    switch (e) {
                      default:
                        t.beginPath(),
                          t.arc(n, a, i, 0, 2 * Math.PI),
                          t.closePath(),
                          t.fill();
                        break;
                      case "triangle":
                        t.beginPath(),
                          (u =
                            ((o = (3 * i) / Math.sqrt(3)) * Math.sqrt(3)) / 2),
                          t.moveTo(n - o / 2, a + u / 3),
                          t.lineTo(n + o / 2, a + u / 3),
                          t.lineTo(n, a - (2 * u) / 3),
                          t.closePath(),
                          t.fill();
                        break;
                      case "rect":
                        (d = (1 / Math.SQRT2) * i),
                          t.beginPath(),
                          t.fillRect(n - d, a - d, 2 * d, 2 * d),
                          t.strokeRect(n - d, a - d, 2 * d, 2 * d);
                        break;
                      case "rectRot":
                        (d = (1 / Math.SQRT2) * i),
                          t.beginPath(),
                          t.moveTo(n - d, a),
                          t.lineTo(n, a + d),
                          t.lineTo(n + d, a),
                          t.lineTo(n, a - d),
                          t.closePath(),
                          t.fill();
                        break;
                      case "cross":
                        t.beginPath(),
                          t.moveTo(n, a + i),
                          t.lineTo(n, a - i),
                          t.moveTo(n - i, a),
                          t.lineTo(n + i, a),
                          t.closePath();
                        break;
                      case "crossRot":
                        t.beginPath(),
                          (s = Math.cos(Math.PI / 4) * i),
                          (l = Math.sin(Math.PI / 4) * i),
                          t.moveTo(n - s, a - l),
                          t.lineTo(n + s, a + l),
                          t.moveTo(n - s, a + l),
                          t.lineTo(n + s, a - l),
                          t.closePath();
                        break;
                      case "star":
                        t.beginPath(),
                          t.moveTo(n, a + i),
                          t.lineTo(n, a - i),
                          t.moveTo(n - i, a),
                          t.lineTo(n + i, a),
                          (s = Math.cos(Math.PI / 4) * i),
                          (l = Math.sin(Math.PI / 4) * i),
                          t.moveTo(n - s, a - l),
                          t.lineTo(n + s, a + l),
                          t.moveTo(n - s, a + l),
                          t.lineTo(n + s, a - l),
                          t.closePath();
                        break;
                      case "line":
                        t.beginPath(),
                          t.moveTo(n - i, a),
                          t.lineTo(n + i, a),
                          t.closePath();
                        break;
                      case "dash":
                        t.beginPath(),
                          t.moveTo(n, a),
                          t.lineTo(n + i, a),
                          t.closePath();
                    }
                    t.stroke();
                  }
                } else t.drawImage(e, n - e.width / 2, a - e.height / 2);
              };
            };
          },
          {},
        ],
        23: [
          function (t, e, i) {
            "use strict";
            e.exports = function (l) {
              var u = l.helpers;
              (l.types = {}),
                (l.instances = {}),
                (l.controllers = {}),
                (l.Controller = function (t) {
                  return (
                    (this.chart = t),
                    (this.config = t.config),
                    (this.options = this.config.options =
                      u.configMerge(
                        l.defaults.global,
                        l.defaults[this.config.type],
                        this.config.options || {},
                      )),
                    (this.id = u.uid()),
                    Object.defineProperty(this, "data", {
                      get: function () {
                        return this.config.data;
                      },
                    }),
                    (l.instances[this.id] = this).options.responsive &&
                      this.resize(!0),
                    this.initialize(),
                    this
                  );
                }),
                u.extend(l.Controller.prototype, {
                  initialize: function () {
                    var t = this;
                    return (
                      l.plugins.notify("beforeInit", [t]),
                      t.bindEvents(),
                      t.ensureScalesHaveIDs(),
                      t.buildOrUpdateControllers(),
                      t.buildScales(),
                      t.updateLayout(),
                      t.resetElements(),
                      t.initToolTip(),
                      t.update(),
                      l.plugins.notify("afterInit", [t]),
                      t
                    );
                  },
                  clear: function () {
                    return u.clear(this.chart), this;
                  },
                  stop: function () {
                    return l.animationService.cancelAnimation(this), this;
                  },
                  resize: function (t) {
                    var e = this,
                      i = e.chart,
                      n = i.canvas,
                      a = u.getMaximumWidth(n),
                      r = i.aspectRatio,
                      o =
                        e.options.maintainAspectRatio &&
                        !1 === isNaN(r) &&
                        isFinite(r) &&
                        0 !== r
                          ? a / r
                          : u.getMaximumHeight(n);
                    if (!(i.width !== a || i.height !== o)) return e;
                    (n.width = i.width = a),
                      (n.height = i.height = o),
                      u.retinaScale(i);
                    var s = { width: a, height: o };
                    return (
                      l.plugins.notify("resize", [e, s]),
                      e.options.onResize && e.options.onResize(e, s),
                      t ||
                        (e.stop(),
                        e.update(e.options.responsiveAnimationDuration)),
                      e
                    );
                  },
                  ensureScalesHaveIDs: function () {
                    var t = this.options,
                      e = t.scales || {},
                      i = t.scale;
                    u.each(e.xAxes, function (t, e) {
                      t.id = t.id || "x-axis-" + e;
                    }),
                      u.each(e.yAxes, function (t, e) {
                        t.id = t.id || "y-axis-" + e;
                      }),
                      i && (i.id = i.id || "scale");
                  },
                  buildScales: function () {
                    var r = this,
                      t = r.options,
                      o = (r.scales = {}),
                      e = [];
                    t.scales &&
                      (e = e.concat(
                        (t.scales.xAxes || []).map(function (t) {
                          return { options: t, dtype: "category" };
                        }),
                        (t.scales.yAxes || []).map(function (t) {
                          return { options: t, dtype: "linear" };
                        }),
                      )),
                      t.scale &&
                        e.push({
                          options: t.scale,
                          dtype: "radialLinear",
                          isDefault: !0,
                        }),
                      u.each(e, function (t) {
                        var e = t.options,
                          i = u.getValueOrDefault(e.type, t.dtype),
                          n = l.scaleService.getScaleConstructor(i);
                        if (n) {
                          var a = new n({
                            id: e.id,
                            options: e,
                            ctx: r.chart.ctx,
                            chart: r,
                          });
                          (o[a.id] = a), t.isDefault && (r.scale = a);
                        }
                      }),
                      l.scaleService.addScalesToLayout(this);
                  },
                  updateLayout: function () {
                    l.layoutService.update(
                      this,
                      this.chart.width,
                      this.chart.height,
                    );
                  },
                  buildOrUpdateControllers: function () {
                    var n = this,
                      a = [],
                      r = [];
                    if (
                      (u.each(
                        n.data.datasets,
                        function (t, e) {
                          var i = n.getDatasetMeta(e);
                          i.type || (i.type = t.type || n.config.type),
                            a.push(i.type),
                            i.controller
                              ? i.controller.updateIndex(e)
                              : ((i.controller = new l.controllers[i.type](
                                  n,
                                  e,
                                )),
                                r.push(i.controller));
                        },
                        n,
                      ),
                      1 < a.length)
                    )
                      for (var t = 1; t < a.length; t++)
                        if (a[t] !== a[t - 1]) {
                          n.isCombo = !0;
                          break;
                        }
                    return r;
                  },
                  resetElements: function () {
                    var i = this;
                    u.each(
                      i.data.datasets,
                      function (t, e) {
                        i.getDatasetMeta(e).controller.reset();
                      },
                      i,
                    );
                  },
                  update: function (t, e) {
                    var i = this;
                    l.plugins.notify("beforeUpdate", [i]),
                      (i.tooltip._data = i.data);
                    var n = i.buildOrUpdateControllers();
                    u.each(
                      i.data.datasets,
                      function (t, e) {
                        i.getDatasetMeta(e).controller.buildOrUpdateElements();
                      },
                      i,
                    ),
                      l.layoutService.update(i, i.chart.width, i.chart.height),
                      l.plugins.notify("afterScaleUpdate", [i]),
                      u.each(n, function (t) {
                        t.reset();
                      }),
                      i.updateDatasets(),
                      l.plugins.notify("afterUpdate", [i]),
                      i.render(t, e);
                  },
                  updateDatasets: function () {
                    var t, e;
                    if (l.plugins.notify("beforeDatasetsUpdate", [this])) {
                      for (t = 0, e = this.data.datasets.length; t < e; ++t)
                        this.getDatasetMeta(t).controller.update();
                      l.plugins.notify("afterDatasetsUpdate", [this]);
                    }
                  },
                  render: function (t, e) {
                    var i = this;
                    l.plugins.notify("beforeRender", [i]);
                    var n = i.options.animation;
                    if (
                      n &&
                      ((void 0 !== t && 0 !== t) ||
                        (void 0 === t && 0 !== n.duration))
                    ) {
                      var a = new l.Animation();
                      (a.numSteps = (t || n.duration) / 16.66),
                        (a.easing = n.easing),
                        (a.render = function (t, e) {
                          var i = u.easingEffects[e.easing],
                            n = e.currentStep / e.numSteps,
                            a = i(n);
                          t.draw(a, n, e.currentStep);
                        }),
                        (a.onAnimationProgress = n.onProgress),
                        (a.onAnimationComplete = n.onComplete),
                        l.animationService.addAnimation(i, a, t, e);
                    } else
                      i.draw(),
                        n &&
                          n.onComplete &&
                          n.onComplete.call &&
                          n.onComplete.call(i);
                    return i;
                  },
                  draw: function (i) {
                    var n = this,
                      t = i || 1;
                    n.clear(),
                      l.plugins.notify("beforeDraw", [n, t]),
                      u.each(
                        n.boxes,
                        function (t) {
                          t.draw(n.chartArea);
                        },
                        n,
                      ),
                      n.scale && n.scale.draw(),
                      l.plugins.notify("beforeDatasetsDraw", [n, t]),
                      u.each(
                        n.data.datasets,
                        function (t, e) {
                          n.isDatasetVisible(e) &&
                            n.getDatasetMeta(e).controller.draw(i);
                        },
                        n,
                        !0,
                      ),
                      l.plugins.notify("afterDatasetsDraw", [n, t]),
                      n.tooltip.transition(t).draw(),
                      l.plugins.notify("afterDraw", [n, t]);
                  },
                  getElementAtEvent: function (t) {
                    var n = this,
                      a = u.getRelativePosition(t, n.chart),
                      r = [];
                    return (
                      u.each(n.data.datasets, function (t, e) {
                        if (n.isDatasetVisible(e)) {
                          var i = n.getDatasetMeta(e);
                          u.each(i.data, function (t) {
                            if (t.inRange(a.x, a.y)) return r.push(t), r;
                          });
                        }
                      }),
                      r.slice(0, 1)
                    );
                  },
                  getElementsAtEvent: function (t) {
                    var n = this,
                      a = u.getRelativePosition(t, n.chart),
                      r = [],
                      o = function () {
                        if (n.data.datasets)
                          for (var t = 0; t < n.data.datasets.length; t++) {
                            var e = n.getDatasetMeta(t);
                            if (n.isDatasetVisible(t))
                              for (var i = 0; i < e.data.length; i++)
                                if (e.data[i].inRange(a.x, a.y))
                                  return e.data[i];
                          }
                      }.call(n);
                    return (
                      o &&
                        u.each(
                          n.data.datasets,
                          function (t, e) {
                            if (n.isDatasetVisible(e)) {
                              var i = n.getDatasetMeta(e).data[o._index];
                              i && !i._view.skip && r.push(i);
                            }
                          },
                          n,
                        ),
                      r
                    );
                  },
                  getElementsAtXAxis: function (t) {
                    var a = this,
                      n = u.getRelativePosition(t, a.chart),
                      r = [],
                      o = function () {
                        if (a.data.datasets)
                          for (var t = 0; t < a.data.datasets.length; t++) {
                            var e = a.getDatasetMeta(t);
                            if (a.isDatasetVisible(t))
                              for (var i = 0; i < e.data.length; i++)
                                if (e.data[i].inLabelRange(n.x, n.y))
                                  return e.data[i];
                          }
                      }.call(a);
                    return (
                      o &&
                        u.each(
                          a.data.datasets,
                          function (t, e) {
                            if (a.isDatasetVisible(e)) {
                              var i = a.getDatasetMeta(e),
                                n = u.findIndex(i.data, function (t) {
                                  return o._model.x === t._model.x;
                                });
                              -1 === n ||
                                i.data[n]._view.skip ||
                                r.push(i.data[n]);
                            }
                          },
                          a,
                        ),
                      r
                    );
                  },
                  getElementsAtEventForMode: function (t, e) {
                    switch (e) {
                      case "single":
                        return this.getElementAtEvent(t);
                      case "label":
                        return this.getElementsAtEvent(t);
                      case "dataset":
                        return this.getDatasetAtEvent(t);
                      case "x-axis":
                        return this.getElementsAtXAxis(t);
                      default:
                        return t;
                    }
                  },
                  getDatasetAtEvent: function (t) {
                    var e = this.getElementAtEvent(t);
                    return (
                      0 < e.length &&
                        (e = this.getDatasetMeta(e[0]._datasetIndex).data),
                      e
                    );
                  },
                  getDatasetMeta: function (t) {
                    var e = this.data.datasets[t];
                    e._meta || (e._meta = {});
                    var i = e._meta[this.id];
                    return (
                      i ||
                        (i = e._meta[this.id] =
                          {
                            type: null,
                            data: [],
                            dataset: null,
                            controller: null,
                            hidden: null,
                            xAxisID: null,
                            yAxisID: null,
                          }),
                      i
                    );
                  },
                  getVisibleDatasetCount: function () {
                    for (
                      var t = 0, e = 0, i = this.data.datasets.length;
                      e < i;
                      ++e
                    )
                      this.isDatasetVisible(e) && t++;
                    return t;
                  },
                  isDatasetVisible: function (t) {
                    var e = this.getDatasetMeta(t);
                    return "boolean" == typeof e.hidden
                      ? !e.hidden
                      : !this.data.datasets[t].hidden;
                  },
                  generateLegend: function () {
                    return this.options.legendCallback(this);
                  },
                  destroy: function () {
                    var t = this;
                    t.stop(),
                      t.clear(),
                      u.unbindEvents(t, t.events),
                      u.removeResizeListener(t.chart.canvas.parentNode);
                    var e = t.chart.canvas;
                    (e.width = t.chart.width),
                      (e.height = t.chart.height),
                      void 0 !== t.chart.originalDevicePixelRatio &&
                        t.chart.ctx.scale(
                          1 / t.chart.originalDevicePixelRatio,
                          1 / t.chart.originalDevicePixelRatio,
                        ),
                      (e.style.width = t.chart.originalCanvasStyleWidth),
                      (e.style.height = t.chart.originalCanvasStyleHeight),
                      l.plugins.notify("destroy", [t]),
                      delete l.instances[t.id];
                  },
                  toBase64Image: function () {
                    return this.chart.canvas.toDataURL.apply(
                      this.chart.canvas,
                      arguments,
                    );
                  },
                  initToolTip: function () {
                    var t = this;
                    t.tooltip = new l.Tooltip(
                      {
                        _chart: t.chart,
                        _chartInstance: t,
                        _data: t.data,
                        _options: t.options.tooltips,
                      },
                      t,
                    );
                  },
                  bindEvents: function () {
                    var e = this;
                    u.bindEvents(e, e.options.events, function (t) {
                      e.eventHandler(t);
                    });
                  },
                  updateHoverStyle: function (t, e, i) {
                    var n,
                      a,
                      r,
                      o = i ? "setHoverStyle" : "removeHoverStyle";
                    switch (e) {
                      case "single":
                        t = [t[0]];
                        break;
                      case "label":
                      case "dataset":
                      case "x-axis":
                        break;
                      default:
                        return;
                    }
                    for (a = 0, r = t.length; a < r; ++a)
                      (n = t[a]) &&
                        this.getDatasetMeta(n._datasetIndex).controller[o](n);
                  },
                  eventHandler: function (t) {
                    var e = this,
                      i = e.tooltip,
                      n = e.options || {},
                      a = n.hover,
                      r = n.tooltips;
                    return (
                      (e.lastActive = e.lastActive || []),
                      (e.lastTooltipActive = e.lastTooltipActive || []),
                      "mouseout" === t.type
                        ? ((e.active = []), (e.tooltipActive = []))
                        : ((e.active = e.getElementsAtEventForMode(t, a.mode)),
                          (e.tooltipActive = e.getElementsAtEventForMode(
                            t,
                            r.mode,
                          ))),
                      a.onHover && a.onHover.call(e, e.active),
                      ("mouseup" !== t.type && "click" !== t.type) ||
                        (n.onClick && n.onClick.call(e, t, e.active),
                        e.legend &&
                          e.legend.handleEvent &&
                          e.legend.handleEvent(t)),
                      e.lastActive.length &&
                        e.updateHoverStyle(e.lastActive, a.mode, !1),
                      e.active.length &&
                        a.mode &&
                        e.updateHoverStyle(e.active, a.mode, !0),
                      (r.enabled || r.custom) &&
                        (i.initialize(),
                        (i._active = e.tooltipActive),
                        i.update(!0)),
                      i.pivot(),
                      e.animating ||
                        (u.arrayEquals(e.active, e.lastActive) &&
                          u.arrayEquals(
                            e.tooltipActive,
                            e.lastTooltipActive,
                          )) ||
                        (e.stop(),
                        (r.enabled || r.custom) && i.update(!0),
                        e.render(a.animationDuration, !0)),
                      (e.lastActive = e.active),
                      (e.lastTooltipActive = e.tooltipActive),
                      e
                    );
                  },
                });
            };
          },
          {},
        ],
        24: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var s = t.helpers,
                e = s.noop;
              (t.DatasetController = function (t, e) {
                this.initialize.call(this, t, e);
              }),
                s.extend(t.DatasetController.prototype, {
                  datasetElementType: null,
                  dataElementType: null,
                  initialize: function (t, e) {
                    (this.chart = t),
                      (this.index = e),
                      this.linkScales(),
                      this.addElements();
                  },
                  updateIndex: function (t) {
                    this.index = t;
                  },
                  linkScales: function () {
                    var t = this.getMeta(),
                      e = this.getDataset();
                    null === t.xAxisID &&
                      (t.xAxisID =
                        e.xAxisID || this.chart.options.scales.xAxes[0].id),
                      null === t.yAxisID &&
                        (t.yAxisID =
                          e.yAxisID || this.chart.options.scales.yAxes[0].id);
                  },
                  getDataset: function () {
                    return this.chart.data.datasets[this.index];
                  },
                  getMeta: function () {
                    return this.chart.getDatasetMeta(this.index);
                  },
                  getScaleForId: function (t) {
                    return this.chart.scales[t];
                  },
                  reset: function () {
                    this.update(!0);
                  },
                  createMetaDataset: function () {
                    var t = this.datasetElementType;
                    return (
                      t &&
                      new t({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                      })
                    );
                  },
                  createMetaData: function (t) {
                    var e = this.dataElementType;
                    return (
                      e &&
                      new e({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: t,
                      })
                    );
                  },
                  addElements: function () {
                    var t,
                      e,
                      i = this.getMeta(),
                      n = this.getDataset().data || [],
                      a = i.data;
                    for (t = 0, e = n.length; t < e; ++t)
                      a[t] = a[t] || this.createMetaData(i, t);
                    i.dataset = i.dataset || this.createMetaDataset();
                  },
                  addElementAndReset: function (t) {
                    var e = this.createMetaData(t);
                    this.getMeta().data.splice(t, 0, e),
                      this.updateElement(e, t, !0);
                  },
                  buildOrUpdateElements: function () {
                    var t = this.getMeta().data,
                      e = this.getDataset().data.length,
                      i = t.length;
                    if (e < i) t.splice(e, i - e);
                    else if (i < e)
                      for (var n = i; n < e; ++n) this.addElementAndReset(n);
                  },
                  update: e,
                  draw: function (t) {
                    var e = t || 1;
                    s.each(this.getMeta().data, function (t) {
                      t.transition(e).draw();
                    });
                  },
                  removeHoverStyle: function (t, e) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                      n = t._index,
                      a = t.custom || {},
                      r = s.getValueAtIndexOrDefault,
                      o = t._model;
                    (o.backgroundColor = a.backgroundColor
                      ? a.backgroundColor
                      : r(i.backgroundColor, n, e.backgroundColor)),
                      (o.borderColor = a.borderColor
                        ? a.borderColor
                        : r(i.borderColor, n, e.borderColor)),
                      (o.borderWidth = a.borderWidth
                        ? a.borderWidth
                        : r(i.borderWidth, n, e.borderWidth));
                  },
                  setHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      i = t._index,
                      n = t.custom || {},
                      a = s.getValueAtIndexOrDefault,
                      r = s.getHoverColor,
                      o = t._model;
                    (o.backgroundColor = n.hoverBackgroundColor
                      ? n.hoverBackgroundColor
                      : a(e.hoverBackgroundColor, i, r(o.backgroundColor))),
                      (o.borderColor = n.hoverBorderColor
                        ? n.hoverBorderColor
                        : a(e.hoverBorderColor, i, r(o.borderColor))),
                      (o.borderWidth = n.hoverBorderWidth
                        ? n.hoverBorderWidth
                        : a(e.hoverBorderWidth, i, o.borderWidth));
                  },
                }),
                (t.DatasetController.extend = s.inherits);
            };
          },
          {},
        ],
        25: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var o = t.helpers;
              (t.elements = {}),
                (t.Element = function (t) {
                  o.extend(this, t), this.initialize.apply(this, arguments);
                }),
                o.extend(t.Element.prototype, {
                  initialize: function () {
                    this.hidden = !1;
                  },
                  pivot: function () {
                    var t = this;
                    return (
                      t._view || (t._view = o.clone(t._model)),
                      (t._start = o.clone(t._view)),
                      t
                    );
                  },
                  transition: function (a) {
                    var r = this;
                    return (
                      r._view || (r._view = o.clone(r._model)),
                      1 === a
                        ? ((r._view = r._model), (r._start = null))
                        : (r._start || r.pivot(),
                          o.each(
                            r._model,
                            function (e, i) {
                              if ("_" === i[0]);
                              else if (r._view.hasOwnProperty(i))
                                if (e === r._view[i]);
                                else if ("string" == typeof e)
                                  try {
                                    var t = o
                                      .color(r._model[i])
                                      .mix(o.color(r._start[i]), a);
                                    r._view[i] = t.rgbString();
                                  } catch (t) {
                                    r._view[i] = e;
                                  }
                                else if ("number" == typeof e) {
                                  var n =
                                    void 0 !== r._start[i] &&
                                    !1 === isNaN(r._start[i])
                                      ? r._start[i]
                                      : 0;
                                  r._view[i] = (r._model[i] - n) * a + n;
                                } else r._view[i] = e;
                              else
                                "number" != typeof e || isNaN(r._view[i])
                                  ? (r._view[i] = e)
                                  : (r._view[i] = e * a);
                            },
                            r,
                          )),
                      r
                    );
                  },
                  tooltipPosition: function () {
                    return { x: this._model.x, y: this._model.y };
                  },
                  hasValue: function () {
                    return (
                      o.isNumber(this._model.x) && o.isNumber(this._model.y)
                    );
                  },
                }),
                (t.Element.extend = o.inherits);
            };
          },
          {},
        ],
        26: [
          function (t, e, i) {
            "use strict";
            var n = t(2);
            e.exports = function (o) {
              var t,
                g = (o.helpers = {});
              (g.each = function (t, e, i, n) {
                var a, r;
                if (g.isArray(t))
                  if (((r = t.length), n))
                    for (a = r - 1; 0 <= a; a--) e.call(i, t[a], a);
                  else for (a = 0; a < r; a++) e.call(i, t[a], a);
                else if ("object" == typeof t) {
                  var o = Object.keys(t);
                  for (r = o.length, a = 0; a < r; a++)
                    e.call(i, t[o[a]], o[a]);
                }
              }),
                (g.clone = function (t) {
                  var i = {};
                  return (
                    g.each(t, function (t, e) {
                      g.isArray(t)
                        ? (i[e] = t.slice(0))
                        : (i[e] =
                            "object" == typeof t && null !== t
                              ? g.clone(t)
                              : t);
                    }),
                    i
                  );
                }),
                (g.extend = function (i) {
                  for (
                    var t = function (t, e) {
                        i[e] = t;
                      },
                      e = 1,
                      n = arguments.length;
                    e < n;
                    e++
                  )
                    g.each(arguments[e], t);
                  return i;
                }),
                (g.configMerge = function (t) {
                  var n = g.clone(t);
                  return (
                    g.each(
                      Array.prototype.slice.call(arguments, 1),
                      function (t) {
                        g.each(t, function (t, e) {
                          if ("scales" === e)
                            n[e] = g.scaleMerge(
                              n.hasOwnProperty(e) ? n[e] : {},
                              t,
                            );
                          else if ("scale" === e)
                            n[e] = g.configMerge(
                              n.hasOwnProperty(e) ? n[e] : {},
                              o.scaleService.getScaleDefaults(t.type),
                              t,
                            );
                          else if (
                            n.hasOwnProperty(e) &&
                            g.isArray(n[e]) &&
                            g.isArray(t)
                          ) {
                            var i = n[e];
                            g.each(t, function (t, e) {
                              e < i.length
                                ? "object" == typeof i[e] &&
                                  null !== i[e] &&
                                  "object" == typeof t &&
                                  null !== t
                                  ? (i[e] = g.configMerge(i[e], t))
                                  : (i[e] = t)
                                : i.push(t);
                            });
                          } else
                            n.hasOwnProperty(e) &&
                            "object" == typeof n[e] &&
                            null !== n[e] &&
                            "object" == typeof t
                              ? (n[e] = g.configMerge(n[e], t))
                              : (n[e] = t);
                        });
                      },
                    ),
                    n
                  );
                }),
                (g.scaleMerge = function (t, e) {
                  var r = g.clone(t);
                  return (
                    g.each(e, function (t, a) {
                      "xAxes" === a || "yAxes" === a
                        ? r.hasOwnProperty(a)
                          ? g.each(t, function (t, e) {
                              var i = g.getValueOrDefault(
                                  t.type,
                                  "xAxes" === a ? "category" : "linear",
                                ),
                                n = o.scaleService.getScaleDefaults(i);
                              e >= r[a].length || !r[a][e].type
                                ? r[a].push(g.configMerge(n, t))
                                : t.type && t.type !== r[a][e].type
                                  ? (r[a][e] = g.configMerge(r[a][e], n, t))
                                  : (r[a][e] = g.configMerge(r[a][e], t));
                            })
                          : ((r[a] = []),
                            g.each(t, function (t) {
                              var e = g.getValueOrDefault(
                                t.type,
                                "xAxes" === a ? "category" : "linear",
                              );
                              r[a].push(
                                g.configMerge(
                                  o.scaleService.getScaleDefaults(e),
                                  t,
                                ),
                              );
                            }))
                        : r.hasOwnProperty(a) &&
                            "object" == typeof r[a] &&
                            null !== r[a] &&
                            "object" == typeof t
                          ? (r[a] = g.configMerge(r[a], t))
                          : (r[a] = t);
                    }),
                    r
                  );
                }),
                (g.getValueAtIndexOrDefault = function (t, e, i) {
                  return null == t
                    ? i
                    : g.isArray(t)
                      ? e < t.length
                        ? t[e]
                        : i
                      : t;
                }),
                (g.getValueOrDefault = function (t, e) {
                  return void 0 === t ? e : t;
                }),
                (g.indexOf = Array.prototype.indexOf
                  ? function (t, e) {
                      return t.indexOf(e);
                    }
                  : function (t, e) {
                      for (var i = 0, n = t.length; i < n; ++i)
                        if (t[i] === e) return i;
                      return -1;
                    }),
                (g.where = function (t, e) {
                  if (g.isArray(t) && Array.prototype.filter)
                    return t.filter(e);
                  var i = [];
                  return (
                    g.each(t, function (t) {
                      e(t) && i.push(t);
                    }),
                    i
                  );
                }),
                (g.findIndex = Array.prototype.findIndex
                  ? function (t, e, i) {
                      return t.findIndex(e, i);
                    }
                  : function (t, e, i) {
                      i = void 0 === i ? t : i;
                      for (var n = 0, a = t.length; n < a; ++n)
                        if (e.call(i, t[n], n, t)) return n;
                      return -1;
                    }),
                (g.findNextWhere = function (t, e, i) {
                  null == i && (i = -1);
                  for (var n = i + 1; n < t.length; n++) {
                    var a = t[n];
                    if (e(a)) return a;
                  }
                }),
                (g.findPreviousWhere = function (t, e, i) {
                  null == i && (i = t.length);
                  for (var n = i - 1; 0 <= n; n--) {
                    var a = t[n];
                    if (e(a)) return a;
                  }
                }),
                (g.inherits = function (t) {
                  var e = this,
                    i =
                      t && t.hasOwnProperty("constructor")
                        ? t.constructor
                        : function () {
                            return e.apply(this, arguments);
                          },
                    n = function () {
                      this.constructor = i;
                    };
                  return (
                    (n.prototype = e.prototype),
                    (i.prototype = new n()),
                    (i.extend = g.inherits),
                    t && g.extend(i.prototype, t),
                    (i.__super__ = e.prototype),
                    i
                  );
                }),
                (g.noop = function () {}),
                (g.uid =
                  ((t = 0),
                  function () {
                    return t++;
                  })),
                (g.isNumber = function (t) {
                  return !isNaN(parseFloat(t)) && isFinite(t);
                }),
                (g.almostEquals = function (t, e, i) {
                  return Math.abs(t - e) < i;
                }),
                (g.max = function (t) {
                  return t.reduce(function (t, e) {
                    return isNaN(e) ? t : Math.max(t, e);
                  }, Number.NEGATIVE_INFINITY);
                }),
                (g.min = function (t) {
                  return t.reduce(function (t, e) {
                    return isNaN(e) ? t : Math.min(t, e);
                  }, Number.POSITIVE_INFINITY);
                }),
                (g.sign = Math.sign
                  ? function (t) {
                      return Math.sign(t);
                    }
                  : function (t) {
                      return 0 === (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1;
                    }),
                (g.log10 = Math.log10
                  ? function (t) {
                      return Math.log10(t);
                    }
                  : function (t) {
                      return Math.log(t) / Math.LN10;
                    }),
                (g.toRadians = function (t) {
                  return t * (Math.PI / 180);
                }),
                (g.toDegrees = function (t) {
                  return t * (180 / Math.PI);
                }),
                (g.getAngleFromPoint = function (t, e) {
                  var i = e.x - t.x,
                    n = e.y - t.y,
                    a = Math.sqrt(i * i + n * n),
                    r = Math.atan2(n, i);
                  return (
                    r < -0.5 * Math.PI && (r += 2 * Math.PI),
                    { angle: r, distance: a }
                  );
                }),
                (g.aliasPixel = function (t) {
                  return t % 2 == 0 ? 0 : 0.5;
                }),
                (g.splineCurve = function (t, e, i, n) {
                  var a = t.skip ? e : t,
                    r = e,
                    o = i.skip ? e : i,
                    s = Math.sqrt(
                      Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2),
                    ),
                    l = Math.sqrt(
                      Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2),
                    ),
                    u = s / (s + l),
                    d = l / (s + l),
                    c = n * (u = isNaN(u) ? 0 : u),
                    h = n * (d = isNaN(d) ? 0 : d);
                  return {
                    previous: {
                      x: r.x - c * (o.x - a.x),
                      y: r.y - c * (o.y - a.y),
                    },
                    next: {
                      x: r.x + h * (o.x - a.x),
                      y: r.y + h * (o.y - a.y),
                    },
                  };
                }),
                (g.nextItem = function (t, e, i) {
                  return i
                    ? e >= t.length - 1
                      ? t[0]
                      : t[e + 1]
                    : e >= t.length - 1
                      ? t[t.length - 1]
                      : t[e + 1];
                }),
                (g.previousItem = function (t, e, i) {
                  return i
                    ? e <= 0
                      ? t[t.length - 1]
                      : t[e - 1]
                    : e <= 0
                      ? t[0]
                      : t[e - 1];
                }),
                (g.niceNum = function (t, e) {
                  var i = Math.floor(g.log10(t)),
                    n = t / Math.pow(10, i);
                  return (
                    (e
                      ? n < 1.5
                        ? 1
                        : n < 3
                          ? 2
                          : n < 7
                            ? 5
                            : 10
                      : n <= 1
                        ? 1
                        : n <= 2
                          ? 2
                          : n <= 5
                            ? 5
                            : 10) * Math.pow(10, i)
                  );
                });
              var e = (g.easingEffects = {
                linear: function (t) {
                  return t;
                },
                easeInQuad: function (t) {
                  return t * t;
                },
                easeOutQuad: function (t) {
                  return -1 * t * (t - 2);
                },
                easeInOutQuad: function (t) {
                  return (t /= 0.5) < 1
                    ? 0.5 * t * t
                    : -0.5 * (--t * (t - 2) - 1);
                },
                easeInCubic: function (t) {
                  return t * t * t;
                },
                easeOutCubic: function (t) {
                  return 1 * ((t = t / 1 - 1) * t * t + 1);
                },
                easeInOutCubic: function (t) {
                  return (t /= 0.5) < 1
                    ? 0.5 * t * t * t
                    : 0.5 * ((t -= 2) * t * t + 2);
                },
                easeInQuart: function (t) {
                  return t * t * t * t;
                },
                easeOutQuart: function (t) {
                  return -1 * ((t = t / 1 - 1) * t * t * t - 1);
                },
                easeInOutQuart: function (t) {
                  return (t /= 0.5) < 1
                    ? 0.5 * t * t * t * t
                    : -0.5 * ((t -= 2) * t * t * t - 2);
                },
                easeInQuint: function (t) {
                  return 1 * (t /= 1) * t * t * t * t;
                },
                easeOutQuint: function (t) {
                  return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
                },
                easeInOutQuint: function (t) {
                  return (t /= 0.5) < 1
                    ? 0.5 * t * t * t * t * t
                    : 0.5 * ((t -= 2) * t * t * t * t + 2);
                },
                easeInSine: function (t) {
                  return -1 * Math.cos((t / 1) * (Math.PI / 2)) + 1;
                },
                easeOutSine: function (t) {
                  return 1 * Math.sin((t / 1) * (Math.PI / 2));
                },
                easeInOutSine: function (t) {
                  return -0.5 * (Math.cos((Math.PI * t) / 1) - 1);
                },
                easeInExpo: function (t) {
                  return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
                },
                easeOutExpo: function (t) {
                  return 1 === t ? 1 : 1 * (1 - Math.pow(2, (-10 * t) / 1));
                },
                easeInOutExpo: function (t) {
                  return 0 === t
                    ? 0
                    : 1 === t
                      ? 1
                      : (t /= 0.5) < 1
                        ? 0.5 * Math.pow(2, 10 * (t - 1))
                        : 0.5 * (2 - Math.pow(2, -10 * --t));
                },
                easeInCirc: function (t) {
                  return 1 <= t ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
                },
                easeOutCirc: function (t) {
                  return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
                },
                easeInOutCirc: function (t) {
                  return (t /= 0.5) < 1
                    ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                    : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                },
                easeInElastic: function (t) {
                  var e = 1.70158,
                    i = 0,
                    n = 1;
                  return 0 === t
                    ? 0
                    : 1 == (t /= 1)
                      ? 1
                      : (i || (i = 0.3),
                        (e =
                          n < Math.abs(1)
                            ? ((n = 1), i / 4)
                            : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                        -n *
                          Math.pow(2, 10 * (t -= 1)) *
                          Math.sin(((1 * t - e) * (2 * Math.PI)) / i));
                },
                easeOutElastic: function (t) {
                  var e = 1.70158,
                    i = 0,
                    n = 1;
                  return 0 === t
                    ? 0
                    : 1 == (t /= 1)
                      ? 1
                      : (i || (i = 0.3),
                        (e =
                          n < Math.abs(1)
                            ? ((n = 1), i / 4)
                            : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                        n *
                          Math.pow(2, -10 * t) *
                          Math.sin(((1 * t - e) * (2 * Math.PI)) / i) +
                          1);
                },
                easeInOutElastic: function (t) {
                  var e = 1.70158,
                    i = 0,
                    n = 1;
                  return 0 === t
                    ? 0
                    : 2 == (t /= 0.5)
                      ? 1
                      : (i || (i = 0.3 * 1.5 * 1),
                        (e =
                          n < Math.abs(1)
                            ? ((n = 1), i / 4)
                            : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                        t < 1
                          ? n *
                            Math.pow(2, 10 * (t -= 1)) *
                            Math.sin(((1 * t - e) * (2 * Math.PI)) / i) *
                            -0.5
                          : n *
                              Math.pow(2, -10 * (t -= 1)) *
                              Math.sin(((1 * t - e) * (2 * Math.PI)) / i) *
                              0.5 +
                            1);
                },
                easeInBack: function (t) {
                  return 1 * (t /= 1) * t * (2.70158 * t - 1.70158);
                },
                easeOutBack: function (t) {
                  return (
                    1 * ((t = t / 1 - 1) * t * (2.70158 * t + 1.70158) + 1)
                  );
                },
                easeInOutBack: function (t) {
                  var e = 1.70158;
                  return (t /= 0.5) < 1
                    ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
                    : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
                },
                easeInBounce: function (t) {
                  return 1 - e.easeOutBounce(1 - t);
                },
                easeOutBounce: function (t) {
                  return (t /= 1) < 1 / 2.75
                    ? 7.5625 * t * t * 1
                    : t < 2 / 2.75
                      ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                      : t < 2.5 / 2.75
                        ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                        : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
                },
                easeInOutBounce: function (t) {
                  return t < 0.5
                    ? 0.5 * e.easeInBounce(2 * t)
                    : 0.5 * e.easeOutBounce(2 * t - 1) + 0.5;
                },
              });
              function d(t, e, i) {
                var n;
                return (
                  "string" == typeof t
                    ? ((n = parseInt(t, 10)),
                      -1 != t.indexOf("%") && (n = (n / 100) * e.parentNode[i]))
                    : (n = t),
                  n
                );
              }
              function c(t) {
                return null != t && "none" !== t;
              }
              function i(t, e, i) {
                var n = document.defaultView,
                  a = t.parentNode,
                  r = n.getComputedStyle(t)[e],
                  o = n.getComputedStyle(a)[e],
                  s = c(r),
                  l = c(o),
                  u = Number.POSITIVE_INFINITY;
                return s || l
                  ? Math.min(s ? d(r, t, i) : u, l ? d(o, a, i) : u)
                  : "none";
              }
              (g.requestAnimFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (t) {
                  return window.setTimeout(t, 1e3 / 60);
                }),
                (g.cancelAnimFrame =
                  window.cancelAnimationFrame ||
                  window.webkitCancelAnimationFrame ||
                  window.mozCancelAnimationFrame ||
                  window.oCancelAnimationFrame ||
                  window.msCancelAnimationFrame ||
                  function (t) {
                    return window.clearTimeout(t, 1e3 / 60);
                  }),
                (g.getRelativePosition = function (t, e) {
                  var i,
                    n,
                    a = t.originalEvent || t,
                    r = t.currentTarget || t.srcElement,
                    o = r.getBoundingClientRect(),
                    s = a.touches;
                  n =
                    s && 0 < s.length
                      ? ((i = s[0].clientX), s[0].clientY)
                      : ((i = a.clientX), a.clientY);
                  var l = parseFloat(g.getStyle(r, "padding-left")),
                    u = parseFloat(g.getStyle(r, "padding-top")),
                    d = parseFloat(g.getStyle(r, "padding-right")),
                    c = parseFloat(g.getStyle(r, "padding-bottom")),
                    h = o.right - o.left - l - d,
                    f = o.bottom - o.top - u - c;
                  return {
                    x: (i = Math.round(
                      (((i - o.left - l) / h) * r.width) /
                        e.currentDevicePixelRatio,
                    )),
                    y: (n = Math.round(
                      (((n - o.top - u) / f) * r.height) /
                        e.currentDevicePixelRatio,
                    )),
                  };
                }),
                (g.addEvent = function (t, e, i) {
                  t.addEventListener
                    ? t.addEventListener(e, i)
                    : t.attachEvent
                      ? t.attachEvent("on" + e, i)
                      : (t["on" + e] = i);
                }),
                (g.removeEvent = function (t, e, i) {
                  t.removeEventListener
                    ? t.removeEventListener(e, i, !1)
                    : t.detachEvent
                      ? t.detachEvent("on" + e, i)
                      : (t["on" + e] = g.noop);
                }),
                (g.bindEvents = function (e, t, i) {
                  var n = (e.events = e.events || {});
                  g.each(t, function (t) {
                    (n[t] = function () {
                      i.apply(e, arguments);
                    }),
                      g.addEvent(e.chart.canvas, t, n[t]);
                  });
                }),
                (g.unbindEvents = function (t, e) {
                  var i = t.chart.canvas;
                  g.each(e, function (t, e) {
                    g.removeEvent(i, e, t);
                  });
                }),
                (g.getConstraintWidth = function (t) {
                  return i(t, "max-width", "clientWidth");
                }),
                (g.getConstraintHeight = function (t) {
                  return i(t, "max-height", "clientHeight");
                }),
                (g.getMaximumWidth = function (t) {
                  var e = t.parentNode,
                    i =
                      parseInt(g.getStyle(e, "padding-left")) +
                      parseInt(g.getStyle(e, "padding-right")),
                    n = e.clientWidth - i,
                    a = g.getConstraintWidth(t);
                  return isNaN(a) ? n : Math.min(n, a);
                }),
                (g.getMaximumHeight = function (t) {
                  var e = t.parentNode,
                    i =
                      parseInt(g.getStyle(e, "padding-top")) +
                      parseInt(g.getStyle(e, "padding-bottom")),
                    n = e.clientHeight - i,
                    a = g.getConstraintHeight(t);
                  return isNaN(a) ? n : Math.min(n, a);
                }),
                (g.getStyle = function (t, e) {
                  return t.currentStyle
                    ? t.currentStyle[e]
                    : document.defaultView
                        .getComputedStyle(t, null)
                        .getPropertyValue(e);
                }),
                (g.retinaScale = function (t) {
                  var e = t.ctx,
                    i = t.canvas,
                    n = i.width,
                    a = i.height,
                    r = (t.currentDevicePixelRatio =
                      window.devicePixelRatio || 1);
                  1 !== r &&
                    ((i.height = a * r),
                    (i.width = n * r),
                    e.scale(r, r),
                    (t.originalDevicePixelRatio =
                      t.originalDevicePixelRatio || r)),
                    (i.style.width = n + "px"),
                    (i.style.height = a + "px");
                }),
                (g.clear = function (t) {
                  t.ctx.clearRect(0, 0, t.width, t.height);
                }),
                (g.fontString = function (t, e, i) {
                  return e + " " + t + "px " + i;
                }),
                (g.longestText = function (e, t, i, n) {
                  var a = ((n = n || {}).data = n.data || {}),
                    r = (n.garbageCollect = n.garbageCollect || []);
                  n.font !== t &&
                    ((a = n.data = {}),
                    (r = n.garbageCollect = []),
                    (n.font = t)),
                    (e.font = t);
                  var o = 0;
                  g.each(i, function (t) {
                    null != t && !0 !== g.isArray(t)
                      ? (o = g.measureText(e, a, r, o, t))
                      : g.isArray(t) &&
                        g.each(t, function (t) {
                          null == t ||
                            g.isArray(t) ||
                            (o = g.measureText(e, a, r, o, t));
                        });
                  });
                  var s = r.length / 2;
                  if (s > i.length) {
                    for (var l = 0; l < s; l++) delete a[r[l]];
                    r.splice(0, s);
                  }
                  return o;
                }),
                (g.measureText = function (t, e, i, n, a) {
                  var r = e[a];
                  return (
                    r || ((r = e[a] = t.measureText(a).width), i.push(a)),
                    n < r && (n = r),
                    n
                  );
                }),
                (g.numberOfLabelLines = function (t) {
                  var e = 1;
                  return (
                    g.each(t, function (t) {
                      g.isArray(t) && t.length > e && (e = t.length);
                    }),
                    e
                  );
                }),
                (g.drawRoundedRectangle = function (t, e, i, n, a, r) {
                  t.beginPath(),
                    t.moveTo(e + r, i),
                    t.lineTo(e + n - r, i),
                    t.quadraticCurveTo(e + n, i, e + n, i + r),
                    t.lineTo(e + n, i + a - r),
                    t.quadraticCurveTo(e + n, i + a, e + n - r, i + a),
                    t.lineTo(e + r, i + a),
                    t.quadraticCurveTo(e, i + a, e, i + a - r),
                    t.lineTo(e, i + r),
                    t.quadraticCurveTo(e, i, e + r, i),
                    t.closePath();
                }),
                (g.color = function (t) {
                  return n
                    ? t instanceof CanvasGradient
                      ? n(o.defaults.global.defaultColor)
                      : n(t)
                    : (console.log("Color.js not found!"), t);
                }),
                (g.addResizeListener = function (t, e) {
                  var i = document.createElement("iframe"),
                    n = "chartjs-hidden-iframe";
                  i.classlist ? i.classlist.add(n) : i.setAttribute("class", n);
                  var a = i.style;
                  (a.width = "100%"),
                    (a.display = "block"),
                    (a.border = 0),
                    (a.height = 0),
                    (a.margin = 0),
                    (a.position = "absolute"),
                    (a.left = 0),
                    (a.right = 0),
                    (a.top = 0),
                    (a.bottom = 0),
                    t.insertBefore(i, t.firstChild),
                    ((i.contentWindow || i).onresize = function () {
                      e && e();
                    });
                }),
                (g.removeResizeListener = function (t) {
                  var e = t.querySelector(".chartjs-hidden-iframe");
                  e && e.parentNode.removeChild(e);
                }),
                (g.isArray = Array.isArray
                  ? function (t) {
                      return Array.isArray(t);
                    }
                  : function (t) {
                      return (
                        "[object Array]" === Object.prototype.toString.call(t)
                      );
                    }),
                (g.arrayEquals = function (t, e) {
                  var i, n, a, r;
                  if (!t || !e || t.length != e.length) return !1;
                  for (i = 0, n = t.length; i < n; ++i)
                    if (
                      ((a = t[i]),
                      (r = e[i]),
                      a instanceof Array && r instanceof Array)
                    ) {
                      if (!g.arrayEquals(a, r)) return !1;
                    } else if (a != r) return !1;
                  return !0;
                }),
                (g.callCallback = function (t, e, i) {
                  t && "function" == typeof t.call && t.apply(i, e);
                }),
                (g.getHoverColor = function (t) {
                  return t instanceof CanvasPattern
                    ? t
                    : g.color(t).saturate(0.5).darken(0.1).rgbString();
                });
            };
          },
          { 2: 2 },
        ],
        27: [
          function (t, e, i) {
            "use strict";
            e.exports = function () {
              var a = function (t, e) {
                var i = this,
                  n = a.helpers;
                return (
                  (i.config = e || { data: { datasets: [] } }),
                  t.length && t[0].getContext && (t = t[0]),
                  t.getContext && (t = t.getContext("2d")),
                  (i.ctx = t),
                  (i.canvas = t.canvas),
                  (t.canvas.style.display = t.canvas.style.display || "block"),
                  (i.width =
                    t.canvas.width ||
                    parseInt(n.getStyle(t.canvas, "width"), 10) ||
                    n.getMaximumWidth(t.canvas)),
                  (i.height =
                    t.canvas.height ||
                    parseInt(n.getStyle(t.canvas, "height"), 10) ||
                    n.getMaximumHeight(t.canvas)),
                  (i.aspectRatio = i.width / i.height),
                  (isNaN(i.aspectRatio) || !1 === isFinite(i.aspectRatio)) &&
                    (i.aspectRatio =
                      void 0 !== e.aspectRatio ? e.aspectRatio : 2),
                  (i.originalCanvasStyleWidth = t.canvas.style.width),
                  (i.originalCanvasStyleHeight = t.canvas.style.height),
                  n.retinaScale(i),
                  (i.controller = new a.Controller(i)),
                  n.addResizeListener(t.canvas.parentNode, function () {
                    i.controller &&
                      i.controller.config.options.responsive &&
                      i.controller.resize();
                  }),
                  i.controller ? i.controller : i
                );
              };
              return (
                (a.defaults = {
                  global: {
                    responsive: !0,
                    responsiveAnimationDuration: 0,
                    maintainAspectRatio: !0,
                    events: [
                      "mousemove",
                      "mouseout",
                      "click",
                      "touchstart",
                      "touchmove",
                    ],
                    hover: {
                      onHover: null,
                      mode: "single",
                      animationDuration: 400,
                    },
                    onClick: null,
                    defaultColor: "rgba(0,0,0,0.1)",
                    defaultFontColor: "#666",
                    defaultFontFamily:
                      "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    defaultFontSize: 12,
                    defaultFontStyle: "normal",
                    showLines: !0,
                    elements: {},
                    legendCallback: function (t) {
                      var e = [];
                      e.push('<ul class="' + t.id + '-legend">');
                      for (var i = 0; i < t.data.datasets.length; i++)
                        e.push(
                          '<li><span style="background-color:' +
                            t.data.datasets[i].backgroundColor +
                            '"></span>',
                        ),
                          t.data.datasets[i].label &&
                            e.push(t.data.datasets[i].label),
                          e.push("</li>");
                      return e.push("</ul>"), e.join("");
                    },
                  },
                }),
                (a.Chart = a)
              );
            };
          },
          {},
        ],
        28: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var C = t.helpers;
              t.layoutService = {
                defaults: {},
                addBox: function (t, e) {
                  t.boxes || (t.boxes = []), t.boxes.push(e);
                },
                removeBox: function (t, e) {
                  t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1);
                },
                update: function (e, i, t) {
                  if (e) {
                    var n = C.where(e.boxes, function (t) {
                        return "left" === t.options.position;
                      }),
                      a = C.where(e.boxes, function (t) {
                        return "right" === t.options.position;
                      }),
                      r = C.where(e.boxes, function (t) {
                        return "top" === t.options.position;
                      }),
                      o = C.where(e.boxes, function (t) {
                        return "bottom" === t.options.position;
                      }),
                      s = C.where(e.boxes, function (t) {
                        return "chartArea" === t.options.position;
                      });
                    r.sort(function (t, e) {
                      return (
                        (e.options.fullWidth ? 1 : 0) -
                        (t.options.fullWidth ? 1 : 0)
                      );
                    }),
                      o.sort(function (t, e) {
                        return (
                          (t.options.fullWidth ? 1 : 0) -
                          (e.options.fullWidth ? 1 : 0)
                        );
                      });
                    var l = i - 0,
                      u = t - 0,
                      d = u / 2,
                      c = (i - l / 2) / (n.length + a.length),
                      h = (t - d) / (r.length + o.length),
                      f = l,
                      g = u,
                      p = [];
                    C.each(n.concat(a, r, o), function (t) {
                      var e,
                        i = t.isHorizontal();
                      i
                        ? ((e = t.update(t.options.fullWidth ? l : f, h)),
                          (g -= e.height))
                        : ((e = t.update(c, d)), (f -= e.width));
                      p.push({ horizontal: i, minSize: e, box: t });
                    });
                    var m = 0,
                      v = 0,
                      y = 0,
                      b = 0;
                    C.each(n.concat(a), _),
                      C.each(n, function (t) {
                        m += t.width;
                      }),
                      C.each(a, function (t) {
                        v += t.width;
                      }),
                      C.each(r.concat(o), _),
                      C.each(r, function (t) {
                        y += t.height;
                      }),
                      C.each(o, function (t) {
                        b += t.height;
                      }),
                      C.each(n.concat(a), function (e) {
                        var t = C.findNextWhere(p, function (t) {
                            return t.box === e;
                          }),
                          i = { left: 0, right: 0, top: y, bottom: b };
                        t && e.update(t.minSize.width, g, i);
                      }),
                      (b = y = v = m = 0),
                      C.each(n, function (t) {
                        m += t.width;
                      }),
                      C.each(a, function (t) {
                        v += t.width;
                      }),
                      C.each(r, function (t) {
                        y += t.height;
                      }),
                      C.each(o, function (t) {
                        b += t.height;
                      });
                    var x = t - y - b,
                      w = i - m - v;
                    (w === f && x === g) ||
                      (C.each(n, function (t) {
                        t.height = x;
                      }),
                      C.each(a, function (t) {
                        t.height = x;
                      }),
                      C.each(r, function (t) {
                        t.options.fullWidth || (t.width = w);
                      }),
                      C.each(o, function (t) {
                        t.options.fullWidth || (t.width = w);
                      }),
                      (g = x),
                      (f = w));
                    var k = 0,
                      S = 0;
                    C.each(n.concat(r), M),
                      (k += f),
                      (S += g),
                      C.each(a, M),
                      C.each(o, M),
                      (e.chartArea = {
                        left: m,
                        top: y,
                        right: m + f,
                        bottom: y + g,
                      }),
                      C.each(s, function (t) {
                        (t.left = e.chartArea.left),
                          (t.top = e.chartArea.top),
                          (t.right = e.chartArea.right),
                          (t.bottom = e.chartArea.bottom),
                          t.update(f, g);
                      });
                  }
                  function _(e) {
                    var t = C.findNextWhere(p, function (t) {
                      return t.box === e;
                    });
                    if (t)
                      if (e.isHorizontal()) {
                        var i = { left: m, right: v, top: 0, bottom: 0 };
                        e.update(e.options.fullWidth ? l : f, u / 2, i);
                      } else e.update(t.minSize.width, g);
                  }
                  function M(t) {
                    t.isHorizontal()
                      ? ((t.left = t.options.fullWidth ? 0 : m),
                        (t.right = t.options.fullWidth ? i - 0 : m + f),
                        (t.top = S),
                        (t.bottom = S + t.height),
                        (S = t.bottom))
                      : ((t.left = k),
                        (t.right = k + t.width),
                        (t.top = y),
                        (t.bottom = y + g),
                        (k = t.right));
                  }
                },
              };
            };
          },
          {},
        ],
        29: [
          function (t, e, i) {
            "use strict";
            e.exports = function (M) {
              var C = M.helpers,
                t = C.noop;
              (M.defaults.global.legend = {
                display: !0,
                position: "top",
                fullWidth: !0,
                reverse: !1,
                onClick: function (t, e) {
                  var i = e.datasetIndex,
                    n = this.chart,
                    a = n.getDatasetMeta(i);
                  (a.hidden =
                    null === a.hidden ? !n.data.datasets[i].hidden : null),
                    n.update();
                },
                labels: {
                  boxWidth: 40,
                  padding: 10,
                  generateLabels: function (i) {
                    var t = i.data;
                    return C.isArray(t.datasets)
                      ? t.datasets.map(function (t, e) {
                          return {
                            text: t.label,
                            fillStyle: C.isArray(t.backgroundColor)
                              ? t.backgroundColor[0]
                              : t.backgroundColor,
                            hidden: !i.isDatasetVisible(e),
                            lineCap: t.borderCapStyle,
                            lineDash: t.borderDash,
                            lineDashOffset: t.borderDashOffset,
                            lineJoin: t.borderJoinStyle,
                            lineWidth: t.borderWidth,
                            strokeStyle: t.borderColor,
                            pointStyle: t.pointStyle,
                            datasetIndex: e,
                          };
                        }, this)
                      : [];
                  },
                },
              }),
                (M.Legend = M.Element.extend({
                  initialize: function (t) {
                    C.extend(this, t),
                      (this.legendHitBoxes = []),
                      (this.doughnutMode = !1);
                  },
                  beforeUpdate: t,
                  update: function (t, e, i) {
                    var n = this;
                    return (
                      n.beforeUpdate(),
                      (n.maxWidth = t),
                      (n.maxHeight = e),
                      (n.margins = i),
                      n.beforeSetDimensions(),
                      n.setDimensions(),
                      n.afterSetDimensions(),
                      n.beforeBuildLabels(),
                      n.buildLabels(),
                      n.afterBuildLabels(),
                      n.beforeFit(),
                      n.fit(),
                      n.afterFit(),
                      n.afterUpdate(),
                      n.minSize
                    );
                  },
                  afterUpdate: t,
                  beforeSetDimensions: t,
                  setDimensions: function () {
                    var t = this;
                    t.isHorizontal()
                      ? ((t.width = t.maxWidth),
                        (t.left = 0),
                        (t.right = t.width))
                      : ((t.height = t.maxHeight),
                        (t.top = 0),
                        (t.bottom = t.height)),
                      (t.paddingLeft = 0),
                      (t.paddingTop = 0),
                      (t.paddingRight = 0),
                      (t.paddingBottom = 0),
                      (t.minSize = { width: 0, height: 0 });
                  },
                  afterSetDimensions: t,
                  beforeBuildLabels: t,
                  buildLabels: function () {
                    (this.legendItems = this.options.labels.generateLabels.call(
                      this,
                      this.chart,
                    )),
                      this.options.reverse && this.legendItems.reverse();
                  },
                  afterBuildLabels: t,
                  beforeFit: t,
                  fit: function () {
                    var n = this,
                      t = n.options,
                      a = t.labels,
                      e = t.display,
                      r = n.ctx,
                      i = M.defaults.global,
                      o = C.getValueOrDefault,
                      s = o(a.fontSize, i.defaultFontSize),
                      l = o(a.fontStyle, i.defaultFontStyle),
                      u = o(a.fontFamily, i.defaultFontFamily),
                      d = C.fontString(s, l, u),
                      c = (n.legendHitBoxes = []),
                      h = n.minSize,
                      f = n.isHorizontal();
                    if (
                      (f
                        ? ((h.width = n.maxWidth), (h.height = e ? 10 : 0))
                        : ((h.width = e ? 10 : 0), (h.height = n.maxHeight)),
                      e)
                    )
                      if (((r.font = d), f)) {
                        var g = (n.lineWidths = [0]),
                          p = n.legendItems.length ? s + a.padding : 0;
                        (r.textAlign = "left"),
                          (r.textBaseline = "top"),
                          C.each(n.legendItems, function (t, e) {
                            var i =
                              (a.usePointStyle
                                ? s * Math.sqrt(2)
                                : a.boxWidth) +
                              s / 2 +
                              r.measureText(t.text).width;
                            g[g.length - 1] + i + a.padding >= n.width &&
                              ((p += s + a.padding), (g[g.length] = n.left)),
                              (c[e] = { left: 0, top: 0, width: i, height: s }),
                              (g[g.length - 1] += i + a.padding);
                          }),
                          (h.height += p);
                      } else {
                        var m = a.padding,
                          v = (n.columnWidths = []),
                          y = a.padding,
                          b = 0,
                          x = 0,
                          w = s + m;
                        C.each(n.legendItems, function (t, e) {
                          var i =
                            (a.usePointStyle ? 2 * a.boxWidth : a.boxWidth) +
                            s / 2 +
                            r.measureText(t.text).width;
                          x + w > h.height &&
                            ((y += b + a.padding), v.push(b), (x = b = 0)),
                            (b = Math.max(b, i)),
                            (x += w),
                            (c[e] = { left: 0, top: 0, width: i, height: s });
                        }),
                          (y += b),
                          v.push(b),
                          (h.width += y);
                      }
                    (n.width = h.width), (n.height = h.height);
                  },
                  afterFit: t,
                  isHorizontal: function () {
                    return (
                      "top" === this.options.position ||
                      "bottom" === this.options.position
                    );
                  },
                  draw: function () {
                    var d = this,
                      c = d.options,
                      h = c.labels,
                      f = M.defaults.global,
                      g = f.elements.line,
                      p = d.width,
                      m = d.lineWidths;
                    if (c.display) {
                      var v,
                        y = d.ctx,
                        b = C.getValueOrDefault,
                        t = b(h.fontColor, f.defaultFontColor),
                        x = b(h.fontSize, f.defaultFontSize),
                        e = b(h.fontStyle, f.defaultFontStyle),
                        i = b(h.fontFamily, f.defaultFontFamily),
                        n = C.fontString(x, e, i);
                      (y.textAlign = "left"),
                        (y.textBaseline = "top"),
                        (y.lineWidth = 0.5),
                        (y.strokeStyle = t),
                        (y.fillStyle = t),
                        (y.font = n);
                      var w = h.boxWidth,
                        k = d.legendHitBoxes,
                        S = d.isHorizontal();
                      v = S
                        ? {
                            x: d.left + (p - m[0]) / 2,
                            y: d.top + h.padding,
                            line: 0,
                          }
                        : {
                            x: d.left + h.padding,
                            y: d.top + h.padding,
                            line: 0,
                          };
                      var _ = x + h.padding;
                      C.each(d.legendItems, function (t, e) {
                        var i,
                          n,
                          a,
                          r,
                          o = y.measureText(t.text).width,
                          s = h.usePointStyle ? x + x / 2 + o : w + x / 2 + o,
                          l = v.x,
                          u = v.y;
                        S
                          ? p <= l + s &&
                            ((u = v.y += _),
                            v.line++,
                            (l = v.x = d.left + (p - m[v.line]) / 2))
                          : u + _ > d.bottom &&
                            ((l = v.x = l + d.columnWidths[v.line] + h.padding),
                            (u = v.y = d.top),
                            v.line++),
                          (function (t, e, i) {
                            if (!(isNaN(w) || w <= 0)) {
                              if (
                                (y.save(),
                                (y.fillStyle = b(i.fillStyle, f.defaultColor)),
                                (y.lineCap = b(i.lineCap, g.borderCapStyle)),
                                (y.lineDashOffset = b(
                                  i.lineDashOffset,
                                  g.borderDashOffset,
                                )),
                                (y.lineJoin = b(i.lineJoin, g.borderJoinStyle)),
                                (y.lineWidth = b(i.lineWidth, g.borderWidth)),
                                (y.strokeStyle = b(
                                  i.strokeStyle,
                                  f.defaultColor,
                                )),
                                y.setLineDash &&
                                  y.setLineDash(b(i.lineDash, g.borderDash)),
                                c.labels && c.labels.usePointStyle)
                              ) {
                                var n = (x * Math.SQRT2) / 2,
                                  a = n / Math.SQRT2,
                                  r = t + a,
                                  o = e + a;
                                M.canvasHelpers.drawPoint(
                                  y,
                                  i.pointStyle,
                                  n,
                                  r,
                                  o,
                                );
                              } else
                                y.strokeRect(t, e, w, x),
                                  y.fillRect(t, e, w, x);
                              y.restore();
                            }
                          })(l, u, t),
                          (k[e].left = l),
                          (k[e].top = u),
                          (i = l),
                          (n = u),
                          (a = t),
                          (r = o),
                          y.fillText(a.text, w + x / 2 + i, n),
                          a.hidden &&
                            (y.beginPath(),
                            (y.lineWidth = 2),
                            y.moveTo(w + x / 2 + i, n + x / 2),
                            y.lineTo(w + x / 2 + i + r, n + x / 2),
                            y.stroke()),
                          S ? (v.x += s + h.padding) : (v.y += _);
                      });
                    }
                  },
                  handleEvent: function (t) {
                    var e = C.getRelativePosition(t, this.chart.chart),
                      i = e.x,
                      n = e.y,
                      a = this.options;
                    if (
                      i >= this.left &&
                      i <= this.right &&
                      n >= this.top &&
                      n <= this.bottom
                    )
                      for (
                        var r = this.legendHitBoxes, o = 0;
                        o < r.length;
                        ++o
                      ) {
                        var s = r[o];
                        if (
                          i >= s.left &&
                          i <= s.left + s.width &&
                          n >= s.top &&
                          n <= s.top + s.height
                        ) {
                          a.onClick &&
                            a.onClick.call(this, t, this.legendItems[o]);
                          break;
                        }
                      }
                  },
                })),
                M.plugins.register({
                  beforeInit: function (t) {
                    var e = t.options.legend;
                    e &&
                      ((t.legend = new M.Legend({
                        ctx: t.chart.ctx,
                        options: e,
                        chart: t,
                      })),
                      M.layoutService.addBox(t, t.legend));
                  },
                });
            };
          },
          {},
        ],
        30: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var e = t.helpers.noop;
              (t.plugins = {
                _plugins: [],
                register: function (t) {
                  var e = this._plugins;
                  [].concat(t).forEach(function (t) {
                    -1 === e.indexOf(t) && e.push(t);
                  });
                },
                unregister: function (t) {
                  var i = this._plugins;
                  [].concat(t).forEach(function (t) {
                    var e = i.indexOf(t);
                    -1 !== e && i.splice(e, 1);
                  });
                },
                clear: function () {
                  this._plugins = [];
                },
                count: function () {
                  return this._plugins.length;
                },
                getAll: function () {
                  return this._plugins;
                },
                notify: function (t, e) {
                  var i,
                    n,
                    a = this._plugins,
                    r = a.length;
                  for (i = 0; i < r; ++i)
                    if (
                      "function" == typeof (n = a[i])[t] &&
                      !1 === n[t].apply(n, e || [])
                    )
                      return !1;
                  return !0;
                },
              }),
                (t.PluginBase = t.Element.extend({
                  beforeInit: e,
                  afterInit: e,
                  beforeUpdate: e,
                  afterUpdate: e,
                  beforeDraw: e,
                  afterDraw: e,
                  destroy: e,
                })),
                (t.pluginService = t.plugins);
            };
          },
          {},
        ],
        31: [
          function (t, e, i) {
            "use strict";
            e.exports = function (N) {
              var Y = N.helpers;
              (N.defaults.scale = {
                display: !0,
                position: "left",
                gridLines: {
                  display: !0,
                  color: "rgba(0, 0, 0, 0.1)",
                  lineWidth: 1,
                  drawBorder: !0,
                  drawOnChartArea: !0,
                  drawTicks: !0,
                  tickMarkLength: 10,
                  zeroLineWidth: 1,
                  zeroLineColor: "rgba(0,0,0,0.25)",
                  offsetGridLines: !1,
                },
                scaleLabel: { labelString: "", display: !1 },
                ticks: {
                  beginAtZero: !1,
                  minRotation: 0,
                  maxRotation: 50,
                  mirror: !1,
                  padding: 10,
                  reverse: !1,
                  display: !0,
                  autoSkip: !0,
                  autoSkipPadding: 0,
                  labelOffset: 0,
                  callback: function (t) {
                    return Y.isArray(t) ? t : "" + t;
                  },
                },
              }),
                (N.Scale = N.Element.extend({
                  beforeUpdate: function () {
                    Y.callCallback(this.options.beforeUpdate, [this]);
                  },
                  update: function (t, e, i) {
                    var n = this;
                    return (
                      n.beforeUpdate(),
                      (n.maxWidth = t),
                      (n.maxHeight = e),
                      (n.margins = Y.extend(
                        { left: 0, right: 0, top: 0, bottom: 0 },
                        i,
                      )),
                      n.beforeSetDimensions(),
                      n.setDimensions(),
                      n.afterSetDimensions(),
                      n.beforeDataLimits(),
                      n.determineDataLimits(),
                      n.afterDataLimits(),
                      n.beforeBuildTicks(),
                      n.buildTicks(),
                      n.afterBuildTicks(),
                      n.beforeTickToLabelConversion(),
                      n.convertTicksToLabels(),
                      n.afterTickToLabelConversion(),
                      n.beforeCalculateTickRotation(),
                      n.calculateTickRotation(),
                      n.afterCalculateTickRotation(),
                      n.beforeFit(),
                      n.fit(),
                      n.afterFit(),
                      n.afterUpdate(),
                      n.minSize
                    );
                  },
                  afterUpdate: function () {
                    Y.callCallback(this.options.afterUpdate, [this]);
                  },
                  beforeSetDimensions: function () {
                    Y.callCallback(this.options.beforeSetDimensions, [this]);
                  },
                  setDimensions: function () {
                    var t = this;
                    t.isHorizontal()
                      ? ((t.width = t.maxWidth),
                        (t.left = 0),
                        (t.right = t.width))
                      : ((t.height = t.maxHeight),
                        (t.top = 0),
                        (t.bottom = t.height)),
                      (t.paddingLeft = 0),
                      (t.paddingTop = 0),
                      (t.paddingRight = 0),
                      (t.paddingBottom = 0);
                  },
                  afterSetDimensions: function () {
                    Y.callCallback(this.options.afterSetDimensions, [this]);
                  },
                  beforeDataLimits: function () {
                    Y.callCallback(this.options.beforeDataLimits, [this]);
                  },
                  determineDataLimits: Y.noop,
                  afterDataLimits: function () {
                    Y.callCallback(this.options.afterDataLimits, [this]);
                  },
                  beforeBuildTicks: function () {
                    Y.callCallback(this.options.beforeBuildTicks, [this]);
                  },
                  buildTicks: Y.noop,
                  afterBuildTicks: function () {
                    Y.callCallback(this.options.afterBuildTicks, [this]);
                  },
                  beforeTickToLabelConversion: function () {
                    Y.callCallback(this.options.beforeTickToLabelConversion, [
                      this,
                    ]);
                  },
                  convertTicksToLabels: function () {
                    var n = this;
                    n.ticks = n.ticks.map(function (t, e, i) {
                      return n.options.ticks.userCallback
                        ? n.options.ticks.userCallback(t, e, i)
                        : n.options.ticks.callback(t, e, i);
                    }, n);
                  },
                  afterTickToLabelConversion: function () {
                    Y.callCallback(this.options.afterTickToLabelConversion, [
                      this,
                    ]);
                  },
                  beforeCalculateTickRotation: function () {
                    Y.callCallback(this.options.beforeCalculateTickRotation, [
                      this,
                    ]);
                  },
                  calculateTickRotation: function () {
                    var t = this,
                      e = t.ctx,
                      i = N.defaults.global,
                      n = t.options.ticks,
                      a = Y.getValueOrDefault(n.fontSize, i.defaultFontSize),
                      r = Y.getValueOrDefault(n.fontStyle, i.defaultFontStyle),
                      o = Y.getValueOrDefault(
                        n.fontFamily,
                        i.defaultFontFamily,
                      ),
                      s = Y.fontString(a, r, o);
                    e.font = s;
                    var l,
                      u = e.measureText(t.ticks[0]).width,
                      d = e.measureText(t.ticks[t.ticks.length - 1]).width;
                    if (
                      ((t.labelRotation = n.minRotation || 0),
                      (t.paddingRight = 0),
                      (t.paddingLeft = 0),
                      t.options.display && t.isHorizontal())
                    ) {
                      (t.paddingRight = d / 2 + 3),
                        (t.paddingLeft = u / 2 + 3),
                        t.longestTextCache || (t.longestTextCache = {});
                      for (
                        var c,
                          h,
                          f = Y.longestText(e, s, t.ticks, t.longestTextCache),
                          g = f,
                          p = t.getPixelForTick(1) - t.getPixelForTick(0) - 6;
                        p < g && t.labelRotation < n.maxRotation;

                      ) {
                        if (
                          ((c = Math.cos(Y.toRadians(t.labelRotation))),
                          (h = Math.sin(Y.toRadians(t.labelRotation))),
                          (l = c * u) + a / 2 > t.yLabelWidth &&
                            (t.paddingLeft = l + a / 2),
                          (t.paddingRight = a / 2),
                          h * f > t.maxHeight)
                        ) {
                          t.labelRotation--;
                          break;
                        }
                        t.labelRotation++, (g = c * f);
                      }
                    }
                    t.margins &&
                      ((t.paddingLeft = Math.max(
                        t.paddingLeft - t.margins.left,
                        0,
                      )),
                      (t.paddingRight = Math.max(
                        t.paddingRight - t.margins.right,
                        0,
                      )));
                  },
                  afterCalculateTickRotation: function () {
                    Y.callCallback(this.options.afterCalculateTickRotation, [
                      this,
                    ]);
                  },
                  beforeFit: function () {
                    Y.callCallback(this.options.beforeFit, [this]);
                  },
                  fit: function () {
                    var t = this,
                      e = (t.minSize = { width: 0, height: 0 }),
                      i = t.options,
                      n = N.defaults.global,
                      a = i.ticks,
                      r = i.scaleLabel,
                      o = i.display,
                      s = t.isHorizontal(),
                      l = Y.getValueOrDefault(a.fontSize, n.defaultFontSize),
                      u = Y.getValueOrDefault(a.fontStyle, n.defaultFontStyle),
                      d = Y.getValueOrDefault(
                        a.fontFamily,
                        n.defaultFontFamily,
                      ),
                      c = Y.fontString(l, u, d),
                      h = Y.getValueOrDefault(r.fontSize, n.defaultFontSize),
                      f = i.gridLines.tickMarkLength;
                    if (
                      ((e.width = s
                        ? t.isFullWidth()
                          ? t.maxWidth - t.margins.left - t.margins.right
                          : t.maxWidth
                        : o
                          ? f
                          : 0),
                      (e.height = s ? (o ? f : 0) : t.maxHeight),
                      r.display &&
                        o &&
                        (s ? (e.height += 1.5 * h) : (e.width += 1.5 * h)),
                      a.display && o)
                    ) {
                      t.longestTextCache || (t.longestTextCache = {});
                      var g = Y.longestText(
                          t.ctx,
                          c,
                          t.ticks,
                          t.longestTextCache,
                        ),
                        p = Y.numberOfLabelLines(t.ticks),
                        m = 0.5 * l;
                      if (s) {
                        t.longestLabelWidth = g;
                        var v =
                          Math.sin(Y.toRadians(t.labelRotation)) *
                            t.longestLabelWidth +
                          l * p +
                          m * p;
                        (e.height = Math.min(t.maxHeight, e.height + v)),
                          (t.ctx.font = c);
                        var y = t.ctx.measureText(t.ticks[0]).width,
                          b = t.ctx.measureText(
                            t.ticks[t.ticks.length - 1],
                          ).width,
                          x = Math.cos(Y.toRadians(t.labelRotation)),
                          w = Math.sin(Y.toRadians(t.labelRotation));
                        (t.paddingLeft =
                          0 !== t.labelRotation ? x * y + 3 : y / 2 + 3),
                          (t.paddingRight =
                            0 !== t.labelRotation
                              ? w * (l / 2) + 3
                              : b / 2 + 3);
                      } else {
                        var k = t.maxWidth - e.width;
                        a.mirror ? (g = 0) : (g += t.options.ticks.padding),
                          g < k ? (e.width += g) : (e.width = t.maxWidth),
                          (t.paddingTop = l / 2),
                          (t.paddingBottom = l / 2);
                      }
                    }
                    t.margins &&
                      ((t.paddingLeft = Math.max(
                        t.paddingLeft - t.margins.left,
                        0,
                      )),
                      (t.paddingTop = Math.max(
                        t.paddingTop - t.margins.top,
                        0,
                      )),
                      (t.paddingRight = Math.max(
                        t.paddingRight - t.margins.right,
                        0,
                      )),
                      (t.paddingBottom = Math.max(
                        t.paddingBottom - t.margins.bottom,
                        0,
                      ))),
                      (t.width = e.width),
                      (t.height = e.height);
                  },
                  afterFit: function () {
                    Y.callCallback(this.options.afterFit, [this]);
                  },
                  isHorizontal: function () {
                    return (
                      "top" === this.options.position ||
                      "bottom" === this.options.position
                    );
                  },
                  isFullWidth: function () {
                    return this.options.fullWidth;
                  },
                  getRightValue: function (t) {
                    return null == t
                      ? NaN
                      : "number" == typeof t && isNaN(t)
                        ? NaN
                        : "object" == typeof t
                          ? t instanceof Date || t.isValid
                            ? t
                            : this.getRightValue(
                                this.isHorizontal() ? t.x : t.y,
                              )
                          : t;
                  },
                  getLabelForIndex: Y.noop,
                  getPixelForValue: Y.noop,
                  getValueForPixel: Y.noop,
                  getPixelForTick: function (t, e) {
                    var i = this;
                    if (i.isHorizontal()) {
                      var n =
                          (i.width - (i.paddingLeft + i.paddingRight)) /
                          Math.max(
                            i.ticks.length -
                              (i.options.gridLines.offsetGridLines ? 0 : 1),
                            1,
                          ),
                        a = n * t + i.paddingLeft;
                      e && (a += n / 2);
                      var r = i.left + Math.round(a);
                      return (r += i.isFullWidth() ? i.margins.left : 0);
                    }
                    var o = i.height - (i.paddingTop + i.paddingBottom);
                    return i.top + t * (o / (i.ticks.length - 1));
                  },
                  getPixelForDecimal: function (t) {
                    var e = this;
                    if (e.isHorizontal()) {
                      var i =
                          (e.width - (e.paddingLeft + e.paddingRight)) * t +
                          e.paddingLeft,
                        n = e.left + Math.round(i);
                      return (n += e.isFullWidth() ? e.margins.left : 0);
                    }
                    return e.top + t * e.height;
                  },
                  getBasePixel: function () {
                    var t = this.min,
                      e = this.max;
                    return this.getPixelForValue(
                      this.beginAtZero
                        ? 0
                        : t < 0 && e < 0
                          ? e
                          : 0 < t && 0 < e
                            ? t
                            : 0,
                    );
                  },
                  draw: function (b) {
                    var x = this,
                      w = x.options;
                    if (w.display) {
                      var k,
                        t,
                        a = x.ctx,
                        e = N.defaults.global,
                        S = w.ticks,
                        _ = w.gridLines,
                        i = w.scaleLabel,
                        M = 0 !== x.labelRotation,
                        n = S.autoSkip,
                        C = x.isHorizontal();
                      S.maxTicksLimit && (t = S.maxTicksLimit);
                      var r = Y.getValueOrDefault(
                          S.fontColor,
                          e.defaultFontColor,
                        ),
                        o = Y.getValueOrDefault(S.fontSize, e.defaultFontSize),
                        s = Y.getValueOrDefault(
                          S.fontStyle,
                          e.defaultFontStyle,
                        ),
                        l = Y.getValueOrDefault(
                          S.fontFamily,
                          e.defaultFontFamily,
                        ),
                        u = Y.fontString(o, s, l),
                        D = _.tickMarkLength,
                        d = Y.getValueOrDefault(
                          i.fontColor,
                          e.defaultFontColor,
                        ),
                        c = Y.getValueOrDefault(i.fontSize, e.defaultFontSize),
                        h = Y.getValueOrDefault(
                          i.fontStyle,
                          e.defaultFontStyle,
                        ),
                        f = Y.getValueOrDefault(
                          i.fontFamily,
                          e.defaultFontFamily,
                        ),
                        g = Y.fontString(c, h, f),
                        A = Y.toRadians(x.labelRotation),
                        p = Math.cos(A),
                        m = x.longestLabelWidth * p;
                      a.fillStyle = r;
                      var T = [];
                      if (C) {
                        if (
                          ((k = !1),
                          M && (m /= 2),
                          (m + S.autoSkipPadding) * x.ticks.length >
                            x.width - (x.paddingLeft + x.paddingRight) &&
                            (k =
                              1 +
                              Math.floor(
                                ((m + S.autoSkipPadding) * x.ticks.length) /
                                  (x.width - (x.paddingLeft + x.paddingRight)),
                              )),
                          t && x.ticks.length > t)
                        )
                          for (; !k || x.ticks.length / (k || 1) > t; )
                            k || (k = 1), (k += 1);
                        n || (k = !1);
                      }
                      var P = "right" === w.position ? x.left : x.right - D,
                        I = "right" === w.position ? x.left + D : x.right,
                        O = "bottom" === w.position ? x.top : x.bottom - D,
                        F = "bottom" === w.position ? x.top + D : x.bottom;
                      if (
                        (Y.each(x.ticks, function (t, e) {
                          if (null != t) {
                            var i = x.ticks.length === e + 1;
                            if (
                              (!(
                                (1 < k && 0 < e % k) ||
                                (e % k == 0 && e + k >= x.ticks.length)
                              ) ||
                                i) &&
                              null != t
                            ) {
                              var n, a, r, o, s, l, u, d, c, h, f, g;
                              a =
                                e ===
                                (void 0 !== x.zeroLineIndex
                                  ? x.zeroLineIndex
                                  : 0)
                                  ? ((n = _.zeroLineWidth), _.zeroLineColor)
                                  : ((n = Y.getValueAtIndexOrDefault(
                                      _.lineWidth,
                                      e,
                                    )),
                                    Y.getValueAtIndexOrDefault(_.color, e));
                              var p,
                                m = "middle";
                              if (C) {
                                M ||
                                  (m = "top" === w.position ? "bottom" : "top"),
                                  (p = M ? "right" : "center");
                                var v = x.getPixelForTick(e) + Y.aliasPixel(n);
                                (f =
                                  x.getPixelForTick(e, _.offsetGridLines) +
                                  S.labelOffset),
                                  (g = M
                                    ? x.top + 12
                                    : "top" === w.position
                                      ? x.bottom - D
                                      : x.top + D),
                                  (r = s = u = c = v),
                                  (o = O),
                                  (l = F),
                                  (d = b.top),
                                  (h = b.bottom);
                              } else {
                                p =
                                  "left" === w.position
                                    ? S.mirror
                                      ? ((f = x.right + S.padding), "left")
                                      : ((f = x.right - S.padding), "right")
                                    : S.mirror
                                      ? ((f = x.left - S.padding), "right")
                                      : ((f = x.left + S.padding), "left");
                                var y = x.getPixelForTick(e);
                                (y += Y.aliasPixel(n)),
                                  (g = x.getPixelForTick(e, _.offsetGridLines)),
                                  (r = P),
                                  (s = I),
                                  (u = b.left),
                                  (c = b.right),
                                  (o = l = d = h = y);
                              }
                              T.push({
                                tx1: r,
                                ty1: o,
                                tx2: s,
                                ty2: l,
                                x1: u,
                                y1: d,
                                x2: c,
                                y2: h,
                                labelX: f,
                                labelY: g,
                                glWidth: n,
                                glColor: a,
                                rotation: -1 * A,
                                label: t,
                                textBaseline: m,
                                textAlign: p,
                              });
                            }
                          }
                        }),
                        Y.each(T, function (t) {
                          if (
                            (_.display &&
                              ((a.lineWidth = t.glWidth),
                              (a.strokeStyle = t.glColor),
                              a.beginPath(),
                              _.drawTicks &&
                                (a.moveTo(t.tx1, t.ty1),
                                a.lineTo(t.tx2, t.ty2)),
                              _.drawOnChartArea &&
                                (a.moveTo(t.x1, t.y1), a.lineTo(t.x2, t.y2)),
                              a.stroke()),
                            S.display)
                          ) {
                            a.save(),
                              a.translate(t.labelX, t.labelY),
                              a.rotate(t.rotation),
                              (a.font = u),
                              (a.textBaseline = t.textBaseline),
                              (a.textAlign = t.textAlign);
                            var e = t.label;
                            if (Y.isArray(e))
                              for (var i = 0, n = 0; i < e.length; ++i)
                                a.fillText("" + e[i], 0, n), (n += 1.5 * o);
                            else a.fillText(e, 0, 0);
                            a.restore();
                          }
                        }),
                        i.display)
                      ) {
                        var v,
                          y,
                          L = 0;
                        if (C)
                          (v = x.left + (x.right - x.left) / 2),
                            (y =
                              "bottom" === w.position
                                ? x.bottom - c / 2
                                : x.top + c / 2);
                        else {
                          var R = "left" === w.position;
                          (v = R ? x.left + c / 2 : x.right - c / 2),
                            (y = x.top + (x.bottom - x.top) / 2),
                            (L = R ? -0.5 * Math.PI : 0.5 * Math.PI);
                        }
                        a.save(),
                          a.translate(v, y),
                          a.rotate(L),
                          (a.textAlign = "center"),
                          (a.textBaseline = "middle"),
                          (a.fillStyle = d),
                          (a.font = g),
                          a.fillText(i.labelString, 0, 0),
                          a.restore();
                      }
                      if (_.drawBorder) {
                        (a.lineWidth = Y.getValueAtIndexOrDefault(
                          _.lineWidth,
                          0,
                        )),
                          (a.strokeStyle = Y.getValueAtIndexOrDefault(
                            _.color,
                            0,
                          ));
                        var V = x.left,
                          W = x.right,
                          z = x.top,
                          E = x.bottom,
                          B = Y.aliasPixel(a.lineWidth);
                        C
                          ? ((z = E = "top" === w.position ? x.bottom : x.top),
                            (z += B),
                            (E += B))
                          : ((V = W = "left" === w.position ? x.right : x.left),
                            (V += B),
                            (W += B)),
                          a.beginPath(),
                          a.moveTo(V, z),
                          a.lineTo(W, E),
                          a.stroke();
                      }
                    }
                  },
                }));
            };
          },
          {},
        ],
        32: [
          function (t, e, i) {
            "use strict";
            e.exports = function (i) {
              var n = i.helpers;
              i.scaleService = {
                constructors: {},
                defaults: {},
                registerScaleType: function (t, e, i) {
                  (this.constructors[t] = e), (this.defaults[t] = n.clone(i));
                },
                getScaleConstructor: function (t) {
                  return this.constructors.hasOwnProperty(t)
                    ? this.constructors[t]
                    : void 0;
                },
                getScaleDefaults: function (t) {
                  return this.defaults.hasOwnProperty(t)
                    ? n.scaleMerge(i.defaults.scale, this.defaults[t])
                    : {};
                },
                updateScaleDefaults: function (t, e) {
                  var i = this.defaults;
                  i.hasOwnProperty(t) && (i[t] = n.extend(i[t], e));
                },
                addScalesToLayout: function (e) {
                  n.each(e.scales, function (t) {
                    i.layoutService.addBox(e, t);
                  });
                },
              };
            };
          },
          {},
        ],
        33: [
          function (t, e, i) {
            "use strict";
            e.exports = function (p) {
              var m = p.helpers;
              p.defaults.global.title = {
                display: !1,
                position: "top",
                fullWidth: !0,
                fontStyle: "bold",
                padding: 10,
                text: "",
              };
              var t = m.noop;
              (p.Title = p.Element.extend({
                initialize: function (t) {
                  m.extend(this, t),
                    (this.options = m.configMerge(
                      p.defaults.global.title,
                      t.options,
                    )),
                    (this.legendHitBoxes = []);
                },
                beforeUpdate: function () {
                  var t = this.chart.options;
                  t &&
                    t.title &&
                    (this.options = m.configMerge(
                      p.defaults.global.title,
                      t.title,
                    ));
                },
                update: function (t, e, i) {
                  var n = this;
                  return (
                    n.beforeUpdate(),
                    (n.maxWidth = t),
                    (n.maxHeight = e),
                    (n.margins = i),
                    n.beforeSetDimensions(),
                    n.setDimensions(),
                    n.afterSetDimensions(),
                    n.beforeBuildLabels(),
                    n.buildLabels(),
                    n.afterBuildLabels(),
                    n.beforeFit(),
                    n.fit(),
                    n.afterFit(),
                    n.afterUpdate(),
                    n.minSize
                  );
                },
                afterUpdate: t,
                beforeSetDimensions: t,
                setDimensions: function () {
                  var t = this;
                  t.isHorizontal()
                    ? ((t.width = t.maxWidth),
                      (t.left = 0),
                      (t.right = t.width))
                    : ((t.height = t.maxHeight),
                      (t.top = 0),
                      (t.bottom = t.height)),
                    (t.paddingLeft = 0),
                    (t.paddingTop = 0),
                    (t.paddingRight = 0),
                    (t.paddingBottom = 0),
                    (t.minSize = { width: 0, height: 0 });
                },
                afterSetDimensions: t,
                beforeBuildLabels: t,
                buildLabels: t,
                afterBuildLabels: t,
                beforeFit: t,
                fit: function () {
                  var t = m.getValueOrDefault,
                    e = this.options,
                    i = p.defaults.global,
                    n = e.display,
                    a = t(e.fontSize, i.defaultFontSize),
                    r = this.minSize;
                  this.isHorizontal()
                    ? ((r.width = this.maxWidth),
                      (r.height = n ? a + 2 * e.padding : 0))
                    : ((r.width = n ? a + 2 * e.padding : 0),
                      (r.height = this.maxHeight)),
                    (this.width = r.width),
                    (this.height = r.height);
                },
                afterFit: t,
                isHorizontal: function () {
                  var t = this.options.position;
                  return "top" === t || "bottom" === t;
                },
                draw: function () {
                  var t = this.ctx,
                    e = m.getValueOrDefault,
                    i = this.options,
                    n = p.defaults.global;
                  if (i.display) {
                    var a,
                      r,
                      o = e(i.fontSize, n.defaultFontSize),
                      s = e(i.fontStyle, n.defaultFontStyle),
                      l = e(i.fontFamily, n.defaultFontFamily),
                      u = m.fontString(o, s, l),
                      d = 0,
                      c = this.top,
                      h = this.left,
                      f = this.bottom,
                      g = this.right;
                    (t.fillStyle = e(i.fontColor, n.defaultFontColor)),
                      (t.font = u),
                      this.isHorizontal()
                        ? ((a = h + (g - h) / 2), (r = c + (f - c) / 2))
                        : ((a = "left" === i.position ? h + o / 2 : g - o / 2),
                          (r = c + (f - c) / 2),
                          (d = Math.PI * ("left" === i.position ? -0.5 : 0.5))),
                      t.save(),
                      t.translate(a, r),
                      t.rotate(d),
                      (t.textAlign = "center"),
                      (t.textBaseline = "middle"),
                      t.fillText(i.text, 0, 0),
                      t.restore();
                  }
                },
              })),
                p.plugins.register({
                  beforeInit: function (t) {
                    var e = t.options.title;
                    e &&
                      ((t.titleBlock = new p.Title({
                        ctx: t.chart.ctx,
                        options: e,
                        chart: t,
                      })),
                      p.layoutService.addBox(t, t.titleBlock));
                  },
                });
            };
          },
          {},
        ],
        34: [
          function (t, e, i) {
            "use strict";
            e.exports = function (n) {
              var x = n.helpers;
              function o(t, e) {
                return (
                  e &&
                    (x.isArray(e)
                      ? Array.prototype.push.apply(t, e)
                      : t.push(e)),
                  t
                );
              }
              (n.defaults.global.tooltips = {
                enabled: !0,
                custom: null,
                mode: "single",
                backgroundColor: "rgba(0,0,0,0.8)",
                titleFontStyle: "bold",
                titleSpacing: 2,
                titleMarginBottom: 6,
                titleFontColor: "#fff",
                titleAlign: "left",
                bodySpacing: 2,
                bodyFontColor: "#fff",
                bodyAlign: "left",
                footerFontStyle: "bold",
                footerSpacing: 2,
                footerMarginTop: 6,
                footerFontColor: "#fff",
                footerAlign: "left",
                yPadding: 6,
                xPadding: 6,
                yAlign: "center",
                xAlign: "center",
                caretSize: 5,
                cornerRadius: 6,
                multiKeyBackground: "#fff",
                callbacks: {
                  beforeTitle: x.noop,
                  title: function (t, e) {
                    var i = "",
                      n = e.labels,
                      a = n ? n.length : 0;
                    if (0 < t.length) {
                      var r = t[0];
                      r.xLabel
                        ? (i = r.xLabel)
                        : 0 < a && r.index < a && (i = n[r.index]);
                    }
                    return i;
                  },
                  afterTitle: x.noop,
                  beforeBody: x.noop,
                  beforeLabel: x.noop,
                  label: function (t, e) {
                    return (
                      (e.datasets[t.datasetIndex].label || "") + ": " + t.yLabel
                    );
                  },
                  labelColor: function (t, e) {
                    var i = e.getDatasetMeta(t.datasetIndex).data[t.index]
                      ._view;
                    return {
                      borderColor: i.borderColor,
                      backgroundColor: i.backgroundColor,
                    };
                  },
                  afterLabel: x.noop,
                  afterBody: x.noop,
                  beforeFooter: x.noop,
                  footer: x.noop,
                  afterFooter: x.noop,
                },
              }),
                (n.Tooltip = n.Element.extend({
                  initialize: function () {
                    var t = n.defaults.global,
                      e = this._options,
                      i = x.getValueOrDefault;
                    x.extend(this, {
                      _model: {
                        xPadding: e.xPadding,
                        yPadding: e.yPadding,
                        xAlign: e.xAlign,
                        yAlign: e.yAlign,
                        bodyFontColor: e.bodyFontColor,
                        _bodyFontFamily: i(
                          e.bodyFontFamily,
                          t.defaultFontFamily,
                        ),
                        _bodyFontStyle: i(e.bodyFontStyle, t.defaultFontStyle),
                        _bodyAlign: e.bodyAlign,
                        bodyFontSize: i(e.bodyFontSize, t.defaultFontSize),
                        bodySpacing: e.bodySpacing,
                        titleFontColor: e.titleFontColor,
                        _titleFontFamily: i(
                          e.titleFontFamily,
                          t.defaultFontFamily,
                        ),
                        _titleFontStyle: i(
                          e.titleFontStyle,
                          t.defaultFontStyle,
                        ),
                        titleFontSize: i(e.titleFontSize, t.defaultFontSize),
                        _titleAlign: e.titleAlign,
                        titleSpacing: e.titleSpacing,
                        titleMarginBottom: e.titleMarginBottom,
                        footerFontColor: e.footerFontColor,
                        _footerFontFamily: i(
                          e.footerFontFamily,
                          t.defaultFontFamily,
                        ),
                        _footerFontStyle: i(
                          e.footerFontStyle,
                          t.defaultFontStyle,
                        ),
                        footerFontSize: i(e.footerFontSize, t.defaultFontSize),
                        _footerAlign: e.footerAlign,
                        footerSpacing: e.footerSpacing,
                        footerMarginTop: e.footerMarginTop,
                        caretSize: e.caretSize,
                        cornerRadius: e.cornerRadius,
                        backgroundColor: e.backgroundColor,
                        opacity: 0,
                        legendColorBackground: e.multiKeyBackground,
                      },
                    });
                  },
                  getTitle: function () {
                    var t = this._options.callbacks,
                      e = t.beforeTitle.apply(this, arguments),
                      i = t.title.apply(this, arguments),
                      n = t.afterTitle.apply(this, arguments),
                      a = [];
                    return (a = o((a = o((a = o(a, e)), i)), n));
                  },
                  getBeforeBody: function () {
                    var t = this._options.callbacks.beforeBody.apply(
                      this,
                      arguments,
                    );
                    return x.isArray(t) ? t : void 0 !== t ? [t] : [];
                  },
                  getBody: function (t, i) {
                    var n = this,
                      a = n._options.callbacks,
                      r = [];
                    return (
                      x.each(t, function (t) {
                        var e = { before: [], lines: [], after: [] };
                        o(e.before, a.beforeLabel.call(n, t, i)),
                          o(e.lines, a.label.call(n, t, i)),
                          o(e.after, a.afterLabel.call(n, t, i)),
                          r.push(e);
                      }),
                      r
                    );
                  },
                  getAfterBody: function () {
                    var t = this._options.callbacks.afterBody.apply(
                      this,
                      arguments,
                    );
                    return x.isArray(t) ? t : void 0 !== t ? [t] : [];
                  },
                  getFooter: function () {
                    var t = this._options.callbacks,
                      e = t.beforeFooter.apply(this, arguments),
                      i = t.footer.apply(this, arguments),
                      n = t.afterFooter.apply(this, arguments),
                      a = [];
                    return (a = o((a = o((a = o(a, e)), i)), n));
                  },
                  update: function (t) {
                    var e,
                      i,
                      n,
                      a,
                      r,
                      o,
                      s,
                      l = this,
                      u = l._options,
                      d = l._model,
                      c = l._active,
                      h = l._data,
                      f = l._chartInstance;
                    if (c.length) {
                      d.opacity = 1;
                      var g = [],
                        p = (function (t) {
                          if (!t.length) return !1;
                          var e,
                            i,
                            n = [],
                            a = [];
                          for (e = 0, i = t.length; e < i; ++e) {
                            var r = t[e];
                            if (r && r.hasValue()) {
                              var o = r.tooltipPosition();
                              n.push(o.x), a.push(o.y);
                            }
                          }
                          var s = 0,
                            l = 0;
                          for (e = 0; e < n.length; ++e)
                            n[e] && ((s += n[e]), (l += a[e]));
                          return {
                            x: Math.round(s / n.length),
                            y: Math.round(l / n.length),
                          };
                        })(c),
                        m = [];
                      for (e = 0, i = c.length; e < i; ++e)
                        m.push(
                          ((n = c[e]),
                          (r = a = void 0),
                          (a = n._xScale),
                          (r = n._yScale || n._scale),
                          (o = n._index),
                          (s = n._datasetIndex),
                          {
                            xLabel: a ? a.getLabelForIndex(o, s) : "",
                            yLabel: r ? r.getLabelForIndex(o, s) : "",
                            index: o,
                            datasetIndex: s,
                          }),
                        );
                      u.itemSort && (m = m.sort(u.itemSort)),
                        1 < c.length &&
                          x.each(m, function (t) {
                            g.push(u.callbacks.labelColor.call(l, t, f));
                          }),
                        x.extend(d, {
                          title: l.getTitle(m, h),
                          beforeBody: l.getBeforeBody(m, h),
                          body: l.getBody(m, h),
                          afterBody: l.getAfterBody(m, h),
                          footer: l.getFooter(m, h),
                          x: Math.round(p.x),
                          y: Math.round(p.y),
                          caretPadding: x.getValueOrDefault(p.padding, 2),
                          labelColors: g,
                        });
                      var v = l.getTooltipSize(d);
                      l.determineAlignment(v),
                        x.extend(d, l.getBackgroundPoint(d, v));
                    } else l._model.opacity = 0;
                    return t && u.custom && u.custom.call(l, d), l;
                  },
                  getTooltipSize: function (t) {
                    var e = this._chart.ctx,
                      i = { height: 2 * t.yPadding, width: 0 },
                      n = t.body,
                      a = n.reduce(function (t, e) {
                        return (
                          t + e.before.length + e.lines.length + e.after.length
                        );
                      }, 0);
                    a += t.beforeBody.length + t.afterBody.length;
                    var r = t.title.length,
                      o = t.footer.length,
                      s = t.titleFontSize,
                      l = t.bodyFontSize,
                      u = t.footerFontSize;
                    (i.height += r * s),
                      (i.height += (r - 1) * t.titleSpacing),
                      (i.height += r ? t.titleMarginBottom : 0),
                      (i.height += a * l),
                      (i.height += a ? (a - 1) * t.bodySpacing : 0),
                      (i.height += o ? t.footerMarginTop : 0),
                      (i.height += o * u),
                      (i.height += o ? (o - 1) * t.footerSpacing : 0);
                    var d = 0,
                      c = function (t) {
                        i.width = Math.max(i.width, e.measureText(t).width + d);
                      };
                    return (
                      (e.font = x.fontString(
                        s,
                        t._titleFontStyle,
                        t._titleFontFamily,
                      )),
                      x.each(t.title, c),
                      (e.font = x.fontString(
                        l,
                        t._bodyFontStyle,
                        t._bodyFontFamily,
                      )),
                      x.each(t.beforeBody.concat(t.afterBody), c),
                      (d = 1 < n.length ? l + 2 : 0),
                      x.each(n, function (t) {
                        x.each(t.before, c),
                          x.each(t.lines, c),
                          x.each(t.after, c);
                      }),
                      (d = 0),
                      (e.font = x.fontString(
                        u,
                        t._footerFontStyle,
                        t._footerFontFamily,
                      )),
                      x.each(t.footer, c),
                      (i.width += 2 * t.xPadding),
                      i
                    );
                  },
                  determineAlignment: function (e) {
                    var t,
                      i,
                      n,
                      a,
                      r,
                      o = this._model,
                      s = this._chart,
                      l = this._chartInstance.chartArea;
                    o.y < e.height
                      ? (o.yAlign = "top")
                      : o.y > s.height - e.height && (o.yAlign = "bottom");
                    var u = (l.left + l.right) / 2,
                      d = (l.top + l.bottom) / 2;
                    (i =
                      "center" === o.yAlign
                        ? ((t = function (t) {
                            return t <= u;
                          }),
                          function (t) {
                            return u < t;
                          })
                        : ((t = function (t) {
                            return t <= e.width / 2;
                          }),
                          function (t) {
                            return t >= s.width - e.width / 2;
                          })),
                      (n = function (t) {
                        return t + e.width > s.width;
                      }),
                      (a = function (t) {
                        return t - e.width < 0;
                      }),
                      (r = function (t) {
                        return t <= d ? "top" : "bottom";
                      }),
                      t(o.x)
                        ? ((o.xAlign = "left"),
                          n(o.x) &&
                            ((o.xAlign = "center"), (o.yAlign = r(o.y))))
                        : i(o.x) &&
                          ((o.xAlign = "right"),
                          a(o.x) &&
                            ((o.xAlign = "center"), (o.yAlign = r(o.y))));
                  },
                  getBackgroundPoint: function (t, e) {
                    var i = { x: t.x, y: t.y },
                      n = t.caretSize,
                      a = t.caretPadding,
                      r = t.cornerRadius,
                      o = t.xAlign,
                      s = t.yAlign,
                      l = n + a,
                      u = r + a;
                    return (
                      "right" === o
                        ? (i.x -= e.width)
                        : "center" === o && (i.x -= e.width / 2),
                      "top" === s
                        ? (i.y += l)
                        : (i.y -= "bottom" === s ? e.height + l : e.height / 2),
                      "center" === s
                        ? "left" === o
                          ? (i.x += l)
                          : "right" === o && (i.x -= l)
                        : "left" === o
                          ? (i.x -= u)
                          : "right" === o && (i.x += u),
                      i
                    );
                  },
                  drawCaret: function (t, e, i) {
                    var n,
                      a,
                      r,
                      o,
                      s,
                      l,
                      u = this._view,
                      d = this._chart.ctx,
                      c = u.caretSize,
                      h = u.cornerRadius,
                      f = u.xAlign,
                      g = u.yAlign,
                      p = t.x,
                      m = t.y,
                      v = e.width,
                      y = e.height;
                    l =
                      "center" === g
                        ? ((r =
                            ((a = "left" === f ? (n = p) - c : (n = p + v) + c),
                            n)),
                          (o = (s = m + y / 2) - c),
                          s + c)
                        : ((r =
                            "left" === f
                              ? (a = (n = p + h) + c) + c
                              : "right" === f
                                ? (a = (n = p + v - h) - c) - c
                                : ((n = (a = p + v / 2) - c), a + c)),
                          (s = "top" === g ? (o = m) - c : (o = m + y) + c),
                          o);
                    var b = x.color(u.backgroundColor);
                    (d.fillStyle = b.alpha(i * b.alpha()).rgbString()),
                      d.beginPath(),
                      d.moveTo(n, o),
                      d.lineTo(a, s),
                      d.lineTo(r, l),
                      d.closePath(),
                      d.fill();
                  },
                  drawTitle: function (t, e, i, n) {
                    var a = e.title;
                    if (a.length) {
                      (i.textAlign = e._titleAlign), (i.textBaseline = "top");
                      var r,
                        o,
                        s = e.titleFontSize,
                        l = e.titleSpacing,
                        u = x.color(e.titleFontColor);
                      for (
                        i.fillStyle = u.alpha(n * u.alpha()).rgbString(),
                          i.font = x.fontString(
                            s,
                            e._titleFontStyle,
                            e._titleFontFamily,
                          ),
                          r = 0,
                          o = a.length;
                        r < o;
                        ++r
                      )
                        i.fillText(a[r], t.x, t.y),
                          (t.y += s + l),
                          r + 1 === a.length &&
                            (t.y += e.titleMarginBottom - l);
                    }
                  },
                  drawBody: function (i, n, a, r) {
                    var o = n.bodyFontSize,
                      e = n.bodySpacing,
                      t = n.body;
                    (a.textAlign = n._bodyAlign), (a.textBaseline = "top");
                    var s = x.color(n.bodyFontColor),
                      l = s.alpha(r * s.alpha()).rgbString();
                    (a.fillStyle = l),
                      (a.font = x.fontString(
                        o,
                        n._bodyFontStyle,
                        n._bodyFontFamily,
                      ));
                    var u = 0,
                      d = function (t) {
                        a.fillText(t, i.x + u, i.y), (i.y += o + e);
                      };
                    x.each(n.beforeBody, d);
                    var c = 1 < t.length;
                    (u = c ? o + 2 : 0),
                      x.each(t, function (t, e) {
                        x.each(t.before, d),
                          x.each(t.lines, function (t) {
                            c &&
                              ((a.fillStyle = x
                                .color(n.legendColorBackground)
                                .alpha(r)
                                .rgbaString()),
                              a.fillRect(i.x, i.y, o, o),
                              (a.strokeStyle = x
                                .color(n.labelColors[e].borderColor)
                                .alpha(r)
                                .rgbaString()),
                              a.strokeRect(i.x, i.y, o, o),
                              (a.fillStyle = x
                                .color(n.labelColors[e].backgroundColor)
                                .alpha(r)
                                .rgbaString()),
                              a.fillRect(i.x + 1, i.y + 1, o - 2, o - 2),
                              (a.fillStyle = l)),
                              d(t);
                          }),
                          x.each(t.after, d);
                      }),
                      (u = 0),
                      x.each(n.afterBody, d),
                      (i.y -= e);
                  },
                  drawFooter: function (e, i, n, t) {
                    var a = i.footer;
                    if (a.length) {
                      (e.y += i.footerMarginTop),
                        (n.textAlign = i._footerAlign),
                        (n.textBaseline = "top");
                      var r = x.color(i.footerFontColor);
                      (n.fillStyle = r.alpha(t * r.alpha()).rgbString()),
                        (n.font = x.fontString(
                          i.footerFontSize,
                          i._footerFontStyle,
                          i._footerFontFamily,
                        )),
                        x.each(a, function (t) {
                          n.fillText(t, e.x, e.y),
                            (e.y += i.footerFontSize + i.footerSpacing);
                        });
                    }
                  },
                  draw: function () {
                    var t = this._chart.ctx,
                      e = this._view;
                    if (0 !== e.opacity) {
                      var i = this.getTooltipSize(e),
                        n = { x: e.x, y: e.y },
                        a = Math.abs(e.opacity < 0.001) ? 0 : e.opacity;
                      if (this._options.enabled) {
                        var r = x.color(e.backgroundColor);
                        (t.fillStyle = r.alpha(a * r.alpha()).rgbString()),
                          x.drawRoundedRectangle(
                            t,
                            n.x,
                            n.y,
                            i.width,
                            i.height,
                            e.cornerRadius,
                          ),
                          t.fill(),
                          this.drawCaret(n, i, a),
                          (n.x += e.xPadding),
                          (n.y += e.yPadding),
                          this.drawTitle(n, e, t, a),
                          this.drawBody(n, e, t, a),
                          this.drawFooter(n, e, t, a);
                      }
                    }
                  },
                }));
            };
          },
          {},
        ],
        35: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var d = t.helpers,
                e = t.defaults.global;
              (e.elements.arc = {
                backgroundColor: e.defaultColor,
                borderColor: "#fff",
                borderWidth: 2,
              }),
                (t.elements.Arc = t.Element.extend({
                  inLabelRange: function (t) {
                    var e = this._view;
                    return (
                      !!e &&
                      Math.pow(t - e.x, 2) <
                        Math.pow(e.radius + e.hoverRadius, 2)
                    );
                  },
                  inRange: function (t, e) {
                    var i = this._view;
                    if (i) {
                      for (
                        var n = d.getAngleFromPoint(i, { x: t, y: e }),
                          a = n.angle,
                          r = n.distance,
                          o = i.startAngle,
                          s = i.endAngle;
                        s < o;

                      )
                        s += 2 * Math.PI;
                      for (; s < a; ) a -= 2 * Math.PI;
                      for (; a < o; ) a += 2 * Math.PI;
                      var l = o <= a && a <= s,
                        u = r >= i.innerRadius && r <= i.outerRadius;
                      return l && u;
                    }
                    return !1;
                  },
                  tooltipPosition: function () {
                    var t = this._view,
                      e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                      i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                    return {
                      x: t.x + Math.cos(e) * i,
                      y: t.y + Math.sin(e) * i,
                    };
                  },
                  draw: function () {
                    var t = this._chart.ctx,
                      e = this._view,
                      i = e.startAngle,
                      n = e.endAngle;
                    t.beginPath(),
                      t.arc(e.x, e.y, e.outerRadius, i, n),
                      t.arc(e.x, e.y, e.innerRadius, n, i, !0),
                      t.closePath(),
                      (t.strokeStyle = e.borderColor),
                      (t.lineWidth = e.borderWidth),
                      (t.fillStyle = e.backgroundColor),
                      t.fill(),
                      (t.lineJoin = "bevel"),
                      e.borderWidth && t.stroke();
                  },
                }));
            };
          },
          {},
        ],
        36: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var f = t.helpers,
                g = t.defaults.global;
              (t.defaults.global.elements.line = {
                tension: 0.4,
                backgroundColor: g.defaultColor,
                borderWidth: 3,
                borderColor: g.defaultColor,
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0,
                borderJoinStyle: "miter",
                capBezierPoints: !0,
                fill: !0,
              }),
                (t.elements.Line = t.Element.extend({
                  draw: function () {
                    var t = this._view,
                      e = t.spanGaps,
                      i = t.scaleZero,
                      n = this._loop,
                      a = this._chart.ctx;
                    function r(t, e) {
                      var i = e._view;
                      !0 === e._view.steppedLine
                        ? (a.lineTo(e._view.x, t._view.y),
                          a.lineTo(e._view.x, e._view.y))
                        : 0 === e._view.tension
                          ? a.lineTo(i.x, i.y)
                          : a.bezierCurveTo(
                              t._view.controlPointNextX,
                              t._view.controlPointNextY,
                              i.controlPointPreviousX,
                              i.controlPointPreviousY,
                              i.x,
                              i.y,
                            );
                    }
                    a.save();
                    var o,
                      s,
                      l,
                      u,
                      d = this._children.slice(),
                      c = -1;
                    if ((n && d.length && d.push(d[0]), d.length && t.fill)) {
                      for (a.beginPath(), o = 0; o < d.length; ++o)
                        (s = d[o]),
                          (l = f.previousItem(d, o)),
                          (u = s._view),
                          0 === o
                            ? (n ? a.moveTo(i.x, i.y) : a.moveTo(u.x, i),
                              u.skip || ((c = o), a.lineTo(u.x, u.y)))
                            : ((l = -1 === c ? l : d[c]),
                              u.skip
                                ? e ||
                                  c !== o - 1 ||
                                  (n
                                    ? a.lineTo(i.x, i.y)
                                    : a.lineTo(l._view.x, i))
                                : (c !== o - 1
                                    ? e && -1 !== c
                                      ? r(l, s)
                                      : (n || a.lineTo(u.x, i),
                                        a.lineTo(u.x, u.y))
                                    : r(l, s),
                                  (c = o)));
                      n || a.lineTo(d[c]._view.x, i),
                        (a.fillStyle = t.backgroundColor || g.defaultColor),
                        a.closePath(),
                        a.fill();
                    }
                    var h = g.elements.line;
                    for (
                      a.lineCap = t.borderCapStyle || h.borderCapStyle,
                        a.setLineDash &&
                          a.setLineDash(t.borderDash || h.borderDash),
                        a.lineDashOffset =
                          t.borderDashOffset || h.borderDashOffset,
                        a.lineJoin = t.borderJoinStyle || h.borderJoinStyle,
                        a.lineWidth = t.borderWidth || h.borderWidth,
                        a.strokeStyle = t.borderColor || g.defaultColor,
                        a.beginPath(),
                        c = -1,
                        o = 0;
                      o < d.length;
                      ++o
                    )
                      (s = d[o]),
                        (l = f.previousItem(d, o)),
                        (u = s._view),
                        0 === o
                          ? u.skip || (a.moveTo(u.x, u.y), (c = o))
                          : ((l = -1 === c ? l : d[c]),
                            u.skip ||
                              ((c !== o - 1 && !e) || -1 === c
                                ? a.moveTo(u.x, u.y)
                                : r(l, s),
                              (c = o)));
                    a.stroke(), a.restore();
                  },
                }));
            };
          },
          {},
        ],
        37: [
          function (t, e, i) {
            "use strict";
            e.exports = function (o) {
              var s = o.helpers,
                l = o.defaults.global,
                u = l.defaultColor;
              (l.elements.point = {
                radius: 3,
                pointStyle: "circle",
                backgroundColor: u,
                borderWidth: 1,
                borderColor: u,
                hitRadius: 1,
                hoverRadius: 4,
                hoverBorderWidth: 1,
              }),
                (o.elements.Point = o.Element.extend({
                  inRange: function (t, e) {
                    var i = this._view;
                    return (
                      !!i &&
                      Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) <
                        Math.pow(i.hitRadius + i.radius, 2)
                    );
                  },
                  inLabelRange: function (t) {
                    var e = this._view;
                    return (
                      !!e &&
                      Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2)
                    );
                  },
                  tooltipPosition: function () {
                    var t = this._view;
                    return {
                      x: t.x,
                      y: t.y,
                      padding: t.radius + t.borderWidth,
                    };
                  },
                  draw: function () {
                    var t = this._view,
                      e = this._chart.ctx,
                      i = t.pointStyle,
                      n = t.radius,
                      a = t.x,
                      r = t.y;
                    t.skip ||
                      ((e.strokeStyle = t.borderColor || u),
                      (e.lineWidth = s.getValueOrDefault(
                        t.borderWidth,
                        l.elements.point.borderWidth,
                      )),
                      (e.fillStyle = t.backgroundColor || u),
                      o.canvasHelpers.drawPoint(e, i, n, a, r));
                  },
                }));
            };
          },
          {},
        ],
        38: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var e = t.defaults.global;
              (e.elements.rectangle = {
                backgroundColor: e.defaultColor,
                borderWidth: 0,
                borderColor: e.defaultColor,
                borderSkipped: "bottom",
              }),
                (t.elements.Rectangle = t.Element.extend({
                  draw: function () {
                    var t = this._chart.ctx,
                      e = this._view,
                      i = e.width / 2,
                      n = e.x - i,
                      a = e.x + i,
                      r = e.base - (e.base - e.y),
                      o = e.borderWidth / 2;
                    e.borderWidth && ((n += o), (a -= o), (r += o)),
                      t.beginPath(),
                      (t.fillStyle = e.backgroundColor),
                      (t.strokeStyle = e.borderColor),
                      (t.lineWidth = e.borderWidth);
                    var s = [
                        [n, e.base],
                        [n, r],
                        [a, r],
                        [a, e.base],
                      ],
                      l = ["bottom", "left", "top", "right"].indexOf(
                        e.borderSkipped,
                        0,
                      );
                    function u(t) {
                      return s[(l + t) % 4];
                    }
                    -1 === l && (l = 0), t.moveTo.apply(t, u(0));
                    for (var d = 1; d < 4; d++) t.lineTo.apply(t, u(d));
                    t.fill(), e.borderWidth && t.stroke();
                  },
                  height: function () {
                    var t = this._view;
                    return t.base - t.y;
                  },
                  inRange: function (t, e) {
                    var i = this._view;
                    return (
                      !!i &&
                      (i.y < i.base
                        ? t >= i.x - i.width / 2 &&
                          t <= i.x + i.width / 2 &&
                          e >= i.y &&
                          e <= i.base
                        : t >= i.x - i.width / 2 &&
                          t <= i.x + i.width / 2 &&
                          e >= i.base &&
                          e <= i.y)
                    );
                  },
                  inLabelRange: function (t) {
                    var e = this._view;
                    return (
                      !!e && t >= e.x - e.width / 2 && t <= e.x + e.width / 2
                    );
                  },
                  tooltipPosition: function () {
                    var t = this._view;
                    return { x: t.x, y: t.y };
                  },
                }));
            };
          },
          {},
        ],
        39: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var n = t.helpers,
                e = t.Scale.extend({
                  getLabels: function () {
                    var t = this.chart.data;
                    return (
                      (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
                    );
                  },
                  determineDataLimits: function () {
                    var t,
                      e = this,
                      i = e.getLabels();
                    (e.minIndex = 0),
                      (e.maxIndex = i.length - 1),
                      void 0 !== e.options.ticks.min &&
                        ((t = n.indexOf(i, e.options.ticks.min)),
                        (e.minIndex = -1 !== t ? t : e.minIndex)),
                      void 0 !== e.options.ticks.max &&
                        ((t = n.indexOf(i, e.options.ticks.max)),
                        (e.maxIndex = -1 !== t ? t : e.maxIndex)),
                      (e.min = i[e.minIndex]),
                      (e.max = i[e.maxIndex]);
                  },
                  buildTicks: function () {
                    var t = this.getLabels();
                    this.ticks =
                      0 === this.minIndex && this.maxIndex === t.length - 1
                        ? t
                        : t.slice(this.minIndex, this.maxIndex + 1);
                  },
                  getLabelForIndex: function (t) {
                    return this.ticks[t];
                  },
                  getPixelForValue: function (t, e, i, n) {
                    var a = this,
                      r = Math.max(
                        a.maxIndex +
                          1 -
                          a.minIndex -
                          (a.options.gridLines.offsetGridLines ? 0 : 1),
                        1,
                      );
                    if (void 0 !== t) {
                      var o = a.getLabels().indexOf(t);
                      e = -1 !== o ? o : e;
                    }
                    if (a.isHorizontal()) {
                      var s = (a.width - (a.paddingLeft + a.paddingRight)) / r,
                        l = s * (e - a.minIndex) + a.paddingLeft;
                      return (
                        a.options.gridLines.offsetGridLines &&
                          n &&
                          (l += s / 2),
                        a.left + Math.round(l)
                      );
                    }
                    var u = (a.height - (a.paddingTop + a.paddingBottom)) / r,
                      d = u * (e - a.minIndex) + a.paddingTop;
                    return (
                      a.options.gridLines.offsetGridLines && n && (d += u / 2),
                      a.top + Math.round(d)
                    );
                  },
                  getPixelForTick: function (t, e) {
                    return this.getPixelForValue(
                      this.ticks[t],
                      t + this.minIndex,
                      null,
                      e,
                    );
                  },
                  getValueForPixel: function (t) {
                    var e = this,
                      i = Math.max(
                        e.ticks.length -
                          (e.options.gridLines.offsetGridLines ? 0 : 1),
                        1,
                      ),
                      n = e.isHorizontal(),
                      a =
                        (n
                          ? e.width - (e.paddingLeft + e.paddingRight)
                          : e.height - (e.paddingTop + e.paddingBottom)) / i;
                    return (
                      (t -= n ? e.left : e.top),
                      e.options.gridLines.offsetGridLines && (t -= a / 2),
                      (t -= n ? e.paddingLeft : e.paddingTop) <= 0
                        ? 0
                        : Math.round(t / a)
                    );
                  },
                  getBasePixel: function () {
                    return this.bottom;
                  },
                });
              t.scaleService.registerScaleType("category", e, {
                position: "bottom",
              });
            };
          },
          {},
        ],
        40: [
          function (t, e, i) {
            "use strict";
            e.exports = function (n) {
              var d = n.helpers,
                t = {
                  position: "left",
                  ticks: {
                    callback: function (t, e, i) {
                      var n = 3 < i.length ? i[2] - i[1] : i[1] - i[0];
                      1 < Math.abs(n) &&
                        t !== Math.floor(t) &&
                        (n = t - Math.floor(t));
                      var a = d.log10(Math.abs(n)),
                        r = "";
                      if (0 !== t) {
                        var o = -1 * Math.floor(a);
                        (o = Math.max(Math.min(o, 20), 0)), (r = t.toFixed(o));
                      } else r = "0";
                      return r;
                    },
                  },
                },
                e = n.LinearScaleBase.extend({
                  determineDataLimits: function () {
                    var o = this,
                      s = o.options,
                      i = o.chart,
                      t = i.data.datasets,
                      e = o.isHorizontal();
                    function l(t) {
                      return e ? t.xAxisID === o.id : t.yAxisID === o.id;
                    }
                    if (((o.min = null), (o.max = null), s.stacked)) {
                      var u = {};
                      d.each(t, function (t, e) {
                        var n = i.getDatasetMeta(e);
                        void 0 === u[n.type] &&
                          (u[n.type] = {
                            positiveValues: [],
                            negativeValues: [],
                          });
                        var a = u[n.type].positiveValues,
                          r = u[n.type].negativeValues;
                        i.isDatasetVisible(e) &&
                          l(n) &&
                          d.each(t.data, function (t, e) {
                            var i = +o.getRightValue(t);
                            isNaN(i) ||
                              n.data[e].hidden ||
                              ((a[e] = a[e] || 0),
                              (r[e] = r[e] || 0),
                              s.relativePoints
                                ? (a[e] = 100)
                                : i < 0
                                  ? (!0, (r[e] += i))
                                  : (!0, (a[e] += i)));
                          });
                      }),
                        d.each(u, function (t) {
                          var e = t.positiveValues.concat(t.negativeValues),
                            i = d.min(e),
                            n = d.max(e);
                          (o.min = null === o.min ? i : Math.min(o.min, i)),
                            (o.max = null === o.max ? n : Math.max(o.max, n));
                        });
                    } else
                      d.each(t, function (t, e) {
                        var n = i.getDatasetMeta(e);
                        i.isDatasetVisible(e) &&
                          l(n) &&
                          d.each(t.data, function (t, e) {
                            var i = +o.getRightValue(t);
                            isNaN(i) ||
                              n.data[e].hidden ||
                              (null === o.min
                                ? (o.min = i)
                                : i < o.min && (o.min = i),
                              null === o.max
                                ? (o.max = i)
                                : i > o.max && (o.max = i));
                          });
                      });
                    this.handleTickRangeOptions();
                  },
                  getTickLimit: function () {
                    var t,
                      e = this.options.ticks;
                    if (this.isHorizontal())
                      t = Math.min(
                        e.maxTicksLimit ? e.maxTicksLimit : 11,
                        Math.ceil(this.width / 50),
                      );
                    else {
                      var i = d.getValueOrDefault(
                        e.fontSize,
                        n.defaults.global.defaultFontSize,
                      );
                      t = Math.min(
                        e.maxTicksLimit ? e.maxTicksLimit : 11,
                        Math.ceil(this.height / (2 * i)),
                      );
                    }
                    return t;
                  },
                  handleDirectionalChanges: function () {
                    this.isHorizontal() || this.ticks.reverse();
                  },
                  getLabelForIndex: function (t, e) {
                    return +this.getRightValue(
                      this.chart.data.datasets[e].data[t],
                    );
                  },
                  getPixelForValue: function (t) {
                    var e,
                      i,
                      n = this,
                      a = n.paddingLeft,
                      r = n.paddingBottom,
                      o = n.start,
                      s = +n.getRightValue(t),
                      l = n.end - o;
                    return n.isHorizontal()
                      ? ((i = n.width - (a + n.paddingRight)),
                        (e = n.left + (i / l) * (s - o)),
                        Math.round(e + a))
                      : ((i = n.height - (n.paddingTop + r)),
                        (e = n.bottom - r - (i / l) * (s - o)),
                        Math.round(e));
                  },
                  getValueForPixel: function (t) {
                    var e = this,
                      i = e.isHorizontal(),
                      n = e.paddingLeft,
                      a = e.paddingBottom,
                      r = i
                        ? e.width - (n + e.paddingRight)
                        : e.height - (e.paddingTop + a),
                      o = (i ? t - e.left - n : e.bottom - a - t) / r;
                    return e.start + (e.end - e.start) * o;
                  },
                  getPixelForTick: function (t) {
                    return this.getPixelForValue(this.ticksAsNumbers[t]);
                  },
                });
              n.scaleService.registerScaleType("linear", e, t);
            };
          },
          {},
        ],
        41: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var h = t.helpers,
                e = h.noop;
              t.LinearScaleBase = t.Scale.extend({
                handleTickRangeOptions: function () {
                  var t = this,
                    e = t.options.ticks;
                  if (e.beginAtZero) {
                    var i = h.sign(t.min),
                      n = h.sign(t.max);
                    i < 0 && n < 0
                      ? (t.max = 0)
                      : 0 < i && 0 < n && (t.min = 0);
                  }
                  void 0 !== e.min
                    ? (t.min = e.min)
                    : void 0 !== e.suggestedMin &&
                      (t.min = Math.min(t.min, e.suggestedMin)),
                    void 0 !== e.max
                      ? (t.max = e.max)
                      : void 0 !== e.suggestedMax &&
                        (t.max = Math.max(t.max, e.suggestedMax)),
                    t.min === t.max && (t.max++, e.beginAtZero || t.min--);
                },
                getTickLimit: e,
                handleDirectionalChanges: e,
                buildTicks: function () {
                  var t,
                    e = this,
                    i = e.options,
                    n = (e.ticks = []),
                    a = i.ticks,
                    r = h.getValueOrDefault,
                    o = e.getTickLimit();
                  if (
                    ((o = Math.max(2, o)),
                    (a.fixedStepSize && 0 < a.fixedStepSize) ||
                      (a.stepSize && 0 < a.stepSize))
                  )
                    t = r(a.fixedStepSize, a.stepSize);
                  else {
                    var s = h.niceNum(e.max - e.min, !1);
                    t = h.niceNum(s / (o - 1), !0);
                  }
                  var l = Math.floor(e.min / t) * t,
                    u = Math.ceil(e.max / t) * t,
                    d = (u - l) / t;
                  (d = h.almostEquals(d, Math.round(d), t / 1e3)
                    ? Math.round(d)
                    : Math.ceil(d)),
                    n.push(void 0 !== a.min ? a.min : l);
                  for (var c = 1; c < d; ++c) n.push(l + c * t);
                  n.push(void 0 !== a.max ? a.max : u),
                    e.handleDirectionalChanges(),
                    (e.max = h.max(n)),
                    (e.min = h.min(n)),
                    a.reverse
                      ? (n.reverse(), (e.start = e.max), (e.end = e.min))
                      : ((e.start = e.min), (e.end = e.max));
                },
                convertTicksToLabels: function () {
                  (this.ticksAsNumbers = this.ticks.slice()),
                    (this.zeroLineIndex = this.ticks.indexOf(0)),
                    t.Scale.prototype.convertTicksToLabels.call(this);
                },
              });
            };
          },
          {},
        ],
        42: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var d = t.helpers,
                e = {
                  position: "left",
                  ticks: {
                    callback: function (t, e, i) {
                      var n = t / Math.pow(10, Math.floor(d.log10(t)));
                      return 1 === n ||
                        2 === n ||
                        5 === n ||
                        0 === e ||
                        e === i.length - 1
                        ? t.toExponential()
                        : "";
                    },
                  },
                },
                i = t.Scale.extend({
                  determineDataLimits: function () {
                    var r = this,
                      o = r.options,
                      t = o.ticks,
                      i = r.chart,
                      e = i.data.datasets,
                      n = d.getValueOrDefault,
                      a = r.isHorizontal();
                    function s(t) {
                      return a ? t.xAxisID === r.id : t.yAxisID === r.id;
                    }
                    if (((r.min = null), (r.max = null), o.stacked)) {
                      var l = {};
                      d.each(e, function (t, e) {
                        var a = i.getDatasetMeta(e);
                        i.isDatasetVisible(e) &&
                          s(a) &&
                          (void 0 === l[a.type] && (l[a.type] = []),
                          d.each(t.data, function (t, e) {
                            var i = l[a.type],
                              n = +r.getRightValue(t);
                            isNaN(n) ||
                              a.data[e].hidden ||
                              ((i[e] = i[e] || 0),
                              o.relativePoints ? (i[e] = 100) : (i[e] += n));
                          }));
                      }),
                        d.each(l, function (t) {
                          var e = d.min(t),
                            i = d.max(t);
                          (r.min = null === r.min ? e : Math.min(r.min, e)),
                            (r.max = null === r.max ? i : Math.max(r.max, i));
                        });
                    } else
                      d.each(e, function (t, e) {
                        var n = i.getDatasetMeta(e);
                        i.isDatasetVisible(e) &&
                          s(n) &&
                          d.each(t.data, function (t, e) {
                            var i = +r.getRightValue(t);
                            isNaN(i) ||
                              n.data[e].hidden ||
                              (null === r.min
                                ? (r.min = i)
                                : i < r.min && (r.min = i),
                              null === r.max
                                ? (r.max = i)
                                : i > r.max && (r.max = i));
                          });
                      });
                    (r.min = n(t.min, r.min)),
                      (r.max = n(t.max, r.max)),
                      r.min === r.max &&
                        (0 !== r.min && null !== r.min
                          ? ((r.min = Math.pow(
                              10,
                              Math.floor(d.log10(r.min)) - 1,
                            )),
                            (r.max = Math.pow(
                              10,
                              Math.floor(d.log10(r.max)) + 1,
                            )))
                          : ((r.min = 1), (r.max = 10)));
                  },
                  buildTicks: function () {
                    for (
                      var t = this,
                        e = t.options.ticks,
                        i = d.getValueOrDefault,
                        n = (t.ticks = []),
                        a = i(e.min, Math.pow(10, Math.floor(d.log10(t.min))));
                      a < t.max;

                    ) {
                      n.push(a);
                      var r = Math.floor(d.log10(a)),
                        o = Math.floor(a / Math.pow(10, r)) + 1;
                      10 === o && ((o = 1), ++r), (a = o * Math.pow(10, r));
                    }
                    var s = i(e.max, a);
                    n.push(s),
                      t.isHorizontal() || n.reverse(),
                      (t.max = d.max(n)),
                      (t.min = d.min(n)),
                      e.reverse
                        ? (n.reverse(), (t.start = t.max), (t.end = t.min))
                        : ((t.start = t.min), (t.end = t.max));
                  },
                  convertTicksToLabels: function () {
                    (this.tickValues = this.ticks.slice()),
                      t.Scale.prototype.convertTicksToLabels.call(this);
                  },
                  getLabelForIndex: function (t, e) {
                    return +this.getRightValue(
                      this.chart.data.datasets[e].data[t],
                    );
                  },
                  getPixelForTick: function (t) {
                    return this.getPixelForValue(this.tickValues[t]);
                  },
                  getPixelForValue: function (t) {
                    var e,
                      i,
                      n = this,
                      a = n.start,
                      r = +n.getRightValue(t),
                      o = d.log10(n.end) - d.log10(a),
                      s = n.paddingTop,
                      l = n.paddingBottom,
                      u = n.paddingLeft;
                    return (
                      n.isHorizontal()
                        ? 0 === r
                          ? (i = n.left + u)
                          : ((e = n.width - (u + n.paddingRight)),
                            (i = n.left + (e / o) * (d.log10(r) - d.log10(a))),
                            (i += u))
                        : (i =
                            0 === r
                              ? n.top + s
                              : ((e = n.height - (s + l)),
                                n.bottom -
                                  l -
                                  (e / o) * (d.log10(r) - d.log10(a)))),
                      i
                    );
                  },
                  getValueForPixel: function (t) {
                    var e,
                      i = this,
                      n = d.log10(i.end) - d.log10(i.start);
                    return i.isHorizontal()
                      ? ((e = i.width - (i.paddingLeft + i.paddingRight)),
                        i.start *
                          Math.pow(10, ((t - i.left - i.paddingLeft) * n) / e))
                      : ((e = i.height - (i.paddingTop + i.paddingBottom)),
                        Math.pow(
                          10,
                          ((i.bottom - i.paddingBottom - t) * n) / e,
                        ) / i.start);
                  },
                });
              t.scaleService.registerScaleType("logarithmic", i, e);
            };
          },
          {},
        ],
        43: [
          function (t, e, i) {
            "use strict";
            e.exports = function (t) {
              var S = t.helpers,
                _ = t.defaults.global,
                e = t.LinearScaleBase.extend({
                  getValueCount: function () {
                    return this.chart.data.labels.length;
                  },
                  setDimensions: function () {
                    var t = this,
                      e = t.options,
                      i = e.ticks;
                    (t.width = t.maxWidth),
                      (t.height = t.maxHeight),
                      (t.xCenter = Math.round(t.width / 2)),
                      (t.yCenter = Math.round(t.height / 2));
                    var n = S.min([t.height, t.width]),
                      a = S.getValueOrDefault(i.fontSize, _.defaultFontSize);
                    t.drawingArea = e.display
                      ? n / 2 - (a / 2 + i.backdropPaddingY)
                      : n / 2;
                  },
                  determineDataLimits: function () {
                    var a = this,
                      i = a.chart;
                    (a.min = null),
                      (a.max = null),
                      S.each(i.data.datasets, function (t, e) {
                        if (i.isDatasetVisible(e)) {
                          var n = i.getDatasetMeta(e);
                          S.each(t.data, function (t, e) {
                            var i = +a.getRightValue(t);
                            isNaN(i) ||
                              n.data[e].hidden ||
                              (null === a.min
                                ? (a.min = i)
                                : i < a.min && (a.min = i),
                              null === a.max
                                ? (a.max = i)
                                : i > a.max && (a.max = i));
                          });
                        }
                      }),
                      a.handleTickRangeOptions();
                  },
                  getTickLimit: function () {
                    var t = this.options.ticks,
                      e = S.getValueOrDefault(t.fontSize, _.defaultFontSize);
                    return Math.min(
                      t.maxTicksLimit ? t.maxTicksLimit : 11,
                      Math.ceil(this.drawingArea / (1.5 * e)),
                    );
                  },
                  convertTicksToLabels: function () {
                    t.LinearScaleBase.prototype.convertTicksToLabels.call(this),
                      (this.pointLabels = this.chart.data.labels.map(
                        this.options.pointLabels.callback,
                        this,
                      ));
                  },
                  getLabelForIndex: function (t, e) {
                    return +this.getRightValue(
                      this.chart.data.datasets[e].data[t],
                    );
                  },
                  fit: function () {
                    var t,
                      e,
                      i,
                      n,
                      a,
                      r,
                      o,
                      s,
                      l,
                      u,
                      d,
                      c,
                      h = this.options.pointLabels,
                      f = S.getValueOrDefault(h.fontSize, _.defaultFontSize),
                      g = S.getValueOrDefault(h.fontStyle, _.defaultFontStyle),
                      p = S.getValueOrDefault(
                        h.fontFamily,
                        _.defaultFontFamily,
                      ),
                      m = S.fontString(f, g, p),
                      v = S.min([this.height / 2 - f - 5, this.width / 2]),
                      y = this.width,
                      b = 0;
                    for (
                      this.ctx.font = m, e = 0;
                      e < this.getValueCount();
                      e++
                    ) {
                      (t = this.getPointPosition(e, v)),
                        (i =
                          this.ctx.measureText(
                            this.pointLabels[e] ? this.pointLabels[e] : "",
                          ).width + 5);
                      var x =
                        ((360 * (this.getIndexAngle(e) + Math.PI / 2)) /
                          (2 * Math.PI)) %
                        360;
                      0 === x || 180 === x
                        ? ((n = i / 2),
                          t.x + n > y && ((y = t.x + n), (a = e)),
                          t.x - n < b && ((b = t.x - n), (o = e)))
                        : x < 180
                          ? t.x + i > y && ((y = t.x + i), (a = e))
                          : t.x - i < b && ((b = t.x - i), (o = e));
                    }
                    (l = b),
                      (u = Math.ceil(y - this.width)),
                      (r = this.getIndexAngle(a)),
                      (s = this.getIndexAngle(o)),
                      (d = u / Math.sin(r + Math.PI / 2)),
                      (c = l / Math.sin(s + Math.PI / 2)),
                      (d = S.isNumber(d) ? d : 0),
                      (c = S.isNumber(c) ? c : 0),
                      (this.drawingArea = Math.round(v - (c + d) / 2)),
                      this.setCenterPoint(c, d);
                  },
                  setCenterPoint: function (t, e) {
                    var i = this.width - e - this.drawingArea,
                      n = t + this.drawingArea;
                    (this.xCenter = Math.round((n + i) / 2 + this.left)),
                      (this.yCenter = Math.round(this.height / 2 + this.top));
                  },
                  getIndexAngle: function (t) {
                    var e = (2 * Math.PI) / this.getValueCount(),
                      i =
                        ((this.chart.options && this.chart.options.startAngle
                          ? this.chart.options.startAngle
                          : 0) *
                          Math.PI *
                          2) /
                        360;
                    return t * e - Math.PI / 2 + i;
                  },
                  getDistanceFromCenterForValue: function (t) {
                    if (null === t) return 0;
                    var e = this.drawingArea / (this.max - this.min);
                    return this.options.reverse
                      ? (this.max - t) * e
                      : (t - this.min) * e;
                  },
                  getPointPosition: function (t, e) {
                    var i = this.getIndexAngle(t);
                    return {
                      x: Math.round(Math.cos(i) * e) + this.xCenter,
                      y: Math.round(Math.sin(i) * e) + this.yCenter,
                    };
                  },
                  getPointPositionForValue: function (t, e) {
                    return this.getPointPosition(
                      t,
                      this.getDistanceFromCenterForValue(e),
                    );
                  },
                  getBasePosition: function () {
                    var t = this.min,
                      e = this.max;
                    return this.getPointPositionForValue(
                      0,
                      this.beginAtZero
                        ? 0
                        : t < 0 && e < 0
                          ? e
                          : 0 < t && 0 < e
                            ? t
                            : 0,
                    );
                  },
                  draw: function () {
                    var l = this,
                      u = l.options,
                      d = u.gridLines,
                      c = u.ticks,
                      t = u.angleLines,
                      e = u.pointLabels,
                      h = S.getValueOrDefault;
                    if (u.display) {
                      var f = l.ctx,
                        g = h(c.fontSize, _.defaultFontSize),
                        i = h(c.fontStyle, _.defaultFontStyle),
                        n = h(c.fontFamily, _.defaultFontFamily),
                        p = S.fontString(g, i, n);
                      if (
                        (S.each(l.ticks, function (t, e) {
                          if (0 < e || u.reverse) {
                            var i = l.getDistanceFromCenterForValue(
                                l.ticksAsNumbers[e],
                              ),
                              n = l.yCenter - i;
                            if (d.display && 0 !== e)
                              if (
                                ((f.strokeStyle = S.getValueAtIndexOrDefault(
                                  d.color,
                                  e - 1,
                                )),
                                (f.lineWidth = S.getValueAtIndexOrDefault(
                                  d.lineWidth,
                                  e - 1,
                                )),
                                u.lineArc)
                              )
                                f.beginPath(),
                                  f.arc(
                                    l.xCenter,
                                    l.yCenter,
                                    i,
                                    0,
                                    2 * Math.PI,
                                  ),
                                  f.closePath(),
                                  f.stroke();
                              else {
                                f.beginPath();
                                for (var a = 0; a < l.getValueCount(); a++) {
                                  var r = l.getPointPosition(a, i);
                                  0 === a
                                    ? f.moveTo(r.x, r.y)
                                    : f.lineTo(r.x, r.y);
                                }
                                f.closePath(), f.stroke();
                              }
                            if (c.display) {
                              var o = h(c.fontColor, _.defaultFontColor);
                              if (((f.font = p), c.showLabelBackdrop)) {
                                var s = f.measureText(t).width;
                                (f.fillStyle = c.backdropColor),
                                  f.fillRect(
                                    l.xCenter - s / 2 - c.backdropPaddingX,
                                    n - g / 2 - c.backdropPaddingY,
                                    s + 2 * c.backdropPaddingX,
                                    g + 2 * c.backdropPaddingY,
                                  );
                              }
                              (f.textAlign = "center"),
                                (f.textBaseline = "middle"),
                                (f.fillStyle = o),
                                f.fillText(t, l.xCenter, n);
                            }
                          }
                        }),
                        !u.lineArc)
                      ) {
                        (f.lineWidth = t.lineWidth), (f.strokeStyle = t.color);
                        for (
                          var a = l.getDistanceFromCenterForValue(
                              u.reverse ? l.min : l.max,
                            ),
                            r = h(e.fontSize, _.defaultFontSize),
                            o = h(e.fontStyle, _.defaultFontStyle),
                            s = h(e.fontFamily, _.defaultFontFamily),
                            m = S.fontString(r, o, s),
                            v = l.getValueCount() - 1;
                          0 <= v;
                          v--
                        ) {
                          if (t.display) {
                            var y = l.getPointPosition(v, a);
                            f.beginPath(),
                              f.moveTo(l.xCenter, l.yCenter),
                              f.lineTo(y.x, y.y),
                              f.stroke(),
                              f.closePath();
                          }
                          var b = l.getPointPosition(v, a + 5),
                            x = h(e.fontColor, _.defaultFontColor);
                          (f.font = m), (f.fillStyle = x);
                          var w = l.pointLabels,
                            k =
                              ((360 * (this.getIndexAngle(v) + Math.PI / 2)) /
                                (2 * Math.PI)) %
                              360;
                          (f.textAlign =
                            0 === k || 180 === k
                              ? "center"
                              : k < 180
                                ? "left"
                                : "right"),
                            (f.textBaseline =
                              90 === k || 270 === k
                                ? "middle"
                                : 270 < k || k < 90
                                  ? "bottom"
                                  : "top"),
                            f.fillText(w[v] ? w[v] : "", b.x, b.y);
                        }
                      }
                    }
                  },
                });
              t.scaleService.registerScaleType("radialLinear", e, {
                display: !0,
                animate: !0,
                lineArc: !1,
                position: "chartArea",
                angleLines: {
                  display: !0,
                  color: "rgba(0, 0, 0, 0.1)",
                  lineWidth: 1,
                },
                ticks: {
                  showLabelBackdrop: !0,
                  backdropColor: "rgba(255,255,255,0.75)",
                  backdropPaddingY: 2,
                  backdropPaddingX: 2,
                },
                pointLabels: {
                  fontSize: 10,
                  callback: function (t) {
                    return t;
                  },
                },
              });
            };
          },
          {},
        ],
        44: [
          function (t, e, i) {
            "use strict";
            var u = t(6);
            (u = "function" == typeof u ? u : window.moment),
              (e.exports = function (b) {
                var x = b.helpers,
                  w = {
                    units: [
                      {
                        name: "millisecond",
                        steps: [1, 2, 5, 10, 20, 50, 100, 250, 500],
                      },
                      { name: "second", steps: [1, 2, 5, 10, 30] },
                      { name: "minute", steps: [1, 2, 5, 10, 30] },
                      { name: "hour", steps: [1, 2, 3, 6, 12] },
                      { name: "day", steps: [1, 2, 5] },
                      { name: "week", maxStep: 4 },
                      { name: "month", maxStep: 3 },
                      { name: "quarter", maxStep: 4 },
                      { name: "year", maxStep: !1 },
                    ],
                  },
                  t = b.Scale.extend({
                    initialize: function () {
                      if (!u)
                        throw new Error(
                          "Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com",
                        );
                      b.Scale.prototype.initialize.call(this);
                    },
                    getLabelMoment: function (t, e) {
                      return void 0 !== this.labelMoments[t]
                        ? this.labelMoments[t][e]
                        : null;
                    },
                    getMomentStartOf: function (t) {
                      return "week" === this.options.time.unit &&
                        !1 !== this.options.time.isoWeekday
                        ? t
                            .clone()
                            .startOf("isoWeek")
                            .isoWeekday(this.options.time.isoWeekday)
                        : t.clone().startOf(this.tickUnit);
                    },
                    determineDataLimits: function () {
                      var a = this;
                      a.labelMoments = [];
                      var r = [];
                      a.chart.data.labels && 0 < a.chart.data.labels.length
                        ? (x.each(
                            a.chart.data.labels,
                            function (t) {
                              var e = a.parseTime(t);
                              e.isValid() &&
                                (a.options.time.round &&
                                  e.startOf(a.options.time.round),
                                r.push(e));
                            },
                            a,
                          ),
                          (a.firstTick = u.min.call(a, r)),
                          (a.lastTick = u.max.call(a, r)))
                        : ((a.firstTick = null), (a.lastTick = null)),
                        x.each(
                          a.chart.data.datasets,
                          function (t, e) {
                            var i = [],
                              n = a.chart.isDatasetVisible(e);
                            "object" == typeof t.data[0] && null !== t.data[0]
                              ? x.each(
                                  t.data,
                                  function (t) {
                                    var e = a.parseTime(a.getRightValue(t));
                                    e.isValid() &&
                                      (a.options.time.round &&
                                        e.startOf(a.options.time.round),
                                      i.push(e),
                                      n &&
                                        ((a.firstTick =
                                          null !== a.firstTick
                                            ? u.min(a.firstTick, e)
                                            : e),
                                        (a.lastTick =
                                          null !== a.lastTick
                                            ? u.max(a.lastTick, e)
                                            : e)));
                                  },
                                  a,
                                )
                              : (i = r),
                              a.labelMoments.push(i);
                          },
                          a,
                        ),
                        a.options.time.min &&
                          (a.firstTick = a.parseTime(a.options.time.min)),
                        a.options.time.max &&
                          (a.lastTick = a.parseTime(a.options.time.max)),
                        (a.firstTick = (a.firstTick || u()).clone()),
                        (a.lastTick = (a.lastTick || u()).clone());
                    },
                    buildTicks: function () {
                      var n = this;
                      n.ctx.save();
                      var t,
                        e = x.getValueOrDefault(
                          n.options.ticks.fontSize,
                          b.defaults.global.defaultFontSize,
                        ),
                        i = x.getValueOrDefault(
                          n.options.ticks.fontStyle,
                          b.defaults.global.defaultFontStyle,
                        ),
                        a = x.getValueOrDefault(
                          n.options.ticks.fontFamily,
                          b.defaults.global.defaultFontFamily,
                        ),
                        r = x.fontString(e, i, a);
                      if (
                        ((n.ctx.font = r),
                        (n.ticks = []),
                        (n.unitScale = 1),
                        (n.scaleSizeInUnits = 0),
                        n.options.time.unit)
                      )
                        (n.tickUnit = n.options.time.unit || "day"),
                          (n.displayFormat =
                            n.options.time.displayFormats[n.tickUnit]),
                          (n.scaleSizeInUnits = n.lastTick.diff(
                            n.firstTick,
                            n.tickUnit,
                            !0,
                          )),
                          (n.unitScale = x.getValueOrDefault(
                            n.options.time.unitStepSize,
                            1,
                          ));
                      else {
                        var o = n.isHorizontal()
                            ? n.width - (n.paddingLeft + n.paddingRight)
                            : n.height - (n.paddingTop + n.paddingBottom),
                          s = n.tickFormatFunction(n.firstTick, 0, []),
                          l = n.ctx.measureText(s).width,
                          u =
                            o /
                            (l =
                              l *
                                Math.cos(
                                  x.toRadians(n.options.ticks.maxRotation),
                                ) +
                              e *
                                Math.sin(
                                  x.toRadians(n.options.ticks.maxRotation),
                                ));
                        (n.tickUnit = "millisecond"),
                          (n.scaleSizeInUnits = n.lastTick.diff(
                            n.firstTick,
                            n.tickUnit,
                            !0,
                          )),
                          (n.displayFormat =
                            n.options.time.displayFormats[n.tickUnit]);
                        for (var d = 0, c = w.units[d]; d < w.units.length; ) {
                          if (
                            ((n.unitScale = 1),
                            x.isArray(c.steps) &&
                              Math.ceil(n.scaleSizeInUnits / u) <
                                x.max(c.steps))
                          ) {
                            for (var h = 0; h < c.steps.length; ++h)
                              if (
                                c.steps[h] >= Math.ceil(n.scaleSizeInUnits / u)
                              ) {
                                n.unitScale = x.getValueOrDefault(
                                  n.options.time.unitStepSize,
                                  c.steps[h],
                                );
                                break;
                              }
                            break;
                          }
                          if (
                            !1 === c.maxStep ||
                            Math.ceil(n.scaleSizeInUnits / u) < c.maxStep
                          ) {
                            n.unitScale = x.getValueOrDefault(
                              n.options.time.unitStepSize,
                              Math.ceil(n.scaleSizeInUnits / u),
                            );
                            break;
                          }
                          (c = w.units[++d]), (n.tickUnit = c.name);
                          var f = n.firstTick.diff(
                              n.getMomentStartOf(n.firstTick),
                              n.tickUnit,
                              !0,
                            ),
                            g = n
                              .getMomentStartOf(
                                n.lastTick.clone().add(1, n.tickUnit),
                              )
                              .diff(n.lastTick, n.tickUnit, !0);
                          (n.scaleSizeInUnits =
                            n.lastTick.diff(n.firstTick, n.tickUnit, !0) +
                            f +
                            g),
                            (n.displayFormat =
                              n.options.time.displayFormats[c.name]);
                        }
                      }
                      if (
                        ((t = n.options.time.min
                          ? n.getMomentStartOf(n.firstTick)
                          : ((n.firstTick = n.getMomentStartOf(n.firstTick)),
                            n.firstTick)),
                        !n.options.time.max)
                      ) {
                        var p = n.getMomentStartOf(n.lastTick),
                          m = p.diff(n.lastTick, n.tickUnit, !0);
                        m < 0
                          ? (n.lastTick = n.getMomentStartOf(
                              n.lastTick.add(1, n.tickUnit),
                            ))
                          : 0 <= m && (n.lastTick = p),
                          (n.scaleSizeInUnits = n.lastTick.diff(
                            n.firstTick,
                            n.tickUnit,
                            !0,
                          ));
                      }
                      (n.smallestLabelSeparation = n.width),
                        x.each(
                          n.chart.data.datasets,
                          function (t, e) {
                            for (var i = 1; i < n.labelMoments[e].length; i++)
                              n.smallestLabelSeparation = Math.min(
                                n.smallestLabelSeparation,
                                n.labelMoments[e][i].diff(
                                  n.labelMoments[e][i - 1],
                                  n.tickUnit,
                                  !0,
                                ),
                              );
                          },
                          n,
                        ),
                        n.options.time.displayFormat &&
                          (n.displayFormat = n.options.time.displayFormat),
                        n.ticks.push(n.firstTick.clone());
                      for (var v = 1; v <= n.scaleSizeInUnits; ++v) {
                        var y = t.clone().add(v, n.tickUnit);
                        if (
                          n.options.time.max &&
                          0 <= y.diff(n.lastTick, n.tickUnit, !0)
                        )
                          break;
                        v % n.unitScale == 0 && n.ticks.push(y);
                      }
                      (0 ===
                        n.ticks[n.ticks.length - 1].diff(
                          n.lastTick,
                          n.tickUnit,
                        ) &&
                        0 !== n.scaleSizeInUnits) ||
                        (n.options.time.max
                          ? (n.ticks.push(n.lastTick.clone()),
                            (n.scaleSizeInUnits = n.lastTick.diff(
                              n.ticks[0],
                              n.tickUnit,
                              !0,
                            )))
                          : (n.ticks.push(n.lastTick.clone()),
                            (n.scaleSizeInUnits = n.lastTick.diff(
                              n.firstTick,
                              n.tickUnit,
                              !0,
                            )))),
                        n.ctx.restore();
                    },
                    getLabelForIndex: function (t, e) {
                      var i =
                        this.chart.data.labels &&
                        t < this.chart.data.labels.length
                          ? this.chart.data.labels[t]
                          : "";
                      return (
                        "object" ==
                          typeof this.chart.data.datasets[e].data[0] &&
                          (i = this.getRightValue(
                            this.chart.data.datasets[e].data[t],
                          )),
                        this.options.time.tooltipFormat &&
                          (i = this.parseTime(i).format(
                            this.options.time.tooltipFormat,
                          )),
                        i
                      );
                    },
                    tickFormatFunction: function (t, e, i) {
                      var n = t.format(this.displayFormat),
                        a = this.options.ticks,
                        r = x.getValueOrDefault(a.callback, a.userCallback);
                      return r ? r(n, e, i) : n;
                    },
                    convertTicksToLabels: function () {
                      (this.tickMoments = this.ticks),
                        (this.ticks = this.ticks.map(
                          this.tickFormatFunction,
                          this,
                        ));
                    },
                    getPixelForValue: function (t, e, i) {
                      var n = this;
                      (t && t.isValid) || (t = u(n.getRightValue(t)));
                      var a =
                        t && t.isValid && t.isValid()
                          ? t
                          : n.getLabelMoment(i, e);
                      if (a) {
                        var r = a.diff(n.firstTick, n.tickUnit, !0),
                          o = 0 !== r ? r / n.scaleSizeInUnits : r;
                        if (n.isHorizontal()) {
                          var s =
                            (n.width - (n.paddingLeft + n.paddingRight)) * o +
                            n.paddingLeft;
                          return n.left + Math.round(s);
                        }
                        var l =
                          (n.height - (n.paddingTop + n.paddingBottom)) * o +
                          n.paddingTop;
                        return n.top + Math.round(l);
                      }
                    },
                    getPixelForTick: function (t) {
                      return this.getPixelForValue(
                        this.tickMoments[t],
                        null,
                        null,
                      );
                    },
                    getValueForPixel: function (t) {
                      var e = this,
                        i = e.isHorizontal()
                          ? e.width - (e.paddingLeft + e.paddingRight)
                          : e.height - (e.paddingTop + e.paddingBottom),
                        n =
                          (t -
                            (e.isHorizontal()
                              ? e.left + e.paddingLeft
                              : e.top + e.paddingTop)) /
                          i;
                      return (
                        (n *= e.scaleSizeInUnits),
                        e.firstTick
                          .clone()
                          .add(u.duration(n, e.tickUnit).asSeconds(), "seconds")
                      );
                    },
                    parseTime: function (t) {
                      return "string" == typeof this.options.time.parser
                        ? u(t, this.options.time.parser)
                        : "function" == typeof this.options.time.parser
                          ? this.options.time.parser(t)
                          : "function" == typeof t.getMonth ||
                              "number" == typeof t
                            ? u(t)
                            : t.isValid && t.isValid()
                              ? t
                              : "string" != typeof this.options.time.format &&
                                  this.options.time.format.call
                                ? (console.warn(
                                    "options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale",
                                  ),
                                  this.options.time.format(t))
                                : u(t, this.options.time.format);
                    },
                  });
                b.scaleService.registerScaleType("time", t, {
                  position: "bottom",
                  time: {
                    parser: !1,
                    format: !1,
                    unit: !1,
                    round: !1,
                    displayFormat: !1,
                    isoWeekday: !1,
                    displayFormats: {
                      millisecond: "h:mm:ss.SSS a",
                      second: "h:mm:ss a",
                      minute: "h:mm:ss a",
                      hour: "MMM D, hA",
                      day: "ll",
                      week: "ll",
                      month: "MMM YYYY",
                      quarter: "[Q]Q - YYYY",
                      year: "YYYY",
                    },
                  },
                  ticks: { autoSkip: !1 },
                });
              });
          },
          { 6: 6 },
        ],
      },
      {},
      [7],
    )(7);
  });
