<%--
  Created by IntelliJ IDEA.
  User: noah
  Date: 14-6-19
  Time: 下午12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="blogApp">
<head>
    <title>技术交流</title>
    <link href="/css/bootstrap.css" rel="stylesheet">
    <jsp:include page="meta.jsp"/>
    <style>
        #editor {overflow:scroll; max-height:300px}
    </style>
</head>
<body>
<jsp:include page="head.jsp"/>
     <div class="container">
         <div class="row">
             <div class="col-md-12">
                 <div class="row">
                     <div class="col-md-7"></div>
                     <div class="col-md-5">
                         <form class="navbar-form navbar-right" role="search">
                             <a href="/editor" target="_blank" class="pull-right btn btn-info btn-sm"><span class="glyphicon glyphicon-pencil"></span> 发布新帖</a>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
         <div class="row">
             <div class="col-md-9" ng-controller="blogsController">
                 <div class="row text-center" ng-class="{true:'row text-center hidden',false:'row text-center'}[js_ready]">
                     <img class="img-circle " src="/img/loadding.gif" style="height: 60px;width: 60px"/>
                 </div>
                 <div class="row hidden" ng-class="{true:'row',false:'row hidden'}[js_ready]">
                         <div class="panel panel-default im-panel  col-md-12" ng-repeat="article in blogs">
                             <div class="panel-heading im-panel-header clearfix">
                                 <img class="img-circle " alt="{{article.authorInfo.userName}}" ng-src="${pageContext.request.contextPath}/images/u/{{article.authorInfo.userImg}}"/>
                                 <span><label class="label label-info" style="font-size: 14px">{{article.basic.tag}}</label>  <a target="_blank" href="${pageContext.request.contextPath}/details/{{article.basic.article_id}}">{{article.basic.title}}</a></span>
                             </div>
                             <div class="panel-body">
                                 <a target="_blank" href="${pageContext.request.contextPath}/details/{{article.basic.article_id}}" style="color:rgb(87, 87, 87)">{{article.basic.content}}</a>
                             </div>
                             <div class="im-panel-footer">
                                 <div class="col-md-8">
                                     <ul class="list-inline">
                                         <li>发布于:{{article.basic.createTime}}</li>
                                         <li>作者:{{article.authorInfo.userName}}</li>
                                         <li>阅读(1045)</li>
                                     </ul>
                                 </div>
                                 <div class="col-md-4">
                                     <ul class="list-inline pull-right">
                                         <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-thumbs-up"></span></a> (1034)</li>
                                         <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-thumbs-down"></span></a> (90)</li>
                                     </ul>
                                 </div>
                             </div>
                         </div>
                 </div>
             </div>
             <div class="col-md-3">
                 <div class="panel panel-info">
                     <div class="panel-heading">
                         <h3 class="panel-title">站点公告</h3>
                     </div>
                     <div class="panel-body">
                         Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.
                     </div>
                 </div>
                 <div class="panel panel-default">
                     <div class="panel-heading">
                         <h3 class="panel-title">最新文章</h3>
                     </div>
                     <div class="panel-body">
                         <ul class="list-unstyled">
                             <li>Some default panel content here</li>
                             <li>Nulla vitae elit libero, a pharetra augue</li>
                             <li>Aenean lacinia bibendum nulla sed consectetur. </li>
                             <li>Aenean eu leo quam. Pellentesque ornare sem </li>
                             <li>lacinia quam venenatis vestibulum. Nullam id dolor</li>
                             <li>id nibh ultricies vehicula ut id elit.</li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
     </div>
<jsp:include page="footer.jsp"/>
<script src="${pageContext.request.contextPath}/js_control/blog.js"></script>
</body>
</html>
