import {Injectable} from '@angular/core';
import {Company} from "../models/company";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {CompanySave} from "../models/company-save";
import {MatSnackBar} from "@angular/material";
import {environment} from "../../environments/environment";
import {BaseService} from "./base.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService {
  private companiesUrl = `${environment.apiPath}/companies`;

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) {
    super(snackBar);
  }

  /** GET all companies */
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
    let saveCompanyRequest = this.toSaveRequest(company);
    return this.http.put(`${this.companiesUrl}/${company.id}`, saveCompanyRequest, httpOptions)
      .pipe(
        tap(() => this.handleSuccess(`Company ${saveCompanyRequest.name} updated!`)),
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
      tap(() => this.handleSuccess(`Company ${saveCompanyRequest.name} created!`)),
      catchError(this.handleError<Company>('saveCompany'))
    );
  }

  private toSaveRequest(company: Company) {
    let saveCompanyRequest: CompanySave = {
      name: company.name,
      address: company.address,
      city: company.city,
      country: company.country,
      email: company.email,
      phone_number: company.phone_number,
      owners: company.owners.map(o => o.id)
    };
    return saveCompanyRequest;
  }
}
