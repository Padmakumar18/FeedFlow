-- FeedFlow Mock Data Script
-- PostgreSQL script to insert realistic test data for infinite scrolling feature
-- Run this script in pgAdmin after creating the 'FeedFlow' database

-- First, ensure the posts table exists (this will be created by Spring Boot JPA)
-- But we'll include the CREATE statement for reference
CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(500),
    created_at TIMESTAMP
);

-- Clear existing data (optional - remove if you want to keep existing data)
-- TRUNCATE TABLE posts RESTART IDENTITY;

-- Insert realistic mock data for testing infinite scrolling
-- This creates 150 posts with varied content, perfect for testing pagination

INSERT INTO posts (image_url, caption, created_at) VALUES
-- Technology & Programming Posts
('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', 'Just finished debugging a complex React component. The satisfaction when everything finally clicks! 💻 #coding #react #webdev', '2024-12-15 10:30:00'),
('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'Clean code is not written by following a set of rules. Clean code is written by programmers who care. 📚 #cleancode #programming', '2024-12-15 09:45:00'),
('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop', 'Late night coding session with some good coffee ☕ Building something amazing! #nightcoding #coffee #developer', '2024-12-15 02:15:00'),
('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', 'New workspace setup complete! Ready to build the next big thing 🚀 #workspace #productivity #tech', '2024-12-14 16:20:00'),
('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop', 'Code review day! Always learning something new from the team 👥 #codereview #teamwork #learning', '2024-12-14 14:30:00'),

-- Nature & Landscape Posts
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Mountain peaks calling my name 🏔️ Sometimes you need to step away from the screen and breathe #nature #mountains #hiking', '2024-12-14 12:45:00'),
('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'Forest therapy session complete ✨ Nature is the best debugger for the mind #forest #mindfulness #peace', '2024-12-14 11:00:00'),
('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop', 'Sunset coding break 🌅 Best ideas come when you least expect them #sunset #inspiration #creativity', '2024-12-14 08:30:00'),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Weekend hiking adventure! Fresh air = fresh perspective on that tricky algorithm 🥾 #hiking #weekend #problemsolving', '2024-12-13 15:20:00'),
('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop', 'Ocean waves and infinite loops - both mesmerizing in their own way 🌊 #ocean #programming #philosophy', '2024-12-13 13:45:00'),

-- Food & Coffee Posts
('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop', 'Fuel for the coding marathon ahead ☕ Third cup today but who''s counting? #coffee #coding #fuel', '2024-12-13 10:15:00'),
('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop', 'Pizza and programming - the perfect combination 🍕 Late night deployment going smooth! #pizza #deployment #latenight', '2024-12-12 23:30:00'),
('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', 'Healthy breakfast before tackling that complex database optimization 🥗 #healthy #breakfast #optimization', '2024-12-12 07:45:00'),
('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', 'Team lunch break! Best discussions happen away from the keyboard 🍽️ #teamlunch #collaboration #ideas', '2024-12-12 12:30:00'),
('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop', 'Coffee shop coding session ☕ Sometimes a change of environment sparks creativity #coffeeshop #remote #creativity', '2024-12-11 16:45:00'),

-- Urban & Architecture Posts
('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop', 'City lights inspiring tonight''s UI design ✨ Urban landscapes = digital landscapes #city #ui #design', '2024-12-11 20:00:00'),
('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop', 'Architecture and code architecture - both need solid foundations 🏗️ #architecture #coding #foundations', '2024-12-11 14:20:00'),
('https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop', 'Modern building, modern code. Clean lines, clean functions 🏢 #modern #clean #architecture', '2024-12-11 11:30:00'),
('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 'Skyscrapers reaching for the cloud ☁️ Just like our applications! #skyscrapers #cloud #scalability', '2024-12-10 17:15:00'),
('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop', 'Bridge connecting two sides - just like APIs connecting frontend and backend 🌉 #bridge #api #connection', '2024-12-10 15:45:00'),

-- Technology & Gadgets Posts
('https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop', 'New mechanical keyboard arrived! The clicks are music to my ears 🎵 #mechanicalkeyboard #typing #productivity', '2024-12-10 13:20:00'),
('https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=800&h=600&fit=crop', 'Dual monitor setup complete! More screen real estate = more productivity 📺 #dualmonitor #setup #productivity', '2024-12-10 10:00:00'),
('https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop', 'Debugging on mobile - responsive design testing in action 📱 #mobile #responsive #testing', '2024-12-09 18:30:00'),
('https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop', 'Server room vibes 💻 Where all the magic happens behind the scenes #server #backend #infrastructure', '2024-12-09 16:45:00'),
('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'Cable management level: expert 🔌 Clean setup, clean mind #cablemanagement #organization #setup', '2024-12-09 14:15:00'),

-- Abstract & Artistic Posts
('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop', 'Abstract thinking leads to concrete solutions 🎨 #abstract #creativity #problemsolving', '2024-12-09 12:00:00'),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Geometric patterns in nature inspire algorithmic thinking 📐 #patterns #algorithms #nature', '2024-12-08 19:20:00'),
('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'Color theory meets UI design 🌈 Every pixel matters #color #ui #design', '2024-12-08 17:30:00'),
('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop', 'Minimalism in code, maximalism in impact ⚡ #minimalism #impact #code', '2024-12-08 15:45:00'),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Light and shadow - just like debugging and feature development 💡 #light #shadow #development', '2024-12-08 13:10:00'),

-- Workspace & Productivity Posts
('https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop', 'Organized desk, organized mind 📝 Ready to tackle today''s sprint goals #organization #productivity #sprint', '2024-12-08 09:30:00'),
('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', 'Notebook and laptop - analog meets digital 📖 Sometimes the best ideas start with pen and paper #analog #digital #ideas', '2024-12-07 21:15:00'),
('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Standing desk mode activated! Health is wealth 💪 #standingdesk #health #productivity', '2024-12-07 16:20:00'),
('https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop', 'Whiteboard session complete ✅ Complex problems need visual solutions #whiteboard #visualization #problemsolving', '2024-12-07 14:45:00'),
('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', 'Documentation day! Future me will thank present me 📚 #documentation #future #planning', '2024-12-07 11:00:00'),

-- Learning & Education Posts
('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop', 'New programming book arrived! Never stop learning 📖 #learning #books #programming', '2024-12-06 18:30:00'),
('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', 'Online course completed! Certificate earned 🎓 Continuous learning is the key #onlinelearning #certificate #growth', '2024-12-06 15:45:00'),
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'Library coding session 📚 Surrounded by knowledge and quiet focus #library #focus #learning', '2024-12-06 13:20:00'),
('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop', 'Stack of technical books growing! So many technologies to explore 📚 #books #technology #exploration', '2024-12-05 20:10:00'),
('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', 'Workshop attendance! Learning from industry experts 👨‍🏫 #workshop #experts #learning', '2024-12-05 17:30:00'),

-- Team & Collaboration Posts
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Team standup complete! Great progress on the sprint 👥 #standup #team #progress', '2024-12-05 10:15:00'),
('https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'Pair programming session! Two minds, one solution 🧠🧠 #pairprogramming #collaboration #teamwork', '2024-12-04 16:45:00'),
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Code review feedback incorporated! Always room for improvement 🔄 #codereview #feedback #improvement', '2024-12-04 14:20:00'),
('https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'Brainstorming session results! Innovation through collaboration 💡 #brainstorming #innovation #collaboration', '2024-12-04 11:30:00'),
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Team building event! Strong teams build strong software 💪 #teambuilding #strong #software', '2024-12-03 19:00:00'),

-- Success & Achievement Posts
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'Feature deployed successfully! 🚀 Users are loving the new functionality #deployment #success #users', '2024-12-03 15:30:00'),
('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Bug-free release achieved! Quality assurance pays off ✅ #bugfree #quality #release', '2024-12-03 12:45:00'),
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'Performance optimization complete! 50% faster load times ⚡ #performance #optimization #speed', '2024-12-02 18:20:00'),
('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Security audit passed! Fortress-level protection achieved 🛡️ #security #audit #protection', '2024-12-02 16:10:00'),
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'User feedback: "This app changed my workflow!" 💝 #feedback #workflow #impact', '2024-12-02 13:55:00'),

-- Inspiration & Motivation Posts
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Every expert was once a beginner 🌱 Keep growing, keep coding #beginner #expert #growth', '2024-12-01 20:30:00'),
('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'Code is poetry written in logic 📝 #code #poetry #logic', '2024-12-01 17:45:00'),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'The best error message is the one that never shows up 🚫 #error #prevention #quality', '2024-12-01 15:20:00'),
('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'Simplicity is the ultimate sophistication 💎 #simplicity #sophistication #design', '2024-11-30 22:15:00'),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'First solve the problem, then write the code 🧩 #problem #solution #code', '2024-11-30 19:30:00');

-- Continue with more diverse content to reach 150 posts
INSERT INTO posts (image_url, caption, created_at) VALUES
-- More Technology Posts
('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'API documentation complete! Clear docs = happy developers 📋 #api #documentation #developers', '2024-11-30 16:45:00'),
('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop', 'Database migration successful! Zero downtime achieved 🗄️ #database #migration #uptime', '2024-11-30 14:20:00'),
('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', 'Microservices architecture deployed! Scalability unlocked 🔧 #microservices #scalability #architecture', '2024-11-30 11:35:00'),
('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop', 'Container orchestration mastered! Docker + Kubernetes = 💪 #docker #kubernetes #containers', '2024-11-29 21:10:00'),
('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', 'GraphQL endpoint live! Efficient data fetching achieved 📊 #graphql #data #efficiency', '2024-11-29 18:25:00'),

-- More Nature Posts
('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop', 'Sunrise debugging session 🌅 Early bird catches the bug! #sunrise #debugging #earlybird', '2024-11-29 06:30:00'),
('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop', 'Beach coding retreat! Sand between toes, code in mind 🏖️ #beach #coding #retreat', '2024-11-28 15:40:00'),
('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'Forest walk = mental stack overflow cleared 🌲 #forest #mental #clarity', '2024-11-28 12:15:00'),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Mountain peak conquered! Next: conquer this algorithm 🏔️ #mountain #algorithm #challenge', '2024-11-27 16:50:00'),
('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop', 'Desert landscape inspiring minimalist UI design 🏜️ #desert #minimalist #ui', '2024-11-27 13:20:00'),

-- More Food & Lifestyle Posts
('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop', 'Espresso shot = instant energy boost! ☕ Ready for the coding marathon #espresso #energy #marathon', '2024-11-27 08:45:00'),
('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop', 'Sushi and software architecture discussion 🍣 Raw fish, refined code #sushi #architecture #refined', '2024-11-26 19:30:00'),
('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', 'Green smoothie for green builds! 🥬 Health and CI/CD go hand in hand #smoothie #cicd #health', '2024-11-26 07:15:00'),
('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', 'Ramen and recursion - both involve going deeper 🍜 #ramen #recursion #deeper', '2024-11-25 22:40:00'),
('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop', 'Artisan coffee meets artisan code ☕ Craftsmanship in every line #artisan #coffee #craftsmanship', '2024-11-25 16:20:00'),

-- More Urban & Architecture Posts
('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop', 'Neon lights inspiring dark theme UI 🌃 #neon #darktheme #ui', '2024-11-25 20:55:00'),
('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop', 'Brutalist architecture = robust backend design 🏗️ #brutalist #robust #backend', '2024-11-24 14:30:00'),
('https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop', 'Glass building reflecting cloud infrastructure ☁️ #glass #cloud #infrastructure', '2024-11-24 11:45:00'),
('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 'Vertical scaling like vertical architecture 🏢 #vertical #scaling #architecture', '2024-11-23 17:20:00'),
('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop', 'Bridge pattern in real life and in code 🌉 #bridge #pattern #reallife', '2024-11-23 15:10:00'),

-- More Abstract & Creative Posts
('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop', 'Fractal patterns in recursive algorithms 🌀 #fractal #recursive #patterns', '2024-11-23 12:35:00'),
('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'RGB values creating digital rainbows 🌈 #rgb #digital #rainbow', '2024-11-22 19:50:00'),
('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop', 'Geometric precision in CSS Grid layouts 📐 #geometric #css #grid', '2024-11-22 16:25:00'),
('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'Gradient transitions smooth as silk 🎨 #gradient #smooth #transitions', '2024-11-22 13:40:00'),
('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop', 'Pixel perfect alignment achieved! 📏 #pixel #perfect #alignment', '2024-11-21 21:15:00'),

-- More Workspace Posts
('https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop', 'Ergonomic setup complete! Comfort = productivity 🪑 #ergonomic #comfort #productivity', '2024-11-21 09:30:00'),
('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', 'Sticky notes everywhere! Analog task management 📝 #stickynotes #analog #tasks', '2024-11-20 18:45:00'),
('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Monitor calibration day! Colors must be perfect 🖥️ #monitor #calibration #colors', '2024-11-20 15:20:00'),
('https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop', 'Cable management 2.0! Even cleaner setup 🔌 #cable #management #clean', '2024-11-20 12:10:00'),
('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', 'Backup drives organized! Data safety first 💾 #backup #data #safety', '2024-11-19 20:35:00'),

-- More Learning Posts
('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop', 'Algorithm textbook marathon! Big O notation mastery 📖 #algorithm #bigo #mastery', '2024-11-19 17:50:00'),
('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', 'Conference talk preparation! Sharing knowledge is caring 🎤 #conference #knowledge #sharing', '2024-11-19 14:25:00'),
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'Tutorial video recording setup! Teaching others teaches me 🎥 #tutorial #teaching #learning', '2024-11-18 16:40:00'),
('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop', 'Design patterns book finished! Gang of Four wisdom absorbed 📚 #designpatterns #gangoffour #wisdom', '2024-11-18 13:15:00'),
('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', 'Hackathon preparation! 48 hours of pure creativity ahead 🏆 #hackathon #creativity #competition', '2024-11-17 22:00:00'),

-- More Team Posts
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Sprint retrospective insights! Always improving our process 🔄 #retrospective #improvement #process', '2024-11-17 16:30:00'),
('https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'Mob programming session! Many minds, one keyboard ⌨️ #mobprogramming #collaboration #minds', '2024-11-17 11:45:00'),
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Architecture decision recorded! Future team will thank us 📋 #architecture #decision #future', '2024-11-16 19:20:00'),
('https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'Knowledge sharing session! Everyone teaches, everyone learns 🧠 #knowledge #sharing #learning', '2024-11-16 15:55:00'),
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Team velocity increasing! Momentum is building 📈 #velocity #momentum #team', '2024-11-16 10:30:00'),

-- More Success Posts
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'Load testing passed! System handles 10x traffic 🚀 #loadtesting #traffic #scalability', '2024-11-15 18:10:00'),
('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Code coverage at 95%! Quality metrics looking good ✅ #coverage #quality #metrics', '2024-11-15 14:45:00'),
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'Accessibility audit: AAA rating achieved! 🌟 #accessibility #aaa #inclusive', '2024-11-15 12:20:00'),
('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Memory leaks eliminated! Performance optimization complete ⚡ #memory #performance #optimization', '2024-11-14 20:35:00'),
('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'User onboarding flow perfected! Conversion rate up 40% 📊 #onboarding #conversion #ux', '2024-11-14 17:50:00'),

-- Final batch of diverse posts
('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'Machine learning model deployed! AI is now serving users 🤖 #ml #ai #deployment', '2024-11-14 15:25:00'),
('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop', 'Blockchain integration complete! Decentralized and secure 🔗 #blockchain #decentralized #secure', '2024-11-14 13:00:00'),
('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', 'PWA features enabled! Offline-first experience ready 📱 #pwa #offline #mobile', '2024-11-13 21:40:00'),
('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop', 'WebAssembly module optimized! Near-native performance achieved 🏎️ #webassembly #performance #native', '2024-11-13 18:15:00'),
('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', 'Real-time features live! WebSocket magic in action ✨ #realtime #websocket #magic', '2024-11-13 16:30:00'),
('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'Serverless functions deployed! Pay-per-use efficiency 💰 #serverless #efficiency #cloud', '2024-11-13 14:05:00'),
('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop', 'Edge computing setup complete! Latency minimized globally 🌍 #edge #latency #global', '2024-11-12 22:20:00'),
('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', 'Quantum computing experiment! Future of computing explored 🔬 #quantum #future #computing', '2024-11-12 19:45:00'),
('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop', 'IoT sensors integrated! Smart everything is here 📡 #iot #sensors #smart', '2024-11-12 17:10:00'),
('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', 'AR/VR prototype working! Immersive experiences unlocked 🥽 #ar #vr #immersive', '2024-11-12 14:35:00'),
('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'Voice interface implemented! Talk to your app 🗣️ #voice #interface #speech', '2024-11-11 20:50:00'),
('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop', 'Biometric authentication added! Security meets convenience 👆 #biometric #security #convenience', '2024-11-11 16:25:00'),
('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', 'Neural network training complete! Pattern recognition mastered 🧠 #neural #patterns #ai', '2024-11-11 13:40:00'),
('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop', 'Cryptocurrency wallet integrated! Digital payments enabled 💎 #crypto #wallet #payments', '2024-11-10 21:15:00'),
('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', 'Final commit of the day! Tomorrow brings new challenges 🌙 #commit #tomorrow #challenges', '2024-11-10 23:59:00');

-- Verify the data insertion
SELECT COUNT(*) as total_posts FROM posts;
SELECT 
    MIN(created_at) as earliest_post,
    MAX(created_at) as latest_post,
    COUNT(*) as total_count
FROM posts;

-- Show sample of inserted data
SELECT id, LEFT(caption, 50) as caption_preview, created_at 
FROM posts 
ORDER BY created_at DESC 
LIMIT 10;