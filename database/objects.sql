CREATE DATABASE BookStore;
GO;
use BookStore;
GO;

CREATE TABLE books(
    BookID INT PRIMARY KEY IDENTITY(1,1), 
    Title VARCHAR(50) NOT NULL, 
    Author VARCHAR(50) NOT NULL, 
    PublicationYear DATE NOT NULL, 
    Status VARCHAR(20) DEFAULT 'available'
);


CREATE TABLE members(
    MemberID INT PRIMARY KEY IDENTITY(1,1), 
    FullName VARCHAR(50) NOT NULL, 
    Address VARCHAR(50), 
    ContactNumber VARCHAR(15) NOT NULL,
    password VARCHAR(255)
);



CREATE TABLE loans(
    LoanID INT PRIMARY KEY IDENTITY(1,1), 
    BookID INT REFERENCES books(BookID), 
    MemberID INT REFERENCES members(MemberID), 
    LoanDate DATE, 
    ReturnDate DATE
);


--- delete objects

--DROP TABLE loans;
--DROP TABLE members;
--DROP TABLE books;