package com.vps.webroot;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.vps._return.KV;
import com.vps._return.Return;
import com.vps.tools.Tool_Mongo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by noah on 14-6-19.
 */
@Controller
@RequestMapping("/")
public class MainController {
    @RequestMapping(method = RequestMethod.GET,value = "/index")
    public ModelAndView printWelcome(HttpServletRequest request, HttpServletResponse response) {
        Map model = new HashMap();
        model.put("target", "index");
        return new ModelAndView("/index",model);
    }
    @RequestMapping(method = RequestMethod.GET,value = "/vps")
    public ModelAndView vps(HttpServletRequest request, HttpServletResponse response) {
        Map model = new HashMap();
        model.put("target", "vps");
        return new ModelAndView("/vps",model);
    }
    @RequestMapping(method = RequestMethod.GET,value = "/blog")
    public ModelAndView blog(HttpServletRequest request, HttpServletResponse response) {
        Map model = new HashMap();
        model.put("target", "blog");
        return new ModelAndView("/blog",model);
    }
    @RequestMapping(method = RequestMethod.GET,value = "/editor")
    public ModelAndView editor(HttpServletRequest request, HttpServletResponse response) {
        Map model = new HashMap();
        model.put("target", "editor");
        return new ModelAndView("/editor",model);
    }

    @RequestMapping(method = RequestMethod.GET,value = "/details/{article_id}")
    public ModelAndView details(HttpServletRequest request, HttpServletResponse response,@PathVariable("article_id") String article_id) throws Exception {
        Map model = new HashMap();
        model.put("target", "details");
        model.put("article_id", "article_id");
        DBCollection collection = Tool_Mongo.get_mongo_collection();
        BasicDBObject basicDBObject = new BasicDBObject("basic.article_id",article_id);
        Object obj = collection.findOne(basicDBObject);
        if(obj.equals(null)){
            return new ModelAndView("404");
        }
        model.put("article",obj);
        return new ModelAndView("/details",model);
    }

    @RequestMapping(method = RequestMethod.GET,value = "/signin")
    public ModelAndView signin(HttpServletRequest request, HttpServletResponse response) {
        Map model = new HashMap();
        model.put("target", "signin");
        return new ModelAndView("/signin",model);
    }
    @RequestMapping(method = RequestMethod.GET,value = "/signup")
    public ModelAndView signup(HttpServletRequest request, HttpServletResponse response) {
        Map model = new HashMap();
        model.put("target", "signup");
        return new ModelAndView("/signup",model);
    }

    @RequestMapping(method = RequestMethod.GET,value = "/home")
    public ModelAndView home(HttpServletRequest request, HttpServletResponse response) {
        Map model = new HashMap();
        model.put("target", "home");
        return new ModelAndView("/home",model);
    }
}
