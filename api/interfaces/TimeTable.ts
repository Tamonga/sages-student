import { Subject } from "./Subject";

export interface TimeTable {
    date : Date;
    startTime : string;
    endTime : string;
    subject : Subject;
}