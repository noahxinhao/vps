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
    <title>VPS</title>
    <jsp:include page="meta.jsp"/>
</head>
<body>
<!-- Fixed navbar -->
<jsp:include page="head.jsp"/>
<!-- Begin page content -->
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel-body bs-callout bs-callout-info "><h4>LINUX内核VPS<a class="pull-right btn btn-info btn-sm" href="https://vps.imdou8.com:7810" target="_blank" style="font-size: 13px">Ubuntu公共测试（tourist）</a></h4></div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="" alt="ubuntu14" src="/img/vps/ubuntu14.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h3>Linux AMI</h3>
                    <p>Linux AMI 2014.03.2</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button" onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="holder.js/300x200" alt="ubuntu14" src="/img/vps/ubuntu14.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h3>Red Hat</h3>
                    <p>Red Hat Enterprise Linux 6.5</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button" onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="holder.js/300x200" alt="ubuntu14" src="/img/vps/ubuntu14.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h3>SuSE Linux</h3>
                    <p>SuSE Linux Enterprise Server 11</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button" onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="holder.js/300x200" alt="ubuntu14" src="/img/vps/ubuntu14.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h3>Ubuntu Server</h3>
                    <p>Ubuntu Server 14.04 LTS (PV)</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button" onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel-body bs-callout bs-callout-info "><h4>WINDOW内核VPS</h4></div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="" alt="win" src="/img/vps/win.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h3>Server 2012 R2 Base</h3>
                    <p>Microsoft Windows 2012 R2 Standard edition with 64-bit architecture. [English]</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button" onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="holder.js/300x200" alt="win" src="/img/vps/win.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h4>Server 2012 R2 with SQL Server Express </h4>
                    <p>Microsoft Windows Server 2012 R2 Standard edition, 64-bit architecture...</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button" onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="holder.js/300x200" alt="win" src="/img/vps/win.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h4>Server 2008 R2 with SQL Server Express and IIS</h4>
                    <p>Microsoft Windows Server 2008 R2 SP1 Datacenter edition, 64-bit architecture, Microsoft ...</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button"  onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div class="thumbnail">
                <img data-src="holder.js/300x200" alt="win" src="/img/vps/win.png" style="width: 100%; height: 160px;">
                <div class="caption">
                    <h3>Server 2008 R2 Base</h3>
                    <p>Microsoft Windows 2008 R2 SP1 Datacenter edition and 64-bit architecture. [Japanese]</p>
                    <p><a href="javascript:void(0)" class="btn btn-primary" role="button" data-toggle="modal" data-target="#paymodel">￥183/YEAR <span class="glyphicon glyphicon-shopping-cart"></span></a> <a href="javascript:void(0)" class="btn btn-default" role="button" onclick="onModalShow()">申请试用</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="footer.jsp"/>
<!-- Modal -->
<div class="modal fade" id="paymodel" tabindex="-1" role="dialog" aria-labelledby="paymodallabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="paymodallabel">PAY ME</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <span>您可以直接付款，管理员会在收到汇款后12小时内联系您为您分配VPS帐号</span><br/>
                        <form class="form-horizontal" role="form" style="padding-top: 15px" onsubmit="{return false;}">
                            <div class="form-group" id="group_uemail">
                                <label for="email" class="col-sm-3 col-sm-offset-1 control-label">联系邮箱：</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="uemail" placeholder="请输入联系邮箱"
                                           onblur="verify_uemail()" onkeydown="keydown_uemail(event)">
                                    <span for="email" class="control-label hidden" id="info_uemail"></span>
                                </div>
                            </div>
                            <p>提交后将会跳转到支付宝支付界面,完成支付后将会在12小时内收到管理员发送vps帐号及使用教程邮件，如有疑问请发送邮件至<a href="mailto:870708429@qq.com">870708429@qq.com</a></p>
                        </form>
                    </div>
                    <hr/>
                    <div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="submint_pay()" id="submit_pay">确定</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="applymodal" tabindex="-1" role="dialog" aria-labelledby="applyModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="applyModalLabel">试用申请</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form" onsubmit="{return false;}">
                    <div class="form-group" id="group_name">
                        <label for="user_name" class="col-sm-3 col-sm-offset-1 control-label">申请人姓名：</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" onkeydown="keydown_name(event)" id="user_name"
                                   placeholder="申请人姓名" onblur="verify_name()">
                            <span for="user_name" class="control-label hidden" id="info_name"></span>
                        </div>
                    </div>

                    <div class="form-group" id="group_email">
                        <label for="email" class="col-sm-3 col-sm-offset-1 control-label">联系邮箱：</label>

                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="email" placeholder="联系邮箱"
                                   onblur="verify_email()" onkeydown="keydown_email(event)">
                            <span for="email" class="control-label hidden" id="info_email"></span>
                        </div>
                    </div>
                    <div class="form-group" id="group_phone">
                        <label for="phone" class="col-sm-3 col-sm-offset-1 control-label">联系电话：</label>

                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="phone" placeholder="联系电话"
                                   onblur="verify_phone()" onkeydown="keydown_phone(event)">
                            <span for="phone" class="control-label hidden" id="info_phone"></span>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-10">
                            <button type="submit" class="btn btn-default pull-right" id="submit_suply_info"
                                    onclick="submint_info()" data-loading-text="正在提交">提交申请
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="${pageContext.request.contextPath}/js/modal_common.js"></script>
<script src="${pageContext.request.contextPath}/js/ap.js"></script>
</body>
</html>
