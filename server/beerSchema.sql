    DROP DATABASE IF EXISTS beer;
    CREATE DATABASE beer;
    USE beer; 


    CREATE TABLE brewery (
        id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
        breweryName VARCHAR(255) UNIQUE
    );
    
    CREATE TABLE beers (
        id INTEGER AUTO_INCREMENT,
        beerName VARCHAR(255) NOT NULL UNIQUE,
        typ VARCHAR(255) NOT NULL UNIQUE,
        descr VARCHAR(255) NOT NULL UNIQUE,
        abv INTEGER  NOT NULL UNIQUE,
        rankk INTEGER  NOT NULL UNIQUE,
        brewery_id INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY(id),
        FOREIGN KEY(brewery_id) REFERENCES brewery(id)
    );

    -- INSERT INTO brewery (breweryName) values ("all");


