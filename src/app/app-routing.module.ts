import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CompaniesComponent} from "./companies/companies.component";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";

const routes: Routes = [
  { path: 'companies', component: CompaniesComponent },
  { path: '', redirectTo: '/companies', pathMatch: 'full' },
  { path: 'company/:id', component: CompanyDetailComponent }
];

@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { }
