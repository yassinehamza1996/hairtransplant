import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ShowDashBoardService } from './components/services/showDashBoard.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
  showHomeScreen: boolean = true;
  dockItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'https://icon-library.com/images/home-svg-icon/home-svg-icon-28.jpg',
      command: () => this.navigateToHome(),
    },
    {
      label: 'Personal Information',
      icon: 'https://icons.veryicon.com/png/Business/Pretty%20Office/Personal%20information.png',
      command: () => this.navigateToPersonalInformation(),
    },
    {
      label: 'Medical History',
      icon: 'https://www.svgrepo.com/show/287803/medical-history.svg',
      command: () => this.navigateToMedicalHistory()
    },
    {
      label: 'Life Style',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/LifeStyles_Condoms_Logo.svg',
      command: () => this.navigateToLifeStyle()
    },
    {
      label: 'Hair Loss',
      icon: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/hair-fall-1593402-1351771.png?f=avif&w=256',
      command: () => this.navigateToHairLoss()
    },
    {
      label: 'Goals',
      icon: 'https://pic.onlinewebfonts.com/svg/img_451982.png',
      command: () => this.navigateToGoals()
    },
    {
      label: 'Client Visit',
      icon: 'https://uploads-ssl.webflow.com/5fa9b7fecf7f5f50e3d6b096/612fcf8db2b8150490b28e01_Didask%20-%20Banner%20-%20Use%20Case%20-%20relation%20client-p-500.png',
      command: () => this.navigateToClientVisit()
    },
  ];
  currentPath : string  | undefined;
  constructor(
    private router: Router,
    private showDashboardService: ShowDashBoardService,
    private route: ActivatedRoute,
  ) {
    this.route.url.subscribe((url) => {
      this.currentPath = url.join('/');
    });
    let display = this.showDashboardService.getBoolean();
    if (display != undefined && this.currentPath != undefined) {
      this.showHomeScreen = display;
    }
  }

  ngOnInit() {}

  getHideHomeScreen(hideHomeScreen: boolean) {
    this.showHomeScreen = hideHomeScreen;
  }
  navigateToHome() {
    this.router.navigate(['']);
    this.showHomeScreen = true;
  }
  navigateToPersonalInformation() {
    this.router.navigate(['/listpersonalinformation']);
    this.showHomeScreen = false;
  }
  navigateToMedicalHistory(){
    this.router.navigate(['/listmedicalhistory']);
    this.showHomeScreen = false;
  }
  navigateToLifeStyle(){
    this.router.navigate(['/listlifestyle']);
    this.showHomeScreen = false;
  }
  navigateToHairLoss(){
    this.router.navigate(['/listhairloss']);
    this.showHomeScreen = false;
  }
  navigateToGoals(){
    this.router.navigate(['/listgoals']);
    this.showHomeScreen = false;
  }
  navigateToClientVisit(){
    this.router.navigate(['/listclientvisit']);
    this.showHomeScreen = false;
  }
}
