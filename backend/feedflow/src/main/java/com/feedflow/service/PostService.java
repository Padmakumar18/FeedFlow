package com.feedflow.service;

import com.feedflow.model.Post;
import com.feedflow.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository postRepository;

    public Page<Post> getPosts(int page, int limit) {
        logger.debug("Fetching posts - page: {}, limit: {}", page, limit);

        Pageable pageable = PageRequest.of(page, limit);
        Page<Post> posts = postRepository.findAllByOrderByCreatedAtDesc(pageable);

        logger.debug("Found {} posts on page {}", posts.getNumberOfElements(), page);
        return posts;
    }

    public long getPostCount() {
        return postRepository.countPosts();
    }

    @Transactional
    public Post createPost(Post post) {
        logger.info("Creating new post with caption: {}", post.getCaption());
        return postRepository.save(post);
    }
}