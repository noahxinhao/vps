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
    <link rel="stylesheet" href="/plugin/xheditor/common.css" type="text/css" media="screen" />
    <script type="text/javascript" src="/plugin/xheditor/jquery/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="/plugin/xheditor/xheditor-1.2.1.min.js"></script>

    <script type="text/javascript" src="/plugin/xheditor/xheditor_lang/zh-cn.js"></script>
    <style>
        #editor {overflow:scroll; max-height:300px}
    </style>
    <script type="text/javascript">
        $(pageInit);
        function pageInit()
        {
            $.extend(XHEDITOR.settings,{shortcuts:{'ctrl+enter':submitForm}});//修改默认设置
            $('#elm1').xheditor({
                tools:"Cut,Copy,Paste,Pastetext,|,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,|,FontColor,BackColor,|,SelectAll,Removeformat,Align,List,Outdent,Indent,Link,Unlink,Anchor,Img,Hr,Emot,Table,Source,Preview,Print,Fullscreen,About",
                modalWidth: 400,
                modalHeight: 300,
                upBtnText: '浏览',
                upLinkUrl: "upload",
                upImgUrl: "upload?type=Images",
                Flash:false
            });
        }
        function submitForm(){$('#frmDemo').submit();}
    </script>
</head>
<body>
<!-- Fixed navbar -->
<jsp:include page="head.jsp"/>
<!-- Begin page content -->
<div class="container">
    <div class="row">
        <div class="col-md-9">
            <form method="post" action="/rs/articles_publish" class="form-horizontal im-editor">
                <div class="form-group" class="im-title">
                    <label for="title" class="col-sm-1 control-label" style="text-align: left">标题:</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="title" name="title" placeholder="文章标题">
                    </div>
                    <label for="title" class="col-sm-5 control-label has-error" style="text-align: left">标题字数不得超过15个字符</label>
                </div>
                <div class="form-group" class="im-title">
                    <label for="tag" class="col-sm-1 control-label" style="text-align: left">标签:</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="tag" name="tag" placeholder="文章标签">
                    </div>
                    <label for="tag" class="col-sm-5 control-label has-error" style="text-align: left"></label>
                </div>
                <textarea id="elm1" name="elm1" rows="18" cols="90" style="width: 100%">
                </textarea><br/><br/>
                <button type="submit" class="pull-right btn btn-info btn-sm" href="javascript:void(0)">&nbsp;提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交&nbsp;</button>
            </form>
        </div>
        <div class="col-md-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">发帖规则</h3>
                </div>
                <div class="panel-body">
                    Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </div>
            </div>
        </div>
        <div class="col-md-3">
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
<jsp:include page="footer.jsp"/>
</body>
</html>
