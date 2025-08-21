package com.feedflow.controller;

import com.feedflow.model.Post;
import com.feedflow.service.PostService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000" })
@Validated
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    public ResponseEntity<Page<Post>> getPosts(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) @Max(50) int limit) {

        logger.info("Fetching posts - page: {}, limit: {}", page, limit);

        try {
            Page<Post> posts = postService.getPosts(page, limit);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            logger.error("Error fetching posts", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/posts/count")
    public ResponseEntity<Long> getPostCount() {
        try {
            long count = postService.getPostCount();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            logger.error("Error getting post count", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("FeedFlow API is running");
    }
}
