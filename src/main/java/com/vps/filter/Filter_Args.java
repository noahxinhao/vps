/**
 * 
 */
package com.vps.filter;

import com.vps.configuraction.Configuration;
import com.vps.tools.Tool_Hibernate;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author larry
 * @email larry.lv.word@gmail.com
 */
public class Filter_Args implements Filter {

	private String allow = "*";

	protected FilterConfig filterConfig;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		// 本过滤器默认编码是UTF-8，但也可以在web.xml配置文件里设置自己需要的编码
		if (filterConfig.getInitParameter("allow") != null) {
			allow = filterConfig.getInitParameter("allow");
		}
	}

	public void doFilter(ServletRequest srequset, ServletResponse sresponse, FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) srequset;
		HttpServletResponse response = (HttpServletResponse) sresponse;
		// 设置编码
		String encoding = Configuration.charset.toString();
		// 跨域
		response.setHeader("Access-Control-Allow-Origin", allow);
        request.setCharacterEncoding(encoding);
        response.setCharacterEncoding(encoding);
		try {
			filterChain.doFilter(srequset, sresponse);
		} catch (Exception e) {
		}

		//普通 mysql 连接
		List<ThreadLocal<Session>> list_session_thread_local = Tool_Hibernate.list_session_thread_local;
		for (ThreadLocal<Session> session_thread_local : list_session_thread_local) {
			Session session = session_thread_local.get();
			if (session != null && session.isOpen()) {
				Transaction transaction = session.getTransaction();
				if (transaction.isActive()) {
					transaction.rollback();
				}
				session.close();
			}
			session_thread_local.set(null);
		}
		list_session_thread_local.clear();

		//current_session 连接
		Session current_session = Tool_Hibernate.current_session_thread_local.get();
		if (current_session != null && current_session.isOpen()) {
			Transaction transaction = current_session.getTransaction();
			if (transaction.isActive()) {
				transaction.rollback();
			}
		}
		
	}

	@Override
	public void destroy() {
	}

}