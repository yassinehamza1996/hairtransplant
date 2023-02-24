import { MedicalHistory } from './../../models/medicalHistory.model';
import { PersonalInformationService } from './../../services/personalInformation.service';
import { ShowDashBoardService } from '../../services/showDashBoard.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-personal-information',
  templateUrl: './add-personal-information.component.html',
  styleUrls: ['./add-personal-information.component.scss'],
})
export class AddPersonalInformationComponent implements OnInit {
  dropdownItems: any;
  myForm: FormGroup;
  currentPath: string = '';
  @Input() showButtons : boolean
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private showDashboardService: ShowDashBoardService,
    private personalInformationService: PersonalInformationService,
    private messageService: MessageService
  ) {
    this.myForm = this.createForm();
    this.addMedicalHistory();
    this.route.url.subscribe((url) => {
      this.currentPath = url.join('/');
    });
  }

  ngOnInit() {
    if(this.showButtons == undefined){
      this.showButtons = true;
    }
    console.log(this.myForm);
    if (this.currentPath != undefined) {
      this.showDashboardService.setBoolean(false);
    }

  }
  createForm(): FormGroup<any> {
    return this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, Validators.required],
      medicalHistoryList: this.formBuilder.array([
      ])
    });
  }

  get medicalHistoryGroupArray () {
    return this.myForm.get('medicalHistoryList') as FormArray
  }

 newMedicalHistoryGroup(): FormGroup {
    return this.formBuilder.group({
      preExistingConditions :'',
      currentMedications : '',
      allergies :'',
      previousTransplants : '',
      dateDataEntry : null,
      personalInformation : this.myForm.value
    })
  }
 
  addMedicalHistory() {
    this.medicalHistoryGroupArray.push(this.newMedicalHistoryGroup());
  }
 
  removeMedicalHistory(i:number) {
    this.medicalHistoryGroupArray.removeAt(i);
  }
 

  doSave() {
    console.log(this.myForm);
    if(this.myForm.value.medicalHistoryList != undefined && this.myForm.value.medicalHistoryList.length != 0){
      this.myForm.value.medicalHistoryList.forEach((res : any) => {
        res.personalInformation ={
          firstname: this.myForm.value.firstname,
          lastname : this.myForm.value.lastname,
          address : this.myForm.value.address,
          age : this.myForm.value.age,
          email : this.myForm.value.email,
          phoneNumber : this.myForm.value.phoneNumber
        } 
        
      })
    }
    
    this.personalInformationService
      .savePersonalInformation(this.myForm.value)
      .subscribe((value) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: this.myForm.value['firstname'] + ' Saved Successfully',
        });
      },
      error => {
        console.log(error);
        
        this.messageService.add({
          severity:'error', 
          summary: 'Error',
          detail: 'Error '+error.message,
        });
      }
      );
  }
}
