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
                <div class="col-md-12" style="height: 70px"></div>
                <div class="col-md-8">
                    <img src="${pageContext.request.contextPath}/img/signinbg2.jpg" style="width: 100%"/>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">用户登录
                                <span class="pull-right" style="font-size: 13px">还没有帐号？请先<a href="/signup">注册</a></span>
                            </h3>
                        </div>
                        <div class="panel-body" ng-controller="signinController">
                            <form role="form" class="im-editor" name="signinForm" novalidate ng-submit="submitForm()">
                                <div class="form-group"
                                     ng-class="{true: 'form-group has-error', false: 'form-group'}[(signinForm.account.$invalid && submitted)||wrongAccount]">
                                    <label for="Inputaccount1">邮箱/手机号码</label>
                                         <span class="pull-right"
                                               ng-show="(signinForm.account.$dirty && signinForm.account.$invalid&& submitted)||wrongAccount">
                                        <small ng-show="signinForm.account.$error.required">请输入邮箱或手机号码</small>
                                        <small ng-show="signinForm.account.$error.minlength">请输入6~15位字符</small>
                                        <small ng-show="signinForm.account.$error.maxlength">请输入6~15位字符</small>
                                        <small ng-show="!signinForm.account.$error.minlength&&!signinForm.account.$error.maxlength&&!signinForm.account.$error.required&&!signinForm.account.$invalid && wrongAccount">用户名不存在</small>
                                        <small ng-show="!signinForm.account.$error.minlength&&!signinForm.account.$error.maxlength&&!signinForm.account.$error.required&&signinForm.account.$invalid">
                                            请输入正确格式的邮箱地址或手机号码
                                        </small>
                                    </span>
                                    <input type="text"
                                           placeholder="请输入邮箱或手机号码"
                                           name="account"
                                           ng-model="user.account"
                                           ng-minlength=6 ng-maxlength=20 required ng-change="update('wrongAccount')"
                                           ng-pattern="/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$|(13[0-9]{9}$)|(14[5-7]{9}$)|(15[0-9]{9}$)|(18[0-9]{9}$)/"
                                           id="Inputaccount1"
                                           class="form-control"/>
                                </div>
                                <div class="form-group" ng-class="{true: 'form-group has-error', false: 'form-group'}[(signinForm.userpassword.$invalid && submitted)||wrongPassword]">
                                    <label for="userPassword">密&nbsp;码</label>
                                    <span class="pull-right"
                                          ng-show="(signinForm.userpassword.$dirty && signinForm.userpassword.$invalid && submitted)||wrongPassword">
                                        <small ng-show="signinForm.userpassword.$error.required">请输入密码</small>
                                        <small ng-show="signinForm.userpassword.$error.minlength">请输入6~20位密码字符</small>
                                        <small ng-show="signinForm.userpassword.$error.maxlength">请输入6~20位密码字符</small>
                                        <small ng-show="signinForm.userpassword.$error.userpassword">请输入正确格式的密码</small>
                                        <small ng-show="!signinForm.userpassword.$error.required&&!signinForm.userpassword.$error.userpassword&&!signinForm.userpassword.$error.maxlength&&!signinForm.userpassword.$error.minlength&&wrongPassword">密码错误</small>
                                    </span>
                                    <input type="password"
                                           placeholder="请输入6~15位密码"
                                           name="userpassword"
                                           ng-model="user.userpassword"
                                           ng-minlength=6 ng-maxlength=15 required ng-change="update('wrongPassword')"
                                           id="userPassword"
                                           class="form-control"/>
                                </div>
                                <div class="row clearfix" ng-class="{true: 'row clearfix', false: 'row clearfix hidden'}[requiredCode]">
                                    <div class="col-md-12">
                                        <label for="verificationCode">验证码</label>
                                        <span class="pull-right"
                                              ng-show="(signinForm.verificationCode.$dirty && signinForm.verificationCode.$invalid&& submitted)||wrongVerifyCode">
                                        <small ng-show="signinForm.verificationCode.$error.required">请输入验证码</small>
                                        <small ng-show="signinForm.verificationCode.$error.minlength">请输入6验证码</small>
                                        <small ng-show="signinForm.verificationCode.$error.maxlength">请输入6验证码</small>
                                        <small ng-show="signinForm.verificationCode.$invalid">请输入正确格式的验证码</small>
                                        <small ng-show="!signinForm.verificationCode.$error.required&&!signinForm.verificationCode.$invalid&&!signinForm.verificationCode.$error.maxlength&&!signinForm.verificationCode.$error.minlength&&wrongVerifyCode">验证码错误</small>
                                    </span>
                                    </div>
                                    <div class="col-md-7">
                                            <input type="text"
                                                   placeholder="请输入验证码"
                                                   name="verificationCode"
                                                   ng-model="user.verificationCode"
                                                   ng-minlength=6 ng-maxlength=6 ng-change="update('wrongVerifyCode')"
                                                   id="verificationCode"
                                                   ng-pattern="/^\w{6}(,\w{6})*$/"
                                                   class="form-control"/>
                                    </div>
                                    <div class="col-md-5">
                                        <img src="{{validateCodeUrl}}" ng-click="verfity_code_img()" alt="点击更新"
                                             title="点击更新验证码" style="cursor: pointer;height: 35px"/>
                                    </div>
                                </div>
                                <div class="checkbox" style="margin-bottom: 10px">
                                    <label>
                                        <input type="checkbox"> 记住我
                                    </label>
                               </div>
                                <button type="submit" class="btn btn-default pull-right">&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;&nbsp;</button>
                            </form>
                            <%--登录form--%>
                            <form action="j_spring_security_check" method="post" class="hidden" id="loginForm">
                                <input id="j_username" name="j_username" type="text" value="{{user.account}}"/>
                                <input id="j_password" name="j_password" type="password" value="{{user.userpassword}}"/>
                                <input type="checkbox" name="_spring_security_remember_me" checked/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="footer.jsp"/>
<script src="${pageContext.request.contextPath}/js_control/signin.js"></script>
</body>
</html>
