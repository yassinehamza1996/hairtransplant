import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonalInformation } from '../models/personal-Information.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationService {
  constructor(private http: HttpClient) {}

  findAllPersonalInformation(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/search/all');
  }
  savePersonalInformation(personalInfo: PersonalInformation): Observable<any> {
    return this.http.post(environment.apiUrl + '/save', personalInfo);
  }

  deletePersonalInformation(personalInfo: PersonalInformation): Observable<any> {
    return this.http.delete(environment.apiUrl + '/delete/'+personalInfo.id);
  }
 
  deleteSelectedPersonalInformation(personalInformations: PersonalInformation[]): Observable<void> {
    return this.http.request<void>('DELETE', `${environment.apiUrl}/delete/all`, { body: personalInformations });
  }
}
