import { AddPersonalInformationComponent } from './../add-personal-information/add-personal-information.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PersonalInformation } from '../../models/personal-Information.model';
import { Product } from '../../models/product';
import { PersonalInformationService } from '../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';

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

  selectedPersonalInformation: PersonalInformation[] = [];
  isLoading: boolean = false;
  submitted: boolean | undefined;
  @ViewChild('addpersonalInformation')
  addpersonalInformationComponent: AddPersonalInformationComponent;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private personalInformationService: PersonalInformationService,
    private showDashboardService: ShowDashBoardService
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
                detail: 'presona lInformation List Deleted',
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
                severity: 'success',
                summary: 'Successful',
                detail: 'Personal Information Deleted',
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

  savePopUpPersonalInformation() {
    this.addpersonalInformationComponent.doSave().subscribe((value: PersonalInformation) => {
      this.presonalInformationList.push(value)
    });;
   
  }

  clickme() {}
}
