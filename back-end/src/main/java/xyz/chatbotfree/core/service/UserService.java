package xyz.chatbotfree.core.service;

import xyz.chatbotfree.core.model.User;

/**
 * @author Ryan.Han
 * @date 2023-03-23 11:31
 * @since
 */
public interface UserService {
    User createUser(User user);
    User getUserById(Long id);
    User updateUser(Long id, User user);
    boolean deleteUser(Long id);
}
