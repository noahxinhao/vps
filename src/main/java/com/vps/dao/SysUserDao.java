package com.vps.dao;

import com.vps.model.SysUser;
import com.vps.tools.Tool_Hibernate;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 * Created by noah on 14-8-15.
 */
@Repository
public class SysUserDao {
    public SysUser get_user_by_account(String account){
        SysUser sysUser = null;
        Session session = Tool_Hibernate.getCurrentSession();
        Transaction beginTransaction = session.beginTransaction();
        Criteria criteria = session.createCriteria(SysUser.class);
        criteria.add(Restrictions.eq("account", account));
        Object uniqueResult = criteria.uniqueResult();
        if (uniqueResult != null) {
            sysUser = (SysUser) uniqueResult;
        }
        beginTransaction.commit();
        return sysUser;
    }

    public SysUser get_user_by_user_id(String uid){
        SysUser sysUser = null;
        Session session = Tool_Hibernate.getCurrentSession();
        Transaction beginTransaction = session.beginTransaction();
        Criteria criteria = session.createCriteria(SysUser.class);
        criteria.add(Restrictions.eq("user_id", uid));
        Object uniqueResult = criteria.uniqueResult();
        if (uniqueResult != null) {
            sysUser = (SysUser) uniqueResult;
        }
        beginTransaction.commit();
        return sysUser;
    }

    public SysUser verifyAccountByEmail(String account,String token){
        SysUser sysUser = null;
        Session session = Tool_Hibernate.getCurrentSession();
        Transaction beginTransaction = session.beginTransaction();
        Criteria criteria = session.createCriteria(SysUser.class);
        criteria.add(Restrictions.eq("email", account));
        criteria.add(Restrictions.eq("verifyToken", token));
        Object uniqueResult = criteria.uniqueResult();
        if (uniqueResult != null) {
            sysUser = (SysUser) uniqueResult;
        }
        beginTransaction.commit();
        return sysUser;
    }
}
