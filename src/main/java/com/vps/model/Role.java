package com.vps.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

/**
 * Created by noah on 14-8-15.
 */
@Entity
@Table(name = "role")
public class Role {
    public static String 普通用户="ROLE_USER";
    public static String 管理员="ROLE_ADMIN";
    @Id
    @Column(name = "id", length = 11)
    private int id;
    @Column(length = 45, nullable = false)
    private String name;
    @Column(length = 200, nullable = false)
    private String info;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
