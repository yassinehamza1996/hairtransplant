import { ListLifestyleComponent } from './components/lifestyle/list-lifestyle/list-lifestyle.component';
import { AddLifestyleComponent } from './components/lifestyle/add-lifestyle/add-lifestyle.component';
import { ListHairlossComponent } from './components/hairloss/list-hairloss/list-hairloss.component';
import { AddHairlossComponent } from './components/hairloss/add-hairloss/add-hairloss.component';
import { ListGoalsComponent } from './components/goals/list-goals/list-goals.component';
import { AddGoalsComponent } from './components/goals/add-goals/add-goals.component';
import { ListClientVisitComponent } from './components/clientvisit/list-client-visit/list-client-visit.component';
import { AddClientVisitComponent } from './components/clientvisit/add-client-visit/add-client-visit.component';
import { ListMedicalHistoryComponent } from './components/medicalhistory/list-medical-history/list-medical-history.component';
import { AddMedicalHistoryComponent } from './components/medicalhistory/add-medical-history/add-medical-history.component';
import { ListPersonalInformationComponent } from './components/personalInformation/list-personal-information/list-personal-information.component';
import { AddPersonalInformationComponent } from './components/personalInformation/add-personal-information/add-personal-information.component';

import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'addpersonalinformation', component: AddPersonalInformationComponent },
  { path: 'listpersonalinformation', component: ListPersonalInformationComponent },
  { path: 'addmedicalhistory', component: AddMedicalHistoryComponent },
  { path: 'listmedicalhistory', component: ListMedicalHistoryComponent },
  { path: 'addclientvisit', component: AddClientVisitComponent },
  { path: 'listclientvisit', component: ListClientVisitComponent },
  { path: 'addgoals', component: AddGoalsComponent },
  { path: 'listgoals', component: ListGoalsComponent },
  { path: 'addhairloss', component: AddHairlossComponent },
  { path: 'listhairloss', component: ListHairlossComponent },
  { path: 'addlifestyle', component: AddLifestyleComponent },
  { path: 'listlifestyle', component: ListLifestyleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
