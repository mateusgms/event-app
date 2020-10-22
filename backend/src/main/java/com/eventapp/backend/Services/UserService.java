package com.eventapp.backend.Services;

import java.util.List;

import com.eventapp.backend.Model.Post;
import com.eventapp.backend.Model.User;
import com.eventapp.backend.Repository.PostRepository;
import com.eventapp.backend.Repository.UserRepository;
import com.eventapp.backend.exception.PostNotFoundException;
import com.eventapp.backend.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

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

    public String deleteUser(Integer id) throws PostNotFoundException {

        User user = userRepository.findById(id).get();

        if (postService.getPostsByAuthor(user).isEmpty()) {
            System.out.println("Vim aqui");
            userRepository.deleteById(id);
            return "User removed!! " + id;
        } else {
            List<Post> posts = postRepository.findPostsByAuthor(user);
            System.out.println("Posts:" + posts.size());

            for (Post post : posts) {

                System.out.println("post author:" + post.getAuthor() + "Post id:" + post.getId());

                User userRoot = userRepository.findById(53).get();

                System.out.println("post author:" + post.getAuthor() + "UserRoot id:" + userRoot.getId());

                post.setAuthor(userRoot);

                postService.updatePost(post);

                System.out.println("post author:" + post.getAuthor());

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