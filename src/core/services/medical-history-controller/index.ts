/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { MedicalHistoryControllerAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './medical-history-controller-api-client.service';
import { GuardedMedicalHistoryControllerAPIClient } from './guarded-medical-history-controller-api-client.service';

export { MedicalHistoryControllerAPIClient } from './medical-history-controller-api-client.service';
export { MedicalHistoryControllerAPIClientInterface } from './medical-history-controller-api-client.interface';
export { GuardedMedicalHistoryControllerAPIClient } from './guarded-medical-history-controller-api-client.service';

/**
 * provided options, headers and params will be used as default for each request
 */
export interface DefaultHttpOptions {
  headers?: {[key: string]: string};
  params?: {[key: string]: string};
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface MedicalHistoryControllerAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class MedicalHistoryControllerAPIClientModule {
  /**
   * Use this method in your root module to provide the MedicalHistoryControllerAPIClientModule
   *
   * If you are not providing
   * @param { MedicalHistoryControllerAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: MedicalHistoryControllerAPIClientModuleConfig = {}): ModuleWithProviders<MedicalHistoryControllerAPIClientModule> {
    return {
      ngModule: MedicalHistoryControllerAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: MedicalHistoryControllerAPIClient, useClass: GuardedMedicalHistoryControllerAPIClient }] : [MedicalHistoryControllerAPIClient]),
      ]
    };
  }
}
