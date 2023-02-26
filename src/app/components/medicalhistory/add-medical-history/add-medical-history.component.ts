import { MedicalHistoryService } from './../../services/medicalHistory.service';
import { Component } from '@angular/core';
import { MedicalHistory } from './../../models/medicalHistory.model';
import { PersonalInformation } from './../../models/personal-Information.model';
import { PersonalInformationService } from './../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';
import { Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError, Subscription } from 'rxjs';
@Component({
  selector: 'app-add-medical-history',
  templateUrl: './add-medical-history.component.html',
  styleUrls: ['./add-medical-history.component.scss']
})
export class AddMedicalHistoryComponent implements OnInit {
  dropdownItems: any;
  myForm: FormGroup;
  currentPath: string = '';
  medicalNodeResult: MedicalHistory;
  @Input() showButtons: boolean;
  @Input() formPerson: PersonalInformation;
  @Input() resetPersonalInformationForm: boolean;
  listOfPersonInformations : PersonalInformation[]=[]
  subscription : Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private showDashboardService: ShowDashBoardService,
    private medicalHistoryService: MedicalHistoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private personalInformationService : PersonalInformationService
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
    this.subscription.add(this.personalInformationService.findAllOnlyIdAndMail().subscribe(res=>{
      res.forEach((item: any)=>{
        item['displayedField'] = item.id + '/'+item.email
      })
      this.listOfPersonInformations = res
    }))
    console.log(this.myForm);
    if (this.currentPath != undefined) {
      this.showDashboardService.setBoolean(false);
    }

    if (
      this.formPerson != undefined &&
      this.resetPersonalInformationForm == false
    ) {
      // console.log(this.formPerson);
      // this.myForm.controls['address'].setValue(this.formPerson.address);
      // this.myForm.controls['firstname'].setValue(this.formPerson.firstname);
      // this.myForm.controls['lastname'].setValue(this.formPerson.lastname);
      // this.myForm.controls['email'].setValue(this.formPerson.email);
      // this.myForm.controls['phoneNumber'].setValue(this.formPerson.phoneNumber);
      // this.myForm.controls['age'].setValue(this.formPerson.age);
    
      // this.myForm.controls['id'].setValue(this.formPerson.id);
    }
    if(this.myForm.value.dateDateEntry == undefined){
      let dateString = this.getTodaysDate();
      let todaysDate = this.parseToDate(dateString);
      this.myForm.controls['dateDataEntry'].setValue(todaysDate);
    }
  }

  createForm(): FormGroup<any> {
    return this.formBuilder.group({
      id : [null , null],
      allergies: [null,null],
      preExistingConditions: [null, [Validators.required]],
      currentMedications: [null, null],
      previousTransplants: [null, null],
      dateDataEntry: [null, Validators.required],
      parent : [null , Validators.required]
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
      dateDataEntry: this.formatDate(medicalHistory.dateDataEntry),
      personalInformation: this.myForm.value,
    });
  }


  doSaveCreateScreen(){
    this.myForm.controls['parent'].setValue(this.myForm.value.parent.id)
    this.medicalHistoryService.createMedicalHistory(this.myForm.value).subscribe(
      (value) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: this.myForm.value['preExistingConditions'] + ' Saved Successfully',
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
        console.log(error)
      }
    );
    
  }

  doSave(): Observable<MedicalHistory> {
    

    return this.medicalHistoryService
      .createMedicalHistory(this.myForm.value)
      .pipe(
        tap((value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: this.myForm.value['preExistingConditions'] + ' Saved Successfully',
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
          console.log(error)
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
