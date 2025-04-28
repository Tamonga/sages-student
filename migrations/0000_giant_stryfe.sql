-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `SystemeScolaires` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Name` text NOT NULL,
	`PrimaryOwner` text NOT NULL,
	`SecondaryOwner` text,
	`Description` text,
	`Country` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text
);
--> statement-breakpoint
CREATE TABLE `Enseignements` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Code` text NOT NULL,
	`Name` text NOT NULL,
	`Description` text,
	`SystemeScolaireId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`SystemeScolaireId`) REFERENCES `SystemeScolaires`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Niveaus` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Code` text NOT NULL,
	`Name` text NOT NULL,
	`Ranking` integer NOT NULL,
	`Description` text,
	`EnseignementId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`EnseignementId`) REFERENCES `Enseignements`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Series` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Code` text NOT NULL,
	`Name` text NOT NULL,
	`Description` text,
	`EnseignementId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`EnseignementId`) REFERENCES `Enseignements`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Classes` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Code` text NOT NULL,
	`Name` text NOT NULL,
	`Description` text,
	`NiveauId` text NOT NULL,
	`SerieId` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`SerieId`) REFERENCES `Series`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`NiveauId`) REFERENCES `Niveaus`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Ecoles` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Code` text NOT NULL,
	`FullName` text NOT NULL,
	`ShortName` text NOT NULL,
	`Description` text,
	`Address` text,
	`Establishment` text,
	`MainEmail` text,
	`MainPhone` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text
);
--> statement-breakpoint
CREATE TABLE `SalleClasses` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Code` text NOT NULL,
	`Name` text NOT NULL,
	`Description` text,
	`AnneeScolaireId` text,
	`ClasseId` text,
	`EcoleId` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`EcoleId`) REFERENCES `Ecoles`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ClasseId`) REFERENCES `Classes`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`AnneeScolaireId`) REFERENCES `AnneeScolaires`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Genders` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `TimeTableItemStatus` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `TimeTableItemTypes` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `AbsenceTypes` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `AttendanceTypes` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Status` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `TimeTables` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Description` text,
	`SalleClasseId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`SalleClasseId`) REFERENCES `SalleClasses`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Inscriptions` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`DateInscription` text NOT NULL,
	`EndInscription` text NOT NULL,
	`StatusCode` text DEFAULT 'A' NOT NULL,
	`Description` text,
	`EleveId` text NOT NULL,
	`SalleClasseId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`SalleClasseId`) REFERENCES `SalleClasses`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`EleveId`) REFERENCES `Eleves`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`StatusCode`) REFERENCES `Status`(`Code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `AnneeScolaires` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`StartDate` text NOT NULL,
	`EndDate` text NOT NULL,
	`Description` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text
);
--> statement-breakpoint
CREATE TABLE `Matieres` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Code` text NOT NULL,
	`Name` text NOT NULL,
	`Description` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text
);
--> statement-breakpoint
CREATE TABLE `SalleClasseMatieres` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Coefficient` real NOT NULL,
	`Description` text,
	`SalleClasseId` text NOT NULL,
	`MatiereId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`SalleClasseId`) REFERENCES `SalleClasses`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`MatiereId`) REFERENCES `Matieres`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Eleves` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Number` text NOT NULL,
	`LastName` text NOT NULL,
	`FirstName` text NOT NULL,
	`OtherNames` text,
	`GenderCode` text NOT NULL,
	`DateOfBirth` text NOT NULL,
	`Email` text,
	`Phone` text,
	`Description` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`GenderCode`) REFERENCES `Genders`(`Code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Enseignants` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Number` text,
	`LastName` text NOT NULL,
	`FirstName` text NOT NULL,
	`OtherNames` text,
	`GenderCode` text NOT NULL,
	`DateOfBirth` text NOT NULL,
	`Email` text,
	`Phone` text,
	`Description` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`GenderCode`) REFERENCES `Genders`(`Code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Instructions` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`Date` text NOT NULL,
	`ActualStartTime` integer NOT NULL,
	`ActualEndTime` integer NOT NULL,
	`Description` text,
	`TimeTableItemId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`TimeTableItemId`) REFERENCES `TimeTableItems`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PortfolioEnseignants` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`StartDate` text NOT NULL,
	`EndDate` text NOT NULL,
	`Description` text,
	`StatusCode` text DEFAULT 'A' NOT NULL,
	`SalleClasseMatiereId` text NOT NULL,
	`EnseignantId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`EnseignantId`) REFERENCES `Enseignants`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`SalleClasseMatiereId`) REFERENCES `SalleClasseMatieres`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`StatusCode`) REFERENCES `Status`(`Code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `TimeTableItems` (
	`Id` text PRIMARY KEY DEFAULT (hex(randomblob(16))),
	`ScheduledDate` text NOT NULL,
	`ScheduledStartTime` integer NOT NULL,
	`Description` text,
	`TimeTableId` text NOT NULL,
	`StatusCode` text DEFAULT 'P' NOT NULL,
	`TypeCode` text DEFAULT 'I' NOT NULL,
	`MatiereId` text,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	`ScheduledEndTime` text,
	FOREIGN KEY (`MatiereId`) REFERENCES `Matieres`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`TypeCode`) REFERENCES `TimeTableItemTypes`(`Code`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`StatusCode`) REFERENCES `TimeTableItemStatus`(`Code`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`TimeTableId`) REFERENCES `TimeTables`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `TypeSagesUsers` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `TypeSagesResources` (
	`Code` text PRIMARY KEY,
	`Value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `SagesUserResources` (
	`Id` text PRIMARY KEY DEFAULT '(hex(randomblob(16)))',
	`TypeResource` text NOT NULL,
	`UserId` text NOT NULL,
	`ResourceId` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`UserId`) REFERENCES `SagesUsers`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`TypeResource`) REFERENCES `TypeSagesResources`(`Code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `SagesUsers` (
	`Id` text PRIMARY KEY DEFAULT '(hex(randomblob(16)))',
	`Login` text NOT NULL,
	`Password` text NOT NULL,
	`Salt` text NOT NULL,
	`Type` text NOT NULL,
	`Status` text NOT NULL,
	`Email` text NOT NULL,
	`Phone` text NOT NULL,
	`CreatedBy` text NOT NULL,
	`DateCreated` text NOT NULL,
	`ModifiedBy` text,
	`DateModified` text,
	FOREIGN KEY (`Status`) REFERENCES `Status`(`Code`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`Type`) REFERENCES `TypeSagesUsers`(`Code`) ON UPDATE no action ON DELETE no action
);

*/