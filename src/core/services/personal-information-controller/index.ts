/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { PersonalInformationControllerAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './personal-information-controller-api-client.service';
import { GuardedPersonalInformationControllerAPIClient } from './guarded-personal-information-controller-api-client.service';

export { PersonalInformationControllerAPIClient } from './personal-information-controller-api-client.service';
export { PersonalInformationControllerAPIClientInterface } from './personal-information-controller-api-client.interface';
export { GuardedPersonalInformationControllerAPIClient } from './guarded-personal-information-controller-api-client.service';

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

export interface PersonalInformationControllerAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class PersonalInformationControllerAPIClientModule {
  /**
   * Use this method in your root module to provide the PersonalInformationControllerAPIClientModule
   *
   * If you are not providing
   * @param { PersonalInformationControllerAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: PersonalInformationControllerAPIClientModuleConfig = {}): ModuleWithProviders<PersonalInformationControllerAPIClientModule> {
    return {
      ngModule: PersonalInformationControllerAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: PersonalInformationControllerAPIClient, useClass: GuardedPersonalInformationControllerAPIClient }] : [PersonalInformationControllerAPIClient]),
      ]
    };
  }
}
