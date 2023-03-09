import { AddMedicalHistoryComponent } from './../add-medical-history/add-medical-history.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as saveAs from 'file-saver';
import { ShowDashBoardService } from '../../services/showDashBoard.service';
import { MedicalHistoryService } from '../../services/medicalHistory.service';
import { MedicalHistory } from 'src/core/api/client';
import { Product } from 'src/core/api/client/model/product';


@Component({
  selector: 'app-list-medical-history',
  templateUrl: './list-medical-history.component.html',
  styleUrls: ['./list-medical-history.component.scss'],
})
export class ListMedicalHistoryComponent implements OnInit {
  medicalHistoryDialog: boolean = false;

  medicalHistoryList: MedicalHistory[] = [];
  MedicalHistorySubscription: Subscription;
  product: Product = {};
  editableMedicalHistory: MedicalHistory;
  selectedMedicalHistory: MedicalHistory[] = [];
  isLoading: boolean = false;
  submitted: boolean | undefined;
  contents: File[] = [];
  hideConfirmDialog: boolean = false;
  @ViewChild('addmedicalHistory')
  addmedicalHistoryComponent: AddMedicalHistoryComponent;
  resetMedicalHistoryForm: boolean = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private medicalHistoryService: MedicalHistoryService,
    private showDashboardService: ShowDashBoardService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.showDashboardService.setBoolean(false);

    this.MedicalHistorySubscription = this.medicalHistoryService
      .getAllMedicalHistorys()
      .subscribe((items) => {
        this.medicalHistoryList = items;
        this.isLoading = false;
      });
  }

  hideDialog() {
    this.medicalHistoryDialog = false;
    this.submitted = false;
  }

  saveMedicalHistoryPopUp() {
    this.savePopUpMedicalHistory();
    this.submitted = true;
    this.medicalHistoryDialog = false;
  }

  deleteSelectedMedicalHistory() {
    this.hideConfirmDialog = false;
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected medical history items?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.MedicalHistorySubscription = this.medicalHistoryService
          .deleteSelectedMedicalHistory(this.selectedMedicalHistory)
          .subscribe(
            (response) => {
              this.medicalHistoryList = this.medicalHistoryList.filter(
                (val) => !this.selectedMedicalHistory.includes(val)
              );
              this.selectedMedicalHistory = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Selected Items was Deleted Succesfully',
                life: 3000,
              });
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

  openNew() {
    this.product = {};
    this.submitted = false;
    this.medicalHistoryDialog = true;
    this.resetMedicalHistoryForm = true;
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
        this.medicalHistoryService.deleteMedicalHistory(event.id).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Successful',
              detail: 'Medical History Deleted Successfully',
              life: 3000,
            });
            this.medicalHistoryList = this.medicalHistoryList.filter(
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
    let listToBeExported = JSON.parse(JSON.stringify(this.medicalHistoryList));
    listToBeExported.forEach((r:any)=>{
      r.parent = r.idParent
      r['stringParent'] = r.idParent
    })
    this.medicalHistoryService
      .exportToExcel(listToBeExported)
      .subscribe(
        (res) => {
          const blob = new Blob([res.body], {
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
    let listToBeExported = JSON.parse(JSON.stringify(this.medicalHistoryList));

    listToBeExported.forEach((r:any)=>{
      r.parent = r.idParent
      r['stringParent'] = r.idParent
    })

    this.medicalHistoryService.exportToExcel(listToBeExported).subscribe(
      (res) => {
        const blob = new Blob([res.body], {
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

    this.medicalHistoryService
      .importExcelMedicalHistory(this.contents[0])
      .subscribe((res) => {
        if (res != undefined) {
          console.log('------import-------------', res);
          res.forEach((personInfo: MedicalHistory) => {
            let index = this.medicalHistoryList.findIndex(
              (item: MedicalHistory) => item.id == personInfo.id
            );
            if (index == -1) {
              this.medicalHistoryList.push(personInfo);
            } else {
              this.medicalHistoryList[index] = personInfo;
            }
          });
        }
        this.isLoading = false;
      });
  }

  savePopUpMedicalHistory() {
    this.addmedicalHistoryComponent.doSave().subscribe(
      (value: MedicalHistory) => {
        let indexOfPerson = this.medicalHistoryList.findIndex(
          (res) => res.id == value.id
        );
        if (indexOfPerson != -1) {
          this.medicalHistoryList[indexOfPerson] = value;
        }else{
          this.medicalHistoryList.push(value);
        }
      },
      (error) => {
        this.medicalHistoryDialog = true;
      }
    );
  }

  editMedicalHistory(medicalHistory: MedicalHistory) {
    let mh = JSON.parse(JSON.stringify(medicalHistory))
    this.editableMedicalHistory = mh;
    this.medicalHistoryDialog = true;
    this.resetMedicalHistoryForm = false;
  }
}
