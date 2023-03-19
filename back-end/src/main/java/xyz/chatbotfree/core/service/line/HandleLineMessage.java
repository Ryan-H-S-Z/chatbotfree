package xyz.chatbotfree.core.service.line;

import com.linecorp.bot.model.event.Event;
import com.linecorp.bot.model.event.MessageEvent;
import com.linecorp.bot.model.event.message.TextMessageContent;
import com.linecorp.bot.model.message.Message;
import com.linecorp.bot.model.message.TextMessage;
import com.linecorp.bot.spring.boot.annotation.EventMapping;
import com.linecorp.bot.spring.boot.annotation.LineMessageHandler;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.chatbotfree.core.model.ChatMessage;
import xyz.chatbotfree.core.model.OpenAIChat;
import xyz.chatbotfree.core.model.OpenAIMessage;
import xyz.chatbotfree.core.service.OpenAIService;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Ryan.Han
 * @date 2023-03-12 17:32
 * @since
 */
@LineMessageHandler
public class HandleLineMessage {
    @Autowired
    private OpenAIService openAIService;
    private final Map<String, OpenAIChat> chatCache = new ConcurrentHashMap<>();


    @EventMapping
    public Message handleTextMessageEvent(MessageEvent<TextMessageContent> event) {
        final String originalMessageText = event.getMessage().getText();
        String userId = event.getSource().getUserId();
        ChatMessage res = sendOpenAIMsg(userId, originalMessageText);
        return new TextMessage(res.getContent());
    }

    @EventMapping
    public void handleDefaultMessageEvent(Event event) {
        System.out.println("event: " + event);
    }

    private ChatMessage sendOpenAIMsg(String sessionId, String msg) {
        OpenAIChat prevChat;
        String chat = "ops. something wrong....";
        if (chatCache.containsKey(sessionId)) {
            prevChat = chatCache.get(sessionId);
        } else {
            prevChat = new OpenAIChat();
            prevChat.generateDefaultMessages("You are a helpful assistant.");
            prevChat.setUser(sessionId);
            chatCache.put(sessionId, prevChat);
        }
        try {
            prevChat.pushNewChat(OpenAIMessage.ROLE_USER, msg);
            chat = openAIService.chat(prevChat);
            prevChat.pushNewChat(OpenAIMessage.ROLE_ASSISTANT, chat);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ChatMessage.generateReceivedChatMessage(chat);
    }
}
