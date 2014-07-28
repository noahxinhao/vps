package com.vps.webroot;

import com.vps._return.KV;
import com.vps._return.Return;
import com.vps.configuraction.Configuration;
import com.vps.tools.Global_Tools;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.security.NoSuchAlgorithmException;

/**
 * Created by noah on 14-6-19.
 */
@Controller
@RequestMapping("/down")
public class Rest_DownLoad {
    @RequestMapping(method = RequestMethod.GET, value = "/toPdf")
    public void customerService(HttpServletResponse response, HttpServletRequest request, String url) throws IOException, NoSuchAlgorithmException {
        if (!Global_Tools.isConnect(url)) {
            response.setHeader("Access-Control-Allow-Origin", "*");       //解决跨域
            response.getWriter().write(Return.FAIL("fail").toString());
            return;
        }
        try {
            String[] cmd = {"/bin/sh", "-c", Configuration.global_config.getProperty("wkhtml.path") + " " +Configuration.global_config.getProperty("pdf.parmater")+" "+ url + " " + Configuration.global_config.getProperty("pdf.path") + url.split("\\.")[1] + ".pdf"};
            Process ps = Runtime.getRuntime().exec(cmd);
            BufferedReader br = new BufferedReader(new InputStreamReader(ps.getInputStream()));
            StringBuffer sb = new StringBuffer();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\\n");
            }
            String result = sb.toString();
            System.out.print(result);
            KV[] kv = new KV[1];
            kv[0] = new KV("downloadUrl", url.split("\\.")[1] + ".pdf");
            response.setHeader("Access-Control-Allow-Origin", "*");       //解决跨域
            response.getWriter().write(Return.SUCCESS(kv, "").toString());
        } catch (Exception e) {
            response.setHeader("Access-Control-Allow-Origin", "*");       //解决跨域
            response.getWriter().write(Return.FAIL("fail").toString());
            e.printStackTrace();
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/download_file")
    public void download_file(HttpServletResponse response, HttpServletRequest request, String file_name) throws IOException {
        String filePath = Configuration.global_config.getProperty("pdf.path");
        String fileName = file_name;
        File file = new File(filePath + fileName); //要下载的文件绝对路径
        InputStream ins = new BufferedInputStream(new FileInputStream(filePath + fileName));
        byte[] buffer = new byte[ins.available()];
        ins.read(buffer);
        ins.close();
        response.reset();
        response.addHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes()));
        response.addHeader("Content-Length", "" + file.length());
        OutputStream ous = new BufferedOutputStream(response.getOutputStream());
        response.setContentType("application/octet-stream");
        ous.write(buffer);
        ous.flush();
        ous.close();
        /*file.delete();*/
    }
}
