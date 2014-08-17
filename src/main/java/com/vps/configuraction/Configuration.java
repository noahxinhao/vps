package com.vps.configuraction;
import com.vps.tools.Tool_Hibernate;
import com.vps.tools.Tool_Mongo;
import org.apache.log4j.Logger;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.TimeZone;
import java.util.regex.Pattern;

/**
 * @author larry
 */

public class Configuration {
    public static Logger logger = Logger.getLogger(Configuration.class.getName());
    //
    public static TimeZone timezone = TimeZone.getTimeZone("GMT+8");
    public static DateFormat df = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
    public static Charset charset = StandardCharsets.UTF_8;
    // //////////////////////////////////读取配置文件////////////////////////////////////
    public static final Map<String, String> dm_mobile_map = new HashMap<>();
    public static final Properties global_config = new Properties();
    public static String ARTICLES = "ARTICLES";
    public static transient String verify_email_templete = "";
    public static transient String signup_success_templete = "";
    // 初始化
    public static void init_config() {
        logger.info("#init_serverconfig");
        try {
            System.out.println("#初始化全局配置");
            load_global_config_properties();
            logger.info("#初始化 hibernate 配置文件");
            Tool_Hibernate.init_session_factory();
            Tool_Mongo.init_mongodb_pool();
            /*加载邮件模板*/
            load_email_templete();
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("#读取配置文件错误");
            System.exit(1);
        }
        logger.info("#end init_serverconfig");
    }

    public static void load_dm_mobile() throws IOException {
        try (InputStream resourceAsStream = Configuration.class.getResourceAsStream("/dm_mobile.txt");//
             InputStreamReader inr = new InputStreamReader(resourceAsStream, StandardCharsets.UTF_8);
             BufferedReader reader = new BufferedReader(inr)) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!Pattern.compile("^\\s*[1]\\d{6}.*").matcher(line).matches()) {
                    logger.warn("不匹配的手机归属地配置:".concat(line));
                    continue;
                }
                String[] split = line.split(",");
                if (split.length != 2) {
                    logger.warn("不匹配的手机归属地配置:".concat(line));
                    continue;
                }
                dm_mobile_map.put(split[0].trim(), split[1].trim().split(" ")[0]);
            }
        }
    }

    public static void main(String[] args) throws IOException, ParserConfigurationException, SAXException {
        load_dm_mobile();
    }

    //初始化全局配置
    public static void load_global_config_properties() throws IOException {
        try(InputStream resourceAsStream = Configuration.class.getResourceAsStream("/global_configuration.properties")){
            global_config.load(resourceAsStream);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /*email模板*/
    public static void load_email_templete() {
        /*邮箱验证模板*/
        try {
            File db_conf = new File(Configuration.class.getClassLoader().getResource("email_templete/verify_email_templete.html").getPath());
            FileInputStream fis = new FileInputStream(db_conf);
            byte[] buffer = new byte[1024];
            StringBuffer stringbuffer = new StringBuffer();
            while ((fis.read(buffer)) != -1) {
                stringbuffer.append(new String(buffer, "utf-8"));
                buffer = new byte[1024];
            }
            verify_email_templete = stringbuffer.toString();
            fis.close();
        } catch (Exception e) {
            logger.error("解析邀请邮件模板错误",e);
            System.exit(1);
        }
        /*注册成功模板*/
        try {
            File db_conf = new File(Configuration.class.getClassLoader().getResource("email_templete/signup_success_templete.html").getPath());
            FileInputStream fis = new FileInputStream(db_conf);
            byte[] buffer = new byte[1024];
            StringBuffer stringbuffer = new StringBuffer();
            while ((fis.read(buffer)) != -1) {
                stringbuffer.append(new String(buffer, "utf-8"));
                buffer = new byte[1024];
            }
            signup_success_templete = stringbuffer.toString();
            fis.close();
        } catch (Exception e) {
            logger.error("解析邀请邮件模板错误",e);
            System.exit(1);
        }
    }
}
