package com.feedflow.controller;

import com.feedflow.model.Post;
import com.feedflow.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/api/posts")
    public Page<Post> getPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {

        logger.info("Fetching posts - Page: {}, Limit: {}", page, limit);

        int actualLimit = Math.min(limit, 50);
        Pageable pageable = PageRequest.of(page, actualLimit);

        Page<Post> result = postRepository.findAllByOrderByCreatedAtDesc(pageable);

        logger.info("Returning {} posts, Page {} of {}",
                result.getNumberOfElements(),
                result.getNumber() + 1,
                result.getTotalPages());

        return result;
    }
}
