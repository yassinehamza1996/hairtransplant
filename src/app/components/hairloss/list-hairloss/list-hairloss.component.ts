
import { AddHairlossComponent } from './../add-hairloss/add-hairloss.component';
import { Component, ViewChild } from '@angular/core';
import * as saveAs from 'file-saver';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { HairLoss, HairLossControllerService, ImportExcelRequest } from 'src/core/api/client';
import { Product } from 'src/core/api/client/model/product';
import { ShowDashBoardService } from '../../services/showDashBoard.service';

@Component({
  selector: 'app-list-hairloss',
  templateUrl: './list-hairloss.component.html',
  styleUrls: ['./list-hairloss.component.scss']
})
export class ListHairlossComponent {
  HairLossDialog: boolean = false;

  hairLossList: HairLoss[] = [];
  hairLossSubscription: Subscription;
  product: Product = {};
  editableHairLoss: HairLoss;
  selectedHairLoss: HairLoss[] = [];
  isLoading: boolean = false;
  submitted: boolean | undefined;
  contents: File[] = [];
  hideConfirmDialog: boolean = false;
  @ViewChild('addHairLoss')
  addHairLossComponent: AddHairlossComponent;
  resetHairLossForm: boolean = false;
  
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private hairLossService: HairLossControllerService,
    private showDashboardService: ShowDashBoardService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.showDashboardService.setBoolean(false);

    this.hairLossSubscription = this.hairLossService
      .getAllHairLosss()
      .subscribe((items) => {
        this.hairLossList = items;
        this.isLoading = false;
      });
  }

  hideDialog() {
    this.HairLossDialog = false;
    this.submitted = false;
  }

  saveHairLossPopUp() {
    this.savePopUpHairLoss();
    this.submitted = true;
    this.HairLossDialog = false;
  }

  deleteSelectedHairLoss() {
    this.hideConfirmDialog = false;
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected Hair loss items?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hairLossSubscription = this.hairLossService
          .deleteSelectedHairLoss1(this.selectedHairLoss)
          .subscribe(
            (response) => {
              this.hairLossList = this.hairLossList.filter(
                (val) => !this.selectedHairLoss.includes(val)
              );
              this.selectedHairLoss = [];
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
    this.HairLossDialog = true;
    this.resetHairLossForm = true;
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
        this.hairLossService.deleteHairLoss(event.id).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Successful',
              detail: 'Hair loss Deleted Successfully',
              life: 3000,
            });
            this.hairLossList = this.hairLossList.filter(
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
    let listToBeExported = JSON.parse(JSON.stringify(this.hairLossList));
    listToBeExported.forEach((r: any) => {
      r.parent = r.idParent;
      r['stringParent'] = r.idParent;
    });
    this.hairLossService.exportHairLossToExcel(listToBeExported).subscribe(
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
    let listToBeExported = JSON.parse(JSON.stringify(this.hairLossList));

    listToBeExported.forEach((r: any) => {
      r.parent = r.idParent;
      r['stringParent'] = r.idParent;
    });

    this.hairLossService.exportHairLossToExcel(listToBeExported).subscribe(
      (res : any) => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = 'Hair-Loss.xlsx';
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
    this.hairLossService
      .importExcel2(x)
      .subscribe((res) => {
        if (res != undefined) {
          console.log('------import-------------', res);
          res.forEach((personInfo: HairLoss) => {
            let index = this.hairLossList.findIndex(
              (item: HairLoss) => item.id == personInfo.id
            );
            if (index == -1) {
              this.hairLossList.push(personInfo);
            } else {
              this.hairLossList[index] = personInfo;
            }
          });
        }
        this.isLoading = false;
      });
  }

  savePopUpHairLoss() {
    if(this.resetHairLossForm){
      this.addHairLossComponent.doSaveCreateScreen().subscribe(
        (value: HairLoss) => {
            this.hairLossList.push(value);
        },
        (error) => {
          this.HairLossDialog = true;
        }
      );
    }else if (!this.resetHairLossForm){
      this.addHairLossComponent.doSave().subscribe(
        (value: HairLoss) => {
          let indexOfPerson = this.hairLossList.findIndex(
            (res) => res.id == value.id
          );
          if (indexOfPerson != -1) {
            this.hairLossList[indexOfPerson] = value;
          } else {
            this.hairLossList.push(value);
          }
        },
        (error) => {
          this.HairLossDialog = true;
        }
      );
    }

  }

  editHairLoss(HairLoss: HairLoss) {
    let mh = JSON.parse(JSON.stringify(HairLoss));
    this.editableHairLoss = mh;
    this.HairLossDialog = true;
    this.resetHairLossForm = false;
  }
}
