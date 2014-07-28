/**
 *
 */
package com.vps.listener;

import com.vps.configuraction.Configuration;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * @author larry
 * @email larry.lv.word@gmail.com
 */
public class Init_Listener implements ServletContextListener {

    /*
     * (non-Javadoc)l
     *
     * @see javax.servlet.ServletContextListener#contextInitialized(javax.servlet.ServletContextEvent)
     */
    @Override
    public void contextInitialized(ServletContextEvent event) {
        event.getServletContext().log("服务启动 ...");
        try {
            event.getServletContext().log("加载配置文件");
            Configuration.init_config();
        } catch (Exception e) {
            e.printStackTrace();
            event.getServletContext().log("服务启动失败");
            System.exit(1);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        event.getServletContext().log("服务结束");
    }
}
