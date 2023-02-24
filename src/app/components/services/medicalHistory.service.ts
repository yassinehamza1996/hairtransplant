import { environment } from 'src/environments/environment';
import { MedicalHistory } from './../models/medicalHistory.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MedicalHistoryService {

    controllerPath = "medicalHistoryController"
    constructor(private http: HttpClient) { }

    getAllMedicalHistorys(): Observable<MedicalHistory[]> {
        return this.http.get<MedicalHistory[]>(`${environment.apiUrl + this.controllerPath}/search/all`);
    }

    getCountMedicalHistorys(): Observable<number> {
        return this.http.get<number>(`${environment.apiUrl + this.controllerPath}/count`);
    }

    getMedicalHistoryById(id: number): Observable<MedicalHistory> {
        return this.http.get<MedicalHistory>(`${environment.apiUrl + this.controllerPath}/${id}`);
    }

    createMedicalHistory(medicalHistory: MedicalHistory): Observable<MedicalHistory> {
        return this.http.post<MedicalHistory>(`${environment.apiUrl + this.controllerPath}/save`, medicalHistory);
    }

    updateMedicalHistory(id: number, medicalHistory: MedicalHistory): Observable<MedicalHistory> {
        return this.http.put<MedicalHistory>(`${environment.apiUrl + this.controllerPath}/update/${id}`, medicalHistory);
    }

    deleteMedicalHistory(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl + this.controllerPath}/delete/${id}`);
    }
    
    deleteSelectedPersonalInformation(medicalHistorys: MedicalHistory[]): Observable<void> {
        return this.http.request<void>('DELETE', `${environment.apiUrl + this.controllerPath}/delete/all`, { body: medicalHistorys });
    }
}
