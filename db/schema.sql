-- Create the database event_saver_db and specified it for use.
CREATE DATABASE trump_quotes_db;
USE trump_quotes_db;

-- Create the table events.
CREATE TABLE quotes (
    id INT NOT NULL AUTO_INCREMENT,
    quote VARCHAR(800) NOT NULL,
    rating VARCHAR(6) NOT NULL,
    source VARCHAR(255) NOT NULL,
    year YEAR(4) DEFAULT NULL,
    PRIMARY KEY (id)
);
