package xyz.chatbotfree.core.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.chatbotfree.core.model.Result;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Ryan.Han
 * @date 2023-03-08 14:36
 * @since
 */
@RestController
@RequestMapping("/apiF")
public class ApiNavigationController {

    @PostMapping
    public Result<String> index() {
        return Result.success("ok");
    }

    @PostMapping("/navigation")
    public Result<List<NavigationButton>> getNavigationButtons() {
        List<NavigationButton> navigationButtons = new ArrayList<>();
        navigationButtons.add(new NavigationButton(1, "Home", "/"));
        navigationButtons.add(new NavigationButton(2, "About", "/about"));
        navigationButtons.add(new NavigationButton(3, "Contact", "/contact"));
        return Result.success(navigationButtons);
    }

    @Data
    @AllArgsConstructor
    private static class NavigationButton {
        private int id;
        private String label;
        private String url;
    }
}
