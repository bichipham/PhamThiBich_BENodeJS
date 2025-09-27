-- -------------------------------------------------------------
-- TablePlus 6.6.8(632)
--
-- https://tableplus.com/
--
-- Database: capstone_nodeJS_express
-- Generation Time: 2025-09-27 11:38:12.0060
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Comments`;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `imageId` int NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `imageId` (`imageId`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`imageId`) REFERENCES `Images` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Images`;
CREATE TABLE `Images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `path` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Images_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `SaveImageRecord`;
CREATE TABLE `SaveImageRecord` (
  `userId` int NOT NULL,
  `imageId` int NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `isSave` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userId`,`imageId`),
  KEY `imageId` (`imageId`),
  CONSTRAINT `SaveImageRecord_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `SaveImageRecord_ibfk_2` FOREIGN KEY (`imageId`) REFERENCES `Images` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Comments` (`id`, `userId`, `imageId`, `date`, `content`) VALUES
(2, 1, 2, '2025-09-24 17:20:52', 'where ??');

INSERT INTO `Images` (`id`, `name`, `path`, `description`, `userId`) VALUES
(2, 'Sunset', 'https://picsum.photos/id/7/640/640', 'Beautiful sunset at the beach', 1),
(3, 'Image 2', 'https://picsum.photos/id/2/640/640', 'Beautiful pic 2', 1),
(4, 'Image 3', 'https://picsum.photos/id/3/640/640', 'Beautiful pic 3', 2),
(5, 'Image 4', 'https://picsum.photos/id/4/640/640', 'Beautiful pic 4', 2),
(6, 'Image 5', 'https://picsum.photos/id/5/640/640', 'Beautiful pic 5', 3),
(7, 'Image 6', 'https://picsum.photos/id/6/640/640', 'Beautiful pic 6', 3),
(10, 'hinh 2', 'https://res.cloudinary.com/dmzl1j5k7/image/upload/v1758900441/socialapp/ddykjrijgauvh6bzwzn1.jpg', 'hinh rat dep', 1);

INSERT INTO `SaveImageRecord` (`userId`, `imageId`, `date`, `isSave`) VALUES
(1, 4, '2025-09-26 14:15:17', 0),
(1, 5, '2025-09-26 14:07:54', 1);

INSERT INTO `Users` (`id`, `email`, `password`, `name`, `age`, `avatar`) VALUES
(1, 'abc@gmail.com', '$2b$10$9qgPPHQqxRjbVX3SQ5IMVeFegdO56aRTNa68TRdBIZ/rLEbe4k2e.', 'bichi ne', 19, 'https://res.cloudinary.com/dmzl1j5k7/image/upload/v1758901080/socialapp/avatars/h1pmfmmiqnzkfzsrxtcz.jpg'),
(2, 'def@gmail.com', '$2b$10$t9Z8sQWNsGelcmZUa.nBtefnbW5G15wC7Kp.A8E4QIvxInqCRqqOu', 'Bichi Pham DEF', NULL, NULL),
(3, 'user1@gmail.com', '$2b$10$mMNWmyTqIZDZnSX1A1.ice6nMC.U6srlkeqWyv1GxKED7qFgVeo9K', 'user 1', NULL, NULL),
(4, 'user2@gmail.com', '$2b$10$9fL7DcdnuXus0RS6otrsQu6vn2IK5N/zY98MqhI0wAh97Cznpq2M2', 'user 2', NULL, NULL),
(5, 'user3@gmail.com', '$2b$10$9.67FIZAqpRKEOYonljo9eKycrOjweY1NI6aGYDJiv0a56AvmeSyS', 'user 3', NULL, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;