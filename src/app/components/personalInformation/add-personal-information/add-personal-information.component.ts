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
    this.addMedicalHistory();
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
  }
  createForm(): FormGroup<any> {
    return this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, Validators.required],
      medicalHistoryList: this.formBuilder.array([]),
    });
  }

  get medicalHistoryGroupArray() {
    return this.myForm.get('medicalHistoryList') as FormArray;
  }

  newMedicalHistoryGroup(): FormGroup {
    return this.formBuilder.group({
      preExistingConditions: '',
      currentMedications: '',
      allergies: '',
      previousTransplants: '',
      dateDataEntry: null,
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
      },
    });
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
          return throwError(error);
        })
      );
  }
}
