import {Component, OnInit} from '@angular/core';
import {Company} from "../company";
import {CompanyService} from "../company.service";
import {CompanyDetails} from "../company-details";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  selectedCompanyDetails: CompanyDetails;
  companies: Company[];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.getCompanies();
  }

  onSelect(company: Company): void {
    this.getCompany(company.id);
  }

  onNew(): void {
    this.selectedCompanyDetails = new CompanyDetails();
  }

  getCompanies(): void {
    this.companyService.getCompanies()
      .subscribe(companies => this.companies = companies);
  }

  getCompany(id: number) {
    this.companyService.getCompany(id)
      .subscribe(c => this.selectedCompanyDetails = c);
  }

  receiveMessage($event) {
    alert('Message received: ' + $event);
    // let index = this.companies.findIndex(c => c.id == $event.id);
    // alert('index: ' + index);
    // if (index === -1) {
    //   this.companies.push($event)
    // } else {
    //   this.companies[index] = $event;
    // }
    if ($event === 'refresh') {
      this.getCompanies();
    }
  }

}