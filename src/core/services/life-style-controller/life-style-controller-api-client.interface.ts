/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';


export interface LifeStyleControllerAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  updateLifeStyle(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createLifeStyle(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getLifeStyleById(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllLifeStyles(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteLifeStyle(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

}
