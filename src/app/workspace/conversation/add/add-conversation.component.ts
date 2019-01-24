import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WorkspaceService } from '../../workspace.service';

@Component({
  selector: 'app-add-conversation',
  templateUrl: './add-conversation.component.html',
  styleUrls: ['./add-conversation.component.scss']
})
export class AddConversationComponent implements OnInit {

  constructor(private workspaceService: WorkspaceService) {
    this.filteredContacts = this.contactCtrl.valueChanges.pipe(
      startWith(null),
      map((contact: string | null) => contact ? this._filter(contact) : this.allContacts.slice())
    );
  }

  ngOnInit() {
    this.workspaceService.toolbarTitle.next('New Conversation');
    this.workspaceService.routeButton.next({icon: 'arrow_back', route: '/workspace/list-conversation'});
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  contactCtrl = new FormControl();
  filteredContacts: Observable<object[]>;
  contacts = [];

  allContacts = [
    //todo get data from server
  ];

  availableContacts = [...this.allContacts];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

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

  remove(fruit: string): void {
    const index = this.contacts.indexOf(fruit);

    if (index >= 0) {
      this.contacts.splice(index, 1);
    }

    this.refreshAvailableContacts();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.contacts.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.contactCtrl.setValue(null);
  }

  private _filter(value: string): object[] {
    const filterValue = value.toLowerCase();

    return this.allContacts.filter(contact => contact.name.toLowerCase().indexOf(filterValue) === 0);
  }

  addNewConversation() {
    //todo
  }

  addContact(contact) {
    this.contacts.push(contact.name);
    this.refreshAvailableContacts();
  }

  refreshAvailableContacts() {
    this.availableContacts = this.allContacts.filter(contact => !this.contacts.includes(contact.name));
  }

}
