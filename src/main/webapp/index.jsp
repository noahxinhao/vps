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
    <title>IMDOU8&nbsp;&nbsp;-&nbsp;&nbsp;技术分享社区</title>
    <jsp:include page="meta.jsp"/>
</head>
<body>
<!-- Fixed navbar -->
<jsp:include page="head.jsp"/>
<!-- Begin page content -->
<div class="container im-carousel hidden-xs hidden-sm" style="width: 100%;">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
            <div class="item active">
                <img src="/img/hero.jpg" style="height: 480px;width: 100%;" alt="...">
                <div class="carousel-caption">
                    <div class="col-md-12 pull-right">
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="/img/preview.jpg" style="height: 480px;width: 100%;" alt="...">
                <div class="carousel-caption">

                </div>
            </div>
            <div class="item">
                <img src="/img/team.jpg"  style="height: 480px;width: 100%;" alt="...">
                <div class="carousel-caption">
                    My Team
                </div>
            </div>
        </div>
        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
        <div class="im-logoimg pull-right">
            <a href="/">
                <img width="78" alt="" src="http://static.bootcss.com/expo/img/d/f5/ab31f6c55403cfa55ccb32bc7f29b.png">
                </img>
            </a>
        </div>
    </div>
</div>
<div class="container im-carousel-sm hidden-md hidden-lg" style="">
    <div id="carousel-example-generic_sm" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic_sm" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic_sm" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic_sm" data-slide-to="2"></li>
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
            <div class="item active">
                <img src="/img/hero.jpg" style="height: 120px;width: 100%;" alt="...">
                <div class="carousel-caption">
                    <div class="col-md-12 pull-right">
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="/img/preview.jpg" style="height: 120px;width: 100%;" alt="...">
                <div class="carousel-caption">

                </div>
            </div>
            <div class="item">
                <img src="/img/team.jpg"  style="height: 120px;width: 100%;" alt="...">
                <div class="carousel-caption">
                </div>
            </div>
        </div>
        <!-- Controls -->
        <%--<a class="left carousel-control" href="#carousel-example-generic_sm" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic_sm" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
        </a>--%>
    </div>
</div>
<%--<div class="container">
    <div class="row">
        <div class="col-md-5">

        </div>
        <div class="col-md-4"></div>
        <div class="col-md-3"></div>
    </div>
</div>--%>
<div class="container hidden-xs hidden-sm">
    <div class="section-title">
        <span>
            WHAT WE DO
        </span>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div class="panel-body bs-callout bs-callout-info ">
                <h4>站长亲测的vps经验</h4><br/>
                <p>如大多数刚接触vps的同学们一样，我也在搜索引擎中不断的寻求最适合的vps用作学习之用，无奈便宜的不稳定，稳定的不便宜，稳定便宜的又需要信用卡，总之资源少之又少</p>
                <p>现在,你可以在这里找到心仪的vps了，绝对的廉价，多种平台支持,linux,windows server,ubuntu,redHat...总有一款适合你.</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel-body bs-callout bs-callout-info ">
                        <h4><a href="/teach">交流学习</a></h4><br/>
                        <p>定期发布站长的vps学习经验，作为一个入门级别的站长，希望能够得到大神们的指导，以促共同进步...</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="panel-body bs-callout bs-callout-info ">
                        <h4>联系方式</h4><br/>
                        <p><span>联系邮箱:<a href="mailto:870708429@qq.com">870708429@qq.com</a></span><br/></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr/>
    <div class="row">
        <div class="col-md-5" style="margin-bottom: 35px">
            <strong>本站点配置</strong>
            <ul class="text-left" style="font-size: 13px;line-height: 25px">
                <li>750小时/月使用时间,按：换成天就是31.25天，足够一个月使用了。</li>
                <li>613M内存，支持32位、64位平台
                    <ul>
                        <li class="active">Ubuntu Server 14.04 LTS (PV)</li>
                        <li>Red Hat Enterprise Linux 6.5</li>
                        <li>SuSE Linux Enterprise Server 11 sp3</li>
                        <li>Microsoft Windows Server 2008~2012）</li>
                    </ul>
                </li>
                <li>10G存储Elastic Block Storage。</li>
                <li>5G S3 storage存储。</li>
                <li>30G传输（15G出，15G入，机房内的传输不计流量）</li>
            </ul>
        </div>
        <div class="col-md-7">
            <div class="row">
                <div class="alert alert-warning alert-dismissible fade in col-md-12" role="alert">
                    <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    <strong>提示!</strong> 站点更新，暂停提供html转pdf服务，如需要，请联系<a href="mailto:870708429@qq.com">870708429@qq.com</a>.
                </div>
                <div class="col-md-10 col-md-offset-1">
                    <div class="input-group">
                        <input type="text" class="form-control input-group-lg disabled" id="url" style="border-radius: 0px"
                               placeholder="请输入有效网址,如http://www.baidu.com">
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-default dropdown-toggle disabled" data-toggle="dropdown"
                                    id="downLoad">开始转换 <span class="glyphicon glyphicon-cloud-download"></span></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="panel-body bs-callout bs-callout-info ">
                        <p>站点测试服务,在输入框中输入正确的网址，将所选网页转为PDF格式下载到本地.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="footer.jsp"/>
<%--<script src="${pageContext.request.contextPath}/js/download.js"></script>--%>
</body>
</html>
