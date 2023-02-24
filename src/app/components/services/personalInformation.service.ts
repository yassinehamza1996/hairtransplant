import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonalInformation } from '../models/personal-Information.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationService {

   controllerPath = "PersonalInformations"

  constructor(private http: HttpClient) {}

  findAllPersonalInformation(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.controllerPath + '/search/all');
  }
  savePersonalInformation(personalInfo: PersonalInformation): Observable<any> {
    return this.http.post(environment.apiUrl + this.controllerPath + '/save', personalInfo);
  }

  deletePersonalInformation(personalInfo: PersonalInformation): Observable<any> {
    return this.http.delete(environment.apiUrl + this.controllerPath + '/delete/'+personalInfo.id);
  }
 
  deleteSelectedPersonalInformation(personalInformations: PersonalInformation[]): Observable<void> {
    return this.http.request<void>('DELETE', `${environment.apiUrl + this.controllerPath}/delete/all`, { body: personalInformations });
  }
  getCountPersonalInformation(): Observable<any>{
    return this.http.get<any>(environment.apiUrl + this.controllerPath +'/count');
  }
}
