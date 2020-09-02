package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Support;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.SupportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportService {
    @Autowired
    private SupportRepository repository;

    public Support saveSupport(Support support){
        return repository.save(support);
    }
    
    public List<Support> saveSupports(List<Support> supports){
        return (List<Support>) repository.saveAll(supports);
    }
    public List<Support> getSupports(){
        return (List<Support>) repository.findAll();
    }
    public Support getSupportById(int id){
        return repository.findById(id).orElse(null);
    }
    /*public Support getSupportByUser(User user){
        return repository.findByUser(user);
    }*/
    public String deleteSupport(int id){
        repository.deleteById(id);
        return "Support removed!! " + id;
    }
    public Support updateSupport(Support support){
        Support existingSupport = repository.findById(support.getId()).orElse(null);
        existingSupport.setUser(support.getUser());
        existingSupport.setText(support.getText());
        existingSupport.setCategory(support.getCategory());
        existingSupport.setDate(support.getDate());

        return repository.save(existingSupport);
    }
}