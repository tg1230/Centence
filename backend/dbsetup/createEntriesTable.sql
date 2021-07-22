CREATE TABLE IF NOT EXISTS accounts (
    user_id serial PRIMARY KEY,
    username varchar ( 50 ) UNIQUE NOT NULL,
    password varchar ( 50 ) NOT NULL,
    email varchar ( 255 ) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS entries (
     entry_id serial PRIMARY KEY,
     user_id INT NOT NULL,
     text character varying(200) NOT NULL,
     date date NOT NULL,
     FOREIGN KEY (user_id)
         REFERENCES accounts (user_id)
);