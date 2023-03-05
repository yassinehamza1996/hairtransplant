/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';


export interface SwaggerExporterAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  downloadJsonData(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

}
