package com.vps.webroot;

import com.vps.dao.SysUserDao;
import com.vps.model.SysUser;
import com.vps.tools.Tool_Hibernate;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.vps._return.Return.FAIL;
import static com.vps._return.Return.SUCCESS;

/**
 * Created by noah on 14-8-16.
 */
@Controller
@RequestMapping("/active")
public class Rest_Active {
    private SysUserDao sysUserDao = new SysUserDao();
    @RequestMapping(method = RequestMethod.GET, value = "/email/{email}/{token}")
    public ModelAndView verifyAccount(HttpServletRequest request, HttpServletResponse response, @PathVariable String email,@PathVariable String token) throws IOException, MessagingException {
        SysUser sysUser = sysUserDao.verifyAccountByEmail(email,token);
        Map model = new HashMap();
        if(sysUser!=null){
            String accountVerify = sysUser.getAccountVerify()==null?"@email":"@email"+sysUser.getAccountVerify();
            sysUser.setAccountVerify(accountVerify);//标识邮箱验证
            sysUser.setVerifyToken("");
            Session session = Tool_Hibernate.getCurrentSession();
            Transaction beginTransaction = session.beginTransaction();
            session.saveOrUpdate(sysUser);
            beginTransaction.commit();
            model.put("status","success");
            model.put("sysUser", sysUser);
            model.put("type", "邮箱");
        }else{
            model.put("status","fail");
        }
        return new ModelAndView("/verify_account",model);
    }
}
