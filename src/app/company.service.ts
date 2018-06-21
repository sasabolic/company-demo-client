import {Injectable} from '@angular/core';
import {Company} from "./company";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from "rxjs/internal/observable/of";

import {CompanyDetails} from "./company-details";
import {CompanySave} from "./company-save";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companiesUrl = 'http://localhost:8080/companies';

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl)
      .pipe(
        tap(() => console.log(`Received list of companies`)),
        catchError(this.handleError('getCompanies', []))
      );
    ;
  }

  /** GET company by id. Will 404 if id not found */
  getCompany(id: number): Observable<CompanyDetails> {
    const url = `${this.companiesUrl}/${id}`;

    return this.http.get<CompanyDetails>(url).pipe(
      tap(() => console.log(`Received company with id=${id}`)),
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }

  /** PUT: update the company on the server */
  updateCompany(company: CompanyDetails): Observable<any> {
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
  saveCompany (company: CompanyDetails): Observable<any> {
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
    // return this.http.post<Company>(this.companiesUrl, saveCompanyRequest, httpOptions).pipe(
      // tap((company: Company) => console.log(`Created company with id=${company.id}`)),
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
