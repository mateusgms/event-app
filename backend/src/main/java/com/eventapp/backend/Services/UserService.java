package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Controller.BlogController;
import com.eventapp.backend.Model.Blog;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.BlogRepository;
import com.eventapp.backend.Repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogController blogController;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogService blogService;

    public User saveUser(User user){
        return userRepository.save(user);
    }
    
    public List<User> saveUsers(List<User> users){
        return userRepository.saveAll(users);
    }
    public List<User> getUsers(){
        return userRepository.findAll();
    }
    public User getUserById(int id){
        return userRepository.findById(id).orElse(null);
    }
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
    public String deleteUser(Integer id){

        if(blogController.getBlogsByAuthor(id).isEmpty()){

            System.out.println("Vim aqui");

            userRepository.deleteById(id);

            return "User removed!! " + id;

        } else{
            
            User user = userRepository.findById(id).get();

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

            return "User " + id +" removed and posts are changed for another Author(root)";
        }
        
    }
    public User updateUser(User user){
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        existingUser.setAddress(user.getAddress());
        existingUser.setCountry(user.getCountry());
        existingUser.setDate(user.getDate());
        existingUser.setEmail(user.getEmail());
        existingUser.setName(user.getName());
        existingUser.setPassword(user.getPassword());
        existingUser.setPhone(user.getPhone());
        existingUser.setUf(user.getUf());
        existingUser.setIsAdmin(user.getIsAdmin());

        return userRepository.save(existingUser);
    }
}