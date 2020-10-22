package com.eventapp.backend.Repository;

import java.util.List;

import com.eventapp.backend.Model.Post;
import com.eventapp.backend.Model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findPostsByAuthor(User author);
    Post findByTitle(String title);
    //Post findByCategory(String Category);
}