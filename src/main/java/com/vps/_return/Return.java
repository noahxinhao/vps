/**
 * 
 */
package com.vps._return;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.HashMap;
import java.util.Map;

public class Return {
	private static Gson gson = new Gson();
	// 类型
	public transient static String STATUS = "success";
	public transient static String STATUS_SUCCESS = "true";
	public transient static String STATUS_FAIL = "false";


	//
	public transient static String NOTE = "note";
	//
	public static Map<String, String> SUCCESS = new HashMap<String, String>();
	public static Map<String, String> FAIL = new HashMap<String, String>();
	static {
		SUCCESS.put(STATUS, STATUS_SUCCESS);
		FAIL.put(STATUS, STATUS_FAIL);
		gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
	}

    public static String SUCCESS(String map_return) {
        Map<String, String> jo = new HashMap<String, String>();
        try {
            jo.put(STATUS, STATUS_SUCCESS);
            jo.put(NOTE, map_return);
        } catch (Exception e) {
            FAIL.put(NOTE, "返回值转换失败:" + e.getMessage());
            return gson.toJson(FAIL);
        }
        return gson.toJson(jo);
    }


    public static String SUCCESS(KV[] map_return, String note) {
		Map<String, Object> jo = new HashMap<String, Object>();
		try {
			jo.put(STATUS, STATUS_SUCCESS);
			jo.put(NOTE, note);
			for (KV entry : map_return){
				jo.put(entry.getName(), entry.getValue());
			}
		} catch (Exception e) {
			FAIL.put(NOTE, "返回值转换失败:" + e.getMessage());
			return gson.toJson(FAIL);
		}
		return gson.toJson(jo);
	}


	public static String FAIL(String note) {
		Map<String, String> jo = new HashMap<String, String>();
		try {
			jo.put(STATUS, STATUS_FAIL);
			jo.put(NOTE, note);
		} catch (Exception e) {
			FAIL.put(NOTE, "返回值转换失败:" + e.getMessage());
			return gson.toJson(FAIL);
		}
		return gson.toJson(jo);
	}
/*


    public transient static String SUCCESS2 = "status";
    public transient static String SUCCESS_TRUE = "success";
    public transient static String SUCCESS_FALSE = "fail";
    public static Map<String, String> map_success = new HashMap<String, String>();
    public static Map<String, String> map_fail = new HashMap<String, String>();
    static {
        map_success.put(SUCCESS2, SUCCESS_TRUE);
        map_fail.put(SUCCESS2, SUCCESS_FALSE);
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").serializeNulls().create();
    }

    public static String SUCCESS2(String map_return) {
        Map<String, String> jo = new HashMap<String, String>();
        jo.put(SUCCESS2, SUCCESS_TRUE);
        jo.put(NOTE, map_return);
        return gson.toJson(jo);
    }

    public static String SUCCESS2(Map<String, Object> jo, String note) {
        try {
            jo.put(SUCCESS2, SUCCESS_TRUE);
            jo.put(NOTE, note);
        } catch (Exception e) {
            return FAIL2("返回值转换失败:" + e.getMessage());
        }
        return gson.toJson(jo);
    }

    public static String FAIL2(String note) {
        Map<String, String> jo = new HashMap<String, String>();
        jo.put(SUCCESS2, SUCCESS_FALSE);
        jo.put(NOTE, note);
        return gson.toJson(jo);
    }
*/

}
