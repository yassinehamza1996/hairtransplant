import { AddLifestyleComponent } from './../add-lifestyle/add-lifestyle.component';
import { Component, ViewChild } from '@angular/core';
import * as saveAs from 'file-saver';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ImportExcelRequest, LifeStyle, LifeStyleControllerService } from 'src/core/api/client';
import { Product } from 'src/core/api/client/model/product';
import { ShowDashBoardService } from '../../services/showDashBoard.service';

@Component({
  selector: 'app-list-lifestyle',
  templateUrl: './list-lifestyle.component.html',
  styleUrls: ['./list-lifestyle.component.scss'],
})
export class ListLifestyleComponent {
  lifeStyleDialog: boolean = false;

  lifeStyleList: LifeStyle[] = [];
  lifeStyleSubscription: Subscription;
  product: Product = {};
  editablelifeStyle: LifeStyle;
  selectedlifeStyle: LifeStyle[] = [];
  isLoading: boolean = false;
  submitted: boolean | undefined;
  contents: File[] = [];
  hideConfirmDialog: boolean = false;
  @ViewChild('addlifeStyle')
  addlifeStyleComponent: AddLifestyleComponent;
  resetlifeStyleForm: boolean = false;
  
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private lifeStyleService: LifeStyleControllerService,
    private showDashboardService: ShowDashBoardService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.showDashboardService.setBoolean(false);

    this.lifeStyleSubscription = this.lifeStyleService
      .getAllLifeStyles()
      .subscribe((items) => {
        this.lifeStyleList = items;
        this.isLoading = false;
      });
  }

  hideDialog() {
    this.lifeStyleDialog = false;
    this.submitted = false;
  }

  savelifeStylePopUp() {
    this.savePopUplifeStyle();
    this.submitted = true;
    this.lifeStyleDialog = false;
  }

  deleteSelectedlifeStyle() {
    this.hideConfirmDialog = false;
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected medical history items?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lifeStyleSubscription = this.lifeStyleService
          .deleteSelectedLifeStyles(this.selectedlifeStyle)
          .subscribe(
            (response) => {
              this.lifeStyleList = this.lifeStyleList.filter(
                (val) => !this.selectedlifeStyle.includes(val)
              );
              this.selectedlifeStyle = [];
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
    this.lifeStyleDialog = true;
    this.resetlifeStyleForm = true;
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
        this.lifeStyleService.deleteLifeStyle(event.id).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Successful',
              detail: 'Medical History Deleted Successfully',
              life: 3000,
            });
            this.lifeStyleList = this.lifeStyleList.filter(
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
    let listToBeExported = JSON.parse(JSON.stringify(this.lifeStyleList));
    listToBeExported.forEach((r: any) => {
      r.parent = r.idParent;
      r['stringParent'] = r.idParent;
    });
    this.lifeStyleService.exportLifeStyleToExcel(listToBeExported).subscribe(
      (res : any) => {
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
    let listToBeExported = JSON.parse(JSON.stringify(this.lifeStyleList));

    listToBeExported.forEach((r: any) => {
      r.parent = r.idParent;
      r['stringParent'] = r.idParent;
    });

    this.lifeStyleService.exportLifeStyleToExcel(listToBeExported).subscribe(
      (res : any) => {
        const blob = new Blob([res.body], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = 'life-Style.xlsx';
        saveAs(blob, fileName);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Excel downloaded successfully',
          life: 3000,
        });
      },
      (err: { message: string; }) => {
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
    this.lifeStyleService
      .importExcel1(x)
      .subscribe((res) => {
        if (res != undefined) {
          console.log('------import-------------', res);
          res.forEach((personInfo: LifeStyle) => {
            let index = this.lifeStyleList.findIndex(
              (item: LifeStyle) => item.id == personInfo.id
            );
            if (index == -1) {
              this.lifeStyleList.push(personInfo);
            } else {
              this.lifeStyleList[index] = personInfo;
            }
          });
        }
        this.isLoading = false;
      });
  }

  savePopUplifeStyle() {
    this.addlifeStyleComponent.doSave().subscribe(
      (value: LifeStyle) => {
        let indexOfPerson = this.lifeStyleList.findIndex(
          (res) => res.id == value.id
        );
        if (indexOfPerson != -1) {
          this.lifeStyleList[indexOfPerson] = value;
        } else {
          this.lifeStyleList.push(value);
        }
      },
      (error) => {
        this.lifeStyleDialog = true;
      }
    );
  }

  editlifeStyle(lifeStyle: LifeStyle) {
    let mh = JSON.parse(JSON.stringify(lifeStyle));
    this.editablelifeStyle = mh;
    this.lifeStyleDialog = true;
    this.resetlifeStyleForm = false;
  }
}
