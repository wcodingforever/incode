CREATE TABLE `puzzle`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `level` INT(1) NOT NULL,
    `description` TEXT NOT NULL,
    `date_from` DATE NOT NULL,
    `date_to` DATE NOT NULL
);

CREATE TABLE `datesets`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `puzzle_id` INT(11) NOT NULL, 
    `dataset` TEXT NOT NULL,
    `answers` INT(11) NOT NULL
);

CREATE TABLE `users`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(15) NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    `birth` DATE NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `gender` VARCHAR(10),
    `country` VARCHAR(100),
    `admin` INT(1) DEFAULT 0 NOT NULL,
    `activation` INT(1) DEFAULT 1 NOT NULL,
    `last_login` TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT username_uniq UNIQUE (username)
);

CREATE TABLE `feedback`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT(11) NOT NULL,
    `text` VARCHAR(500) NOT NULL,
    `date` DATETIME DEFAULT NOW() NOT NULL,
    `origin` VARCHAR(32) NOT NULL,
    `feedback_topic_id` INT(11) NOT NULL
);

CREATE TABLE `feedback_topic`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `topic` VARCHAR (64) NOT NULL
);



INSERT INTO `feedback_topic` (topic) VALUES ( "Suggestion") ,( "Puzzle Issue"), 
( "Website Issue"), ( "Comments"), ( "Others");






