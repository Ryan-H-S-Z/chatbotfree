package xyz.chatbotfree.core.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor(staticName = "of")
public class Result<T> {
  private final int statusCode;
  private final T data;
  private final String error;

  public static <T> Result<T> success(T data) {
    return new Result<>(200, data, null);
  }

  public static <T> Result<T> failure(int statusCode, String error) {
    return new Result<>(statusCode, null, error);
  }

  public boolean isSuccess() {
    return statusCode >= 200 && statusCode < 300;
  }
}
