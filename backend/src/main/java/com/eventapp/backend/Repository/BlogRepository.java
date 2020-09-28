package com.eventapp.backend.Repository;

import java.util.List;

import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

    List<Blog> findBlogsByAuthor(User author);
    Blog findByTitle(String title);
    //Blog findByCategory(String Category);
}