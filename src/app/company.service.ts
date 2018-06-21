import {Injectable} from '@angular/core';
import {Company} from "./company";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {of} from "rxjs/internal/observable/of";

import {CompanySave} from "./company-save";
import {MatSnackBar} from "@angular/material";
import {environment} from "../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companiesUrl = `${environment.apiPath}/companies`;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(() => console.log(`Received list of companies`)),
        catchError(this.handleError('getCompanies', []))
      );
  }

  /** GET company by id. Will 404 if id not found */
  getCompany(id: number): Observable<Company> {
    const url = `${this.companiesUrl}/${id}`;

    return this.http.get<Company>(url).pipe(
      tap(() => console.log(`Received company with id=${id}`)),
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }

  /** PUT: update the company on the server */
  updateCompany(company: Company): Observable<any> {
    let saveCompanyRequest: CompanySave = {
      name: company.name,
      address: company.address,
      city: company.city,
      country: company.country,
      email: company.email,
      phone_number: company.phone_number,
      owners: company.owners.map(o => o.id)
    };
    return this.http.put(`${this.companiesUrl}/${company.id}`, saveCompanyRequest, httpOptions)
      .pipe(
        tap(_ => console.log(`Updated company with id=${company.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** POST: add a new company to the server */
  saveCompany(company: Company): Observable<any> {
    let saveCompanyRequest: CompanySave = {
      name: company.name,
      address: company.address,
      city: company.city,
      country: company.country,
      email: company.email,
      phone_number: company.phone_number,
      owners: company.owners.map(o => o.id)
    };
    return this.http.post(this.companiesUrl, saveCompanyRequest, httpOptions).pipe(
      tap(() => console.log(`Created company`)),
      catchError(this.handleError<Company>('saveCompany'))
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

      // Log error to console
      console.error(error);

      let e = error.error;

      this.openSnackBar(e.message + ': ' + e.errors, "Error");

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition:'end'
    });
  }
}
