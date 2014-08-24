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
    <title>
         <c:if test="${status=='success'}">发表成功</c:if>
         <c:if test="${status=='fail'}">发表失败</c:if>
    </title>
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
                            发表成功，请耐心等待审核<br>
                            <p><span id="timer">5</span>秒后转到首页...</p>
                        </strong>
                    </c:if>
                    <c:if test="${status=='fail'}">
                        <strong style="color: darkred">
                            对不起，发表失败<br/>
                        </strong>
                    </c:if>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="footer.jsp"/>
<input type="hidden" value="${status}" id="status">
<script>
    $(document).ready(function(){
        if($("#status").val()=="success"){
            var count = 5;
            var t = setInterval(function(){
                $("#timer").html(--count);
                if(count<=0){
                    clearInterval(t);
                    window.location.href = $("#applicationContextPath").val()+"/index";
                }
            },1000);
        }
    });
</script>
</body>
</html>
