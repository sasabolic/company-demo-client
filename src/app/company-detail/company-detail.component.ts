import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Company} from "../company";
import {CompanyService} from "../company.service";
import {CompanyDetails} from "../company-details";
import {Owner} from "../owner";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  @Input() company: CompanyDetails;
  @Output() messageEvent = new EventEmitter<CompanyDetails>();

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
  }

  save(): void {
    if (this.company.id) {
      this.companyService.updateCompany(this.company)
        .subscribe(() => this.messageEvent.emit('refresh'));
    } else {
      this.companyService.saveCompany(this.company)
        .subscribe(success => {
          alert('created: ' + success);
          this.messageEvent.emit('refresh');

        });
    }
  }

  removeOwner(owner: Owner) {
    this.company.owners = this.company.owners.filter(o => o.id !== owner.id);
  }

  receiveMessage($event) {
    if (!this.company.owners.find(o => o.id == $event.id)) {
      this.company.owners.push($event)
    }
  }
}
