/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HairLossControllerAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './hair-loss-controller-api-client.service';
import { GuardedHairLossControllerAPIClient } from './guarded-hair-loss-controller-api-client.service';

export { HairLossControllerAPIClient } from './hair-loss-controller-api-client.service';
export { HairLossControllerAPIClientInterface } from './hair-loss-controller-api-client.interface';
export { GuardedHairLossControllerAPIClient } from './guarded-hair-loss-controller-api-client.service';

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

export interface HairLossControllerAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class HairLossControllerAPIClientModule {
  /**
   * Use this method in your root module to provide the HairLossControllerAPIClientModule
   *
   * If you are not providing
   * @param { HairLossControllerAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: HairLossControllerAPIClientModuleConfig = {}): ModuleWithProviders<HairLossControllerAPIClientModule> {
    return {
      ngModule: HairLossControllerAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: HairLossControllerAPIClient, useClass: GuardedHairLossControllerAPIClient }] : [HairLossControllerAPIClient]),
      ]
    };
  }
}
