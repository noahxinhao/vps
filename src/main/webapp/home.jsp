<%--
  Created by IntelliJ IDEA.
  User: noah
  Date: 14-6-19
  Time: 下午12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="mainPage">
<head>
    <title>用户主页</title>
    <link href="/css/bootstrap.css" rel="stylesheet">
    <jsp:include page="meta.jsp"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/plugin/jcrop/jquery.Jcrop.css" type="text/css" />
</head>
<body>
<jsp:include page="head.jsp"/>
     <div class="container">
         <div class="row">
             <div class="col-md-3">
                 <div class="list-group" ng-controller="pageUrl">
                     <div href="#" class="list-group-item disabled clearfix">
                         <img class="img-circle " style="height:40px;width: 40px" alt="why520crazy" src="http://tp3.sinaimg.cn/2530282462/180/5669530341/1"/>
                         <span><a href="javascript:void(0)">{{userName}}</a></span>
                     </div>
                     <a href="#/userDetail" ng-class="{true: 'list-group-item active', false: 'list-group-item'}[(pageTag=='userDetail')]" ng-click="changeTag('userDetail')"><span class="glyphicon glyphicon-user"></span> 基本信息</a>
                     <a href="#/vpsDetail" ng-class="{true: 'list-group-item active', false: 'list-group-item'}[(pageTag=='vpsDetail')]" ng-click="changeTag('vpsDetail')"><span class="glyphicon glyphicon-hdd"></span> VPS实例</a>
                     <a href="#/myBlog" ng-class="{true: 'list-group-item active', false: 'list-group-item'}[(pageTag=='myBlog')]" ng-click="changeTag('myBlog')"><span class="glyphicon glyphicon-book"></span> 我的博客</a>
                     <a href="#/resources" ng-class="{true: 'list-group-item active', false: 'list-group-item'}[(pageTag=='resources')]" ng-click="changeTag('resources')"><span class="glyphicon glyphicon-download-alt"></span> 资源仓库</a>
                     <a href="#/myFriends" ng-class="{true: 'list-group-item active', false: 'list-group-item'}[(pageTag=='myFriends')]" ng-click="changeTag('myFriends')"><span class="glyphicon glyphicon-comment"></span> 好友</a>
                     <a href="#/friendDynamic" ng-class="{true: 'list-group-item active', false: 'list-group-item'}[(pageTag=='friendDynamic')]" ng-click="changeTag('friendDynamic')"><span class="glyphicon glyphicon-th-list"></span> 好友动态</a>
                     <a href="#/setting" ng-class="{true: 'list-group-item active', false: 'list-group-item'}[(pageTag=='setting')]" ng-click="changeTag('setting')"><span class="glyphicon glyphicon-cog"></span> 个人设置</a>
                 </div>
             </div>
             <div class="col-md-9" ng-view>
             </div>
         </div>
     </div>
<jsp:include page="footer.jsp"/>
<script src="${pageContext.request.contextPath}/js_control/mainPage.js"></script>
<script src="${pageContext.request.contextPath}/plugin/jcrop/jquery.Jcrop.js"></script>
<script src="${pageContext.request.contextPath}/js_control/jcropPic.js"></script>
<script src="${pageContext.request.contextPath}/plugin/uploadFile/ajaxfileupload.js"></script>
</body>
</html>
