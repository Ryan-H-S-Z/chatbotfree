package xyz.chatbotfree.core.utils;

import org.springframework.beans.BeanUtils;

/**
 * @author Ryan.Han
 * @date 2023-03-23 11:41
 * @since
 */
public class ObjectUtils {
    public static void copyPropertiesIgnoreIdAndCreateTime(Object source, Object target) {
        BeanUtils.copyProperties(source, target, "id", "createTime");
    }
}
