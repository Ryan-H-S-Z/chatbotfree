package xyz.chatbotfree.core.service;


import xyz.chatbotfree.core.model.OpenAIChat;

import java.io.IOException;

/**
 * @author Ryan.Han
 * @date 2023-03-10 13:30
 * @since
 */
public interface OpenAIService {
    String chat(OpenAIChat chat) throws IOException;
}
