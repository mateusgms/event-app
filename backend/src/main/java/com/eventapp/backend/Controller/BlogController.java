package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.BlogService;
import com.eventapp.backend.Services.UserService;
import com.eventapp.backend.exception.BlogNotFoundException;
import com.eventapp.backend.exception.ExpiredTokenException;
import com.eventapp.backend.exception.InvalidLoginException;
import com.eventapp.backend.exception.InvalidTokenException;
import com.eventapp.backend.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private UserService userService;

    // CREATE
    @PostMapping("/blogs")
    public ResponseEntity<Blog> addBlog(@RequestBody Blog blog, @RequestParam("userId") int userId,
            @RequestHeader String Authorization)
            throws UserNotFoundException, InvalidLoginException, InvalidTokenException, ExpiredTokenException {
        
        User user = userService.getUserById(userId);
        blog.setAuthor(user);
        Blog blogSave = blogService.saveBlog(blog);
        return new ResponseEntity<>(blogSave, HttpStatus.OK);
    }

    // GET
    @GetMapping("/blogs")
    public ResponseEntity<List<Blog>> findAllBlogs() {
        return new ResponseEntity<>(blogService.getBlogs(), HttpStatus.OK);
    }

    @GetMapping("/blogs/id/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable int id) throws UserNotFoundException {
        return new ResponseEntity<>(blogService.getBlogById(id), HttpStatus.OK);
    }

    @GetMapping("/blogs/title")
    public ResponseEntity<Blog> getBlogByTitle(@RequestBody String title) {
        return new ResponseEntity<>(blogService.getBlogByTitle(title), HttpStatus.OK);
    }

    // List Blog by category
    @GetMapping("/blogs/author/{authorId}")
    public ResponseEntity<List<Blog>> getBlogsByAuthor(@PathVariable Integer authorId) throws UserNotFoundException {
        User user = userService.getUserById(authorId);

        List<Blog> blogs = blogService.getBlogsByAuthor(user);

        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    // PUT
    @PutMapping("/blogs")
    public ResponseEntity<Blog> updateBlog(@RequestBody Blog blog) throws BlogNotFoundException {
        return new ResponseEntity<>(blogService.updateBlog(blog), HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable int id) {
        return new ResponseEntity<>(blogService.deleteBlog(id), HttpStatus.OK);
    }
}