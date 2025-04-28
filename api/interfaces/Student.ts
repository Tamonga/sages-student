import { Classroom } from "./Classroom";

export interface Student {
    number : string;
    firstName : string;
    lastName : string;
    otherNames : string;
    dateOfBirth : Date;
    email : string;
    phone : string;
    classroom : Classroom;
}