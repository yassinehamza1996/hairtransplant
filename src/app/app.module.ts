import { ConfirmationService, MessageService } from 'primeng/api';
import { HomeComponent } from './components/home/home.component';

import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlideMenuModule } from 'primeng/slidemenu';
import { AddPersonalInformationComponent } from './components/personalInformation/add-personal-information/add-personal-information.component';
import { ListPersonalInformationComponent } from './components/personalInformation/list-personal-information/list-personal-information.component';
import { AddMedicalHistoryComponent } from './components/medicalhistory/add-medical-history/add-medical-history.component';
import { ListMedicalHistoryComponent } from './components/medicalhistory/list-medical-history/list-medical-history.component';
import { AddClientVisitComponent } from './components/clientvisit/add-client-visit/add-client-visit.component';
import { ListClientVisitComponent } from './components/clientvisit/list-client-visit/list-client-visit.component';
import { AddGoalsComponent } from './components/goals/add-goals/add-goals.component';
import { ListGoalsComponent } from './components/goals/list-goals/list-goals.component';
import { AddHairlossComponent } from './components/hairloss/add-hairloss/add-hairloss.component';
import { ListHairlossComponent } from './components/hairloss/list-hairloss/list-hairloss.component';
import { AddLifestyleComponent } from './components/lifestyle/add-lifestyle/add-lifestyle.component';
import { ListLifestyleComponent } from './components/lifestyle/list-lifestyle/list-lifestyle.component';
import { ChartModule } from 'primeng/chart';
import { HeaderComponent } from './components/header/header.component';
import { AnimateModule } from 'primeng/animate';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from './components/services/photoService.service';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { DockModule } from 'primeng/dock';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FieldsetModule} from 'primeng/fieldset';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  declarations: [
    AppComponent,
    AddPersonalInformationComponent,
    ListPersonalInformationComponent,
    AddMedicalHistoryComponent,
    ListMedicalHistoryComponent,
    AddClientVisitComponent,
    ListClientVisitComponent,
    AddGoalsComponent,
    ListGoalsComponent,
    AddHairlossComponent,
    ListHairlossComponent,
    AddLifestyleComponent,
    ListLifestyleComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    MenubarModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    ChartModule,
    AnimateModule,
    GalleriaModule,
    HttpClientModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    ToastModule,
    DockModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    FieldsetModule,
    CalendarModule,
    InputMaskModule
  ],
  providers: [PhotoService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
