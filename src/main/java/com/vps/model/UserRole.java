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
@Table(name = "user_role")
public class UserRole {
    @Id
    @Column(name = "id", length = 38, unique = true, nullable = false)
    private String id = UUID.randomUUID().toString().replace("-", "");
    @Column(length = 38, nullable = false)
    private String user_id;
    @Column(length = 38, nullable = false)
    private String role_name;

    public String getRole_name() {
        return role_name;
    }

    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
