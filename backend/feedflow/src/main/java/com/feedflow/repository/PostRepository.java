package com.feedflow.repository;

import com.feedflow.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // More efficient method that doesn't count total elements
    Slice<Post> findSliceByOrderByCreatedAtDesc(Pageable pageable);

    // Custom query to optimize performance
    @Query("SELECT p FROM Post p ORDER BY p.createdAt DESC")
    Slice<Post> findPostsSlice(Pageable pageable);
}
