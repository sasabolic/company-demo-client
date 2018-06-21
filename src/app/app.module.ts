import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompaniesComponent } from './companies/companies.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { HttpClientModule } from "@angular/common/http";
import { OwnerSearchComponent } from './owner-search/owner-search.component';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatProgressSpinnerModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    OwnerSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
