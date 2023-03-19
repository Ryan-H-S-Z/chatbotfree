package xyz.chatbotfree.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Ryan.Han
 * @date 2023-03-08 16:28
 * @since
 */
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        List<String> allowOrigins = new ArrayList<>();
        allowOrigins.add("http://localhost:3000");
        allowOrigins.add("https://www.chatbotfree.xyz");
        allowOrigins.add("https://chatbotfree.xyz");

        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedMethod("*");
        // config.addAllowedOrigin("http://localhost:3000");
        config.setAllowedOrigins(allowOrigins);
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration("/**", config);
        return new CorsFilter(configSource);
    }
}
