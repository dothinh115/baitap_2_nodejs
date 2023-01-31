-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `food_id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(100) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`food_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `food_type` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `food` (`food_id`, `food_name`, `image`, `price`, `description`, `type_id`) VALUES
(1,	'Ngô chiên',	'ngochienimg',	40000,	'Ngô chiên',	1),
(2,	'Khoai chiên',	'khoaichienimg',	40000,	'Khoai chiên',	1),
(3,	'Súp cá hồi',	'supcahoiimg',	20000,	'Súp cá hồi',	2),
(4,	'Súp cua',	'supcuaimg',	25000,	'Súp cua',	2),
(5,	'Rau bí xào',	'raubixaoimg',	40000,	'Rau bí xào',	3),
(6,	'Rau muống xào',	'raumuongxaoimg',	40000,	'Rau muống xào',	3),
(7,	'Gà hấp lá chanh',	'gahaplachanhimg',	200000,	'Gà hấp lá chanh',	4),
(8,	'Gà nướng ngũ vị',	'ganuongnguviimg',	400000,	'Gà nướng ngũ vị',	4),
(9,	'cá rô chiên xù',	'/img/test',	12000,	'cá rô chiên xù',	1),
(16,	'Mì trộn thập cẩm ',	'/img/test',	35000,	'Mì trộn thập cẩm ',	6),
(17,	'Mì trộn đặc biệt',	'/img/test',	50000,	'Mì trộn đặc biệt',	6);

DROP TABLE IF EXISTS `food_type`;
CREATE TABLE `food_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `food_type` (`type_id`, `type_name`) VALUES
(1,	'KHAI VỊ'),
(2,	'SÚP CÁC LOẠI'),
(3,	'RAU THEO MÙA'),
(4,	'NỘM VÀ SALAD'),
(5,	'CÁC MÓN GÀ'),
(6,	'CÁC MÓN MÌ');

DROP TABLE IF EXISTS `like_res`;
CREATE TABLE `like_res` (
  `user_id` int DEFAULT NULL,
  `res_id` int DEFAULT NULL,
  `date_like` datetime DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `res_id` (`res_id`),
  CONSTRAINT `like_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `like_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `like_res` (`user_id`, `res_id`, `date_like`) VALUES
(2,	1,	'2008-10-29 14:56:59'),
(3,	2,	'2008-10-29 14:56:59'),
(5,	3,	'2008-10-29 14:56:59'),
(6,	4,	'2008-10-29 14:56:59'),
(10,	4,	'2008-10-29 14:56:59'),
(8,	4,	'2008-10-29 14:56:59'),
(9,	3,	'2008-10-29 14:56:59'),
(1,	3,	'2008-10-29 14:56:59'),
(9,	2,	'2008-10-29 14:56:59'),
(9,	1,	'2008-10-29 14:56:59');

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `user_id` int DEFAULT NULL,
  `food_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `arr_sub_id` varchar(100) DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `orders` (`user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES
(1,	1,	2,	'abc',	'xyz'),
(2,	2,	1,	'abc',	'xyz'),
(3,	4,	5,	'abc',	'xyz'),
(5,	1,	1,	'abc',	'xyz'),
(5,	6,	2,	'abc',	'xyz'),
(6,	8,	1,	'abc',	'xyz'),
(10,	6,	2,	'abc',	'xyz'),
(8,	3,	2,	'abc',	'xyz'),
(9,	7,	4,	'abc',	'xyz');

DROP TABLE IF EXISTS `rate_res`;
CREATE TABLE `rate_res` (
  `user_id` int DEFAULT NULL,
  `res_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `date_rate` datetime DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `res_id` (`res_id`),
  CONSTRAINT `rate_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `rate_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
  `res_id` int NOT NULL AUTO_INCREMENT,
  `res_name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`res_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `restaurant` (`res_id`, `res_name`, `image`, `description`) VALUES
(1,	'Nhà hàng HCM',	'nhahanghcmimg',	'Nhà hàng ở HCM'),
(2,	'Nhà hàng Hà Nội',	'nhahanghnimg',	'Nhà hàng ở Hà Nội'),
(3,	'Nhà hàng Huế',	'nhahanghueimg',	'Nhà hàng ở Huế'),
(4,	'Nhà hàng Cần Thơ',	'nhahangcanthoimg',	'Nhà hàng ở Cần Thơ');

DROP TABLE IF EXISTS `sub_food`;
CREATE TABLE `sub_food` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(100) DEFAULT NULL,
  `sub_price` float DEFAULT NULL,
  `food_id` int DEFAULT NULL,
  PRIMARY KEY (`sub_id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `sub_food_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `sub_food` (`sub_id`, `sub_name`, `sub_price`, `food_id`) VALUES
(1,	'Ngô chiên bị khét',	5000,	1),
(2,	'Súp cua bị khô',	15000,	4),
(3,	'Khoai chưa chiên',	500000,	2),
(4,	'Súp cá hồi nhúc nhích',	500,	3),
(5,	'Rau bị xào ko bỏ rau bí',	999999,	5),
(6,	'Rau muống xào nhưng đừng xào',	5000,	1),
(7,	'Gà đen hấp lá chanh',	46000,	7),
(8,	'Gà nướng ngũ vị 1 mặt',	50070,	8),
(9,	'Tương ớt chấm chung',	8000,	1),
(10,	'Tương ớt chấm chung',	8000,	2),
(11,	'Tương ớt chấm chung',	8000,	3),
(12,	'Tương ớt chấm chung',	8000,	4),
(13,	'Tương ớt chấm chung',	8000,	5),
(14,	'Tương ớt chấm chung',	8000,	6),
(15,	'Tương ớt chấm chung',	8000,	7),
(16,	'Tương ớt chấm chung',	8000,	8);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`) VALUES
(1,	'Jennie Nichols',	'jennie.nichols@example.com',	'1234'),
(2,	'Lucineide Lima',	'lucineide.lima@example.com',	'1234'),
(3,	'Daksh Bangera',	'daksh.bangera@example.com',	'1234'),
(4,	'Sofie Rasmussen',	'sofie.rasmussen@example.com',	'1234'),
(5,	'German Vicente',	'german.vicente@example.com',	'1234'),
(6,	'Logan David',	'logan.david@example.com',	'1234'),
(7,	'Veeti Sippola',	'veeti.sippola@example.com',	'1234'),
(8,	'Kim Terry',	'kim.terry@example.com',	'1234'),
(9,	'Fitan Patil',	'fitan.patil@example.com',	'1234'),
(10,	'Gabrielle Durand',	'gabrielle.durand@example.com',	'1234'),
(22,	'Do Thinh',	'dothinh@gmail.com',	'1234'),
(23,	'Moira Verkerke',	'moira.verkerke@example.com',	'1234'),
(24,	'Abitha Kumar',	'abitha.kumar@example.com',	'1234'),
(25,	'Latife Evliyaoğlu',	'latife.evliyaoglu@example.com',	'1234'),
(26,	'Natalia Ivanić',	'natalia.ivanic@example.com',	'1234'),
(27,	'Louise Dubois',	'louise.dubois@example.com',	'1234'),
(28,	'Ece Dalkıran',	'ece.dalkiran@example.com',	'1234'),
(29,	'Cecilia Haugnes',	'cecilia.haugnes@example.com',	'1234'),
(30,	'Alfredo Peña',	'alfredo.pena@example.com',	'1234'),
(31,	'Rubén Barrios',	'ruben.barrios@example.com',	'1234'),
(32,	'Scott Vargas',	'scott.vargas@example.com',	'1234'),
(33,	'Alicia Robin',	'alicia.robin@example.com',	'1234'),
(34,	'Emile Roy',	'emile.roy@example.com',	'1234'),
(35,	'Anthony Bærheim',	'anthony.baerheim@example.com',	'1234'),
(36,	'Si Bouwers',	'si.bouwers@example.com',	'1234'),
(37,	'Eva García',	'eva.garcia@example.com',	'1234'),
(38,	'Louise Dubois',	'louise.dubois@example.com',	'1234'),
(39,	'یاسمین مرادی',	'ysmyn.mrdy@example.com',	'1234'),
(40,	'Mira Šakić',	'mira.sakic@example.com',	'1234'),
(41,	'Jonas Møller',	'jonas.moller@example.com',	'1234'),
(42,	'Andreas Møller',	'andreas.moller@example.com',	'1234'),
(43,	'Pamela Molina',	'pamela.molina@example.com',	'1234'),
(44,	'Eugenia Medina',	'eugenia.medina@example.com',	'1234'),
(45,	'Gilles Gerard',	'gilles.gerard@example.com',	'1234'),
(46,	'Rémy Leroux',	'remy.leroux@example.com',	'1234'),
(47,	'Ronith Dalvi',	'ronith.dalvi@example.com',	'1234'),
(48,	'Hemetério Moreira',	'hemeterio.moreira@example.com',	'1234'),
(49,	'Hansjörg Fernandez',	'hansjorg.fernandez@example.com',	'1234'),
(50,	'Alexej Schötz',	'alexej.schotz@example.com',	'1234'),
(51,	'رها نكو نظر',	'rh.nkwnzr@example.com',	'1234'),
(52,	'Mehmet Evliyaoğlu',	'mehmet.evliyaoglu@example.com',	'1234'),
(53,	'Carolina Esquivel',	'carolina.esquivel@example.com',	'1234'),
(54,	'Alice Singh',	'alice.singh@example.com',	'1234'),
(55,	'Frederikke Jensen',	'frederikke.jensen@example.com',	'1234'),
(56,	'Milja Valli',	'milja.valli@example.com',	'1234'),
(57,	'Nicklas Thomsen',	'nicklas.thomsen@example.com',	'1234'),
(58,	'آیلین زارعی',	'aylyn.zraay@example.com',	'1234'),
(59,	'Mathilde Thomsen',	'mathilde.thomsen@example.com',	'1234'),
(60,	'Håvard Smørdal',	'havard.smordal@example.com',	'1234'),
(61,	'Sean Renaud',	'sean.renaud@example.com',	'1234'),
(62,	'Emily Christiansen',	'emily.christiansen@example.com',	'1234'),
(63,	'Barry Patterson',	'barry.patterson@example.com',	'1234'),
(68,	'abc',	'abc@gmail.com',	'1234'),
(73,	'abc',	'abc@gmail.com',	'1234'),
(74,	'Pat Jacobs',	'pat.jacobs@example.com',	'1234'),
(75,	'Elvia Rosas',	'elvia.rosas@example.com',	'1234');

-- 2023-01-31 00:16:15
