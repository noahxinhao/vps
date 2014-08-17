package com.vps.filter;

import com.vps.dao.SysUserDao;
import com.vps.model.SysUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.RequestWrapper;
import java.io.IOException;

/**
 * Created by noah on 14-8-16.
 */
public class CheckUserFilter implements Filter {
    private SysUserDao sysUserDao = new SysUserDao();
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        SecurityContextImpl securityContext = (SecurityContextImpl) request.getSession().getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
        if (securityContext == null) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        /*如果没有授权 则将请求传到后面的filter处理*/
        Authentication authentication = securityContext.getAuthentication();
        if (!authentication.isAuthenticated()) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        /*如果已经授权,则拿到授权用户的信息写进session*/
        User user = (User) authentication.getPrincipal();
        SysUser sysUserC = sysUserDao.get_user_by_account(user.getUsername());
        if(sysUserC!=null){
            request.getSession().setAttribute("sysUser",sysUserC);
        }

        Object sysUser = request.getSession().getAttribute("sysUser");
        if (sysUser != null) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
