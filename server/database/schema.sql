CREATE DATABASE netflix_watchlist;

CREATE extension if not exists "uuid-ossp";

CREATE TABLE users( 
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255)
);

CREATE TABLE watchlist(
    user_id uuid NOT NULL,
    index VARCHAR NOT NULL,
    media_type VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    poster_img VARCHAR NOT NULL,
    backdrop_img VARCHAR NOT NULL,
    genres VARCHAR NOT NULL,
    overview TEXT NOT NULL,
    cast_and_credits VARCHAR NOT NULL,
    runtime INT,
    number_of_seasons INT,
    tmdb_rating VARCHAR,
    release_date DATE,
    added_to_list_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (index, media_type, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE reviews(
    user_id uuid NOT NULL,
    index VARCHAR NOT NULL,
    media_type VARCHAR NOT NULL,
    reviewer VARCHAR NOT NULL,
    title TEXT,
    body TEXT NOT NULL,
    rating DECIMAL NOT NULL,
    reviewedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (index, media_type, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


