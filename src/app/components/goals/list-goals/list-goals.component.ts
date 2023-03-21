import { Component, ViewChild } from '@angular/core';
import * as saveAs from 'file-saver';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Goals, GoalsControllerService, ImportExcelRequest } from 'src/core/api/client';
import { Product } from 'src/core/api/client/model/product';
import { ShowDashBoardService } from '../../services/showDashBoard.service';
import { AddGoalsComponent } from '../add-goals/add-goals.component';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.scss']
})
export class ListGoalsComponent {
  goalsDialog: boolean = false;

  goalsList: Goals[] = [];
  goalsSubscription: Subscription;
  product: Product = {};
  editableGoals: Goals;
  selectedGoals: Goals[] = [];
  isLoading: boolean = false;
  submitted: boolean | undefined;
  contents: File[] = [];
  hideConfirmDialog: boolean = false;
  @ViewChild('addGoals')
  addGoalsComponent: AddGoalsComponent;
  resetGoalsForm: boolean = false;
  
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private GoalsService: GoalsControllerService,
    private showDashboardService: ShowDashBoardService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.showDashboardService.setBoolean(false);

    this.goalsSubscription = this.GoalsService
      .getAllGoalss()
      .subscribe((items) => {
        this.goalsList = items;
        this.isLoading = false;
      });
  }

  hideDialog() {
    this.goalsDialog = false;
    this.submitted = false;
  }

  saveGoalsPopUp() {
    this.savePopUpGoals();
    this.submitted = true;
    this.goalsDialog = false;
  }

  deleteSelectedGoals() {
    this.hideConfirmDialog = false;
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected Goals items?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.goalsSubscription = this.GoalsService
          .deleteSelectedGoals(this.selectedGoals)
          .subscribe(
            (response) => {
              this.goalsList = this.goalsList.filter(
                (val) => !this.selectedGoals.includes(val)
              );
              this.selectedGoals = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Selected Items was Deleted Succesfully',
                life: 3000,
              });
            },
            (error: { message: string; }) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error ' + error.message,
              });
            }
          );
      },
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.goalsDialog = true;
    this.resetGoalsForm = true;
    this.hideConfirmDialog = true;
  }
  getAllPossibleValues(event: any) {
    console.log(event);
    console.log(event.target.value);
  }
  deleteRow(event: any) {
    console.log(event);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + event.allergies + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.GoalsService.deleteGoals(event.id).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Successful',
              detail: 'Goals Deleted Successfully',
              life: 3000,
            });
            this.goalsList = this.goalsList.filter(
              (r) => r.id != event.id
            );
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error ' + error.message,
            });
          }
        );
      },
    });
  }

  doExportSelectedItems() {
    let listToBeExported = JSON.parse(JSON.stringify(this.goalsList));
    listToBeExported.forEach((r: any) => {
      r.parent = r.idParent;
      r['stringParent'] = r.idParent;
    });
    this.GoalsService.exportGoalsToExcel(listToBeExported).subscribe(
      (res : any) => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = 'medical-history.xlsx';
        saveAs(blob, fileName);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Excel downloaded successfully',
          life: 3000,
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error ' + err.message,
        });
      }
    );
  }

  doExport() {
    let listToBeExported = JSON.parse(JSON.stringify(this.goalsList));

    listToBeExported.forEach((r: any) => {
      r.parent = r.idParent;
      r['stringParent'] = r.idParent;
    });

    this.GoalsService.exportGoalsToExcel(listToBeExported).subscribe(
      (res : any) => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = 'Goals.xlsx';
        saveAs(blob, fileName);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Excel downloaded successfully',
          life: 3000,
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error ' + err.message,
        });
      }
    );
  }

  selectFile(event: any) {
    this.contents = [event.files[0]];
    this.doUpload();
  }

  doUpload() {
    this.isLoading = true;
    let content = this.contents[0];
    let params = {
      fileName: content.name,
    };
    let x : ImportExcelRequest;
    x = this.contents[0] as ImportExcelRequest
    this.GoalsService
      .importExcel3(x)
      .subscribe((res) => {
        if (res != undefined) {
          console.log('------import-------------', res);
          res.forEach((personInfo: Goals) => {
            let index = this.goalsList.findIndex(
              (item: Goals) => item.id == personInfo.id
            );
            if (index == -1) {
              this.goalsList.push(personInfo);
            } else {
              this.goalsList[index] = personInfo;
            }
          });
        }
        this.isLoading = false;
      });
  }

  savePopUpGoals() {
    if(this.resetGoalsForm){
      this.addGoalsComponent.doSaveCreateScreen().subscribe(
        (value: Goals) => {
            this.goalsList.push(value);
            this.goalsDialog = false
        },
        (error) => {
          this.goalsDialog = true;
        }
      );
    }else if (!this.resetGoalsForm){
      this.addGoalsComponent.doSave().subscribe(
        (value: Goals) => {
          let indexOfPerson = this.goalsList.findIndex(
            (res) => res.id == value.id
          );
          if (indexOfPerson != -1) {
            this.goalsList[indexOfPerson] = value;
            this.goalsDialog = false
          } else {
            this.goalsList.push(value);
            this.goalsDialog = false
          }
        },
        (error) => {
          this.goalsDialog = true;
        }
      );
    }

  }

  editGoals(Goals: Goals) {
    let mh = JSON.parse(JSON.stringify(Goals));
    this.editableGoals = mh;
    this.goalsDialog = true;
    this.resetGoalsForm = false;
  }
}
