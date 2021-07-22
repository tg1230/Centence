-- put cv in folder, getInfo on folder and give read privileges to postgres at bottom
COPY accounts(username, password, email, created_on, last_login)
    FROM 'filepath/mock_account_data.csv'
    DELIMITER ','
    CSV HEADER;

COPY entries(user_id, text, date)
    FROM 'filepath/mock_entry_data.csv'
    DELIMITER ','
    CSV HEADER;