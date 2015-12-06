DROP TABLE IF EXISTS UserDares;
DROP TABLE IF EXISTS Dares;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	Email VARCHAR(64) NOT NULL,
	Password VARCHAR(32) NOT NULL,
	Token CHAR(128),
	PRIMARY KEY (Email)
);

CREATE TABLE Dares (
	Id MEDIUMINT NOT NULL AUTO_INCREMENT,
	Title VARCHAR(128) NOT NULL,
	Description VARCHAR(2048) NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE UserDares (
	UserDareId MEDIUMINT NOT NULL AUTO_INCREMENT,
	DareId MEDIUMINT NOT NULL,
	SenderEmail VARCHAR(64) NOT NULL,
	ReceiverEmail VARCHAR(64) NOT NULL,
	CauseId INT(128) NOT NULL,
	Amount INT(32) NOT NULL,
	Evidence VARCHAR(2048),
	Status INT(3) NOT NULL DEFAULT 0,
	Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (UserDareId),
	FOREIGN KEY (SenderEmail) REFERENCES Users(Email),
	FOREIGN KEY (DareId) REFERENCES Dares(Id)
);