package com.eventapp.backend.Controller;

import java.util.List;

import com.eventapp.backend.Model.Post;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Services.PostService;
import com.eventapp.backend.Services.UserService;
import com.eventapp.backend.exception.PostNotFoundException;
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
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    // CREATE
    @PostMapping("/posts")
    public ResponseEntity<Post> addPost(@RequestBody Post post, @RequestParam("userId") int userId,
            @RequestHeader String Authorization)
            throws UserNotFoundException, InvalidLoginException, InvalidTokenException, ExpiredTokenException {

        User user = userService.getUserById(userId);
        post.setAuthor(user);
        Post postSave = postService.savePost(post);
        return new ResponseEntity<>(postSave, HttpStatus.OK);
    }

    // GET
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> findAllPosts() {
        return new ResponseEntity<>(postService.getPosts(), HttpStatus.OK);
    }

    @GetMapping("/posts/id/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id) throws UserNotFoundException {
        return new ResponseEntity<>(postService.getPostById(id), HttpStatus.OK);
    }

    @GetMapping("/posts/title")
    public ResponseEntity<Post> getPostByTitle(@RequestBody String title) {
        return new ResponseEntity<>(postService.getPostByTitle(title), HttpStatus.OK);
    }

    // List Post by category
    @GetMapping("/posts/author/{authorId}")
    public ResponseEntity<List<Post>> getPostsByAuthor(@PathVariable Integer authorId) throws UserNotFoundException {
        User user = userService.getUserById(authorId);

        List<Post> posts = postService.getPostsByAuthor(user);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // PUT
    @PutMapping("/posts")
    public ResponseEntity<Post> updatePost(@RequestBody Post post) throws PostNotFoundException {
        return new ResponseEntity<>(postService.updatePost(post), HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<String> deletePost(@PathVariable int id) {
        return new ResponseEntity<>(postService.deletePost(id), HttpStatus.OK);
    }
}