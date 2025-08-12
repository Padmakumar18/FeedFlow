package com.feedflow.config;

import com.feedflow.model.Post;
import com.feedflow.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PostRepository postRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize data if the database is empty
        if (postRepository.count() == 0) {
            List<Post> samplePosts = Arrays.asList(
                    createPost("https://picsum.photos/800/600?random=1", "Beautiful sunset over the mountains",
                            LocalDateTime.now().minusDays(1)),
                    createPost("https://picsum.photos/800/600?random=2", "Coffee and code - perfect morning combo",
                            LocalDateTime.now().minusDays(2)),
                    createPost("https://picsum.photos/800/600?random=3", "Weekend hiking adventure",
                            LocalDateTime.now().minusDays(3)),
                    createPost("https://picsum.photos/800/600?random=4", "Fresh flowers from the garden",
                            LocalDateTime.now().minusDays(4)),
                    createPost("https://picsum.photos/800/600?random=5", "City lights at night",
                            LocalDateTime.now().minusDays(5)),
                    createPost("https://picsum.photos/800/600?random=6", "Delicious homemade pasta",
                            LocalDateTime.now().minusDays(6)),
                    createPost("https://picsum.photos/800/600?random=7", "Beach day vibes",
                            LocalDateTime.now().minusDays(7)),
                    createPost("https://picsum.photos/800/600?random=8", "Reading corner setup",
                            LocalDateTime.now().minusDays(8)),
                    createPost("https://picsum.photos/800/600?random=9", "Morning workout session",
                            LocalDateTime.now().minusDays(9)),
                    createPost("https://picsum.photos/800/600?random=10", "Art gallery visit",
                            LocalDateTime.now().minusDays(10)),
                    createPost("https://picsum.photos/800/600?random=11", "Rainy day window view",
                            LocalDateTime.now().minusDays(11)),
                    createPost("https://picsum.photos/800/600?random=12", "Farmers market haul",
                            LocalDateTime.now().minusDays(12)),
                    createPost("https://picsum.photos/800/600?random=13", "Concert night memories",
                            LocalDateTime.now().minusDays(13)),
                    createPost("https://picsum.photos/800/600?random=14", "Cozy fireplace evening",
                            LocalDateTime.now().minusDays(14)),
                    createPost("https://picsum.photos/800/600?random=15", "New recipe experiment",
                            LocalDateTime.now().minusDays(15)),
                    createPost("https://picsum.photos/800/600?random=16", "Park picnic setup",
                            LocalDateTime.now().minusDays(16)),
                    createPost("https://picsum.photos/800/600?random=17", "Late night coding session",
                            LocalDateTime.now().minusDays(17)),
                    createPost("https://picsum.photos/800/600?random=18", "Weekend market finds",
                            LocalDateTime.now().minusDays(18)),
                    createPost("https://picsum.photos/800/600?random=19", "Morning yoga routine",
                            LocalDateTime.now().minusDays(19)),
                    createPost("https://picsum.photos/800/600?random=20", "Bookstore adventure",
                            LocalDateTime.now().minusDays(20)),
                    createPost("https://picsum.photos/800/600?random=21", "Sunset photography walk",
                            LocalDateTime.now().minusDays(21)),
                    createPost("https://picsum.photos/800/600?random=22", "Weekend brunch special",
                            LocalDateTime.now().minusDays(22)),
                    createPost("https://picsum.photos/800/600?random=23", "Garden maintenance day",
                            LocalDateTime.now().minusDays(23)),
                    createPost("https://picsum.photos/800/600?random=24", "Movie night setup",
                            LocalDateTime.now().minusDays(24)),
                    createPost("https://picsum.photos/800/600?random=25", "Fresh bread baking",
                            LocalDateTime.now().minusDays(25)));

            postRepository.saveAll(samplePosts);
            System.out.println("Sample data initialized: " + samplePosts.size() + " posts created");
        }
    }

    private Post createPost(String imageUrl, String caption, LocalDateTime createdAt) {
        Post post = new Post();
        post.setImageUrl(imageUrl);
        post.setCaption(caption);
        post.setCreatedAt(createdAt);
        return post;
    }
}