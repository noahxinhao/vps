var svGlobal = {version: "3.5", log: 1, isMultitask: hi5.browser.isMultitask, util: {}, logger: {debug: function (h) {
    2 < svGlobal.log && console.log(h)
}, info: function (h) {
    1 < svGlobal.log && console.log(h)
}, warn: function (h) {
    0 < svGlobal.log && console.log(h)
}}};
hi5.browser.isTouch && (svGlobal.orient = new hi5.browser.Orientation);
function cancelDefault(h) {
    h.preventDefault && h.preventDefault();
    h.stopPropagation && h.stopPropagation();
    return!1
}
hi5.appcfg = hi5.appcfg || {img: {}, toolbar: {fadable: !0}};
function LocalInterface() {
    function h() {
        var a = [];
        this.sent = !1;
        this.types = [];
        var b = this;
        this.setData = function (e, p) {
            if ("text/plain" == e || "text/html" == e)2 < p.length && "`\t`" == p.substring(0, 3) && (p = p.substring(3)), p = p.replace(/\r?\n/g, "\r\n");
            b.types.push(e);
            a.push(p)
        };
        this.getData = function (e) {
            return a[b.types.indexOf(e)]
        };
        this.equals = function (a) {
            if (!a || !hi5.Arrays.equals(b.types, a.types))return!1;
            for (var p, r, z = b.types, d = 0, q = z.length; d < q; d++)if (p = z[d], r = b.getData(p), p = a.getData(p), "string" == typeof p) {
                if (r !=
                    p)return!1
            } else if (!hi5.Arrays.equals(r, p))return!1;
            return!0
        }
    }

    function w(a) {
        function b() {
            var b = f ? "\t" : "";
            q.oldValue = b;
            a.value = b;
            f && "INPUT" == a.nodeName && a.setSelectionRange && a.setSelectionRange(a.value.length, a.value.length)
        }

        function e(a) {
            a.stopPropagation();
            h = 8 == a.keyCode;
            if (q.onkeydown)q.onkeydown(a);
            return!0
        }

        function p(a) {
            a.stopPropagation();
            if (q.onkeyup)q.onkeyup(a);
            a = a.keyCode;
            !g || 13 != a && 32 != a || b();
            return!0
        }

        function d(a) {
            if (q.onbackspace)for (var b = 0; b < a; b++)q.onbackspace()
        }

        function z(e) {
            e.stopPropagation();
            e = a.value;
            var p = e.length;
            1 < p && "\t" != e.charAt(0) && "\t" == e.charAt(p - 1) && (e = a.value = "\t" + e.substring(0, p - 1));
            if (e != q.oldValue) {
                var z = q.oldValue.length, c = e.indexOf(q.oldValue);
                if (e && 0 == c) {
                    if (e = e.substring(z), 0 < e.length && g && q.ontextinput)q.ontextinput({data: e, target: a})
                } else if (c = q.oldValue.indexOf(e), 0 == c)h || d(z - p); else if (g && (d(z), 0 < e.length && q.ontextinput))q.ontextinput({data: e, target: a});
                "" == a.value && b();
                q.oldValue = a.value
            }
        }

        function c(a) {
            a.stopPropagation();
            if (q.ontextinput)q.ontextinput(a);
            b();
            k &&
            a.preventDefault()
        }

        var q = this, f = hi5.browser.isAndroid && hi5.browser.isChrome, g = hi5.browser.isFirefox || hi5.browser.isOpera, h = !1, k = !hi5.browser.isRIM;
        this.init = b;
        b();
        a.addEventListener("keydown", e, !1);
        a.addEventListener("keyup", p, !1);
        f && (a.addEventListener("input", z, !1), a.onclick = b);
        g ? (a.addEventListener("input", z, !1), a.addEventListener("focus", b, !1)) : (a.addEventListener("textInput", c, !1), a.addEventListener("textinput", c, !1));
        this.release = function () {
            a.removeEventListener("keydown", e, !1);
            a.removeEventListener("keyup",
                p, !1);
            a.removeEventListener("input", z, !1);
            a.removeEventListener("focus", b, !1)
        }
    }

    function l(a) {
        function b(a) {
            if (!z && c.onmousedown)c.onmousedown(a)
        }

        function e(a) {
            if (!z && c.onmousemove)c.onmousemove(a)
        }

        function p(a) {
            if (z)z = !1; else if (c.onmouseup)c.onmouseup(a)
        }

        function d(a) {
            "touchstart" == a.type && (z = !0);
            if (c.ontouch)c.ontouch(a)
        }

        var z = !1, c = this;
        navigator.pointerEnabled ? (a.addEventListener("pointerdown", d, !1), a.addEventListener("pointerup", d, !1), a.addEventListener("pointermove", d, !1), a.addEventListener("pointercancel",
            d, !1)) : navigator.msPointerEnabled ? (a.addEventListener("MSPointerDown", d, !1), a.addEventListener("MSPointerUp", d, !1), a.addEventListener("MSPointerMove", d, !1), a.addEventListener("MSPointerCancel", d, !1)) : (a.addEventListener("touchstart", d, !1), a.addEventListener("touchend", d, !1), a.addEventListener("touchmove", d, !1), a.addEventListener("touchcancel", d, !1), a.addEventListener("mousemove", e, !1), a.addEventListener("mousedown", b, !1), a.addEventListener("mouseup", p, !1))
    }

    function x() {
        return g.railWin ? !0 : !na && I <=
            window.innerWidth && H <= window.innerHeight
    }

    function t(a) {
        function b(a, b) {
            for (var e, d = a.length, c = Array(d), f = 0; f < d; f++) {
                e = a[f];
                var g = c, r = f, h;
                h = e.identifier;
                if (!(256 > h)) {
                    var m = p.indexOf(h);
                    -1 != m ? h = m : (p.push(h), h = p.length - 1)
                }
                g[r] = {contactId: h, contactFlags: b, x: e.pageX - k.offsetLeft, y: e.pageY - k.offsetTop}
            }
            return c
        }

        var e, p = [], d = !1;
        this.handle = function (c) {
            var f = c.type, q = c.touches, g = c.changedTouches;
            cancelDefault(c);
            switch (f) {
                case "touchstart":
                    d = !1;
                    e = c = b(q, 25);
                    break;
                case "touchmove":
                    c = b(g, 26);
                    f = !1;
                    if (0 < e.length &&
                        1 == c.length) {
                        a:{
                            q = e.length;
                            for (g = 0; g < q; g++)if (e[g].contactId == c[0].contactId) {
                                q = g;
                                break a
                            }
                            q = -1
                        }
                        -1 != q && e[q].x == c[0].x && e[q].y == c[0].y && (f = !0)
                    }
                    if (f)break; else 0 < e.length && (a.redirectTouches(e), e.length = 0);
                    a.redirectTouches(c);
                    d = !0;
                    break;
                case "touchend":
                    if (d)c = b(g, 4); else {
                        a.redirectTouches(e);
                        c = e.length;
                        for (f = 0; f < c; f++)e[f].contactFlags = 4;
                        c = e
                    }
                    a.redirectTouches(c);
                    p.length = e.length = 0;
                    break;
                case "touchcancel":
                    a.redirectTouches(b(g, 34)), p.length = e.length = 0
            }
        }
    }

    function A(a) {
        function b(a) {
            var b = a[1].screenX -
                a[0].screenX;
            a = a[1].screenY - a[0].screenY;
            return Math.sqrt(b * b + a * a)
        }

        function e(a, e) {
            var c = [], d = p(a, t[0].identifier) || p(e, t[0].identifier);
            d && c.push(d);
            (d = p(a, t[1].identifier) || p(e, t[1].identifier)) && c.push(d);
            d = "";
            if (2 != c.length)return d;
            var f = b(c) - b(t);
            60 > Math.abs(f) ? 80 < c[0].screenX - t[0].screenX ? d = "RIGHT" : 80 < t[0].screenX - c[0].screenX ? d = "LEFT" : 80 < c[0].screenY - t[0].screenY ? d = "DOWN" : 80 < t[0].screenY - c[0].screenY && (d = "UP") : d = 0 > f ? "CLOSE" : "OPEN";
            return d
        }

        function p(a, b) {
            for (var e = 0, p = a.length; e < p; e++)if (a[e].identifier ==
                b)return a[e];
            return null
        }

        function c(a) {
            this.identifier = a.pointerId;
            this.pageX = a.pageX;
            this.pageY = a.pageY;
            this.screenX = a.screenX;
            this.screenY = a.screenY
        }

        var d = 0, f = 0, g = 0, h = 0, k = !1, m = 0, n = 0, l = 0, A = 0, E = !1, u = !1, y = 3, w = !1;
        hi5.browser.isIE && (y *= 3);
        this.delay = !1;
        var t = [], s = this;
        this.handlePointer = function (a) {
            if (a.pointerType == a.MSPOINTER_TYPE_MOUSE || "mouse" == a.pointerType)switch (a.type) {
                case "MSPointerDown":
                case "pointerdown":
                    oa(a);
                    break;
                case "pointermove":
                case "MSPointerMove":
                    pa(a);
                    break;
                case "pointerup":
                case "MSPointerUp":
                    qa(a)
            } else a.touches =
                a.changedTouches = [new c(a)], s.handle(a)
        };
        this.handle = function (b) {
            var c = b.type, r = 0, r = b.touches, s = b.changedTouches, B, C;
            switch (c) {
                case "touchstart":
                case "MSPointerDown":
                case "pointerdown":
                    moveSpace = moveCount = 0;
                    w = !1;
                    f = "touchstart" == c ? r.length : f + 1;
                    u = !1;
                    h = (new Date).getTime();
                    k = 1 == f && 200 > h - g;
                    c = r[0];
                    d = c.identifier;
                    m = c.pageX;
                    n = c.pageY;
                    E = !0;
                    w = 2 != r.length ? !1 : 100 < Math.abs(r[1].screenY - r[0].screenY);
                    (k || 2 < f) && cancelDefault(b);
                    if (3 == f) {
                        for (var c = C = B = 0, s = 9999, v = 0, D = r.length; v < D; v++)r[v].screenY > c && (c = r[v].screenY,
                            B = v), r[v].screenY < s && (s = r[v].screenY, C = v);
                        t = [
                            {screenX: r[C].screenX, screenY: r[C].screenY, identifier: r[C].identifier},
                            {screenX: r[B].screenX, screenY: r[B].screenY, identifier: r[B].identifier}
                        ]
                    }
                    break;
                case "pointermove":
                case "MSPointerMove":
                    if (1 < f)break;
                case "touchmove":
                    if (w)return;
                    1 == f && x() && (window.scrollTo(0, 0), cancelDefault(b));
                    c = s[r.length - 1];
                    if (c.identifier != d && (c = p(s, d), !c)) {
                        cancelDefault(b);
                        return
                    }
                    B = c.pageX;
                    C = c.pageY;
                    if (E) {
                        if (0 == B - m && 0 == C - n)return;
                        if (Math.abs(B - m) < y && Math.abs(C - n) < y) {
                            cancelDefault(b);
                            return
                        }
                        E = !1;
                        r = (new Date).getTime() - h;
                        if ((u = 180 > r) && !x() && 1 == f) {
                            w = !0;
                            return
                        }
                        a.touchstart({x: m, y: n, flick: u, pointes: f, screenX: c.screenX, screenY: c.screenY, moved: !0, target: b.target})
                    }
                    cancelDefault(b);
                    a.touchmove({x: B, y: C, flick: u, pointes: f, moved: !0, screenX: c.screenX, screenY: c.screenY, target: b.target});
                    break;
                case "MSPointerUp":
                case "touchend":
                case "pointerup":
                    if (w)return;
                    if (3 == s.length + r.length) {
                        a.touchend({x: B, y: C, flick: u, pointes: f, moved: !E, target: b.target, gesture: e(r, s)});
                        f = 0;
                        break
                    } else {
                        if (2 < f) {
                            f = 0;
                            break
                        }
                        if (c =
                            p(s, d))s = (new Date).getTime(), B = c.pageX, C = c.pageY, u ? a.touchend({x: B, y: C, flick: !0, pointes: f, moved: !E, screenX: c.screenX, screenY: c.screenY, target: b.target}) : (r = s - h, E ? (g = s, k ? cancelDefault(b) : (l = B, A = C), 500 > r ? (g = s, a.touchstart({x: l, y: A, flick: !1, pointes: f, screenX: c.screenX, screenY: c.screenY, moved: !1, target: b.target}), a.touchend({x: l, y: A, flick: !1, pointes: f, moved: !1, screenX: c.screenX, screenY: c.screenY, target: b.target})) : a.longpress({x: B, y: C, flick: !1, pointes: f, moved: !1, screenX: c.screenX, screenY: c.screenY, target: b.target})) :
                            a.touchend({x: B, y: C, flick: !1, pointes: f, moved: !0, screenX: c.screenX, screenY: c.screenY, target: b.target}))
                    }
                    f = 0;
                    break;
                case "MSPointerCancel":
                case "touchcancel":
                    f = 0
            }
            k && cancelDefault(b)
        }
    }

    function m() {
        f(!0, 14);
        f(!1, 14)
    }

    function y() {
        if (!c && !hi5.$("wsinput")) {
            c = document.createElement("textarea");
            c.accessKey = "f";
            c.id = "wsinput";
            c.style.resize = "none";
            c.style.opacity = 0;
            c.style.position = "absolute";
            c.style.margin = "0";
            c.style.border = "0";
            var a = hi5.tool.getPos(k);
            c.style.left = a.x + "px";
            c.style.top = a.y + "px";
            c.style.paddingRight =
                0;
            c.style.paddingBottom = 0;
            c.style.width = "10px";
            c.style.height = "10px";
            c.style.zIndex = 88;
            c.style.cursor = "default";
            c.style.fontSize = "1px";
            c.style.fontWeight = "bold";
            c.style.overflow = "hidden";
            c.col = c.row = 1;
            D = new w(c);
            D.onbackspace = m;
            k.parentNode.appendChild(c)
        }
    }

    function E(a) {
        c && (a ? c.svIMEMode || (c.style.background = "transparent", c.style.opacity = 1, c.style.fontSize = "2em", c.svIMEMode = !0) : c.svIMEMode && (c.style.background = "", c.style.opacity = 0, c.style.fontSize = "1px", c.svIMEMode = !1))
    }

    function ra() {
        d || (d = document.getElementById("svImgCursor"),
            d || (d = document.createElement("canvas"), d.id = "svImgCursor", d.style.position = "absolute", d.style.left = 90, d.style.top = 90, d.scrX = 0, d.scrY = 0, d.hotX = 10, d.hotY = 10, d.width = d.height = 32, document.body.appendChild(d), navigator.pointerEnabled ? (d.addEventListener("pointerdown", F, !1), d.addEventListener("pointerup", F, !1), d.addEventListener("pointermove", F, !1), d.addEventListener("pointercancel", F, !1)) : navigator.msPointerEnabled ? (d.addEventListener("MSPointerDown", F, !1), d.addEventListener("MSPointerUp", F, !1), d.addEventListener("MSPointerMove",
                F, !1), d.addEventListener("MSPointerCancel", F, !1)) : (d.addEventListener("touchstart", F, !1), d.addEventListener("touchend", F, !1), d.addEventListener("touchmove", F, !1), d.addEventListener("touchcancel", F, !1)), d.setCursor = function (a) {
                var b = a.width, e = a.height;
                a = a.rawData;
                var c = b * e, f = 0, g = 0;
                d.width = b;
                d.height = e;
                for (var h = d.getContext("2d"), b = h.createImageData(b, e), e = b.data, q = 0; q < c; q++)f = a[q], e[g++] = f & 255, e[g++] = f >> 8 & 255, e[g++] = f >> 16 & 255, e[g++] = f >> 24 & 255;
                h.putImageData(b, 0, 0)
            }, sa ? d.setCursor(sa) : d.setCursor({rawData: [0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -16777216, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -16777216, -16777216, -16777216, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -16777216, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0,
                0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], width: 32, height: 32})))
    }

    function Ga(a) {
        var b = document.body;
        a ? (ta = a, b.style.overflow = a) : (ta = I <= window.innerWidth && H <= window.innerHeight ? "hidden" : "visible", b.style.overflow = ta)
    }

    function da(a) {
        var b = document.body, e = window.innerWidth, c = window.innerHeight;
        Math.max(I, H) < Math.max(e, c) && Math.min(I, H) < Math.min(e, c) ? 1 != s && (hi5.tool.scale(b, 1), s = 1) : (b.style.overflow = "hidden", s = a ? Math.min(window.innerWidth / I, window.innerHeight / H) : 1, hi5.tool.scale(b, s))
    }

    function Ha() {
        if (c) {
            var a =
                hi5.tool.getPos(k), b = g.railWin ? Math.min(window.innerWidth - a.x, I) : I, e = g.railWin ? Math.min(window.innerHeight - a.y, H) : H, d = 0.7 * window.innerWidth - a.x, f = 0.8 * window.innerHeight - a.y;
            c.style.width = b - d + "px";
            c.style.height = e - f + "px";
            c.style.paddingLeft = d + "px";
            c.style.paddingTop = f + "px";
            c.style.left = a.x + "px";
            c.style.top = a.y + "px";
            window.scrollTo(0, 0)
        }
    }

    function Ia() {
        var a = chrome.app.window.current();
        a && a.fullscreen()
    }

    function ua() {
        var a = hi5.$("_iFramePDF");
        a && a.parentNode.removeChild(a)
    }

    function Ja() {
        var a = document.createElement("textarea");
        a.style.position = "absolute";
        a.style.zIndex = 89;
        a.style.left = 0;
        a.style.top = 0;
        a.tabIndex = 1;
        a.style.outline = "none";
        a.style.opacity = 0;
        k.parentNode.appendChild(a);
        return a
    }

    function Ka(a) {
        ua();
        g.focused = !0;
        n.onfocus(a);
        ea = !0;
        fa.sendMissKey();
        u && window.clipboardData && n.send("880text/plain")
    }

    function La(a) {
        if (!Ma && g.railWin && g.railWin.isRunning()) {
            var b = __svi18n.remoteApp.close;
            a || (a = window.event);
            a && (a.returnValue = b);
            if (2 != n.getAppMode())return hi5.notifications.notify({msg: b}), b
        }
    }

    function Na(a) {
        g.focused = !1;
        if (g.onunload)g.onunload()
    }

    function Oa() {
        document.oncontextmenu = function () {
            return!1
        };
        document.onselectstart = function () {
            return!1
        }
    }

    function $a(a) {
        U ? da(!0) : (n.onresize(a), g.railWin && Ha())
    }

    function ab() {
        window.addEventListener("resize", $a, !1);
        if (!R) {
            var a = !hi5.browser.isChromeApp;
            a && window.addEventListener("beforeunload", La, !1);
            a ? window.addEventListener("unload", Na, !1) : chrome.runtime.onSuspend.addListener(Na);
            Oa();
            window.addEventListener("focus", Ka, !1);
            window.addEventListener("blur", function (a) {
                g.focused = !1
            }, !1);
            hi5.browser.isChromeApp && chrome.app.window.current().onMaximized.addListener(Ia)
        }
    }

    function bb() {
        function a() {
            na = !0;
            var a = document.getElementById("pc_key");
            a && (a.style.display = "block", a.style.top = window.pageYOffset + "px")
        }

        function b() {
            na = !1;
            var a = document.getElementById("pc_key");
            a && (a.style.display = "none")
        }

        function e() {
            d && (d.style.color = L ? "red" : "white");
            h && (h.style.color = M ? "red" : "white")
        }

        function c(a) {
            cancelDefault(a);
            if ("touchstart" == a.type) {
                a = a.target;
                var b = a.innerHTML, b = b.replace(/\u2190/g,
                    "left").replace(/\u2191/g, "up").replace(/\u2192/g, "right").replace(/\u2193/g, "down");
                switch (b) {
                    case "Ctrl":
                        d || (d = a);
                        L ? f(!1, 29) : f(!0, 29);
                        L = !L;
                        e();
                        break;
                    case "Alt":
                        h || (h = a);
                        M ? f(!1, 56) : f(!0, 56);
                        M = !M;
                        e();
                        break;
                    case "...":
                        if (a = document.getElementById("pc_key_more"))a.style.display = "block" == a.style.display ? "none" : "block";
                        break;
                    case "Start":
                        b = "Ctrl+Esc";
                    default:
                        g.writeKeyComb(b), k.resetModifier()
                }
            }
        }

        var d = null, h = null, k = this;
        this.resetModifier = function () {
            M && (M = !1, f(!1, 56));
            L && (L = !1, f(!1, 29));
            e()
        };
        J && (J.addEventListener("focus",
            a, !1), J.addEventListener("blur", b, !1));
        var q = document.getElementById("pc_key");
        if (q) {
            for (var m = q.getElementsByTagName("span"), n = m.length, l = 0; l < n; l++) {
                var ca = m[l];
                ca.className = "button";
                ca.style.color = "white";
                ca.addEventListener("touchstart", c, !1);
                ca.addEventListener("touchup", c, !1)
            }
            q.style.position = "absolute"
        }
    }

    function Pa() {
        if (!J) {
            var a = hi5.$("touchGesture");
            a && (a.style.display = "block");
            J = document.getElementById("svTouchInput");
            hi5.browser.isChrome && (J.style.fontSize = "2em");
            a = new w(J);
            a.onkeydown =
                a.onkeyup = cb;
            a.ontextinput = ga;
            a.onbackspace = m;
            a = new w(document.body);
            a.onbackspace = m;
            a.onkeydown = a.onkeyup = va;
            a.ontextinput = ga;
            a.onbackspace = m;
            ha.push(a.release);
            V = new bb
        }
    }

    function W(a, b) {
        function e(a, e) {
            var c = document.createElement("span");
            c.data_path = a;
            c.className = "path";
            c.innerHTML = e;
            c.onclick = function () {
                W(this.data_path, b)
            };
            return c
        }

        function c(a) {
            for (var b = d; b.hasChildNodes();)b.removeChild(b.firstChild);
            var f = e("/", "&nbsp&nbsp&nbsp/");
            b.appendChild(f);
            if ("/" != a && "" != a) {
                a = a.split("/");
                for (var p =
                    "/", g = 0, h = a.length; g < h; g++)f = a[g], "" != f && (p = p + a[g] + "/", f = e(p, f + "/"), b.appendChild(f))
            }
        }

        var d = document.getElementById("parentPath");
        d.currentDir || (d.currentDir = "/");
        "." == a ? a = d.currentDir : d.currentDir = a;
        d.currentDir = a;
        n.getShareFiles(a, function (a) {
            function e(b) {
                b || (b = f.getValue("Name"));
                var c = a.parent;
                if ("" == c || "/" != c.charAt(c.length - 1))c += "/";
                return c + b
            }

            a.error && g.showMessage(__svi18n.file[a.error]);
            var d = new hi5.DataTable(a), f = new hi5.DataGrid(document.getElementById("filelist"));
            f.dataTable = d;
            var h =
                hi5.tool.bytesToSize;
            f.beforeDisplayValue = function (a, b) {
                var e = d.cols[a].name;
                return"Date Modified" == e ? (new Date(b)).toLocaleString() : "Size" == e ? h(b) : "Type" == e && "folder" == b ? __svi18n.file.folder : b
            };
            f.onrowclick = function (c) {
                var d = f.getValue("Name");
                "folder" == f.getValue("Type") ? W(("/" == a.parent ? "" : a.parent) + "/" + d, b) : (d = e(d), c = c.target.name, "delete" == c ? (n.removeFile(d), W(a.parent, b)) : ("view" == c && (d += "&action=view"), n.getFile(d)))
            };
            f.beforeAppendRow = function (a) {
                if ("folder" == d.getValue(d.getColNo("Type")))a.getElementsByTagName("img")[0].style.visibility =
                    "hidden"; else {
                    a.draggable = !0;
                    var b = f.getValue("Name"), c = e(b), c = "application/octet-stream:" + b + ":" + n.getFileLink(c);
                    a.addEventListener("dragstart", function (a) {
                        a.dataTransfer.setData("DownloadURL", c)
                    }, !1)
                }
            };
            f.open();
            c(a.parent);
            b.resize()
        })
    }

    function db(a) {
        cancelDefault(a);
        a = document.getElementById("filecontainer");
        N = new hi5.Lightbox(a);
        W(".", N);
        N.show()
    }

    function wa() {
        var a = hi5.$("appinfo");
        if (g.showToolbar && hi5.$("svToolbar") && (G || K || a)) {
            var b = null == g.toolbar;
            b && (g.toolbar = new hi5.Toolbar(hi5.$("svToolbar")));
            var e = hi5.appcfg;
            if (G)g.toolbar.activeObj = J; else {
                var d = document.getElementById("svTouchInput");
                d && d.parentNode.removeChild(d)
            }
            if (d = g.toolbar.getButton("svCloud"))K ? (d.style.display = "", d.onclick = db) : d.style.display = "none";
            new hi5.Fadable(g.toolbar, 3E3, G ? k : c);
            e = e.toolbar.fadable;
            g.toolbar.setFadable(e);
            e && (g.toolbar.style.display = "none");
            g.toolbar.style.position = "absolute";
            g.toolbar.style.marginLeft = 0;
            e = function (a) {
                cancelDefault(a);
                a = n.getAppInfo();
                var b = hi5.$("numericId");
                b && (b.innerHTML = a.numericId);
                if (b = hi5.$("connectingTo"))b.innerHTML = a.server;
                if (b = hi5.$("joinLink"))b.href = b.innerHTML = a.joinLink;
                a = new hi5.Lightbox(hi5.$("appinfo"));
                a.show();
                document.oncontextmenu = null;
                document.onselectstart = null;
                a.onclose = Oa
            };
            if (d = g.toolbar.getButton("svInfo"))a ? (d.style.display = "", b && (d.onclick = e)) : d.style.display = "none";
            if (g.onloadtoolbar)g.onloadtoolbar(g.toolbar)
        }
    }

    function Qa(a) {
        K(a.target.files);
        a = document.getElementById("uploadfile");
        var b = a.cloneNode(!0);
        a.parentNode.replaceChild(b, a);
        b.addEventListener("change",
            Qa, !1)
    }

    function xa(a, b, e) {
        d && (a = d.scrX + a, b = d.scrY + b, 0 > a ? a = 0 : a > I && (a = I - 1), 0 > b ? b = 0 : b > H && (b = H - 1), d.scrX = a, d.scrY = b, d.style.left = (k.offsetLeft + a - d.hotX) / s + "px", d.style.top = (k.offsetTop + b - d.hotY) / s + "px", u && !e && n.sendInput("82" + a + "\t" + b))
    }

    function X(a, b, e) {
        d || ra();
        xa(a - d.scrX, b - d.scrY, e)
    }

    function ya(a, b, e, c) {
        var f;
        switch (a) {
            case "touchstart":
                za = !1;
                touchStartX = b;
                touchStartY = e;
                0 == d.scrX && 0 == d.scrY && X(b - 50, e - 50);
                c && n.sendInput("80" + d.scrX + "\t" + d.scrY + "\t0");
                break;
            case "touchmove":
                c = b - ia;
                a = e - T;
                if (0 == c && 0 ==
                    a)return;
                f = 5 > Math.abs(Ra) && 5 > Math.abs(Sa) && (7 < Math.abs(c) || 7 < Math.abs(a));
                f || (xa(c, a), za = !0);
                Ra = c;
                Sa = a;
                break;
            case "touchend":
                (a = !za && !c) && n.sendInput("80" + d.scrX + "\t" + d.scrY + "\t0"), (a || c) && n.sendInput("81" + d.scrX + "\t" + d.scrY + "\t0")
        }
        ia = b;
        T = e
    }

    function F(a) {
        u && (navigator.msMaxTouchPoints ? Y.handlePointer(a) : Y.handle(a))
    }

    function ja(a) {
        if (hi5.browser.isFirefox) {
            switch (a) {
                case 173:
                    return 189;
                case 61:
                    return 187;
                case 59:
                    return 186;
                case 224:
                    return 17
            }
            return a
        }
        if (hi5.browser.isOpera) {
            switch (a) {
                case 59:
                    return 186;
                case 61:
                    return 187;
                case 109:
                    return 189;
                case 219:
                    return 91;
                case 57351:
                    return 93
            }
            return a
        }
        if (Aa)switch (a) {
            case 91:
            case 93:
                return 17;
            case 17:
                return 91
        }
        return a
    }

    function Ta(a) {
        if (!u)return!1;
        fa.check(a);
        var b = a.keyCode, e = "keydown" == a.type;
        e && E(229 <= b);
        if (Ua(a, b, e))return cancelDefault(a);
        b = ja(b);
        17 != b || e || (Z = !1);
        var d = Ba(b);
        if (0 < d)return f(e, d), e && 17 == b && (hi5.browser.isFirefox || hi5.browser.isSafari) && (c.value = "`\t`", c.select()), cancelDefault(a);
        if (a.ctrlKey || a.altKey || a.metaKey)return a.ctrlKey && a.altKey ||
            86 == b && (a.ctrlKey || a.metaKey) || v(e, b), e && (ka = b), hi5.browser.isFirefox && e && a.altKey && (v(!1, b), f(!1, 56)), 17 == b || (a.ctrlKey || a.metaKey) && (86 == b || 67 == b || 88 == b) ? (!e || 67 != b && 88 != b || (Z = !0), !0) : a.altKey && !a.ctrlKey ? cancelDefault(a) : !0;
        if (b == ka && !(e || a.ctrlKey && a.altKey))return v(!1, b), ka = 0, !0;
        ka = 0;
        return!0
    }

    function Ua(a, b, e) {
        if (!a.altKey)return!1;
        switch (b) {
            case 8:
            case 35:
                if (!a.ctrlKey && !a.metaKey)return!1;
                f(e, 211);
                break;
            case 33:
                f(e, 15);
                break;
            case 34:
                e ? (f(!0, 42), f(!0, 15)) : (f(!1, 15), f(!1, 42));
                break;
            case 45:
                f(e,
                    1);
                break;
            case 36:
                e ? (f(!1, 56), f(!0, 29), f(!0, 1)) : (f(!1, 1), f(!1, 29));
                break;
            default:
                return!1
        }
        return!0
    }

    function va(a) {
        if (!u)return!1;
        fa.check(a);
        var b = a.keyCode, e = "keydown" == a.type;
        e ? E(229 <= b) : c && c.svIMEMode && hi5.browser.isIE && E(!1);
        if (Ua(a, b, e))return cancelDefault(a);
        if (229 <= b || 1 > b)return!0;
        b = ja(b);
        if (Va(b, e))return cancelDefault(a);
        var d = Ba(b);
        0 < d ? f(e, d) : (86 != b || !a.ctrlKey && !a.metaKey || G && hi5.browser.isIE) && v(e, b);
        hi5.browser.isFirefox && e && a.altKey && 31 < b && (v(!1, b), f(!1, 56));
        return 17 == b || (a.ctrlKey ||
            a.metaKey) && (86 == b || 67 == b || 88 == b) ? (e && (17 == b && (hi5.browser.isFirefox || hi5.browser.isSafari) && (c.value = "`\t`", c.select()), 67 == b || 88 == b) && (Z = !0), 17 != b || e || (Z = !1), !0) : 144 == b ? !1 : cancelDefault(a)
    }

    function cb(a) {
        if (!u)return!1;
        var b = ja(a.keyCode), e = "keydown" == a.type;
        if (!Va(b, e)) {
            b = Ba(b);
            0 < b && f(e, b);
            switch (b) {
                case 29:
                    L = e;
                    break;
                case 56:
                    M = e
            }
            if (-1 == b)if (L || M)v(e, a.keyCode), V && V.resetModifier(); else return!0
        }
        return hi5.browser.isFirefox ? !0 : cancelDefault(a)
    }

    function ga(a) {
        u && (n.sendInput("86" + a.data + "\t" + (L ||
            M || Ca ? 1 : 0)), V && V.resetModifier())
    }

    function Da() {
        f(!0, 29);
        v(!0, 86);
        v(!1, 86);
        f(!1, 29)
    }

    function eb(a) {
        if (0 == a.types.length)console.log("No valid clip data"); else if (a.equals(O.clipData))Da(); else {
            n.send("880" + a.types.join(","));
            O.clipData = a;
            if (g.onclipdata)g.onclipdata(O.clipData);
            setTimeout(Da, 50)
        }
    }

    function Wa(a) {
        if (!u || !Ea)return cancelDefault(a);
        if (!ea)return setTimeout(Da, 50), cancelDefault(a);
        ea = !1;
        O.paste(eb, a, null);
        return!0
    }

    function la(a) {
        u && Ea || cancelDefault(a);
        if (!Z) {
            f(!0, 29);
            var b = "copy" == a.type ?
                "67" : 88;
            v(!0, b);
            v(!1, b);
            f(!1, 29)
        }
        if (Xa) {
            var b = (new Date).getTime(), e = b - Ya;
            Ya = b;
            if (500 < e)return
        }
        if (!hi5.browser.isChromeApp) {
            b = n.getClipData();
            if (c)a.target.value = b, a.target.select(), setTimeout(function () {
                c.value = ""
            }, 555); else if (window.clipboardData)window.clipboardData.setData("Text", b); else {
                var d = Ja();
                d.value = b;
                d.select();
                setTimeout(function () {
                    d.parentNode.removeChild(d)
                }, 999)
            }
            O.clipData = null;
            ea = !1
        }
    }

    function Va(a, b) {
        return 44 == a ? (f(!0, 170), f(!0, 183), !0) : 19 == a ? (b ? (f(!0, 225), f(!0, 29), f(!0, 69), f(!0,
            225), f(!0, 157), f(!0, 197)) : f(!1, 29), !0) : !1
    }

    function f(a, b) {
        if (u)switch (58 == b && Aa && !a && n.sendInput("840\t58"), hi5.browser.isCrOS && !a && 61 < b && 69 > b && n.sendInput("840\t" + b), n.sendInput("84" + (a ? 0 : 49152) + "\t" + b), b) {
            case 221:
                a && n.sendInput("8449152\t221");
                break;
            case 58:
                Aa && a && n.sendInput("8449152\t58")
        }
    }

    function v(a, b) {
        u && n.sendInput("8B" + (a ? 0 : 49152) + "\t" + b)
    }

    function $(a, b, e, c) {
        c || (c = s);
        n.sendInput("80" + a / c + "\t" + b / c + "\t" + e)
    }

    function oa(a) {
        var b = a.target;
        b.focus();
        if (!u)return!1;
        E(!1);
        a.ctrlKey || a.shiftKey ||
            a.metaKey || a.altKey || fa.sendMissKey();
        $(a.pageX - b.offsetLeft, a.pageY - b.offsetTop, a.button);
        return cancelDefault(a)
    }

    function pa(a) {
        if (!u)return!1;
        var b = a.target;
        d && "-30px" != d.style.left && (d.style.left = "-30px");
        var e = a.pageX - b.offsetLeft, b = a.pageY - b.offsetTop, c = void 0, c = s;
        n.sendInput("82" + e / c + "\t" + b / c);
        return cancelDefault(a)
    }

    function aa(a, b, e, c) {
        c || (c = s);
        n.sendInput("81" + a / c + "\t" + b / c + "\t" + e)
    }

    function qa(a) {
        if (!u)return!1;
        var b = a.target;
        aa(a.pageX - b.offsetLeft, a.pageY - b.offsetTop, a.button);
        return cancelDefault(a)
    }

    function ma(a) {
        if (!u)return!1;
        var b = a.target, e = a.pageX - b.offsetLeft, b = a.pageY - b.offsetTop, c = "1";
        a.wheelDelta ? 0 < a.wheelDelta && (c = "0") : a.detail && 0 > a.detail && (c = "0");
        a = void 0;
        a = s;
        n.sendInput("83" + e / a + "\t" + b / a + "\t" + c);
        return!1
    }

    function Ba(a) {
        (a = fb[a]) || (a = -1);
        return a
    }

    function Za(a) {
        return a.url ? "url(" + a.url + "), pointer" : "url(" + a.data + ") " + a.hotX + " " + a.hotY + ", default"
    }

    var k = document.getElementById("remotectrl");
    if (window.svSurface && svSurface.canvas == k && svSurface.railWin)return svSurface.railWin.hasMain = !1, window.svSurface;
    var G = hi5.browser.isTouch, n = null, U = !1, s = 1;
    k.style.outline = "none";
    var I = 0, H = 0, S = k.getContext("2d"), D = null, c = null, Xa = !1, L = !1, M = !1, Ma = !1, ea = !0, K = null, Ea = !0, Z = !1;
    this.context = S;
    this.fileProgress = null;
    var g = this, u = !0, P = !1, R = !1, Ca = !1, ba = null, N = null, d = null, sa = null, Y = null, J = null, na = !1, ia = -1, T = -1, Ra = 0, Sa = 0, za = !1, ta = null;
    this._cr = [82, 69, 77, 79, 84, 69, 83, 80, 65, 82, 75];
    window.svSurface = this;
    this.railWin = this.toolbar = null;
    this.focused = !1;
    this.showToolbar = !0;
    this.canvas = k;
    var ha = [];
    this.getWindow =
        function () {
            return window
        };
    var Q = null, V = null;
    this.getThumbnail = function (a) {
        a = a || 64;
        Q || (Q = document.createElement("canvas"));
        var b = Math.floor(k.height / k.width * a);
        Q.width != a && (Q.width = a);
        Q.height != b && (Q.height = b);
        Q.getContext("2d").drawImage(k, 0, 0, k.width, k.height, 0, 0, a, b);
        return Q.toDataURL()
    };
    this.equals = function (a) {
        return k == a.canvas
    };
    this.getFreeSpace = function () {
        var a = hi5.tool.getPos(k);
        return{width: window.innerWidth - a.x, height: window.innerHeight - a.y}
    };
    var O = new function () {
            this.clipData = null;
            this.paste =
                function (a, b, e) {
                    function c(a) {
                        for (var b = a.getElementsByTagName("img"), e = 0, f = b.length; e < f; e++)if (0 == b.src.indexOf("data:image/png;base64,"))return d.setData("image/png", b.src.substring(22)), d;
                        if (a = a.value || a.innerText || a.innerHTML)return d.setData("text/plain", a), d
                    }

                    var d = new h;
                    if (b && b.clipboardData) {
                        cancelDefault(b);
                        var f = e = 0, f = b.clipboardData, g = f.getData("text/plain");
                        g && d.setData("text/plain", g);
                        (g = f.getData("text/html")) && d.setData("text/html", g);
                        var k = f.items, g = null;
                        if (k)for (f = k.length; e < f; e++) {
                            if ("image/png" ==
                                k[e].type) {
                                g = k[e].getAsFile();
                                break
                            }
                        } else if (f.files)for (k = f.files, e = 0, f = k.length; e < f; e++)if (console.log("** type:" + k[e].type), -1 != k[e].type.indexOf("image/png")) {
                            g = k[e];
                            break
                        }
                        g ? (e = new FileReader, e.onloadend = function (b) {
                            b.target.readyState == FileReader.DONE && (d.setData("image/png", new Uint8Array(b.target.result)), a(d))
                        }, e.readAsArrayBuffer(g)) : a(d)
                    } else if (window.clipboardData)cancelDefault(b), d.setData("text/plain", window.clipboardData.getData("Text")), a(d); else if (b) {
                        var m = b.target.value;
                        D && (D.ontextinput =
                            null);
                        setTimeout(function () {
                            var e = c(b.target);
                            D && (D.ontextinput = ga);
                            e && e != m && (b.target.value && (b.target.value = "", D && D.init()), a(e))
                        }, 15)
                    } else {
                        e = document.createElement("div");
                        e.contentEditable = "true";
                        e.style.position = "absolute";
                        e.style.zIndex = 99999;
                        e.style.left = 0;
                        e.style.top = 0;
                        e.style.width = e.style.height = "20px";
                        e.style.opacity = 0;
                        document.body.appendChild(e);
                        g = document.activeElement;
                        try {
                            e.focus(), document.execCommand("paste", !1, null), a(c(e))
                        } catch (n) {
                        } finally {
                            e.parentNode.removeChild(e), g.focus()
                        }
                    }
                }
        },
        fa = new function () {
            this.altUp = this.shiftUp = this.winUp = this.ctrlUp = !0;
            var a = this;
            this.sendMissKey = function () {
                a.shiftUp || (f(!1, 42), a.shiftUp = !0);
                a.altUp || (f(!1, 56), f(!0, 56), f(!1, 56), a.altUp = !0);
                a.ctrlUp || (f(!1, 29), a.ctrlUp = !0);
                a.winUp || (f(!1, 219), a.winUp = !0)
            };
            this.check = function (b) {
                var e = ja(b.keyCode), c = "keydown" == b.type;
                switch (e) {
                    case 16:
                        !c || !a.shiftUp || b.altKey || b.ctrlKey || b.metaKey || a.sendMissKey();
                        a.shiftUp = !c;
                        break;
                    case 17:
                        c && a.ctrlUp && !b.altKey && !b.shiftKey && a.sendMissKey();
                        a.ctrlUp = !c;
                        break;
                    case 18:
                        !c || !a.altUp || b.shiftKey || b.ctrlKey || b.metaKey || a.sendMissKey();
                        a.altUp = !c;
                        break;
                    case 91:
                    case 92:
                        !c || !a.winUp || b.shiftKey || b.ctrlKey || b.metaKey || b.altKey || a.sendMissKey();
                        a.winUp = !c;
                        break;
                    default:
                        !c || b.ctrlKey || b.altKey || b.shiftKey || b.metaKey || a.sendMissKey()
                }
            }
        };
    this.requestCredential = function (a) {
        var b = __svi18n.template.login;
        if (b) {
            var c = document.createElement("div");
            c.className = "appdlg";
            c.innerHTML = b;
            document.body.appendChild(c);
            (b = hi5.$("loginDomain")) && a.nbDomain && (b.innerHTML = a.nbDomain);
            var d = new hi5.Lightbox(c,
                0.9);
            d.onclose = function () {
                document.body.removeChild(c)
            };
            try {
                g.close()
            } catch (f) {
            }
            d.show();
            (b = hi5.$("loginUser")) && b.focus();
            if (b = hi5.$("frmLogin"))b.onsubmit = function () {
                var a = hi5.$("loginUser").value, b = hi5.$("loginPassword").value, c = hi5.$("loginDomain").innerHTML;
                d.dismiss();
                setTimeout(function () {
                    n.reconnect(a, b, c)
                }, 5);
                return!1
            }
        } else g.showMessage("No value for login template")
    };
    if (G)Pa(); else {
        y();
        var Fa = hi5.$("tmContainer");
        Fa && Fa.parentNode.removeChild(Fa)
    }
    window.addEventListener("scroll", function () {
        setTimeout(function () {
            var a =
                document.getElementById("pc_key");
            a && (a.style.left = window.pageXOffset + "px", a.style.top = window.pageYOffset + "px");
            g.toolbar && (g.toolbar.style.top = window.pageYOffset + "px", g.toolbar.style.left = window.pageXOffset + (window.innerWidth - g.toolbar.offsetWidth) / 2 + "px")
        }, 200)
    }, !1);
    this.setCaretPos = function (a, b) {
    };
    this.showMessage = function (a) {
        a && hi5.notifications.notify({msg: a})
    };
    this.hideWhenClose = !0;
    this.setReadOnly = function (a) {
        u = !a
    };
    this.setPlayerMode = function () {
        R = !0;
        g.showToolbar = !1;
        g.setReadOnly(!0);
        g.hideWhenClose = !1
    };
    this.setAutoScale = function (a) {
        G || !1 == hi5.appcfg.autoScale || (a ? Ga("hidden") : da(!1), U = a)
    };
    this.setTouchpad = function (a) {
        P = a;
        var b = hi5.$("touchpadMode");
        b && (b.checked = a, b.onchange = function (a) {
            P = a.target.checked
        });
        a ? d || ra() : d && d.parentNode && (d.parentNode.removeChild(d), d = null)
    };
    this.setSize = function (a, b, c) {
        I = a;
        H = b;
        U || Ga(c);
        k.width = I;
        k.height = H;
        U && da(!0);
        G ? Pa() : (y(), Ha());
        N && N.visible() && N.dismiss()
    };
    this.setController = function (a) {
        n = a;
        G && (svGlobal.orient.onchange = function () {
            U ? da(!0) : (n.onorientationchange({svSurface: g,
                innerWidth: document.documentElement.clientWidth, innerHeight: svGlobal.orient.getInnerHeight()}), window.scrollTo(0, 0))
        })
    };
    this.setFileHandler = function (a) {
        "FileReader"in window || (a = null);
        a ? K || R || !document.getElementById("filecontainer") || (K = a, g.fileProgress = new hi5.ProgressBar(document.getElementById("total")), wa(), a = G ? k : c, K && !R && (svGlobal.util.initMapDisk(a, K), svGlobal.util.initMapDisk(document.getElementById("filecontainer"), K), document.getElementById("uploadfile").addEventListener("change", Qa, !1))) :
            (K = null, g.fileProgress = null, g.toolbar && g.toolbar.removeButton("svCloud"), wa())
    };
    this.disableUpload = function () {
        document.getElementById("uploadfile").style.visibility = "hidden"
    };
    this.disableShadow = function () {
        var a = hi5.$("shadowing");
        a && a.parentNode.removeChild(a)
    };
    this.close = function () {
        ua();
        for (var a = 0, b = ha.length; a < b; a++)ha[a]();
        try {
            if (K = null, g.fileProgress = null, window.svSurface = null, d && d.parentNode && (d.parentNode.removeChild(d), d = null), Ma = !0, window && !R)if (0 < hi5.notifications.notifySize())hi5.notifications.onempty =
                function () {
                    g.close();
                    hi5.notifications.onempty = null
                }; else if (window.opener && !hi5.browser.isChromeApp)window.close(); else if (this.hide(), hi5.browser.isChromeApp) {
                var c = chrome.app.window.current();
                c && (c.onMaximized.removeListener(Ia), c.isFullscreen() && (c.restore(), c.restore()))
            }
        } catch (f) {
        }
    };
    this.setFastCopy = function (a) {
        Xa = a
    };
    this.drawLicense = function (a) {
        var b = a.charAt(0);
        S.font = "12pt Arial";
        S.fillStyle = "W" == b ? "red" : "black";
        a = a.substring(1);
        S.fillText(a, 10, H - 24)
    };
    this.drawText = function (a) {
        S.font = "18pt Arial";
        S.fillStyle = "black";
        S.fillText(a, 20, 50)
    };
    this.showPDF = function (a) {
        var b = document.createElement("div");
        b.style.backgroundColor = "white";
        b.style.width = G ? "30%" : "95%";
        b.style.height = G ? "4elm" : "90%";
        ua();
        var c = hi5.browser.isChrome && !0 === hi5.appcfg.noPrintPreview && !hi5.browser.isOperaNext, d = __svi18n.info.printready || "Your document is ready.";
        b.innerHTML = G ? '<p style="text-align:center;line-height:4em"><a href="' + a + '" target="_blank">' + d + "</a></p>" : '<iframe src="' + a + '" width="100%" height="100%" id="_iFramePDF"></iframe>';
        document.body.appendChild(b);
        if (c) {
            var f = hi5.$("_iFramePDF");
            f.onload = function () {
                var a = f.contentWindow || f;
                f.focus();
                a.print()
            }
        } else a = new hi5.Lightbox(b), a.onclose = function () {
            window.focus();
            b.parentNode.removeChild(b)
        }, a.show()
    };
    this.hide = function () {
        g.hideWhenClose && (k.height = 1, k.width = 1);
        c && (c.style.visibility = "hidden")
    };
    this.copyToClip = function (a, b) {
        if (window.clipboardData)window.clipboardData.setData("Text", a); else if (!J) {
            var e = Ja();
            e.value = a;
            try {
                e.focus(), e.select(), document.execCommand("copy",
                    !1, null)
            } catch (d) {
            } finally {
                e.parentNode.removeChild(e), c && c.focus()
            }
        }
    };
    this.fullScreen = function () {
        k.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    };
    ha.push(function () {
        if (window) {
            window.removeEventListener("beforeunload", La, !1);
            window.removeEventListener("focus", Ka, !1);
            window.onresize = null;
            try {
                ba && ba.parentNode && (ba.parentNode.removeChild(ba), ba = null), c && c.parentNode && (c.parentNode.removeChild(c), c = null)
            } catch (a) {
            }
        }
        document && (document.oncontextmenu = null, document.onselectstart = null, document.body.style.overflow =
            "")
    });
    this.refreshFiles = function () {
        N && N.visible() && W(".", N)
    };
    this.processLink = function (a) {
        g.toolbar.addButton(hi5.appcfg.img.info ? hi5.appcfg.img.info : "info.png",function (b) {
            window.open(a);
            b.target.parentNode.removeChild(b.target)
        }).title = a;
        g.toolbar.startFade()
    };
    this.setUnicode = function (a) {
        c && (Ca = !a, a ? (0 < svGlobal.log && console.log("Using unicode"), D.onkeydown = Ta, D.onkeyup = Ta) : (0 < svGlobal.log && console.log("Using non-unicode"), D.onkeydown = va, D.onkeyup = va))
    };
    this.setTouchRemoting = function (a) {
        !0 == a ? (Y =
            new t(g, k), console.log("touch remoting"), g.showMessage(__svi18n.info.touchremoting)) : Y = new A(g)
    };
    this.setClipboard = function (a) {
        Ea = a
    };
    this.setJoinMode = function (a) {
        n.setJoinMode(a)
    };
    this.requestControl = function () {
        n.requestControl()
    };
    this.run = function (a) {
        Ca = !a;
        window.scrollTo(0, 0);
        wa();
        ab();
        G ? R || (Y = new A(g), a = new l(k), a.ontouch = F, a.onmousedown = oa, a.onmousemove = pa, a.onmouseup = qa, hi5.browser.isFirefox ? k.addEventListener("DOMMouseScroll", ma, !0) : k.addEventListener("mousewheel", ma, !0), document.addEventListener("paste",
            Wa, !1), hi5.appcfg.copyDialog || (document.addEventListener("copy", la, !1), document.addEventListener("cut", la, !1))) : (R || (c.addEventListener("mousemove", pa, !1), c.addEventListener("mousedown", oa, !1), c.addEventListener("mouseup", qa, !1), hi5.browser.isFirefox ? c.addEventListener("DOMMouseScroll", ma, !0) : c.addEventListener("mousewheel", ma, !0), c.addEventListener("paste", Wa, !1), hi5.appcfg.copyDialog || (c.addEventListener("copy", la, !1), c.addEventListener("cut", la, !1))), g.setUnicode(a), D.ontextinput = ga, a = hi5.tool.getPos(k),
            c.style.left = a.x + "px", c.style.top = a.y + "px", c && c.focus());
        this.drawText(__svi18n.wait);
        if (g.onstart)g.onstart(k)
    };
    this.movCursorBy = xa;
    this.moveCursor = X;
    this.touchstart = function (a) {
        switch (a.pointes) {
            case 1:
                P ? (d || ra(), ya("touchstart", a.screenX, a.screenY, !a.flick)) : a.flick && !x() || $(a.x - k.offsetLeft, a.y - k.offsetTop, 0);
                break;
            case 2:
                ia = a.screenX, T = a.screenY
        }
    };
    this.touchmove = function (a) {
        switch (a.pointes) {
            case 1:
                if (P)ya("touchmove", a.screenX, a.screenY, !a.flick); else if (!a.flick || x()) {
                    var b = void 0, b = s;
                    n.sendInput("82" +
                        (a.x - k.offsetLeft) / b + "\t" + (a.y - k.offsetTop) / b)
                }
                break;
            case 2:
                40 <= Math.abs(a.screenY - T) && (b = void 0, b = s, n.sendInput("83" + (a.x - k.offsetLeft) / b + "\t" + (a.y - k.offsetTop) / b + "\t" + (0 < a.screenY - T ? 0 : 1)), ia = a.screenX, T = a.screenY)
        }
    };
    this.touchend = function (a) {
        var b = a.pointes;
        !a.moved && a.target == k && 3 > b && k.focus();
        switch (b) {
            case 1:
                P ? ya("touchend", a.screenX, a.screenY, !a.flick) : (X(a.x, a.y, !0), a.flick && !x() || aa(a.x - k.offsetLeft, a.y - k.offsetTop, 0));
                break;
            case 2:
                a.moved || (b = P ? d.scrX : a.x - k.offsetLeft, a = P ? d.scrY : a.y - k.offsetTop,
                    X(b, a), $(b, a, 2), aa(b, a, 2));
                break;
            case 3:
                if (a.gesture)switch (a.gesture) {
                    case "OPEN":
                        f(!0, 219);
                        f(!0, 200);
                        f(!1, 200);
                        f(!1, 219);
                        break;
                    case "CLOSE":
                        f(!0, 219);
                        f(!0, 208);
                        f(!1, 208);
                        f(!1, 219);
                        break;
                    case "LEFT":
                        f(!0, 56);
                        f(!0, 1);
                        f(!1, 1);
                        f(!1, 56);
                        break;
                    case "RIGHT":
                        f(!0, 42);
                        f(!0, 56);
                        f(!0, 1);
                        f(!1, 1);
                        f(!1, 56);
                        f(!1, 42);
                        break;
                    case "UP":
                        f(!0, 42);
                        f(!0, 219);
                        v(!0, 77);
                        v(!1, 77);
                        f(!1, 219);
                        f(!1, 42);
                        break;
                    case "DOWN":
                        f(!0, 219), v(!0, 77), v(!1, 77), f(!1, 219)
                } else g.toolbar && g.toolbar.startFade && g.toolbar.startFade(), J && J.focus()
        }
    };
    this.flick = function (a) {
        switch (a.from) {
            case 4:
                console.log("flick from botton");
                n.sendInput("840\t209");
                n.sendInput("8449152\t209");
                break;
            case 2:
                console.log("flick from top"), n.sendInput("840\t201"), n.sendInput("8449152\t201")
        }
    };
    this.longpress = function (a) {
        P && (a.pointes = 2);
        switch (a.pointes) {
            case 1:
                var b = a.x - k.offsetLeft;
                a = a.y - k.offsetTop;
                X(b, a);
                $(b, a, 2);
                aa(b, a, 2);
                break;
            case 2:
                d && ($(d.scrX, d.scrY, 2, 1), aa(d.scrX, d.scrY, 2, 1))
        }
    };
    this.redirectTouches = function (a) {
        if (u) {
            for (var b = a.length, c, d = "90" + b, f = 0; f <
                b; f++)c = a[f], d = d + "\t" + c.contactId + ";" + c.contactFlags + ";" + Math.floor(c.x / s) + ";" + Math.floor(c.y / s);
            n.send(d)
        }
    };
    var Aa = hi5.browser.isMacOS || hi5.browser.isiOS, ka = 0;
    this.processClipReq = function (a) {
        if (window.clipboardData)return n.send("881text/plain\t" + window.clipboardData.getData("Text")), !0;
        var b = O.clipData, c = O.clipData ? O.clipData.getData(a) : null;
        if (c)return n.send("881" + a + "\t" + ("string" != typeof c ? hi5.Base64.enc(c) : c)), b.sent = !0;
        n.send("881ERROR");
        return!1
    };
    var Ya = 0, fb = {33: 201, 34: 209, 35: 207, 36: 199, 37: 203,
        38: 200, 39: 205, 40: 208, 154: 183, 45: 210, 46: 211, 225: 184, 91: 219, 92: 220, 93: 221, 27: 1, 8: 14, 9: 15, 13: 28, 224: 29, 17: 29, 16: 42, 18: 56, 20: 58, 166: 59, 112: 59, 167: 60, 113: 60, 168: 61, 114: 61, 183: 62, 115: 62, 182: 63, 116: 63, 216: 64, 117: 64, 217: 65, 118: 65, 173: 66, 119: 66, 174: 67, 120: 67, 175: 68, 121: 68, 122: 87, 123: 88, 144: 69, 145: 70};
    this.writeKeyComb = function (a) {
        n.writeKeyComb(a)
    };
    this.setCursor = function (a) {
        a && (a.data || a.url) && (sa = a, d && (d.hotX = a.hotX, d.hotY = a.hotY, d.setCursor(a)), c ? c.style.cursor = Za(a) : k.style.cursor = Za(a))
    };
    this.setVisible =
        function (a, b) {
            var c = a ? "visible" : "hidden";
            "number" == typeof b ? setTimeout(function () {
                k.style.visibility = c
            }, b) : k.style.visibility = c
        }
}
svGlobal.LocalInterface = LocalInterface;
svGlobal.rdpFile = {loadRdpFile: function (h, w) {
    var l = w.elements, x = h.split("\r\n");
    2 > x.length && (x = h.split("\n"));
    if (2 > x.length)return!1;
    var t = document.getElementById("gateway"), A = t.value;
    w.reset();
    t.value = A;
    t = 0;
    for (A = x.length; t < A; t++) {
        var m = x[t], y = m.indexOf(":"), E = m.substring(0, y), m = m.substring(y + 3), E = E.toLowerCase();
        switch (E) {
            case "full address":
                y = m.indexOf(":");
                0 < y ? (l.server.value = m.substring(0, y), l.port.value = m.substring(y + 1)) : l.server.value = m;
                break;
            case "username":
                l.user.value = m;
                break;
            case "domain":
                l.domain.value =
                    m;
                break;
            case "connect to console":
                l.useConsole.checked = "0" != m;
                break;
            case "desktopwidth":
                l.width.value = m;
                break;
            case "desktopheight":
                l.height.value = m;
                break;
            case "session bpp":
                l.server_bpp.value = m;
                break;
            case "audiomode":
                l.playSound.value = m;
                break;
            case "alternate shell":
                0 < m.length && (l.command.value = m, document.getElementById("app").checked || (document.getElementById("shell").checked = !0));
                break;
            case "shell working directory":
                l.directory = m;
                break;
            case "redirectclipboard":
                l.mapClipboard.checked = "0" != m;
                break;
            case "redirectprinters":
                l.mapPrinter.checked = "0" != m;
                break;
            case "server port":
                0 < m.length && (l.port.value = m);
                break;
            case "disable wallpaper":
                l.background.checked = "0" == m;
                break;
            case "disable themes":
                l.styles.checked = "0" == m;
            case "disable menu anims":
                l.animation.checked = "0" == m;
                break;
            case "disable full window drag":
                l.contents.checked = "0" == m;
                break;
            case "allow font smoothing":
                l.smoothfont.checked = "0" != m;
                break;
            case "allow desktop composition":
                l.composition.checked = "0" != m;
                break;
            case "bitmapcachepersistenable":
                l.bitmap.checked =
                    "0" != m;
                break;
            case "remoteapplicationprogram":
                l.exe.value = m;
                break;
            case "remoteapplicationcmdline":
                l.args.value = m;
                break;
            case "remoteapplicationmode":
                document.getElementById("app").checked = "1" == m;
                break;
            case "loadbalanceinfo":
                l.loadBalanceInfo.value = m
        }
    }
    return!0
}, handleFiles: function (h, w) {
    if (1 != h.length)hi5.notifications.notify({msg: "Please one file only"}); else {
        var l = h[0], x = l.name, t = x.length;
        if (4 < t && ".rdp" == x.substring(t - 4).toLowerCase()) {
            var A = new FileReader, m = !1;
            A.onload = function (h) {
                !(h = h.target.result) ||
                    svGlobal.rdpFile.loadRdpFile(h, w) || m || (m = !0, A.readAsText(l))
            };
            A.readAsText(l, "UTF-16LE")
        } else hi5.notifications.notify({msg: "Sorry, Please .rdp file only"})
    }
}};
function initDragDrop(h, w) {
    function l(h) {
        svGlobal.rdpFile.handleFiles(h.target.files, w)
    }

    function x(l) {
        cancelDefault(l);
        h.style.backgroundColor = m;
        svGlobal.rdpFile.handleFiles(l.dataTransfer.files, w)
    }

    function t(m) {
        cancelDefault(m);
        h.style.backgroundColor = "yellow"
    }

    function A(l) {
        cancelDefault(l);
        h.style.backgroundColor = m
    }

    if ("FileReader"in window) {
        var m = h.style.backgroundColor, y = document.getElementById("rdpfile");
        y && y.addEventListener("change", l, !1);
        h.addEventListener("dragover", t, !1);
        h.addEventListener("dragleave",
            A, !1);
        h.addEventListener("drop", x, !1)
    }
}
svGlobal.util.initDragDrop = initDragDrop;
svGlobal.util.initMapDisk = function (h, w) {
    function l(l) {
        cancelDefault(l);
        "0.6" != h.style.opacity && (h.style.opacity = "0.6");
        h.style.backgroundColor = "yellow"
    }

    function x(l) {
        cancelDefault(l);
        h.style.opacity = h.__oldOpacity;
        h.style.backgroundColor = h.__oldColor
    }

    function t(l) {
        cancelDefault(l);
        h.style.opacity = h.__oldOpacity;
        h.style.backgroundColor = h.__oldColor;
        w(l.dataTransfer.files)
    }

    "FileReader"in window && (h.__oldColor = h.style.backgroundColor, h.__oldOpacity = h.style.opacity, h.addEventListener("dragover", l, !1),
        h.addEventListener("dragleave", x, !1), h.addEventListener("drop", t, !1))
};
window.addEventListener("load", function (h) {
    h = document.getElementsByClassName("ver");
    for (var w = h.length, l = 0; l < w; l++)h[l].innerHTML = svGlobal.version
}, !1);
