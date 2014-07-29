package com.vps.util;

import org.apache.log4j.Logger;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.CropImageFilter;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;
import java.io.*;
import java.math.BigDecimal;


public class ImageUtil {

    public static Logger logger = Logger.getLogger(ImageUtil.class.getName());

    public static boolean isImage(byte[] imageContent) throws IOException {
        if (imageContent == null || imageContent.length == 0) {
            return false;
        }
        Image img = null;
        InputStream is = null;
        try {
            is = new ByteArrayInputStream(imageContent);
            if (is == null) {
                return false;
            }
            img = ImageIO.read(is);
            if (img == null || img.getWidth(null) <= 0
                    || img.getHeight(null) <= 0) {
                return false;
            }
            return true;
        } catch (Exception e) {

            return false;
        } finally {
            is.close();
        }
    }
    
    //剪切图片工具方法
   	/*public static void cutImage(String suffix, String filename,
               int x1, int y1, int x2, int y2) {
           try {  
               Image img;  
               ImageFilter cropFilter;  
               File sourceImgFile = new File(Configuration.header_sculpture_absolute_path + "/"+filename);
               BufferedImage bi = ImageIO.read(sourceImgFile);  
               int srcWidth = bi.getWidth();  
               int srcHeight = bi.getHeight();
               int destWidth = x2 - x1;  
               int destHeight = y2 - y1;  
               BigDecimal widthBigDecimal = new BigDecimal(srcWidth);
               BigDecimal processBigDecimal = widthBigDecimal.divide(new BigDecimal(300),6,BigDecimal.ROUND_DOWN);
               double process = processBigDecimal.doubleValue();
               if(destWidth==0||destHeight==0){
            	  return;
               }
               
               if (srcWidth >= destWidth && srcHeight >= destHeight) {  
                   Image image = bi.getScaledInstance(srcWidth, srcHeight,  
                           Image.SCALE_DEFAULT);  
                   cropFilter = new CropImageFilter((int)(Math.round(x1*process)), (int)(Math.round(y1*process)), (int)Math.round(destWidth*process), (int)Math.round(destHeight*process));
                   img = Toolkit.getDefaultToolkit().createImage(  
                           new FilteredImageSource(image.getSource(), cropFilter));  
                   BufferedImage tag = new BufferedImage(120, 120,  
                           BufferedImage.TYPE_INT_RGB);  
                   Graphics g = tag.getGraphics();
                   g.drawImage(img, 0, 0, 120,120,null);  
                   g.dispose();
                   ImageIO.write(tag, suffix, new File(Global_Configuration.header_sculpture_absolute_path + "/"+filename));
                   ByteArrayOutputStream out = new ByteArrayOutputStream();
                   ImageIO.write(tag,suffix, out);
               }
           } catch (Exception e) {  
               e.printStackTrace();  
           }  
       }  */
   	
   /* public static String saveImageAndGetFileName(String userId,byte[] imageContent,String suffix) throws Exception {
        String fileName = userId + "." + suffix;
        OutputStream out = null;
        try {
            File imageFile = new File(Global_Configuration.header_sculpture_absolute_path + "/" + fileName);
            if (imageFile.exists()) {
                imageFile.delete();
            }
            out = new FileOutputStream(imageFile);

            out.write(imageContent);
            return fileName;
        } catch (Exception e) {
            logger.error("保存头像时候异常",e);
            throw new Exception("保存头像异常",e);
        }
        finally {
            out.flush();
            out.close();
        }
    }*/
}
