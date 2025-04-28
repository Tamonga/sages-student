import { Subject } from "./Subject";

export interface Evaluation {
    subject : Subject;
    typeEval : string;
    mark : Number;
    totalMark : Number;
}