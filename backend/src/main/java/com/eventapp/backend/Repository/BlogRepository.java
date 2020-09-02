package com.eventapp.backend.Repository;

import com.eventapp.backend.Model.Blog;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    //Blog findBlogById(int id);
    Blog findByTitle(String title);
    //Blog findByCategory(String Category);
}