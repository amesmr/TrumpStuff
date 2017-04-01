-- Create the database
USE heroku_8f7c035decea09f;

-- Create the table force_tweets.
CREATE TABLE force_tweets (
    tweet_number INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tweet VARCHAR(1000) NOT NULL,
    tweet_date VARCHAR(1000) NOT NULL,
    favorites INTEGER(10) NOT NULL,
    retweets INTEGER(10)NULL,
    tweet_id BIGINT(25) NOT NULL,
    name VARCHAR(1000) NOT NULL,
    layer INTEGER(10) NOT NULL,
    linkType VARCHAR(1000) NOT NULL,
    position INTEGER(10) DEFAULT 999 NOT NULL
);


-- Create the table all_tweets.
CREATE TABLE all_tweets (
    tweet_number INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tweet VARCHAR(1000) NOT NULL,
    tweet_date VARCHAR(1000) NOT NULL,
    favorites INTEGER(10) NOT NULL,
    retweets INTEGER(10)NULL,
    tweet_id BIGINT(25) NOT NULL,
    name VARCHAR(1000) NOT NULL,
    layer INTEGER(10) NOT NULL,
    linkType VARCHAR(1000) NOT NULL,
    position INTEGER(10) DEFAULT 999 NOT NULL
);
-- Create the table quotes.
CREATE TABLE quotes (
    id INT NOT NULL AUTO_INCREMENT,
    quote VARCHAR(800) NOT NULL,
    rating VARCHAR(6) NOT NULL,
    source VARCHAR(255) NOT NULL,
    year YEAR(4) DEFAULT NULL,
    PRIMARY KEY (id)
);
