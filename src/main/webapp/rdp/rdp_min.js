var svManager = {getInstance: function () {
    var s = window.$rdp;
    return s && s.running && s.running() ? s : null
}};
svGlobal.getInstance = svManager.getInstance;
hi5.browser.isChromeApp || window.addEventListener("beforeunload", function (s) {
    var A = svManager.getInstance();
    if (A && A.isRemoteApp() && 2 != A.mode) {
        var A = A.getRunninApps(), F = A.length;
        if (0 < F) {
            for (var ba = __svi18n.remoteApp.warn + "\n\n", ea = 0; ea < F; ea++)ba += A[ea] + "\n";
            ba += "\n" + __svi18n.remoteApp.close + "\n";
            hi5.browser.isFirefox && hi5.notifications.notify({msg: ba});
            s && (s.returnValue = ba);
            return ba
        }
    }
}, !1);
function connvertServer(s) {
    var A = {};
    A.id = s.id;
    A.server = s.id;
    A.displayName = s.displayName || s.id;
    if (s = s.rdp) {
        for (var F in s)A[F] = s[F];
        A.user = s.username || "";
        A.pwd = s.password || "";
        A.useConsole = s.console || !1;
        A.legacyMode = s.leagacyMode || s.legacyMode || !1;
        A.server_bpp = s.color || 16;
        A.exe = s.remoteProgram || "";
        A.args = s.remoteArgs || "";
        A.startProgram = 0 < A.exe.length ? "app" : A.command && 0 < A.command.length ? "shell" : "noapp"
    }
    return A
}
function Rdp2(s) {
    if (!s) {
        var A = window.opener;
        try {
            A && A.__sparkUser && A.__sparkUser.server && (s = A.__sparkUser.server), !s && A.sparkServer && (s = A.sparkServer)
        } catch (F) {
        }
        s || (s = hi5.browser.cookie2Obj());
        if (!s || !s.gateway)return hi5.notifications.notify({msg: __svi18n.noauth}), null
    }
    var A = "", ba = s.gateway || "", ea = document.documentElement.clientWidth, Y = document.documentElement.clientHeight, Z = 16, W = null;
    s.width && (ea = parseInt(s.width, 10));
    s.height && (Y = parseInt(s.height, 10));
    s.color && (Z = parseInt(s.color, 10));
    s.server_bpp &&
    (Z = parseInt(s.server_bpp, 10));
    for (var ka in s) {
        svGlobal.logger.debug("** p:" + ka + " v=" + s[ka]);
        var M = s[ka];
        if ("useSSL" == ka)W = "true" == M || !0 == M; else {
            if ("boolean" == typeof M)if (M)M = "on"; else continue;
            "" != A && (A += "&");
            A += ka + "=" + encodeURIComponent(M)
        }
    }
    null === W && (W = "https:" == location.protocol);
    A = (W ? "wss://" : "ws://") + ba + "/RDP?" + A;
    return new Rdp(A, ea, Y, Z)
}
svGlobal.Rdp2 = Rdp2;
function Rdp(s, A, F, ba) {
    var ea, Y, Z, W;

    function ka(a) {
        return bb ? new Uint32Array(a) : Array(a)
    }

    function M(a) {
        return bb ? new Int32Array(a) : Array(a)
    }

    function Ea(a) {
        return bb ? new Uint8Array(a) : Array(a)
    }

    function cb(a, b) {
        p.setTitle && (b = b || window, p.ontitlechange && (a = p.ontitlechange(a)), b.document.title = a)
    }

    function Gc() {
        function a(a, h, r, z, d, u, w, p) {
            var A = 0, s = M(160);
            sa(s, 0, 160, 0);
            var hc = M(40);
            sa(hc, 0, 40, 0);
            for (var y = 0; 3 >= y; y++, A += 13) {
                var x = d[y], F = r[y], D = A, G = u, B = hc, E = M(13);
                sa(E, 0, 13, 0);
                var C = void 0, J = C = 0;
                15 < x && (C =
                    (x >> 3) - 1);
                J = x - (C << 3);
                if (0 == J)C = -4, J = 7; else {
                    for (; 7 >= J;)J = J << 1 | 1, C--;
                    J -= 8
                }
                x = Array(2);
                x[0] = C;
                x[1] = J;
                for (var C = x, x = E, I = void 0, H = J = void 0, U = void 0, J = m[C[1]], H = k(6, C[0]), C = k(H, 1), U = 16 <= C ? 0 : -16 >= C ? -0 : 0 > C ? 16 <= -C ? 0 : -16 >= -C ? 0 : 0 > -C ? 1 << --C : 1 >> -C : 1 << C, K = C = 0; 13 > K; K++)I = (G[D++] << 1) - 7, I <<= 12, I = g(J, I), I += U, -32768 > I ? I = -32768 : 32767 < I && (I = 32767), x[C++] = 16 <= H ? 0 > I ? -1 : 0 : -16 >= H ? 0 : 0 > H ? I << -H : I >> H;
                G = 13;
                C = x = 0;
                switch (F) {
                    case 3:
                        B[C++] = 0;
                    case 2:
                        B[C++] = 0;
                    case 1:
                        B[C++] = 0;
                    case 0:
                        B[C++] = E[x++], G--
                }
                do B[C++] = 0, B[C++] = 0, B[C++] = E[x++];
                while (0 < --G);
                for (; 4 > ++F;)B[C++] = 0;
                x = h[y];
                C = z[y];
                B = hc;
                G = F = E = void 0;
                P = G = 40 > x || 120 < x ? P : x;
                E = f[C];
                for (x = 0; 39 >= x; x++)F = g(E, n[x - G + 120]), F += B[x], -32768 > F ? F = -32768 : 32767 < F && (F = 32767), n[x + 120] = F;
                ta(n, 40, n, 0, 120);
                ta(n, 120, s, 40 * y, 39)
            }
            h = M(8);
            r = l[t];
            z = l[t ^= 1];
            d = 0;
            b(a, r, d++, 0, 0, -32, 13107);
            b(a, r, d++, 0, 0, -32, 13107);
            b(a, r, d++, 0, 2048, -16, 13107);
            b(a, r, d++, 0, -2560, -16, 13107);
            b(a, r, d++, 0, 94, -8, 19223);
            b(a, r, d++, 0, -1792, -8, 17476);
            b(a, r, d++, 0, -341, -4, 31454);
            b(a, r, d++, 0, -1144, -4, 29708);
            for (d = a = 0; 8 > d; d++)a = (z[d] >> 2) + (r[d] >>
                2), -32768 > a ? a = -32768 : 32767 < a && (a = 32767), a += z[d] >> 1, -32768 > a ? a = -32768 : 32767 < a && (a = 32767), h[d] = a;
            c(h);
            e(h, 13, s, w, 0, p);
            for (d = a = 0; 8 > d; d++)a = (z[d] >> 1) + (r[d] >> 1), -32768 > a ? a = -32768 : 32767 < a && (a = 32767), h[d] = a;
            c(h);
            e(h, 14, s, w, 13, p);
            for (d = a = 0; 8 > d; d++)a = (z[d] >> 2) + (r[d] >> 2), -32768 > a ? a = -32768 : 32767 < a && (a = 32767), a += r[d] >> 1, -32768 > a ? a = -32768 : 32767 < a && (a = 32767), h[d] = a;
            c(h);
            e(h, 13, s, w, 27, p);
            for (a = 0; 8 > a; a++)h[a] = r[a];
            c(h);
            e(h, 120, s, w, 40, p);
            s = 0;
            a = p;
            for (h = p + 160; h-- > p; a++)s = g(q, 28180), q = w[a] + s, -32768 > q ? q = -32768 : 32767 <
                q && (q = 32767), s = q << 1, -32768 > s ? s = -32768 : 32767 < s && (s = 32767), w[a] = s
        }

        function b(a, b, c, h, d, e, f) {
            h = a[c] + e;
            -32768 > h ? h = -32768 : 32767 < h && (h = 32767);
            h = k(h << 10, d << 1);
            h = g(f, h);
            h += h;
            -32768 > h ? h = -32768 : 32767 < h && (h = 32767);
            b[c] = h
        }

        function c(a) {
            for (var b = 0, c = 0; 8 > c; c++)0 > a[c] ? (b = -32768 == a[c] ? 32767 : -a[c], a[c] = -(11059 > b ? b << 1 : 20070 > b ? b + 11059 : h(b >> 2, 26112))) : (b = a[c], a[c] = 11059 > b ? b << 1 : 20070 > b ? b + 11059 : h(b >> 2, 26112))
        }

        function e(a, b, c, h, d, e) {
            for (var g = 0, f = 0, l = 0; 0 != b;) {
                b--;
                for (var g = c[d], n = 7; 0 <= n; n--)f = a[n], l = r[n], l = ((-32768 ==
                    f && -32768 == l ? 32767 : 65535 & f * l + 16384 >> 15) & 65535) << 16 >> 16, g = k(g, l), f = ((-32768 == f && -32768 == g ? 32767 : 65535 & f * g + 16384 >> 15) & 65535) << 16 >> 16, f = r[n] + f, -32768 > f ? f = -32768 : 32767 < f && (f = 32767), r[n + 1] = f;
                h[e + d++] = r[0] = g
            }
        }

        function g(a, b) {
            if (-32768 == a && -32768 == b)return 32767;
            var c;
            return c = (a * b + 16384 >> 15 & 65535) << 16 >> 16
        }

        function h(a, b) {
            var c = a + b;
            return-32768 > c ? -32768 : 32767 < c ? 32767 : c
        }

        function k(a, b) {
            var c = a - b;
            return-32768 > c ? -32768 : 32767 < c ? 32767 : c
        }

        var m = [18431, 20479, 22527, 24575, 26623, 28671, 30719, 32767], f = [3277, 11469, 21299,
            32767], n = M(280);
        n[0] = 0;
        var l = [M(8), M(8)], t = 0, P = 40, r = M(9), q = 0, w = M(320);
        w[0] = 0;
        var u = [0.1];
        this.decode = function (b, c, h) {
            for (var e = 0, d = 0, d = 0, g = M(8), f = M(4), k = M(4), l = M(4), n = M(4), m = M(52); c < h;) {
                d = b[c++] & 255;
                g[0] = d & 63;
                d = (65535 & d) >>> 6;
                d |= b[c++] << 2 & 1023;
                g[1] = d & 63;
                d = (65535 & d) >>> 6;
                d |= b[c++] << 4 & 4095;
                g[2] = d & 31;
                d = (65535 & d) >>> 5;
                g[3] = d & 31;
                d = (65535 & d) >>> 5;
                d |= b[c++] << 2 & 1023;
                g[4] = d & 15;
                d = (65535 & d) >>> 4;
                g[5] = d & 15;
                d = (65535 & d) >>> 4;
                d |= b[c++] << 2 & 1023;
                g[6] = d & 7;
                d = (65535 & d) >>> 3;
                g[7] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 4 & 4095;
                f[0] = d &
                    127;
                d = (65535 & d) >>> 7;
                l[0] = d & 3;
                d = (65535 & d) >>> 2;
                k[0] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 1 & 511;
                n[0] = d & 63;
                d = (65535 & d) >>> 6;
                m[0] = d & 7;
                d = b[c++] & 255;
                m[1] = d & 7;
                d = (65535 & d) >>> 3;
                m[2] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[3] = d & 7;
                d = (65535 & d) >>> 3;
                m[4] = d & 7;
                d = (65535 & d) >>> 3;
                m[5] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[6] = d & 7;
                d = (65535 & d) >>> 3;
                m[7] = d & 7;
                d = (65535 & d) >>> 3;
                m[8] = d & 7;
                d = b[c++] & 255;
                m[9] = d & 7;
                d = (65535 & d) >>> 3;
                m[10] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[11] = d & 7;
                d = (65535 & d) >>> 3;
                m[12] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 4 &
                    4095;
                f[1] = d & 127;
                d = (65535 & d) >>> 7;
                l[1] = d & 3;
                d = (65535 & d) >>> 2;
                k[1] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 1 & 511;
                n[1] = d & 63;
                d = (65535 & d) >>> 6;
                m[13] = d & 7;
                d = b[c++] & 255;
                m[14] = d & 7;
                d = (65535 & d) >>> 3;
                m[15] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[16] = d & 7;
                d = (65535 & d) >>> 3;
                m[17] = d & 7;
                d = (65535 & d) >>> 3;
                m[18] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[19] = d & 7;
                d = (65535 & d) >>> 3;
                m[20] = d & 7;
                d = (65535 & d) >>> 3;
                m[21] = d & 7;
                d = b[c++] & 255;
                m[22] = d & 7;
                d = (65535 & d) >>> 3;
                m[23] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[24] = d & 7;
                d = (65535 & d) >>> 3;
                m[25] = d & 7;
                d = (65535 &
                    d) >>> 3;
                d |= b[c++] << 4 & 4095;
                f[2] = d & 127;
                d = (65535 & d) >>> 7;
                l[2] = d & 3;
                d = (65535 & d) >>> 2;
                k[2] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 1 & 511;
                n[2] = d & 63;
                d = (65535 & d) >>> 6;
                m[26] = d & 7;
                d = b[c++] & 255;
                m[27] = d & 7;
                d = (65535 & d) >>> 3;
                m[28] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[29] = d & 7;
                d = (65535 & d) >>> 3;
                m[30] = d & 7;
                d = (65535 & d) >>> 3;
                m[31] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[32] = d & 7;
                d = (65535 & d) >>> 3;
                m[33] = d & 7;
                d = (65535 & d) >>> 3;
                m[34] = d & 7;
                d = b[c++] & 255;
                m[35] = d & 7;
                d = (65535 & d) >>> 3;
                m[36] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[37] = d & 7;
                d = (65535 & d) >>>
                    3;
                m[38] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 4 & 4095;
                f[3] = d & 127;
                d = (65535 & d) >>> 7;
                l[3] = d & 3;
                d = (65535 & d) >>> 2;
                k[3] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 1 & 511;
                n[3] = d & 63;
                d = (65535 & d) >>> 6;
                m[39] = d & 7;
                d = b[c++] & 255;
                m[40] = d & 7;
                d = (65535 & d) >>> 3;
                m[41] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[42] = d & 7;
                d = (65535 & d) >>> 3;
                m[43] = d & 7;
                d = (65535 & d) >>> 3;
                m[44] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[45] = d & 7;
                d = (65535 & d) >>> 3;
                m[46] = d & 7;
                d = (65535 & d) >>> 3;
                m[47] = d & 7;
                d = b[c++] & 255;
                m[48] = d & 7;
                d = (65535 & d) >>> 3;
                m[49] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[50] =
                    d & 7;
                d = (65535 & d) >>> 3;
                m[51] = d & 7;
                d = (65535 & d) >>> 3;
                a(g, f, k, l, n, m, w, 0);
                d &= 15;
                d |= b[c++] << 4 & 4095;
                g[0] = d & 63;
                d = (65535 & d) >>> 6;
                g[1] = d & 63;
                d = b[c++] & 255;
                g[2] = d & 31;
                d = (65535 & d) >>> 5;
                d |= b[c++] << 3 & 2047;
                g[3] = d & 31;
                d = (65535 & d) >>> 5;
                g[4] = d & 15;
                d = (65535 & d) >>> 4;
                d |= b[c++] << 2 & 1023;
                g[5] = d & 15;
                d = (65535 & d) >>> 4;
                g[6] = d & 7;
                d = (65535 & d) >>> 3;
                g[7] = d & 7;
                d = b[c++] & 255;
                f[0] = d & 127;
                d = (65535 & d) >>> 7;
                d |= b[c++] << 1 & 511;
                l[0] = d & 3;
                d = (65535 & d) >>> 2;
                k[0] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 5 & 8191;
                n[0] = d & 63;
                d = (65535 & d) >>> 6;
                m[0] = d & 7;
                d = (65535 & d) >>> 3;
                m[1] = d & 7;
                d = (65535 &
                    d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[2] = d & 7;
                d = (65535 & d) >>> 3;
                m[3] = d & 7;
                d = (65535 & d) >>> 3;
                m[4] = d & 7;
                d = b[c++] & 255;
                m[5] = d & 7;
                d = (65535 & d) >>> 3;
                m[6] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[7] = d & 7;
                d = (65535 & d) >>> 3;
                m[8] = d & 7;
                d = (65535 & d) >>> 3;
                m[9] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[10] = d & 7;
                d = (65535 & d) >>> 3;
                m[11] = d & 7;
                d = (65535 & d) >>> 3;
                m[12] = d & 7;
                d = b[c++] & 255;
                f[1] = d & 127;
                d = (65535 & d) >>> 7;
                d |= b[c++] << 1 & 511;
                l[1] = d & 3;
                d = (65535 & d) >>> 2;
                k[1] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 5 & 8191;
                n[1] = d & 63;
                d = (65535 & d) >>> 6;
                m[13] = d & 7;
                d = (65535 & d) >>> 3;
                m[14] =
                    d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[15] = d & 7;
                d = (65535 & d) >>> 3;
                m[16] = d & 7;
                d = (65535 & d) >>> 3;
                m[17] = d & 7;
                d = b[c++] & 255;
                m[18] = d & 7;
                d = (65535 & d) >>> 3;
                m[19] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[20] = d & 7;
                d = (65535 & d) >>> 3;
                m[21] = d & 7;
                d = (65535 & d) >>> 3;
                m[22] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[23] = d & 7;
                d = (65535 & d) >>> 3;
                m[24] = d & 7;
                d = (65535 & d) >>> 3;
                m[25] = d & 7;
                d = b[c++] & 255;
                f[2] = d & 127;
                d = (65535 & d) >>> 7;
                d |= b[c++] << 1 & 511;
                l[2] = d & 3;
                d = (65535 & d) >>> 2;
                k[2] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 5 & 8191;
                n[2] = d & 63;
                d = (65535 & d) >>> 6;
                m[26] = d & 7;
                d =
                    (65535 & d) >>> 3;
                m[27] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[28] = d & 7;
                d = (65535 & d) >>> 3;
                m[29] = d & 7;
                d = (65535 & d) >>> 3;
                m[30] = d & 7;
                d = b[c++] & 255;
                m[31] = d & 7;
                d = (65535 & d) >>> 3;
                m[32] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[33] = d & 7;
                d = (65535 & d) >>> 3;
                m[34] = d & 7;
                d = (65535 & d) >>> 3;
                m[35] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[36] = d & 7;
                d = (65535 & d) >>> 3;
                m[37] = d & 7;
                d = (65535 & d) >>> 3;
                m[38] = d & 7;
                d = b[c++] & 255;
                f[3] = d & 127;
                d = (65535 & d) >>> 7;
                d |= b[c++] << 1 & 511;
                l[3] = d & 3;
                d = (65535 & d) >>> 2;
                k[3] = d & 3;
                d = (65535 & d) >>> 2;
                d |= b[c++] << 5 & 8191;
                n[3] = d & 63;
                d = (65535 &
                    d) >>> 6;
                m[39] = d & 7;
                d = (65535 & d) >>> 3;
                m[40] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[41] = d & 7;
                d = (65535 & d) >>> 3;
                m[42] = d & 7;
                d = (65535 & d) >>> 3;
                m[43] = d & 7;
                d = b[c++] & 255;
                m[44] = d & 7;
                d = (65535 & d) >>> 3;
                m[45] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 2 & 1023;
                m[46] = d & 7;
                d = (65535 & d) >>> 3;
                m[47] = d & 7;
                d = (65535 & d) >>> 3;
                m[48] = d & 7;
                d = (65535 & d) >>> 3;
                d |= b[c++] << 1 & 511;
                m[49] = d & 7;
                d = (65535 & d) >>> 3;
                m[50] = d & 7;
                d = (65535 & d) >>> 3;
                m[51] = d & 7;
                a(g, f, k, l, n, m, w, 160);
                for (var d = 320 * e++, t = 0; 320 > t; t++)u[d++] = w[t] / 32768
            }
            u.length = 320 * e;
            return u
        }
    }

    function pd(a, b) {
        var c = [], e =
            null, g = new db(0, 0, 0, 0), h = "Uint8ClampedArray"in window;
        this.width = a;
        this.height = b;
        var k = this;
        this.setContext = function (a) {
            a != e && (e || !a || a.createImageData(1, 1).data.buffer || (h = !1), e = a)
        };
        this.getContext = function () {
            return e
        };
        this.resize = function (h, g) {
            if (bb)for (var e = 0; e < g; e++)c[e] = new Uint32Array(h); else if (g > c.length)for (e = c.length; e < g; e++)c[e] = [0];
            k.width = a = h;
            k.height = b = g
        };
        k.resize(a, b);
        this.getBuffer = function () {
            return c
        };
        this.setRGB = function (a, b, h) {
            c[b][a] = h | 4278190080
        };
        this.getRGB = function (a, b) {
            return c[b][a]
        };
        this.setRGBs = function (a, b, h, g, e, k, r) {
            if (e) {
                var q = 0, w = 0;
                h = a + h;
                g = b + g;
                for (var u = b; u < g; u++, k += r)for (w = k, b = c[u], q = a; q < h; q++)b[q] = e[w++]
            } else console.log("pixel null")
        };
        this.moveArea = function (a, b, h, g, e, k) {
            if (0 < k) {
                e = a + e;
                k = b + k;
                var r, q, w;
                for (r = g - 1; 0 <= r; r--)for (q = c[k + r], w = c[b + r], g = 0; g < h; g++)q[e + g] = w[a + g]
            } else if (0 > k) {
                e = a + e;
                k = b + k;
                var u;
                for (q = 0; q < g; q++)for (w = c[k + q], u = c[b + q], r = 0; r < h; r++)w[e + r] = u[a + r]
            } else if (0 < e)for (e = a + e, k = b + k, h -= 1; 0 <= h; h--)for (q = e + h, w = a + h, r = 0; r < g; r++)c[k + r][q] = c[b + r][w]; else for (e = a + e, k = b + k,
                                                                                                                                                                  r = 0; r < h; r++)for (w = e + r, u = a + r, q = 0; q < g; q++)c[k + q][w] = c[b + q][u]
        };
        this.getRGBs = function (a, b, h, g) {
            var e = ka(h * g);
            e[0] = 0;
            h = a + h;
            g = b + g;
            for (var k = 0, r = b; r < g; r++)for (b = a; b < h; b++)e[k++] = c[r][b];
            return e
        };
        this.repaint = function (g, k, n, l) {
            if (e) {
                0 > g && (n += g, g = 0);
                0 > k && (l += k, k = 0);
                g + n > a && (n = a - g);
                k + l > b && (l = b - k);
                var t = e.createImageData(n, l), P = t.data;
                n = g + n;
                l = k + l;
                var r = 0;
                if (h)for (var P = new Uint32Array(P.buffer), q, w = k; w < l; w++)for (q = g; q < n; q++)P[r++] = c[w][q]; else for (var u, p, w = k; w < l; w++)for (q = g; q < n; q++)u = c[w][q], p = r << 2, P[p] = u &
                    255, P[p + 1] = u >> 8 & 255, P[p + 2] = u >> 16 & 255, P[p + 3] = 255, r++;
                e.putImageData(t, g, k)
            }
        };
        this.postPaint = function (a, b, c, h) {
            0 < g.width ? g.union(a, b, c, h) : (g.x = a, g.y = b, g.width = c, g.height = h)
        };
        this.commitPaint = function () {
            0 < g.width && (this.repaint(g.x, g.y, g.width, g.height), g.width = 0)
        };
        this.fillRect = function (a, b, g, h, e) {
            g = a + g;
            h = b + h;
            for (var k = b; k < h; k++)for (b = a; b < g; b++)c[k][b] = e
        }
    }

    function Ic() {
        var a = "SI_" + p.server;
        C.domain && (a += C.domain);
        C.user && (a += C.user);
        return a
    }

    function qd() {
        if (!T && "sessionStorage"in window && !C.pwd) {
            var a =
                sessionStorage[Ic()];
            if (a)try {
                var b = JSON.parse(a);
                if (!("random"in b))return"";
                for (var c = b.random, a = 0; 16 > a; a++)c[a] &= 255;
                svGlobal.logger.info("load session, id=" + b.logId + " server=" + p.server);
                return"&logId=" + b.logId + "&random=" + encodeURIComponent(hi5.Base64.enc(c))
            } catch (e) {
            }
        }
        return""
    }

    function Jc(a) {
        return 4278190080 | (a << 3 & 248 | a >> 2 & 7) << 16 | (a >> 3 & 252 | a >> 9 & 3) << 8 | a >> 8 & 248 | a >> 13 & 7
    }

    function rd(a) {
        return 4278190080 | ga[2][a] << 16 | ga[1][a] << 8 | ga[0][a]
    }

    function sd(a) {
        return 4278190080 | a
    }

    function Kb(a, b, c, e, g, h) {
        for (var k =
            0, m = 0, f = 0, n = f = 0, l = 0, t = 0, P = t = 0, r = 0, q = b, w = h; m < e;) {
            h = w + c * e * 4 - (m + 1) * c * 4;
            l = 0;
            r = h;
            k = 0;
            if (0 == P)for (; k < c;) {
                f = a[b++];
                n = f & 15;
                f = f >> 4 & 15;
                t = n << 4 | f;
                47 >= t && 16 <= t && (n = t, f = 0);
                for (; 0 < f;)l = a[b++], g[h] = l, h += 4, k++, f--;
                for (; 0 < n;)g[h] = l, h += 4, k++, n--
            } else for (; k < c;) {
                f = a[b++];
                n = f & 15;
                f = f >> 4 & 15;
                t = n << 4 | f;
                47 >= t && 16 <= t && (n = t, f = 0);
                for (; 0 < f;)t = a[b++], 0 != (t & 1) ? (t >>= 1, t += 1, l = -t) : l = t >>= 1, t = g[P + 4 * k] + l, g[h] = t, h += 4, k++, f--;
                for (; 0 < n;)t = g[P + 4 * k] + l, g[h] = t, h += 4, k++, n--
            }
            m++;
            P = r
        }
        return b - q
    }

    function td(a, b, c) {
        b || (b = a.length);
        c || (c = 0);
        b = Math.floor(b /
            4);
        for (var e = ka(b), g = e[0] = 0, h = 0; h < b; h++)g = (h << 2) + c, e[h] = (a[g + 3] & 255) << 24 | a[g + 2] & 255 | (a[g + 1] & 255) << 8 | (a[g + 0] & 255) << 16;
        return e
    }

    function qb(a, b, c, e, g, h) {
        var k, m;
        for (m = 0; m < e; m++)for (k = 0; k < c; k++)g[h + 4 * ((e - m - 1) * c + k)] = a[b + (m * c + k)]
    }

    function ud(a, b, c, e, g) {
        c = e[g];
        var h = 0;
        g += 1;
        var h = a * b, k = ka(4 * h);
        k[0] = 0;
        if (0 == (c & 32)) {
            for (var m = g, f, n = 0, l = 0, t = 0, P = t = 0, r = 0, q = m, w = 3; l < b;) {
                f = w + a * b * 4 - (l + 1) * a * 4;
                color = 255;
                for (n = 0; n < a;) {
                    t = e[m++];
                    P = t & 15;
                    t = t >> 4 & 15;
                    r = P << 4 | t;
                    47 >= r && 16 <= r && (P = r, t = 0);
                    for (; 0 < t;)m++, k[f] = 255, f += 4, n++, t--;
                    for (; 0 <
                               P;)k[f] = 255, f += 4, n++, P--
                }
                l++
            }
            g += m - q
        } else for (f = m = 0; f < h; f++)m = f << 2, k[m + 3] = 255;
        0 != (c & 16) ? (h = Kb(e, g, a, b, k, 2), g += h, h = Kb(e, g, a, b, k, 1), g += h, Kb(e, g, a, b, k, 0)) : (qb(e, g, a, b, k, 2), g += h, qb(e, g, a, b, k, 1), qb(e, g + h, a, b, k, 0));
        return td(k)
    }

    function Kc(a, b, c, e, g) {
        var h = -1, k = -1;
        c = g + c;
        var m = 0, f = 0, n = 0, l = a, t = -1, P = 0, r = f = 0, q = 0, w = n = 0, u = 4294967295, p = 0, s = !1, L = !1, p = !1, z = ka(a * b);
        for (z[0] = 0; g < c;) {
            P = 0;
            f = e[g++];
            m = f >> 4;
            switch (m) {
                case 12:
                case 13:
                case 14:
                    m -= 6;
                    f &= 15;
                    n = 16;
                    break;
                case 15:
                    m = f & 15;
                    9 > m ? (f = e[g++], f |= e[g++] << 8) : f = 11 > m ? 8 : 1;
                    n = 0;
                    break;
                default:
                    m >>= 1, f &= 31, n = 32
            }
            0 != n && (p = 2 == m || 7 == m, 0 == f ? f = p ? e[g++] + 1 : e[g++] + n : p && (f <<= 3));
            switch (m) {
                case 0:
                    t != m || l == a && -1 == h || (s = !0);
                    break;
                case 8:
                    p = e[g++] | e[g++] << 8, r = 4278190080 | p >> 8 & 248 | p >> 13 & 7 | (p >> 3 & 252 | p >> 9 & 3) << 8 | (p << 3 & 248 | p >> 2 & 7) << 16;
                case 3:
                    p = e[g++] | e[g++] << 8;
                    q = 4278190080 | p >> 8 & 248 | p >> 13 & 7 | (p >> 3 & 252 | p >> 9 & 3) << 8 | (p << 3 & 248 | p >> 2 & 7) << 16;
                    break;
                case 6:
                case 7:
                    p = e[g++] | e[g++] << 8;
                    u = 4278190080 | p >> 8 & 248 | p >> 13 & 7 | (p >> 3 & 252 | p >> 9 & 3) << 8 | (p << 3 & 248 | p >> 2 & 7) << 16;
                    m -= 5;
                    break;
                case 9:
                    w = 3;
                    m = 2;
                    P = 3;
                    break;
                case 10:
                    w = 5, m = 2,
                        P = 5
            }
            t = m;
            for (n = 0; 0 < f;)switch (l >= a && (l = 0, b--, h = k, k = 0 + b * a), m) {
                case 0:
                    s && (z[k + l] = -1 == h ? u : z[h + l] ^ u | 4278190080, s = !1, f--, l++);
                    if (-1 == h) {
                        for (; 0 != (f & -8) && l + 8 < a;)for (var d = 0; 8 > d; d++)z[k + l] = 4278190080, f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = 4278190080, f--, l++
                    } else {
                        for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)z[k + l] = z[h + l], f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = z[h + l], f--, l++
                    }
                    break;
                case 1:
                    if (-1 == h) {
                        for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)z[k + l] = u, f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = u, f--, l++
                    } else {
                        for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)z[k +
                            l] = z[h + l] ^ u | 4278190080, f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = z[h + l] ^ u | 4278190080, f--, l++
                    }
                    break;
                case 2:
                    if (-1 == h) {
                        for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)n <<= 1, n &= 255, 0 == n && (w = 0 != P ? P & 255 : e[g++], n = 1), z[k + l] = 0 != (w & n) ? u : 4278190080, f--, l++;
                        for (; 0 < f && l < a;)n <<= 1, n &= 255, 0 == n && (w = 0 != P ? P & 255 : e[g++], n = 1), z[k + l] = 0 != (w & n) ? u : 4278190080, f--, l++
                    } else {
                        for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)n <<= 1, n &= 255, 0 == n && (w = 0 != P ? P & 255 : e[g++], n = 1), z[k + l] = 0 != (w & n) ? z[h + l] ^ u | 4278190080 : z[h + l], f--, l++;
                        for (; 0 < f && l < a;)n <<= 1, n &= 255, 0 == n && (w = 0 !=
                            P ? P & 255 : e[g++], n = 1), z[k + l] = 0 != (w & n) ? z[h + l] ^ u | 4278190080 : z[h + l], f--, l++
                    }
                    break;
                case 3:
                    for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)z[k + l] = q, f--, l++;
                    for (; 0 < f && l < a;)z[k + l] = q, f--, l++;
                    break;
                case 4:
                    for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)p = e[g++] | e[g++] << 8, z[k + l] = 4278190080 | p >> 8 & 248 | p >> 13 & 7 | (p >> 3 & 252 | p >> 9 & 3) << 8 | (p << 3 & 248 | p >> 2 & 7) << 16, f--, l++;
                    for (; 0 < f && l < a;)p = e[g++] | e[g++] << 8, z[k + l] = 4278190080 | p >> 8 & 248 | p >> 13 & 7 | (p >> 3 & 252 | p >> 9 & 3) << 8 | (p << 3 & 248 | p >> 2 & 7) << 16, f--, l++;
                    break;
                case 8:
                    for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)L ?
                        (z[k + l] = q, L = !1) : (z[k + l] = r, L = !0, f++), f--, l++;
                    for (; 0 < f && l < a;)L ? (z[k + l] = q, L = !1) : (z[k + l] = r, L = !0, f++), f--, l++;
                    break;
                case 13:
                    for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)z[k + l] = 4294967295, f--, l++;
                    for (; 0 < f && l < a;)z[k + l] = 4294967295, f--, l++;
                    break;
                case 14:
                    for (; 0 != (f & -8) && l + 8 < a;)for (d = 0; 8 > d; d++)z[k + l] = 4278190080, f--, l++;
                    for (; 0 < f && l < a;)z[k + l] = 4278190080, f--, l++
            }
        }
        return z
    }

    function Lb(a) {
        ba = a;
        vd = (a + 7) / 8 >> 0;
        switch (a) {
            case 16:
                Fa = Jc;
                ic = Kc;
                break;
            case 8:
                Fa = rd;
                break;
            case 32:
                Fa = sd;
                ic = ud;
                break;
            default:
                p.showMessage(a + " bit color is not supported anymore.")
        }
    }

    function rb(a, b) {
        A = a;
        F = b;
        H = U = 0;
        J = A - 1;
        I = F - 1
    }

    function Lc(a, b) {
        var c = wd[b.toLowerCase()];
        c ? p.writeScancode(a, c) : (c = b.length, 0 != c && (1 == c ? p.writeKeyCode(a, b.toUpperCase().charCodeAt(0)) : a && p.writeText(b)))
    }

    function Mb(a, b, c, e, g, h) {
        this.data = a;
        this.left = e;
        this.top = g;
        this.width = b;
        this.height = c;
        this.bitsperpixel = h;
        this.bytesperpixel = Math.floor((h + 7) / 8)
    }

    function jc() {
        var a, b = Array(5), c = Array(5);
        c[0] = null;
        for (var e = 0; 5 > e; e++)a = Array(600), a[0] = null, b[e] = a;
        this.putBitmap = function (a, h, e) {
            32767 == h ? (c[a] && (c[a].data =
                null, c[a] = null), c[a] = e) : (a = b[a], a[h] && (a[h].data = null, a[h] = null), a[h] = e)
        };
        this.getBitmap = function (a, h) {
            return 32767 == h ? c[a] : b[a][h]
        }
    }

    function kc(a) {
        var b = __svi18n.errorCode[a];
        b || (b = "error " + a);
        if (p.onerror)p.onerror({name: a, message: b});
        p.displayMsg && hi5.notifications.notify({msg: b});
        0 < svGlobal.log && console.error(b)
    }

    function xd() {
        this.style = this.yOrigin = this.xOrigin = 0;
        this.pattern = Array(8)
    }

    function yd() {
        this.bottom = this.top = this.right = this.left = 0
    }

    function zd() {
        this.action = this.offset = this.bottom =
            this.top = this.right = this.left = 0
    }

    function ve() {
        this.opcode = this.cy = this.cx = this.y = this.x = 0
    }

    function we(a, b) {
        this.size = a;
        this.data = b
    }

    function xe(a, b, c, e, g, h, k) {
        this.font = a;
        this.character = b;
        this.offset = c;
        this.baseLine = e;
        this.width = g;
        this.height = h;
        this.fontData = k
    }

    function ye() {
        this.opcode = this.backgroundColor = this.endY = this.endX = this.startY = this.startX = this.mixmode = 0;
        this.pen = new ze
    }

    function Ae() {
        this.cacheIDX = this.cacheID = this.colorTable = this.srcY = this.srcX = this.opcode = this.cy = this.cx = this.y = this.x =
            0
    }

    function Be() {
        this.foregroundColor = this.backgroundColor = this.opcode = this.cy = this.cx = this.y = this.x = 0;
        this.brush = new xd
    }

    function ze() {
        this.color = this.width = this.style = 0
    }

    function Ce() {
        this.dataSize = this.opcode = this.lines = this.foregroundColor = this.flags = this.y = this.x = 0;
        this.data = Array(256)
    }

    function De() {
        this.color = this.cy = this.cx = this.y = this.x = 0
    }

    function Ee() {
        this.srcY = this.srcX = this.opcode = this.cy = this.cx = this.y = this.x = 0
    }

    function Fe() {
        this.length = this.opcode = this.boxBottom = this.boxRight = this.boxTop =
            this.boxLeft = this.clipBottom = this.clipRight = this.clipTop = this.clipLeft = this.font = this.unknown = this.y = this.x = this.backgroundColor = this.foregroundColor = this.mixmode = this.flags = 0;
        this.text = null;
        this.textPos = 0
    }

    function sb() {
        this.orderType = 0;
        this.bounds = new yd;
        this.destBlt = new ve;
        this.patBlt = new Be;
        this.screenBlt = new Ee;
        this.line = new ye;
        this.rectangle = new De;
        this.deskSave = new zd;
        this.memBlt = new Ae;
        this.polyLine = new Ce;
        this.text2 = new Fe
    }

    function Ge() {
        xa = K = !1;
        ga = null;
        Zd();
        ha = new sb;
        eb = 0;
        Nb = Array(256);
        tb =
            new jc;
        for (var a = 0; 12 > a; a++)lc[a] = Array(256);
        Ob = Array(20);
        Na.reset()
    }

    function He(a) {
        if (!fb)return"";
        a = ya() + "/CLIP?s=" + fb + "&t=" + (new Date).getTime();
        var b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        b.send(null);
        return b.responseText
    }

    function Ie() {
        function a(a) {
            for (; 0 < a.ownerWinid;) {
                var b = g.getWinById(a.ownerWinid);
                if (b && b.isVisible())a = b; else break
            }
            return a
        }

        function b(a) {
            for (var b = a.titleInfo; 0 < a.ownerWinid;) {
                var c = g.getWinById(a.ownerWinid);
                c.titleInfo && (b = c.titleInfo)
            }
            return b
        }

        var c = [], e = (new Date).getTime(), g = this;
        this.addWin = function (a) {
            c.push(a)
        };
        this.popWins = function (a) {
            a = g.getWinById(a);
            var b = [];
            if (a) {
                a = 0 < a.ownerWinid ? a.ownerWinid : a.id;
                for (var e = c.length - 1; 0 <= e; e--)if (c[e].ownerWinid == a || c[e].id == a)b.push(c[e]), c.splice(e, 1)
            }
            return b
        };
        this.hasApp = function (a) {
            for (var b = 0, e = c.length; b < e; b++)if (c[b].appId == a)return!0;
            return!1
        };
        this.hasMain = !1;
        this.isNew = function () {
            return 3E4 > (new Date).getTime() - e
        };
        this.getAll = function () {
            return c
        };
        this.hasWin = function (a) {
            return 0 <= c.indexOf(a)
        };
        this.close = function () {
            for (var a = 0, b = c.length; a < b; a++)c[a].close()
        };
        this.clear = function () {
            c.length = 0
        };
        this.delWin = function (a) {
            for (var b = 0, e = c.length; b < e; b++)if (c[b].id == a)return c.splice(b, 1), b;
            return-1
        };
        this.isRunning = function () {
            var a, b = c.length;
            if (1 > b)return!1;
            for (var e = 0, b = c.length; e < b; e++)if (a = c[e], a.isVisible())return!0;
            return!1
        };
        this.getWinById = function (a) {
            var b, e = c.length;
            if (1 > e)return!1;
            for (var g = 0, e = c.length; g < e; g++)if (b = c[g], b.id == a)return b;
            return null
        };
        this.getTopWin = function (a) {
            var b = null, e, f = a.length;
            for (e = 0; e < f && (!(b = g.getWinById(a[e])) || !b.isVisible()); e++)b = null;
            if (!b)for (svGlobal.logger.warn("No win found"), f = c.length, e = f - 1; 0 <= e && (b = c[e], !b.isVisible()); e--)b = null;
            return b
        };
        this.getMain = function (b) {
            return(b = g.getTopWin(b)) ? a(b) : null
        };
        this.getOtherApps = function (e, k, m) {
            var f = c.length, f = c[f - 1].appId;
            if (m || !f)setTimeout(function () {
                g.getOtherApps(e, k)
            }, m || 3E3); else {
                f = g.getTopWin(e);
                m = 0 < f.ownerWinid ? f.ownerWinid : f.id;
                for (var n = [], l =
                    0, f = c.length; l < f; l++)c[l].ownerWinid != m && c[l].id != m && n.push(c[l]);
                for (var t = [], l = 0, f = n.length; l < f; l++)n[l].ownerWinid != m && n[l].id != m && (t.push({title: b(n[l]), win: a(n[l])}), m = 0 < n[l].ownerWinid ? n[l].ownerWinid : n[l].id);
                k(t)
            }
        }
    }

    function mc(a) {
        var b = {}, c = 0;
        this.fileService = a;
        this.read = function (e, g, h) {
            function k(b) {
                b.target.readyState == FileReader.DONE && (b = new Uint8Array(b.target.result), a.send(e, g, h, b), c += h, m.setProgress(c))
            }

            var m = y.getFocused().fileProgress, f = b[e];
            if ("undefined" != typeof f) {
                var n = f.name;
                1 > f.size ? p.showMessage(__svi18n.file.zero + n) : (f = f.slice(g, g + h), n = new FileReader, n.onloadend = k, n.readAsArrayBuffer(f))
            }
        };
        this.addFile = function (c) {
            if (!("slice"in c || (c.slice = c.webkitSlice || c.mozSlice, "slice"in c))) {
                p.showMessage(__svi18n.file.slice);
                return
            }
            var g = y.getFocused().fileProgress;
            "none" == g.style.display && (g.style.display = "block");
            var h = c.name;
            b[h] = c;
            g.maxValue += c.size;
            a.start(h, c.size)
        };
        this.confirmId = function (a, c) {
            b[a] = b[c]
        };
        this.close = function (a) {
            var g = y.getFocused(), h = g.fileProgress, k =
                b[a];
            if (k && (delete b[a], delete b[k.name], p.onfileuploaded))p.onfileuploaded(k.name);
            for (var m in b)return;
            c = h.maxValue = 0;
            h.style.display = "none";
            p.showMessage(__svi18n.file.uploadDone, g);
            g.refreshFiles();
            if (p.onuploaded)p.onuploaded()
        }
    }

    function ub(a) {
        if (ia && xa)for (var b = 0, c = a.length; b < c; b++)ia.addFile(a[b])
    }

    function Mc() {
        this.start = function (a, b) {
            B.send("3A0" + a + "\t" + b)
        };
        this.send = function (a, b, c, e) {
            B.send("3A3" + a + "\t" + b + "\t" + c + "\t" + hi5.Base64.enc(e))
        };
        this.remove = function (a) {
            B.send("3A6" + a)
        }
    }

    function Pb(a, b) {
        x ? x.resize(a, b) : x = new pd(a, b);
        return x
    }

    function Nc() {
        if (!K) {
            xa = !1;
            if (vb)B = vb; else {
                var a = s + "&width=" + A + "&height=" + F + "&server_bpp=" + ba + "&audio=" + ca.available + qd();
                0 > s.indexOf("waWidth") && (a += T ? "&waWidth=" + A + "&waHeight=" + F : "");
                var b = new Date, a = a + ("&tzOffset=" + b.getTimezoneOffset() + "&time=" + b.getTime());
                hi5.browser.binaryWS() && (a += "&binary=on");
                ja && (a += "&channelName=" + ja.name, ja.flags && (a += "&channelFlags=" + ja.flags));
                var c = window.opener;
                if (c) {
                    b = null;
                    try {
                        b = c.__sparkUser
                    } catch (e) {
                    }
                    b && (c = b.account, b =
                        b.session, c && (a += "&account=" + c), b && (a += "&session=" + b))
                }
                a += "&isTouch=" + (hi5.browser.isTouch && (1024 <= document.documentElement.clientWidth || 768 <= document.documentElement.clientHeight)) + "&pasteCap=" + (hi5.browser.isChrome && hi5.browser.isDesktop ? 3 : 0);
                B = new hi5.WebSocket(a);
                B.binaryType = "arraybuffer"
            }
            Qb.ws = B;
            svGlobal.logger.info(s);
            B.onopen = function (a) {
                svGlobal.logger.info("opened...");
                K = !0;
                B.send("87" + navigator.userAgent);
                if (p.onopen){
                    p.onopen()
                }
            };
            B.onmessage = Je;
            B.onclose = function (a) {
                svGlobal.logger.warn("closed, code=" +
                    a.code + " reason=" + a.reason);
                a = 0 == p.mode;
                !K && a && kc("connection");
                a = a && (K || za < p.reconnectTimes) && 0 < za && !Oa;
                K = !1;
                if (a)za--, p.showMessage(__svi18n.info.reconnecting + " " + (p.reconnectTimes - za) + "/" + p.reconnectTimes), setTimeout(Nc, 5); else {
                    la && la.stop();
                    try {
                        y && y.close()
                    } catch (b) {
                    }
                    window && window.$rdp && (window.$rdp = null);
                    if (p && p.onclose)p.onclose()
                }
            };
            B.onerror = Ke;
            if (a = y[y.length - 1])T ? a && (a.remoteApp = {exe: C.exe, args: C.args, dir: ""}) : cb(C.displayName || p.server, a.getWindow())
        }
    }

    function Ke(a) {
        svGlobal.logger.warn(a)
    }

    function gb(a) {
        a = hi5.Base64.dec(a, 0);
        ua.attach(a, 0, a.length);
        return ua
    }

    function Je(a) {
        var b, c = a.data;
        if ("string" != typeof c)switch (ua.attach(new Uint8Array(c), 0, c.byteLength), b = ua.getLittleEndian16(), b) {
            case 48:
                Oc(ua);
                break;
            case 49:
                Pc(ua);
                break;
            case 55:
                a = ua;
                switch (a.getByte()) {
                    case 0:
                        ea = a.getLittleEndian16();
                        Y = a.getLittleEndian16();
                        Z = a.getLittleEndian32();
                        a.skipPosition(6);
                        W = a.getLittleEndian16();
                        svGlobal.logger.info("Audio Format, tag=" + ea + " channels=" + Y + " bitsPerSample=" + W + " samplePerSec=" + Z);
                        hi5.browser.isFirefox &&
                        (Aa = new nc(p.audioBuffer));
                        break;
                    case 1:
                        Le(a)
                }
                break;
            case 60:
                oc(ua);
                break;
            case 63:
                ja && ja.process && ja.process(ua);
                break;
            default:
                svGlobal.logger.warn("@TODO:" + b + "\n")
        } else switch (b = parseInt(c.substring(0, 2), 16), a = c.substring(2), b) {
            case 15:
                Oa = !1;
                za = p.reconnectTimes;
                ha = new sb;
                if (ja && ja.onopen)ja.onopen();
                break;
            case 26:
                b = JSON.parse(a);
                if (b.name) {
                    svGlobal.logger.info("msg=" + a);
                    if (p.onerror)p.onerror(b);
                    a = __svi18n.errorCode["S" + b.name] || "";
                    a += b.message;
                    p.showMessage(a);
                    Oa = !0
                } else 0 < svGlobal.log && console.erro("No error code for message:" +
                    a);
                break;
            case 27:
                !1 != hi5.appcfg.drawLicense && y.drawLicense(a);
                break;
            case 48:
                Oc(gb(a));
                break;
            case 49:
                Pc(gb(a));
                break;
            case 50:
                b = parseInt(a.substring(0, 1), 10);
                a = a.substring(1);
                switch (b) {
                    case 1:
                        Me(a);
                        break;
                    case 2:
                        !(b = y.getFocused()) || b.processClipReq(a) || Qc || !C || C.leagacyMode || (p.showMessage(__svi18n.info.menucopy), Qc = !0)
                }
                break;
            case 51:
                y.setReadOnly("1" == a);
                break;
            case 54:
                b = a.split("\t");
                a = ya() + b[0];
                svGlobal.logger.info("Downloading file:" + a + " name:" + b[1] + " driver:" + b[2]);
                p.onprintingready && p.onprintingready({link: a,
                    printerName: b[1], pinterDriver: b[2]}) || (b = y.getFocused()) && b.showPDF(a);
                break;
            case 55:
                b = parseInt(a.substring(0, 1), 16);
                a = a.substring(1);
                switch (b) {
                    case 0:
                        a = a.split("\t");
                        ea = parseInt(a[0], 10);
                        Y = parseInt(a[1], 10);
                        W = parseInt(a[2], 10);
                        Z = parseInt(a[3], 10);
                        svGlobal.logger.debug("Audio Format, tag=" + ea + " channels=" + Y + " bitsPerSample=" + W + " samplePerSec=" + Z);
                        hi5.browser.isFirefox && (Aa || (Aa = new nc(p.audioBuffer)));
                        break;
                    case 1:
                        Ne(a)
                }
                break;
            case 56:
                a = JSON.parse(a);
                fb = a.session;
                a.server = p.server;
                if (b = hi5.$("joinSelect"))b.value =
                    a.joinMode;
                if (b = hi5.$("requestControl"))b.disabled = a.hasControl;
                b = hi5.appcfg.page && hi5.appcfg.page.join || "join.html";
                b = location.protocol + "//" + location.host + "/" + b + "?id=" + a.numericId;
                var e = a.webAddress;
                e && 0 < e.length && (c = e.indexOf("://"), e = e.substring(c + 3), c = e.indexOf("/"), 0 < c && (e = e.substring(0, c)), e.toLowerCase() != location.host.toLowerCase() && (b += "&gateway=" + e));
                a.joinLink = b;
                p.sessionInfo.appInfo = a;
                a.ver && a.ver != svGlobal.version && console.log("Client:" + svGlobal.version + " server:" + a.ver);
                if (p.onsessionstart)p.onsessionstart(p.sessionInfo);
                break;
            case 57:
                b = a.split("\t");
                svGlobal.logger.debug(a);
                if (a = y.getWinById(parseInt(b[0]))) {
                    if (!y.hasApp(b[1]) && p.onremoteappstart)p.onremoteappstart({id: b[1]});
                    a.appId = b[1]
                }
                break;
            case 58:
                b = a;
                a = parseInt(b.charAt(0), 10);
                b = b.substring(1);
                if (5 == a)Qb.notifyFiles(JSON.parse(b)); else if (ia)switch (b = b.split("\t"), a) {
                    case 1:
                        ia.confirmId(b[0], b[1]);
                        break;
                    case 2:
                        ia.read(b[0], parseInt(b[1], 10), parseInt(b[2], 10));
                        break;
                    case 4:
                        ia.close(b[0])
                }
                break;
            case 59:
                a = hi5.Base64.dec(a, 0);
                a = (new RdpBuffer(a, 0, a.length)).getLittleEndian32();
                !Pa && a & 16 ? a & 128 && (ia = null, y.execute("disableUpload", [null])) : (Rb = !1, ia = null, y.execute("setFileHandler", [null]));
                a & 64 && (b = __svi18n.info.recording) && (p.displayMsg && hi5.notifications.notify({msg: b}), svGlobal.logger.info(b));
                a & 256 || y.execute("disableShadow", [null]);
                break;
            case 60:
                oc(gb(a));
                break;
            case 61:
                a = JSON.parse(a);
                switch (a.type) {
                    case 0:
                        rb(a.width, a.height);
                        x = Pb(A, F);
                        Lb(a.color);
                        if (b = a.server)p.server = a.server;
                        pc = a.length;
                        c = y.getFocused();
                        T = !0 == a.isRail;
                        c && (c.setAutoScale(!T), c.setSize(A, F, T ? "hidden" :
                            null), b && cb(C.displayName || p.server, c.getWindow()), b = a.keyboard, "undefined" != typeof b && 0 == b && c.setUnicode(!0), b = a.mapDisk) && (Rb = !0, c.setFileHandler(ub), ia || (ia = new mc(new Mc)));
                        if (p.onopened)p.onopened(a);
                        break;
                    case 1:
                        if (a = a.duration, p.onprogress)p.onprogress(a, pc)
                }
                break;
            case 62:
                Oe(a);
                break;
            case 63:
                a = gb(a);
                ja && ja.process && ja.process(a);
                break;
            default:
                svGlobal.logger.warn("@TODO:" + c + "\n")
        }
    }

    function Pe(a, b) {
        var c = 0, e = !1;
        this.width = a;
        this.interval = b;
        var g = this, h = 0;
        this.start = function () {
            e || (e = !0, c = setInterval(function () {
                var a =
                    y.getFocused();
                a && K && (a = a.getThumbnail(g.width), a.length != h && (B.send("8E7" + a), h = a.length))
            }, g.interval))
        };
        this.stop = function () {
            clearInterval(c)
        }
    }

    function Qe(a, b) {
        !la || la.width == a && la.interval == b || (la.stop(), la = null);
        la || (la = new Pe(a, b));
        la.start()
    }

    function Oe(a) {
        var b = parseInt(a.substring(0, 1), 16), c, e = a.substring(1);
        a = !1;
        switch (b) {
            case 0:
                c = JSON.parse(e);
                Ge();
                K = !0;
                b = c.width;
                a = c.height;
                if (b == A && a == F)break;
                rb(b, a);
                y.setSize(b, a, T ? "hidden" : null);
                x = Pb(b, a);
                break;
            case 1:
                qc = p.reconnectOnResize;
                p.reconnectOnResize = !1;
                c = JSON.parse(e);
                p.onsessionjoin && (a = p.onsessionjoin(c));
                if (a)break;
                p.showMessage(__svi18n.info.joinsession.applyArgs([c.numericId, c.__ip, c.name]));
                break;
            case 2:
                c = JSON.parse(e);
                0 == c.joined && (p.reconnectOnResize = qc);
                p.onsessionexit && (a = p.onsessionexit(c));
                if (a)break;
                p.showMessage(__svi18n.info.exitsession.applyArgs([c.numericId, c.__ip, c.name]));
                break;
            case 3:
                y.setReadOnly(!1);
                if (b = hi5.$("requestControl"))b.disabled = !0;
                p.ongivecontrol && (a = p.ongivecontrol());
                if (a)break;
                p.showMessage(__svi18n.info.givecontrol);
                break;
            case 4:
                y.setReadOnly(!0);
                if (b = hi5.$("requestControl"))b.disabled = !1;
                p.ontakebackcontrol && (a = p.ontakebackcontrol());
                if (a)break;
                p.showMessage(__svi18n.info.nocontrol);
                break;
            case 5:
                c = JSON.parse(e);
                p.onrequirecontrol && (a = p.onrequirecontrol(c));
                if (a)break;
                b = __svi18n.info.title.applyArgs([c.name, c.numericId, c.__ip]);
                hi5.notifications.notify({title: b, msg: "Requesting control.", cbYes: function () {
                    p.giveControl(c.numericId);
                    this.destroy()
                }, cbNo: function () {
                    p.refuseControl(c.numericId);
                    this.destroy()
                }});
                break;
            case 6:
                y.execute("setTouchRemoting", [!0]);
                break;
            case 7:
                c = JSON.parse(e);
                c.width & c.height && (p.reconnectOnResize = !1, x = Pb(c.width, c.height), rb(c.width, c.height), y.setSize(c.width, c.height), svGlobal.logger.warn("Resolution changed, width:" + c.width + " height:" + c.height));
                c.color && (Lb(c.color), svGlobal.logger.warn("Color depth changed to:" + c.color));
                break;
            case 8:
                c = JSON.parse(e);
                Oa = !0;
                if (p.onrequestcredential && p.onrequestcredential(c))break;
                y.getFocused().requestCredential(c);
                break;
            case 9:
                c = JSON.parse(e),
                    0 < c.interval && 0 < c.width ? Qe(c.width, c.interval) : la && la.stop()
        }
    }

    function oc(a) {
        switch (a.getByte()) {
            case 32:
                a.getLittleEndian16();
                var b = a.getLittleEndian16();
                a = a.getLittleEndian16();
                y.getFocused().moveCursor(b, a, !0)
        }
    }

    function Ne(a) {
        function b(a) {
            var b = 0;
            a *= k;
            for (f = 0; f < k; f++)b |= (h[a + f] & 255) << 8 * f;
            b > n ? (b -= t, b /= -l) : b /= n;
            return b
        }

        function c(a) {
            return function () {
                B.send("8A" + a)
            }
        }

        if (ca.available) {
            var e = a.indexOf("\t"), g = a.substring(0, e), h = hi5.Base64.dec(a, e + 1);
            1 != ea && (Ga || (Ga = new Gc), h = Ga.decode(h, 0, h.length));
            a = W;
            var k = a >> 3, m = Math.floor(h.length / k), f = 0, n = Math.pow(2, a - 1) - 1, l = -n - 1, t = Math.pow(2, a);
            a = 0;
            if (hi5.browser.isFirefox) {
                e = Array(m);
                e[0] = 0.1;
                for (a = 0; a < m; a++)e[a] = b(a);
                a = Aa.add(e);
                setTimeout(c(g), a - 1E3 * ca.delay)
            } else {
                var e = Y, m = Math.floor(m / e), p = ca.getBuffer(m), r = p.getChannelData(0), q = p.getChannelData(1);
                for (a = 0; a < m;) {
                    var w = 2 * a, u = b(w);
                    1 == e ? (r[a] = u, q[a] = u) : (r[a] = u, q[a] = b(w + 1));
                    a++
                }
                a = ca.playBuffer(p);
                setTimeout(c(g), 1E3 * (a - ca.delay))
            }
        }
    }

    function Le(a) {
        function b(a) {
            return function () {
                B.send("8A" + a)
            }
        }

        if (ca.available) {
            var c =
                a.getByte() + "," + a.getLittleEndian16() + "," + a.getLittleEndian64(), e = a.getPosition(), g = a.getData(), h = a.getEnd() - e;
            if (a = 1 != ea)Ga || (Ga = new Gc), g = Ga.decode(g, e, h), e = 0, h = g.length;
            var k = W, m = Math.floor(h / (k >> 3)), f = h = 0, n = 0;
            a || (h = Math.pow(2, k - 1) - 1, f = -h - 1, n = Math.pow(2, k));
            var l = k = 0;
            if (!ca.supportWebAudio && hi5.browser.isFirefox) {
                var t = Array(m);
                t[0] = 0.1;
                if (a)for (k = 0; k < m; k++)t[k] = g[e++]; else for (k = 0; k < m; k++)l = g[e++] | g[e++] << 8, l > h ? (l -= n, l /= -f) : l /= h, t[k] = l;
                g = Aa.add(t);
                setTimeout(b(c), g - 1E3 * ca.delay)
            } else {
                var t = Y,
                    m = Math.floor(m / t), p = ca.getBuffer(m), r = p.getChannelData(0), q = p.getChannelData(1), k = 0;
                if (a)for (; k < m;)1 == t ? q[k] = r[k] = g[e++] : (r[k] = g[e++], q[k] = g[e++]), k++; else for (; k < m;)l = g[e++] | g[e++] << 8, l > h ? (l -= n, l /= -f) : l /= h, 1 == t ? r[k] = l : (r[k] = l, l = g[e++] | g[e++] << 8, l > h ? (l -= n, l /= -f) : l /= h), q[k] = l, k++;
                g = ca.playBuffer(p);
                Pa || setTimeout(b(c), 1E3 * (g - ca.delay))
            }
        }
    }

    function nc(a) {
        var b = [], c, e, g, h = new Re(Y, Z, function (b) {
            var c = b.length, g = c > k.size();
            if (e || g)k.stop(), setTimeout(function () {
                k.start()
            }, 1E3 * a); else for (g = 0; g < c; g++)b[g] =
                k.pull()
        }), k = this;
        this.delay = a;
        this.reset = function () {
            c = b.length = 0;
            e = !0;
            h.stop();
            g = 0
        };
        this.reset();
        this.start = function () {
            e && (h.start(), e = !1)
        };
        this.stop = function () {
            h.stop();
            e = !0
        };
        this.size = function () {
            for (var a = b.length, c = 0, e = 0; e < a; e++)c += b[e].length;
            return c
        };
        this.add = function (c) {
            var e = (new Date).getTime();
            g < e && (g = e);
            g += c.length / (Z * Y) * 1E3;
            var k = b.length;
            b[k] = c;
            0 == k && (e = (new Date).getTime(), setTimeout(function () {
                h.start()
            }, 1E3 * a));
            return g - e
        };
        this.pull = function () {
            if (0 == b.length)return null;
            var a = b[0];
            if (c < a.length)return a[c++];
            b.shift();
            c = 0;
            return this.pull()
        }
    }

    function Re(a, b, c) {
        function e() {
            var a;
            if (m) {
                a = g.mozWriteAudio(m.subarray(f));
                h += a;
                f += a;
                if (f < m.length)return;
                m = null
            }
            a = g.mozCurrentSampleOffset() + k - h;
            if (0 < a) {
                var b = new Float32Array(a);
                c(b);
                a = g.mozWriteAudio(b);
                a < b.length && (m = b, f = a);
                h += a
            }
        }

        var g = new Audio;
        g.mozSetup(a, b);
        var h = 0, k = a * Math.floor(b / 2), m = null, f = 0, n = null;
        this.start = function () {
            n = setInterval(e, 100)
        };
        this.stop = function () {
            n && clearInterval(n)
        }
    }

    function ya() {
        var a = s.indexOf("://"), b =
            s.substring(a + 3), a = b.indexOf("/");
        0 < a && (b = b.substring(0, a));
        return location.protocol + "//" + b
    }

    function Se(a) {
        if (p.openLink) {
            var b = a;
            a = a.toLowerCase();
            var c = 0 == a.indexOf("http://") || 0 == a.indexOf("https://") || 0 == a.indexOf("ftp://") || 0 == a.indexOf("mailto:") || 0 == a.indexOf("tel:") || 0 == a.indexOf("callto:");
            c || (0 == a.indexOf("www.") ? c = !0 : 0 == a.indexOf("ftp.") && (c = !0));
            !c || p.onurlredirection && p.onurlredirection(c) || (a = y.getFocused()) && a.processLink(b)
        }
    }

    function Me(a) {
        svGlobal.logger.info("....... copy to clip:" +
            a);
        p.onservercopy && p.onservercopy(a) || (y.copyToClip(a), setTimeout(function () {
            B.send("883")
        }, 999), Se(a))
    }

    function Oc(a) {
        a.getLittleEndian16();
        var b = a.getByte(), c = a.getByte(), e = a.getLittleEndian16(), g = null;
        0 != (c & 32) ? (e -= 18, Na.dec(a.getData(), a.getPosition(), e, c), g = Na.getData()) : g = a;
        switch (b) {
            case 2:
                var h = g, k = h.getLittleEndian16();
                switch (k) {
                    case 0:
                        h.skipPosition(2);
                        k = h.getLittleEndian16();
                        h.skipPosition(2);
                        Rc(h, k);
                        break;
                    case 1:
                        Sc(h);
                        break;
                    case 2:
                        rc(h);
                        break;
                    case 3:
                        break;
                    default:
                        svGlobal.logger.warn("Unimplemented Update type " +
                            k)
                }
                break;
            case 20:
                break;
            case 31:
                break;
            case 27:
                var h = g, m = k = k = 0, k = h.getLittleEndian16();
                h.skipPosition(2);
                switch (k) {
                    case 3:
                        k = h.getLittleEndian16();
                        m = h.getLittleEndian16();
                        y.getFocused().moveCursor(k, m, !0);
                        break;
                    case 6:
                        Qa(h, 24);
                        break;
                    case 7:
                        Tc(h);
                        break;
                    case 1:
                        h = h.getLittleEndian16();
                        switch (h) {
                            case 0:
                                y.setCursor("default");
                                break;
                            default:
                                svGlobal.logger.warn("XXX system pointer message " + h)
                        }
                        break;
                    case 8:
                        k = h.getLittleEndian16(), Qa(h, k)
                }
                break;
            case 34:
                break;
            case 38:
                a = g;
                b = a.getLittleEndian32();
                if (3 > b)try {
                    m =
                        p.sessionInfo;
                    switch (b) {
                        case 0:
                            a.skipPosition(4);
                            m.domain = a.getUnicodeString(52, !0);
                            a.skipPosition(4);
                            m.userName = a.getUnicodeString(512, !0);
                            m.sessionId = a.getLittleEndian32();
                            break;
                        case 1:
                            m.version = a.getLittleEndian16(), a.skipPosition(4), m.sessionId = a.getLittleEndian32(), h = a.getLittleEndian32(), k = a.getLittleEndian32(), a.skipPosition(558), m.domain = a.getUnicodeString(h, !0), m.userName = a.getUnicodeString(k, !0)
                    }
                    sc()
                } catch (f) {
                } else if (3 == b && (a.skipPosition(2), h = a.getLittleEndian32(), a.skipPosition(4), 2 !=
                    h)) {
                    a.getLittleEndian32();
                    a.skipPosition(4);
                    h = {};
                    h.logId = a.getLittleEndian32();
                    h.time = (new Date).getTime();
                    p.sessionInfo.sessionId = h.logId;
                    sc();
                    k = a.getBytes(16);
                    m = Array(16);
                    for (a = 0; 16 > a; a++)m[a] = k[a] & 255;
                    h.random = m;
                    k = "8D" + h.logId + "\t" + hi5.Base64.enc(m);
                    p.sessionInfo.userName && (k += "\t" + p.sessionInfo.userName, p.sessionInfo.domain && (k += "\t" + p.sessionInfo.domain));
                    B.send(k);
                    if ("sessionStorage"in window)try {
                        sessionStorage[Ic()] = JSON.stringify(h)
                    } catch (n) {
                    }
                }
                break;
            case 40:
                B.send("8E50");
                break;
            case 47:
                Oa = !0;
                h = g.getLittleEndian32();
                svGlobal.logger.info("Disconnect:" + h);
                1 > h || kc(h.toString(16).toUpperCase());
                break;
            case 54:
                h = g.getLittleEndian32().toString(16).toUpperCase();
                h = __svi18n.serverStatus[h];
                p.displayMsg && console.log(h);
                break;
            case 55:
                break;
            default:
                svGlobal.logger.warn("Unimplemented Data PDU type " + b)
        }
    }

    function sc() {
        if (!xa && p.onloggedin)p.onloggedin();
        xa = !0
    }

    function Pc(a) {
        var b = a.getByte(), c = b & 15, e = b >> 4 & 3, g, h = 0;
        2 == (b >> 6 & 3) && (h = a.getByte());
        g = a.getLittleEndian16();
        b = null;
        0 != (h & 32) ? (Na.dec(a.getData(),
            a.getPosition(), g, h), b = Na.getData(), g = Na.getDecompressedLength()) : b = a;
        if (0 != e)switch (e) {
            case 2:
            case 3:
                Sb.addFragement(b, g);
                return;
            case 1:
                Sb.addFragement(b, g), b = Sb.clearFragements()
        }
        switch (c) {
            case 0:
                a = b.getLittleEndian16();
                Rc(b, a);
                break;
            case 1:
                b.skipPosition(2);
                Sc(b);
                break;
            case 2:
                b.skipPosition(2);
                rc(b);
                break;
            case 3:
                break;
            case 4:
                a = b;
                for (c = a.getEnd(); a.getPosition() < c;)switch (e = a.getLittleEndian16(), e) {
                    case 1:
                    case 6:
                        h = a.getLittleEndian16();
                        b = a.getLittleEndian16();
                        a.getLittleEndian16();
                        a.getBigEndian16();
                        var e = a, k = e.getByte();
                        e.skipPosition(2);
                        var m = e.getByte(), f = e.getLittleEndian16(), n = e.getLittleEndian16(), l = e.getLittleEndian32(), t = void 0;
                        g = e.getPosition() + l;
                        switch (m) {
                            case 0:
                                k = td(e.getData(), l, e.getPosition());
                                t = Array(k.length);
                                Uc(k, 0, t, f, n, 1);
                                x.setRGBs(h, b, f, n, t, 0, f);
                                x.postPaint(h, b, f, n);
                                break;
                            case 1:
                                $d(e, k, f, n, Tb);
                                k = Tb.getData();
                                t = Tb.getDataSize();
                                t = Array(t);
                                Uc(k, 0, t, f, n, 1);
                                x.setRGBs(h, b, f, n, t, 0, f);
                                x.postPaint(h, b, f, n);
                                break;
                            case 3:
                                for (var m = Te.decode(e, l), f = new db(0, 0, 0, 0), n = m.getRects(), t = m.getTiles(),
                                         k = m.getTileSize(), m = m.getRectSize(), p = l = 0; p < k; p++)for (var r = t[p], q = 0; q < m; q++)n[q].intersection(r.x, r.y, 64, 64, f), f.isEmpty() || (l = 64 * (f.y - r.y) + (f.x - r.x), f.x += h, f.y += b, x.setRGBs(f.x, f.y, f.width, f.height, r.data, l, 64), x.postPaint(f.x, f.y, f.width, f.height))
                        }
                        e.setPosition(g);
                        break;
                    case 4:
                        h = a;
                        e = h.getLittleEndian16();
                        h = h.getLittleEndian32();
                        1 == e && B.send("91" + h);
                        break;
                    default:
                        svGlobal.logger.warn("Invalid surface cmd:" + e)
                }
                x.commitPaint();
                break;
            case 5:
                y.setCursor("default");
                break;
            case 6:
                break;
            case 8:
                break;
            case 9:
                Qa(b,
                    24);
                break;
            case 10:
                Tc(b);
                break;
            case 11:
                a = b;
                c = a.getLittleEndian16();
                Qa(a, c);
                break;
            default:
                svGlobal.logger.warn("XXX RDP5 opcode " + c)
        }
    }

    function Uc(a, b, c, e, g, h) {
        h *= e;
        for (var k = 0; k < g; k++)e = b + (g - k - 1) * h, ta(a, e, c, k * h, h)
    }

    function tc(a, b, c) {
        var e = a, g = c, h = 0, k = 8, m = b;
        this.attach = function (a, b, c) {
            e = a;
            g = c;
            h = 0;
            k = 8;
            m = b
        };
        this.getBits = function (a) {
            for (var b = 0, c = 0; h < g && 0 < a;)b = a, b > k && (b = k), 0 != c && (c <<= b), c |= e[h + m] >> k - b & (1 << b) - 1, k -= b, a -= b, 0 == k && (k = 8, h++);
            return c
        };
        this.putBits = function (a, b) {
            for (var c = b, t = 0; h < g && 0 < c;)t = c,
                t > k && (t = k), e[h + m] |= (a >> c - t & (1 << t) - 1) << k - t, k -= t, c -= t, 0 == k && (k = 8, h++)
        };
        this.eos = function () {
            return h > g
        };
        this.left = function () {
            return h >= g ? 0 : 8 * (g - h - 1) + k
        };
        this.getProcessBytes = function () {
            return 8 > k ? h + 1 : h
        }
    }

    function uc() {
        this.y = this.x = this.CrLen = this.CbLen = this.YLen = this.quantIdxCr = this.quantIdxCb = this.quantIdxY = 0;
        this.data = ka(4096);
        this.data[0] = 0;
        var a = this;
        this.readHeaderfromStream = function (b) {
            b.skipPosition(6);
            a.quantIdxY = b.getByte();
            a.quantIdxCb = b.getByte();
            a.quantIdxCr = b.getByte();
            a.x = 64 * b.getLittleEndian16();
            a.y = 64 * b.getLittleEndian16();
            a.YLen = b.getLittleEndian16();
            a.CbLen = b.getLittleEndian16();
            a.CrLen = b.getLittleEndian16()
        }
    }

    function Ue() {
        function a(a, g, h, k, m, f, n) {
            h = a.et;
            var l = 4096, t = a.bitStream, p, r, q;
            null == t ? t = new tc(k, m, f) : t.attach(k, m, f);
            var w = 0;
            p = 1;
            k = p << 3;
            m = 1;
            for (f = m << 3; !t.eos() && 0 < l;)if (0 != p) {
                for (; !t.eos();) {
                    r = t.getBits(1);
                    if (0 != r)break;
                    q = p = 1 << p;
                    q > l && (q = l);
                    0 < q && (sa(n, w, w + q, 0), w += q);
                    l -= p;
                    k += 4;
                    80 < k && (k = 80);
                    0 > k && (k = 0);
                    p = k >> 3
                }
                q = p = t.getBits(p);
                q > l && (q = l);
                0 < q && (sa(n, w, w + q, 0), w += q);
                l -= p;
                p = t.getBits(1);
                q = 0;
                do if (r = t.getBits(1), 1 == r)q++; else break; while (1);
                r = t.getBits(m);
                r |= q << m;
                0 == q ? (f += -2, 80 < f && (f = 80), 0 > f && (f = 0), m = f >> 3) : 1 != q && (f += q, 80 < f && (f = 80), 0 > f && (f = 0), m = f >> 3);
                q = r + 1;
                0 < l && (n[w++] = 0 != p ? -q : q);
                l--;
                k += -6;
                80 < k && (k = 80);
                0 > k && (k = 0);
                p = k >> 3
            } else {
                q = 0;
                do if (r = t.getBits(1), 1 == r)q++; else break; while (1);
                r = t.getBits(m);
                r |= q << m;
                0 == q ? (f += -2, 80 < f && (f = 80), 0 > f && (f = 0), m = f >> 3) : 1 != q && (f += q, 80 < f && (f = 80), 0 > f && (f = 0), m = f >> 3);
                q = r;
                if (1 != h) {
                    var u = q;
                    for (r = 0; 0 != u;)u >>= 1, r++;
                    r = t.getBits(r);
                    q -= r;
                    0 != r && 0 != q ? (k += -6, 80 < k && (k = 80),
                        0 > k && (k = 0), p = k >> 3) : 0 == r && 0 == q && (k += 6, 80 < k && (k = 80), 0 > k && (k = 0), p = k >> 3);
                    0 < l && (n[w++] = 0 != (r & 1) ? -1 * (r + 1 >> 1) : r >> 1);
                    l--;
                    0 < l && (n[w++] = 0 != (q & 1) ? -1 * (q + 1 >> 1) : q >> 1);
                    l--
                } else 0 == q ? (0 < l && (n[w++] = 0), l--, k += 3) : (0 < l && (n[w++] = 0 != (q & 1) ? -1 * (q + 1 >> 1) : q >> 1), l--, k += -3), 80 < k && (k = 80), 0 > k && (k = 0), p = k >> 3
            }
            h = 64;
            l = 4032;
            for (t = 4033; 1 < h; l++, t++, h--)n[t] += n[l];
            c(n, 0, 4096, 5);
            c(n, 0, 1024, g[8] - 6);
            c(n, 1024, 1024, g[7] - 6);
            c(n, 2048, 1024, g[9] - 6);
            c(n, 3072, 256, g[5] - 6);
            c(n, 3328, 256, g[4] - 6);
            c(n, 3584, 256, g[6] - 6);
            c(n, 3840, 64, g[2] - 6);
            c(n, 3904, 64, g[1] -
                6);
            c(n, 3968, 64, g[3] - 6);
            c(n, 4032, 64, g[0] - 6);
            a = a.dwtBuffer;
            b(n, 3840, a, 8);
            b(n, 3072, a, 16);
            b(n, 0, a, 32)
        }

        function b(a, b, c, k) {
            var m, f, n, l, t, p, r, q, w, u;
            r = k << 1;
            p = b + k * k * 3;
            n = b;
            m = 0;
            l = b + k * k;
            t = b + k * k * 2;
            f = k * k * 2;
            for (w = 0; w < k; w++) {
                c[m] = a[p] - (a[n] + a[n] + 1 >> 1) << 16 >> 16;
                c[f] = a[l] - (a[t] + a[t] + 1 >> 1) << 16 >> 16;
                for (u = 1; u < k; u++)q = u << 1, c[m + q] = a[p + u] - (a[n + u - 1] + a[n + u] + 1 >> 1) << 16 >> 16, c[f + q] = a[l + u] - (a[t + u - 1] + a[t + u] + 1 >> 1) << 16 >> 16;
                for (u = 0; u < k - 1; u++)q = u << 1, c[m + q + 1] = (a[n + u] << 1) + (c[m + q] + c[m + q + 2] >> 1) << 16 >> 16, c[f + q + 1] = (a[t + u] << 1) + (c[f + q] + c[f +
                    q + 2] >> 1) << 16 >> 16;
                q = u << 1;
                c[m + q + 1] = (a[n + u] << 1) + c[m + q] << 16 >> 16;
                c[f + q + 1] = (a[t + u] << 1) + c[f + q] << 16 >> 16;
                p += k;
                n += k;
                m += r;
                l += k;
                t += k;
                f += r
            }
            for (q = 0; q < r; q++) {
                for (u = 0; u < k; u++)w = u << 1, m = b + w * r + q, f = u * r + q, n = f + k * r, a[m] = c[f] - ((0 < u ? c[n - r] : c[n]) + c[n] + 1 >> 1) << 16 >> 16;
                for (u = 0; u < k; u++)w = u << 1, m = b + w * r + q, f = u * r + q, n = f + k * r, v = (c[n] << 1) + (a[m] + a[m + (u < k - 1 ? 2 * r : 0)] >> 1), a[m + r] = (c[n] << 1) + (a[m] + a[m + (u < k - 1 ? 2 * r : 0)] >> 1) << 16 >> 16
            }
        }

        function c(a, b, c, k) {
            if (0 != k)for (; 0 < c; b++, c--)a[b] <<= k
        }

        this.decodeRgb = function (b, c, h, k, m, f, n, l, t, p) {
            a(b, h, m, c.getData(),
                c.getPosition(), k, b.yrBuffer);
            c.skipPosition(k);
            a(b, h, n, c.getData(), c.getPosition(), f, b.cbgBuffer);
            c.skipPosition(f);
            a(b, h, t, c.getData(), c.getPosition(), l, b.crbBuffer);
            c.skipPosition(l);
            c = b.yrBuffer;
            h = b.cbgBuffer;
            k = b.crbBuffer;
            for (f = 0; 4096 > f; f++)n = c[f], l = h[f], t = k[f], n = n + 4096 << 16, m = n + 91947 * t, t = n - 22544 * l - 46792 * t, n += 115998 * l, m >>= 21, t >>= 21, n >>= 21, c[f] = 0 > m ? 0 : 255 < m ? 255 : m, h[f] = 0 > t ? 0 : 255 < t ? 255 : t, k[f] = 0 > n ? 0 : 255 < n ? 255 : n;
            c = b.yrBuffer;
            h = b.cbgBuffer;
            b = b.crbBuffer;
            for (k = 0; 4096 > k; k++)p[k] = 4278190080 | b[k] << 16 | h[k] <<
                8 | c[k]
        }
    }

    function Ve() {
        var a = [new db], b = [new uc], c = 0, e = 0;
        this.resetRects = function (b) {
            if (a.length < b) {
                var e = a.length;
                for (a.length = b; e < b; e++)a[e] = new db
            }
            c = b;
            return a
        };
        this.resetTiles = function (a) {
            if (b.length < a) {
                var c = b.length;
                for (b.length = a; c < a; c++)b[c] = new uc
            }
            e = a;
            return b
        };
        this.getRectSize = function () {
            return c
        };
        this.getTileSize = function () {
            return e
        };
        this.getRects = function () {
            return a
        };
        this.getTiles = function () {
            return b
        }
    }

    function We() {
        this.ctxId = 0;
        this.tileSize = 64;
        this.qt = this.et = this.xft = this.cct = this.flags =
            0;
        this.yrBuffer = M(4096);
        this.yrBuffer[0] = 0;
        this.cbgBuffer = M(4096);
        this.cbgBuffer[0] = 0;
        this.crbBuffer = M(4096);
        this.crbBuffer[0] = 0;
        this.dwtBuffer = M(4096);
        this.dwtBuffer[0] = 0;
        var a = this;
        this.setProperties = function (b) {
            a.flags = b & 7;
            a.cct = b >> 3 & 3;
            a.xft = b >> 5 & 15;
            a.et = b >> 9 & 15
        };
        this.bitStream = new tc
    }

    function Tc(a) {
        a = a.getLittleEndian16();
        (a = Vc(a)) && y.setCursor(a)
    }

    function Xe(a, b, c, e, g, h, k, m) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = e;
        this.mask = g;
        this.pixel = h;
        this.bpp = k;
        this.cache_idx = m
    }

    function Qa(a, b) {
        if (!Ye) {
            var c =
                0, e = 0, g = 0, h = 0, k = 0, m = 0, f = 0, k = a.getLittleEndian16(), c = a.getLittleEndian16(), e = a.getLittleEndian16(), g = a.getLittleEndian16(), h = a.getLittleEndian16(), m = a.getLittleEndian16(), f = a.getLittleEndian16(), f = a.getBytes(f), n = a.getBytes(m);
            if (0 > c || c >= g - 1)c = 0;
            0 > e ? e = 0 : e >= h && (e = h - 1);
            for (var l = !0, t = 0; t < m; t++)if (-1 != n[t]) {
                l = !1;
                break
            }
            if (!l) {
                for (var f = new Xe(c, e, g, h, n, f, b, k), e = f.x, g = f.y, h = f.width, m = f.height, c = f.cache_idx, n = f.mask, l = f.pixel, t = f.bpp, f = Array(h * m), p = f[0] = 0, r = !0, q = n.length, w = 0; w < q; w++)if (0 != n[w]) {
                    r = !1;
                    break
                }
                for (var u =
                    0, w = 0; w < m; w++)for (q = 0; q < h; q++) {
                    f[p] = Ze(q, w, h, m, t, l);
                    if (!r)if (u = w, 1 != t && (u = m - u - 1), u = u * h + q, u = 0 == (n[u / 8 >> 0] & 128 >> u % 8) ? 1 : 0, 0 == u && 0 != f[p])f[p] = ~f[p], f[p] |= 4278190080; else if (1 == u || 0 != f[p])f[p] |= 4278190080;
                    p++
                }
                l = h * m * 4;
                t = h * m / 8 >> 0;
                n = 62 + l + t + t;
                p = Array(n);
                p[0] = 0;
                n = new RdpBuffer(p, 0, n);
                n.setLittleEndian16(0);
                n.setLittleEndian16(2);
                n.setLittleEndian16(1);
                n.setByte(h);
                n.setByte(m);
                n.setByte(0);
                n.setByte(0);
                n.setLittleEndian16(e);
                n.setLittleEndian16(g);
                n.setLittleEndian32(40 + l + t + t);
                n.setLittleEndian32(22);
                n.setLittleEndian32(40);
                n.setLittleEndian32(h);
                n.setLittleEndian32(2 * m);
                n.setLittleEndian16(1);
                n.setLittleEndian16(32);
                n.setLittleEndian32(0);
                n.setLittleEndian32(t + t);
                n.setLittleEndian32(0);
                n.setLittleEndian32(0);
                n.setLittleEndian32(0);
                n.setLittleEndian32(0);
                for (l = m - 1; 0 <= l; l--)for (t = 0; t < h; t++)p = f[h * l + t], n.setByte(p & 255), n.setByte(p >> 8 & 255), n.setByte(p >> 16 & 255), n.setByte(p >> 24 & 255);
                p = h / 8 >> 0;
                for (l = 0; l < m; l += 1)for (t = 0; t < p; t += 1)n.setByte(0);
                for (l = 0; l < m; l += 1)for (t = 0; t < p; t += 1)n.setByte(0);
                n = hi5.Base64.enc(n.getData());
                t = (l = hi5.browser.isIE) ?
                    "" : "data:image/x-icon;base64," + n;
                p = l ? ya() + "/CURSOR?" + n.hashCode() : "";
                l && B.send("8E8" + n);
                e = {data: t, hotX: e, hotY: g, url: p, rawData: f, width: h, height: m};
                20 > c && (Ob[c] = e);
                (k = Vc(k)) && y.setCursor(k)
            }
        }
    }

    function Ze(a, b, c, e, g, h) {
        1 != g && (b = e - b - 1);
        b = (b * c + a) * g;
        c = b / 8 >> 0;
        a = h[c] & 255;
        switch (g) {
            case 1:
                return 0 == (a & 128 >> b % 8) ? 0 : 4294967295;
            case 8:
                return 0 == a ? 0 : 4294967295;
            case 15:
                return a |= (h[c + 1] & 255) << 8, g = Array(4), Wc(a, 15, g, 0), g[0] << 16 | g[1] << 8 | g[2];
            case 16:
                return a |= (h[c + 1] & 255) << 8, g = Array(4), Wc(a, 16, g, 0), g[0] << 16 | g[1] <<
                    8 | g[2];
            case 24:
                return(h[c + 2] & 255) << 16 | (h[c + 1] & 255) << 8 | a;
            case 32:
                return(h[c + 3] & 255) << 24 | (h[c + 2] & 255) << 16 | (h[c + 1] & 255) << 8 | a
        }
        console.log("invalid bpp value for Xor Mask.");
        return 0
    }

    function rc(a) {
        var b = 0, c = null, e = null, g = null, h = 0;
        a.skipPosition(2);
        b = a.getLittleEndian16();
        a.skipPosition(2);
        c = Array(b);
        e = Array(b);
        g = Array(b);
        a = a.getBytes(3 * b);
        for (var k = 0; k < b; k++)c[k] = a[h], e[k] = a[h + 1], g[k] = a[h + 2], h += 3;
        256 == b && (ga || (ga = Array(3)), ga[0] = c, ga[1] = e, ga[2] = g)
    }

    function Rc(a, b) {
        for (var c = 0, e = 0, g = 0; c < b;) {
            e = a.getByte();
            g = e & 3;
            switch (g) {
                case 1:
                    var h = a, k = e, m = 0, f = 0, n = !1;
                    0 != (k & 8) && (ha.orderType = h.getByte());
                    var f = $e[ha.orderType], l = h, t = f, p = 0, r = 0;
                    0 != (k & 64) && t--;
                    0 != (k & 128) && (t = 2 > t ? 0 : t - 2);
                    for (var q = 0; q < t; q++)r = l.getByte(), p |= r << 8 * q;
                    m = p;
                    if (0 != (k & 4)) {
                        if (0 == (k & 32)) {
                            var w = h, u = ha.bounds, s = w.getByte();
                            0 != (s & 1) ? u.left = E(w, u.left, !1) : 0 != (s & 16) && (u.left = E(w, u.left, !0));
                            0 != (s & 2) ? u.top = E(w, u.top, !1) : 0 != (s & 32) && (u.top = E(w, u.top, !0));
                            0 != (s & 4) ? u.right = E(w, u.right, !1) : 0 != (s & 64) && (u.right = E(w, u.right, !0));
                            0 != (s & 8) ? u.bottom = E(w, u.bottom,
                                !1) : 0 != (s & 128) && (u.bottom = E(w, u.bottom, !0))
                        }
                        var C = ha.bounds;
                        U = C.left;
                        0 > U && (U = 0);
                        H = C.top;
                        0 > H && (H = 0);
                        J = C.right;
                        J >= A && (J = A - 1);
                        I = C.bottom;
                        I >= F && (I = F - 1)
                    }
                    n = 0 != (k & 16);
                    switch (ha.orderType) {
                        case 0:
                            var L = h, z = ha.destBlt, d = m, Hc = n;
                            0 != (d & 1) && (z.x = E(L, z.x, Hc));
                            0 != (d & 2) && (z.y = E(L, z.y, Hc));
                            0 != (d & 4) && (z.cx = E(L, z.cx, Hc));
                            0 != (d & 8) && (z.cy = E(L, z.cy, Hc));
                            0 != (d & 16) && (z.opcode = L.getByte() & 15);
                            var pb = z.x, B = z.y, gc = z.cx, K = z.cy, hc = z.opcode;
                            if (!(pb > A || B > F)) {
                                var nd = pb + gc - 1;
                                nd > J && (nd = J);
                                pb < U && (pb = U);
                                var gc = nd - pb + 1, od = B + K - 1;
                                od > I &&
                                (od = I);
                                B < H && (B = H);
                                K = od - B + 1;
                                1 > gc || 1 > K || (vc(hc, x, A, pb, B, gc, K, null, 0, 0, 0), x.postPaint(pb, B, gc, K))
                            }
                            break;
                        case 1:
                            var O = h, D = ha.patBlt, G = m, M = n;
                            0 != (G & 1) && (D.x = E(O, D.x, M));
                            0 != (G & 2) && (D.y = E(O, D.y, M));
                            0 != (G & 4) && (D.cx = E(O, D.cx, M));
                            0 != (G & 8) && (D.cy = E(O, D.cy, M));
                            0 != (G & 16) && (D.opcode = O.getByte(), D.opcode = D.opcode & 3 | (D.opcode & 48) >> 2);
                            0 != (G & 32) && (D.backgroundColor = wb(O));
                            0 != (G & 64) && (D.foregroundColor = wb(O));
                            var R = O, T = D.brush, V = G >> 7;
                            0 != (V & 1) && (T.xOrigin = R.getByte());
                            0 != (V & 2) && (T.yOrigin = R.getByte());
                            0 != (V & 4) && (T.style =
                                R.getByte());
                            var ca = T.pattern;
                            0 != (V & 8) && (ca[0] = R.getByte());
                            if (0 != (V & 16))for (var ea = 1; 8 > ea; ea++)ca[ea] = R.getByte();
                            T.pattern = ca;
                            var ia = D.x, ja = D.y;
                            if (!(ia > J || ja > I)) {
                                var ka = D.opcode, Y = ia, Z = ja, ra = D.cx, W = D.cy, ga = D.foregroundColor, la = D.backgroundColor, sa = D.brush.xOrigin, xa = D.brush.yOrigin, ua = D.brush.style, Ea = D.brush.pattern, ga = Fa(ga), la = Fa(la), ta = Y + ra - 1;
                                ta > J && (ta = J);
                                Y < U && (Y = U);
                                var ra = ta - Y + 1, Aa = Z + W - 1;
                                Aa > I && (Aa = I);
                                Z < H && (Z = H);
                                W = Aa - Z + 1;
                                if (!(1 > ra || 1 > W)) {
                                    var Ra = null;
                                    switch (ua) {
                                        case 0:
                                            for (var Ra = Array(ra * W),
                                                     xb = Ra[0] = 0; xb < Ra.length; xb++)Ra[xb] = ga;
                                            vc(ka, x, A, Y, Z, ra, W, Ra, ra, 0, 0);
                                            x.postPaint(Y, Z, ra, W);
                                            1 == ra && y.execute("setCaretPos", [Y, Z]);
                                            break;
                                        case 2:
                                            svGlobal.logger.warn("hatch");
                                            break;
                                        case 3:
                                            for (var Ra = Array(ra * W), Na = Ra[0] = 0, xb = 0; xb < W; xb++)for (var Ga = 0; Ga < ra; Ga++)Ra[Na] = 0 == (Ea[(xb + xa) % 8] & 1 << (Ga + sa) % 8) ? ga : la, Na++;
                                            vc(ka, x, A, Y, Z, ra, W, Ra, ra, 0, 0);
                                            x.postPaint(Y, Z, ra, W);
                                            break;
                                        default:
                                            svGlobal.logger.warn("Unsupported brush style " + ua)
                                    }
                                }
                            }
                            break;
                        case 2:
                            var yb = h, $ = ha.screenBlt, zb = m, Ub = n;
                            0 != (zb & 1) && ($.x = E(yb, $.x, Ub));
                            0 != (zb & 2) && ($.y = E(yb, $.y, Ub));
                            0 != (zb & 4) && ($.cx = E(yb, $.cx, Ub));
                            0 != (zb & 8) && ($.cy = E(yb, $.cy, Ub));
                            0 != (zb & 16) && ($.opcode = yb.getByte() & 15);
                            0 != (zb & 32) && ($.srcX = E(yb, $.srcX, Ub));
                            0 != (zb & 64) && ($.srcY = E(yb, $.srcY, Ub));
                            var Sa = $.x, Ta = $.y;
                            if (!(Sa > J || Ta > I)) {
                                var hb = $.cx, Vb = $.cy, fb = $.opcode, ya = $.srcX, za = $.srcY, Oa = Sa + hb - 1;
                                Oa > J && (Oa = J);
                                Sa < U && (Sa = U);
                                var hb = Oa - Sa + 1, Za = Ta + Vb - 1;
                                Za > I && (Za = I);
                                Ta < H && (Ta = H);
                                Vb = Za - Ta + 1;
                                ya += Sa - $.x;
                                za += Ta - $.y;
                                1 > hb || 1 > Vb || (12 == fb ? x.moveArea(ya, za, hb, Vb, Sa - ya, Ta - za) : vc(fb, x, hb, Sa, Ta, hb, Vb, null,
                                    hb, ya, za), x.postPaint(Sa, Ta, hb, Vb))
                            }
                            break;
                        case 9:
                            var ib = h, fa = ha.line, jb = m, Ma = n;
                            0 != (jb & 1) && (fa.mixmode = ib.getLittleEndian16());
                            0 != (jb & 2) && (fa.startX = E(ib, fa.startX, Ma));
                            0 != (jb & 4) && (fa.startY = E(ib, fa.startY, Ma));
                            0 != (jb & 8) && (fa.endX = E(ib, fa.endX, Ma));
                            0 != (jb & 16) && (fa.endY = E(ib, fa.endY, Ma));
                            0 != (jb & 32) && (fa.backgroundColor = wb(ib));
                            0 != (jb & 64) && (fa.opcode = ib.getByte());
                            var bb = ib, cb = fa.pen, db = jb >> 7;
                            0 != (db & 1) && (cb.style = bb.getByte());
                            0 != (db & 2) && (cb.width = bb.getByte());
                            0 != (db & 4) && (cb.color = wb(bb));
                            var Ab = fa.startX,
                                Ua = fa.startY, Bb = fa.endX, wc = fa.endY, Lb = fa.pen.color, Pb = fa.opcode - 1;
                            if (Ua == wc) {
                                if (Ab > Bb)var gb = Ab, Ab = Bb, Bb = gb;
                                Ab < U && (Ab = U);
                                Bb > J && (Bb = J)
                            } else Ab == Bb && (Ua > wc && (gb = Ua, Ua = wc, wc = gb), Ua < H && (Ua = H), Ua > I && (Ua = I));
                            ae(Ab, Ua, Bb, wc, Lb, Pb);
                            break;
                        case 10:
                            var Cb = h, qa = ha.rectangle, Db = m, Pa = n;
                            0 != (Db & 1) && (qa.x = E(Cb, qa.x, Pa));
                            0 != (Db & 2) && (qa.y = E(Cb, qa.y, Pa));
                            0 != (Db & 4) && (qa.cx = E(Cb, qa.cx, Pa));
                            0 != (Db & 8) && (qa.cy = E(Cb, qa.cy, Pa));
                            0 != (Db & 16) && (eb = eb & 4294967040 | Cb.getByte());
                            0 != (Db & 32) && (eb = eb & 4294902015 | Cb.getByte() << 8);
                            0 != (Db &
                                64) && (eb = eb & 4278255615 | Cb.getByte() << 16);
                            qa.color = eb;
                            Ad(qa.x, qa.y, qa.cx, qa.cy, qa.color, !0);
                            break;
                        case 11:
                            var Wb = h, Ba = ha.deskSave, Xb = m, Qa = n;
                            0 != (Xb & 1) && (Ba.offset = Wb.getLittleEndian32());
                            0 != (Xb & 2) && (Ba.left = E(Wb, Ba.left, Qa));
                            0 != (Xb & 4) && (Ba.top = E(Wb, Ba.top, Qa));
                            0 != (Xb & 8) && (Ba.right = E(Wb, Ba.right, Qa));
                            0 != (Xb & 16) && (Ba.bottom = E(Wb, Ba.bottom, Qa));
                            0 != (Xb & 32) && (Ba.action = Wb.getByte());
                            var Ca = Ba, $a = Ca.right - Ca.left + 1, ab = Ca.bottom - Ca.top + 1;
                            if (0 == Ca.action) {
                                var Jb = Ca.left, Kb = Ca.top;
                                1 > $a || 1 > ab || be.save(Jb, Kb,
                                    $a, ab, Ca.offset, x.getRGBs(Jb, Kb, $a, ab))
                            } else {
                                var Xc = $a, qb = ab, rb = Ca.left, sb = Ca.top, Ob = be.restore(rb, sb, Xc, qb, Ca.offset);
                                Ob ? (x.setRGBs(rb, sb, Xc, qb, Ob, 0, Xc), x.postPaint(rb, sb, Xc, qb)) : svGlobal.logger.warn("XXX no matched desktop save.")
                            }
                            break;
                        case 13:
                            var Ha = h, Q = ha.memBlt, Va = m, Yb = n;
                            0 != (Va & 1) && (Q.cacheID = Ha.getByte(), Q.colorTable = Ha.getByte());
                            0 != (Va & 2) && (Q.x = E(Ha, Q.x, Yb));
                            0 != (Va & 4) && (Q.y = E(Ha, Q.y, Yb));
                            0 != (Va & 8) && (Q.cx = E(Ha, Q.cx, Yb));
                            0 != (Va & 16) && (Q.cy = E(Ha, Q.cy, Yb));
                            0 != (Va & 32) && (Q.opcode = Ha.getByte() & 15);
                            0 != (Va & 64) && (Q.srcX = E(Ha, Q.srcX, Yb));
                            0 != (Va & 128) && (Q.srcY = E(Ha, Q.srcY, Yb));
                            0 != (Va & 256) && (Q.cacheIDX = Ha.getLittleEndian16());
                            var Wa = Q.x, Xa = Q.y;
                            if (!(Wa > J || Xa > I)) {
                                var Eb = Q.cx, Fb = Q.cy, Yc = Q.srcX, Zc = Q.srcY, ub = Wa + Eb - 1;
                                ub > J && (ub = J);
                                Wa < U && (Wa = U);
                                var Eb = ub - Wa + 1, vb = Xa + Fb - 1;
                                vb > I && (vb = I);
                                Xa < H && (Xa = H);
                                var Fb = vb - Xa + 1, Yc = Yc + (Wa - Q.x), Zc = Zc + (Xa - Q.y), xc = tb.getBitmap(Q.cacheID, Q.cacheIDX);
                                if (xc) {
                                    var yc = xc.width, Qb = xc.height;
                                    Eb > yc && (Eb = yc);
                                    Fb > Qb && (Fb = Qb);
                                    12 == Q.opcode ? x.setRGBs(Wa, Xa, Eb, Fb, xc.data, Zc * yc + Yc, yc) : vc(Q.opcode,
                                        x, A, Wa, Xa, Eb, Fb, xc.data, yc, Yc, Zc);
                                    x.postPaint(Wa, Xa, Eb, Fb)
                                } else svGlobal.logger.warn("Failed to get bitmap from cache, id:" + Q.cacheID + " idx=" + Q.cacheIDX)
                            }
                            break;
                        case 22:
                            var Gb = h, Ia = ha.polyLine, Zb = m, Rb = n;
                            0 != (Zb & 1) && (Ia.x = E(Gb, Ia.x, Rb));
                            0 != (Zb & 2) && (Ia.y = E(Gb, Ia.y, Rb));
                            0 != (Zb & 4) && (Ia.opcode = Gb.getByte());
                            0 != (Zb & 16) && (Ia.foregroundColor = wb(Gb));
                            0 != (Zb & 32) && (Ia.lines = Gb.getByte());
                            if (0 != (Zb & 64)) {
                                var Sb = Gb.getByte();
                                Ia.dataSize = Sb;
                                Ia.data = Gb.getBytes(Sb)
                            }
                            var Hb = Ia, $c = Hb.x, ad = Hb.y, Fc = Hb.foregroundColor, fc =
                                Hb.lines, Gc = Hb.dataSize, Bd = Hb.data, bd = Array(1);
                            bd[0] = Math.floor((fc - 1) / 4) + 1;
                            for (var kb = 0, Ic = 0, Jc = Hb.opcode - 1, Cd = 0; Cd < fc && bd[0] < Gc; Cd++) {
                                var Kc = $c, Lc = ad;
                                0 == Cd % 4 && (kb = Bd[Ic++]);
                                0 == (kb & 192) && (kb |= 192);
                                0 != (kb & 64) && ($c += ce(Bd, bd));
                                0 != (kb & 128) && (ad += ce(Bd, bd));
                                ae(Kc, Lc, $c, ad, Fc, Jc);
                                kb <<= 2
                            }
                            break;
                        case 27:
                            var X = h, N = ha.text2, aa = m;
                            0 != (aa & 1) && (N.font = X.getByte());
                            0 != (aa & 2) && (N.flags = X.getByte());
                            0 != (aa & 4) && (N.opcode = X.getByte());
                            0 != (aa & 8) && (N.mixmode = X.getByte());
                            0 != (aa & 16) && (N.foregroundColor = wb(X));
                            0 != (aa &
                                32) && (N.backgroundColor = wb(X));
                            0 != (aa & 64) && (N.clipLeft = X.getLittleEndian16());
                            0 != (aa & 128) && (N.clipTop = X.getLittleEndian16());
                            0 != (aa & 256) && (N.clipRight = X.getLittleEndian16());
                            0 != (aa & 512) && (N.clipBottom = X.getLittleEndian16());
                            0 != (aa & 1024) && (N.boxLeft = X.getLittleEndian16());
                            0 != (aa & 2048) && (N.boxTop = X.getLittleEndian16());
                            0 != (aa & 4096) && (N.boxRight = X.getLittleEndian16());
                            0 != (aa & 8192) && (N.boxBottom = X.getLittleEndian16());
                            0 != (aa & 16384) && X.skipPosition(1);
                            0 != (aa & 32768) && X.skipPosition(1);
                            0 != (aa & 65536) && X.skipPosition(1);
                            0 != (aa & 131072) && X.skipPosition(1);
                            0 != (aa & 262144) && X.skipPosition(7);
                            0 != (aa & 524288) && (N.x = X.getLittleEndian16());
                            0 != (aa & 1048576) && (N.y = X.getLittleEndian16());
                            if (0 != (aa & 2097152)) {
                                var jc = X.getByte();
                                N.length = jc;
                                N.text = X.getBytes(jc);
                                N.textPos = 0
                            }
                            var kc = N.font, Ja = N.flags, Dd = N.mixmode, mc = N.foregroundColor, cd = N.backgroundColor, Ed = N.clipLeft, Fd = N.clipTop, zc = N.boxLeft, Gd = N.boxTop, ma = N.x, va = N.y, lb = N.length, pa = N.text, Hd = N.clipRight - Ed, Id = N.clipBottom - Fd, $b = N.boxRight - zc, Jd = N.boxBottom - Gd, na = null, mb = 0, da = 0;
                            zc +
                                $b > A && ($b = A - zc);
                            1 < $b ? Ad(zc, Gd, $b, Jd, cd, !1) : 1 == Dd && Ad(Ed, Fd, Hd, Id, cd, !1);
                            for (var Mc = lb, S = 0; S < lb;)switch (pa[da + S]) {
                                case 255:
                                    var dd = pa[da + S + 2];
                                    if (dd > Mc - da) {
                                        S = lb = 0;
                                        break
                                    }
                                    var Nc = pa.slice ? pa.slice(da, da + dd) : pa.subarray(da, da + dd), Oc = new we(dd, Nc), Kd = pa[da + S + 1], Pc = Oc;
                                    if (Kd < Nb.length) {
                                        var nc = Nb[Kd];
                                        nc && (nc.data = null);
                                        Nb[Kd] = Pc
                                    }
                                    S += 3;
                                    lb -= S;
                                    da = S;
                                    S = 0;
                                    break;
                                case 254:
                                    var ac;
                                    a:{
                                        var oc = pa[da + S + 1], Ld = null;
                                        if (oc < Nb.length && (Ld = Nb[oc]) && Ld.data) {
                                            ac = Ld;
                                            break a
                                        }
                                        ac = null
                                    }
                                    var nb = ac ? ac.data : null;
                                    nb && 0 == nb[1] && 0 == (Ja & 32) &&
                                    (0 != (Ja & 4) ? va += pa[da + S + 2] : ma += pa[da + S + 2]);
                                    S = S + 2 < lb ? S + 3 : S + 2;
                                    lb -= S;
                                    da = S;
                                    S = 0;
                                    if (!ac)break;
                                    for (var Qc = ac.size, Ka = 0; Ka < Qc; Ka++)na = de(kc, nb[Ka]), 0 == (Ja & 32) && (mb = nb[++Ka], 0 != (mb & 128) ? (0 != (Ja & 4) ? va += nb[Ka + 1] | nb[Ka + 2] << 8 : ma += nb[Ka + 1] | nb[Ka + 2] << 8, Ka += 2) : 0 != (Ja & 4) ? va += mb : ma += mb), na && (ee(Dd, ma + na.offset & 65535, va + na.baseLine & 65535, na.width, na.height, na.fontData, cd, mc, vd, ba), 0 != (Ja & 32) && (ma += na.width));
                                    break;
                                default:
                                    na = de(kc, pa[da + S]), 0 == (Ja & 32) && (mb = pa[da + ++S], 0 != (mb & 128) ? (0 != (Ja & 4) ? va += pa[da + S + 1] | pa[da + S + 2] <<
                                        8 : ma += pa[da + S + 1] | pa[da + S + 2] << 8, S += 2) : 0 != (Ja & 4) ? va += mb : ma += mb), na && (ee(Dd, ma + na.offset & 65535, va + na.baseLine & 65535, na.width, na.height, na.fontData, cd, mc, vd, ba), 0 != (Ja & 32) && (ma += na.width)), S++
                            }
                            1 < $b ? 0 < Jd && x.postPaint(zc, Gd, $b, Jd) : 0 < Hd && 0 < Id && x.postPaint(Ed, Fd, Hd, Id);
                            break;
                        default:
                            svGlobal.logger.warn("XXX Order type " + ha.orderType)
                    }
                    0 != (k & 4) && Zd();
                    break;
                case 2:
                    var pc = a, qc = e >> 2;
                    switch (qc) {
                        case 11:
                            var bc = pc, Rc = bc.getLittleEndian16(), Ib = bc.getLittleEndian32(), Sc = bc.getPosition() + (Rc - 7);
                            if (0 != (Ib & 16777216)) {
                                var ed =
                                    Ib, rc = bc, Ac = rc.getLittleEndian32();
                                0 != (ed & 1073741824) ? svGlobal.logger.info("XXX rail icon, winId=" + Ac) : 0 != (ed & 2147483648) ? svGlobal.logger.info("XXX rail cache icon, winId=" + Ac) : 0 != (ed & 536870912) ? (svGlobal.logger.info("***** delete winId=" + Ac), y.delWin(Ac)) : af(rc, ed, Ac)
                            } else if (0 != (Ib & 33554432))svGlobal.logger.info("XXX Alt Sec window Notify=" + Ib); else if (0 != (Ib & 67108864)) {
                                var cc = Ib, Md = bc;
                                svGlobal.logger.info("*** -- Alt Sec window Desktop=" + cc);
                                if (0 != (cc & 1))svGlobal.logger.info("Desktop non monitored flags=" +
                                    cc); else if (0 != (cc & 32)) {
                                    var Tc = Md.getLittleEndian32();
                                    svGlobal.logger.info("Desktop monitored flags=" + cc + " winId=" + Tc);
                                    if (!x.getContext()) {
                                        var sc = y.getFocused();
                                        sc && x.setContext(sc.context)
                                    }
                                    if (0 != (cc & 16)) {
                                        var Nd = Md.getByte();
                                        if (0 < Nd) {
                                            var Od = y.zOrders;
                                            Od.length = Nd;
                                            for (var fd = 0; fd < Nd; fd++)Od[fd] = Md.getLittleEndian32(), svGlobal.logger.info("---zorders:" + Od[fd])
                                        }
                                    }
                                }
                            } else svGlobal.logger.info("XXX Alt Sec window order flgas=" + Ib);
                            bc.setPosition(Sc);
                            break;
                        case 13:
                            pc.getLittleEndian32();
                            break;
                        default:
                            svGlobal.logger.warn("XXX Alt Sec order not implemented:" +
                                qc)
                    }
                    break;
                case 3:
                    var Da = a, tc = void 0, Pd = void 0, dc = void 0, uc = void 0, tc = Da.getLittleEndian16(), dc = Da.getLittleEndian16(), Pd = Da.getByte(), uc = Da.getPosition() + tc + 7;
                    switch (Pd) {
                        case 0:
                            var La = Da, Vc = La.getByte();
                            La.skipPosition(1);
                            var Qd = La.getByte(), gd = La.getByte(), Wc = La.getByte(), hd = Math.floor((Wc + 7) / 8), kd = La.getLittleEndian16(), ld = La.getLittleEndian16(), md = La.getPosition();
                            La.skipPosition(kd);
                            for (var Rd = Array(Qd * gd * hd), Ec = Rd[0] = 0, Sd = Qd * hd, id = 0; id < gd; id++)Ec = md + (gd - id - 1) * Sd, La.copyToByteArray(Rd, id * Sd, Ec,
                                Sd);
                            tb.putBitmap(Vc, ld, new Mb(jd(Rd, hd), Qd, gd, 0, 0, 8 * hd));
                            break;
                        case 1:
                            svGlobal.logger.info("TODO: color cache");
                            break;
                        case 2:
                            var oa = Da, pd = dc, qd = oa.getByte();
                            oa.getByte();
                            var Td = oa.getByte(), Ud = oa.getByte(), fe = oa.getByte(), rd = Math.floor((fe + 7) / 8), sd = oa.getLittleEndian16(), ud = oa.getLittleEndian16(), Bc = 0;
                            0 != (pd & 1024) ? Bc = sd : (oa.skipPosition(2), Bc = oa.getLittleEndian16(), oa.skipPosition(2), oa.skipPosition(2));
                            var ge = void 0, ge = 1 == rd ? Vd(Td, Ud, Bc, oa.getData(), oa.getPosition()) : ic(Td, Ud, Bc, oa.getData(), oa.getPosition());
                            oa.skipPosition(Bc);
                            tb.putBitmap(qd, ud, new Mb(ge, Td, Ud, 0, 0, fe));
                            break;
                        case 3:
                            for (var ob = Da, wd = null, he = 0, ie = 0, je = 0, ke = 0, le = 0, Wd = 0, Xd = 0, me = 0, he = ob.getByte(), ie = ob.getByte(), ne = 0; ne < ie; ne++) {
                                var je = ob.getLittleEndian16(), ke = ob.getLittleEndian16(), le = ob.getLittleEndian16(), Wd = ob.getLittleEndian16(), Xd = ob.getLittleEndian16(), me = Xd * Math.floor((Wd + 7) / 8) + 3 & -4, Ya = wd = new xe(he, je, ke, le, Wd, Xd, ob.getBytes(me));
                                if (12 > Ya.font && 256 > Ya.character) {
                                    var oe = lc[Ya.font][Ya.character];
                                    oe && (oe.fontData = null);
                                    lc[Ya.font][Ya.character] =
                                        Ya
                                } else svGlobal.logger.warn("put font: font=" + Ya.font + " c=" + Ya.character)
                            }
                            break;
                        case 4:
                            pe(Da, dc, !1);
                            break;
                        case 5:
                            pe(Da, dc, !0);
                            break;
                        case 8:
                            var wa = Da, qe = dc & 7, re = ((dc & 120) >> 3) - 2, se = wa.getLittleEndian16();
                            wa.skipPosition(8);
                            4 != re && console.log("XX, bpp:" + re);
                            var xd = wa.getByte();
                            wa.skipPosition(2);
                            var Yd = wa.getByte(), Cc = wa.getLittleEndian16(), Dc = wa.getLittleEndian16(), te = wa.getLittleEndian32(), ec = [0];
                            if (1 == Yd) {
                                $d(wa, xd, Cc, Dc, Tb);
                                var yd = Tb.getData(), zd = Tb.getDataSize();
                                ec.length = zd;
                                Uc(yd, 0, ec, Cc, Dc, 1);
                                tb.putBitmap(qe, se, new Mb(ec, Cc, Dc, 0, 0, 32))
                            } else if (0 == Yd) {
                                var ue = td(wa.getData(), te, wa.getPosition());
                                ec.length = ue.length;
                                Uc(ue, 0, ec, Cc, Dc, 1);
                                tb.putBitmap(qe, se, new Mb(ec, Cc, Dc, 0, 0, 32))
                            } else svGlobal.logger.warn("XXX invalid codec id:" + Yd);
                            wa.skipPosition(te);
                            break;
                        default:
                            svGlobal.logger.info("XXX second Order, type=" + Pd)
                    }
                    Da.setPosition(uc)
            }
            c++
        }
        x.commitPaint()
    }

    function bf(a) {
        this.id = a;
        this.appId = "";
        var b = this;
        this.fillBrowser = function () {
            var c = y.getOwnerSurface(b);
            c ? (c = c.getWindow()) && b.resize(0,
                0, c.document.documentElement.clientWidth, c.document.documentElement.clientHeight) : svGlobal.logger.warn("XXX No browser for " + a)
        };
        this.parent = function () {
            return y.getWinById(b.ownerWinid)
        };
        this.resize = function (a, e, g, h) {
            B.send("8C1" + b.id + "\t" + a + "\t" + e + "\t" + g + "\t" + h)
        };
        this.checkBound = function () {
            var a = y.getOwnerSurface(b);
            if (a) {
                var a = a.getWindow(), e = b.winWidth, g = b.winHeight, h = b.winOffsetX, k = b.winOffsetY;
                !a || 1 > e || 1 > g || !(h > a.document.documentElement.clientWidth || k > a.document.documentElement.clientHeight) ||
                (h > a.document.documentElement.clientWidth && (h = Math.floor(a.document.documentElement.clientWidth / 2)), k > a.document.documentElement.clientHeight && (k = Math.floor(a.document.documentElement.clientHeight / 2)), b.resize(h, k, e, g))
            } else svGlobal.logger.warn("no surface for checkBound")
        };
        this.exeCommand = function (b) {
            B.send("8C4" + a + "\t" + b)
        };
        this.activate = function (c) {
            B.send("8C3" + a + "\t" + c);
            c = y.getOwnerSurface(this);
            b.titleInfo && cb(b.titleInfo + " - " + (C.displayName || p.server), c.getWindow())
        };
        this.close = function () {
            b.exeCommand(61536)
        };
        this.getAppId = function () {
            B.send("8C0" + a)
        };
        this.isVisible = function () {
            return b.winWidth && b.winHeight && b.showState && 45 < b.winHeight && 45 < b.winWidth
        };
        this.getAppId()
    }

    function kd(a, b, c) {
        B.send("8C1" + a.id + "\t0\t0\t" + b + "\t" + c);
        a.winWidth = b;
        a.winHeight = c
    }

    function af(a, b, c) {
        T || (T = !0);
        var e = 0 == (b & 268435456);
        svGlobal.logger.info("\n\n=========== winId=" + c + " existed=" + e);
        var g = e ? y.getWinById(c) : new bf(c);
        if (g) {
            0 != (b & 2) && (g.ownerWinid = a.getLittleEndian32(), svGlobal.logger.info("***** ownerWinid=" + g.ownerWinid));
            0 != (b & 8) && (g.style = a.getLittleEndian32(), g.extStyle = a.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " style=" + g.style + " extStyle=" + g.extStyle), svGlobal.logger.info("*****--- WS_POPUP=" + (0 != (g.style & 2147483648))), svGlobal.logger.info("*****--- WS_DLGFRAME=" + (0 != (g.style & 4194304))), svGlobal.logger.info("*****--- DS_MODALFRAME=" + (0 != (g.style & 128))), svGlobal.logger.info("*****--- WS_EX_DLGMODALFRAME=" + (0 != (g.extStyle & 1))), svGlobal.logger.info("*****--- WS_EX_TOOLWINDOW=" + (0 != (g.extStyle & 128))),
                svGlobal.logger.info("*****--- WS_BORDER=" + (0 != (g.style & 8388608))), svGlobal.logger.info("*****--- WS_CAPTION=" + (0 != (g.style & 12582912))), svGlobal.logger.info("*****--- WS_OVERLAPPED=" + (0 != (g.style & 0))), svGlobal.logger.info("*****--- WS_OVERLAPPEDWINDOW=" + (0 != (g.style & 13565952))), svGlobal.logger.info("*****--- WS_POPUPWINDOW=" + (0 != (g.style & 2156396544))), svGlobal.logger.info("*****--- WS_SIZEBOX=" + (0 != (g.style & 262144))), svGlobal.logger.info("*****--- WS_CHILD=" + (0 != (g.style & 1073741824))), svGlobal.logger.info("*****--- WS_EX_MDICHILD=" +
                (0 != (g.extStyle & 64))), svGlobal.logger.info("*****--- WS_EX_LAYERED=" + (0 != (g.extStyle & 524288))));
            if (0 != (b & 16))switch (g.showState = a.getByte(), svGlobal.logger.info("***** winId=" + c + " showState=" + g.showState), g.showState) {
                case 2:
                    3 == p.windowState && setTimeout(function () {
                        return function () {
                            g.exeCommand(61728)
                        }
                    }(), 50);
                    break;
                case 3:
                    g.fillBrowser()
            }
            if (0 != (b & 4)) {
                var h = a.getLittleEndian16();
                g.titleInfo = a.getUnicodeString(h, !1);
                svGlobal.logger.info("***** winId=" + c + " title=" + g.titleInfo)
            }
            0 != (b & 16384) && (g.clientOffsetX =
                a.getLittleEndian32(), g.clientOffsetY = a.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " coffX" + g.clientOffsetX + " coffY=" + g.clientOffsetY));
            0 != (b & 65536) && (g.clientAreaWidth = a.getLittleEndian32(), g.clientAreaHeight = a.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " cw" + g.clientAreaWidth + " ch=" + g.clientAreaHeight));
            0 != (b & 131072) && (g.rpContent = a.getLittleEndian32());
            0 != (b & 262144) && (g.rootParentHandle = a.getLittleEndian32());
            0 != (b & 2048) && (g.winOffsetX = a.getLittleEndian32(), g.winOffsetY =
                a.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " offX" + g.winOffsetX + " offY=" + g.winOffsetY));
            0 != (b & 32768) && (g.winClientDeltaX = a.getLittleEndian32(), g.winClientDeltaY = a.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " dX" + g.winClientDeltaX + " dY=" + g.winClientDeltaY));
            0 != (b & 1024) && (g.winWidth = a.getLittleEndian32(), g.winHeight = a.getLittleEndian32(), svGlobal.logger.info("***** winId=" + c + " w" + g.winWidth + " h=" + g.winHeight));
            0 != (b & 256) && (c = a.getLittleEndian16(), 0 < c && a.skipPosition(8 *
                c));
            0 != (b & 4096) && (g.visibleOffsetX = a.getLittleEndian32(), g.visibleOffsetY = a.getLittleEndian32());
            0 != (b & 512) && (b = a.getLittleEndian16(), g.numVisibilityRects = b, 0 < b && a.skipPosition(8 * b));
            e || y.addWin(g)
        } else svGlobal.logger.warn("XXX, No win with id:" + c)
    }

    function pe(a, b, c) {
        var e, g, h, k, m, f;
        e = 0;
        g = b & 7;
        m = ((b & 120) >> 3) - 2;
        b = (b & 65408) >> 7;
        0 != (b & 2) && a.skipPosition(8);
        0 != (b & 1) ? k = h = Za.readVar2Bytes(a) : (h = Za.readVar2Bytes(a), k = Za.readVar2Bytes(a));
        e = Za.readVar4Bytes(a);
        f = Za.readVar2Bytes(a);
        c && 0 == (b & 8) && a.skipPosition(8);
        if (c) {
            c = 1 == m ? Vd(h, k, e, a.getData(), a.getPosition()) : ic(h, k, e, a.getData(), a.getPosition());
            a.skipPosition(e);
            if (!c) {
                svGlobal.logger.warn("Failed to decompress bitmap data");
                return
            }
            a = new Mb(c, h, k, 0, 0, 8 * m)
        } else {
            c = Array(h * k * m);
            c[0] = 0;
            var n = a.getPosition(), l = 0, p = h * m;
            for (e = 0; e < k; e++)l = n + (k - e - 1) * p, a.copyToByteArray(c, e * p, l, p);
            a = new Mb(jd(c, m), h, k, 0, 0, 8 * m)
        }
        tb.putBitmap(g, f, a);
        0 != (b & 2) && svGlobal.logger.warn("XXX:TODO, persistent")
    }

    function E(a, b, c) {
        var e = 0;
        c ? (e = a.getByte() << 24 >> 24, b += e) : b = a.getLittleEndian16() <<
            16 >> 16;
        return b
    }

    function wb(a) {
        var b = 0, c = 0, b = c = a.getByte(), c = a.getByte(), b = b | c << 8, c = a.getByte();
        return b | c << 16
    }

    function Sc(a) {
        var b = 0, c = 0, e = 0, g = 0, h = 0, k = 0, m = 0, f = 0, n = 0, l = 0, p = 0, s = 0, g = 0, r, q, w, u;
        w = u = 0;
        r = A;
        q = F;
        for (var b = a.getLittleEndian16(), C = 0; C < b; C++) {
            var c = a.getLittleEndian16(), e = a.getLittleEndian16(), g = a.getLittleEndian16(), h = a.getLittleEndian16(), k = a.getLittleEndian16(), m = a.getLittleEndian16(), l = a.getLittleEndian16(), y = Math.floor((l + 7) / 8), p = a.getLittleEndian16(), s = a.getLittleEndian16(), f = g - c + 1, n =
                h - e + 1;
            r > c && (r = c);
            q > e && (q = e);
            w < g && (w = g);
            u < h && (u = h);
            ba != l && (svGlobal.logger.warn("Server limited colour depth to " + l + " bits"), Lb(l));
            if (0 == p) {
                h = k * y;
                l = m * h;
                g = Array(l);
                g[0] = 0;
                p = a.getPosition();
                for (s = 0; s < m; s++)ta(a.getData(), p, g, (m - s - 1) * h, h), p += h;
                a.skipPosition(l);
                m = void 0;
                m = 0;
                y = jd(g, y);
                x.setRGBs(c, e, f, n, y, m, k);
                x.postPaint(c, e, f, n)
            } else 0 != (p & 1024) ? g = s : (a.skipPosition(2), g = a.getLittleEndian16(), a.skipPosition(4)), h = a.getData(), l = g, p = a.getPosition(), 1 == y ? (m = Vd(k, m, l, h, p), h = void 0, h = 0, y = jd(m, y), x.setRGBs(c,
                e, f, n, y, h, k), x.postPaint(c, e, f, n)) : (y = ic(k, m, l, h, p), 1 > f || 1 > n || (x.setRGBs(c, e, f, n, y, 0, k), x.postPaint(c, e, f, n))), a.skipPosition(g)
        }
        x.commitPaint()
    }

    function Zd() {
        U = 0;
        J = A - 1;
        H = 0;
        I = F - 1
    }

    function ae(a, b, c, e, g, h) {
        g = Fa(g);
        if (a == c || b == e) {
            var k, m;
            if (b == e) {
                if (b >= H && b <= I)if (c > a) {
                    if (a < U && (a = U), c > J && (c = J), m = c - a, !(1 > m)) {
                        for (k = 0; k < m; k++)Ma(h, x, a + k, b, g);
                        x.postPaint(a, b, m + 1, 1)
                    }
                } else if (c < U && (c = U), a > J && (a = J), m = a - c, !(1 > m)) {
                    for (k = 0; k < m; k++)Ma(h, x, c + k, b, g);
                    x.postPaint(c, b, m + 1, 1)
                }
            } else if (a >= U && a <= J)if (e > b) {
                if (b < H && (b = H),
                    e > I && (e = I), m = e - b, !(1 > m)) {
                    for (k = 0; k < m; k++)Ma(h, x, a, b + k, g);
                    x.postPaint(a, b, 1, m + 1)
                }
            } else if (e < H && (e = H), b > I && (b = I), m = b - e, !(1 > m)) {
                for (k = 0; k < m; k++)Ma(h, x, a, e + k, g);
                x.postPaint(a, e, 1, m + 1)
            }
        } else {
            var f = Math.abs(c - a), n = Math.abs(e - b);
            k = a;
            m = b;
            var l, p, s, r, q, w, u;
            p = c >= a ? l = 1 : l = -1;
            r = e >= b ? s = 1 : s = -1;
            f >= n ? (r = l = 0, w = f, q = f / 2 >> 0, u = n) : (s = p = 0, w = n, q = n / 2 >> 0, u = f, f = n);
            if (!(1 > f)) {
                for (n = 0; n <= f; n++)k < U || k > J || m < H || m > I || Ma(h, x, k, m, g), q += u, q >= w && (q -= w, k += l, m += s), k += p, m += r;
                h = a < c ? a : c;
                g = a > c ? a : c;
                c = b < e ? b : e;
                e = b > e ? b : e;
                0 > g - h || 0 > e - c || x.postPaint(h,
                    c, g - h + 1, e - c + 1)
            }
        }
    }

    function ee(a, b, c, e, g, h, k, m, f, n) {
        f = 128;
        m = Fa(m);
        k = Fa(k);
        if (!(b > J || c > I)) {
            var l = b + e - 1;
            l > J && (l = J);
            n = b < U ? U : b;
            var l = l - b + 1, p = c + g - 1;
            p > I && (p = I);
            var s = c < H ? H : c, p = p - c + 1;
            if (!(1 > l || 1 > p)) {
                var r = 0, q = 0, w = x.setRGB;
                if (s == c && l == e && p == g && n == b)if (0 == a)for (a = 0; a < g; a++) {
                    for (var r = c + a, u = 0; u < e; u++)0 == f && (q++, f = 128), 0 != (h[q] & f) && w(b + u, r, m), f >>= 1;
                    q++;
                    f = 128;
                    q == h.length && (q = 0)
                } else for (a = 0; a < g; a++) {
                    r = c + a;
                    for (u = 0; u < e; u++)0 == f && (q++, f = 128), 0 != (h[q] & f) ? w(b + u, r, m) : w(b + u, r, k), f >>= 1;
                    q++;
                    f = 128;
                    q == h.length && (q = 0)
                } else if (0 ==
                    a)for (a = 0; a < p; a++) {
                    r = c + a;
                    for (u = 0; u < l; u++)0 == f && (q++, f = 128), b + u >= n && r >= s && 0 != (h[q] & f) && w(b + u, r, m), f >>= 1;
                    q++;
                    f = 128;
                    q == h.length && (q = 0)
                } else for (a = 0; a < p; a++) {
                    r = c + a;
                    for (u = 0; u < l; u++)0 == f && (q++, f = 128), b + u >= n && c + a >= s && (0 != (h[q] & f) ? w(b + u, r, m) : w(b + u, r, k)), f >>= 1;
                    q++;
                    f = 128;
                    q == h.length && (q = 0)
                }
            }
        }
    }

    function ce(a, b) {
        var c = a[b[0]++] & 255, e = c & 128, c = 0 != (c & 64) ? c | -64 : c & 63;
        0 != e && (c = c << 8 | a[b[0]++] & 255);
        return c
    }

    function Ad(a, b, c, e, g, h) {
        a > J || b > I || (c = a + c - 1, c > J && (c = J), a < U && (a = U), c = c - a + 1, e = b + e - 1, e > I && (e = I), b < H && (b = H), e = e - b + 1,
            1 > c || 1 > e || (x.fillRect(a, b, c, e, Fa(g)), x.postPaint(a, b, c, e)))
    }

    function $a(a) {
        if (B && K)try {
            B.send("85"), B.close()
        } catch (b) {
        }
        window && window.$rdp && (window.$rdp = null)
    }

    function ab(a, b, c, e, g, h, k) {
        for (var m = g * c + e, f = a.setRGB, n = a.getRGB, l = 0; l < k; l++) {
            for (var p = 0; p < h; p++) {
                if (a) {
                    var s = n(e + p, g + l);
                    f(e + p, g + l, ~s & R)
                } else b[m] = ~b[m] & R;
                m++
            }
            m += c - h
        }
    }

    function vc(a, b, c, e, g, h, k, m, f, n, l) {
        if (!(0 > h | 0 > k | 0 > c | 0 > f))switch (a) {
            case 0:
                m = b.setRGB;
                for (f = e; f < e + h; f++)for (b = g; b < g + k; b++)m(f, b, 0);
                break;
            case 1:
                a = l * f + n;
                c = b.setRGB;
                b = b.getRGB;
                for (n = 0; n < k; n++) {
                    for (l = 0; l < h; l++)c(e + h, g + k, ~(b(e + h, g + k) | m[a]) & R);
                    a += f - h
                }
                break;
            case 2:
                a = l * f + n;
                c = b.setRGB;
                b = b.getRGB;
                for (n = 0; n < k; n++) {
                    for (l = 0; l < h; l++) {
                        var p = b(e + h, g + k);
                        c(e + h, g + k, p & ~m[a] & R);
                        a++
                    }
                    a += f - h
                }
                break;
            case 3:
                ab(b, m, f, n, l, h, k);
                m ? b.setRGBs(e, g, h, k, m, l * f + n, f) : b.moveArea(n, l, h, k, e - n, g - l);
                break;
            case 4:
                ab(b, null, c, e, g, h, k);
                ld(b, c, e, g, h, k, m, f, n, l);
                break;
            case 5:
                ab(b, null, c, e, g, h, k);
                break;
            case 6:
                a = l * f + n;
                c = b.setRGB;
                b = b.getRGB;
                for (n = 0; n < k; n++) {
                    for (l = 0; l < h; l++)p = b(e + l, g + n), c(e + l, g + n, p ^ m[a] & R), a++;
                    a += f - h
                }
                break;
            case 7:
                a = l * f + n;
                c = b.setRGB;
                b = b.getRGB;
                for (n = 0; n < k; n++) {
                    for (l = 0; l < h; l++)p = b(e + l, g + n), c(e + l, g + n, ~(p & m[a]) & R), a++;
                    a += f - h
                }
                break;
            case 8:
                ld(b, c, e, g, h, k, m, f, n, l);
                break;
            case 9:
                a = l * f + n;
                c = b.setRGB;
                b = b.getRGB;
                for (n = 0; n < k; n++) {
                    for (l = 0; l < h; l++)p = b(e + l, g + n), c(e + l, g + n, p ^ ~m[a] & R), a++;
                    a += f - h
                }
                break;
            case 10:
                break;
            case 11:
                a = l * f + n;
                c = b.setRGB;
                b = b.getRGB;
                for (n = 0; n < k; n++) {
                    for (l = 0; l < h; l++)p = b(e + l, g + n), c(e + l, g + n, p | ~m[a] & R), a++;
                    a += f - h
                }
                break;
            case 12:
                m ? b.setRGBs(e, g, h, k, m, l * f + n, f) : b.moveArea(n, l, h, k, e - n, g - l);
                break;
            case 13:
                ab(b,
                    null, c, e, g, h, k);
                md(b, c, e, g, h, k, m, f, n, l);
                break;
            case 14:
                md(b, c, e, g, h, k, m, f, n, l);
                break;
            case 15:
                m = b.setRGB;
                for (f = e; f < e + h; f++)for (b = g; b < g + k; b++)m(f, b, R);
                break;
            default:
                svGlobal.logger.warn("unsupported opcode: " + a)
        }
    }

    function Ma(a, b, c, e, g) {
        if (b) {
            var h = b.getRGB(c, e);
            switch (a) {
                case 0:
                    b.setRGB(c, e, 0);
                    break;
                case 1:
                    b.setRGB(c, e, ~(h | g) & R);
                    break;
                case 2:
                    b.setRGB(c, e, h & ~g & R);
                    break;
                case 3:
                    b.setRGB(c, e, ~g & R);
                    break;
                case 4:
                    b.setRGB(c, e, (~h & g) * R);
                    break;
                case 5:
                    b.setRGB(c, e, ~h & R);
                    break;
                case 6:
                    b.setRGB(c, e, h ^ g & R);
                    break;
                case 7:
                    b.setRGB(c, e, ~h & g & R);
                    break;
                case 8:
                    b.setRGB(c, e, h & g & R);
                    break;
                case 9:
                    b.setRGB(c, e, h ^ ~g & R);
                    break;
                case 10:
                    break;
                case 11:
                    b.setRGB(c, e, h | ~g & R);
                    break;
                case 12:
                    b.setRGB(c, e, g);
                    break;
                case 13:
                    b.setRGB(c, e, (~h | g) & R);
                    break;
                case 14:
                    b.setRGB(c, e, h | g & R);
                    break;
                case 15:
                    b.setRGB(c, e, R);
                    break;
                default:
                    svGlobal.logger.warn("unsupported pixel opcode: " + a), b.setRGB(c, e, g)
            }
        }
    }

    function ld(a, b, c, e, g, h, k, m, f, n) {
        b = n * m + f;
        f = a.setRGB;
        a = a.getRGB;
        for (n = 0; n < h; n++) {
            for (var l = 0; l < g; l++) {
                var p = a(c + l, e + n);
                f(c + l, e + n, p & k[b] & R);
                b++
            }
            b +=
                m - g
        }
    }

    function md(a, b, c, e, g, h, k, m, f, n) {
        b = n * m + f;
        f = a.setRGB;
        a = a.getRGB;
        for (n = 0; n < h; n++) {
            for (var l = 0; l < g; l++) {
                var p = a(c + l, e + n);
                f(c + l, e + n, p | k[b] & R);
                b++
            }
            b += m - g
        }
    }

    function de(a, b) {
        if (12 > a && 256 > b) {
            var c = lc[a][b];
            if (c)return c
        }
        return null
    }

    function Vc(a) {
        return 20 > a && (a = Ob[a]) ? a : null
    }

    function Wc(a, b, c, e) {
        switch (b) {
            case 16:
                b = a >> 8 & 248;
                var g = a >> 3 & 252;
                a = a << 3 & 255;
                c[e] = b | b >> 5;
                c[e + 1] = g | g >> 6;
                c[e + 2] = a | a >> 5;
                c[e + 3] = 255;
                break;
            case 15:
                b = a >> 7 & 248;
                g = a >> 2 & 248;
                a = a << 3 & 255;
                c[e] = b | b >> 5;
                c[e + 1] = g | g >> 5;
                c[e + 2] = a | a >> 5;
                c[e + 3] = 255;
                break;
            case 8:
                c[e] = ga[0][a];
                c[e + 1] = ga[1][a];
                c[e + 2] = ga[2][a];
                c[e + 3] = 255;
                break;
            case 32:
                c[e] = a & 255, c[e + 1] = a >> 8 & 255, c[e + 2] = a >> 16 & 255, c[e + 3] = a >> 24 & 255;
            default:
                c[e] = a & 255, c[e + 1] = a >> 8 & 255, c[e + 2] = a >> 16 & 255, c[e + 3] = 255
        }
    }

    function jd(a, b) {
        var c = a.length / b >> 0, e = Array(c);
        e[0] = 0;
        var g = Fa;
        switch (b) {
            case 1:
                for (var h = 0; h < c; h++)e[h] = g(a[h]);
                break;
            case 2:
                for (h = 0; h < c; h++)e[h] = g(a[2 * h + 1] << 8 | a[2 * h]);
                break;
            default:
                for (h = 0; h < c; h++)e[h] = g(a[h * b + 2] << 16) | a[h * b + 1] << 8 | a[h * b]
        }
        return e
    }

    function Vd(a, b, c, e, g) {
        var h = -1, k = 0;
        c += g;
        var m = 0,
            f = 0, n = 0, l = a, p = -1, s = 0, r = f = 0, q = 0, w = n = 0, u = 4294967295, A = !1, y = !1, L = !1, z = Array(a * b);
        for (z[0] = 0; g < c;) {
            s = 0;
            f = e[g++];
            m = f >> 4;
            switch (m) {
                case 12:
                case 13:
                case 14:
                    m -= 6;
                    f &= 15;
                    n = 16;
                    break;
                case 15:
                    m = f & 15;
                    9 > m ? (f = e[g++], f |= e[g++] << 8) : f = 11 > m ? 8 : 1;
                    n = 0;
                    break;
                default:
                    m >>= 1, f &= 31, n = 32
            }
            0 != n && (L = 2 == m || 7 == m, 0 == f ? f = L ? e[g++] + 1 : e[g++] + n : L && (f <<= 3));
            switch (m) {
                case 0:
                    p != m || l == a && -1 == h || (A = !0);
                    break;
                case 8:
                    r = e[g++];
                case 3:
                    q = e[g++];
                    break;
                case 6:
                case 7:
                    u = e[g++];
                    m -= 5;
                    break;
                case 9:
                    w = 3;
                    m = 2;
                    s = 3;
                    break;
                case 10:
                    w = 5, m = 2, s = 5
            }
            p = m;
            for (n = 0; 0 < f;)switch (l >=
                a && (l = 0, b--, h = k, k = 0 + b * a), m) {
                case 0:
                    A && (z[k + l] = -1 == h ? u : z[h + l] ^ u, A = !1, f--, l++);
                    if (-1 == h) {
                        for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = 0, f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = 0, f--, l++
                    } else {
                        for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = z[h + l], f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = z[h + l], f--, l++
                    }
                    break;
                case 1:
                    if (-1 == h) {
                        for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = u, f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = u, f--, l++
                    } else {
                        for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = z[h + l] ^ u, f--, l++;
                        for (; 0 < f && l < a;)z[k + l] = z[h + l] ^ u, f--, l++
                    }
                    break;
                case 2:
                    if (-1 == h) {
                        for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)n <<= 1, n &= 255, 0 == n && (w = 0 != s ? s : e[g++], n = 1), z[k + l] = 0 != (w & n) ? u : 0, f--, l++;
                        for (; 0 < f && l < a;)n <<= 1, n &= 255, 0 == n && (w = 0 != s ? s : e[g++], n = 1), z[k + l] = 0 != (w & n) ? u : 0, f--, l++
                    } else {
                        for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)n <<= 1, n &= 255, 0 == n && (w = 0 != s ? s : e[g++], n = 1), z[k + l] = 0 != (w & n) ? z[h + l] ^ u : z[h + l], f--, l++;
                        for (; 0 < f && l < a;)n <<= 1, n &= 255, 0 == n && (w = 0 != s ? s : e[g++], n = 1), z[k + l] = 0 != (w & n) ? z[h + l] ^ u : z[h + l], f--, l++
                    }
                    break;
                case 3:
                    for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = q, f--, l++;
                    for (; 0 <
                               f && l < a;)z[k + l] = q, f--, l++;
                    break;
                case 4:
                    for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = e[g++], f--, l++;
                    for (; 0 < f && l < a;)z[k + l] = e[g++], f--, l++;
                    break;
                case 8:
                    for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)y ? (z[k + l] = q, y = !1) : (z[k + l] = r, y = !0, f++), f--, l++;
                    for (; 0 < f && l < a;)y ? (z[k + l] = q, y = !1) : (z[k + l] = r, y = !0, f++), f--, l++;
                    break;
                case 13:
                    for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = 255, f--, l++;
                    for (; 0 < f && l < a;)z[k + l] = 255, f--, l++;
                    break;
                case 14:
                    for (; 0 != (f & -8) && l + 8 < a;)for (L = 0; 8 > L; L++)z[k + l] = 0, f--, l++;
                    for (; 0 < f && l < a;)z[k + l] = 0, f--, l++
            }
        }
        return z
    }

    sessionStorage && sessionStorage.clear();
    this.displayMsg = this.reconnectOnResize = !0;
    this.appTimeout = 800;
    this.reconnectTimes = 0;
    this.windowState = 3;
    this.setTitle = this.openLink = !0;
    this.audioBuffer = 0;
    this.sessionInfo = {};
    this.mode = 0;
    this.remoteAppLogin = !0;
    var ja = null, p = this, qc = !0, Oa = !1, Ga = null, bb = hi5.browser.isChrome || hi5.browser.isSafari, vb = "object" == typeof s ? s : null, Pa = "object" == typeof s || 0 < s.indexOf("/PLAY?");
    Pa ? (this.mode = 1, vb ? s = "" : (A = 640, F = 480), s += "&touchpad=on", this.reconnectOnResize = !1) : 0 < s.indexOf("/JOIN?") &&
        (this.mode = 2, this.reconnectOnResize = !1);
    A && 0 != A || (A = document.documentElement.clientWidth);
    if (!F || 0 == F)if (F = document.documentElement.clientHeight, hi5.browser.isiOS) {
        var Ec = F - hi5.browser.innerHeight;
        10 < Ec && 22 > Ec && (F = hi5.browser.innerHeight)
    }
    -1 == A && (A = screen.width);
    -1 == F && (F = screen.height);
    A = parseInt(A, 10);
    F = parseInt(F, 10);
    ba = ba ? parseInt(ba, 10) : 16;
    var C = hi5.tool.queryToObj(s.substring(s.indexOf("?") + 1));
    C.width || (s += "&width=" + A);
    C.height || (s += "&height=" + F);
    if (hi5.appcfg) {
        var V = hi5.appcfg;
        "undefined" != typeof V.displayMsg && (this.displayMsg = V.displayMsg);
        V.appTimeout && (this.appTimeout = V.appTimeout);
        "undefined" != typeof V.reconnectOnResize && (this.reconnectOnResize = V.reconnectOnResize);
        V.reconnectTimes && (this.reconnectTimes = V.reconnectTimes);
        "undefined" != typeof V.windowState && (this.windowState = V.windowState);
        "undefined" != typeof V.openLink && (this.openLink = V.openLink);
        "undefined" != typeof V.setTitle && (this.setTitle = V.setTitle);
        V.audioBuffer && (this.audioBuffer = V.audioBuffer);
        "boolean" == typeof V.useWSS &&
        (s = (hi5.appcfg.useWSS ? "wss" : "ws") + s.substring(s.indexOf("://")));
        "boolean" == typeof V.remoteAppLogin && (this.remoteAppLogin = V.remoteAppLogin)
    }
    var za = this.reconnectTimes;
    C.vmid && (this.reconnectOnResize = !1);
    this.server = C.server;
    this.port = parseInt(C.port, 10);
    this.getURL = function () {
        return s
    };
    this.getColor = function () {
        return ba
    };
    var ta = hi5.Arrays.arraycopy, sa = hi5.Arrays.fill, db = hi5.graphic.Rectangle, Na = new function () {
        function a(a) {
            a = (a & 1431655765) << 1 | a >>> 1 & 1431655765;
            a = (a & 858993459) << 2 | a >>> 2 & 858993459;
            a =
                (a & 252645135) << 4 | a >>> 4 & 252645135;
            if (0 == a >>> 8)return a;
            a = (a & 16711935) << 8 | a >>> 8 & 16711935;
            return 0 == a >>> 16 ? a : (a & 65535) << 16 | a >>> 16 & 65535
        }

        function b(a, b, g, f) {
            var d, l = 0, m = 0, n, p, q, t, r = 0 != (f & 1), u = e;
            if (0 == (f & 32))return h = 0, k = g, 0;
            0 != (f & 64) && (c = 0);
            if (0 != (f & 128)) {
                for (f = 65536; 0 <= --f;)u[f] = 0;
                c = 0
            }
            k = h = 0;
            h = q = n = f = c;
            if (0 == g)return 0;
            g += m;
            do {
                if (0 == l) {
                    if (m >= g)break;
                    f = a[b + m++] << 24;
                    l = 8
                }
                if (0 <= f) {
                    if (8 > l) {
                        if (m >= g) {
                            if (0 != f)return-1;
                            break
                        }
                        f |= a[b + m++] << 24 - l;
                        l += 8
                    }
                    if (65536 <= n)return-1;
                    u[n++] = f >>> 24 & 255;
                    f <<= 8;
                    l -= 8
                } else {
                    f <<= 1;
                    if (0 == --l) {
                        if (m >= g)return-1;
                        f = a[b + m++] << 24;
                        l = 8
                    }
                    if (0 <= f) {
                        if (8 > l) {
                            if (m >= g)return-1;
                            f |= a[b + m++] << 24 - l;
                            l += 8
                        }
                        if (65536 <= n)return-1;
                        u[n++] = (f >>> 24 | 128) & 255;
                        f <<= 8;
                        l -= 8
                    } else {
                        f <<= 1;
                        if (--l < (r ? 3 : 2)) {
                            if (m >= g)return-1;
                            f |= a[b + m++] << 24 - l;
                            l += 8
                        }
                        if (r)switch (f >>> 29) {
                            case 7:
                                for (; 9 > l; l += 8) {
                                    if (m >= g)return-1;
                                    f |= a[b + m++] << 24 - l
                                }
                                f <<= 3;
                                d = f >>> 26;
                                f <<= 6;
                                l -= 9;
                                break;
                            case 6:
                                for (; 11 > l; l += 8) {
                                    if (m >= g)return-1;
                                    f |= a[b + m++] << 24 - l
                                }
                                f <<= 3;
                                d = (f >>> 24) + 64;
                                f <<= 8;
                                l -= 11;
                                break;
                            case 5:
                            case 4:
                                for (; 13 > l; l += 8) {
                                    if (m >= g)return-1;
                                    f |= a[b + m++] << 24 - l
                                }
                                f <<= 2;
                                d = (f >>>
                                    21) + 320;
                                f <<= 11;
                                l -= 13;
                                break;
                            default:
                                for (; 17 > l; l += 8) {
                                    if (m >= g)return-1;
                                    f |= a[b + m++] << 24 - l
                                }
                                f <<= 1;
                                d = (f >>> 16) + 2368;
                                f <<= 16;
                                l -= 17
                        } else switch (f >>> 30) {
                            case 3:
                                if (8 > l) {
                                    if (m >= g)return-1;
                                    f |= a[b + m++] << 24 - l;
                                    l += 8
                                }
                                f <<= 2;
                                d = f >>> 26;
                                f <<= 6;
                                l -= 8;
                                break;
                            case 2:
                                for (; 10 > l; l += 8) {
                                    if (m >= g)return-1;
                                    f |= a[b + m++] << 24 - l
                                }
                                f <<= 2;
                                d = (f >>> 24) + 64;
                                f <<= 8;
                                l -= 10;
                                break;
                            default:
                                for (; 14 > l; l += 8) {
                                    if (m >= g)return-1;
                                    f |= a[b + m++] << 24 - l
                                }
                                d = (f >>> 18) + 320;
                                f <<= 14;
                                l -= 14
                        }
                        if (0 == l) {
                            if (m >= g)return-1;
                            f = a[b + m++] << 24;
                            l = 8
                        }
                        if (0 <= f)p = 3, f <<= 1, l--; else {
                            t = r ? 14 : 11;
                            do {
                                f <<= 1;
                                if (0 == --l) {
                                    if (m >= g)return-1;
                                    f = a[b + m++] << 24;
                                    l = 8
                                }
                                if (0 <= f)break;
                                if (0 == --t)return-1
                            } while (1);
                            p = (r ? 16 : 13) - t;
                            f <<= 1;
                            if (--l < p)for (; l < p; l += 8) {
                                if (m >= g)return-1;
                                f |= a[b + m++] << 24 - l
                            }
                            t = p;
                            p = f >>> 32 - t & ~(-1 << t) | 1 << t;
                            f <<= t;
                            l -= t
                        }
                        if (65536 <= n + p)return-1;
                        d = n - d & (r ? 65535 : 8191);
                        do u[n++] = u[d++]; while (0 != --p)
                    }
                }
            } while (1);
            c = n;
            h = q;
            k = n - q;
            return 0
        }

        var c = 0, e = Array(65536);
        e[0] = 0;
        sa(e, 0, 65536, 0);
        var g = Array(8);
        sa(g, 0, 8, 0);
        var h = 0, k = 0, m = [6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 8, 9, 9, 9, 9, 8, 8, 9, 9, 9, 9, 9, 9, 8, 9, 9, 10, 9, 9, 9, 9, 9, 9, 9, 10, 9, 10, 10,
            10, 9, 9, 10, 9, 10, 9, 10, 9, 9, 9, 10, 10, 9, 10, 9, 9, 8, 9, 9, 9, 9, 10, 10, 10, 9, 9, 10, 10, 10, 10, 10, 10, 9, 9, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 9, 7, 9, 9, 10, 9, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 9, 10, 10, 10, 10, 10, 9, 10, 10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10,
            10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 8, 9, 9, 10, 9, 10, 10, 10, 9, 10, 10, 10, 9, 9, 8, 7, 13, 13, 7, 7, 10, 7, 7, 6, 6, 6, 6, 5, 6, 6, 6, 5, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 5, 6, 7, 7], f = [123, 65311, 65293, 65063, 65024, 65285, 65303, 65128, 197, 65031, 65299, 65216, 65288, 65048, 65307, 65203, 65027, 162, 65090, 65296, 65035, 65026, 65169, 65305, 65152, 233, 65082, 65301, 65042, 87, 65239, 65309, 65294, 65077, 65129, 65314, 65304, 65146, 65025, 65315, 65300, 65268, 65204, 65033, 65308, 65220, 65289, 65120, 65136, 65298, 65029, 65170, 65185, 65306, 65039, 65287, 65110, 65302, 65282,
            65240, 65256, 65310, 65053, 59, 65535, 65286, 65535, 65137, 65161, 65535, 65535, 65068, 65067, 65056, 65535, 65211, 65231, 65032, 65535, 65248, 65037, 65535, 65177, 65535, 65028, 65194, 65097, 65535, 65047, 65121, 65247, 65535, 65279, 65270, 65100, 65535, 65535, 65159, 65535, 65316, 65535, 65084, 65138, 65535, 65535, 65230, 65535, 65278, 65535, 65059, 65212, 65034, 65193, 65535, 65041, 65535, 65154, 65535, 65030, 65178, 65269, 65535, 65058, 65101, 65119, 65535, 65283, 65249, 65535, 65226, 65228, 65535, 65049, 65535, 65207, 65535, 65535, 65155, 65065, 65535, 65535, 65535, 65132,
            65535, 65261, 65535, 65535, 65094, 65116, 65045, 65535, 65243, 65190, 65535, 65535, 65092, 65535, 65036, 65535, 65173, 65276, 65535, 65535, 65208, 5833, 65535, 65264, 65535, 65080, 65535, 65535, 65133, 65150, 65535, 65535, 65535, 65535, 65115, 65244, 65535, 65535, 65260, 65095, 65055, 65535, 65151, 65174, 65535, 65535, 65189, 65535, 65040, 65088, 65074, 65215, 65535, 65535, 65236, 65265, 65535, 65535, 65535, 65141, 65535, 65535, 65165, 65073, 65535, 65125, 65051, 65535, 65252, 65275, 65535, 65535, 65106, 65535, 65038, 65535, 65181, 65199, 65535, 65535, 65105, 65235, 65535, 65312,
            65535, 65071, 65535, 65535, 65217, 65164, 65535, 65535, 65535, 65087, 65535, 65535, 65142, 65535, 65274, 65107, 65061, 65535, 65124, 65253, 65535, 65535, 65198, 65535, 65043, 65535, 65160, 65182, 65535, 65091, 65535, 65535, 65188, 65171, 65535, 65535, 65535, 65085, 65535, 65535, 65259, 65241, 65535, 65044, 65114, 65535, 65064, 65149, 65535, 65535, 65130, 65535, 65535, 65281, 65222, 65224, 65535, 65535, 65205, 65535, 65535, 65535, 65172, 65144, 65535, 65535, 65535, 65187, 65535, 65535, 65242, 65112, 65535, 65054, 65093, 65258, 65535, 65131, 65535, 65535, 65079, 65535, 65535, 65535,
            65148, 65206, 65535, 65535, 65272, 65535, 65535, 65535, 65223, 65179, 65535, 65535, 65535, 65104, 65535, 65535, 65197, 65250, 65535, 65050, 65123, 65102, 65535, 65535, 65273, 65535, 65139, 65535, 65535, 65535, 65072, 65163, 65535, 65535, 65213, 65070, 256, 65535, 65262, 65234, 65535, 65535, 65535, 65196, 65535, 65535, 65180, 65156, 65535, 65060, 65103, 65271, 65535, 65535, 65251, 65122, 65535, 65535, 65535, 65535, 65162, 65140, 65535, 65535, 65086, 65535, 65535, 65535, 65233, 65214, 65535, 65535, 65069, 65535, 65098, 65267, 65535, 65535, 65245, 65118, 65046, 65535, 65096, 65192,
            65535, 65195, 65175, 65535, 65535, 65232, 65535, 65535, 65229, 65209, 65535, 65535, 65535, 65066, 65535, 65535, 65158, 65134, 65535, 65535, 65535, 65246, 65535, 65535, 65117, 65099, 65057, 65535, 65263, 65176, 65535, 65535, 65153, 65535, 65535, 65535, 65191, 65535, 65210, 65277, 65535, 65535, 65535, 65227, 65535, 65535, 65135, 65081, 65535, 65535, 65535, 65157, 65535, 268, 65254, 65127, 65052, 65535, 65108, 65202, 65535, 65535, 65183, 65535, 65535, 65535, 65113, 65201, 65535, 65218, 65535, 65535, 65078, 65266, 65535, 65535, 65238, 65143, 65535, 65535, 65535, 65075, 65535, 65535,
            65167, 65109, 65062, 266, 65284, 65255, 65535, 289, 65126, 65535, 65535, 65535, 65200, 65184, 65535, 271, 65168, 65535, 65535, 65237, 65535, 65535, 65219, 65076, 65535, 65535, 65535, 65166, 65535, 273, 65145, 65089, 267], n = [511, 0, 508, 448, 494, 347, 486, 482], l = [4, 2, 3, 4, 3, 4, 4, 5, 4, 5, 5, 6, 6, 7, 7, 8, 7, 8, 8, 9, 9, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], p = [4065, 4064, 4066, 4072, 14, 4069, 4068, 4074, 4081, 4067, 21, 4071, 4079, 70, 4080, 4077, 4095, 4087, 4091, 25, 4093, 4084, 300, 4075, 4094, 4086, 4090, 137, 4092, 4083, 4088, 4082], s = [0, 4, 10, 19], r = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
            9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15], q = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 32769, 49153, 65537], w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 8, 8, 14, 14], u = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 22, 26, 30, 34, 42, 50, 58, 66, 82, 98, 114, 130, 194, 258, 514, 2, 2];
        this.reset = function () {
            c = 0;
            e = Array(65536);
            k = h = e[0] = 0
        };
        this.getData = function () {
            var a = new RdpBuffer(e, h, k);
            a.markEnd(h + k);
            return a
        };
        this.getDecompressedLength = function () {
            return k
        };
        this.dec = function (A, y, x, z) {
            if (2 == (z & 15)) {
                var d = e, C = c, B = 0, F = 0, E = 0, I = 0, J = y, K = 0, H = 0, O = 0, D, G = 0;
                k = 0;
                h = C;
                0 != (z & 64) && (ta(d, C - 32768, d, 0, 32768), h = c = C = 32768);
                0 != (z & 128) && (C = 0, sa(d, 0, 65536, 0), g.fill(0), h = 0);
                if (32 != (z & 32))ta(A, 0, d, C, x), C += x, k = C - c; else {
                    D = 0;
                    for (y += x; J < y && !(G = A[J++] & 255, B |= G << D, H += 8, D += 8, 32 <= D););
                    B = a(B);
                    J < y ? (K = a(A[J++] & 255) & 255, O = 8) : O = 0;
                    for (; 8 <= H;) {
                        F = 0;
                        for (D = 5; 13 >= D && (12 == D || (G = a(B & 4294967295 << 32 - D), E = f[G & 511 ^ G >>> 9 ^ G >>> 4 ^ G >>> 7], 0 != (E ^ G) >>> 9 ? G = E & 511 : (E = f, I = n, x = void 0, x = (G >>> 8 ^ G & 255) >>> 2 & 15, 0 != G >>>
                            9 && (x = ~x), x &= 65535, G = E[I[x % 12]]), D != m[G])); D++);
                        B <<= D;
                        H -= D;
                        if (256 > G)d[C++] = G & 255; else if (256 < G && 289 > G) {
                            E = G - 257;
                            D = r[E];
                            F = q[E] - 1;
                            0 != D && (F += a(B & 4294967295 << 32 - D));
                            E = g;
                            I = F;
                            x = E[2] | E[3] << 16;
                            x <<= 16;
                            E[2] = x & 65535;
                            E[3] = x >>> 16 & 65535;
                            var M = E[0] | E[1] << 16;
                            x |= M >>> 16;
                            E[2] = x & 65535;
                            E[3] = x >>> 16 & 65535;
                            M = M << 16 | I;
                            E[0] = M & 65535;
                            E[1] = M >>> 16 & 65535;
                            B <<= D;
                            H -= D
                        } else if (288 < G && 293 > G)E = G - 289, F = g[E], 0 != E && (D = g, I = D[0], D[0] = D[E], D[E] = I); else if (256 == G)break;
                        for (D = 32 - H; 0 < D;)if (O < D)G = K >>> 8 - O, B |= G << 32 - H - O, H += O, D -= O, J < y ? (K = a(A[J++] & 255) &
                            255, O = 8) : O = D = 0; else {
                            O > D ? (B |= K >>> 8 - D, K <<= D, K &= 255, O -= D, H = 32) : (B |= K >>> 8 - D, H = 32, J < y ? (K = a(A[J++] & 255) & 255, O = 8) : O = 0);
                            break
                        }
                        if (0 != F) {
                            for (D = 2; 9 >= D && (G = a(B & 4294967295 << 32 - D), E = p[G & 31 ^ G >>> 5 ^ G >>> 9], 0 != (E ^ G) >>> 5 ? G = E & 31 : (E = p, I = s, x = void 0, x = G >>> 4 & 15, G = E[I[(x ^ x >>> 2 ^ x >>> 3) & 3]]), D != l[G]); D++);
                            B <<= D;
                            H -= D;
                            D = w[G];
                            E = u[G];
                            0 != D && (E += a(B & 4294967295 << 32 - D));
                            B <<= D;
                            H -= D;
                            I = C - F;
                            D = E > F ? F : E;
                            for (G = 0; 0 < D;)d[C++] = d[I++], D--;
                            for (; E > F;)G = G >= F ? 0 : G, d[C++] = d[I + G++], E--;
                            for (D = 32 - H; 0 < D;)if (O < D)G = K >>> 8 - O, B |= G << 32 - H - O, H += O, D -= O, J < y ? (K = a(A[J++] &
                                255) & 255, O = 8) : O = D = 0; else {
                                O > D ? (B |= K >>> 8 - D, K <<= D, K &= 255, O -= D, H = 32) : (B |= K >>> 8 - D, H = 32, J < y ? (K = a(A[J++] & 255) & 255, O = 8) : O = 0);
                                break
                            }
                        }
                    }
                    k = 0 != (z & 128) ? C : C - c
                }
                c = C;
                return 0
            }
            return b(A, y, x, z)
        }
    }, Ye = 0 < s.indexOf("nocurosr=on"), T = 0 < s.indexOf("startProgram=app"), Rb = 0 < s.indexOf("mapDisk=on"), ia = null;
    T && (this.reconnectOnResize = !1);
    hi5.browser.isTouch && Math.max(A, F) > Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight) && (this.reconnectOnResize = !1);
    this.isRemoteApp = function () {
        return T
    };
    if (T)if (hi5.browser.isTouch) {
        var cf =
            Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight), df = Math.max(A, F), Jb = Math.max(cf, df);
        A < Jb && (A = Jb);
        F < Jb && (F = Jb)
    } else {
        A = screen.width;
        F = screen.height;
        F -= window.outerHeight - window.innerHeight + 25;
        var Fc = C.waHeight;
        Fc ? F < parseInt(Fc, 10) && (F = parseInt(Fc, 10)) : 768 > F && 767 < screen.height && (F = 768)
    } else A &= -4, F &= -4;
    C.minWidth && A < C.minWidth && (A = C.minWidth);
    C.minHeight && F < C.minHeight && (F = C.minHeight);
    var B = null, K = !1, xa = !1, ca = new function (a) {
        var b = null;
        this.available = !1;
        this.delay =
            a;
        this.supportWebAudio = !1;
        if (0 == C.playSound || 0 < p.mode) {
            var c = window.webkitAudioContext || window.AudioContext || null;
            c ? (b = new c, this.supportWebAudio = this.available = !0) : hi5.browser.isFirefox && (this.available = !0)
        }
        this.getBuffer = function (a) {
            return b.createBuffer(2, a, Z)
        };
        var e = 0;
        this.playBuffer = function (c) {
            var h = b.createBufferSource();
            h.buffer = c;
            h.connect(b.destination);
            var k = b.currentTime, m = 0 < e ? e : k + a;
            m < k && (m = k + a);
            e = m + c.duration;
            h.noteOn(m);
            return e - k
        };
        this.iOSFix = function () {
            if (b && hi5.browser.isTouch && hi5.browser.isSafari) {
                var a =
                    this.getBuffer(1024), c = b.createBufferSource();
                c.buffer = a;
                c.connect(b.destination);
                c.noteOn(0)
            }
        }
    }(p.audioBuffer), x = Pb(A, F);
    this.setAudioBuffer = function (a) {
        p.audioBuffer = a;
        ca.delay = a;
        Aa && (Aa.delay = a)
    };
    for (var Aa = null, lc = Array(12), fc = 0; 12 > fc; fc++)lc[fc] = Array(256);
    var Nb = Array(256), U = 0, H = 0, J = A - 1, I = F - 1, ga = null, fb = null, vd = 0;
    window.$rdp = this;
    var Fa = Jc, ic = Kc;
    Lb(ba);
    this.running = function () {
        return K
    };
    this.setJoinMode = function (a) {
        K && B.send("8E1" + a)
    };
    this.refuseControl = function (a) {
        K && B.send("8E3" + a)
    };
    this.giveControl =
        function (a) {
            K && B.send("8E4" + a)
        };
    this.requestControl = function () {
        K && B.send("8E2")
    };
    var wd = {" ": 57, space: 57, pageup: 201, pagedown: 209, end: 207, home: 199, left: 203, up: 200, right: 205, down: 208, printscreen: 183, insert: 210, del: 211, "delete": 211, altgr: 184, windows: 219, windowsright: 220, context: 221, esc: 1, backspace: 14, tab: 15, enter: 28, meta: 29, command: 29, ctrl: 29, shift: 42, alt: 56, capslock: 58, f1: 59, f2: 60, f3: 61, f4: 62, f5: 63, f6: 64, f7: 65, f8: 66, f9: 67, f10: 68, f11: 87, f12: 88, numlock: 69, scrolllock: 70, add: 78};
    this.writeKeyComb = function (a) {
        a =
            a.split("+");
        var b = a.length;
        if (0 != b) {
            for (var c = null, e = 0; e < b; e++) {
                var g = a[e];
                "" == g && "" == c && (g = "Add");
                "" != g && Lc(!0, g);
                c = g
            }
            for (e = b - 1; 0 <= e; e--)g = a[e], "" == g && "" == c && (g = "Add"), "" != g && Lc(!1, g), c = g
        }
    };
    var Qb = new function () {
        this.ws = null;
        this.setJoinMode = p.setJoinMode;
        this.requestControl = p.requestControl;
        this.writeKeyComb = p.writeKeyComb;
        this.getAppMode = function () {
            return p.mode
        };
        this.send = function (a) {
            K && this.ws.send(a)
        };
        this.sendInput = function (a) {
            if (K && (this.ws.send(a), p.onactivity))p.onactivity(a)
        };
        var a = null;
        this.getAppInfo = function () {
            return p.sessionInfo.appInfo
        };
        this.onresize = function (b) {
            if (b = b.target.svSurface) {
                var c = b.getFreeSpace(), e = c.width, g = c.height;
                C.minWidth && e < C.minWidth && (e = C.minWidth);
                C.minHeight && g < C.minHeight && (g = C.minHeight);
                T ? (b = b.railWin.getMain(y.zOrders)) && kd(b, e, g) : !hi5.browser.isTouch && !hi5.browser.isOpera && p.reconnectOnResize && K && (a && (clearTimeout(a), a = null), a = setTimeout(function () {
                    4 > Math.abs(e - A) && 4 > Math.abs(g - F) || (svGlobal.logger.warn("w:" + e + " ww:" + A + " h:" + g + " hh:" + F), p.reconnect(e,
                        g))
                }, xa ? 1200 : 3E3))
            }
        };
        this.onorientationchange = function (a) {
            if (p.reconnectOnResize)p.reconnect(a.innerWidth, a.innerHeight); else if (T && a.svSurface) {
                var c = a.svSurface.railWin.getMain(y.zOrders);
                c && kd(c, a.innerWidth, a.innerHeight)
            }
        };
        this.getClipData = He;
        this.onfocus = function (a) {
            var c = a.target;
            T && c.svSurface && c.svSurface.railWin && (a = c.svSurface.railWin.getTopWin(y.zOrders)) && B && (c = c.svSurface.context) && c != x.getContext() && (x.setContext(null), a.activate(1), svGlobal.logger.info("Activate win:" + a.id))
        };
        this.fileCallback =
            [];
        this.getShareFiles = function (a, c) {
            xa && (this.ws.send("3A5" + a), this.fileCallback.push(c))
        };
        this.notifyFiles = function (a) {
            for (var c = this.fileCallback, e = 0, g = c.length; e < g; e++)c[e](a)
        };
        this.getFile = function (a) {
            p.reconnectOnResize = !1;
            window.open(p.getFileUrl(a))
        };
        this.removeFile = function (a) {
            ia && ia.fileService.remove(a)
        };
        this.getFileLink = function (a) {
            return ya() + "/DOWNLOAD?s=" + fb + "&f=" + a
        };
        this.getGateway = function () {
            return s
        };
        this.reconnect = function (a, c, e) {
            s = hi5.tool.replaceQuery(s, "user", a);
            s = hi5.tool.replaceQuery(s,
                "pwd", c);
            s = hi5.tool.replaceQuery(s, "domain", e);
            "sessionStorage"in window && sessionStorage.clear();
            window.$rdp = this;
            a = y.getFocused();
            y.removeElm(a);
            p.addSurface(a);
            p.run()
        }
    }, y = function () {
        var a = [];
        a.addSurface = function (b) {
            a.push(b)
        };
        a.hasSurface = function (b) {
            for (var c = a.length, e = 0; e < c; e++)if (a[e].equals(b))return!0;
            return!1
        };
        a.setSize = function (b, c, e) {
            for (var g = 0, h = a.length; g < h; g++)a[g].setSize(b, c, e)
        };
        a.zOrders = [];
        a.drawLicense = function (b) {
            for (var c = 0, e = a.length; c < e; c++)a[c].drawLicense(b)
        };
        a.setReadOnly =
            function (b) {
                for (var c = 0, e = a.length; c < e; c++)a[c].setReadOnly(b)
            };
        a.setVisible = function (a, c) {
            svGlobal.logger.info("TODO: setVisible")
        };
        a.copyToClip = function (b) {
            1 > a.length || a[0].copyToClip(b)
        };
        a.setCursor = function (b) {
            !T && a[0] && a[0].setCursor(b);
            var c = a.getFocused();
            c && c.setCursor(b)
        };
        a.hide = function (b) {
            if (T) {
                b = 0;
                for (var c = a.length; b < c; b++)a[b].getWindow().close()
            } else a[0].hide()
        };
        a.execute = function (b, c) {
            for (var e = 0, g = a.length; e < g; e++)a[e][b].apply(a[e], c)
        };
        a.addWin = function (b) {
            function c() {
                var a = 1 >
                    b.ownerWinid;
                if (!a)return a;
                if (0 == b.showState)return!1;
                var c = b.style;
                if (0 != (c & 4194304))return!0;
                var e = 0 != (b.extStyle & 128);
                (a = a && !e) && 0 != (c & 2147483648) && 0 == (c & 2156396544) && (a = !1);
                svGlobal.logger.info("*** win id=" + b.id + " isMain=" + a);
                return a
            }

            var e = a.getFocused();
            e || (svGlobal.logger.warn("Focusd surface not found!"), e = a[a.length - 1]);
            e ? (T = !0, e.railWin || (e.railWin = new Ie, e.onunload = function () {
                e.railWin && (e.railWin.clear(), e.railWin = null);
                a.removeElm(e)
            }), e.railWin.addWin(b), e.context && x.setContext(e.context),
                0 < p.windowState && (c() && !e.railWin.hasMain ? (b.fillBrowser(), b.activate(1), e.railWin.hasMain = !0, e.railWin.getOtherApps(a.zOrders, function (a) {
                    if (0 < a.length && p.onexistingapp)p.onexistingapp(a)
                }, 5E3)) : b.checkBound())) : svGlobal.logger.warn("No surface available!")
        };
        a.delWin = function (b) {
            for (var c, e = a.length - 1; 0 <= e; e--) {
                var g = a[e];
                c = g.railWin;
                if (0 <= c.delWin(b))if (c.isRunning())0 < p.windowState && (c = c.getTopWin(a.zOrders)) && c.titleInfo && g.getWindow() && cb(c.titleInfo + " - " + (C.displayName || p.server), g.getWindow());
                else {
                    var h = p.appTimeout;
                    c.isNew() && (h *= 10);
                    setTimeout(function (b) {
                        return function () {
                            b.railWin && b.railWin.isRunning() || a.delSurface(b)
                        }
                    }(g), h)
                }
            }
        };
        a.popWins = function (b) {
            return a[0] && a[0].railWin ? a[0].railWin.popWins(b) : []
        };
        a.getWinById = function (b) {
            for (var c, e = 0, g = a.length; e < g; e++)if (a[e].railWin && (c = a[e].railWin.getWinById(b)))return c;
            return null
        };
        a.hasApp = function (b) {
            for (var c = 0, e = a.length; c < e; c++)if (a[c].railWin.hasApp(b))return!0;
            return!1
        };
        a.delSurface = function (b) {
            b.railWin.isRunning() || (svGlobal.logger.info("delete surface..."),
                a.removeElm(b), b.close(), 0 == a.length && $a())
        };
        a.getOwnerSurface = function (b) {
            for (var c = 0, e = a.length; c < e; c++)if (a[c].railWin && a[c].railWin.hasWin(b))return a[c];
            return null
        };
        a.getFocused = function () {
            if (!T)return a[0];
            for (var b = a.length, c = 0; c < b; c++)if (a[c].focused)return a[c];
            return a[b - 1]
        };
        a.close = function () {
            for (var b = 0, c = a.length; b < c; b++)a[b] && a[b].close()
        };
        return a
    }();
    this.getSurfaces = function () {
        return y
    };
    this.hide = function () {
        y && y.hide()
    };
    var tb = new jc, ha = new sb, be = new function () {
        function a(a, b, g, h, k, m) {
            this.x = a;
            this.y = b;
            this.cx = g;
            this.cy = h;
            this.offset = k;
            this.data = m
        }

        var b = [];
        this.save = function (c, e, g, h, k, m) {
            c = new a(c, e, g, h, k, m);
            e = 0;
            for (g = b.length; e < g; e++)if (!b[e]) {
                b[e] = c;
                return
            }
            b.push(c)
        };
        this.restore = function (a, e, g, h, k) {
            for (var m, f = 0, n = b.length; f < n; f++)if ((m = b[f]) && m.x == a && m.y == e && m.cx == g && m.cy == h) {
                if (m.offset == k)return a = m.data, b[f] = null, a;
                console.log("TODO: offset")
            }
            return null
        }
    };
    this.getFileUrl = function (a) {
        return ya() + "/DOWNLOAD?s=" + fb + "&f=" + a
    };
    this.reconnect = function (a, b) {
        K && xa && (xa = !1,
            svGlobal.logger.info("reconnecting..."), B.send("8E0" + (a & -4) + "\t" + (b & -4)))
    };
    this.notify = function (a, b) {
        a = "8E6" + a;
        b && (a += "\t" + b.join(";"));
        B.send(a)
    };
    this.putFiles = ub;
    this.addSurface = function (a) {
        if (!y.hasSurface(a) && ((!T || T && p.remoteAppLogin) && x.setContext(a.context), -1 == y.indexOf(a) || !a.railWin)) {
            Pa && a.setPlayerMode();
            a.setAutoScale(0 < p.mode);
            y.addSurface(a);
            a.setSize(A, F, T ? "hidden" : null);
            a.setController(Qb);
            a.setFastCopy("on" == C.fastCopy || "true" == C.fastCopy);
            a.setTouchpad("on" == C.touchpad || "true" ==
                C.touchpad);
            a.setClipboard("on" == C.mapClipboard || "true" == C.mapClipboard);
            Rb && (a.setFileHandler(ub), ia || (ia = new mc(new Mc)));
            var b = C.keyboard;
            a.run("99997" == b || "99998" == b || "99999" == b)
        }
    };
    this.getRunninApps = function () {
        for (var a = [], b = 0, c = y.length; b < c; b++)y[b].railWin.getMain(y.zOrders) && a.push(y[b].railWin.getMain(y.zOrders).titleInfo);
        return a
    };
    this.startApp = function (a, b, c) {
        B.send("8C2" + a + "\t" + b + "\t" + c);
        var e = y[y.length - 1];
        e && (e.remoteApp = {exe: a, args: b, dir: c})
    };
    this.startExitingApp = function (a) {
        a = y.popWins(a);
        for (var b = a.length - 1; 0 <= b; b--)y.addWin(a[b])
    };
    this.VirtualChannel = function () {
        this.send = function (a) {
            a = a.getData();
            B.send("8F" + hi5.Base64.enc(a, a.length))
        }
    };
    this.addChannel = function (a) {
        a.rdp = p;
        ja = a
    };
    this.run = function () {
        setTimeout(Nc, 5);
        ca.available && ca.iOSFix()
    };
    this.getDesktop = function () {
        return x
    };
    this.mouseDown = function (a, b, c) {
        K && B.send("80" + a + "\t" + b + "\t" + c)
    };
    this.mouseMove = function (a, b) {
        K && B.send("82" + a + "\t" + b)
    };
    this.mouseUp = function (a, b, c) {
        K && B.send("81" + a + "\t" + b + "\t" + c)
    };
    this.writeKeyCode = function (a, b) {
        K && B.send("8B" + (a ? 0 : 49152) + "\t" + b)
    };
    this.writeScancode = function (a, b) {
        K && ("number" == typeof a ? (B.send("840\t" + a), B.send("8449152\t" + a)) : B.send("84" + (a ? 0 : 49152) + "\t" + b))
    };
    this.writeText = function (a) {
        K && B.send("86" + a)
    };
    this.writeRawInput = function (a) {
        K && B.send(a)
    };
    var ua = new RdpBuffer([], 0, 0), la = null, pc = 0;
    this.play = function () {
        B.send("F3")
    };
    this.pause = function () {
        B.send("F2")
    };
    this.scan = function (a) {
        B.send("F4" + (a ? "1" : "0"))
    };
    W = Y = ea = 0;
    Z = 22050;
    var Qc = !1;
    this.showMessage = function (a, b) {
        if (p.displayMsg && a) {
            var c =
                b || y.getFocused();
            c ? c.showMessage(a) : hi5.notifications.notify({msg: a})
        }
    };
    var Sb = new function () {
        var a = 0, b = 0, c = [0], e = new RdpBuffer(c, 0, 0);
        this.addFragement = function (e, h) {
            ta(e.getData(), e.getPosition(), c, b, h);
            b += h;
            a += h
        };
        this.clearFragements = function () {
            e.setPosition(0);
            e.markEnd(a);
            b = a = 0;
            return e
        }
    }, Tb = new function () {
        var a = ka(10240), b = 0, c = Ea(10240), e = 0, g = Ea(10240), h = 0, k = Ea(10240), m = 0, f = Ea(0), n = 0;
        this.getData = function () {
            return a
        };
        this.getDataSize = function () {
            return b
        };
        this.resetData = function (c) {
            a.length <
                c && (a = ka(c));
            b = c;
            return a
        };
        this.resetLumaPlane = function (a) {
            c.length < a && (c = Ea(a));
            e = a;
            return c
        };
        this.getLumaPlanceSize = function () {
            return e
        };
        this.resetOrangeChromaPlane = function (a) {
            g.length < a && (g = Ea(a));
            h = a;
            return g
        };
        this.getOrangeChromaPlane = function () {
            return h
        };
        this.resetGreenChromaPlane = function (a) {
            k.length < a && (k = Ea(a));
            m = a;
            return k
        };
        this.getGreenChromaPlane = function () {
            return m
        };
        this.resetAlphaPlane = function (a) {
            f.length < a && (f = Ea(a));
            n = a;
            return f
        };
        this.getAlphaPlane = function () {
            return n
        }
    }, Te = new function () {
        var a =
            new Ve, b = new Ue, c = new We;
        this.decode = function (b, h) {
            for (var k, m, f = b.getPosition() + h; b.getPosition() < f;) {
                k = b.getLittleEndian16();
                m = b.getLittleEndian32();
                if (0 == m)break;
                m = b.getPosition() - 6 + m;
                switch (k) {
                    case 52416:
                        k = b;
                        k.getLittleEndian32();
                        k.getLittleEndian16();
                        break;
                    case 52417:
                        b.skipPosition(4);
                        break;
                    case 52418:
                        k = b;
                        for (var n = k.getByte(), l = 0; l < n; l++) {
                            var p = k.getByte(), s = k.getLittleEndian16(), r = k.getLittleEndian16();
                            svGlobal.logger.info("Channel, id:" + p + " width:" + s + " height:" + r)
                        }
                        break;
                    case 52419:
                        k = b;
                        k.skipPosition(2);
                        c.ctxId = k.getByte();
                        c.tileSize = k.getLittleEndian16();
                        c.setProperties(k.getLittleEndian16());
                        break;
                    case 52420:
                        b.skipPosition(10);
                        break;
                    case 52421:
                        b.skipPosition(2);
                        break;
                    case 52422:
                        k = b;
                        k.skipPosition(2);
                        k.skipPosition(1);
                        n = k.getLittleEndian16();
                        l = a.resetRects(n);
                        for (p = 0; p < n; p++)s = l[p], s.x = k.getLittleEndian16(), s.y = k.getLittleEndian16(), s.width = k.getLittleEndian16(), s.height = k.getLittleEndian16();
                        k.skipPosition(4);
                        break;
                    case 52423:
                        k = b;
                        n = c;
                        k.skipPosition(6);
                        l = k.getLittleEndian16();
                        n.cct = l >>> 4 & 3;
                        n.xft =
                            l >>> 6 & 15;
                        n.et = l >>> 10 & 15;
                        n.qt = l >>> 14 & 3;
                        r = k.getByte();
                        k.skipPosition(1);
                        l = k.getLittleEndian16();
                        k.skipPosition(4);
                        for (var p = Array(10 * r), q = 0, w = void 0, s = void 0, s = 0; s < r; s++)w = k.getByte(), p[q++] = w & 15, p[q++] = w >>> 4, w = k.getByte(), p[q++] = w & 15, p[q++] = w >>> 4, w = k.getByte(), p[q++] = w & 15, p[q++] = w >>> 4, w = k.getByte(), p[q++] = w & 15, p[q++] = w >>> 4, w = k.getByte(), p[q++] = w & 15, p[q++] = w >>> 4;
                        r = a.resetTiles(l);
                        for (s = 0; s < l; s++)q = r[s], q.readHeaderfromStream(k), e(n, k, p, q.YLen, 10 * q.quantIdxY, q.CbLen, 10 * q.quantIdxCb, q.CrLen, 10 * q.quantIdxCr,
                            q.data);
                        break;
                    default:
                        System.out.println("unknown blockType 0x%X" + k)
                }
                b.setPosition(m)
            }
            return a
        };
        var e = b.decodeRgb;
        this.getResult = function () {
            return a
        }
    }, $d = (new function () {
        function a(a, c, e, g, h) {
            if (0 == e)sa(g, 0, h, 255); else if (e < h) {
                var k, m;
                k = h;
                for (h = 0; 4 < k;)m = a[c++], 5 == k ? (g[h++] = m, k--) : m == a[c] ? (c++, 255 > (a[c] & 255) ? (e = a[c++] & 255, e += 2) : (c++, e = (a[c + 3] & 255) << 24 | (a[c + 2] & 255) << 16 | (a[c + 1] & 255) << 8 | a[c] & 255, c += 4), sa(g, h, h + e, m), h += e, k -= e) : (g[h++] = m, k--);
                for (e = 0; 4 > e; e++)g[h++] = a[c++]
            } else ta(a, c, g, 0, h)
        }

        this.process =
            function (b, c, e, g, h) {
                var k = b.getLittleEndian32(), m = b.getLittleEndian32(), f = b.getLittleEndian32();
                b.skipPosition(4);
                var n = b.getByte();
                c = b.getByte();
                b.skipPosition(2);
                var l = b.getData(), p = b.getPosition();
                b = e * g;
                var s = 4 * b;
                b = h.resetData(b);
                var r = e + (~(e & 7) + 1 & 7), q = g + (~(g & 1) + 1 & 1), s = r * q, w = h.resetLumaPlane(s), u = h.resetOrangeChromaPlane(s);
                h = h.resetGreenChromaPlane(s);
                var s = e * g, q = 0 < c ? (r >> 1) * (q >> 1) : s, x = 0 < c ? q : s;
                a(l, p, k, w, 0 < c ? r * g : s);
                p += k;
                a(l, p, m, u, q);
                a(l, p + m, f, h, x);
                for (var y, A, z, k = 0, m = e + (~(e & 7) + 1 & 7), x = n - 1, f = 0; f <
                    g; f++)for (0 < c ? (l = f * m, p = (f >> 1) * (m >> 1), r = (f >> 1) * (m >> 1)) : (l = f * e, p = f * e, r = f * e), n = 0; n < e; n++)y = w[l] & 255, A = (u[p] & 255) << x << 24 >> 24, z = h[r] << x << 24 >> 24, q = y + A - z, s = y + z, y = y - A - z, y = 0 > y ? 0 : 255 < y ? 255 : y, s = 0 > s ? 0 : 255 < s ? 255 : s, q = 0 > q ? 0 : 255 < q ? 255 : q, b[k++] = 4278190080 | y << 16 | s << 8 | q, l++, p += 0 < c ? n % 2 : 1, r += 0 < c ? n % 2 : 1
            }
    }).process, $e = [1, 2, 1, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 2, 3, 1, 2, 2, 2, 2, 1, 2, 1, 0, 2, 1, 2, 3], Za = {readVar4Bytes: function (a) {
        var b = a.getByte(), c = 0;
        switch ((b & 192) >> 6) {
            case 0:
                c = b & 63;
                break;
            case 1:
                c = (b & 63) << 8 | a.getByte();
                break;
            case 2:
                c = (b & 63) << 16;
                b = a.getByte();
                c |= b << 8;
                b = a.getByte();
                c |= b;
                break;
            case 3:
                c = (b & 63) << 24, b = a.getByte(), c |= b << 16, b = a.getByte(), c |= b << 8, b = a.getByte(), c |= b
        }
        return c
    }, readVar2Bytes: function (a) {
        var b = a.getByte();
        return 0 != (b & 128) ? (b & 127) << 8 | a.getByte() : b
    }}, eb = 0;
    this.close = $a;
    hi5.browser.isChromeApp ? chrome.runtime.onSuspend.addListener($a) : window.addEventListener("unload", $a, !1);
    var R = 16777215, Ob = Array(20)
}
svGlobal.Rdp = Rdp;
var RdpBuffer = hi5.DataBuffer;
