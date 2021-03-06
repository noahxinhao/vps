window.$id = function (id){
    return document.getElementById(id);
};

function checkBrowser(){
    if (hi5.browser.isChromeApp) return;

    var msg = '';
    try {
        document.createElement('canvas').getContext('2d');
    } catch (e) {
        msg = 'This browser does not support Canvas.\n\n';
    };


    var noWebSocket = !('WebSocket' in window) && !('MozWebSocket' in window);
    var userAgent = navigator.userAgent;
    var isFirefox = userAgent.indexOf('Firefox') != -1;

    if (noWebSocket){
        msg += "This browser doesn't support WebSocket.\n\n";
        if (isFirefox){
            msg += 'Please update to Firefox 6 or later.\n\n';
        }
        else if (userAgent.indexOf('Opera') != -1){
            msg += 'Please open "opera:config#Enable WebSockets" (type it in the link field) make "Enable WebSockets" selected and restart Opera.\n\n';
        }
        else if (userAgent.indexOf('MSIE') != -1){
            msg += 'Please install Google Chrome Frame.\n\n';
        }
    }

    if (msg.length > 0)
        hi5.notifications.notify(msg);

};

function initTimezone(){
    var off = new Date().getStdTimezoneOffset();
    var h = (off / 60) >> 0;
    var zone, m = off - h * 60;

    if (h == 0){
        zone = '(GMT)';
    }else{
        zone = (h < 0) ? '(GMT+' : '(GMT-';
        h = Math.abs(h);
        if (h < 10){
            zone += '0';
        }
        zone += (h + ':' + m);
    }
    var tzSelect = $id('timezone');
    var ops = tzSelect.options;
    h = ops.length;
    for (var i = 0; i < h; i++){
        if (ops[i].text.indexOf(zone) == 0){
            tzSelect.selectedIndex = i;
            break;
        }
    }
}

function initUI(){
    checkBrowser();
    if (hi5.browser.isTouch){
        $id('touchrow').style.display = 'table-row';
    }
    svGlobal.util.initDragDrop($id('dropZone'), $id('frmConn'));
    useFullBrowser();
    initTimezone();
    initServers();
    var info = $id('joinSelect');
    if (info){
        info.onchange = function(e){
            svManager.getInstance().setJoinMode(e.target.value);
        };
    }

    var control =$id('requestControl');
    if (control){
        control.onclick = function(e){
            svManager.getInstance().requestControl();
        };
    }

    var remotefx = $id('rfxOpt');
    if (remotefx){
        remotefx.onchange = function(e){
            if (e.target.checked){
                $id('colorOpt').selectedIndex = 3;//32 bit color
            }
        };
    }
    var sw = $id('sameWindow');
    if (sw){
        sw.checked = hi5.browser.isiOS || hi5.browser.isIE || hi5.browser.isChromeApp;
    }
    if (hi5.browser.isChromeApp){
        $id('sameParent').style.visibility = 'hidden';
    }
    $id('frmConn').onsubmit = connectRDP;

    var elms = $id('frmConn').elements;
    var domain = elms['domain'];
    if (domain && !domain.value && hi5.appcfg && hi5.appcfg.domain){
        domain.value = hi5.appcfg.domain;
    }

    var last = hi5.storage.get('__RDP_LAST');
    if (last){
        Connection.loadToForm($id('frmConn'), last);
        $id('frmConn').elements['pwd'].focus();
    }
}

window.addEventListener('load', initUI, false);

function initServers(){
    var gw = $id('gateway');
    var h = gw.value;
    if (!h){
        h = hi5.tool.queryToObj().gateway;//gateway value in the url
        if (!h && !hi5.browser.isChromeApp){
            h = window.location.host;
            if (!h) h = 'localhost';
        }

        gw.value = h || "www.remotespark.com:8080";
    }

    var server = $id('server');

    var save = $id('save');
    var clear = $id('clear');
    var remove = $id('delete');

    if (!Connection.hasStorage){
        save.style.visibility='hidden';
        clear.style.visibility='hidden';
        remove.style.visibility='hidden';
        return;
    }

    loadServers().onchange = function(){
        var key = server.value;
        Connection.loadToForm($id('frmConn'), key);
    };

    save.onclick = function(){
        if (server.value.length < 1){
            hi5.notifications.notify('Please enter computer name.');
            return null;
        }

        Connection.saveForm($id('frmConn'));
        loadServers();
    };

    clear.onclick = function(){
        if (hi5.ui.confirm('All saved data will be removed?')){
            Connection.clear();
            loadServers();
            server.value = '';
        }
    };

    remove.onclick = function(){
        var key = $id('server').value;
        if (key.length < 1){
            hi5.notifications.notify('Please select a computer first.');
            return;
        }
        Connection.remove(key);
        loadServers();
        server.value = '';
    };

    //syncronize computers with gateway, remove following two lines and serverListCallback if you don't want to do so.
    if (!hi5.browser.isChromeApp){
        var addr = (('https:' == location.protocol) ?  'wss://' : 'ws://') + gw.value + '/LIST';
        getServers(addr, serverListCallback);
    }
}

function loadServers(){
    var svrs = Connection.getAll();
    var srvs = $id('server');
    var ops = $id('server').options;
    ops.length = 0;
    for (var i = 0, l = svrs.length; i < l; i++){
        ops[i] = new Option(svrs[i]);
    }
    return srvs;
}

function useFullScreen(){
    $id('width').value = screen.width;
    $id('height').value = screen.height;
};

function useFullBrowser(){
    $id('width').value = 0;
    $id('height').value = 0;
};

function registerRdp(){
    if ('registerProtocolHandler' in navigator){
        navigator.registerProtocolHandler('web+rdp', location.protocol +'//' + location.host + '/rdpdirect.html?%s', 'Spark View');
    }
    else{
        hi5.notifications.notify("Sorry, your browser doesn't support this.");
    }
}

function connectRDP(e){
    e.preventDefault();
    $id('server').hide();
    var frms = $id('frmConn').elements;
    var l = frms.length;
    var s = '"server=54.64.86.49&port=3389&user=Administrator&pwd=V%3D%3B3xHDQhjY&keyboard=1033&width=0&height=0&fullBrowser=Full%20browser&fullScreen=Full%20screen&server_bpp=16&timezone=(GMT%2B08%3A00)%20W.%20Australia%20Standard%20Time&playSound=0&soundPref=0&mapClipboard=on&mapPrinter=on&mapDisk=on&startProgram=noapp&clear=Clear&delete=Delete&save=Save&connect=Connect"';
    var gw = 'winser.imdou8.com:8080';
    var w = window.innerWidth, h = window.innerHeight, server_bpp = 16;
    /*for (var i = 0; i < l; i++){
        var field = frms[i];
        if ((field.type=='radio' || field.type=='checkbox') && !field.checked) continue;
        var v = field.value;
        if (v == '')continue;
        var n = field.name;
        if (n == 'gateway'){
            gw = v;
            continue;
        }
        else if (n == 'width'){
            w = v;
            continue;
        }
        else if (n == 'height'){
            h = v;
            continue;
        }
        else if (n == 'server_bpp'){
            server_bpp = v;
            continue;
        }

        if (s != '') s += '&';
        s += (n + '=' + encodeURIComponent(v));
    }*/

    var protocol = ('https:' == location.protocol) ? 'wss://' : 'ws://';
    var isRemoteApp = $id('app').checked;
    var newWin = $id('sameWindow') ? !$id('sameWindow').checked : true;//open in new window

    if (newWin && !isRemoteApp){//forward to rdpdirect.html
        var opr = window.opener;
        if (opr) {
            var usr = null;
            try {
                usr = opr.__sparkUser;
            }catch (e) {

            }
            if (usr) {
                window.__sparkUser = usr;
            }
        }

        if (!hi5.appcfg.params || 'url' == hi5.appcfg.params){
            window.open('rdpdirect.html?' + s + '&gateway=' + gw);
        }else{
            var params = hi5.tool.queryToObj(s + '&gateway=' + gw);
            if ('object' == hi5.appcfg.params){
                window.__sparkUser = {server: params};
            }else{
                hi5.browser.objToCookie(params);
            }
            //window.open('rdpdirect.html');
            window.open('rdpdirect.html');
        }
        return false;
    }

    if (!newWin){
        $id('login').style.display = 'none';
    }

    hi5.storage.set('__RDP_LAST', $id('server').value);
    hi5.storage.commit();

    var frmConn = $id('frmConn');
    var r = svManager.getInstance();
    if (r == null){
        r = new svGlobal.Rdp(protocol + gw + '/RDP?' + s, w, h, server_bpp);
        r.onexistingapp = foundExistingApp;
    }else{
        var apps = r.getRunninApps();
        var len = apps.length;
        var isApp = $id('app').checked;
        var warn = r.isRemoteApp() && (!isApp);
        if (warn){
            var s = 'Warning: A RemoteApp session is still active.\n\n';
            for (var i = 0; i < len; i++){
                s += apps[i] + '\n';
            }
            s += '\nPlease open a new Window for new sessions.\n';
            hi5.notifications.notify(s);
            return false;
        }
    }

    if (newWin){
        function onSurfaceReady(surface){
            r.addSurface(surface);
            console.log('remoteApp: ' + frmConn['exe'].value + ' arg=' + frmConn['args'].value);
            if (r.running())
                r.startApp(frmConn['exe'].value, frmConn['args'].value, '');
        };
        window.svOnSurfaceReady = onSurfaceReady;
        var rail = window.open('rail.html');
        rail.svOnSurfaceReady = onSurfaceReady;
    }else{
        r.onclose = function(){
            r.hide();
            $id('login').style.display = 'block';
        };
        r.addSurface(new svGlobal.LocalInterface());
    }

    r.onremoteappstart = function(e){
        console.log('remoteapp started:' + e.id);
    };

    r.onerror = function(e){
        console.log(e.name + ':' + e.message);
    };

    r.run();
    return false;
};


function serverListCallback(hasNew, connected){
    if (!connected){
        hi5.notifications.notify('Failed to connect to gateway for synchronization.');
        return;
    };

    if (!hasNew) return;
    loadServers();
    hi5.notifications.notify('Synchronization finished! new computers added to the list.');
}

function getServers(addr, callback) {
    var ts = Connection.getValue(Connection.KEY_TIMESTAMP);
    ts = (!ts) ? '' : ('?since=' + ts);
    if (hi5.appcfg && (typeof hi5.appcfg.useWSS == 'boolean')) {
        addr = ((hi5.appcfg.useWSS) ? 'wss' : 'ws') + addr.substring(addr.indexOf('://'));
    }

    var ws = new hi5.WebSocket(addr + ts);
    var _connected = false;
    var _hasNew = false;
    ws.onmessage = function(e) {
        _connected = true;
        svGlobal.logger.debug(e.data);
        var rdpServers = JSON.parse(e.data);
        if (rdpServers.lastModified)
            Connection.setValue(Connection.KEY_TIMESTAMP, rdpServers.lastModified + '');
        var conn = rdpServers.connections;
        if (conn) {
            for (var i = 0, l = conn.length; i < l; i++) {
                var c = conn[i];
                if (Connection.getValue(c.id)) continue;
                Connection.save(c.id, connvertServer(c));
                _hasNew = true;
            }
        }
        ws.close();
    };
    ws.onclose = function(e) {
        callback(_hasNew, _connected);
    };
}


var Connection = {
    KEY_IDS: '__CONNS',
    KEY_TIMESTAMP: '__TIMESTAMP',
    hasStorage: hi5.storage.isAvailable,
    getAll: function() {
        var s = hi5.storage.get(this.KEY_IDS);
        if (!s) return new Array(0);
        return s.split(',');
    },

    saveForm: function(frm) {
        var frms = frm.elements;
        var l = frms.length;
        var obj = new Object();
        var svr = null;
        for (var i = 0; i < l; i++) {
            var field = frms[i];
            if ('button' == field.type) continue;
            var n = field.name || field.id;
            var v = field.value;
            if ('server' == n) {
                svr = v;
            }
            if (field.type == 'checkbox') {
                v = field.checked;
            }else if (field.type == 'radio') {
                if (!field.checked) continue;
            }

            if ('width' == n) {
                v = parseInt(v, 10);
                if (v == document.documentElement.clientWidth || v == screen.width)
                    continue;
            }


            if ('height' == n) {
                v = parseInt(v, 10);
                if (v == document.documentElement.clientHeight || v == screen.height)
                    continue;
            }


            if ('pwd' == n) {
                continue;//don't save password
            }

            obj[n] = v;
        }
        return this.save(svr, obj) ? svr : null;
    },

    save: function(key, obj) {
        if (!key) return false;
        hi5.storage.set(key, JSON.stringify(obj));
        var ids = hi5.storage.get(this.KEY_IDS);
        if (!ids) {
            ids = key;
        }
        else {
            if (ids.split(',').indexOf(key) < 0) {
                ids = ids + ',' + key;
            }
        }
        hi5.storage.set(this.KEY_IDS, ids);
        hi5.storage.commit();
        return true;
    },

    loadToForm: function(frm, key) {
        if (!key) return false;
        var s = hi5.storage.get(key);
        if (!s) return false;
        var obj = JSON.parse(s);
        var frms = frm.elements;
        for (var i = 0, l = frms.length; i < l; i++) {
            var field = frms[i];
            var type = field.type;
            if (('button' == type) || 'submit' == type) continue;
            var n = field.name || field.id;
            var v = obj[n];
            if (typeof v == 'undefined') {
                if (n == 'gateway') continue;
                switch (type) {
                    case 'text': field.value = '';break;
                    case 'checkbox': field.checked = false;
                    case 'radio': field.checked = false;
                }
                continue;
            }

            if (n == 'startProgram') {
                if (field.id == 'shell') {
                    field.checked = (v == true || v == 'shell');
                    field.value = 'shell';//for upgrade, the value is boolean in old version
                }else {
                    field.checked = (v == field.id);
                }
                continue;
            }


            if (type == 'checkbox') {
                field.checked = v;
            }
            else {
                field.value = v;
            }

        }
        return true;
    },

    clear: function() {
        hi5.storage.clear();
        hi5.storage.commit();
    },

    remove: function(key) {
        hi5.storage.remove(key);
        var all = this.getAll();
        all.removeElm(key);
        hi5.storage.set(this.KEY_IDS, all.join(','));
        hi5.storage.commit();
    },

    getValue: function(key) {
        return this.hasStorage ? hi5.storage.get(key) : null;
    },

    setValue: function(key, value) {
        hi5.storage.set(key, value);
        hi5.storage.commit();
    }
};


function startExitingApp(id){
    var r = svManager.getInstance();
    function onSurfaceReady(surface){
        r.addSurface(surface);
        r.startExitingApp(id);
    };
    window.svOnSurfaceReady = onSurfaceReady;
    var page = (hi5.appcfg && hi5.appcfg.page && hi5.appcfg.page.rail) ? hi5.appcfg.page.rail : 'rail.html';
    var rail = window.open(page);
    rail.svOnSurfaceReady = onSurfaceReady;
    var target = document.getElementById(id);
    var p = target.parentNode;
    p.removeChild(target);
    p = p.parentNode;
    if (p.getElementsByTagName("input").length == 0){
        p.dismiss();//it's a svGlobal.util.lightbox
    }
}

function foundExistingApp(apps){
    var s = "";
    for (var i = 0, l = apps.length; i < l; i++){
        var win = apps[i].win;
        var id = win.id;
        var title = apps[i].title;
        if (!title){
            continue;
        }
        s += '<p><input type="button" id="' + id + '" onclick="startExitingApp(' + id + ')" value="' + title + '"/></p>';
    }
    if (!s) return;
    var div = document.createElement("div");
    div.style.backgroundColor = "white";
    div.style.padding = "2em";
    div.innerHTML = "<h3>Applications are still running in this session:</h3><p>Please open and quite out them from the appplicaiton's File menu</p>" + s;
    document.documentElement.appendChild(div);
    var dlg = hi5.Lightbox(div);
    dlg.show();
}
