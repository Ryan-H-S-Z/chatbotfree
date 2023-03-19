package xyz.chatbotfree.core.model;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Ryan.Han
 * @date 2023-03-10 12:56
 * @since
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenAIMessage {
    public static final String ROLE_SYSTEM = "system";
    public static final String ROLE_USER = "user";
    public static final String ROLE_ASSISTANT = "assistant";

    @SerializedName("role")
    private String role;

    @SerializedName("content")
    private String content;

    public static OpenAIMessage generateSystemChat(String content) {
        return new OpenAIMessage(ROLE_SYSTEM, content);
    }
}
