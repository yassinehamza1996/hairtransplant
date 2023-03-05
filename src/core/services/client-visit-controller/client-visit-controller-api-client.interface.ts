/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';

export interface ClientVisitControllerAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  updateClientVisit(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createClientVisit(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getClientVisitById(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllClientVisits(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteClientVisit(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

}
