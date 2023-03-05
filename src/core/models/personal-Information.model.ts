import { MedicalHistory } from './medicalHistory.model';
export interface PersonalInformation {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    phoneNumber: string;
    age: number;
    medicalHistoryList : MedicalHistory[];
  }
  export class PersonImpl implements PersonalInformation {
    constructor(
      public id: number,
      public firstname: string,
      public lastname: string,
      public address: string,
      public email: string,
      public phoneNumber: string,
      public age: number,
    public medicalHistoryList : MedicalHistory[]
    ) {}
  }