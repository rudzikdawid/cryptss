import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ConversationService } from '../conversation.service';
import * as conversationActions from '../state/conversation.actions';
import { ConversationState } from '../state/conversation.reducer';

@Component({
  selector: 'app-add-conversation',
  templateUrl: './add-conversation.component.html',
  styleUrls: ['./add-conversation.component.scss']
})
export class AddConversationComponent implements OnInit {
  @ViewChild('contactInput') contactInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
      private router: Router,
      private conversationService: ConversationService,
      private conversationStore: Store<ConversationState>,
  ) {}

  ngOnInit() {
    this.listContactsSubscription$ = this.conversationService
      .listContacts()
      .subscribe({
          next: (response) => {
              this.allContacts = response;
              this.availableContacts = [...this.allContacts];

              this.filteredContacts = this.contactCtrl.valueChanges.pipe(
                  startWith(null),
                  map((contact: string | null) => contact ? this._filter(contact) : this.allContacts.slice())
              );
          }
      });
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  contactCtrl = new FormControl();
  filteredContacts: Observable<object[]>;
  contacts = [];

  allContacts;
  listContactsSubscription$;
  availableContacts;



  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.contacts.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.contactCtrl.setValue(null);
    }

    this.refreshAvailableContacts();
  }

  remove(contact: string): void {
    const index = this.contacts.indexOf(contact);

    if (index >= 0) {
      this.contacts.splice(index, 1);
    }

    this.refreshAvailableContacts();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.contacts.push(event.option.viewValue);
    this.contactInput.nativeElement.value = '';
    this.contactCtrl.setValue(null);
  }

  private _filter(value: string): object[] {
    const filterValue = value.toLowerCase();

    return this.allContacts.filter(contact => contact.name.toLowerCase().indexOf(filterValue) === 0);
  }

  addNewConversation() {
    this.conversationStore.dispatch(new conversationActions.AddConversation({
      uuid: null,
      name: this.contacts.join(', '),
      last_activity: null,
      last_message: null
    }));

    this.router.navigate(['/workspace/list-conversation']);
  }

  addContact(contact) {
    this.contacts.push(contact.name);
    this.refreshAvailableContacts();
  }

  refreshAvailableContacts() {
    this.availableContacts = this.allContacts.filter(contact => !this.contacts.includes(contact.name));
  }

}
