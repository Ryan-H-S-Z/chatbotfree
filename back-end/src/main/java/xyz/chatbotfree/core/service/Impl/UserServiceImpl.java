package xyz.chatbotfree.core.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.chatbotfree.core.model.User;
import xyz.chatbotfree.core.repository.UserRepository;
import xyz.chatbotfree.core.service.UserService;
import xyz.chatbotfree.core.utils.ObjectUtils;

import java.util.Optional;

/**
 * @author Ryan.Han
 * @date 2023-03-23 11:32
 * @since
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return null;
        }
        ObjectUtils.copyPropertiesIgnoreIdAndCreateTime(user, existingUser);
        return userRepository.save(existingUser);
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
