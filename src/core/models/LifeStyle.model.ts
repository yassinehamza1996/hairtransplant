import { PersonalInformation } from "./personal-Information.model";

export class LifeStyle {
    id: number;
    personalInformation: PersonalInformation;
    diet: string;
    exercise: string;
    alcohol: YesNoEnum;
    tobacco: YesNoEnum;
    dateDataEntry: string;
    parent: string;
    idParent : string;
    }
    
    export enum YesNoEnum {
    YES = 'YES',
    NO = 'NO'
    }
