package com.vps.webroot;

import com.vps._return.Return;
import com.vps.configuraction.Configuration;
import com.vps.model.SysUser;
import com.vps.tools.Global_Tools;
import com.vps.tools.Tool_Hibernate;
import org.hibernate.Transaction;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.hibernate.Session;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by noah on 14-7-29.
 */
@Controller
@RequestMapping("/ruc")
public class Rest_UserControl {
    Md5PasswordEncoder md5 = new Md5PasswordEncoder();
    @RequestMapping(method = RequestMethod.POST, value = "/signup")
    public void signup(HttpServletRequest request, HttpServletResponse response, String account, String password, String validate_code) throws IOException, MessagingException {
        if (account == "" || password == "" || validate_code == "") {
            response.getWriter().write(Return.SUCCESS("注册信息不完整"));
            return;
        }
        if (!validate_code.equals(request.getSession().getAttribute(request.getSession().getId()))) {
            response.getWriter().write(Return.SUCCESS("验证码错误"));
            return;
        }

        String verify = Global_Tools.verifyAccount(account);
        if (verify.equals(null)) {
            response.getWriter().write(Return.SUCCESS("用户名格式错误"));
            return;
        }
        /*创建用户*/
        SysUser user = new SysUser();
        user.setReal_name(account);
        user.setAccount(account);
        user.setPassword(md5.encodePassword(password, account));

        Session session = Tool_Hibernate.createSession();
        Transaction transaction = session.beginTransaction();
        session.save(user);
        transaction.commit();
        session.close();
        /*发送邮件*/
        if (verify.equals("Email")) {
            //发送注册成功邮件
            Global_Tools.sendEmail(account, "感谢您注册imdou8", "注册成功【imdou8】", null);
        }

        response.getWriter().write(Return.SUCCESS("注册成功"));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/sendEmail")
    public void sendEmail(HttpServletRequest request, HttpServletResponse response,String to) throws IOException, MessagingException {
        String templete = Configuration.signup_success_templete;
        templete = templete.replaceAll("imdou8_host",Configuration.global_config.getProperty("imdou8.host"));
        templete = templete.replaceAll("signup_user_name","noahli");
        templete = templete.replaceAll("activation_url","http://vps.imdou8.com/active/email?e=870708429@qq.com");
        templete = templete.replaceAll("mailto_address","870708429@qq.com");
        Global_Tools.sendEmail(Configuration.global_config.getProperty("mail.to"),templete,"测试邮件",null);

        String templete1 = Configuration.verify_email_templete;
        templete1 = templete1.replaceAll("imdou8_host",Configuration.global_config.getProperty("imdou8.host"));
        templete1 = templete1.replaceAll("signup_user_name","noahli");
        templete1 = templete1.replaceAll("verify_url","http://vps.imdou8.com/active/email?e=870708429@qq.com");
        templete1 = templete1.replaceAll("mailto_address","870708429@qq.com");
        Global_Tools.sendEmail(Configuration.global_config.getProperty("mail.to"),templete1,"邮箱验证",null);
        response.getWriter().write(Return.SUCCESS("发送成功"));
    }
}
