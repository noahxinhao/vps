package com.vps.webroot;

import com.vps.configuraction.Configuration;
import com.vps.dao.SysUserDao;
import com.vps.model.SysUser;
import com.vps.util.ImageUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.vps._return.Return.FAIL;
import static com.vps._return.Return.SUCCESS;

/**
 * Created by noah on 14-8-17.
 */
@Controller
@RequestMapping("/set")
public class Rest_Setting {
    private SysUserDao sysUserDao = new SysUserDao();

    @RequestMapping(method = RequestMethod.POST, value = "/uploadImg")
    public void uploadImg(HttpServletRequest request, HttpServletResponse response, String x1, String y1, String x2, String y2, @RequestParam("file0") MultipartFile file0) throws IOException, MessagingException {
        Object su = request.getSession().getAttribute("sysUser");
        if (su == null) {
            response.getWriter().write(FAIL("不合发的操作,已退出登录"));
            return;
        }
        SysUser sysUser = (SysUser) su;
        if (file0.getOriginalFilename() != null && file0.getOriginalFilename().length() > 3) {
            String fileName = file0.getOriginalFilename();
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
            if (file0.getSize() > 83886082) {
                response.getWriter().write(FAIL("图片超过4M"));
                return;
            } else if (!allowPictureSuffix.contains(suffix.toUpperCase())) {
                response.getWriter().write(FAIL("文件后缀无效"));
                return;
            } else if (!ImageUtil.isImage(file0.getBytes())) {
                response.getWriter().write(FAIL("图片上传失败"));
                return;
            }

            try {
                //根据上传图像的宽高剪切图像
                systemFileName = ImageUtil.saveImageAndGetFileName(sysUser.getUser_id(), file0.getBytes(), suffix);
                //剪切小图标
                ImageUtil.cutImage(suffix, systemFileName, Integer.parseInt(x1), Integer.parseInt(y1), Integer.parseInt(x2), Integer.parseInt(y2));
                response.getWriter().write(SUCCESS("图片成功"));
            } catch (Exception e) {
                response.getWriter().write(FAIL("图片上传失败"));
                return;
            }
        }
    }
}
