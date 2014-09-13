var hi5 = hi5 || {};
hi5.init = {inited: !1, funcs: [], push: function (a) {
    hi5.init.funcs.push(a)
}, start: function (a) {
    if (!hi5.init.inited) {
        hi5.browser.innerHeight = window.innerHeight;
        hi5.init.inited = !0;
        a = hi5.init.funcs;
        for (var e = 0, f = a.length; e < f; e++)a[e]()
    }
}};
String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
});
Number.prototype.toByte = function () {
    var a = this & 255;
    return 127 < a ? a - 256 : a
};
String.prototype.applyArgs = function (a) {
    for (var e = this.split("%"), f, c, d = e[0], g = 1, h = e.length; g < h; g++) {
        f = e[g];
        var k = parseInt(f, 10);
        isNaN(k) ? d += f : (c = f.substring((k + "").length), (f = a[k - 1]) && (d += f), d += c)
    }
    return d
};
String.prototype.hashCode = function () {
    for (var a = 0, e = 0, f = this.length, c = 0; c < f; c++)e = this.charCodeAt(c), a = (a << 5) - a + e | 0;
    return a
};
Array.prototype.removeElm = function (a) {
    a = this.indexOf(a);
    -1 != a && this.splice(a, 1)
};
Array.prototype.fill = function (a) {
    for (var e = this.length; 0 <= --e;)this[e] = a
};
Date.prototype.getStdTimezoneOffset = function () {
    var a = new Date(this.getFullYear(), 0, 1), e = new Date(this.getFullYear(), 6, 1);
    return Math.max(a.getTimezoneOffset(), e.getTimezoneOffset())
};
hi5.WebSocket = window.WebSocket || window.MozWebSocket;
hi5.$ = function (a) {
    return document.getElementById(a)
};
hi5.browser = new function () {
    var a = navigator.userAgent;
    this.innerHeight = 0;
    this.isTouch = "createTouch"in document || !!navigator.msMaxTouchPoints || !!navigator.maxTouchPoints || -1 != a.indexOf("Mobile");
    this.isFirefox = -1 != a.indexOf("Firefox");
    this.isOpera = -1 != a.indexOf("Opera");
    this.isRIM = -1 != a.indexOf(" RIM ");
    this.isChrome = -1 != a.indexOf("Chrome");
    this.isMacOS = -1 != a.indexOf("Mac OS");
    this.isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? !0 : !1;
    this.isSafari = -1 == a.indexOf("Chrome") && -1 != a.indexOf("Safari");
    this.isWebKit = -1 != a.indexOf("WebKit");
    this.isCrOS = -1 != a.indexOf("CrOS");
    this.isIE = -1 != a.indexOf("MSIE") || -1 != a.indexOf("Trident");
    this.isOperaNext = -1 != a.indexOf("Edition Next");
    this.isAndroid = -1 != a.indexOf("Android");
    this.isChromeApp = "chrome"in window && "app"in chrome && "window"in chrome.app;
    this.isDesktop = !a.match(/(iPhone|iPod|iPad|Android|BlackBerry|Mobile)/);
    this.isMultitask = !(this.isiOS && this.isSafari && 0 < a.indexOf("Version/5"));
    this.binaryWS = function () {
        return hi5.browser.isChrome ? !0 : hi5.tool.hasProperty(hi5.WebSocket,
            "binaryType")
    };
    this.cookie2Obj = function () {
        var a = document.cookie, f = {}, c;
        if ("" == a)return f;
        for (var d = a.split(";"), g = 0, h = d.length; g < h; g++) {
            for (var k = d[g]; " " == k.charAt(0);)k = k.substring(1, k.length);
            a = k.indexOf("=");
            if (0 < a) {
                c = decodeURIComponent(k.substring(a + 1).replace(/\+/g, " "));
                hi5.tool.isNumber(c) && "0" != c[0] && parseFloat(c) == c && (c = parseFloat(c));
                if ("true" == c || "on" == c)c = !0; else if ("false" == c || "off" == c)c = !1;
                f[k.substring(0, a)] = c
            }
        }
        return f
    };
    this.getLibPath = function (a) {
        for (var f = document.getElementsByTagName("script"),
                 c, d, g = null, h = f.length, k = 0; k < h; k++)if (d = f[k].src, c = d.indexOf(a), -1 < c) {
            g = d.substring(0, c);
            break
        }
        return g
    };
    this.loadJS = function (a) {
        0 > a.indexOf("/") && (a = hi5.libPath + a);
        if (!b.getLibPath(a)) {
            var f = document.createElement("script");
            f.type = "text/javascript";
            f.src = a;
            (document.body || document.getElementsByTagName("script")[0].parentNode).appendChild(f)
        }
    };
    this.formToObj = function (a, f) {
        var c = a.elements, d, g, h, k = c.length;
        f || (f = {});
        for (var m = 0; m < k; m++)if (d = c[m], h = d.name) {
            g = d.type;
            switch (g) {
                case "submit":
                case "button":
                case "reset":
                    continue;
                case "checkbox":
                    d = d.checked;
                    break;
                case "raido":
                    if (!d.checked)continue;
                    d = d.checked;
                    break;
                case "number":
                    parseFloat(d.value);
                default:
                    d = d.value
            }
            "" != d && (f[h] = d)
        }
        return f
    };
    this.objToForm = function (a, f) {
        var c, d, g = f.elements, h;
        for (h in a)if (c = g[h])d = a[h], "boolean" == typeof d ? c.checked = d : c.value = d
    };
    this.objToCookie = function (a) {
        for (var f in a)"" != a[f] && (document.cookie = f + "=" + a[f])
    };
    this.getScale = function () {
        return document.documentElement.clientWidth / window.innerWidth
    };
    this.httpGet = function (a, f) {
        var c = new XMLHttpRequest;
        c.open("GET", a, f);
        c.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        c.send(null);
        return c.responseText
    };
    this.Orientation = function () {
        function a() {
            return hi5.browser.isiOS ? 0 == window.orientation || 180 == window.orientation : screen.width < screen.height
        }

        function f() {
            var a = screen.width < screen.height ? 0 : 2, c = !1, e = document.documentElement;
            e.clientWidth > d[a] && (d[a] = e.clientWidth, c = !0);
            a++;
            e.clientHeight > d[a] && e.clientHeight < screen.height && (d[a] = e.clientHeight, c = !0);
            return c
        }

        function c() {
            var c = a();
            f();
            if (!hi5.browser.isFirefox || c != k)if (k = c, h.onchange)h.onchange()
        }

        var d = [0, 0, 0, 0], g = window.matchMedia("(orientation: portrait)"), h = this;
        this.outerSize = 0;
        var k = a();
        f();
        hi5.browser.isFirefox ? g.addListener(c) : window.addEventListener("orientationchange", c, !1);
        this.getInnerHeight = function () {
            var a = screen.width < screen.height ? 1 : 3, c = d[a];
            "INPUT" != document.activeElement.nodeName && (c = document.documentElement.clientHeight, d[a] = c);
            return c
        }
    }
};
hi5.libPath = hi5.browser.getLibPath("hi5_min.js");
hi5.libPath || (hi5.libPath = hi5.browser.getLibPath("hi5.js"));
hi5.storage = new function () {
    function a(a, c) {
        this._state = c || 0;
        this._value = a
    }

    function e(a) {
        return a && 0 == a.indexOf("{") && (a = JSON.parse(a)) && "_state"in a && "_value"in a ? a : null
    }

    var f = "chrome"in window && !!chrome.storage;
    this.isAvailable = !!f || "localStorage"in window;
    var c = f ? {} : localStorage;
    f && chrome.storage.local.get(null, function (a) {
        for (var e in a)c[e] = a[e]
    });
    this.set = function (d, e) {
        "string" != typeof e && console.log(e);
        c[d] = JSON.stringify(new a(e, 1))
    };
    this.get = function (a) {
        a = c[a];
        var f = e(a);
        return f ? f._value :
            a
    };
    this.clear = function (a) {
        c = {};
        f ? chrome.storage.local.clear(a || function () {
        }) : localStorage.clear()
    };
    this.remove = function (a) {
        if (c.removeItem)c.removeItem(a); else {
            var f = e(c[a]);
            f && (f._state = 2, c[a] = JSON.stringify(f))
        }
    };
    this.commit = function (a) {
        a = a || function () {
        };
        if (f) {
            var g = {}, h = [], k = !1, m;
            for (m in c) {
                var l = e(c[m]);
                l && (1 == l._state ? (g[m] = l._value, k = !0) : 2 == l._state && h.push(m))
            }
            0 < h.length && chrome.storage.local.remove(h, function () {
                for (var e = 0, f = h.length; e < f; e++)delete c[h[e]];
                a && a()
            });
            k && chrome.storage.local.set(g,
                a)
        } else a()
    }
};
hi5.Arrays = {fill: function (a, e, f, c) {
    for (; e < f; e++)a[e] = c
}, arraycopy: function (a, e, f, c, d) {
    for (var g = 0; g < d; g++)f[c + g] = a[e + g]
}, equals: function (a, e) {
    if (a == e)return!0;
    if (!a || !e)return!1;
    var f = a.length;
    if (f != e.length)return!1;
    for (var c = 0; c < f; c++)if (a[c] != e[c])return!1;
    return!0
}};
hi5.callback = {callbacks: {}, no: 0, put: function (a) {
    var e = "CB" + this.no++;
    this.callbacks[e] = a;
    return e
}, get: function (a) {
    var e = this.callbacks[a];
    e && delete this.callbacks[a];
    return e
}};
hi5.tool = {isNumber: function (a) {
    return!isNaN(parseFloat(a)) && isFinite(a)
}, getMousePos: function (a) {
    var e = 0, f = 0;
    a || (a = window.event);
    a.pageX ? (e = a.pageX, f = a.pageY) : a.clientX && (e = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, f = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
    return{x: e, y: f}
}, getPos: function (a) {
    var e = 0, f = 0;
    if (a.offsetParent) {
        do e += a.offsetLeft, f += a.offsetTop; while (a = a.offsetParent)
    }
    return{x: e, y: f}
}, bytesToSize: function (a) {
    if (isNaN(a))return"";
    var e = Math.floor(Math.log(+a) / Math.log(2));
    1 > e && (e = 0);
    e = Math.floor(e / 10);
    a = +a / Math.pow(2, 10 * e);
    a.toString().length > a.toFixed(3).toString().length && (a = a.toFixed(3));
    return a + " bytes; KB; MB; GB; TB; PB; EB; ZB; YB".split(";")[e]
}, queryToObj: function (a) {
    a || (a = location.search.substring(1));
    var e = {};
    if (a) {
        a = a.split("&");
        for (var f = a.length, c = 0; c < f; c++) {
            var d = a[c].split("=");
            e[d[0]] = decodeURIComponent(d[1])
        }
    }
    return e
}, replaceQuery: function (a, e, f) {
    var c = a.indexOf(e + "="), d = !1;
    0 < c && (c = a.charAt(c - 1), "&" == c ||
        "?" == c) && (d = !0);
    return d ? a.replace(RegExp("[\\?&]" + e + "=([^&#]*)"), function (a) {
        return a.charAt(0) + e + "=" + encodeURIComponent(f)
    }) : a += "&" + e + "=" + f
}, disableInput: function () {
    var a = document.createElement("div");
    a.style.position = "fixed";
    a.style.left = 0;
    a.style.top = 0;
    a.style.width = "100%";
    a.style.height = "100%";
    a.style.zIndex = 99999;
    a.style.background = "url(spinner.gif) no-repeat center center";
    document.body.appendChild(a);
    window.__hi5_bk = a
}, enableInput: function () {
    window.__hi5_bk && (document.body.removeChild(window.__hi5_bk),
        window.__hi5_bk = null)
}, scale: function (a, e, f, c) {
    f || (f = 0);
    c || (c = 0);
    f = f + " " + c;
    a.style.transformOrigin = f;
    a.style.MozTransformOrigin = f;
    a.style.webkitTransformOrigin = f;
    a.style.msTransformOrigin = f;
    a.style.OTransformOrigin = f;
    e = "scale(" + e + ")";
    a.style.transform = e;
    a.style.MozTransform = e;
    a.style.webkitTransform = e;
    a.style.msTransform = e;
    a.style.OTransform = e
}, openWebSocket: function (a, e, f) {
    var c = !1;
    f && (f = hi5.callback.put(f), a += "&callback=" + f);
    var d = new hi5.WebSocket(a);
    d.onopen = function (a) {
        c = !0;
        e && d.send(e)
    };
    d.onclose =
        function (a) {
            c || alert("Failed to connect")
        };
    d.onmessage = function (a) {
        a = JSON.parse(a.data);
        d.close();
        a.callback ? hi5.callback.get(a.callback)(a) : console.log(a)
    };
    return d
}, getChildNodesByTag: function (a, e) {
    for (var f = a.childNodes, c = [], d = 0, g = f.length; d < g; d++)f[d].nodeName.toLowerCase() == e && c.push(f[d]);
    return c
}, hasProperty: function (a, e) {
    return e in a || e in a.prototype ? !0 : e in(a.__proto__ || a.constructor.prototype)
}, isCapslock: function (a) {
    var e = String.fromCharCode(a.keyCode || a.which);
    return e.toUpperCase() !=
        e || e.toLowerCase() == e || a.shiftKey ? !1 : !0
}, getImage: function (a, e) {
    e && 0 != e.indexOf("/") && (e = hi5.libPath + e);
    return hi5 && hi5.appcfg && hi5.appcfg.img ? hi5.appcfg.img[a] || e : e
}, uuid: function () {
    return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
        var e = 16 * Math.random() | 0;
        return("x" == a ? e : e & 3 | 8).toString(16)
    })
}};
hi5.EventControl = function (a) {
    a.addEvent = function (e, f) {
        a[e] && a[e]._evt_listeners || (a[e] = function () {
            a.fireEvent(e, arguments)
        }, a[e]._evt_listeners = []);
        a[e]._evt_listeners.push(f)
    };
    a.removeEvent = function (e, f) {
        if (!a[e] && !a[e]._evt_listeners)return!1;
        var c = a[e]._evt_listeners, d = c.indexOf(f);
        return-1 < d ? (c.removeElm(d), !0) : !1
    };
    a.fireEvent = function (e, f) {
        if (a[e] && a[e]._evt_listeners) {
            var c = a[e]._evt_listeners;
            f || (f = []);
            for (var d = 0, g = c.length; d < g; d++)c[d].apply(a, f)
        }
    };
    return a
};
hi5.ui = hi5.ui || {};
hi5.ui.confirm = function (a) {
    return hi5.browser.isChromeApp ? !0 : confirm(a)
};
hi5.Dragable = function (a) {
    function e(d) {
        d.preventDefault && d.preventDefault();
        d.touches && (d = 1 == d.touches.length ? d.touches[0] : d.changedTouches[0]);
        d = c(d);
        var e = d.y - f.y;
        a.style.left = a.offsetLeft + (d.x - f.x) + "px";
        a.style.top = a.offsetTop + e + "px";
        f.x = d.x;
        f.y = d.y
    }

    a.draggable = !0;
    var f = {}, c = hi5.tool.getMousePos, d = hi5.browser.isTouch;
    a.addEventListener(d ? "touchstart" : "dragstart", function (a) {
        a.stopPropagation && a.stopPropagation();
        a.touches && (a = a.touches[0]);
        f = c(a)
    }, !1);
    a.addEventListener(d ? "touchend" : "dragend",
        function (d) {
            d.stopPropagation && d.stopPropagation();
            if (!d.touches) {
                d = c(d);
                var e = d.y - f.y;
                a.style.left = a.offsetLeft + (d.x - f.x) + "px";
                a.style.top = a.offsetTop + e + "px"
            }
        }, !1);
    d && a.addEventListener("touchmove", e, !1);
    return a
};
hi5.Fadable = function (a, e, f) {
    function c() {
        document.activeElement == a.activeObj ? setTimeout(c, h) : a.style.display = "none"
    }

    function d() {
        a.beforeDisplay && a.beforeDisplay();
        a.style.display = "block";
        m && (null != k && clearTimeout(k), k = setTimeout(c, h))
    }

    0 > a.tabIndex && (a.tabIndex = 999);
    var g = f || document, h = e || 3E3, k = null, m = !0;
    a.setFadable = function (c) {
        (m = c) ? g.addEventListener(hi5.browser.isTouch ? navigator.msMaxTouchPoints ? "MSPointerUp" : "touchend" : "mouseup", d, !1) : a.style.display = "block"
    };
    a.startFade = d
};
hi5.cancelDefault = function (a) {
    a.preventDefault && a.preventDefault();
    a.stopPropagation && a.stopPropagation();
    return!1
};
hi5.Toolbar = function (a) {
    a.addButton = function (e, f, c) {
        var d = document.createElement("img");
        d.src = e;
        hi5.browser.isTouch ? navigator.msMaxTouchPoints || (d.addEventListener("touchstart", hi5.cancelDefault, !1), d.addEventListener("touchend", f, !1), d.addEventListener("touchmove", hi5.cancelDefault, !1)) : d.onclick = f;
        a.appendChild(d);
        c && (d.id = c);
        return d
    };
    a.getButton = function (e) {
        for (var f = a.getElementsByTagName("img"), c = f.length, d = 0; d < c; d++)if (f[d].id == e)return f[d];
        return null
    };
    a.removeButton = function (e) {
        for (var f =
            a.getElementsByTagName("img"), c = f.length, d = 0; d < c; d++)if (f[d].id == e) {
            a.removeChild(f[d]);
            1 == c && a.parentNode.removeChild(a);
            break
        }
    };
    return a
};
hi5.ProgressBar = function (a) {
    a.progress = 0;
    a.maxValue = 0;
    var e = a.getElementsByTagName("div")[0];
    a.setProgress = function (f) {
        f = Math.floor(f / a.maxValue * 100);
        f != a.progress && (a.progress = f, e.style.width = f / 100 * a.offsetWidth + "px")
    };
    return a
};
hi5.Lightbox = function (a, e, f) {
    function c() {
        var c = d.clientWidth, e = d.clientHeight, f = a.offsetWidth, l = a.offsetHeight;
        f > 0.96 * c && (f = 0.96 * c, a.style.width = f + "px");
        l > 0.96 * e && (l = 0.96 * e, a.style.height = l + "px", a.style.width = a.offsetWidth + 22 + "px");
        c = (c - f) / 2;
        e = (e - l) / 3;
        a.style.left = c + "px";
        a.style.top = e + "px";
        g.style.left = c + a.offsetWidth - 6 + "px";
        g.style.top = e - 6 + "px"
    }

    var d = document.createElement("div");
    d.style.position = "fixed";
    d.style.left = 0;
    d.style.top = 0;
    d.style.width = "100%";
    d.style.height = "100%";
    d.style.zIndex = 999;
    d.style.backgroundColor = f ? f : "#222";
    e || (e = 0.4);
    1 > e && (d.style.opacity = e);
    a.style.position = "absolute";
    a.style.zIndex = 1E3;
    a.style.visibility = "hidden";
    var g = document.createElement("div");
    g.style.position = "absolute";
    e = document.createElement("img");
    e.width = 25;
    e.height = 25;
    e.src = hi5.tool.getImage("del", "del.png");
    e.style.cursor = "pointer";
    g.style.zIndex = 10001;
    e.align = "top";
    g.appendChild(e);
    a.resize = c;
    a.show = function () {
        var e = document.body;
        e.appendChild(d);
        e.appendChild(g);
        a.style.display = "block";
        a.style.visibility =
            "visible";
        c()
    };
    a.visible = function () {
        return a && "visible" == a.style.visibility
    };
    a.dismiss = function (c) {
        function e() {
            var c = document.body;
            c.removeChild(d);
            c.removeChild(g);
            a.style.display = "none";
            a.style.visibility = "hidden";
            if (a.onclose)a.onclose()
        }

        "number" == typeof c ? setTimeout(e, c) : e()
    };
    a.background = d;
    e.addEventListener("click", a.dismiss, !1);
    return a
};
hi5.DataTable = function (a) {
    hi5.EventControl(a);
    "string" == typeof a && (a = JSON.parse(a));
    var e = a.rows, f = a.cols;
    a.rowNo = -1;
    a.beforeGetValue = null;
    a.moveTo = function (c) {
        a.rowNo = c
    };
    a.getColNo = function (a) {
        for (var d = 0, e = f.length; d < e; d++)if (f[d].name == a)return d;
        return-1
    };
    a.getValue = function (c) {
        var d = e[a.rowNo][c];
        return a.beforeGetValue ? a.beforeGetValue(c, d) : d
    };
    a.setValue = function (c, d) {
        a.beforeSetValue && (d = a.beforeSetValue(c, d));
        e[a.rowNo][c] = d;
        a.fireEvent("onchange", [c, a.rowNo, d])
    };
    a.first = function () {
        a.moveTo(0)
    };
    a.next = function () {
        a.moveTo(a.rowNo + 1)
    };
    a.last = function () {
        a.moveTo(e.length - 1)
    };
    a.hasNext = function () {
        return a.rowNo < e.length - 1
    };
    a.remove = function (c) {
        c || (c = a.rowNo);
        var d = [c];
        a.fireEvent("beforeremove", d);
        e.splice(c, 1);
        a.fireEvent("onremove", d)
    };
    a.perform = function (c) {
        "function" == typeof a[c] ? a[c].apply(a) : a.fireEvent("onaction", [c])
    };
    a.getObject = function () {
        for (var c = {}, d = 0, e = f.length; d < e; d++)c[f[d].name] = a.getValue(d);
        return c
    };
    a.find = function (a, d) {
        for (var f = 0, h = e.length; f < h; f++)if (e[f][a] == d)return e[f];
        return null
    };
    a.fireEvent("onopen");
    return a
};
hi5.DataGrid = function (a) {
    function e(c) {
        var d = this.rowIndex;
        "number" == typeof d && (f = d -= a.tHead.rows.length, a.dataTable.moveTo(d));
        if (a.onrowclick)a.onrowclick(c)
    }

    if ("TABLE" != a.nodeName)throw"Not HTML Table";
    a.dataTable = null;
    a.onrowclick = null;
    var f = -1;
    a.getValue = function (c) {
        var d = a.dataTable;
        d.moveTo(f);
        return d.getValue(d.getColNo(c))
    };
    a.fillData = function (c) {
        var d = c.rows, g = c.cols.length, h = a.tBodies[0], k, m, l, n;
        a._rowTemp || (a._rowTemp = a.tBodies[0].rows[0].cloneNode(!0));
        n = a._rowTemp;
        var p, q = h.cloneNode(!1),
            r;
        m = d.length;
        for (k = 0; k < m; k++) {
            p = n.cloneNode(!0);
            r = p.cells;
            c.moveTo(k);
            for (d = 0; d < g; d++)l = c.getValue(d), a.beforeDisplayValue && (l = a.beforeDisplayValue(d, l)), r[d].innerHTML = l;
            f = k;
            p.addEventListener("click", e, !1);
            a.beforeAppendRow && a.beforeAppendRow(p);
            q.appendChild(p)
        }
        a.removeChild(h);
        a.appendChild(q)
    };
    a.open = function () {
        function c(c) {
            var e = a.tBodies[0];
            (c = e.rows[c]) && e.removeChild(c)
        }

        a.dataTable && (a.fillData(a.dataTable), a.dataTable.addEvent("onremove", c))
    };
    return a
};
hi5.Select = function (a, e, f) {
    var c = a.parentNode, d = document.createElement("div");
    d.style.padding = "0";
    d.style.display = "inline";
    c.insertBefore(d, a);
    var g = document.createElement("img");
    g.src = hi5.tool.getImage("select", "select.png");
    g.height = a.offsetHeight;
    g.style.verticalAlign = "-6px";
    d.appendChild(a);
    d.appendChild(g);
    var h = document.createElement("select");
    e && (h.multiple = !0, f || (f = ","));
    c = a.getAttribute("hi5_size");
    h.size = c ? c : 10;
    if (c = a.getAttribute("hi5_list"))if (c = c.split(";"), d = c.length, 0 < d)for (var k = h.options,
                                                                                          m = 0; m < d; m++)k[m] = new Option(c[m]);
    h.style.position = "absolute";
    h.style.zIndex = 99999;
    h.style.display = "none";
    document.body.appendChild(h);
    a.show = function () {
        a.beforedropdown && a.beforedropdown(a);
        h.style.display = "";
        h.focus()
    };
    a.hide = function () {
        h.style.display = "none";
        a.focus()
    };
    g.onclick = function () {
        if ("none" == h.style.display) {
            if (0 == h.options.length) {
                var c = a.getAttribute("onfetchlist");
                c && eval(c)
            }
            c = hi5.tool.getPos(a);
            h.style.left = c.x + "px";
            h.style.top = c.y + a.offsetHeight + "px";
            h.style.width = a.offsetWidth + g.width +
                3 + "px";
            a.show()
        } else a.hide()
    };
    h.onchange = function () {
        if (e) {
            for (var c = [], d, k = h.options, g = 0, m = k.length; g < m; g++)d = k[g], d.selected && c.push(d.value);
            a.value = c.join(f)
        } else a.value = h.value, h.style.display = "none";
        if (a.onchange)a.onchange()
    };
    a.options = h.options;
    return a
};
hi5.init.push(function () {
    for (var a = document.getElementsByClassName("Hi5Select"), e = a.length, f = 0; f < e; f++)new hi5.Select(a[f])
});
hi5.Tab = function (a) {
    function e(c) {
        var d = g;
        g != c && (h[g].className = "tab_back", k[g].className = "tab_hide", g = c);
        h[c].className = "tab_front";
        k[c].className = "tab_show";
        h[c].focus();
        d != c && a.fireEvent("ontabchange", [c, d])
    }

    function f(a) {
        a = h.indexOf(a.target);
        -1 != a && e(a)
    }

    hi5.EventControl(a);
    for (var c = a.getElementsByClassName("tab")[0].getElementsByClassName("tab_title")[0].childNodes, d = c.length, g = 0, h = [], k = [], m = 0; m < d; m++) {
        var l = c[m];
        "SPAN" == l.nodeName.toUpperCase() && (l.className = "tab_back", l.onclick = f, l.onfocus =
            f, h[h.length] = l)
    }
    c = a.getElementsByClassName("tab_body")[0].childNodes;
    d = c.length;
    for (m = 0; m < d; m++)l = c[m], "DIV" == l.nodeName.toUpperCase() && (k[k.length] = l, l.className = "tab_hide");
    e(g);
    a.setSelected = e;
    a.getSelected = function () {
        return g
    };
    return a
};
hi5.init.push(function () {
    for (var a = document.getElementsByClassName("tab_all"), e = a.length, f = 0; f < e; f++)new hi5.Tab(a[f])
});
hi5.graphic = {};
hi5.graphic.Rectangle = function (a, e, f, c) {
    this.x = a;
    this.y = e;
    this.width = f;
    this.height = c;
    var d = this;
    this.union = function (a, c, e, f) {
        var l = d.width, n = d.height;
        if (0 > (l | n))d.x = a, d.y = c, d.width = e, d.height = f; else if (!(0 > (e | f))) {
            var p = d.x, q = d.y, l = l + p, n = n + q;
            e += a;
            f += c;
            p > a && (p = a);
            q > c && (q = c);
            l < e && (l = e);
            n < f && (n = f);
            d.x = p;
            d.y = q;
            d.width = l - p;
            d.height = n - q
        }
    };
    this.intersection = function (a, c, e, f, l) {
        var n = d.x, p = d.y, q;
        q = n + d.width;
        var r;
        r = p + d.height;
        e = a + e;
        f = c + f;
        n < a && (n = a);
        p < c && (p = c);
        q > e && (q = e);
        r > f && (r = f);
        q -= n;
        r -= p;
        return l ? (l.x =
            n, l.y = p, l.width = q, l.height = r, l) : new hi5.graphic.Rectangle(n, p, q, r)
    };
    this.isEmpty = function () {
        return 0 >= d.width || 0 >= d.height
    }
};
hi5.init.push(function () {
    function a(f) {
        function c(a, c) {
            var e = document.createElement("img");
            e.src = a;
            e.className = "hi5_notifer_button";
            e.onclick = function (a) {
                c.apply(d, [a])
            };
            return e
        }

        var d = document.createElement("div");
        d.className = "hi5_notifer slideUp";
        var g = document.createElement("div");
        g.className = "hi5_notifer_title";
        var h = document.createElement("img");
        h.src = hi5.tool.getImage("info", "info.png");
        h.className = "hi5_notifer_icon";
        g.appendChild(h);
        g.appendChild(document.createTextNode(f.title ? f.title : ""));
        d.appendChild(g);
        g = document.createElement("div");
        g.appendChild(document.createTextNode(f.msg));
        d.countNode = document.createElement("span");
        d.countNode.className = "hi5_notifer_count";
        g.appendChild(d.countNode);
        f.cbNo && g.appendChild(c(hi5.tool.getImage("del", "del.png"), f.cbNo));
        f.cbYes && g.appendChild(c(hi5.tool.getImage("ok", "ok.png"), f.cbYes));
        f.title && (d.title = f.title);
        d.message = f.msg;
        d.msgCount = 1;
        d.addCount = function () {
            d.msgCount++;
            d.countNode.innerHTML = "(" + d.msgCount + ")"
        };
        d.appendChild(g);
        d.destroy =
            function () {
                if (d.parentNode) {
                    d.parentNode.removeChild(d);
                    var c = e.notifyPool.shift();
                    if (c)e.appendChild(new a(c)); else if (e.onempty && 0 == e.notifySize())e.onempty()
                }
            };
        f.timeout && setTimeout(function () {
            d.destroy()
        }, f.timeout);
        f.cbYes || f.cbNo || (d.onclick = d.destroy);
        return d
    }

    var e = hi5.$("hi5_notifer_all");
    e || (e = document.createElement("div"), e.id = "hi5_notifer_all", document.body.appendChild(e));
    e.notifyPool = [];
    e.notify = function (f) {
        f = "string" == typeof f ? {msg: f, title: ""} : f;
        var c = hi5.tool.getChildNodesByTag(e,
            "div"), d = c.length;
        if (0 < d && (c = c[d - 1], c.title == f.title && c.message == f.msg)) {
            c.addCount();
            return
        }
        3 > d ? e.appendChild(new a(f)) : e.notifyPool.push(f)
    };
    e.notifySize = function () {
        return hi5.tool.getChildNodesByTag(e, "div").length
    };
    hi5.notifications = e
});
hi5.Base64 = {table: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), enc: function (a, e, f) {
    var c = "", d = this.table;
    e || (e = a.length);
    f || (f = 0);
    for (var g = f, h = f + e - 2, k = e % 3; g < h; g += 3)c += d[a[g] >> 2], c += d[((a[g] & 3) << 4) + (a[g + 1] >> 4)], c += d[((a[g + 1] & 15) << 2) + (a[g + 2] >> 6)], c += d[a[g + 2] & 63];
    2 == k ? (g = f + e - 2, c += d[a[g] >> 2], c += d[((a[g] & 3) << 4) + (a[g + 1] >> 4)], c += d[(a[g + 1] & 15) << 2], c += "=") : 1 == k && (g = f + e - 1, c += d[a[g] >> 2], c += d[(a[g] & 3) << 4], c += "==");
    return c
}, binaries: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1], dec: function (a, e) {
    var f = this.binaries, c, d, g, h, k, m = 0, l = 0;
    c = a.indexOf("=") - e;
    var n = a.length;
    0 > c && (c = n - e);
    c = Array(3 * (c >> 2) + Math.floor(c % 4 / 1.5));
    d = c[0] = 0;
    for (g = e; g < n; g++)h = f[a.charCodeAt(g) &
        127], k = "=" == a.charAt(g), -1 == h ? console.log("Illegal character '" + a.charCodeAt(g) + "'") : (l = l << 6 | h, m += 6, 8 <= m && (m -= 8, k || (c[d++] = l >> m & 255), l &= (1 << m) - 1));
    return c
}};
hi5.file = {readAsArrayBuffer: function (a, e) {
    var f = new FileReader;
    f.onloadend = function (a) {
        e(new Uint8Array(a.target.result))
    };
    f.readAsArrayBuffer(a)
}};
hi5.DataBuffer = function (a, e, f) {
    this.size = f;
    var c = e, d = e + f, g = hi5.Arrays.arraycopy, h = this;
    this.attach = function (e, f, g) {
        a && (a = null);
        a = e;
        c = f;
        h.size = g;
        d = f + g
    };
    this.reset = function (a) {
        c = 0;
        h.size = d = a
    };
    this.markEnd = function (a) {
        d = a || h.getPosition()
    };
    this.getEnd = function () {
        return d
    };
    this.has = function (a) {
        return d - c >= a
    };
    this.getByte = function () {
        return a[c++]
    };
    this.getBytes = function (d) {
        var e;
        if (a.slice)e = a.slice(c, c + d); else if (a.buffer && a.buffer.slice)e = new Uint8Array(a.buffer.slice(c, c + d)); else {
            e = Uint8Array ? new Uint8Array(d) :
                Array(d);
            for (var f = e[0] = 0; f < d; f++)e[f] = a[c + f]
        }
        c += d;
        return e
    };
    this.copyToByteArray = function (c, d, e, f) {
        g(a, e, c, d, f)
    };
    this.getCapacity = function () {
        return a.length
    };
    this.getPosition = function () {
        return c
    };
    this.getLittleEndian16 = function () {
        var d = a[c + 1] << 8 | a[c];
        c += 2;
        return d
    };
    this.getBigEndian16 = function () {
        var d = a[c] << 8 | a[c + 1];
        c += 2;
        return d
    };
    this.getLittleEndian32 = function () {
        var d = a[c + 3] << 24 | a[c + 2] << 16 | a[c + 1] << 8 | a[c];
        c += 4;
        return d
    };
    this.getLittleEndian64 = function () {
        var d = a[c + 7] << 56 | a[c + 6] << 48 | a[c + 5] << 40 | a[c +
            4] << 32 | a[c + 3] << 24 | a[c + 2] << 16 | a[c + 1] << 8 | a[c];
        c += 8;
        return d
    };
    this.getBigEndian32 = function () {
        var d = a[c] << 24 | a[c + 1] << 16 | a[c + 2] << 8 | a[c + 3];
        c += 4;
        return d
    };
    this.getUnicodeString = function (a, c) {
        for (var d = Math.floor(a / 2), e = "", f = 0; f < d; f++) {
            var g = this.getLittleEndian16();
            if (c && 0 == g) {
                this.skipPosition(2 * (d - f - 1));
                break
            }
            e += String.fromCharCode(g)
        }
        return e
    };
    this.setUnicodeString = function (a) {
        for (var c = a.length, d = 0; d < c; d++)this.setLittleEndian16(a.charCodeAt(d))
    };
    this.skipPosition = function (a) {
        c += a
    };
    this.setPosition =
        function (a) {
            c = a
        };
    this.getData = function () {
        return a
    };
    this.setByte = function (d) {
        a[c++] = d
    };
    this.setLittleEndian16 = function (d) {
        a[c++] = d & 255;
        a[c++] = d >> 8 & 255
    };
    this.setLittleEndian32 = function (d) {
        a[c++] = d & 255;
        a[c++] = d >> 8 & 255;
        a[c++] = d >> 16 & 255;
        a[c++] = d >> 24 & 255
    }
};
document.addEventListener("DOMContentLoaded", hi5.init.start, !1);
