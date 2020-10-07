package com.eventapp.backend.exception;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.eventapp.backend.Model.ApiError;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.WebUtils;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({ UserNotFoundException.class, ContentNotAllowedException.class, EventNotFoundException.class,
            VoucherNotFoundException.class, BlogNotFoundException.class })
    @Nullable
    public final ResponseEntity<ApiError> handleException(Exception ex, WebRequest request) {

        HttpHeaders headers = new HttpHeaders();

        LOGGER.error("Erro " + ex.getClass().getSimpleName() + " devido a " + ex.getMessage());

        if (ex instanceof UserNotFoundException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            UserNotFoundException unfe = (UserNotFoundException) ex;
            return handleUserNotFoundException(unfe, headers, status, request);
        } else if (ex instanceof ContentNotAllowedException) {
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ContentNotAllowedException cnae = (ContentNotAllowedException) ex;

            return handleContentNotAllowedException(cnae, headers, status, request);
        } else if (ex instanceof EventNotFoundException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            EventNotFoundException enfe = (EventNotFoundException) ex;

            return handleEventNotFoundException(enfe, headers, status, request);
        } else if (ex instanceof VoucherNotFoundException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            VoucherNotFoundException vnfe = (VoucherNotFoundException) ex;

            return handleVoucherNotFoundException(vnfe, headers, status, request);
        }
        if (ex instanceof BlogNotFoundException) {
            HttpStatus status = HttpStatus.NOT_FOUND;
            BlogNotFoundException vnfe = (BlogNotFoundException) ex;

            return handleBlogNotFoundException(vnfe, headers, status, request);
        } else {
            if (LOGGER.isWarnEnabled()) {
                LOGGER.warn("Erro desconhecido do tipo: " + ex.getClass().getName());
            }
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            return handleExceptionInternal(ex, null, headers, status, request);
        }

    }

    protected ResponseEntity<ApiError> handleVoucherNotFoundException(VoucherNotFoundException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        List<String> errorMessages = Collections.singletonList(ex.getMessage());
        return handleExceptionInternal(ex, new ApiError(errorMessages), headers, status, request);
    }

    protected ResponseEntity<ApiError> handleBlogNotFoundException(BlogNotFoundException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        List<String> errorMessages = Collections.singletonList(ex.getMessage());
        return handleExceptionInternal(ex, new ApiError(errorMessages), headers, status, request);
    }

    protected ResponseEntity<ApiError> handleEventNotFoundException(EventNotFoundException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        List<String> errorMessages = Collections.singletonList(ex.getMessage());
        return handleExceptionInternal(ex, new ApiError(errorMessages), headers, status, request);
    }

    protected ResponseEntity<ApiError> handleContentNotAllowedException(ContentNotAllowedException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<String> errorMessages = ex.getErrors().stream()
                .map(contentError -> contentError.getObjectName() + " " + contentError.getDefaultMessage())
                .collect(Collectors.toList());
        return handleExceptionInternal(ex, new ApiError(errorMessages), headers, status, request);
    }

    protected ResponseEntity<ApiError> handleUserNotFoundException(UserNotFoundException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        List<String> errorMessages = Collections.singletonList(ex.getMessage());
        return handleExceptionInternal(ex, new ApiError(errorMessages), headers, status, request);
    }

    protected ResponseEntity<ApiError> handleExceptionInternal(Exception ex, @Nullable ApiError body,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        if (HttpStatus.INTERNAL_SERVER_ERROR.equals(status)) {
            request.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, ex, WebRequest.SCOPE_REQUEST);
        }
        return new ResponseEntity<>(body, headers, status);
    }

}
