import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';

import { Keyword } from '../interfaces/keyword';

import { PersonService } from '../services/person.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private personService: PersonService) {
    this.keywords = personService.keywords;
  }

  @Input() appearance = '';

  @Input() keywords;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.keywords.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }

    this.keywordSearch();
  }

  remove(keyword: Keyword): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
    this.keywordSearch();
  }

  keywordSearch(): void {
    this.personService.keywords = this.keywords;
    this.personService.search(this.keywords.map(word => word.name));
  }
}
