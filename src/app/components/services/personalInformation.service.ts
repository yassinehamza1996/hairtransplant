import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Image } from 'src/app/components/models/Image.model'
import { PersonalInformation } from '../models/personal-Information.model';

@Injectable({
    providedIn: 'root'
})
export class PersonalInformationService {

    private apiUrl = 'http://localhost:8080/api/PersonalInformations'; 

    constructor(private http: HttpClient) { }
  
    findAllPersonalInformation(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/search/all');
    }
    savePersonalInformation(personalInfo : PersonalInformation):Observable<any>{
        return this.http.post(this.apiUrl+'/save',personalInfo);
    }
}
