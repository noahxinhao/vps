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
    <title>用户主页</title>
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
             <div class="col-md-3">
                 <div class="list-group">
                     <div href="#" class="list-group-item disabled clearfix">
                         <img class="img-circle " style="height:40px;width: 40px" alt="why520crazy" src="http://tp3.sinaimg.cn/2530282462/180/5669530341/1"/>
                         <span><a href="javascript:void(0)">noahli</a></span>
                     </div>
                     <a href="#" class="list-group-item"><span class="glyphicon glyphicon-user"></span> 基本信息</a>
                     <a href="#" class="list-group-item"><span class="glyphicon glyphicon-hdd"></span> VPS实例</a>
                     <a href="#" class="list-group-item"><span class="glyphicon glyphicon-book"></span> 我的博客</a>
                     <a href="#" class="list-group-item"><span class="glyphicon glyphicon-download-alt"></span> 资源仓库</a>
                     <a href="#" class="list-group-item"><span class="glyphicon glyphicon-comment"></span> 好友</a>
                     <a href="#" class="list-group-item"><span class="glyphicon glyphicon-th-list"></span> 好友动态</a>
                     <a href="#" class="list-group-item"><span class="glyphicon glyphicon-cog"></span> 个人设置</a>
                 </div>
             </div>
             <div class="col-md-9">
                 <div class="panel panel-default">
                     <div class="panel-heading">
                         <h3 class="panel-title">基本信息</h3>
                     </div>
                     <div class="panel-body">
                         <div class="row">
                             <dl class=" col-md-8 col-md-offset-2">
                                 <dt>用户名:</dt>
                                 <dd>noahxinhao</dd><br/>
                                 <dt>邮箱:</dt>
                                 <dd>noahxinhao@gmail.qq.com</dd><br/>
                                 <dt>电话:</dt>
                                 <dd>18721988563</dd>
                             </dl>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
<jsp:include page="footer.jsp"/>
</body>
</html>
