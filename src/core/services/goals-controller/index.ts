/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { GoalsControllerAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './goals-controller-api-client.service';
import { GuardedGoalsControllerAPIClient } from './guarded-goals-controller-api-client.service';

export { GoalsControllerAPIClient } from './goals-controller-api-client.service';
export { GoalsControllerAPIClientInterface } from './goals-controller-api-client.interface';
export { GuardedGoalsControllerAPIClient } from './guarded-goals-controller-api-client.service';

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

export interface GoalsControllerAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class GoalsControllerAPIClientModule {
  /**
   * Use this method in your root module to provide the GoalsControllerAPIClientModule
   *
   * If you are not providing
   * @param { GoalsControllerAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: GoalsControllerAPIClientModuleConfig = {}): ModuleWithProviders<GoalsControllerAPIClientModule> {
    return {
      ngModule: GoalsControllerAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: GoalsControllerAPIClient, useClass: GuardedGoalsControllerAPIClient }] : [GoalsControllerAPIClient]),
      ]
    };
  }
}
