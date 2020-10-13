package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.BlogRepository;
import com.eventapp.backend.Repository.UserRepository;
import com.eventapp.backend.exception.BlogNotFoundException;
import com.eventapp.backend.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogService blogService;

    @Autowired
    private TokenService tokenService;

    public User saveUser(User user) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        user.setToken(tokenService.generateToken(user));
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String deleteUser(Integer id) throws BlogNotFoundException {

        User user = userRepository.findById(id).get();

        if (blogService.getBlogsByAuthor(user).isEmpty()) {
            System.out.println("Vim aqui");
            userRepository.deleteById(id);
            return "User removed!! " + id;
        } else {
            List<Blog> blogs = blogRepository.findBlogsByAuthor(user);
            System.out.println("Blogs:" + blogs.size());

            for (Blog blog : blogs) {

                System.out.println("blog author:" + blog.getAuthor() + "Blog id:" + blog.getId());

                User userRoot = userRepository.findById(53).get();

                System.out.println("blog author:" + blog.getAuthor() + "UserRoot id:" + userRoot.getId());

                blog.setAuthor(userRoot);

                blogService.updateBlog(blog);

                System.out.println("blog author:" + blog.getAuthor());

            }
            userRepository.deleteById(id);

            return "User " + id + " removed and posts are changed for another Author(root)";
        }

    }

    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        existingUser.setAddress(user.getAddress());
        existingUser.setCountry(user.getCountry());
        existingUser.setDate(user.getDate());
        existingUser.setEmail(user.getEmail());
        existingUser.setName(user.getName());
        // existingUser.setPassword(user.getPassword());
        existingUser.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        existingUser.setPhone(user.getPhone());
        existingUser.setUf(user.getUf());
        existingUser.setIsAdmin(user.getIsAdmin());

        return userRepository.save(existingUser);
    }
}