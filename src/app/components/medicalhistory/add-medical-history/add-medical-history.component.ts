import { MedicalHistoryControllerService } from './../../../../core/api/client/api/medicalHistoryController.service';
import { MedicalHistoryService } from './../../services/medicalHistory.service';
import { Component } from '@angular/core';
import { PersonalInformationService } from './../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';
import { Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError, Subscription } from 'rxjs';
import { MedicalHistory, PersonalInformation } from 'src/core/api/client';
@Component({
  selector: 'app-add-medical-history',
  templateUrl: './add-medical-history.component.html',
  styleUrls: ['./add-medical-history.component.scss'],
})
export class AddMedicalHistoryComponent implements OnInit {
  dropdownItems: any;
  myForm: FormGroup;
  currentPath: string = '';
  medicalNodeResult: MedicalHistory;
  @Input() showButtons: boolean;
  @Input() formMedical: MedicalHistory;
  @Input() resetmedicalHistoryForm: boolean;
  listOfPersonInformations: PersonalInformation[] = [];
  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private showDashboardService: ShowDashBoardService,
    private medicalHistoryService: MedicalHistoryControllerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private personalInformationService: PersonalInformationService
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
    this.subscription.add(
      this.personalInformationService
        .findAllOnlyIdAndMail()
        .subscribe((res) => {
          res.forEach((item: any) => {
            item['displayedField'] = item.id + '/' + item.email;
          });
          this.listOfPersonInformations = res;
          if (this.formMedical?.idParent != null) {
            let parentIndex = this.listOfPersonInformations.findIndex(
              (p: PersonalInformation) =>
                p.id == parseInt(this.formMedical.idParent as string)
            );
            if (parentIndex != -1) {
              this.myForm.controls['parent'].setValue(
                this.listOfPersonInformations[parentIndex]
              );
            }
          }
        })
    );
    console.log(this.myForm);
    if (this.currentPath != undefined) {
      this.showDashboardService.setBoolean(false);
    }

    if (
      this.formMedical != undefined &&
      this.resetmedicalHistoryForm == false
    ) {
      // console.log(this.formMedical);
      this.myForm.controls['allergies'].setValue(this.formMedical.allergies);
      this.myForm.controls['currentMedications'].setValue(
        this.formMedical.currentMedications
      );
      console.log('date', this.formMedical.dateDataEntry);
      this.myForm.controls['dateDataEntry'].setValue(
        this.formMedical.dateDataEntry
      );
      this.myForm.controls['preExistingConditions'].setValue(
        this.formMedical.preExistingConditions
      );
      this.myForm.controls['previousTransplants'].setValue(
        this.formMedical.previousTransplants
      );

      this.myForm.controls['id'].setValue(this.formMedical.id);
    }
    if (
      this.myForm.value.dateDateEntry == undefined &&
      this.formMedical?.dateDataEntry == undefined
    ) {
      let dateString = this.getTodaysDate();
      let todaysDate = this.parseToDate(dateString);
      this.myForm.controls['dateDataEntry'].setValue(todaysDate);
    }
  }

  onSelectDate() {
    let date = this.myForm.controls['dateDataEntry'].value;
    let day = date.getDate();
    let month = date.getMonth() + 1; // add 1 because months are indexed from 0
    let year = date.getFullYear();
    let newDate = day + '/' + month + '/' + year;
    this.myForm.controls['dateDataEntry'].setValue(newDate);
  }

  createForm(): FormGroup<any> {
    return this.formBuilder.group({
      id: [null, null],
      allergies: [null, null],
      preExistingConditions: [null, [Validators.required]],
      currentMedications: [null, null],
      previousTransplants: [null, null],
      dateDataEntry: [null, Validators.required],
      parent: [null, Validators.required],
    });
  }

  get medicalHistoryGroupArray() {
    return this.myForm.get('medicalHistoryList') as FormArray;
  }

  newEditMedicalHistoryGroup(medicalHistory: MedicalHistory): FormGroup {
    return this.formBuilder.group({
      preExistingConditions: medicalHistory.preExistingConditions,
      currentMedications: medicalHistory.currentMedications,
      allergies: medicalHistory.allergies,
      previousTransplants: medicalHistory.previousTransplants,
      dateDataEntry: medicalHistory.dateDataEntry,
      personalInformation: this.myForm.value,
    });
  }

  doSaveCreateScreenNew() {
    if (this.myForm.controls['dateDataEntry'] != undefined) {
      if (this.myForm.controls['dateDataEntry'].value instanceof Date) {
        this.myForm.controls['dateDataEntry'].setValue(
          this.formatDateToString(this.myForm.controls['dateDataEntry'].value)
        );
      }
    }
    this.myForm.controls['parent'].setValue(this.myForm.value.parent.id);
     this.medicalHistoryService
      .createMedicalHistory(this.myForm.value)
      .subscribe((value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:
              this.myForm.value['preExistingConditions'] +
              ' Saved Successfully',
          });
          setTimeout(() => {
            // code to execute after 1 second
            this.router.navigate(['/listmedicalhistory']);
          }, 1000);
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
      
  }

  doSaveCreateScreen() : Observable<MedicalHistory>{
    if (this.myForm.controls['dateDataEntry'] != undefined) {
      if (this.myForm.controls['dateDataEntry'].value instanceof Date) {
        this.myForm.controls['dateDataEntry'].setValue(
          this.formatDateToString(this.myForm.controls['dateDataEntry'].value)
        );
      }
    }
    this.myForm.controls['parent'].setValue(this.myForm.value.parent.id);
    return this.medicalHistoryService
      .createMedicalHistory(this.myForm.value)
      .pipe(
        tap((value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:
              this.myForm.value['preExistingConditions'] +
              ' Saved Successfully',
          });
          setTimeout(() => {
            // code to execute after 1 second
            this.router.navigate(['/listmedicalhistory']);
          }, 1000);
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

  //this method is sued to update the medical History Entity
  doSave(): Observable<MedicalHistory> {
    if (this.myForm.controls['dateDataEntry'] != undefined) {
      if (this.myForm.controls['dateDataEntry'].value instanceof Date) {
        this.myForm.controls['dateDataEntry'].setValue(
          this.formatDateToString(this.myForm.controls['dateDataEntry'].value)
        );
      }
    }
    if (this.myForm.value.parent != undefined) {
      this.myForm.controls['parent'].setValue(this.myForm.value.parent.id);
    }
    return this.medicalHistoryService
      .updateMedicalHistory(this.myForm.value.id, this.myForm.value)
      .pipe(
        tap((value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:
              this.myForm.value['preExistingConditions'] +
              ' Saved Successfully',
          });
          this.router.navigate(['/listmedicalhistory']);
          this.medicalNodeResult = value;
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

  formatDateToString(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // add 1 because months are indexed from 0
    let year = date.getFullYear();
    let newDate = day + '/' + month + '/' + year;
    return newDate;
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
}
