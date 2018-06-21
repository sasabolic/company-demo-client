import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyService} from "../company.service";
import {CompanyDetails} from "../company-details";
import {ErrorMessageComponent} from "../error-message/error-message.component";

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
        .subscribe(result => {
          this.messageEvent.emit('refresh');
        }
      );
    }
  }

  receiveMessage($event) {
    if (!this.company.owners.find(o => o.id == $event.id)) {
      this.company.owners.push($event)
    }
  }
}
