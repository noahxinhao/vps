<%--
  Created by IntelliJ IDEA.
  User: noah
  Date: 14-6-19
  Time: 下午12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>完善注册信息</title>
    <link href="/css/bootstrap.css" rel="stylesheet">
    <jsp:include page="meta.jsp"/>
    <style>
        #editor {
            overflow: scroll;
            max-height: 300px
        }
    </style>
</head>
<body>
<jsp:include page="head.jsp"/>
<div class="container">
    <div class="row"  ng-app="userSignin">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-12 hidden-xs hidden-sm" style="height: 70px"></div>
                <div class="col-md-6 col-md-offset-3">

                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="footer.jsp"/>
<script src="${pageContext.request.contextPath}/js_control/signin.js"></script>
<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101155638" data-redirecturi="http://www.imdou8.com/qc_callback.html" charset="utf-8"></script>

<script type="text/javascript">
    QC.Login({
        btnId:"qqLoginBtn"    //插入按钮的节点id
    });
</script>
</body>
</html>
