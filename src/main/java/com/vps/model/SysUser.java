package com.vps.model;

import com.infomorrow.model.config.Configuration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Calendar;
import java.util.UUID;

/**
 * Created by noah on 14-7-28.
 */

@Entity
@Table(name = "sys_user")
public class SysUser {
    @Id
    @Column(name = "id", length = 32, unique = true, nullable = false)
    private String id = UUID.randomUUID().toString().replace("-", "");
    @Column(length = 45, unique = true, nullable = false)
    private String user_id;
    @Column(length = 30, nullable = false)
    private String real_name;
    @Column(length = 64, nullable = false)
    private String password;
    @Column(length = 200)
    private String info;
    @Column(length = 13, nullable = false)
    private String phone;
    @Column(length = 60)
    private String email;
    @Column(nullable = false)
    private Calendar create_time = Calendar.getInstance(Configuration.timezone);
    @Column(nullable = false)

    private Calendar update_time;

    public String getId() {
        return id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getReal_name() {
        return real_name;
    }

    public void setReal_name(String real_name) {
        this.real_name = real_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Calendar getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Calendar create_time) {
        this.create_time = create_time;
    }

    public Calendar getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Calendar update_time) {
        this.update_time = update_time;
    }

    public void setId(String id) {
        this.id = id;

    }
}
