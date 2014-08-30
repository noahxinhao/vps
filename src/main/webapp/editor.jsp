<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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
    <title>编辑新帖</title>
    <jsp:include page="meta.jsp"/>
    <link rel="stylesheet" href="/plugin/xheditor/common.css" type="text/css" media="screen"/>
    <script type="text/javascript" src="/plugin/xheditor/jquery/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="/plugin/xheditor/xheditor-1.2.1.min.js"></script>

    <script type="text/javascript" src="/plugin/xheditor/xheditor_lang/zh-cn.js"></script>
    <script src="${pageContext.request.contextPath}/plugin/angular/angular.js"></script>
    <script src="${pageContext.request.contextPath}/js_control/editor.js"></script>
    <style>
        #editor {
            overflow: scroll;
            max-height: 300px
        }
    </style>
    <script type="text/javascript">
        $(pageInit);
        function pageInit() {
            $.extend(XHEDITOR.settings, {shortcuts: {'ctrl+enter': submitForm}});//修改默认设置
            $('#elm1').xheditor({
                tools: "Cut,Copy,Paste,Pastetext,|,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,|,FontColor,BackColor,|,SelectAll,Removeformat,Align,List,Outdent,Indent,Link,Unlink,Anchor,Img,Hr,Emot,Table,Code,Source,Preview,Print,Fullscreen,About",
                modalWidth: 400,
                modalHeight: 300,
                upBtnText: '浏览',
                upLinkUrl: "upload",
                upImgUrl: "rp/upload_blog_img?type=Images",
                upFileUrl: "rp/upload_blog_img?type=Images",
                Flash: false,
                plugins: plugins
            });
        }

        function submitForm() {
            $('#frmDemo').submit();
        }


        var articleApp = angular.module('articlePublish', []);
        articleApp.controller('articleController', ['$scope', '$http', function ($scope, $http) {
            $scope.submitted = false;
            $scope.saveArticle = function () {
                $scope.submitted = true;
                if ($scope.articleForm.$valid) {
                    $("#content").val($("#elm1").val());
                    $("#article").submit();
                }
            }
        }]);
    </script>
    <style>
        .navbar {
            font-size: 14px;
        }

        pre {
            margin-left: 2em;
            border-left: 3px solid #CCC;
            padding: 0 1em;
        }
        .btnCode {
            background: transparent url(img/code.png) no-repeat 0px 0px;
            background-position: 3px -2px;
        }
    </style>
</head>
<body>
<!-- Fixed navbar -->
<jsp:include page="head.jsp"/>
<!-- Begin page content -->
<div class="container" ng-app="articlePublish">
    <div class="row" ng-controller="articleController">
        <div class="col-md-9" style="padding-bottom: 100px">
            <form class="form-horizontal im-editor" name="articleForm" id="article_info" novalidate
                  ng-submit="saveArticle()">
                <div class="form-group im-title"
                     ng-class="{true: 'form-group im-title has-error', false: 'form-group im-title'}[(articleForm.title.$invalid && submitted)]">
                    <label for="title" class="col-sm-1 control-label" style="text-align: left">标题:</label>
                    <div class="col-sm-6">
                        <input placeholder="请输入文章标题" id="title"
                               class="form-control"
                               name="title"
                               ng-minlength=6 ng-maxlength=40 required
                               ng-model="article.title"/>
                    </div>
                    <label for="title" class="col-sm-5 control-label" style="text-align: left"
                           ng-show="articleForm.title.$error.required && submitted">
                        请输入文章标题
                    </label>
                    <label for="title" class="col-sm-5 control-label" style="text-align: left"
                           ng-show="articleForm.title.$error.minlength && submitted">
                        标题字数不得少入6个字符
                    </label>
                    <label for="title" class="col-sm-5 control-label" style="text-align: left"
                           ng-show="articleForm.title.$error.maxlength && submitted">
                        标题字数不得超过40个字符
                    </label>
                </div>
                <div class="form-group im-title">
                    <label for="tag" class="col-sm-1 control-label" style="text-align: left">标签:</label>

                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="tag" name="tag" ng-model="article.tag"
                               placeholder="文章标签">
                    </div>
                    <label for="tag" class="col-sm-5 control-label has-error" style="text-align: left"></label>
                </div>
                <textarea id="elm1" name="elm1" rows="18" cols="90" style="width: 100%">
                </textarea><br/><br/>
                <button type="submit" class="pull-right btn btn-info btn-sm" href="javascript:void(0)">&nbsp;提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交&nbsp;</button>
            </form>
        </div>
        <form class="hidden" id="article" method="post" action="/rs/articles_publish">
            <input name="title" value="{{article.title}}"/>
            <input name="tag" value="{{article.tag}}"/>
            <textarea name="elm1" value="" id="content"/></textarea>
        </form>
        <div class="col-md-3 hidden-xs hidden-sm">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">发帖规则</h3>
                </div>
                <div class="panel-body">
                    Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum
                    nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
                    vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </div>
            </div>
        </div>
        <div class="col-md-3 hidden-xs hidden-sm">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">最新发布</h3>
                </div>
                <div class="panel-body">
                    发热个vtrbrt
                </div>
            </div>
        </div>
    </div>
</div>
<div class="hidden">
    <form action="" method="post" enctype="multipart/form-data" onsubmit="return chkForm();">
        <input id="file1" name="file1" type="file" id="upimg">
    </form>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
