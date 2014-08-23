package com.vps.tools;

import com.google.gson.*;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Tool_Gson {
	public static SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	// TODO 对象被放到map里对象里面的 Calendar 不能正确解析
	public static Gson gson = new GsonBuilder().registerTypeHierarchyAdapter(Calendar.class, new Tool_Gson().new CalendarAdapter()).setDateFormat("yyyy-MM-dd HH:mm:ss").serializeNulls().create();

	public class CalendarAdapter implements JsonSerializer<Calendar>, JsonDeserializer<Calendar> {
		@Override
		public JsonElement serialize(Calendar cal, Type type, JsonSerializationContext context) {
			return new JsonPrimitive(df.format(cal.getTime()));
		}

		@Override
		public Calendar deserialize(JsonElement element, Type type, JsonDeserializationContext context) throws JsonParseException {
			Calendar cal = Calendar.getInstance();
			try {
				cal.setTime(df.parse(element.getAsJsonPrimitive().getAsString()));
			} catch (ParseException e) {
				return null;
			}
			return cal;
		}

	}

	public static void main(String[] args) {
	}
}
