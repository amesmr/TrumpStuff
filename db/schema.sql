--Create the database event_saver_db and specified it for use.
CREATE DATABASE trump_quotes_db;
USE trump_quotes_db;

--Create the table events.
CREATE TABLE quotes
    (
        id int NOT NULL AUTO_INCREMENT,
        quote varchar(800) NOT NULL,
        source varchar(255) NOT NULL,
        year integer(4),
        PRIMARY KEY(id)
    );