import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription, Observable, tap, catchError, throwError } from 'rxjs';
import { Goals, PersonalInformation, GoalsControllerService } from 'src/core/api/client';
import { PersonalInformationService } from '../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.scss'],
})
export class AddGoalsComponent {
  dropdownItems: any;
  myForm: FormGroup;
  currentPath: string = '';
  medicalNodeResult: Goals;
  @Input() showButtons: boolean;
  @Input() formGoals: Goals;
  @Input() resetGoalsForm: boolean;

  listOfPersonInformations: PersonalInformation[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private showDashboardService: ShowDashBoardService,
    private GoalsService: GoalsControllerService,
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
          if (this.formGoals?.idParent != null) {
            let parentIndex = this.listOfPersonInformations.findIndex(
              (p: PersonalInformation) =>
                p.id == parseInt(this.formGoals.idParent as string)
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

    if (this.formGoals != undefined && this.resetGoalsForm == false) {
      console.log(this.formGoals);
      this.myForm.controls['budget'].setValue(this.formGoals.budget);
      this.myForm.controls['expectations'].setValue(this.formGoals.expectations);
      console.log('date', this.formGoals.dateDataEntry);
      this.myForm.controls['dateDataEntry'].setValue(
        this.formGoals.dateDataEntry
      );
      this.myForm.controls['outcome'].setValue(this.formGoals.outcome);

      this.myForm.controls['id'].setValue(this.formGoals.id);
    }
    if (
      this.myForm.value.dateDateEntry == undefined &&
      this.formGoals?.dateDataEntry == undefined
    ) {
      let dateString = this.getTodaysDate();
      let todaysDate = this.parseToDate(dateString);
      this.myForm.controls['dateDataEntry'].setValue(todaysDate);
    }
    console.log(this.myForm);
    console.log(this.formGoals);
  }

  onSelectDate() {
    let date = this.myForm.controls['dateDataEntry'].value;
    let day = date.getDate();
    let month = date.getMonth() + 1; // add 1 beexpectations months are indexed from 0
    let year = date.getFullYear();
    let newDate = day + '/' + month + '/' + year;
    this.myForm.controls['dateDataEntry'].setValue(newDate);
  }

  createForm(): FormGroup<any> {
    return this.formBuilder.group({
      id: [null, null],
      budget: [null, null],
      expectations: [null, [Validators.required]],
      outcome: [null, null],
      dateDataEntry: [null, Validators.required],
      parent: [null, Validators.required],
    });
  }

  get GoalsGroupArray() {
    return this.myForm.get('GoalsList') as FormArray;
  }
  doSaveCreateScreenNew(){
    this.myForm.controls['parent'].setValue(this.myForm.value.parent.id.toString());
    if (this.myForm.controls['dateDataEntry'] != undefined) {
      if (this.myForm.controls['dateDataEntry'].value instanceof Date) {
        this.myForm.controls['dateDataEntry'].setValue(
          this.formatDateToString(this.myForm.controls['dateDataEntry'].value)
        );
      }
    }

     this.GoalsService.createGoals(this.myForm.value).subscribe(
      (value) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: this.myForm.value.expectations + ' Saved Successfully',
        });
        console.log(value);
        
        setTimeout(() => {
          // code to execute after 1 second
          this.router.navigate(['/listgoals']);
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
    ;
  }
  doSaveCreateScreen(): Observable<Goals> {
    this.myForm.controls['parent'].setValue(this.myForm.value.parent.id);
    if (this.myForm.controls['dateDataEntry'] != undefined) {
      if (this.myForm.controls['dateDataEntry'].value instanceof Date) {
        this.myForm.controls['dateDataEntry'].setValue(
          this.formatDateToString(this.myForm.controls['dateDataEntry'].value)
        );
      }
    }

    return this.GoalsService.createGoals(this.myForm.value).pipe(
      tap((value) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: this.myForm.value.expectations + ' Saved Successfully',
        });
        console.log(value);
        
        setTimeout(() => {
          // code to execute after 1 second
          this.router.navigate(['/listgoals']);
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

  //this method is used to update the medical History Entity
  doSave(): Observable<Goals> {
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
    return this.GoalsService.updateGoals(
      this.myForm.value.id,
      this.myForm.value
    ).pipe(
      tap((value) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: this.myForm.value['expectations'] + ' Saved Successfully',
        });
        this.router.navigate(['/listgoals']);
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
    let month = date.getMonth() + 1; // add 1 beexpectations months are indexed from 0
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
