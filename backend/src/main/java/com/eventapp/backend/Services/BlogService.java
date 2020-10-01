package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Controller.exception.BlogNotFoundException;
import com.eventapp.backend.Controller.exception.UserNotFoundException;
import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Model.User;
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
        return repository.saveAll(blogs);
    }
    public List<Blog> getBlogs(){
        return repository.findAll();
    }
    public Blog getBlogById(int id) throws UserNotFoundException{
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }
    public List<Blog> getBlogsByAuthor(User author){
        return repository.findBlogsByAuthor(author);
    }
    public Blog getBlogByTitle(String title){
        return repository.findByTitle(title);
    }
    public String deleteBlog(int id){
        repository.deleteById(id);
        return "Blog removed!! " + id;
    }
    public Blog updateBlog(Blog blog) throws BlogNotFoundException {

        Blog existingBlog = repository.findById(blog.getId()).orElseThrow(() -> new BlogNotFoundException(blog.getId()));

        existingBlog.setTitle(blog.getTitle());
        existingBlog.setSummary(blog.getSummary());
        existingBlog.setText(blog.getText());
        existingBlog.setCategory(blog.getCategory());
        existingBlog.setImageURL(blog.getImageURL());
        existingBlog.setDate(blog.getDate());

        return repository.save(existingBlog);
    }
}