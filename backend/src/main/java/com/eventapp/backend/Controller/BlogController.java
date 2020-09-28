package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.BlogRepository;
import com.eventapp.backend.Repository.UserRepository;
import com.eventapp.backend.Services.BlogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
public class BlogController {


    @Autowired
    private BlogService blogService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    // CREATE
    @PostMapping("/blogs")
    public Blog addBlog(@RequestBody Blog blog, @RequestParam("userId") int userId) {
        try {
            User user = userRepository.findById(userId).get();
            blog.setAuthor(user);
            Blog blogSave = blogService.saveBlog(blog);
            return blogSave;
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
       
    }

    // GET
    @GetMapping("/blogs")
    public List<Blog> findAllBlogs() {
        return blogService.getBlogs();
    }
    @GetMapping("/blogs/id/{id}")
    public Blog getBlogById(@PathVariable int id) {
        return blogService.getBlogById(id);
    }
    @GetMapping("/blogs/title/{title}")
    public Blog getBlogByTitle(@PathVariable String title) {
        return blogService.getBlogByTitle(title);
    }
    //List Blog by category
    @GetMapping("/blogs/author/{authorId}")
    public List<Blog> getBlogsByAuthor(@PathVariable Integer authorId) {
        User user = userRepository.findById(authorId).get();
        List<Blog> blogs = blogRepository.findBlogsByAuthor(user);
        return blogs;
    }
    // PUT
    @PutMapping("/blogs")
    public Blog updateBlog(@RequestBody Blog blog) {
        return blogService.updateBlog(blog);
    }

    // DELETE
    @DeleteMapping("/blogs/{id}")
    public String deleteBlog(@PathVariable int id) {
        return blogService.deleteBlog(id);
    }
}