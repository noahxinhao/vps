package com.vps.webroot;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.vps._return.Return;
import com.vps.configuraction.Configuration;
import com.vps.tools.Global_Tools;
import com.vps.tools.Tool_Mongo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by noah on 14-6-28.
 */
@Controller
@RequestMapping("/rs")
public class Rest_Webroot {
    @RequestMapping(method = RequestMethod.POST,value = "/apply")
    public void apply(HttpServletRequest request, HttpServletResponse response,String name,String email,String phone) throws IOException, MessagingException {
        System.out.println("姓名:" + name + "邮箱" + email + "电话:" + phone);
        String content = "姓名:" + name + "邮箱" + email + "电话:" + phone;
        Global_Tools.sendEmail(Configuration.global_config.getProperty("mail.to"), content, "VPS申请试用", null);
        response.getWriter().write(Return.SUCCESS(""));
    }

    @RequestMapping(method = RequestMethod.POST,value = "/pay")
    public void pay(HttpServletRequest request, HttpServletResponse response,String email) throws IOException, MessagingException {
        System.out.println("邮箱" + email);
        String content = "邮箱" + email;
        Global_Tools.sendEmail(Configuration.global_config.getProperty("mail.to"),content,"VPS购买信息",null);
        response.getWriter().write(Return.SUCCESS(""));
    }

    @RequestMapping(method = RequestMethod.POST,value = "/articles_publish")
    public void  articles_publish(HttpServletRequest request, HttpServletResponse response,String title,String tag,String elm1) throws Exception {
        /*基本信息*/
        Map basic = new HashMap();
        basic.put("title",title);
        basic.put("tag",tag);
        basic.put("content",elm1);
        basic.put("createTime",new Date().getTime());
        basic.put("updateTime",new Date().getTime());
        basic.put("status",1);
        /*作者信息*/
        Map authorInfo = new HashMap();
        authorInfo.put("userId","100001");
        /*评论信息*/
        Map reviewInfo = new HashMap();

        Map  ARTICLES = new HashMap();
        ARTICLES.put("basic",basic);
        ARTICLES.put("authorInfo",authorInfo);
        ARTICLES.put("reviewInfo","");

        DBCollection collection = Tool_Mongo.get_mongo_collection();
        BasicDBObject basicDBObject = new BasicDBObject(ARTICLES);
        collection.save(basicDBObject);
        response.getWriter().write(Return.SUCCESS(""));
    }
}
