<%--
  Created by IntelliJ IDEA.
  User: noah
  Date: 14-6-19
  Time: 下午12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="articles">
<head>
    <title>${article.basic.title}  - IMDOU8</title>
    <link href="/css/bootstrap.css" rel="stylesheet">
    <jsp:include page="meta.jsp"/>

    <%--代码高亮--%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shCore.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushBash.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushCpp.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushCSharp.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushCss.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushDelphi.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushDiff.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushGroovy.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushJava.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushJScript.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushPhp.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushPlain.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushPython.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushRuby.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushScala.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushSql.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushVb.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plugin/syntaxhighlighter/scripts/shBrushXml.js"></script>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/plugin/syntaxhighlighter/styles/shCore.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/plugin/syntaxhighlighter/styles/shCoreDefault.css"/>
    <script type="text/javascript">
        SyntaxHighlighter.config.clipboardSwf = 'plugin/syntaxhighlighter/scripts/clipboard.swf';
        SyntaxHighlighter.all();
    </script>
</head>
<body>
<jsp:include page="head.jsp"/>
     <div class="container">
         <div class="row">
             <div class="col-md-3 hidden-sm hidden-xs">
                 <div class="row" ng-controller="datail">
                     <div id="leftPin">
                         <div class="col-md-12" >
                             <div class="panel panel-default">
                                 <div class="panel-heading">博主资料</div>
                                 <div class="panel-body">
                                     <div class="thumbnail" style="border: 0px">
                                         <c:if test="${author!=null&&author!=''}">
                                             <img alt="${author.real_name}" src="/images/u/${author.user_img_path}" style="width: 85%;">
                                         </c:if>
                                         <c:if test="${author==null||author==''}">
                                             <img alt="" src="/images/u/default.png" style="width: 85%;">
                                         </c:if>
                                     </div>
                                     <div class="caption" style="border-top: 1px dashed">
                                         <h3>${author.real_name}</h3>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div class="col-md-12">
                             <div class="panel panel-default">
                                 <div class="panel-heading">最新发表</div>
                                 <div class="panel-body">
                                     Panel content
                                 </div>
                             </div>
                         </div>
                         <div class="col-md-12">
                             <div class="panel panel-default">
                                 <div class="panel-heading">好友关注</div>
                                 <div class="panel-body">
                                     Panel content
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="col-md-9 col-md-12 im-details-content ">
                 <div class="panel panel-default ">
                     <div class="panel-heading" style="font-size: 16px"><span class="label label-info">${article.basic.tag}</span> ${article.basic.title}</div>
                     <div class="panel-body">
                         ${article.basic.content}
                     </div>
                 </div>
                 <div class="panel panel-success">
                     <div class="panel-heading">评论</div>
                     <div class="panel-body">
                         <!-- UY BEGIN -->
                         <script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=1962664"></script>
                         <div id="uyan_frame"></div>
                         <!-- UY END -->
                     </div>
                 </div>
             </div>
         </div>
     </div>
<jsp:include page="footer.jsp"/>
<input type="hidden" id="article_id" value="${article_id}">
<script src="${pageContext.request.contextPath}/js_control/details.js"></script>
</body>
</html>
