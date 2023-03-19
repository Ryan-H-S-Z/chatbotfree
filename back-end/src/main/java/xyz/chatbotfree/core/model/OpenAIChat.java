package xyz.chatbotfree.core.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenAIChat {
    @NonNull
    @JsonProperty("model")
    private String model = "gpt-3.5-turbo";

    @JsonProperty("messages")
    private List<OpenAIMessage> messages = new ArrayList<>();

    @JsonProperty("temperature")
    private Float temperature = 1f;

    /**
     * 最大为4096， 单词数
     * 输入和输出都计数。也就说 如果我发送使用了10个，那接收就需要20个
     * */
    @JsonProperty("max_tokens")
    private Integer maxTokens = 2048;

    /**
     * 与 temperature 不可同时修改，表示回答准确率。
     * */
    @JsonProperty("top_p")
    private Integer topP = 1;

    @JsonProperty("n")
    private Integer n = 1;

    @JsonProperty("stream")
    private boolean stream = false;

    @JsonProperty("stop")
    private String stop = "";

    @JsonProperty("user")
    private String user;

    public void generateDefaultMessages(String systemRoleContent) {
        if (!ObjectUtils.isEmpty(systemRoleContent)) {
            this.messages.add(0, OpenAIMessage.generateSystemChat(systemRoleContent));
        }
    }

    public void pushNewChat(String role, String content) {
        if (this.messages.size() >= 12) {
            List<OpenAIMessage> remove = this.messages.subList(1, 6);
            this.messages.removeAll(remove);
        }
        this.messages.add(new OpenAIMessage(role, content));
    }
}
