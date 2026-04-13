-- Create team_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `position` VARCHAR(100) NOT NULL,
  `image_url` VARCHAR(255) NULL,
  `bio` TEXT NULL,
  `linkedin_url` VARCHAR(255) NULL,
  `order_index` INT DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
INSERT INTO `team_members` (`name`, `position`, `image_url`, `linkedin_url`, `order_index`) VALUES
('Saminan, S.H.', 'Founder & Managing Partner', '/uploads/sample1.jpg', 'https://linkedin.com/in/saminan', 1),
('Andi Wijaya, S.H., M.H.', 'Senior Associate', '/uploads/sample2.jpg', 'https://linkedin.com/in/andiwijaya', 2),
('Siti Aminah, S.H.', 'Associate', '/uploads/sample3.jpg', 'https://linkedin.com/in/siti-aminah', 3),
('Budi Santoso, S.H.', 'Junior Associate', '/uploads/sample4.jpg', 'https://linkedin.com/in/budi-santoso', 4);