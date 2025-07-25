
CREATE ExerciseSQL;
USE ExerciseSQL;
--------- Create tables--------------
CREATE TABLE `user` (
	`user_id` INT PRIMARY KEY AUTO_INCREMENT, 
	`full_name` VARCHAR(255), 
	`email` VARCHAR(255), 
	`password` VARCHAR(255)
)
INSERT INTO `user` (`full_name`, `email`, `password`) VALUES
('Alice Johnson', 'alice@example.com', 'password123'),
('Bob Smith', 'bob@example.com', '12345678'),
('Charlie Lee', 'charlie@example.com', 'qwerty'),
('Diana Adams', 'diana@example.com', 'abc123'),
('Ethan Brown', 'ethan@example.com', 'passw0rd'),
('Fiona Clark', 'fiona@example.com', '1234abcd'),
('George Miller', 'george@example.com', 'letmein'),
('Hannah Davis', 'hannah@example.com', 'admin123'),
('Ivan Wilson', 'ivan@example.com', 'mypassword'),
('Julia Taylor', 'julia@example.com', 'securepass');
('Bichi Pham', 'abc@gmail.com', 'securepass');
('Bichi xinh', 'abcd@gmail.com', 'securepass');

CREATE TABLE `food_type` (
	`type_id` INT PRIMARY KEY AUTO_INCREMENT, 
	`type_name` VARCHAR(255)
);
INSERT INTO `food_type` (`type_name`) VALUES
('Appetizer'),
('Main Course'),
('Dessert'),
('Beverage'),
('Salad'),
('Soup'),
('Snack'),
('Seafood'),
('Vegetarian'),
('Fast Food');

CREATE TABLE `food` (
	`food_id` INT PRIMARY KEY AUTO_INCREMENT, 
	`food_name` VARCHAR(255), 
	`image` VARCHAR(255), 
	`price` FLOAT,
	`desc` VARCHAR(255),
	`type_id` INT,
	 FOREIGN KEY (`type_id`) REFERENCES `food_type`(`type_id`)
);
INSERT INTO `food` (`food_name`, `image`, `price`, `desc`, `type_id`) VALUES
('Spring Rolls', 'spring_rolls.jpg', 4.5, 'Crispy vegetarian rolls', 1),
('Beef Steak', 'beef_steak.jpg', 15.0, 'Grilled beef with sauce', 2),
('Chocolate Cake', 'choco_cake.jpg', 6.0, 'Rich chocolate layered cake', 3),
('Orange Juice', 'orange_juice.jpg', 3.5, 'Freshly squeezed', 4),
('Caesar Salad', 'caesar_salad.jpg', 5.5, 'With chicken and croutons', 5),
('Tomato Soup', 'tomato_soup.jpg', 4.0, 'Served hot with herbs', 6),
('Potato Chips', 'potato_chips.jpg', 2.0, 'Crispy salted chips', 7),
('Grilled Salmon', 'salmon.jpg', 13.0, 'Served with lemon butter sauce', 8),
('Veggie Burger', 'veggie_burger.jpg', 7.5, 'Delicious plant-based burger', 9),
('Fried Chicken', 'fried_chicken.jpg', 8.0, 'Crispy and juicy chicken', 10);

CREATE TABLE `sub_food` (
	`sub_id` INT PRIMARY KEY AUTO_INCREMENT, 
	`sub_name` VARCHAR(255), 
	`sub_price` FLOAT,
	`food_id` INT,
	 FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`)
);
INSERT INTO `sub_food` (`sub_name`, `sub_price`, `food_id`) VALUES
('Extra Cheese', 1.5, 1),
('Spicy Sauce', 0.75, 2),
('Bacon Topping', 2.0, 3);

CREATE TABLE `restaurant` (
	`res_id` INT PRIMARY KEY AUTO_INCREMENT, 
	`res_name` VARCHAR(255), 
	`image` VARCHAR(255), 
	`desc` VARCHAR(255)
);
INSERT INTO `restaurant` (`res_name`, `image`, `desc`) VALUES
('Golden Fork', 'golden_fork.jpg', 'Luxury fine dining experience.'),
('Quick Bites', 'quick_bites.jpg', 'Fast food chain serving burgers & fries.'),
('Veggie Haven', 'veggie_haven.jpg', 'Vegetarian and vegan-friendly meals.');

CREATE TABLE `like_res` (
	`user_id` INT, 
	`res_id` INT,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
	FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`)
)
INSERT INTO `like_res` (`user_id`, `res_id`) VALUES
(1, 1),
(2, 2),
(3, 3);
(1, 2),
(10, 2),
(9, 3);

CREATE TABLE `rate_res` (
	`user_id` INT, 
	`res_id` INT,
	`amount` INT,
	`date_rate` DATE,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
	FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`)
)
INSERT INTO `rate_res` (`user_id`, `res_id`, `amount`, `date_rate`) VALUES
(1, 1, 5, '2025-07-01'),
(2, 2, 4, '2025-07-02'),
(3, 3, 3, '2025-07-03');

CREATE TABLE `order` (
  `user_id` INT,
  `food_id` INT,
  `amount` INT,
  `code` VARCHAR(255),
  `arr_sub_id` VARCHAR(255),
   FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
   FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`)
)

INSERT INTO `order` (`user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES
(1, 1, 2, 'ORD001', '1,2'),
(2, 2, 1, 'ORD002', '3'),
(3, 3, 3, 'ORD003', '4,5'),
(4, 4, 1, 'ORD004', '6'),
(5, 5, 2, 'ORD005', '7,8'),
(6, 6, 1, 'ORD006', '9'),
(7, 7, 1, 'ORD007', ''),
(8, 8, 2, 'ORD008', '10'),
(9, 9, 1, 'ORD009', '2,3,4'),
(10, 10, 3, 'ORD010', '5');
-----------------------------------------------
-- Tìm 5 người đã like nhà hàng nhiều nhất
SELECT `user`.user_id, `user`.full_name,
COUNT(`like_res`.user_id) AS `Số lần like`
FROM `like_res`
INNER JOIN `user` ON `like_res`.user_id = `user`.user_id
GROUP BY `like_res`.user_id
ORDER BY `Số lần like` DESC
LIMIT 5

-- Tìm 2 nhà hàng có lượt like nhiều nhất
SELECT `restaurant`.res_id, `restaurant`.res_name,
COUNT(`like_res`.res_id) AS `Số lần được like`
FROM `like_res`
INNER JOIN `restaurant` ON `like_res`.res_id = `restaurant`.res_id
GROUP BY `like_res`.res_id
ORDER BY `Số lần được like` DESC
LIMIT 2

-- Tim người đặt hàng nhiều nhất
SELECT `user`.user_id, `user`.full_name, COUNT(`order`.user_id) AS `Số lần mua hàng`
FROM `order`
INNER JOIN `user` ON `order`.user_id = `user`.user_id
GROUP BY `order`.user_id
ORDER BY `Số lần mua hàng` DESC
LIMIT 1

-- Tìm người dùng không hoạt động trong hệ thống(không đặt hàng, không like, không đánh giá nhà hàng)
SELECT `user`.user_id, `user`.full_name
FROM `user`
LEFT JOIN `order` ON `user`.user_id = `order`.user_id
LEFT JOIN `like_res` ON `user`.user_id = `like_res`.user_id
LEFT JOIN `rate_res` ON `user`.user_id = `rate_res`.user_id
WHERE `order`.user_id IS NULL
AND `like_res`.user_id IS NULL
AND `rate_res`.user_id IS NULL