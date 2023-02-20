import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  title = 'hairtransplant';
  items: MenuItem[] = [];
  slideMenuItems: MenuItem[] = [];
  display: boolean = false;
  isPersonalInformation: boolean = false;
  isHairLoss: boolean = false;
  personalInfoIcon: string = 'fa-solid fa-chevron-down';
  hairLossIcon: string = 'fa-solid fa-chevron-down';
  chartData: any;
  basicData: any;
  basicOptions: any;
  @Output() hideHomeScreen  = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems();
    this.sideBar();
  }

  sideBar() {
    this.items = [
      {
        label: 'Menu',
        icon: 'pi pi-align-justify',
        command: () => this.displaySideBar(),
      },
    ];
  }
  menuItems() {
    this.slideMenuItems = [
      {
        label: 'Home',
        icon: 'fa-solid fa-house',
        command: () => this.navigateToHome(),
      },
      {
        label: 'Personal Information',
        icon: 'pi pi-id-card',
        items: [
          {
            label: 'New Personal Information',
            icon: 'pi pi-fw pi-plus',
            command: () => this.addPersonalInformation(),
          },
          {
            label: 'List Personal Information',
            icon: 'pi pi-list',
            command: () => this.listPersonalInformation(),
          },
        ],
      },
      {
        label: 'Medical History',
        icon: 'pi pi-heart-fill',
        items: [
          {
            label: 'New Medical History',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateToAddMedicalHistory(),
          },
          {
            label: 'List Medical History',
            icon: 'pi pi-list',
            command: () => this.navigateToListMedicalHistory(),
          },
        ],
      },
      {
        label: 'Life Style',
        icon: 'pi pi-apple',
        items: [
          {
            label: 'New Life Style',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateToAddLifeStyle(),
          },
          {
            label: 'List Life Style',
            icon: 'pi pi-list',
            command: () => this.navigateToListLifeStyle(),
          },
        ],
      },
      {
        label: 'Hair Loss',
        icon: 'fa-solid fa-head-side-virus',
        items: [
          {
            label: 'New Hair Loss',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateToAddHairLoss(),
          },
          {
            label: 'List Hair Loss',
            icon: 'pi pi-list',
            command: () => this.navigateToListHairLoss(),
          },
        ],
      },
      {
        label: 'Goals',
        icon: 'fa-solid fa-head-side-virus',
        items: [
          {
            label: 'New Goals',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateToAddGoals(),
          },
          {
            label: 'List Goals',
            icon: 'pi pi-list',
            command: () => this.navigateToListGoals(),
          },
        ],
      },
      {
        label: 'Client Visit',
        icon: 'fa-solid fa-user-tie',
        items: [
          {
            label: 'New Client Visit',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateToAddClientVisit(),
          },
          {
            label: 'List Client Visit',
            icon: 'pi pi-list',
            command: () => this.navigateToListClient(),
          },
        ],
      },
    ];
  }



  navigateToListClient() {
    this.router.navigate(['/listclientvisit']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToAddClientVisit() {
    this.router.navigate(['/addclientvisit']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToListGoals() {
    this.router.navigate(['/listgoals']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToAddGoals() {
    this.router.navigate(['/addgoals']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToListHairLoss() {
    this.router.navigate(['/listhairloss']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToAddHairLoss() {
    this.router.navigate(['/addhairloss']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToListLifeStyle() {
    this.router.navigate(['/listlifestyle']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToAddLifeStyle() {
    this.router.navigate(['/addlifestyle']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToListMedicalHistory() {
    this.router.navigate(['/listmedicalhistory']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  navigateToAddMedicalHistory() {
    this.router.navigate(['/addmedicalhistory']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
  displaySideBar() {
    this.display = true;
  }
  navigateToHome() {
    this.router.navigate(['/']);
    this.display = false;
    this.hideHomeScreen.emit(true)
    // this.hideHomeScreen.emit(false) = true;
  }
  addPersonalInformation() {
    this.hideHomeScreen.emit(false) ;
    this.router.navigate(['/addpersonalinformation']);
    this.display = false;
  }
  listPersonalInformation() {
    this.router.navigate(['/listpersonalinformation']);
    this.display = false;
    this.hideHomeScreen.emit(false)
  }
}
