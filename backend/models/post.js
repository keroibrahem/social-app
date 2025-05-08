// CREATE TABLE posts (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     content TEXT NOT NULL,            
//     image VARCHAR(255),               
//     user_id INT NOT NULL,            
//     likes_count INT DEFAULT 0,         
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
// );
// CREATE TABLE comments (
//     id INT AUTO_INCREMENT PRIMARY KEY, -- معرف فريد لكل تعليق
//     post_id INT NOT NULL,              -- معرف البوست المرتبط
//     user_id INT NOT NULL,              -- معرف المستخدم الذي أضاف التعليق
//     content TEXT NOT NULL,             -- نص التعليق
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- تاريخ الإنشاء
//     FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, -- ربط بالبوست
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- ربط بالمستخدم
// );