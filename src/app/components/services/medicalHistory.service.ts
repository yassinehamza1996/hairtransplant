import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalHistory } from 'src/core/api/client';



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
    
    deleteSelectedMedicalHistory(medicalHistorys: MedicalHistory[]): Observable<void> {
        return this.http.request<void>('DELETE', `${environment.apiUrl + this.controllerPath}/delete/all`, { body: medicalHistorys });
    }
    
    importExcelMedicalHistory(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); 
        return this.http.post(environment.apiUrl + this.controllerPath + '/import-excel', data, { headers }); 
      }
    
      exportToExcel(MedicalHistoryList: MedicalHistory[]): Observable<any> {
        const headers = new HttpHeaders();
        
        const options = {
          headers: headers,
          observe: 'response' as 'body',
          responseType: 'blob' as 'json',
          body: new Blob([JSON.stringify(MedicalHistoryList)], { type: 'application/json' })
        };
       
        return this.http.request<Blob>('POST', `${environment.apiUrl + this.controllerPath}/export-to-excel`, options);
      }
}
