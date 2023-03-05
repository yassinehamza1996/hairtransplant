/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';


export interface PersonalInformationControllerAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  updatePersonalInformation(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createPersonalInformation(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  importExcel1(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  exportPersonalInformationToExcel1(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getPersonalInformationById(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllPersonalInformations(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllPersonalInformationsIdMail(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getCountPersonalInformations(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deletePersonalInformation(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteAllPersonalInformations(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

}
