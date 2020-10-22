package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Post;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.PostRepository;
import com.eventapp.backend.exception.PostNotFoundException;
import com.eventapp.backend.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    private PostRepository repository;

    public Post savePost(Post post) {
        return repository.save(post);
    }

    public List<Post> savePosts(List<Post> posts) {
        return repository.saveAll(posts);
    }

    public List<Post> getPosts() {
        return repository.findAll();
    }

    public Post getPostById(int id) throws UserNotFoundException {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public List<Post> getPostsByAuthor(User author) {
        return repository.findPostsByAuthor(author);
    }

    public Post getPostByTitle(String title) {
        return repository.findByTitle(title);
    }

    public String deletePost(int id) {
        repository.deleteById(id);
        return "Post removed!! " + id;
    }

    public Post updatePost(Post post) throws PostNotFoundException {

        Post existingPost = repository.findById(post.getId())
                .orElseThrow(() -> new PostNotFoundException(post.getId()));

        existingPost.setTitle(post.getTitle());
        existingPost.setSummary(post.getSummary());
        existingPost.setText(post.getText());
        existingPost.setCategory(post.getCategory());
        existingPost.setImageURL(post.getImageURL());
        existingPost.setDate(post.getDate());

        return repository.save(existingPost);
    }
}