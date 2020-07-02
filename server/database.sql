CREATE DATABASE pernquestions;

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL,
    option4 TEXT NOT NULL,
    answer TEXT NOT NULL
);