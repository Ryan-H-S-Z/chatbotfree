package xyz.chatbotfree.core.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.chatbotfree.core.model.ContactMail;
import xyz.chatbotfree.core.model.Result;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * @author Ryan.Han
 * @date 2023-03-11 16:48
 * @since
 */
@RestController
@RequestMapping("/contact")
public class ContactController {

    @PostMapping("/mail")
    public Result contactMail(@RequestBody ContactMail contactMail) {
        writeToFile(contactMail.toFormattedString(), "suggestion.txt");
        return Result.success("");
    }

    public static void writeToFile(String text, String fileName) {
        BufferedWriter writer = null;
        try {
            File file = new File(fileName);
            // 如果文件不存在，则创建一个新文件
            if (!file.exists()) {
                file.createNewFile();
            }
            // 将内容追加到文件末尾
            writer = new BufferedWriter(new FileWriter(file, true));
            writer.write(text);
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
