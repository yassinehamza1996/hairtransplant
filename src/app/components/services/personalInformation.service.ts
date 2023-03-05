import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalInformation } from 'src/core/models/personal-Information.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationService {
  controllerPath = 'PersonalInformations';

  constructor(private http: HttpClient) {}

  findAllPersonalInformation(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.controllerPath + '/search/all'
    );
  }

  findAllOnlyIdAndMail() : Observable<any>{
    return this.http.get<any>(
      environment.apiUrl + this.controllerPath + '/fetchwithidandmail/all'
    );
  }

  savePersonalInformation(personalInfo: PersonalInformation): Observable<any> {
    return this.http.post(
      environment.apiUrl + this.controllerPath + '/save',
      personalInfo
    );
  }

  deletePersonalInformation(
    personalInfo: PersonalInformation
  ): Observable<any> {
    return this.http.delete(
      environment.apiUrl + this.controllerPath + '/delete/' + personalInfo.id
    );
  }

  deleteSelectedPersonalInformation(
    personalInformations: PersonalInformation[]
  ): Observable<void> {
    return this.http.request<void>(
      'DELETE',
      `${environment.apiUrl + this.controllerPath}/delete/all`,
      { body: personalInformations }
    );
  }
  getCountPersonalInformation(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.controllerPath + '/count'
    );
  }

  importExcelPersonalInformation(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return this.http.post(
      environment.apiUrl + this.controllerPath + '/import-excel',
      data,
      { headers }
    );
  }

  exportToExcel(
    personalInformationList: PersonalInformation[]
  ): Observable<any> {
    const headers = new HttpHeaders();

    const options = {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'blob' as 'json',
      body: new Blob([JSON.stringify(personalInformationList)], {
        type: 'application/json',
      }),
    };

    return this.http.request<Blob>(
      'POST',
      `${environment.apiUrl + this.controllerPath}/export-to-excel`,
      options
    );
  }
}
