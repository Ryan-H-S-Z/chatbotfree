package xyz.chatbotfree.core.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import xyz.chatbotfree.core.model.ChatCompletion;
import xyz.chatbotfree.core.model.OpenAIChat;
import xyz.chatbotfree.core.service.OpenAIService;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * @author Ryan.Han
 * @date 2023-03-10 13:31
 * @since
 */
@Service
@Slf4j
public class OpenAIServiceImpl implements OpenAIService {
    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.api.key}")
    private String apiKey;

    private final OkHttpClient client = new OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public OpenAIServiceImpl() {
        log.info("OpenAIServiceImpl constructor called");
    }

    @Override
    public String chat(OpenAIChat chat)  throws IOException {
        RequestBody body = RequestBody.create(
                MediaType.parse("application/json"),
                objectMapper.writeValueAsString(chat));
        // Prepare the request headers
        Headers headers = new Headers.Builder()
                .add("Authorization", "Bearer " + apiKey)
                .add("Content-Type", "application/json")
                .build();

        // Prepare the HTTP request
        Request httpRequest = new Request.Builder()
                .url(apiUrl + "/chat/completions")
                .headers(headers)
                .post(body)
                .build();
        // Send the HTTP request and parse the response
        Response response = client.newCall(httpRequest).execute();
        String responseBody = response.body().string();
        ChatCompletion chatCompletion = new Gson().fromJson(responseBody, ChatCompletion.class);
        System.out.println("chatCompletion.getChoices()[0] = " + chatCompletion.getChoices()[0]);
        return chatCompletion.getChoices()[0].getMessage().getContent();
    }
}
