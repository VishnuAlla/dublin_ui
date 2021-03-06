/*Copyright (c) 2016-2017 imaginea.com All Rights Reserved.
 This software is the confidential and proprietary information of imaginea.com You shall not disclose such Confidential Information and shall use it only in accordance
 with the terms of the source code license agreement you entered into with imaginea.com*/
package com.guardian.dublinauth;

/*This is a Studio Managed File. DO NOT EDIT THIS FILE. Your changes may be reverted by Studio.*/

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * UserRoleMapping generated by WaveMaker Studio.
 */
@Entity
@Table(name = "`UserRoleMapping`")
public class UserRoleMapping implements Serializable {

    private String userRoleMappingId;
    private String roleId;
    private String userId;
    private Role role;
    private User user;

    @Id
    @Column(name = "`UserRoleMappingId`", nullable = false, length = 36)
    public String getUserRoleMappingId() {
        return this.userRoleMappingId;
    }

    public void setUserRoleMappingId(String userRoleMappingId) {
        this.userRoleMappingId = userRoleMappingId;
    }

    @Column(name = "`RoleId`", nullable = false, length = 36)
    public String getRoleId() {
        return this.roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Column(name = "`UserId`", nullable = false, length = 36)
    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "`RoleId`", referencedColumnName = "`RoleId`", insertable = false, updatable = false)
    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        if(role != null) {
            this.roleId = role.getRoleId();
        }

        this.role = role;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "`UserId`", referencedColumnName = "`UserId`", insertable = false, updatable = false)
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        if(user != null) {
            this.userId = user.getUserId();
        }

        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserRoleMapping)) return false;
        final UserRoleMapping userRoleMapping = (UserRoleMapping) o;
        return Objects.equals(getUserRoleMappingId(), userRoleMapping.getUserRoleMappingId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserRoleMappingId());
    }
}

