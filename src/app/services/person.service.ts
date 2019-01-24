import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PersonSummary } from '../classes/person-summary';

import { ApiService } from './api.service';

import { Keyword } from '../interfaces/keyword';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  keywords: Keyword[] = [];

  public personData = new BehaviorSubject<PersonSummary[]>([]);

  constructor(private apiService: ApiService) { }

  search(keywords: string[]): void {
    this.apiService.doSearch(keywords.join('|'))
        .subscribe(results => this.personData.next(results));
  }
}
