package com.vps.webroot;

import com.vps._return.KV;
import com.vps.configuraction.Configuration;
import com.vps.dao.SysUserDao;
import com.vps.model.Role;
import com.vps.model.SysUser;
import com.vps.model.UserRole;
import com.vps.tools.Global_Tools;
import com.vps.tools.Tool_Hibernate;
import org.hibernate.Transaction;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.hibernate.Session;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

import static com.vps._return.Return.*;

/**
 * Created by noah on 14-7-29.
 */
@Controller
@RequestMapping("/ruc")
public class Rest_UserControl {

    private SysUserDao sysUserDao = new SysUserDao();
    Md5PasswordEncoder md5 = new Md5PasswordEncoder();

    @RequestMapping(method = RequestMethod.GET, value = "/verifyAccount")
    @ResponseBody
    public void verifyAccount(HttpServletRequest request, HttpServletResponse response, String account) throws IOException, MessagingException {
        SysUser sysUser = sysUserDao.get_user_by_account(account);
        if (sysUser!=null) {
            response.getWriter().write(FAIL("用户名已使用"));
            return;
        } else {
            response.getWriter().write(SUCCESS("用户名可用"));
            return;
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/verifyUserInfo")
    @ResponseBody
    public void verifyUserInfo(HttpServletRequest request, HttpServletResponse response, String account,String password,String verifyCode) throws IOException, MessagingException {
        SysUser sysUser = sysUserDao.get_user_by_account(account);
        /*判断是否需要验证码*/
        Object requiredCode = request.getSession().getAttribute("requiredCode");
        if(requiredCode!=null){
            Boolean flog = (Boolean) requiredCode;
            if(flog){
                if(!verifyCode.equals(request.getSession().getAttribute(request.getSession().getId()))){
                    response.getWriter().write(FAIL("验证码错误"));
                    return;
                }
            }
        }

        if (sysUser!=null) {
            String pwd = md5.encodePassword(password, account);
            if(pwd.equals(sysUser.getPassword())){
                response.getWriter().write(SUCCESS("允许登录"));
                return;
            }else {
                Object attempCount = request.getSession().getAttribute("signinAttemp");
                int attemp = 0;
                if(attempCount!=null){
                    attemp = (int) attempCount;
                }
                request.getSession().setAttribute("signinAttemp",attemp+1);
                if((attemp+1)>3){
                    request.getSession().setAttribute("requiredCode", true);
                    Map map = new HashMap();
                    map.put("requiredCode",true);
                    /*KV[] kv = new KV[1];
                    kv[0] = new KV("requiredCode", true);*/
                    response.getWriter().write(FAIL(map,"密码错误"));
                    return;
                }
                response.getWriter().write(FAIL("密码错误"));
                return;
            }
        } else {
            response.getWriter().write(FAIL("用户不存在"));
            return;
        }
    }


    @RequestMapping(method = RequestMethod.POST, value = "/signup")
    public void signup(HttpServletRequest request, HttpServletResponse response, String account, String password, String confirmPassword, String verificationCode) throws IOException, MessagingException {
        if (account == "" || password == "" || verificationCode == "") {
            response.getWriter().write(FAIL("注册信息不完整"));
            return;
        }

        if(!password.equals(confirmPassword)){
            response.getWriter().write(FAIL("请确认密码"));
            return;
        }

        if (!verificationCode.equals(request.getSession().getAttribute(request.getSession().getId()))) {
            response.getWriter().write(FAIL("验证码错误"));
            return;
        }

        /*检测用户名格式[邮箱或者手机号码]*/
        String verify = Global_Tools.verifyAccount(account);
        if (verify==null) {
            response.getWriter().write(FAIL("用户名格式错误"));
            return;
        }

        SysUser sysUser = sysUserDao.get_user_by_account(account);
        if (sysUser!=null) {
            response.getWriter().write(FAIL("用户名已使用"));
            return;
        }

        /*创建用户*/
        SysUser user = new SysUser();
        user.setReal_name(account);
        user.setStatus(1);
        user.setAccount(account);
        user.setPassword(md5.encodePassword(password, account));
        user.setCreate_time(Calendar.getInstance(Configuration.timezone));
        user.setUpdate_time(Calendar.getInstance(Configuration.timezone));
        String milliseconds = String.valueOf(new Date().getTime()).substring(7);// 6位
        String random = String.valueOf(ThreadLocalRandom.current().nextInt(999999));// 6位
        /*确保id不重复*/
        String uid = milliseconds.concat(random);
        SysUser su = null;
        boolean flog = true;
        while(flog){
            su = sysUserDao.get_user_by_user_id(uid);
            if(su==null){
                flog = false;
            }else{
                uid = milliseconds.concat(random);
            }
        }
        user.setUser_id(uid);
        /*发送邮件*/
        if (verify.equals("Email")) {
            user.setEmail(account);
            //发送注册成功邮件
            String templete = Configuration.signup_success_templete;
            templete = templete.replaceAll("imdou8_host", Configuration.global_config.getProperty("imdou8.host"));
            templete = templete.replaceAll("signup_user_name", user.getAccount());
            String verifyToken =  UUID.randomUUID().toString().replace("-", "");
            user.setVerifyToken(verifyToken);
            templete = templete.replaceAll("activation_url", Configuration.global_config.getProperty("imdou8.host")+"/active/email/"+account+"/"+verifyToken);
            templete = templete.replaceAll("mailto_address", "870708429@qq.com");
            //设置邮件有效期为七天
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY) + 24*7);
            templete = templete.replaceAll("activation_end_date", Configuration.df.format(calendar.getTime()));
            Global_Tools.sendEmail(account, templete, "注册成功", null);
        }
        if(verify.equals("Phone")){
            user.setPhone(account);
        }
        /*为用户分配权限*/
        UserRole ur = new UserRole();
        ur.setUser_id(user.getUser_id());
        ur.setRole_name(Role.普通用户);

        /*持久化用户信息*/
        Session session = Tool_Hibernate.createSession();
        Transaction transaction = session.beginTransaction();
        session.save(user);
        session.save(ur);

        transaction.commit();
        session.close();
        response.getWriter().write(SUCCESS("注册成功"));
    }

    /*@RequestMapping(method = RequestMethod.GET, value = "/sendEmail")
    public void sendEmail(HttpServletRequest request, HttpServletResponse response, String to) throws IOException, MessagingException {
        String templete = Configuration.signup_success_templete;
        templete = templete.replaceAll("imdou8_host", Configuration.global_config.getProperty("imdou8.host"));
        templete = templete.replaceAll("signup_user_name", "noahli");
        templete = templete.replaceAll("activation_url", "http://vps.imdou8.com/active/email?e=870708429@qq.com");
        templete = templete.replaceAll("mailto_address", "870708429@qq.com");
        Global_Tools.sendEmail(Configuration.global_config.getProperty("mail.to"), templete, "测试邮件", null);

        String templete1 = Configuration.verify_email_templete;
        templete1 = templete1.replaceAll("imdou8_host", Configuration.global_config.getProperty("imdou8.host"));
        templete1 = templete1.replaceAll("signup_user_name", "noahli");
        templete1 = templete1.replaceAll("verify_url", "http://vps.imdou8.com/active/email?e=870708429@qq.com");
        templete1 = templete1.replaceAll("mailto_address", "870708429@qq.com");
        Global_Tools.sendEmail(Configuration.global_config.getProperty("mail.to"), templete1, "邮箱验证", null);
        response.getWriter().write(SUCCESS("发送成功"));
    }*/
}
