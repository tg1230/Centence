-- put cv in folder, getInfo on folder and give read privileges to postgres at bottom
COPY entries("userID", username, text, date)
FROM 'filePath'
DELIMITER ','
CSV HEADER;