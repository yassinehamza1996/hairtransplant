import { HairLossControllerService } from './../../../../core/api/client/api/hairLossController.service';
import { HairLoss } from './../../../../core/api/client/model/hairLoss';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription, Observable, tap, catchError, throwError } from 'rxjs';
import {  PersonalInformation } from 'src/core/api/client';
import { PersonalInformationService } from '../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';

@Component({
  selector: 'app-add-hairloss',
  templateUrl: './add-hairloss.component.html',
  styleUrls: ['./add-hairloss.component.scss']
})
export class AddHairlossComponent {
  dropdownItems: any;
  myForm: FormGroup;
  currentPath: string = '';
  medicalNodeResult: HairLoss;
  @Input() showButtons: boolean;
  @Input() formHairLoss: HairLoss;
  @Input() resethairLossForm: boolean;

  listOfPersonInformations: PersonalInformation[] = [];
  subscription: Subscription = new Subscription();
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private showDashboardService: ShowDashBoardService,
    private HairLossService: HairLossControllerService,
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
          if (this.formHairLoss?.idParent != null) {
            let parentIndex = this.listOfPersonInformations.findIndex(
              (p: PersonalInformation) =>
                p.id == parseInt(this.formHairLoss.idParent as string)
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
      this.formHairLoss != undefined &&
      this.resethairLossForm == false
    ) 
    {
      console.log(this.formHairLoss);
      // this.myForm.controls['alcohol'].setValue(this.formHairLoss.alcohol);
      // this.myForm.controls['diet'].setValue(
      //   this.formHairLoss.diet
      // );
      // console.log('date', this.formHairLoss.dateDataEntry);
      // this.myForm.controls['dateDataEntry'].setValue(
      //   this.formHairLoss.dateDataEntry
      // );
      // this.myForm.controls['exercise'].setValue(
      //   this.formHairLoss.exercise
      // );
      // this.myForm.controls['tobacco'].setValue(
      //   this.formHairLoss.tobacco
      // );

      // this.myForm.controls['id'].setValue(this.formHairLoss.id);
    }
    if (
      this.myForm.value.dateDateEntry == undefined &&
      this.formHairLoss?.dateDataEntry == undefined
    ) {
      let dateString = this.getTodaysDate();
      let todaysDate = this.parseToDate(dateString);
      this.myForm.controls['dateDataEntry'].setValue(todaysDate);
    }
    console.log(this.myForm);
    console.log(this.formHairLoss)
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
      extent: [null, null],
      cause: [null, [Validators.required]],
      pattern: [null, null],
      dateDataEntry: [null, Validators.required],
      parent: [null, Validators.required],
    });
  }

  get hairLossGroupArray() {
    return this.myForm.get('hairLossList') as FormArray;
  }


  doSaveCreateScreen() {
    this.myForm.controls['parent'].setValue(this.myForm.value.parent.id);
    if (this.myForm.controls['dateDataEntry'] != undefined) {
      if (this.myForm.controls['dateDataEntry'].value instanceof Date) {
        this.myForm.controls['dateDataEntry'].setValue(
          this.formatDateToString(this.myForm.controls['dateDataEntry'].value)
        );
      }
    }
    
    this.HairLossService
      .createHairLoss(this.myForm.value)
      .subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:
              this.myForm.value.cause +
              ' Saved Successfully',
          });
          setTimeout(() => {
            // code to execute after 1 second
            this.router.navigate(['/listhairloss']);
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

  //this method is sued to update the medical History Entity
  doSave(): Observable<HairLoss> {
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
    return this.HairLossService
      .updateHairLoss(this.myForm.value.id, this.myForm.value)
      .pipe(
        tap((value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:
              this.myForm.value['cause'] +
              ' Saved Successfully',
          });
          this.router.navigate(['/listhairloss']);
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
