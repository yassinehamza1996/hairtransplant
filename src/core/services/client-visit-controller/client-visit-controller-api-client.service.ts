/* tslint:disable */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DefaultHttpOptions, HttpOptions, ClientVisitControllerAPIClientInterface } from './';


export const USE_DOMAIN = new InjectionToken<string>('ClientVisitControllerAPIClient_USE_DOMAIN');
export const USE_HTTP_OPTIONS = new InjectionToken<HttpOptions>('ClientVisitControllerAPIClient_USE_HTTP_OPTIONS');

type APIHttpOptions = HttpOptions & {
  headers: HttpHeaders;
  params: HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
};

/**
 * Created with https://github.com/flowup/api-client-generator
 */
@Injectable()
export class ClientVisitControllerAPIClient implements ClientVisitControllerAPIClientInterface {

  readonly options: APIHttpOptions;

  readonly domain: string = `//${window.location.hostname}${window.location.port ? ':'+window.location.port : ''}`;

  constructor(private readonly http: HttpClient,
              @Optional() @Inject(USE_DOMAIN) domain?: string,
              @Optional() @Inject(USE_HTTP_OPTIONS) options?: DefaultHttpOptions) {

    if (domain != null) {
      this.domain = domain;
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
  updateClientVisit(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/clientVisitController/update/${args.id}`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('PUT', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createClientVisit(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/clientVisitController/save`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('POST', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getClientVisitById(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/clientVisitController/${args.id}`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllClientVisits(
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/clientVisitController/search/all`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<void>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteClientVisit(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void> {
    const path = `/api/clientVisitController/delete/${args.id}`;
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