package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Services.BlogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class BlogController {


    @Autowired
    private BlogService service;

    // CREATE
    @PostMapping("/addBlog")
    public Blog addBlog(@RequestBody Blog blog) {
        return service.saveBlog(blog);
    }
    @PostMapping("/addBlogs")
    public List<Blog> addBlogs(@RequestBody List<Blog> blogs) {
        return service.saveBlogs(blogs);
    }

    // GET
    @GetMapping("/blogs")
    public List<Blog> findAllBlogs() {
        return service.getBlogs();
    }
    @GetMapping("/blogById/{id}")
    public Blog findBlogById(@PathVariable int id) {
        return service.getBlogById(id);
    }
    @GetMapping("/blog/{title}")
    public Blog findBlogByTitle(@PathVariable String title) {
        return service.getBlogByTitle(title);
    }
    //List Blog by category

    // PUT
    @PutMapping("/updateBlog")
    public Blog updateBlog(@RequestBody Blog blog) {
        return service.updateBlog(blog);
    }

    // DELETE
    @DeleteMapping("/deleteBlog/{id}")
    public String deleteBlog(@PathVariable int id) {
        return service.deleteBlog(id);
    }
}