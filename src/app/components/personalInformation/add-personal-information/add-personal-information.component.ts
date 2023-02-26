import { MedicalHistory } from './../../models/medicalHistory.model';
import { PersonalInformation } from './../../models/personal-Information.model';
import { PersonalInformationService } from './../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';
@Component({
  selector: 'app-add-personal-information',
  templateUrl: './add-personal-information.component.html',
  styleUrls: ['./add-personal-information.component.scss'],
})
export class AddPersonalInformationComponent implements OnInit {
  dropdownItems: any;
  myForm: FormGroup;
  currentPath: string = '';
  personNodeResult: PersonalInformation;
  @Input() showButtons: boolean;
  @Input() formPerson: PersonalInformation;
  @Input() resetPersonalInformationForm: boolean;
  showEditTitle: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private showDashboardService: ShowDashBoardService,
    private personalInformationService: PersonalInformationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.myForm = this.createForm();
    this.route.url.subscribe((url) => {
      this.currentPath = url.join('/');
    });
  }

  ngOnInit() {
    if (this.showButtons == undefined) {
      this.showButtons = true;
    }
    console.log(this.myForm);
    if (this.currentPath != undefined) {
      this.showDashboardService.setBoolean(false);
    }

    if (
      this.formPerson != undefined &&
      this.resetPersonalInformationForm == false
    ) {
      this.showEditTitle = true;
      console.log(this.formPerson);
      this.myForm.controls['address'].setValue(this.formPerson.address);
      this.myForm.controls['firstname'].setValue(this.formPerson.firstname);
      this.myForm.controls['lastname'].setValue(this.formPerson.lastname);
      this.myForm.controls['email'].setValue(this.formPerson.email);
      this.myForm.controls['phoneNumber'].setValue(this.formPerson.phoneNumber);
      this.myForm.controls['age'].setValue(this.formPerson.age);
      if (this.formPerson.medicalHistoryList != undefined) {
        this.formPerson.medicalHistoryList.forEach((item) => {
          this.medicalHistoryGroupArray.push(
            this.newEditMedicalHistoryGroup(item)
          );
        });
      }
      this.myForm.controls['id'].setValue(this.formPerson.id);
    } else {
      this.addMedicalHistory();
    }
  
  }

  createForm(): FormGroup<any> {
    return this.formBuilder.group({
      id: [null, null],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, Validators.required],
      medicalHistoryList: this.formBuilder.array([]),
    });
  }

  getTodaysDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString().slice(-2);
    const todayFormatted = `${day}/${month}/${year}`;
    return todayFormatted;
  }

  parseToDate(dateString: string) {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year + 2000, month - 1, day);
    return date;
  }

  get medicalHistoryGroupArray() {
    return this.myForm.get('medicalHistoryList') as FormArray;
  }

  newMedicalHistoryGroup(): FormGroup {
    return this.formBuilder.group({
      id: '',
      preExistingConditions: '',
      currentMedications: '',
      allergies: '',
      previousTransplants: '',
      dateDataEntry: !this.showEditTitle ? this.parseToDate(this.getTodaysDate()) : null,
      personalInformation: this.myForm.value,
    });
  }

  newEditMedicalHistoryGroup(medicalHistory: MedicalHistory): FormGroup {
    return this.formBuilder.group({
      preExistingConditions: medicalHistory.preExistingConditions,
      currentMedications: medicalHistory.currentMedications,
      allergies: medicalHistory.allergies,
      previousTransplants: medicalHistory.previousTransplants,
      dateDataEntry: this.formatDate(medicalHistory.dateDataEntry),
      personalInformation: this.myForm.value,
    });
  }

  addMedicalHistory() {
    this.medicalHistoryGroupArray.push(this.newMedicalHistoryGroup());
  }

  removeMedicalHistory(i: number) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected Medical History Node?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicalHistoryGroupArray.removeAt(i);
        return;
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  doSaveCreateScreen() {
    if (
      this.myForm.value.medicalHistoryList != undefined &&
      this.myForm.value.medicalHistoryList.length != 0
    ) {
      this.myForm.value.medicalHistoryList.forEach((res: any) => {
        res.personalInformation = {
          firstname: this.myForm.value.firstname,
          lastname: this.myForm.value.lastname,
          address: this.myForm.value.address,
          age: this.myForm.value.age,
          email: this.myForm.value.email,
          phoneNumber: this.myForm.value.phoneNumber,
        };
        if (typeof res.dateDataEntry === 'string') {
          res.dateDataEntry = this.formatToLongDate(res.dateDataEntry);
        }
      });
    }

    this.personalInformationService
      .savePersonalInformation(this.myForm.value)
      .subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: this.myForm.value['firstname'] + ' Saved Successfully',
          });
          setTimeout(() => {
            // code to execute after 1 second
            this.router.navigate(['/listpersonalinformation']);
          }, 1000);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error ' + error.message,
          });
          console.log(error);
        }
      );
  }

  doSave(): Observable<PersonalInformation> {
    if (
      this.myForm.value.medicalHistoryList != undefined &&
      this.myForm.value.medicalHistoryList.length != 0
    ) {
      this.myForm.value.medicalHistoryList.forEach((res: any) => {
        res.personalInformation = {
          firstname: this.myForm.value.firstname,
          lastname: this.myForm.value.lastname,
          address: this.myForm.value.address,
          age: this.myForm.value.age,
          email: this.myForm.value.email,
          phoneNumber: this.myForm.value.phoneNumber,
        };
        if (typeof res.dateDataEntry === 'string') {
          res.dateDataEntry = this.formatToLongDate(res.dateDataEntry);
        }
      });
    }

    return this.personalInformationService
      .savePersonalInformation(this.myForm.value)
      .pipe(
        tap((value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: this.myForm.value['firstname'] + ' Saved Successfully',
          });
          this.router.navigate(['/listpersonalinformation']);
          this.personNodeResult = value;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error ' + error.message,
          });
          console.log(error);
          return throwError(error);
        })
      );
  }

  formatDate(dateString: any): string {
    let date = new Date(dateString);
    let formattedDate = date.toLocaleDateString('en-GB');
    console.log(formattedDate);
    return formattedDate;
  }

  formatToLongDate(dateString: string): string {
    let parts = dateString.split('/');
    let dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0], 0, 0, 0, 0);
    let isoString = dateObject.toISOString();

    return isoString;
  }
}
