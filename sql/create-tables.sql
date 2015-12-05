DROP TABLE IF EXISTS UserDares;
DROP TABLE IF EXISTS Dares;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	Username VARCHAR(32) NOT NULL,
	Email VARCHAR(64) NOT NULL,
	Password VARCHAR(32) NOT NULL,
	Token CHAR(128),
	PRIMARY KEY (Username)
);

CREATE TABLE Dares (
	Id MEDIUMINT NOT NULL AUTO_INCREMENT,
	Title VARCHAR(128) NOT NULL,
	Description VARCHAR(2048) NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE UserDares (
	Id MEDIUMINT NOT NULL AUTO_INCREMENT,
	DareId MEDIUMINT NOT NULL,
	SenderUsername VARCHAR(32) NOT NULL,
	ReceiverUsername VARCHAR(32) NOT NULL,
	CauseId INT(128) NOT NULL,
	Amount INT(32) NOT NULL,
	Evidence VARCHAR(2048),
	Status INT(3) NOT NULL DEFAULT 0,
	PRIMARY KEY (Id),
	FOREIGN KEY (SenderUsername) REFERENCES Users(Username),
	FOREIGN KEY (ReceiverUsername) REFERENCES Users(Username),
	FOREIGN KEY (DareId) REFERENCES Dares(Id)
);