<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>IMDOU8 - VPS试用</title>
    <meta name="viewport" content="width = device-width, initial-scale = 1.0, user-scalable = yes, minimum-scale = 0.1, maximum-scale = 8">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/plugin/rdp/hi5.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/plugin/rdp/rdp.css">

    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/rdp/appcfg.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/rdp/resource.js"></script>
    <script type="text/javascript" src="http://winser.imdou8.com:8080/strings-zh-CN.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/rdp/hi5_min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/rdp/surface_min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/rdp/rdp_min.js"></script>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath}/plugin/rdp/rdp.js"></script>--%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/rdp/rdpdirect.page.js"></script>
</head>
<body style="overflow: hidden;">

<div>
    <canvas id="remotectrl" width="1296" height="84" style="outline: none;"></canvas>
    <div contenteditable="true" accesskey="f" id="wsinput" tabindex="1" style="resize: none; position: absolute; margin: 0px; border: none; outline: none; left: 0px; top: 0px; padding: 68.8px 0px 0px 907.9px; width: 388.1px; height: 15.2px; z-index: 88; cursor: url(data:image/x-icon;base64,AAACAAEAICAAAAoACgAoEQAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAD///////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////wAAAP8AAAAAAAAAAAAAAP///////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAD///////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////wAAAP///////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////////////////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////////////////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////////////////////////////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////////////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAYAAAAHAAAAB4AAAAfAAAAH4AAAB/AAAAf4AAAH/AAAB+AAAAdgAAAGYAAABDAAAAAwAAAAGAAAABgAAAAMAAAADAAAAAAAAAAAAD//////////////////////////////////////////////////////9/////P////x////8P////B////wP///8B////AP///wB///8AP///AB///wAP//8A////AP///xh///84f///fD////w////+H////h////8///////w==) 10 10, default; font-size: 1px; font-weight: bold; overflow: hidden;"></div></div>

<!-- filecontainer is used for file share -->
<div id="filecontainer" style="overflow:auto;display:none; width:85%"><div id="total" class="progressback" style="display: none">                        上传中...<div class="progressfront"></div>                        </div>                        <div class="th">你的位置： <span id="parentPath"></span><input type="file" id="uploadfile" name="upload" multiple=""></div>                        <table id="filelist" summary="File List">                        <thead>                            <tr>                            <th scope="col">名称</th>                            <th scope="col">类型</th>                            <th scope="col">大小</th>                            <th scope="col">修改日期</th>                            <th scope="col">动作</th>                            </tr>                        </thead>                        <tbody>                            <tr style="cursor: pointer">                                <td></td>                                <td></td>                                <td align="right"></td>                                <td></td>                                <td><img id="__sv_download__" src="${pageContext.request.contextPath}/plugin/rdp/download.png" title="下载" name="download"><img id="__sv_view__" src="${pageContext.request.contextPath}/plugin/rdp/view.png" name="view" title="打开"><img id="__sv_del__" src="${pageContext.request.contextPath}/plugin/rdp/del.png" name="delete" title="删除"></td>                            </tr>                        </tbody>                        </table></div>
<div id="appinfo" class="appdlg" style="position: absolute; z-index: 1000; visibility: hidden; display: none; left: 445px; top: 145.666666666667px;">
    <img alt="" src="info.png" style="float:left">
    <table>
        <tbody>
        <tr><td align="right"><b>Connected to:</b></td><td><span id="connectingTo">54.64.86.49</span><br></td></tr>
        <tr><td align="right"><b>Session id:</b></td><td><span id="numericId">328858267</span><br></td></tr>
        </tbody>
        <tbody id="shadowing">
        <tr><td align="right"><b>Join mode:</b></td><td>
            <select id="joinSelect">
                <option value="0">Every one can control</option>
                <option value="1">Only one can control</option>
            </select><br></td></tr>
        <tr><td colspan="2"><b>Join this session with following link:</b><br><a id="joinLink" target="_blank" href="http://winser.imdou8.com:8080/join.html?id=328858267">http://winser.imdou8.com:8080/join.html?id=328858267</a></td></tr>
        <tr><td></td><td align="right"><input type="button" id="requestControl" value="Request Control" disabled=""></td></tr>
        </tbody>
    </table>
    <div style="overflow:auto;height:150px;display:none" id="touchGesture">

        Tap <img src="kbd.png" align="middle"> to activate soft keyboard. IE doesn't support 3 finger gestures and 2 finger scroll (mouse wheel).
        <table>
            <tbody><tr><td><img src="longpress.png"></td><td>Long press</td><td>Right click</td></tr>
            <tr><td><img src="flick.png"></td><td>Flick</td><td>Scroll screen if remote desktop resolution is bigger, <br>otherwise, drag</td></tr>
            <tr><td><img src="pan.png"></td><td>Pan</td><td>Drag</td></tr>
            <tr><td><img src="2tap.png"></td><td>2 finger tap</td><td>Right click</td></tr>
            <tr><td><img src="2scroll.png"></td><td>2 finger scoll</td><td>Mouse wheel</td></tr>
            <tr><td><img src="3tap.png"></td><td>3 finger tap</td><td>Show software keyboard (iOS only)</td></tr>
            <tr><td><img src="3open.png"></td><td>3 finger pinch open</td><td>Maximize window</td></tr>
            <tr><td><img src="3close.png"></td><td>3 finger pinch close</td><td>Restore window</td></tr>
            <tr><td><img src="3left.png"></td><td>3 finger flick left</td><td>Previous window</td></tr>
            <tr><td><img src="3right.png"></td><td>3 finger flick right</td><td>Next window</td></tr>
            <tr><td><img src="3down.png"></td><td>3 finger flick down</td><td>Minimize all windows</td></tr>
            <tr><td><img src="3up.png"></td><td>3 finger flick up</td><td>Restore all windows</td></tr>
            </tbody></table>
    </div>
</div>
<div id="pc_key"><span>Ctrl</span><span>Alt</span><span>Del</span><span>Esc</span><span>...</span>
    <div id="pc_key_more">
        <span>F1</span><span>←</span><span>↑</span><span>→</span><span>↓</span><span>Start</span><span>Alt+F4</span><span>Ctrl+Alt+Del</span>
    </div>
</div>
<div class="toolbar" id="svToolbar" tabindex="999" style="display: none;">


    <img src="info.png" title="Information" id="svInfo">
</div>

<div id="hi5_notifer_all"></div></body></html>