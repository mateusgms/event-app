package com.eventapp.backend.dto;

import java.util.Date;

public class UserResponserDTO {

    private int id;

    private String name;

    private String email;

    private String phone;

    private String address;

    private String uf;

    private String country;

    private String password;

    private Date date;

    private Boolean isAdmin;
    
    public UserResponserDTO(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public UserResponserDTO(int id, String name, String email, String phone, String address, String uf, String country,
            String password, Date date, Boolean isAdmin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.uf = uf;
        this.country = country;
        this.password = password;
        this.date = date;
        this.isAdmin = isAdmin;
    }

	public UserResponserDTO(String name2, String email2, String password2, String address2, String country2, Date date2,
			Boolean isAdmin2, String uf2, String phone2) {
	}


}
