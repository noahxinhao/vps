/**
 * 
 */
package com.vps.tools;

import org.apache.log4j.Logger;
import org.hibernate.MappingException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AnnotationTypeFilter;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * @author larry
 * @email larry.lv.word@gmail.com
 * @version 创建时间 2013-4-7 下午1:09:21
 */
public class Tool_Hibernate {
	public static Logger logger = Logger.getLogger(Tool_Hibernate.class.getName());
	private static SessionFactory sessionFactory = null;
	public static SessionFactory init_session_factory() {
		if (sessionFactory == null) {
			try {

				Configuration cfg = new Configuration().configure("hibernate_credit.cfg.xml");
				Properties properties = cfg.getProperties();
				logger.info(properties.get("hibernate.connection.url"));
				cfg = autoScanAnnotatedEntityClass("com.vps.model", cfg);
				ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build();
				sessionFactory = cfg.buildSessionFactory(serviceRegistry);
            } catch (Throwable e) {
				throw new ExceptionInInitializerError(e);
			}
		}
		return sessionFactory;
	}
	private static Configuration autoScanAnnotatedEntityClass(String scanRootPackage, Configuration cfg) {
		ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
		scanner.addIncludeFilter(new AnnotationTypeFilter(Entity.class));
		for (BeanDefinition bd : scanner.findCandidateComponents(scanRootPackage)) {
			String className = bd.getBeanClassName();
			try {
				if (!className.startsWith("Template_")) {
					cfg = cfg.addAnnotatedClass(Class.forName(className));
				}
			} catch (MappingException e) {
				e.printStackTrace();
				logger.error("Hibernate 动态加载类失败：" + className);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return cfg;
	}
	public static final List<ThreadLocal<Session>> list_session_thread_local = new ArrayList<>();
	public static final ThreadLocal<Session> current_session_thread_local = new ThreadLocal<Session>();
	/**
	 * 需要自行关闭 session
	 * 
	 * @return
	 * @throws
	 */
	public static Session createSession() {
		Session session = sessionFactory.openSession();
		ThreadLocal<Session> threadLocal = new ThreadLocal<Session>();
		threadLocal.set(session);
		list_session_thread_local.add(threadLocal);
		return session;
	}
	/** 慎重使用:!!! 当前线程从发起到结束都只有一个不能执行session.close,或rollback后就不能再次进行调用 */
	public static Session getCurrentSession() {
		// jta 只有分布式事务处理才用 获取当前线程的 session 用与在 service 层控制事务
		Session session = sessionFactory.getCurrentSession();
		current_session_thread_local.set(session);
		return session;
	}
}
