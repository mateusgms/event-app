package com.eventapp.backend.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "VOUCHER_TBL")
public class Voucher {
    
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name ="event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    private int quantity;

    private boolean available;

    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
    
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
    }
    
    public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean getAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}

}
