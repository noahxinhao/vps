<%--
  Created by IntelliJ IDEA.
  User: noah
  Date: 14-6-28
  Time: 上午12:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="footer">
    <div class="container">
        <p class="text-muted">Copyright © 2014 IMDOU8</p>
    </div>
</div>
<input type="hidden" value="${pageContext.request.contextPath}" id="PageContextPath">
<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<input type="hidden" id="applicationContextPath" value="${request.contextPath}"/>
<a style="display: none" id="loadpdf" href="javascript:void(0)"></a>
<script src="${pageContext.request.contextPath}/js/jquery-1.9.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap.js"></script>
<script src="${pageContext.request.contextPath}/plugin/angular/angular.js"></script>
<%--<script src="${pageContext.request.contextPath}/plugin/angular/angular-router.js"></script>--%>
