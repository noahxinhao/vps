package com.vps._return; /**
 *
 */

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.vps.tools.Tool_Gson;

/**
 * 与前端交互的映射
 *
 * @author noah
 * @version 创建时间 2013-4-11 下午7:57:11
 * @email noahxinhao@gmail.com
 */
public class Return {
    private static Gson gson = Tool_Gson.gson;
    // 类型
    public transient static String SUCCESS = "success";
    public transient static String SUCCESS_TRUE = "true";
    public transient static String SUCCESS_FALSE = "false";
    //
    public transient static String NOTE = "note";
    //
    public static Map<String, String> map_success = new HashMap<String, String>();
    public static Map<String, String> map_fail = new HashMap<String, String>();

    static {
        map_success.put(SUCCESS, SUCCESS_TRUE);
        map_fail.put(SUCCESS, SUCCESS_FALSE);
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").serializeNulls().create();
    }

    public static String SUCCESS(String map_return) {
        Map<String, String> jo = new HashMap<String, String>();
        jo.put(SUCCESS, SUCCESS_TRUE);
        jo.put(NOTE, map_return);
        return gson.toJson(jo);
    }

    public static String SUCCESS(Map<String, Object> jo, String note) {
        try {
            jo.put(SUCCESS, SUCCESS_TRUE);
            jo.put(NOTE, note);
        } catch (Exception e) {
            return FAIL("返回值转换失败:" + e.getMessage());
        }
        return gson.toJson(jo);
    }

    public static String FAIL(Map<String, Object> jo, String note) {
        try {
            jo.put(SUCCESS, SUCCESS_FALSE);
            jo.put(NOTE, note);
        } catch (Exception e) {
            return FAIL("返回值转换失败:" + e.getMessage());
        }
        return gson.toJson(jo);
    }

    public static String FAIL(String note) {
        Map<String, String> jo = new HashMap<String, String>();
        jo.put(SUCCESS, SUCCESS_FALSE);
        jo.put(NOTE, note);
        return gson.toJson(jo);
    }

}
