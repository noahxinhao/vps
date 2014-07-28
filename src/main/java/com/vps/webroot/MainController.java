package com.vps.webroot;

import com.vps._return.Return;
import org.springframework.stereotype.Controller;
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
    @RequestMapping(method = RequestMethod.POST,value = "/upload")
    public void upload(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map model = new HashMap();
        model.put("target", "upload");
        response.getWriter().write(Return.SUCCESS(""));
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
