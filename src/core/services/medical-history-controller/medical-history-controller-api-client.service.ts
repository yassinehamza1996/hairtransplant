/* tslint:disable */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DefaultHttpOptions, HttpOptions, MedicalHistoryControllerAPIClientInterface } from './';
import { environment } from 'src/environments/environment';

export const USE_DOMAIN = new InjectionToken<string>('MedicalHistoryControllerAPIClient_USE_DOMAIN');
export const USE_HTTP_OPTIONS = new InjectionToken<HttpOptions>('MedicalHistoryControllerAPIClient_USE_HTTP_OPTIONS');

type APIHttpOptions = HttpOptions & {
  headers: HttpHeaders;
  params: HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
};

/**
 * Created with https://github.com/flowup/api-client-generator
 */
@Injectable({providedIn:'root'})
export class MedicalHistoryControllerAPIClient implements MedicalHistoryControllerAPIClientInterface {

  readonly options: APIHttpOptions;

  readonly domain: string = `//${window.location.hostname}${window.location.port ? ':'+window.location.port : ''}`;

  constructor(private readonly http: HttpClient,
              @Optional() @Inject(USE_DOMAIN) domain?: string,
              @Optional() @Inject(USE_HTTP_OPTIONS) options?: DefaultHttpOptions) {

    if (domain != null) {
      this.domain = domain;
    }else{
      this.domain = environment.urlApi
    }

    this.options = {
      headers: new HttpHeaders(options && options.headers ? options.headers : {}),
      params: new HttpParams(options && options.params ? options.params : {}),
      ...(options && options.reportProgress ? { reportProgress: options.reportProgress } : {}),
      ...(options && options.withCredentials ? { withCredentials: options.withCredentials } : {})
    };
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  updateMedicalHistory(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/update/${args.id}`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('PUT', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createMedicalHistory(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/save`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('POST', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  importExcel(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/import-excel`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('POST', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  exportPersonalInformationToExcel(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/export-to-excel`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('POST', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getMedicalHistoryById(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/${args.id}`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllMedicalHistorys(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/search/all`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getCountMedicalHistorys(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/count`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteMedicalHistory(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/delete/${args.id}`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('DELETE', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteAllmedicalHistory(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/medicalHistoryController/delete/all`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('DELETE', path, options);
  }

  private sendRequest<T>(method: string, path: string, options: HttpOptions, body?: any): Observable<T> {
    switch (method) {
      case 'DELETE':
        return this.http.delete<T>(`${this.domain}${path}`, options);
      case 'GET':
        return this.http.get<T>(`${this.domain}${path}`, options);
      case 'HEAD':
        return this.http.head<T>(`${this.domain}${path}`, options);
      case 'OPTIONS':
        return this.http.options<T>(`${this.domain}${path}`, options);
      case 'PATCH':
        return this.http.patch<T>(`${this.domain}${path}`, body, options);
      case 'POST':
        return this.http.post<T>(`${this.domain}${path}`, body, options);
      case 'PUT':
        return this.http.put<T>(`${this.domain}${path}`, body, options);
      default:
        console.error(`Unsupported request: ${method}`);
        return throwError(`Unsupported request: ${method}`);
    }
  }
}
