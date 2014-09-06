<%--
  Created by IntelliJ IDEA.
  User: noah
  Date: 14-6-27
  Time: 下午11:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle " data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <c:if test="${sysUser==null}">
                <a class="navbar-brand hidden-sm header-a" href="/signin">登录</a>
                <a class="navbar-brand hidden-sm header-a" href="/signup">注册</a>
            </c:if>
            <c:if test="${sysUser!=null}">
                <ul class="nav navbar-nav hidden-sm hidden-xs">
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> &nbsp;${sysUser.real_name}&nbsp; <span class="caret"></span></a>
                        <ul class="dropdown-menu list-group" role="menu">
                            <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-comment"></span> 新消息 (12)</a></li>
                            <li><a href="/home"><span class="glyphicon glyphicon-home"></span> 个人中心</a></li>
                            <li><a href="/home#/vpsDetail"><span class="glyphicon glyphicon-hdd"></span> 我的主机</a></li>
                            <li><a href="/editor" target="_blank"><span class="glyphicon glyphicon-pencil"></span> 发布帖子</a></li>
                            <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-zoom-in"></span> 审核新帖</a></li>
                            <li class="divider"></li>
                            <li><a href="/home#/setting"><span class="glyphicon glyphicon-cog"></span> 个人设置</a></li>
                            <li><a href="/j_spring_security_logout"><span class="glyphicon glyphicon-off"></span> 退出登录</a></li>
                            <li><a href="javascript:void(0)">帮助中心</a></li>
                        </ul>
                    </li>
                </ul>
            </c:if>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="navbar-brand"><strong>IMDOU8<small style="line-height: 8px">™</small></strong></li>
                <c:if test="${target == 'blog'}">
                    <li ><a href="/index">首页</a></li>
                    <li><a href="/vps" >VPS</a></li>
                    <li  class="active"><a href="/blog" >技术交流</a></li>
                </c:if>
                <c:if test="${target == 'index'||target==null||target==''}">
                    <li class="active"><a href="/index">首页</a></li>
                    <li><a href="/vps" >VPS</a></li>
                    <li><a href="/blog" >技术交流</a></li>
                </c:if>
                <c:if test="${target == 'vps'}">
                    <li ><a href="/index">首页</a></li>
                    <li class="active"><a href="/vps" >VPS</a></li>
                    <li><a href="/blog" >技术交流</a></li>
                </c:if>
                <c:if test="${target == 'editor'}">
                    <li><a href="/index">首页</a></li>
                    <li><a href="/vps" >VPS</a></li>
                    <li><a href="/blog" >技术交流</a></li>
                </c:if>
                <c:if test="${target == 'signin'||target == 'signup'||target == 'home'||target == 'details'}">
                    <li><a href="/index">首页</a></li>
                    <li><a href="/vps" >VPS</a></li>
                    <li><a href="/blog" >技术交流</a></li>
                </c:if>
                <li class="dropdown">
                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">更多 <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="/editor" target="_blank"><span class="glyphicon glyphicon-pencil"></span> 发布帖子</a></li>
                        <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-zoom-in"></span> 审核新帖</a></li>
                        <li><a href="/home#/vpsDetail"><span class="glyphicon glyphicon-send"></span> VPS申请</a></li>
                        <li><a href="/home#/vpsDetail"><span class="glyphicon glyphicon-download"></span> 资源下载</a></li>
                        <li class="divider"></li>
                        <li class="dropdown-header">意见反馈</li>
                        <li><a href="javascript:void(0)">帮助中心</a></li>
                    </ul>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>
<%--为网站中所有的图片添加img-responsive--%>
<script type="text/javascript">

</script>