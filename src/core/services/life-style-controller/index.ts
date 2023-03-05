/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { LifeStyleControllerAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './life-style-controller-api-client.service';
import { GuardedLifeStyleControllerAPIClient } from './guarded-life-style-controller-api-client.service';

export { LifeStyleControllerAPIClient } from './life-style-controller-api-client.service';
export { LifeStyleControllerAPIClientInterface } from './life-style-controller-api-client.interface';
export { GuardedLifeStyleControllerAPIClient } from './guarded-life-style-controller-api-client.service';

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
  body: any;
}

export interface LifeStyleControllerAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class LifeStyleControllerAPIClientModule {
  /**
   * Use this method in your root module to provide the LifeStyleControllerAPIClientModule
   *
   * If you are not providing
   * @param { LifeStyleControllerAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: LifeStyleControllerAPIClientModuleConfig = {}): ModuleWithProviders<LifeStyleControllerAPIClientModule> {
    return {
      ngModule: LifeStyleControllerAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: LifeStyleControllerAPIClient, useClass: GuardedLifeStyleControllerAPIClient }] : [LifeStyleControllerAPIClient]),
      ]
    };
  }
}
