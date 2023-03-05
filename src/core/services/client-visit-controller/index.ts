/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ClientVisitControllerAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './client-visit-controller-api-client.service';
import { GuardedClientVisitControllerAPIClient } from './guarded-client-visit-controller-api-client.service';

export { ClientVisitControllerAPIClient } from './client-visit-controller-api-client.service';
export { ClientVisitControllerAPIClientInterface } from './client-visit-controller-api-client.interface';
export { GuardedClientVisitControllerAPIClient } from './guarded-client-visit-controller-api-client.service';

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

export interface ClientVisitControllerAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class ClientVisitControllerAPIClientModule {
  /**
   * Use this method in your root module to provide the ClientVisitControllerAPIClientModule
   *
   * If you are not providing
   * @param { ClientVisitControllerAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: ClientVisitControllerAPIClientModuleConfig = {}): ModuleWithProviders<ClientVisitControllerAPIClientModule> {
    return {
      ngModule: ClientVisitControllerAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: ClientVisitControllerAPIClient, useClass: GuardedClientVisitControllerAPIClient }] : [ClientVisitControllerAPIClient]),
      ]
    };
  }
}
