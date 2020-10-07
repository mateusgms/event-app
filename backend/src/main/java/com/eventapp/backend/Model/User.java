package com.eventapp.backend.Model;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USER_TBL")
public class User {
	@Id
	@GeneratedValue
	private int id;

	@NonNull
	private String name;

	@NonNull
	@Column(unique = true)
	private String email;

	@NonNull
	private String phone;

	@NonNull
	private String address;

	@NonNull
	private String uf;

	@NonNull
	private String country;

	@NonNull
	private String password;

	@NonNull
	private Date date;

	private String token;

	private Boolean isAdmin;

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

	public void setIsAdmin(Boolean isAdmin, User user) {
		if (user.isAdmin) {
			this.isAdmin = isAdmin;
		} else {
			this.isAdmin = false;
		}
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public User(@NonNull String name, @NonNull String email, @NonNull String phone, @NonNull String address,
			@NonNull String uf, @NonNull String country, @NonNull String password, @NonNull Date date) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.uf = uf;
		this.country = country;
		this.password = password;
		this.date = date;
	}

}