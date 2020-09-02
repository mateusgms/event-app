package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Repository.BlogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlogService {
    @Autowired
    private BlogRepository repository;

    public Blog saveBlog(Blog blog){
        return repository.save(blog);
    }
    
    public List<Blog> saveBlogs(List<Blog> blogs){
        return (List<Blog>) repository.saveAll(blogs);
    }
    public List<Blog> getBlogs(){
        return (List<Blog>) repository.findAll();
    }
    public Blog getBlogById(int id){
        return repository.findById(id).orElse(null);
    }
    public Blog getBlogByTitle(String title){
        return repository.findByTitle(title);
    }
    public String deleteBlog(int id){
        repository.deleteById(id);
        return "Blog removed!! " + id;
    }
    public Blog updateBlog(Blog blog){
        Blog existingBlog = repository.findById(blog.getId()).orElse(null);
        existingBlog.setAuthor(blog.getAuthor());
        existingBlog.setTitle(blog.getTitle());
        existingBlog.setSummary(blog.getSummary());
        existingBlog.setText(blog.getText());
        existingBlog.setCategory(blog.getCategory());
        existingBlog.setImageURL(blog.getImageURL());
        existingBlog.setDate(blog.getDate());

        return repository.save(existingBlog);
    }
}