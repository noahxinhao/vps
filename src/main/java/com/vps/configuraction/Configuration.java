package com.vps.configuraction;
import com.vps.tools.Tool_Hibernate;
import com.vps.tools.Tool_Mongo;
import org.apache.log4j.Logger;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
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
    public static Charset charset = StandardCharsets.UTF_8;
    // //////////////////////////////////读取配置文件////////////////////////////////////
    public static final Map<String, String> dm_mobile_map = new HashMap<>();
    public static final Properties global_config = new Properties();
    public static String ARTICLES = "ARTICLES";
    // 初始化
    public static void init_config() {
        logger.info("#init_serverconfig");
        try {
            System.out.println("#初始化全局配置");
            load_global_config_properties();
            logger.info("#初始化 hibernate 配置文件");
            Tool_Hibernate.init_session_factory();
            Tool_Mongo.init_mongodb_pool();
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
}
