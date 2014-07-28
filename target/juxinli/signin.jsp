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
    <title>登录</title>
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
                     <div class="col-md-12" style="height: 70px"></div>
                     <div class="col-md-8">
                     </div>
                     <div class="col-md-4">
                         <div class="panel panel-default">
                             <div class="panel-heading">
                                 <h3 class="panel-title">用户登录
                                     <span class="pull-right" style="font-size: 13px">还没有帐号？请先<a href="/signup">注册</a></span>
                                 </h3>
                             </div>
                             <div class="panel-body">
                                 <form role="form" class="im-editor">
                                     <div class="form-group">
                                         <label for="exampleInputEmail1">用户名</label>
                                         <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
                                     </div>
                                     <div class="form-group">
                                         <label for="exampleInputPassword1">密&nbsp;码</label>
                                         <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                     </div>
                                     <div class="row clearfix">
                                         <div class="col-md-12">
                                             <label for="exampleInputPassword1">验证码</label>
                                         </div>
                                         <div class="col-md-7">
                                             <input type="text" class="form-control col-md-6"  id="exampleInputPassword3" placeholder="请输入验证码">
                                         </div>
                                         <div class="col-md-5">
                                             <label for="exampleInputPassword3" class="control-label">验证码</label>
                                         </div>
                                     </div>
                                     <div class="checkbox" style="margin-bottom: 10px">
                                         <label>
                                             <input type="checkbox"> 记住我
                                         </label>
                                     </div>
                                     <button type="submit" class="btn btn-default pull-right">&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;&nbsp;</button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
<jsp:include page="footer.jsp"/>
</body>
</html>
