import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {of} from "rxjs/internal/observable/of";

import {Owner} from "../models/owner";
import {environment} from "../../environments/environment";
import {BaseService} from "./base.service";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class OwnerService extends BaseService {
  private ownersUrl = `${environment.apiPath}/owners`;

  constructor(private http: HttpClient, protected snackBar: MatSnackBar) {
    super(snackBar);
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
}
