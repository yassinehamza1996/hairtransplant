/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { SwaggerExporterAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './swagger-exporter-api-client.service';
import { GuardedSwaggerExporterAPIClient } from './guarded-swagger-exporter-api-client.service';

export { SwaggerExporterAPIClient } from './swagger-exporter-api-client.service';
export { SwaggerExporterAPIClientInterface } from './swagger-exporter-api-client.interface';
export { GuardedSwaggerExporterAPIClient } from './guarded-swagger-exporter-api-client.service';

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

export interface SwaggerExporterAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class SwaggerExporterAPIClientModule {
  /**
   * Use this method in your root module to provide the SwaggerExporterAPIClientModule
   *
   * If you are not providing
   * @param { SwaggerExporterAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: SwaggerExporterAPIClientModuleConfig = {}): ModuleWithProviders<SwaggerExporterAPIClientModule> {
    return {
      ngModule: SwaggerExporterAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: SwaggerExporterAPIClient, useClass: GuardedSwaggerExporterAPIClient }] : [SwaggerExporterAPIClient]),
      ]
    };
  }
}
