-- Create the database event_saver_db and specified it for use.
CREATE DATABASE transferTest;
USE transferTest;

-- Create the table events.
CREATE TABLE trump_tweetssql (
    tweet_number INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tweet VARCHAR(800) NOT NULL,
    tweet_date VARCHAR(50) NOT NULL,
    favorites INTEGER(10) NOT NULL,
    retweets INTEGER(10)NULL,
    tweet_id BIGINT(25)  
);
