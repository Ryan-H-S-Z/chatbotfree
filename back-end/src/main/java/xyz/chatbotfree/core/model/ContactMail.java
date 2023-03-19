package xyz.chatbotfree.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Ryan.Han
 * @date 2023-03-11 16:49
 * @since
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMail {
    private String email;
    private String suggestion;
    private long timestamp;

    public String toFormattedString() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(timestamp);
        String formattedTimestamp = dateFormat.format(date);

        return formattedTimestamp + "\t" + email + "\t" + suggestion;
    }
}
