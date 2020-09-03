package com.eventapp.backend.Model;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BLOG_TBL")
public class Blog {
	@Id
	@GeneratedValue
	private int id;
	@ManyToOne
	@JoinColumn(name = "user_id")
    private User author;
    private String title;
    private String summary;
    private String text;
    private String category;
    private String imageURL;
    private Date date;

    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {

		this.date = date;
	}
}