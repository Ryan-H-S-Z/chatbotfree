package xyz.chatbotfree.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.chatbotfree.core.model.base.BaseSerializable;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * @author Ryan.Han
 * @date 2023-03-23 10:53
 * @since
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class User extends BaseSerializable {

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String fullName;
}
