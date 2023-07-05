-- stored procedures


-- books stored procedures

CREATE OR ALTER PROC dbo.create_new_book (
    @Title VARCHAR(50),
    @Author VARCHAR(50),
    @PublicationYear DATE,
    @Status VARCHAR(20) = 'available'
)

AS 

BEGIN
    INSERT INTO dbo.books (Title, Author, PublicationYear) VALUES(@Title, @Author, @PublicationYear);
END

GO


-- get book by id

CREATE OR ALTER PROC dbo.get_book_by_id (
    @BookID INT
)

AS 

BEGIN 
    SELECT * FROM dbo.books b WHERE [Status] = 'available' AND BookID = @BookID;
END

GO

-- all available books


CREATE OR ALTER PROC dbo.get_all_available_books 

AS 

BEGIN 
    SELECT * FROM dbo.books b WHERE [Status] = 'available';
END

GO

-- members stored procedures
-- create member

CREATE OR ALTER PROC dbo.create_new_member (
    @FullName VARCHAR(50),
    @Address VARCHAR(50),
    @ContactNumber VARCHAR(15),
    @password VARCHAR(255)
)

AS 

BEGIN
    INSERT INTO dbo.members VALUES(@FullName, @Address, @ContactNumber, @password);
END

DROP PROC  dbo.create_new_member

GO 


-- get a member by ID

CREATE OR ALTER PROC dbo.get_member_byID (
    @MemberID INT
)

AS 

BEGIN
    SELECT * FROM dbo.members WHERE MemberID = @MemberID;
END

GO 


-- members who have borrowed a book

CREATE OR ALTER PROC dbo.members_with_books

AS
BEGIN
    SELECT  * FROM dbo.BorrowedBooksView
END
GO



-- loans stored procedures

CREATE OR ALTER PROC dbo.create_new_loan (
    @BookID INT,
    @MemberID INT,
    @LoanDate DATE = TIMESTAMP,
    @ReturnDate DATE = NUll
)

AS 

BEGIN
    INSERT INTO dbo.loans VALUES(@BookID, @MemberID, @LoanDate, @ReturnDate);
END

select * from dbo.members