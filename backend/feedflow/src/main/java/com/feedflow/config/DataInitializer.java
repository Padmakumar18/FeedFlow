package com.feedflow.config;

import com.feedflow.model.Post;
import com.feedflow.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

        private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

        @Autowired
        private PostRepository postRepository;

        @Override
        public void run(String... args) throws Exception {
                try {
                        // Only initialize data if the database is empty
                        long existingCount = postRepository.count();
                        logger.info("Found {} existing posts in database", existingCount);

                        if (existingCount == 0) {
                                logger.info("Initializing sample data...");
                                initializeSampleData();
                        } else {
                                logger.info("Database already contains data, skipping initialization");
                        }
                } catch (Exception e) {
                        logger.error("Error during data initialization", e);
                }
        }

        private void initializeSampleData() {
                List<Post> samplePosts = Arrays.asList(
                                createPost("https://picsum.photos/800/600?random=1",
                                                "Beautiful sunset over the mountains", 1),
                                createPost("https://picsum.photos/800/600?random=2",
                                                "Coffee and code - perfect morning combo", 2),
                                createPost("https://picsum.photos/800/600?random=3", "Weekend hiking adventure", 3),
                                createPost("https://picsum.photos/800/600?random=4", "Fresh flowers from the garden",
                                                4),
                                createPost("https://picsum.photos/800/600?random=5", "City lights at night", 5),
                                createPost("https://picsum.photos/800/600?random=6", "Delicious homemade pasta", 6),
                                createPost("https://picsum.photos/800/600?random=7", "Beach day vibes", 7),
                                createPost("https://picsum.photos/800/600?random=8", "Reading corner setup", 8),
                                createPost("https://picsum.photos/800/600?random=9", "Morning workout session", 9),
                                createPost("https://picsum.photos/800/600?random=10", "Art gallery visit", 10),
                                createPost("https://picsum.photos/800/600?random=11", "Rainy day window view", 11),
                                createPost("https://picsum.photos/800/600?random=12", "Farmers market haul", 12),
                                createPost("https://picsum.photos/800/600?random=13", "Concert night memories", 13),
                                createPost("https://picsum.photos/800/600?random=14", "Cozy fireplace evening", 14),
                                createPost("https://picsum.photos/800/600?random=15", "New recipe experiment", 15),
                                createPost("https://picsum.photos/800/600?random=16", "Park picnic setup", 16),
                                createPost("https://picsum.photos/800/600?random=17", "Late night coding session", 17),
                                createPost("https://picsum.photos/800/600?random=18", "Weekend market finds", 18),
                                createPost("https://picsum.photos/800/600?random=19", "Morning yoga routine", 19),
                                createPost("https://picsum.photos/800/600?random=20", "Bookstore adventure", 20),
                                createPost("https://picsum.photos/800/600?random=21", "Sunset photography walk", 21),
                                createPost("https://picsum.photos/800/600?random=22", "Weekend brunch special", 22),
                                createPost("https://picsum.photos/800/600?random=23", "Garden maintenance day", 23),
                                createPost("https://picsum.photos/800/600?random=24", "Movie night setup", 24),
                                createPost("https://picsum.photos/800/600?random=25", "Fresh bread baking", 25));

                postRepository.saveAll(samplePosts);
                logger.info("Sample data initialized: {} posts created", samplePosts.size());
        }

        private Post createPost(String imageUrl, String caption, int daysAgo) {
                Post post = new Post(imageUrl, caption);
                post.setCreatedAt(LocalDateTime.now().minusDays(daysAgo));
                return post;
        }
}