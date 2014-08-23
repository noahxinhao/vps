package com.vps.tools;

import com.vps.configuraction.Configuration;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by noah on 14-6-19.
 */
public class Global_Tools {
    private static URL url;
    private static HttpURLConnection con;
    private static int state = -1;
    public static Executor pool = Executors.newFixedThreadPool(2, new ThreadFactory() {// 使用守护进程创建进程池
        public Thread newThread(Runnable r) {
            Thread s = Executors.defaultThreadFactory().newThread(r);
            s.setDaemon(true);
            return s;
        }
    });

    public static synchronized boolean isConnect(String urlStr) {
        int counts = 0;
        if (urlStr == null || urlStr.length() <= 0) {
            return false;
        }
        while (counts < 3) {
            try {
                url = new URL(urlStr);
                con = (HttpURLConnection) url.openConnection();
                con.setConnectTimeout(5000);
                state = con.getResponseCode();
                if (state == 200 || state == 301 || state == 302) {
                    return true;
                }
            } catch (Exception ex) {
                counts++;
                continue;
            }
        }
        return false;
    }

    public static void sendEmail(final String to, final String content, final String title, final String affixName) throws MessagingException, UnsupportedEncodingException {
        /* EmailThread emailThread = new EmailThread(to, content, title, affxname);
        Thread thread = new Thread(emailThread);
        thread.start();*/
        //发送邮件线程
        final Runnable r = new Runnable() {
            public void run() {
                try {
                    Properties properties = new Properties();
                    properties.put("mail.smtp.host", Configuration.global_config.getProperty("email.host"));
                    properties.put("mail.smtp.port", Configuration.global_config.getProperty("email.port"));
                    properties.put("mail.smtp.auth", "true");
                    //gmail发送邮件设置
                    if (Configuration.global_config.getProperty("email.host").equals("smtp.gmail.com")) {
                        properties.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
                        properties.setProperty("mail.smtp.socketFactory.fallback", "false");
                        properties.setProperty("mail.smtp.socketFactory.port", Configuration.global_config.getProperty("email.port"));
                    }
                    String nick = "";
                    nick = javax.mail.internet.MimeUtility.encodeText("IMDOU8");
                    Authenticator authenticator = new EmailAuthenticator(Configuration.global_config.getProperty("email.username"), Configuration.global_config.getProperty("email.password"));
                    Session sendMailSession = Session.getDefaultInstance(properties, authenticator);
                    MimeMessage mailMessage = new MimeMessage(sendMailSession);
                    mailMessage.setFrom(new InternetAddress(nick + "<" + Configuration.global_config.getProperty("email.username") + ">"));
                    mailMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
                    mailMessage.setSubject(title + Configuration.global_config.getProperty("email.subject"), "UTF-8");
                    mailMessage.setSentDate(new Date());
                    BodyPart html = new MimeBodyPart();
                    if (content != null) {
                        html.setContent(content.trim(), "text/html; charset=UTF-8");
                    } else {
                        html.setContent("空的邮件", "text/html; charset=UTF-8");
                    }
                    Multipart mainPart = new MimeMultipart();
                    mainPart.addBodyPart(html);

                    //添加附件
                    if (affixName != null && affixName != "") {
                        BodyPart messageBodyPart = new MimeBodyPart();
                        DataSource source = new FileDataSource(affixName);
                        messageBodyPart.setDataHandler(new DataHandler(source));
                        sun.misc.BASE64Encoder enc = new sun.misc.BASE64Encoder();
                        messageBodyPart.setFileName("=?GBK?B?" + enc.encode(affixName.getBytes()) + "?=");
                        mainPart.addBodyPart(messageBodyPart);
                    }
                    mailMessage.setContent(mainPart);
                    Transport.send(mailMessage);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        };
        Global_Tools.pool.execute(r);
    }

    /*判断是邮箱还是手机号码*/
    public static String verifyAccount(String account) {
        boolean flag = false;
        /*邮箱验证*/
        try {
            String checkEmail = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
            Pattern regexEmail = Pattern.compile(checkEmail);
            Matcher matcher = regexEmail.matcher(account);
            flag = matcher.matches();
        } catch (Exception e) {
            flag = false;
        }
        if (flag) {
            return "Email";
        }

        /*手机号码验证*/
        try {
            String checkPhone = "^[1][3,4,5,8][0-9]{9}$";
            Pattern regexPhone = Pattern.compile(checkPhone);
            Matcher matcher = regexPhone.matcher(account);
            flag = matcher.matches();
        } catch (Exception e) {
            flag = false;
        }

        if (flag) {
            return "Phone";
        }

        return null;
    }

    public static void isExist(String path) {
        File file = new File(path);
        //判断文件夹是否存在,如果不存在则创建文件夹
        if (!file.exists()) {
            file.mkdir();
        }
    }
}
