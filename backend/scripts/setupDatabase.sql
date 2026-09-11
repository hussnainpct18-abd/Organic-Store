CREATE DATABASE IF NOT EXISTS organic_products CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE organic_products;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  badge VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_category (category),
  KEY idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: create a dedicated app user.
-- CREATE USER IF NOT EXISTS 'organic_app'@'localhost' IDENTIFIED BY 'your_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON organic_products.* TO 'organic_app'@'localhost';
-- FLUSH PRIVILEGES;
