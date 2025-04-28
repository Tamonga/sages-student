import { relations } from "drizzle-orm/relations";
import { systemeScolaires, enseignements, niveaus, series, classes, ecoles, salleClasses, anneeScolaires, timeTables, inscriptions, eleves, status, salleClasseMatieres, matieres, genders, enseignants, timeTableItems, instructions, portfolioEnseignants, timeTableItemTypes, timeTableItemStatus, sagesUsers, sagesUserResources, typeSagesResources, typeSagesUsers } from "./schema";

export const enseignementsRelations = relations(enseignements, ({one, many}) => ({
	systemeScolaire: one(systemeScolaires, {
		fields: [enseignements.systemeScolaireId],
		references: [systemeScolaires.id]
	}),
	niveaus: many(niveaus),
	series: many(series),
}));

export const systemeScolairesRelations = relations(systemeScolaires, ({many}) => ({
	enseignements: many(enseignements),
}));

export const niveausRelations = relations(niveaus, ({one, many}) => ({
	enseignement: one(enseignements, {
		fields: [niveaus.enseignementId],
		references: [enseignements.id]
	}),
	classes: many(classes),
}));

export const seriesRelations = relations(series, ({one, many}) => ({
	enseignement: one(enseignements, {
		fields: [series.enseignementId],
		references: [enseignements.id]
	}),
	classes: many(classes),
}));

export const classesRelations = relations(classes, ({one, many}) => ({
	series: one(series, {
		fields: [classes.serieId],
		references: [series.id]
	}),
	niveau: one(niveaus, {
		fields: [classes.niveauId],
		references: [niveaus.id]
	}),
	salleClasses: many(salleClasses),
}));

export const salleClassesRelations = relations(salleClasses, ({one, many}) => ({
	ecole: one(ecoles, {
		fields: [salleClasses.ecoleId],
		references: [ecoles.id]
	}),
	class: one(classes, {
		fields: [salleClasses.classeId],
		references: [classes.id]
	}),
	anneeScolaire: one(anneeScolaires, {
		fields: [salleClasses.anneeScolaireId],
		references: [anneeScolaires.id]
	}),
	timeTables: many(timeTables),
	inscriptions: many(inscriptions),
	salleClasseMatieres: many(salleClasseMatieres),
}));

export const ecolesRelations = relations(ecoles, ({many}) => ({
	salleClasses: many(salleClasses),
}));

export const anneeScolairesRelations = relations(anneeScolaires, ({many}) => ({
	salleClasses: many(salleClasses),
}));

export const timeTablesRelations = relations(timeTables, ({one, many}) => ({
	salleClass: one(salleClasses, {
		fields: [timeTables.salleClasseId],
		references: [salleClasses.id]
	}),
	timeTableItems: many(timeTableItems),
}));

export const inscriptionsRelations = relations(inscriptions, ({one}) => ({
	salleClass: one(salleClasses, {
		fields: [inscriptions.salleClasseId],
		references: [salleClasses.id]
	}),
	eleve: one(eleves, {
		fields: [inscriptions.eleveId],
		references: [eleves.id]
	}),
	status: one(status, {
		fields: [inscriptions.statusCode],
		references: [status.code]
	}),
}));

export const elevesRelations = relations(eleves, ({one, many}) => ({
	inscriptions: many(inscriptions),
	gender: one(genders, {
		fields: [eleves.genderCode],
		references: [genders.code]
	}),
}));

export const statusRelations = relations(status, ({many}) => ({
	inscriptions: many(inscriptions),
	portfolioEnseignants: many(portfolioEnseignants),
	sagesUsers: many(sagesUsers),
}));

export const salleClasseMatieresRelations = relations(salleClasseMatieres, ({one, many}) => ({
	salleClass: one(salleClasses, {
		fields: [salleClasseMatieres.salleClasseId],
		references: [salleClasses.id]
	}),
	matiere: one(matieres, {
		fields: [salleClasseMatieres.matiereId],
		references: [matieres.id]
	}),
	portfolioEnseignants: many(portfolioEnseignants),
}));

export const matieresRelations = relations(matieres, ({many}) => ({
	salleClasseMatieres: many(salleClasseMatieres),
	timeTableItems: many(timeTableItems),
}));

export const gendersRelations = relations(genders, ({many}) => ({
	eleves: many(eleves),
	enseignants: many(enseignants),
}));

export const enseignantsRelations = relations(enseignants, ({one, many}) => ({
	gender: one(genders, {
		fields: [enseignants.genderCode],
		references: [genders.code]
	}),
	portfolioEnseignants: many(portfolioEnseignants),
}));

export const instructionsRelations = relations(instructions, ({one}) => ({
	timeTableItem: one(timeTableItems, {
		fields: [instructions.timeTableItemId],
		references: [timeTableItems.id]
	}),
}));

export const timeTableItemsRelations = relations(timeTableItems, ({one, many}) => ({
	instructions: many(instructions),
	matiere: one(matieres, {
		fields: [timeTableItems.matiereId],
		references: [matieres.id]
	}),
	timeTableItemType: one(timeTableItemTypes, {
		fields: [timeTableItems.typeCode],
		references: [timeTableItemTypes.code]
	}),
	timeTableItemStatus: one(timeTableItemStatus, {
		fields: [timeTableItems.statusCode],
		references: [timeTableItemStatus.code]
	}),
	timeTable: one(timeTables, {
		fields: [timeTableItems.timeTableId],
		references: [timeTables.id]
	}),
}));

export const portfolioEnseignantsRelations = relations(portfolioEnseignants, ({one}) => ({
	enseignant: one(enseignants, {
		fields: [portfolioEnseignants.enseignantId],
		references: [enseignants.id]
	}),
	salleClasseMatiere: one(salleClasseMatieres, {
		fields: [portfolioEnseignants.salleClasseMatiereId],
		references: [salleClasseMatieres.id]
	}),
	status: one(status, {
		fields: [portfolioEnseignants.statusCode],
		references: [status.code]
	}),
}));

export const timeTableItemTypesRelations = relations(timeTableItemTypes, ({many}) => ({
	timeTableItems: many(timeTableItems),
}));

export const timeTableItemStatusRelations = relations(timeTableItemStatus, ({many}) => ({
	timeTableItems: many(timeTableItems),
}));

export const sagesUserResourcesRelations = relations(sagesUserResources, ({one}) => ({
	sagesUser: one(sagesUsers, {
		fields: [sagesUserResources.userId],
		references: [sagesUsers.id]
	}),
	typeSagesResource: one(typeSagesResources, {
		fields: [sagesUserResources.typeResource],
		references: [typeSagesResources.code]
	}),
}));

export const sagesUsersRelations = relations(sagesUsers, ({one, many}) => ({
	sagesUserResources: many(sagesUserResources),
	status: one(status, {
		fields: [sagesUsers.status],
		references: [status.code]
	}),
	typeSagesUser: one(typeSagesUsers, {
		fields: [sagesUsers.type],
		references: [typeSagesUsers.code]
	}),
}));

export const typeSagesResourcesRelations = relations(typeSagesResources, ({many}) => ({
	sagesUserResources: many(sagesUserResources),
}));

export const typeSagesUsersRelations = relations(typeSagesUsers, ({many}) => ({
	sagesUsers: many(sagesUsers),
}));