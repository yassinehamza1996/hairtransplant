import { Component, OnInit } from '@angular/core';
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
  productDialog: boolean | undefined;

  presonalInformationList: PersonalInformation[] = [];
  personalInformationSubscription: Subscription;
  product: Product = {};

  selectedProducts: Product[] = [];
  isLoading: boolean = false;
  submitted: boolean | undefined;
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
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected presonalInformationList?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.presonalInformationList = this.presonalInformationList.filter(
        //   (val) => !this.selectedProducts.includes(val)
        // );
        this.selectedProducts = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'presonalInformationList Deleted',
          life: 3000,
        });
      },
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  getAllPossibleValues(event: any) {
    console.log(event);
    console.log(event.target.value);
  }
  deleteRow(event : any){
    console.log(event);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + event.firstname + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.personalInformationService.deletePersonalInformation(event).subscribe(res=>{
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Personal Information Deleted', life: 3000});
            this.presonalInformationList = this.presonalInformationList.filter(r=>r.id != event.id)
          },
          (error)=>{
            this.messageService.add({
              severity:'error', 
              summary: 'Error',
              detail: 'Error '+error.message,
            });
          })
          
      }
  });
   
  }
  clickme() {}
}
