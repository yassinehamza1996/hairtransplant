import { AddPersonalInformationComponent } from './../add-personal-information/add-personal-information.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PersonalInformationService } from '../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';
import * as saveAs from 'file-saver';
import { PersonalInformation } from 'src/core/models/personal-Information.model';
import { Product } from 'src/core/models/product';

@Component({
  selector: 'app-list-personal-information',
  templateUrl: './list-personal-information.component.html',
  styleUrls: ['./list-personal-information.component.scss'],
})
export class ListPersonalInformationComponent implements OnInit {
  personalInformationDialog: boolean | undefined;

  presonalInformationList: PersonalInformation[] = [];
  personalInformationSubscription: Subscription;
  product: Product = {};
  editablePersonInformation: PersonalInformation;
  selectedPersonalInformation: PersonalInformation[] = [];
  isLoading: boolean = false;
  submitted: boolean | undefined;
  contents: File[] = [];
  hideConfirmDialog: boolean = false;
  @ViewChild('addpersonalInformation')
  addpersonalInformationComponent: AddPersonalInformationComponent;
  resetPersonalInformationForm: boolean = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private personalInformationService: PersonalInformationService,
    private showDashboardService: ShowDashBoardService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.showDashboardService.setBoolean(false);

    this.personalInformationSubscription = this.personalInformationService
      .findAllPersonalInformation()
      .subscribe((items) => {
        this.presonalInformationList = items;
        this.isLoading = false;
      });
  }

  hideDialog() {
    this.personalInformationDialog = false;
    this.submitted = false;
  }

  savePersonalInformationPopUp() {
    this.savePopUpPersonalInformation();
    this.submitted = true;
    this.personalInformationDialog = false;
  }

  deleteSelectedPersonalInformation() {
    this.hideConfirmDialog = false;
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected personal Information List?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.personalInformationSubscription = this.personalInformationService
          .deleteSelectedPersonalInformation(this.selectedPersonalInformation)
          .subscribe(
            (response) => {
              this.presonalInformationList =
                this.presonalInformationList.filter(
                  (val) => !this.selectedPersonalInformation.includes(val)
                );
              this.selectedPersonalInformation = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'presonal Information List Deleted',
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
    this.personalInformationDialog = true;
    this.resetPersonalInformationForm = true;
    this.hideConfirmDialog = true;
  }
  getAllPossibleValues(event: any) {
    console.log(event);
    console.log(event.target.value);
  }
  deleteRow(event: any) {
    console.log(event);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + event.firstname + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.personalInformationService
          .deletePersonalInformation(event)
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Successful',
                detail: 'Personal Information Deleted Successfully',
                life: 3000,
              });
              this.presonalInformationList =
                this.presonalInformationList.filter((r) => r.id != event.id);
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
    this.personalInformationService
      .exportToExcel(this.selectedPersonalInformation)
      .subscribe(
        (res) => {
          const blob = new Blob([res.body], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const fileName = 'personal-information.xlsx';
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
          console.log(err);
        }
      );
  }
  doExport() {
    this.personalInformationService
      .exportToExcel(this.presonalInformationList)
      .subscribe(
        (res) => {
          const blob = new Blob([res.body], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const fileName = 'personal-information.xlsx';
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
          console.log(err);
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

    this.personalInformationService
      .importExcelPersonalInformation(this.contents[0])
      .subscribe((res) => {
        if (res != undefined) {
          console.log('------import-------------', res);
          res.forEach((personInfo: PersonalInformation) => {
            let index = this.presonalInformationList.findIndex(
              (item: PersonalInformation) => item.id == personInfo.id
            );
            if (index == -1) {
              this.presonalInformationList.push(personInfo);
            } else {
              this.presonalInformationList[index] = personInfo;
            }
          });
        }
        this.isLoading = false;
      });
  }

  savePopUpPersonalInformation() {
    this.addpersonalInformationComponent.doSave().subscribe(
      (value: PersonalInformation) => {
        let indexOfPerson = this.presonalInformationList.findIndex(
          (res) => res.id == value.id
        );
        if (indexOfPerson != -1) {
          this.presonalInformationList[indexOfPerson] = value;
        }else{
          this.presonalInformationList.push(value);
        }
      },
      (error) => {
        this.personalInformationDialog = true;
      }
    );
  }

  editPersonalInformation(personalInfo: PersonalInformation) {
    this.editablePersonInformation = personalInfo;
    this.personalInformationDialog = true;
    this.resetPersonalInformationForm = false;
  }
}
