package com.vps.util;

import org.patchca.color.GradientColorFactory;
import org.patchca.filter.predefined.*;
import org.patchca.service.Captcha;
import org.patchca.service.ConfigurableCaptchaService;

import java.awt.image.BufferedImage;

/**
 * Created by noah on 14-3-12.
 */
public class ValidateCode {
    String code;

    BufferedImage image;

    public ValidateCode() {
        createEntry();
    }

    public String getCode() {
        return code;
    }
    public BufferedImage getImage() {
        return image;
    }
    private void createEntry() {
        ConfigurableCaptchaService cs =new ConfigurableCaptchaService();
        cs.setColorFactory(new GradientColorFactory());
        switch ((int) (System.currentTimeMillis() % 6)) {
            case 0:
                cs.setFilterFactory(new CurvesRippleFilterFactory(cs.getColorFactory()));
                break;
            case 1:
                cs.setFilterFactory(new MarbleRippleFilterFactory());
                break;
            case 2:
                cs.setFilterFactory(new DoubleRippleFilterFactory());
                break;
            case 3:
                cs.setFilterFactory(new WobbleRippleFilterFactory());
                break;
            case 4:
                cs.setFilterFactory(new DiffuseRippleFilterFactory());
                break;
            case 5:
                cs.setFilterFactory(new RippleFilterFactory());
                break;
        }
        Captcha captcha = cs.getCaptcha();
        code = captcha.getChallenge();
        image = captcha.getImage();
    }
}
