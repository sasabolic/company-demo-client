import {Component, OnInit} from '@angular/core';
import {Company} from "../../models/company";
import {CompanyService} from "../../services/company.service";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  selectedCompany: Company;
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
    this.selectedCompany = new Company();
  }

  getCompanies(): void {
    this.companyService.getCompanies()
      .subscribe(companies => this.companies = companies);
  }

  getCompany(id: number) {
    this.companyService.getCompany(id)
      .subscribe(c => this.selectedCompany = c);
  }

  receiveMessage($event) {
    console.log('Message received: ' + $event);
    if ($event === 'refresh') {
      this.getCompanies();
    }
  }

}
