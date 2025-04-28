import { sqliteTable, AnySQLiteColumn, text, foreignKey, integer, real } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const systemeScolaires = sqliteTable("SystemeScolaires", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	name: text("Name").notNull(),
	primaryOwner: text("PrimaryOwner").notNull(),
	secondaryOwner: text("SecondaryOwner"),
	description: text("Description"),
	country: text("Country").notNull(),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const enseignements = sqliteTable("Enseignements", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	code: text("Code").notNull(),
	name: text("Name").notNull(),
	description: text("Description"),
	systemeScolaireId: text("SystemeScolaireId").notNull().references(() => systemeScolaires.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const niveaus = sqliteTable("Niveaus", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	code: text("Code").notNull(),
	name: text("Name").notNull(),
	ranking: integer("Ranking").notNull(),
	description: text("Description"),
	enseignementId: text("EnseignementId").notNull().references(() => enseignements.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const series = sqliteTable("Series", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	code: text("Code").notNull(),
	name: text("Name").notNull(),
	description: text("Description"),
	enseignementId: text("EnseignementId").notNull().references(() => enseignements.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const classes = sqliteTable("Classes", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	code: text("Code").notNull(),
	name: text("Name").notNull(),
	description: text("Description"),
	niveauId: text("NiveauId").notNull().references(() => niveaus.id),
	serieId: text("SerieId").references(() => series.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const ecoles = sqliteTable("Ecoles", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	code: text("Code").notNull(),
	fullName: text("FullName").notNull(),
	shortName: text("ShortName").notNull(),
	description: text("Description"),
	address: text("Address"),
	establishment: text("Establishment"),
	mainEmail: text("MainEmail"),
	mainPhone: text("MainPhone"),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const salleClasses = sqliteTable("SalleClasses", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	code: text("Code").notNull(),
	name: text("Name").notNull(),
	description: text("Description"),
	anneeScolaireId: text("AnneeScolaireId").references(() => anneeScolaires.id),
	classeId: text("ClasseId").references(() => classes.id),
	ecoleId: text("EcoleId").references(() => ecoles.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const genders = sqliteTable("Genders", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const timeTableItemStatus = sqliteTable("TimeTableItemStatus", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const timeTableItemTypes = sqliteTable("TimeTableItemTypes", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const absenceTypes = sqliteTable("AbsenceTypes", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const attendanceTypes = sqliteTable("AttendanceTypes", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const status = sqliteTable("Status", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const timeTables = sqliteTable("TimeTables", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	description: text("Description"),
	salleClasseId: text("SalleClasseId").notNull().references(() => salleClasses.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const inscriptions = sqliteTable("Inscriptions", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	dateInscription: text("DateInscription").notNull(),
	endInscription: text("EndInscription").notNull(),
	statusCode: text("StatusCode").default("A").notNull().references(() => status.code),
	description: text("Description"),
	eleveId: text("EleveId").notNull().references(() => eleves.id),
	salleClasseId: text("SalleClasseId").notNull().references(() => salleClasses.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const anneeScolaires = sqliteTable("AnneeScolaires", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	startDate: text("StartDate").notNull(),
	endDate: text("EndDate").notNull(),
	description: text("Description"),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const matieres = sqliteTable("Matieres", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	code: text("Code").notNull(),
	name: text("Name").notNull(),
	description: text("Description"),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const salleClasseMatieres = sqliteTable("SalleClasseMatieres", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	coefficient: real("Coefficient").notNull(),
	description: text("Description"),
	salleClasseId: text("SalleClasseId").notNull().references(() => salleClasses.id),
	matiereId: text("MatiereId").notNull().references(() => matieres.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const eleves = sqliteTable("Eleves", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	number: text("Number").notNull(),
	lastName: text("LastName").notNull(),
	firstName: text("FirstName").notNull(),
	otherNames: text("OtherNames"),
	genderCode: text("GenderCode").notNull().references(() => genders.code),
	dateOfBirth: text("DateOfBirth").notNull(),
	email: text("Email"),
	phone: text("Phone"),
	description: text("Description"),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const enseignants = sqliteTable("Enseignants", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	number: text("Number"),
	lastName: text("LastName").notNull(),
	firstName: text("FirstName").notNull(),
	otherNames: text("OtherNames"),
	genderCode: text("GenderCode").notNull().references(() => genders.code),
	dateOfBirth: text("DateOfBirth").notNull(),
	email: text("Email"),
	phone: text("Phone"),
	description: text("Description"),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const instructions = sqliteTable("Instructions", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	date: text("Date").notNull(),
	actualStartTime: integer("ActualStartTime").notNull(),
	actualEndTime: integer("ActualEndTime").notNull(),
	description: text("Description"),
	timeTableItemId: text("TimeTableItemId").notNull().references(() => timeTableItems.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const portfolioEnseignants = sqliteTable("PortfolioEnseignants", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	startDate: text("StartDate").notNull(),
	endDate: text("EndDate").notNull(),
	description: text("Description"),
	statusCode: text("StatusCode").default("A").notNull().references(() => status.code),
	salleClasseMatiereId: text("SalleClasseMatiereId").notNull().references(() => salleClasseMatieres.id),
	enseignantId: text("EnseignantId").notNull().references(() => enseignants.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const timeTableItems = sqliteTable("TimeTableItems", {
	id: text("Id").default("sql`(hex(randomblob(16)))`").primaryKey(),
	scheduledDate: text("ScheduledDate").notNull(),
	scheduledStartTime: integer("ScheduledStartTime").notNull(),
	description: text("Description"),
	timeTableId: text("TimeTableId").notNull().references(() => timeTables.id),
	statusCode: text("StatusCode").default("P").notNull().references(() => timeTableItemStatus.code),
	typeCode: text("TypeCode").default("I").notNull().references(() => timeTableItemTypes.code),
	matiereId: text("MatiereId").references(() => matieres.id),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
	scheduledEndTime: text("ScheduledEndTime"),
});

export const typeSagesUsers = sqliteTable("TypeSagesUsers", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const typeSagesResources = sqliteTable("TypeSagesResources", {
	code: text("Code").primaryKey(),
	value: text("Value").notNull(),
});

export const sagesUserResources = sqliteTable("SagesUserResources", {
	id: text("Id").default("(hex(randomblob(16)))").primaryKey(),
	typeResource: text("TypeResource").notNull().references(() => typeSagesResources.code),
	userId: text("UserId").notNull().references(() => sagesUsers.id),
	resourceId: text("ResourceId").notNull(),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

export const sagesUsers = sqliteTable("SagesUsers", {
	id: text("Id").default("(hex(randomblob(16)))").primaryKey(),
	login: text("Login").notNull(),
	password: text("Password").notNull(),
	salt: text("Salt").notNull(),
	type: text("Type").notNull().references(() => typeSagesUsers.code),
	status: text("Status").notNull().references(() => status.code),
	email: text("Email").notNull(),
	phone: text("Phone").notNull(),
	createdBy: text("CreatedBy").notNull(),
	dateCreated: text("DateCreated").notNull(),
	modifiedBy: text("ModifiedBy"),
	dateModified: text("DateModified"),
});

