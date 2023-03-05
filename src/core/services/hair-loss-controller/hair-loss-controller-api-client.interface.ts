/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';


export interface HairLossControllerAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  updateHairLoss(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createHairLoss(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getHairLossById(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllHairLosss(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteHairLoss(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

}
