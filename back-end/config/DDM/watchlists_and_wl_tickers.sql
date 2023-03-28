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



CREATE TABLE IF NOT EXISTS `WATCHLIST_TICKERS` (
	`id` int NOT NULL, -- wl ticker row id 
    `wl_id` int NOT NULL, -- conceptually a foreign key of watchlists.id
    `ticker` varchar(16),
    `created` int NOT NULL, -- date, but use epoch time
    `updated` int, -- date, but use epoch time
    `user_id` int NOT NULL, -- just for convenience
    `deleted` int default(null), -- epoch time of when deleted
	PRIMARY KEY (`id`)
);

INSERT INTO `WATCHLIST_TICKERS` ( `wl_id`, `ticker`, `created`, `updated`,`deleted`,`user_id`) VALUES
(1, 'WEN', unix_timestamp(),null,null,21),
(2, 'BKI', unix_timestamp(),null,null,21),
(2, 'BABA', unix_timestamp(),null,null,21)
