import { PersonalInformation } from "./personal-Information.model";
export interface MedicalHistory {
  id: number;
  personalInformation: PersonalInformation;
  preExistingConditions: string;
  currentMedications: string;
  allergies: string;
  previousTransplants: string;
  dateDataEntry: string ;
  parent: string;
  idParent : string;
}
export class MedicHistoryImpl implements MedicalHistory {
  id: number;
  personalInformation: PersonalInformation;
  preExistingConditions: string;
  currentMedications: string;
  allergies: string;
  previousTransplants: string;
  dateDataEntry: string;
  parent: string;
  idParent: string;
  constructor(
    id: number,
    personalInformation: PersonalInformation,
    preExistingConditions: string,
    currentMedications: string,
    allergies: string,
    previousTransplants: string,
    dateDataEntry: string,
    parent: string,
    idParent : string
  ) {
    this.id = id;
    this.personalInformation = personalInformation;
    this.preExistingConditions = preExistingConditions;
    this.currentMedications = currentMedications;
    this.allergies = allergies;
    this.previousTransplants = previousTransplants;
    this.dateDataEntry = dateDataEntry;
    this.parent = parent;
    this.idParent = idParent;
  }
}
