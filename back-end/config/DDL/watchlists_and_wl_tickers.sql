CREATE TABLE IF NOT EXISTS `WATCHLISTS` (
	`id` int auto_increment NOT NULL, -- watchlist ID
    `user_id` int NOT NULL,
    `wl_name` varchar(255) NOT NULL,
	`created` int NOT NULL, -- date, but use epoch time
    `updated` int, -- date, but use epoch time
    `deleted` int default(null), -- epoch time of when deleted
     PRIMARY KEY (`id`)
    -- add unique constraint on user id and wl_id   
);

INSERT INTO `WATCHLISTS` ( `user_id`, `wl_name`, `created`, `updated`,`deleted`) VALUES
(21, 'Inverse Cramer', unix_timestamp(),null,null),
(21, 'Burry Roadkill', unix_timestamp(),null,null);



CREATE TABLE `WATCHLIST_TICKERS` (
  `ticker_id` int NOT NULL AUTO_INCREMENT,
  `wl_id` int NOT NULL,
  `ticker` varchar(16) NOT NULL,
  `created` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ticker_id`),
  UNIQUE KEY `duplicateTickersInWatchlist` (`wl_id`,`ticker`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO `WATCHLIST_TICKERS` ( `wl_id`, `ticker`, `created`, `updated`,`deleted`,`user_id`) VALUES
(1, 'WEN', unix_timestamp(),null,null,21),
(2, 'BKI', unix_timestamp(),null,null,21),
(2, 'BABA', unix_timestamp(),null,null,21)
