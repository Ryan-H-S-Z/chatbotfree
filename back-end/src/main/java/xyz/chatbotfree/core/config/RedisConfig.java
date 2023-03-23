package xyz.chatbotfree.core.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * @author Ryan.Han
 * @date 2023-03-19 11:36
 * @since
 */
@Configuration
@EnableCaching
public class RedisConfig {
    @Autowired
    RedisConnectionFactory redisConnectionFactory;

    @Bean
    public RedisTemplate<Object, Object> redisTemplate() {
        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // 配置序列化方式
        RedisSerializer<String> stringRedisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = generateJackson2JsonRedisSerializer();
        // 配置 RedisTemplate 序列化方式
        redisTemplate.setKeySerializer(stringRedisSerializer);
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashKeySerializer(stringRedisSerializer);
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    /**
     * ConcurrentMapCacheManager
     * ConcurrentMapCacheManager 是 Spring 自带的缓存管理器实现类，适合用于小型系统或者测试环境，它使用 ConcurrentHashMap 作为缓存容器，将缓存数据存储在应用程序的内存中。这种实现简单易用，但是它不支持分布式环境，也没有过期时间的设置。
     * <p>
     * RedisCacheManager
     * RedisCacheManager 是 Redis 官方提供的 Spring Cache 实现类，它使用 Redis 作为缓存容器，将缓存数据存储在 Redis 数据库中。RedisCacheManager 支持分布式环境，具有较好的可靠性和扩展性。它可以通过 RedisTemplate 来配置连接 Redis 数据库的参数，也可以通过 CacheConfig 来配置缓存的参数。
     * <p>
     * EhCacheCacheManager
     * EhCacheCacheManager 是 Ehcache 的 Spring Cache 实现类，它使用 Ehcache 作为缓存容器，将缓存数据存储在 JVM 中。EhCacheCacheManager 支持分布式环境，具有很好的性能和可扩展性，也支持缓存的过期时间、最大缓存数等参数的配置。
     * <p>
     * CaffeineCacheManager
     * CaffeineCacheManager 是基于 Caffeine 实现的 Spring Cache 实现类，它使用 Caffeine 作为缓存容器，将缓存数据存储在应用程序的内存中。CaffeineCacheManager 具有高效的缓存算法和并发性能，同时支持缓存的过期时间、最大缓存数等参数的配置。它适合用于需要快速存取数据的场景。
     */
    @Bean
    public CacheManager cacheManager() {
        // 配置RedisCacheConfiguration
        RedisSerializer<String> stringRedisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = generateJackson2JsonRedisSerializer();
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .disableCachingNullValues()
                .prefixCacheNameWith("cbf_")
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(stringRedisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer));

        // 创建RedisCacheManager
        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(redisCacheConfiguration)
                .build();
    }

    private Jackson2JsonRedisSerializer<Object> generateJackson2JsonRedisSerializer() {
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
        return jackson2JsonRedisSerializer;
    }

}

