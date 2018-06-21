import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {of} from "rxjs/internal/observable/of";

import {Owner} from "./owner";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private ownersUrl = `${environment.apiPath}/owners`;

  constructor(private http: HttpClient) {
  }

  /** GET owners whose name contains search term **/
  searchOwners(term: string): Observable<Owner[]> {
    if (!term.trim()) {
      // if not search term, return empty owner array.
      return of([]);
    }
    return this.http.get<Owner[]>(`${this.ownersUrl}/?name=${term}`)
      .pipe(
        tap(() => console.log(`Received owners matching "${term}"`)),
        catchError(this.handleError<Owner[]>('searchOwners', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
