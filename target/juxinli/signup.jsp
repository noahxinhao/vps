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
    <title>注册</title>
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
                <div class="col-md-12" style="height: 50px"></div>
                <div class="col-md-8">
                </div>
                <div class="col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">用户注册
                                <span class="pull-right" style="font-size: 13px">已有帐号？您可以直接<a href="/signin">登录</a></span>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <form role="form" class="im-editor">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">邮箱/手机号码</label><span class="pull-right hidden">手机号码错误</span>
                                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="请输入邮箱或手机号码">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">密&nbsp;码</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="请输入6~15位密码">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">确认密码</label>
                                    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="请确认密码">
                                </div>
                                <div class="row clearfix" style="margin-bottom: 10px">
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
                                <button type="submit" class="btn btn-default pull-right">&nbsp;&nbsp;注&nbsp;&nbsp;&nbsp;&nbsp;册&nbsp;&nbsp;</button>
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
