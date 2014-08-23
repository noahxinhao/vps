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
</head>
<body>
<jsp:include page="head.jsp"/>
<div class="container">
    <div class="row" ng-app="userSignup">
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
                        <div class="panel-body" ng-controller="signupController">
                            <form role="form" class="im-editor" name="signupForm" novalidate ng-submit="submitForm()">
                                <div class="form-group" ng-class="{true: 'form-group has-error', false: 'form-group'}[(signupForm.account.$invalid && submitted)||accountUsed]">
                                    <label for="Inputaccount1">邮箱/手机号码</label>
                                    <span class="pull-right"
                                          ng-show="(signupForm.account.$dirty && signupForm.account.$invalid&& submitted) || accountUsed">
                                        <small ng-show="signupForm.account.$error.required">请输入邮箱或手机号码</small>
                                        <small ng-show="signupForm.account.$error.minlength">请输入6~20位字符</small>
                                        <small ng-show="signupForm.account.$error.maxlength">请输入6~20位字符</small>
                                        <small ng-show="!signupForm.account.$error.minlength&&!signupForm.account.$error.maxlength&&!signupForm.account.$error.required&&signupForm.account.$invalid">请输入正确格式的邮箱地址或手机号码</small>
                                        <small ng-show="!signupForm.account.$error.required && !signupForm.account.$error.maxlength && !signupForm.account.$error.minlength && !signupForm.account.$invalid && accountUsed">用户名已注册</small>
                                    </span>
                                    <input type="text"
                                           placeholder="请输入邮箱或手机号码"
                                           name="account"
                                           ng-model="user.account"
                                           ng-minlength=6 ng-maxlength=20 required ng-change="update('accountUsed')"
                                           ng-pattern = "/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$|(13[0-9]{9}$)|(14[5-7]{9}$)|(15[0-9]{9}$)|(18[0-9]{9}$)/"
                                           id="Inputaccount1"
                                           class="form-control"/>
                                </div>
                                <div class="form-group" ng-class="{true: 'form-group has-error', false: 'form-group'}[(signupForm.userpassword.$invalid && submitted)]">
                                    <label for="userPassword">密&nbsp;码</label>
                                    <span class="pull-right"
                                          ng-show="signupForm.userpassword.$dirty && signupForm.userpassword.$invalid && submitted">
                                        <small ng-show="signupForm.userpassword.$error.required">请输入密码</small>
                                        <small ng-show="signupForm.userpassword.$error.minlength">请输入6~15位密码字符</small>
                                        <small ng-show="signupForm.userpassword.$error.maxlength">请输入6~15位密码字符</small>
                                        <small ng-show="signupForm.userpassword.$error.userpassword">请输入正确格式的密码</small>
                                    </span>
                                    <input type="password"
                                           placeholder="请输入6~15位密码"
                                           name="userpassword"
                                           ng-model="user.userpassword"
                                           ng-minlength=6 ng-maxlength=15 required
                                           id="userPassword"
                                           class="form-control"/>
                                </div>
                                <div class="form-group" ng-class="{true: 'form-group has-error', false: 'form-group'}[(signupForm.confirmPassword.$invalid&& submitted)||(user.confirmPassword!=''&&user.confirmPassword!=user.userpassword&&submitted)]">
                                    <label for="confirmPassword">确认密码</label>
                                    <span class="pull-right"
                                          ng-show="(signupForm.confirmPassword.$dirty && signupForm.confirmPassword.$invalid&& submitted)||(user.confirmPassword!=user.userpassword&&submitted)">
                                        <small ng-show="signupForm.confirmPassword.$error.required">请输入确认密码</small>
                                        <small ng-show="signupForm.confirmPassword.$error.minlength">请输入6~15位密码字符</small>
                                        <small ng-show="signupForm.confirmPassword.$error.maxlength">请输入6~15位密码字符</small>
                                        <small ng-show="signupForm.confirmPassword.$error.confirmPassword">请输入正确格式的密码</small>
                                        <small ng-show="!signupForm.confirmPassword.$error.required&&!signupForm.confirmPassword.$error.minlength&&!signupForm.confirmPassword.$error.confirmPassword&&user.confirmPassword!=user.userpassword">两次输入的密码不相同</small>
                                    </span>

                                    <input type="password"
                                           placeholder="请输入6~15位密码"
                                           name="confirmPassword"
                                           ng-model="user.confirmPassword"
                                           ng-minlength=6 ng-maxlength=15 required
                                           id="confirmPassword"
                                           class="form-control"/>
                                </div>
                                <div class="row clearfix" style="margin-bottom: 10px" ng-class="{true: 'row clearfix has-error', false: 'row clearfix'}[(signupForm.verificationCode.$invalid&& submitted)||wrongCode]">
                                    <div class="col-md-7">
                                        <label for="verificationCode">验证码</label>
                                        <span class="pull-right"
                                              ng-show="(signupForm.verificationCode.$dirty && signupForm.verificationCode.$invalid&& submitted)||wrongCode">
                                        <small ng-show="signupForm.verificationCode.$error.required">请输入验证码</small>
                                        <small ng-show="signupForm.verificationCode.$error.minlength">请输入6验证码</small>
                                        <small ng-show="signupForm.verificationCode.$error.maxlength">请输入6验证码</small>
                                        <small ng-show="signupForm.verificationCode.$invalid">请输入正确格式的验证码</small>
                                        <small ng-show="!signupForm.verificationCode.$error.required&&!signupForm.verificationCode.$invalid&&!signupForm.verificationCode.$error.maxlength&&!signupForm.verificationCode.$error.minlength&&wrongCode">验证码错误</small>
                                    </span>
                                    </div>
                                    <div class="col-md-7">
                                        <input type="text"
                                               placeholder="请输入验证码"
                                               name="verificationCode"
                                               ng-model="user.verificationCode"
                                               ng-minlength=6 ng-maxlength=6 required ng-change="update('wrongCode')"
                                               id="verificationCode"
                                               ng-pattern="/^\w{6}(,\w{6})*$/"
                                               class="form-control"/>
                                    </div>
                                    <div class="col-md-5">
                                        <img src="{{validateCodeUrl}}" id="verfity_code_img" alt="点击更新"
                                             title="点击更新验证码" style="cursor: pointer;height: 35px"
                                             ng-click="refresh_validate_code()"/>
                                    </div>
                                </div>
                                <button type="submit" id="signupbtn" class="btn btn-default pull-right" data-loading-text="正在提交">&nbsp;&nbsp;注&nbsp;&nbsp;&nbsp;&nbsp;册&nbsp;&nbsp;</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="footer.jsp"/>
<script src="${pageContext.request.contextPath}/js_control/signup.js"></script>
</body>
</html>
