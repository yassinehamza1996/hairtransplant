/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';


export interface GoalsControllerAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  updateGoals(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createGoals(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getGoalsById(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAllGoalss(
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  deleteGoals(
    args: {
      id: any,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<void>;

}
