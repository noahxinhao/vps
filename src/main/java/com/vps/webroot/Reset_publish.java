package com.vps.webroot;

import com.vps._return.Return;
import com.vps.configuraction.Configuration;
import com.vps.model.SysUser;
import com.vps.tools.Tool_Hibernate;
import com.vps.util.ImageUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

import static com.vps._return.Return.FAIL;
import static com.vps._return.Return.SUCCESS;

/**
 * Created by noah on 14-8-26.
 */
@Controller
@RequestMapping("/rp")
public class Reset_publish {
    @RequestMapping(method = RequestMethod.POST,value = "/upload_blog_img")
    public void upload(HttpServletRequest request, HttpServletResponse response,@RequestParam("filedata") MultipartFile filedata ) throws Exception {
        System.out.print("开始写入图片文件");
        Object su = request.getSession().getAttribute("sysUser");
        if (su == null) {
            response.getWriter().write(FAIL("不合发的操作,已退出登录"));
            return;
        }
        SysUser sysUser = (SysUser) su;
        Map map = new HashMap();
        map.put("err","");
        if (filedata.getOriginalFilename() != null && filedata.getOriginalFilename().length() > 3) {
            String fileName = filedata.getOriginalFilename();
            if (fileName.lastIndexOf(".") == -1) {
                throw new RuntimeException("文件名异常，缺少后缀名");
            }

            String suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
            String systemFileName = null;
            List<String> allowPictureSuffix = new ArrayList<String>();
            allowPictureSuffix.add("JPG");
            allowPictureSuffix.add("PNG");
            allowPictureSuffix.add("JPEG");
            allowPictureSuffix.add("GIF");
            if (filedata.getSize() > 83886082) {
                response.getWriter().write(FAIL("图片超过4M"));
                return;
            } else if (!allowPictureSuffix.contains(suffix.toUpperCase())) {
                response.getWriter().write(FAIL("文件后缀无效"));
                return;
            } else if (!ImageUtil.isImage(filedata.getBytes())) {
                response.getWriter().write(FAIL("图片上传失败"));
                return;
            }
            try {
                String token =  UUID.randomUUID().toString().replace("-", "").substring(4,16);
                //根据上传图像的宽高剪切图像
                systemFileName = ImageUtil.saveBlogImg(sysUser.getUser_id()+"_"+token, filedata.getBytes(), suffix);
                map.put("msg", systemFileName + "." + suffix);
                response.getWriter().write(Return.SUCCESS(map, ""));
            } catch (Exception e) {
                response.getWriter().write(FAIL("图片上传失败"));
                return;
            }
        }
        

    }
    public static byte[] readInputStream(InputStream inStream) throws Exception{
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        //创建一个Buffer字符串
        byte[] buffer = new byte[1024];
        //每次读取的字符串长度，如果为-1，代表全部读取完毕
        int len = 0;
        //使用一个输入流从buffer里把数据读取出来
        while( (len=inStream.read(buffer)) != -1 ){
            //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
            outStream.write(buffer, 0, len);
        }
        //关闭输入流
        inStream.close();
        //把outStream里的数据写入内存
        return outStream.toByteArray();
    }
}
