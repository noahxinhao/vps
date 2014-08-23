<%--
  Created by IntelliJ IDEA.
  User: noah
  Date: 14-6-19
  Time: 下午12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>账户验证</title>
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
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-12" style="height: 120px"></div>
                <div class="col-md-6 col-md-offset-3 text-center" style="font-size: 21px">
                    <c:if test="${status=='success'}">
                        <strong style="color: darkgreen">
                            恭喜您:${sysUser.account},您的${type}验证已通过<br/>现在您可以申请免费vps服务
                        </strong>
                    </c:if>
                    <c:if test="${status=='fail'}">
                        <strong style="color: darkred">
                            对不起，您的帐号验证未通过<br/>请检查您的验证链接是否正确
                        </strong>
                    </c:if>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
