import { MedicalHistoryService } from './../services/medicalHistory.service';
import { Subscription } from 'rxjs';
import { PersonalInformationService } from './../services/personalInformation.service';
import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from '../services/photoService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  chartData: any;
  basicData: any;
  basicOptions: any;
  isAnimated: boolean = true;
  images!: any[];
  subscription: Subscription = new Subscription();
  numberOfPersonalInformations : number = 0;
  numberOfMedicalHistories : number = 0;
  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '960px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private photoService: PhotoService,
    private personalInformationService: PersonalInformationService,
    private medicalHistoryService : MedicalHistoryService
  ) {}
  ngOnInit() {
    this.initChart();
    this.applyLightTheme();
    this.subscription.add(this.medicalHistoryService.getCountMedicalHistorys().subscribe(res=>{
      this.numberOfMedicalHistories = res
    }))
    this.subscription.add(this.personalInformationService
      .getCountPersonalInformation()
      .subscribe((count) => {
        this.numberOfPersonalInformations = count;
      }))
    
    setTimeout(() => {
      // Remove the pAnimate attribute to stop the animation
      this.isAnimated = false;
    }, 1000);
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
  }

  applyLightTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  initChart() {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
      ],
    };
  }
}
