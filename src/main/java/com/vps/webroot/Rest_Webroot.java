package com.vps.webroot;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.vps._return.Return;
import com.vps.configuraction.Configuration;
import com.vps.model.SysUser;
import com.vps.tools.Global_Tools;
import com.vps.tools.Tool_Mongo;
import com.vps.util.ValidateCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
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
    public ModelAndView articles_publish(HttpServletRequest request, HttpServletResponse response,String title,String tag,String elm1) throws Exception {
        Map model = new HashMap();
        if(title==""&&elm1==""){
            model.put("status", "fail");
            return new ModelAndView("article_publish",model);
        }
        /*获取用户信息*/
        Object sysUser = request.getSession().getAttribute("sysUser");
        if(sysUser==null){
            model.put("status", "fail");
            return new ModelAndView("article_publish",model);
        }
        SysUser user = (SysUser) sysUser;
        String milliseconds = String.valueOf(new Date().getTime()).substring(7);// 6位
        /*基本信息*/
        Map basic = new HashMap();
        basic.put("title",title);
        basic.put("tag",tag);
        basic.put("content",elm1);
        basic.put("createTime",new Date().getTime());
        basic.put("updateTime",new Date().getTime());
        basic.put("status",1);
        basic.put("article_id",milliseconds.concat(((SysUser) sysUser).getUser_id()));
        /*作者信息*/
        Map authorInfo = new HashMap();
        authorInfo.put("userId",user.getId());
        /*评论信息*/
        Map reviewInfo = new HashMap();

        Map  ARTICLES = new HashMap();
        ARTICLES.put("basic",basic);
        ARTICLES.put("authorInfo",authorInfo);
        ARTICLES.put("reviewInfo","");

        DBCollection collection = Tool_Mongo.get_mongo_collection();
        BasicDBObject basicDBObject = new BasicDBObject(ARTICLES);
        collection.save(basicDBObject);
        //response.getWriter().write(Return.SUCCESS("发布完成"));
        model.put("status", "success");
        return new ModelAndView("article_publish",model);
    }

    /*生成验证码*/
    @RequestMapping(method = RequestMethod.GET,value = "/create_validate_code")
    public void create_validate_code(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("image/png");
        ValidateCode ve = new ValidateCode();
        request.getSession().setAttribute(request.getSession().getId(), ve.getCode());// 验证码保存在session中
        ServletOutputStream out = response.getOutputStream();
        BufferedImage img = ve.getImage();
        ImageIO.write(img, "png", out);
    }
    /*获取文章内容*/
    @RequestMapping(method = RequestMethod.GET,value = "/article/{article_id}")
    public void details(HttpServletRequest request, HttpServletResponse response,@PathVariable("article_id") String article_id) throws Exception {
        DBCollection collection = Tool_Mongo.get_mongo_collection();
        BasicDBObject basicDBObject = new BasicDBObject("basic.article_id",article_id);
        Object obj = collection.findOne(basicDBObject);
        if(obj.equals(null)){
            response.getWriter().write(Return.FAIL("没有找到文章"));
            return;
        }
        Map map = new HashMap();
        map.put("article",obj);
        response.getWriter().write(Return.SUCCESS(map,""));
    }
}
