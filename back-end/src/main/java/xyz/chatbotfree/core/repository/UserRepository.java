package xyz.chatbotfree.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.chatbotfree.core.model.User;

import java.util.List;

/**
 * @author Ryan.Han
 * @date 2023-03-23 11:33
 * @since
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findByFullNameContains(String fullName);

}
