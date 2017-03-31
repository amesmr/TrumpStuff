-- Create the database event_saver_db and specified it for use.
CREATE DATABASE trump_really;
USE trump_really;

-- Create the table events.
CREATE TABLE all_tweets (
    tweet_number INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tweet VARCHAR(800) NOT NULL,
    tweet_date VARCHAR(50) NOT NULL,
    favorites INTEGER(10) NOT NULL,
    retweets INTEGER(10)NULL,
    tweet_id BIGINT(25)
);

-- Create the table events.
CREATE TABLE quotes (
    id INT NOT NULL AUTO_INCREMENT,
    quote VARCHAR(800) NOT NULL,
    rating VARCHAR(6) NOT NULL,
    source VARCHAR(255) NOT NULL,
    year YEAR(4) DEFAULT NULL,
    PRIMARY KEY (id)
);

-- CREATE TABLE force_tweets (
--     tweet_number INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     tweet VARCHAR(800) NOT NULL,
--     tweet_date VARCHAR(50) NOT NULL,
--     favorites INTEGER(10) NOT NULL,
--     retweets INTEGER(10)NULL,
--     tweet_id BIGINT(25),

-- );


