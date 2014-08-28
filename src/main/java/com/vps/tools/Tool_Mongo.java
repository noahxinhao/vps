package com.vps.tools;

import com.mongodb.*;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.Calendar;
import java.util.Date;
import java.util.Properties;

public class Tool_Mongo {
	private static Logger logger = Logger.getLogger(Tool_Mongo.class.getName());
	private static MongoClient db_conn_apply = null;

	// mongo db 配置
	public static final Properties mongodb_properties = new Properties();

	public static void init_mongodb_pool() throws IOException {
		try (InputStream resourceAsStream = Tool_Mongo.class.getResourceAsStream("/mongodb.properties");//
		) {
			mongodb_properties.load(resourceAsStream);
		}
		get_mongo_db();
	}

	/**
	 * 
	 * @return 获取apply中的db
	 * @throws NumberFormatException
	 * @throws java.net.UnknownHostException
	 */
	public static DB get_mongo_db() throws NumberFormatException, UnknownHostException {
		/*String db = mongodb_properties.getProperty("mongo.db.vps.name");
		if (db_conn_apply == null) {
			String ip = mongodb_properties.getProperty("mongo.db.vps.ip");
			String port = mongodb_properties.getProperty("mongo.db.vps.port");
			String uname = mongodb_properties.getProperty("mongo.db.vps.username");
			String pwd = mongodb_properties.getProperty("mongo.db.vps.passwd");

			logger.info("#创建 mongodb 连接池");
			db_conn_apply = new MongoClient(ip, Integer.valueOf(port));
		}
		return db_conn_apply.getDB(db);*/
        String dbname = mongodb_properties.getProperty("mongo.db.vps.name");
        String ip = mongodb_properties.getProperty("mongo.db.vps.ip");
        String port = mongodb_properties.getProperty("mongo.db.vps.port");
        String uname = mongodb_properties.getProperty("mongo.db.vps.username");
        String pwd = mongodb_properties.getProperty("mongo.db.vps.passwd");
        Mongo mg = new Mongo(ip,Integer.parseInt(port));
        DB db = mg.getDB("admin");
        boolean ok = db.authenticate(uname,pwd.toCharArray());
        if(ok){
            return mg.getDB(dbname);
        }
        return null;
        //return db;
	}

	/**
	 * 
	 * @return 获取apply的dbCollection
	 * @throws Exception
	 */

	public static DBCollection get_mongo_collection() throws Exception {
		String collection = mongodb_properties.getProperty("mongo.db.vps.collection");
		return get_mongo_db().getCollection(collection);
	}

	@SuppressWarnings("deprecation")
	public static void main(String[] args) throws Exception {
		init_mongodb_pool();
		DBCollection collection = get_mongo_collection();
		/*
		 * applyDbObject.put("_id", new ObjectId("5326bfc0e6f780b21635248f"));
		 * applyDbObject.put("user_id", "27065716000903"); List<DBObject> dbList
		 * = collection.find(applyDbObject).toArray();
		 * System.out.println("dbList:" + dbList); BasicDBList values = new
		 * BasicDBList(); values.add("INTERFACE"); values.add("BROWSER");
		 * values.add("HOMEED"); applyDbObject.put("sender", new
		 * BasicDBObject("$in", values));
		 * System.out.println(collection.count(applyDbObject));
		 */
		// BasicDBObject basicDBObject = new BasicDBObject("level","ERROR");
		// System.out.println(collection.count(basicDBObject.append("website",
		// "alipay")));;
		// System.out.println(collection.count(basicDBObject.append("website",
		// "taobao")));;
		// System.out.println(collection.count(basicDBObject.append("website",
		// "dangdang")));;
		// 创建索引
		// BasicDBObject obj = new BasicDBObject();
		// obj.put("create_time", -1);
		// collection.ensureIndex(obj);
		// // 查询索引,遍历索引
		// List<DBObject> list = collection.getIndexInfo();
		// for (DBObject o : list) {
		// System.out.println("\t" + o);
		// }
		// not equal 非操作
		// BasicDBObject basicDBObject = new BasicDBObject("level","INFO");
		// System.out.println(collection.count(basicDBObject.append("status",
		// new BasicDBObject("$ne", Status.已完成.name()))));

		// 日期，查找一个月之前的数据
		Calendar calendar = Calendar.getInstance();
		Date date = new Date();
		date.setMonth(new Date().getMonth() - 1);
		calendar.setTime(date);
		BasicDBObject dbObject = new BasicDBObject();
		dbObject.put("token", "b3l5e0hwkfjlqs");
		System.out.println(collection.count(dbObject));
	}
}