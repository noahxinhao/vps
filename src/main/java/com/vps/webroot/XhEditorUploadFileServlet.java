/*
package com.vps.webroot;

*
 * Created by noah on 14-8-28.


*
 *



        import java.io.BufferedOutputStream;
        import java.io.File;
        import java.io.FileOutputStream;
        import java.io.IOException;
        import java.io.OutputStream;
        import java.io.PrintWriter;
        import java.io.Serializable;
        import java.text.SimpleDateFormat;
        import java.util.Date;
        import java.util.HashMap;
        import java.util.Iterator;
        import java.util.List;
        import java.util.Map;

        import javax.servlet.ServletException;
        import javax.servlet.http.HttpServlet;
        import javax.servlet.http.HttpServletRequest;
        import javax.servlet.http.HttpServletResponse;

        import org.apache.commons.fileupload.FileItem;
        import org.apache.commons.fileupload.FileItemFactory;
        import org.apache.commons.fileupload.disk.DiskFileItemFactory;
        import org.apache.commons.fileupload.servlet.ServletFileUpload;
        import org.apache.commons.logging.Log;
        import org.apache.commons.logging.LogFactory;
        import org.springframework.util.StringUtils;
        import org.springframework.web.util.WebUtils;


*
 * xhEditor文件上传的跨浏览器实现.
 * <p>
 * 支持html4和html5两种文件上传方式
 * </p>
 *
 * @author dragon
 *


public class XhEditorUploadFileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static Log logger = LogFactory
            .getLog(XhEditorUploadFileServlet.class);
    private static String baseDir; // 上传文件存储的目录，相对于应用部署目录下的相对路径
    private static String fileExt;// 上传类型限制，如 "jpg,jpeg,bmp,gif,png"，为空代表无限制
    private static Long maxSize;// 上传文件大小限制，单位为字节，默认10M

    public void init() throws ServletException {
        // 获取上传文件所保存到的根路径
        baseDir = this.getInitParameter("baseDir");
        if (StringUtils.isEmpty(baseDir))
            baseDir = "uploads";
        File absoluteDir = new File(WebUtils.rootPath + File.separator
                + baseDir);
        if (!absoluteDir.exists()) {
            absoluteDir.mkdir();
        }

        // 获取文件类型限制参数
        fileExt = this.getInitParameter("fileExt");

        // 获取文件大小限制参数
        String maxSize_str = this.getInitParameter("maxSize");
        if (StringUtils.isNotEmpty(maxSize_str)) {
            maxSize = new Long(maxSize_str);
        } else {
            maxSize = Long.valueOf(1024 * 1024 * 10); // 10M
        }
    }

    // 上传文件数据处理过程
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String type = request.getParameter("type");
        logger.debug("type=" + type);

        response.setContentType("text/html; charset=UTF-8");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        if ("application/octet-stream".equals(request.getContentType())) {
            // HTML5上传
            doPost4Html5(request, response);
        } else {
            // HTML4普通文件上传
            doPost4Html4(request, response);
        }
    }

    public void doPost4Html5(HttpServletRequest request,
                             HttpServletResponse response) throws ServletException, IOException {
        String err = "";// 错误信息
        String fileUrl = "";// 返回的文件访问路径
        String localFile = "";
        String belong = request.getParameter("belong");// 所隶属文档的类型
        if (belong == null)
            belong = "";

        try {
            // 获取当前用户信息
            SystemContext context = (SystemContext) request.getSession()
                    .getAttribute(Context.KEY);
            if (context == null)
                throw new CoreException("用户未登录或登录超时！");
            belong += (belong.length() > 0 ? "_" : "")
                    + context.getUser().getCode() + "_";

            // 获取上传文件名
            // ref: Content-Disposition:attachment; name="filedata";
            // filename="xxxx.jpg"
            localFile = getHtml5FileName(request);

            // 获取扩展名
            String extend = getExtend(localFile);

            // 检查文件类型
            if (!StringUtils.isEmpty(fileExt)
                    && ("," + fileExt.toLowerCase() + ",").indexOf(","
                    + extend.toLowerCase() + ",") == -1) {
                writeReturnJson4html5(response, "不允许上传此类型的文件", "", localFile);
                return;
            }

            // 获取上传文件流
            int i = request.getContentLength();
            byte buffer[] = new byte[i];
            int j = 0;
            while (j < i) {
                int k = request.getInputStream().read(buffer, j, i - j);
                j += k;
            }

            // 检查文件是否为空
            if (buffer.length == 0) {
                writeReturnJson4html5(response, "上传文件不能为空", "", localFile);
                return;
            }

            // 检查文件大小是否超限
            if (maxSize > 0 && buffer.length > maxSize) {
                writeReturnJson4html5(response, "上传文件的大小超出限制", "", localFile);
                return;
            }

            // 文件存储的相对路径（年月），避免超出目录内文件数的限制
            Date now = new Date();
            String fileFolder = new SimpleDateFormat("yyyyMM").format(now);

            // 构建文件要保存到的目录
            File fileDir = new File(WebUtils.rootPath + File.separator
                    + baseDir + File.separator + fileFolder);
            if (!fileDir.exists()) {
                fileDir.mkdirs();
            }

            // 要保存的物理文件名
            String filename = belong
                    + new SimpleDateFormat("yyyyMMddHHmmssSSSS").format(now);

            // 保存到文件
            OutputStream out = new BufferedOutputStream(new FileOutputStream(
                    WebUtils.rootPath + File.separator + baseDir
                            + File.separator + fileFolder + File.separator
                            + filename + "." + extend, true));
            out.write(buffer);
            out.close();

            fileUrl = request.getContextPath() + "/" + baseDir + "/"
                    + fileFolder + "/" + filename + "." + extend;
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            fileUrl = "";
            err = "错误: " + ex.getMessage();
        }
        writeReturnJson4html5(response, err, fileUrl, localFile);
    }

    // 普通文件上传
    private void doPost4Html4(HttpServletRequest request,
                              HttpServletResponse response) throws ServletException, IOException {
        String err = "";// 错误信息
        String fileUrl = "";// 返回的文件访问路径
        String belong = request.getParameter("belong");// 所隶属文档的类型
        if (belong == null)
            belong = "";
        try {
            // 检测请求是否是文件上传类型
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            if (!isMultipart) {
                writeReturnJson(response, "不是文件上传的请求", "");
                return;
            }

            // 获取当前用户信息
            SystemContext context = (SystemContext) request.getSession()
                    .getAttribute(Context.KEY);
            if (context == null)
                throw new CoreException("用户未登录或登录超时！");
            belong += (belong.length() > 0 ? "_" : "")
                    + context.getUser().getCode() + "_";

            // 获取上传的文件
            FileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload upload = new ServletFileUpload(factory);
            upload.setSizeMax(maxSize);// 文件大小限制
            @SuppressWarnings("unchecked")
            List<FileItem> items = upload.parseRequest(request);

            // 循环处理上传
            Map<String, Serializable> fields = new HashMap<String, Serializable>();
            Iterator<FileItem> iter = items.iterator();
            while (iter.hasNext()) {
                FileItem item = (FileItem) iter.next();

                if (item.isFormField()) {
                    // 处理表单域
                    fields.put(item.getFieldName(), item.getString());
                } else {
                    // 上传的文件
                    fields.put(item.getFieldName(), item);
                }
            }

            // 获取xheditor上传的文件
            FileItem uploadFile = (FileItem) fields.get("filedata");

            // 获取上传文件名
            String localfile = uploadFile.getName();

            // 获取扩展名
            String extend = getExtend(localfile);

            // 检查文件类型
            if (!StringUtils.isEmpty(fileExt)
                    && ("," + fileExt.toLowerCase() + ",").indexOf(","
                    + extend.toLowerCase() + ",") == -1) {
                writeReturnJson(response, "不允许上传此类型的文件", "");
                return;
            }

            // 检查文件是否为空
            if (uploadFile.getSize() == 0) {
                writeReturnJson(response, "上传文件不能为空", "");
                return;
            }

            // 检查文件大小是否超限
            if (maxSize > 0 && uploadFile.getSize() > maxSize) {
                writeReturnJson(response, "上传文件的大小超出限制", "");
                return;
            }

            // 文件存储的相对路径（年月），避免超出目录内文件数的限制
            Date now = new Date();
            String fileFolder = new SimpleDateFormat("yyyyMM").format(now);

            // 构建文件要保存到的目录
            File fileDir = new File(WebUtils.rootPath + File.separator
                    + baseDir + File.separator + fileFolder);
            if (!fileDir.exists()) {
                fileDir.mkdirs();
            }

            // 要保存的物理文件名
            String filename = belong
                    + new SimpleDateFormat("yyyyMMddHHmmssSSSS").format(now);

            // 保存到文件
            File savefile = new File(WebUtils.rootPath + File.separator
                    + baseDir + File.separator + fileFolder + File.separator
                    + filename + "." + extend);
            uploadFile.write(savefile); // 存储上传文件

            fileUrl = request.getContextPath() + "/" + baseDir + "/"
                    + fileFolder + "/" + filename + "." + extend;
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            fileUrl = "";
            err = "错误: " + ex.getMessage();
        }
        writeReturnJson(response, err, fileUrl);
    }

    // 获取使用html5上传的文件的名称
    private String getHtml5FileName(HttpServletRequest request) {
        String dispoString = request.getHeader("Content-Disposition");
        int iFindStart = dispoString.indexOf("name=\"") + 6;
        int iFindEnd = dispoString.indexOf("\"", iFindStart);
        iFindStart = dispoString.indexOf("filename=\"") + 10;
        iFindEnd = dispoString.indexOf("\"", iFindStart);
        String sFileName = dispoString.substring(iFindStart, iFindEnd);
        return sFileName;
    }

    // 获取文件的扩展名，如"png"
    private static String getExtend(String fileName) {
        int pos = fileName.lastIndexOf(".");
        return fileName.substring(pos + 1);
    }

    // 使用I/O流输出 json格式的数据
    // 格式:
    // {"err":"","msg":{"url":"200906030521128703.jpg","localfile":"test.jpg","id":"1"}}
    public void writeReturnJson4html5(HttpServletResponse response, String err,
                                      String fileUrl, String localFile) throws IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.println("{\"err\":\"" + err + "\",\"msg\":{\"url\":\"" + fileUrl
                + "\",\"localfile\":\"" + localFile + "\",\"id\":\"1\"}}");
        out.flush();
        out.close();
    }

    // 使用I/O流输出 json格式的数据
    public void writeReturnJson(HttpServletResponse response, String err,
                                String fileUrl) throws IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.println("{\"err\":\"" + err + "\",\"msg\":\"" + fileUrl + "\"}");
        out.flush();
        out.close();
    }
}
*/
