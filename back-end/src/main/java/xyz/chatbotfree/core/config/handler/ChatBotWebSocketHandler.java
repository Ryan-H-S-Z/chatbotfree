package xyz.chatbotfree.core.config.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import xyz.chatbotfree.core.model.ChatMessage;
import xyz.chatbotfree.core.model.OpenAIChat;
import xyz.chatbotfree.core.model.OpenAIMessage;
import xyz.chatbotfree.core.service.OpenAIService;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Ryan.Han
 * @date 2023-03-10 08:58
 * @since
 */
@Slf4j
@Component
public class ChatBotWebSocketHandler extends TextWebSocketHandler {
    @Autowired
    private OpenAIService openAIService;

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final Map<String, OpenAIChat> chatCache = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sessions.put(session.getId(), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        String payload = message.getPayload();
        ObjectMapper objectMapper = new ObjectMapper();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);

        switch (chatMessage.getType()) {
            case ChatMessage.TYPE_SENT :
                feedBackMessage(session, chatMessage);
                break;
            case ChatMessage.TYPE_PRIVATE :
                sendMessageToTargetUser(session, chatMessage);
                break;
            case ChatMessage.TYPE_BROADCAST :
                feedBackMessage(session, chatMessage);
                break;
            default:
                System.out.println("none msg type = " + chatMessage.getType());
        }
    }

    private void feedBackMessage(WebSocketSession session, ChatMessage msg) throws IOException {
        if (session.isOpen()) {
            ChatMessage res = sendOpenAIMsg(session.getId(), msg);
            Gson gson = new Gson();
            session.sendMessage(new TextMessage(gson.toJson(res)));
        }
    }

    private ChatMessage sendOpenAIMsg(String sessionId, ChatMessage msg) {
        ChatMessage res = new ChatMessage();
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

            prevChat.pushNewChat(OpenAIMessage.ROLE_USER, msg.getContent());
            chat = openAIService.chat(prevChat);
            prevChat.pushNewChat(OpenAIMessage.ROLE_ASSISTANT, chat);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ChatMessage.generateReceivedChatMessage(chat);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sessions.remove(session);
    }

    private void broadcastMessage(WebSocketSession sender, ChatMessage message) throws IOException {
        for (WebSocketSession s : sessions.values()) {
            if (s.isOpen() && !s.getId().equals(sender.getId())) {
                s.sendMessage(new TextMessage(message.getContent()));
            }
        }
    }

    private void sendMessageToTargetUser(WebSocketSession sender, ChatMessage message) throws IOException {
        WebSocketSession targetSession = sessions.get(message.getTargetUser());
        for (WebSocketSession session : sessions.values()) {
            if (targetSession != null && targetSession.isOpen()) {
                targetSession.sendMessage(new TextMessage(message.getContent()));
            } else {
                String errorMessage = "User " + message.getTargetUser() + " is not online";
                session.sendMessage(new TextMessage(errorMessage));
            }
        }
    }
}
