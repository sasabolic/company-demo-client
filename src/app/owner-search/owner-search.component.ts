import {Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";
import {Owner} from "../owner";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {OwnerService} from "../owner.service";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import {CompanyDetails} from "../company-details";

@Component({
  selector: 'app-owner-search',
  templateUrl: './owner-search.component.html',
  styleUrls: ['./owner-search.component.css']
})
export class OwnerSearchComponent implements OnInit {
  owners$: Observable<Owner[]>;
  private searchTerms = new Subject<string>();
  @Input() owners: Owner[];

  myControl: FormControl = new FormControl();

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  @ViewChild('ownerInput') ownerInput: ElementRef;


  @Output() messageEvent = new EventEmitter<Owner>();

  constructor(private ownerService: OwnerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  displayFn(owner?: Owner): string | undefined {
    return owner ? owner.name : undefined;
  }

  // onSelect(owner: Owner) {
  //   alert("selected: " +owner);
  //   this.searchTerms.next('');
  //   this.messageEvent.emit(owner);
  // }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('event: ' + event.option.viewValue);
    console.log('event1: ' +  event.option.value);

    // don't add if already exists
    if (!this.owners.find(o => o.id == event.option.value.id)) {
      this.owners.push(event.option.value);
    }

    this.ownerInput.nativeElement.value = '';
    this.myControl.setValue(null);

    this.searchTerms.next('');
  }

  remove(owner: any): void {
    const index = this.owners.indexOf(owner);

    if (index >= 0) {
      this.owners.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.owners$ = this.searchTerms.pipe(
      // // wait 300ms after each keystroke before considering the term
      // debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.ownerService.searchOwners(term)),
    );
  }


}
