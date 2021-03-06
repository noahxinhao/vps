<%--
  Created by IntelliJ IDEA.
  User: noahli
  Date: 14-9-20
  Time: 上午12:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" charset="utf-8" data-callback="true"></script>
</head>
<body>
<script type="text/javascript">
    //从页面收集OpenAPI必要的参数。get_user_info不需要输入参数，因此paras中没有参数
    var paras = {};
    //用JS SDK调用OpenAPI
    QC.api("get_user_info", paras)
        //指定接口访问成功的接收函数，s为成功返回Response对象
            .success(function(s){
                //成功回调，通过s.data获取OpenAPI的返回数据
                alert("获取用户信息成功！当前用户昵称为："+s.data.nickname);
            })
        //指定接口访问失败的接收函数，f为失败返回Response对象
            .error(function(f){
                //失败回调
                alert("获取用户信息失败！");
            })
        //指定接口完成请求后的接收函数，c为完成请求返回Response对象
            .complete(function(c){
                //完成请求回调
                alert("获取用户信息完成！");
            });
</script>
</body>
</html>
