package xyz.chatbotfree.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    public static final String TYPE_BROADCAST = "broadcast";
    public static final String TYPE_SENT = "sent";
    public static final String TYPE_PRIVATE = "private";
    public static final String TYPE_RECEIVED = "received";


    private String type;
    private String content;
    private String targetUser;
    private long timestamp;

    public static ChatMessage generateReceivedChatMessage(String content) {
        return new ChatMessage(TYPE_RECEIVED, content, "", System.currentTimeMillis());
    }
}
