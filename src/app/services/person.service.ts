import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Person } from '../classes/person';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  public personData = new BehaviorSubject<Person[]>([]);

  constructor(private apiService: ApiService) { }

  search(keywords: string[]): void {
    this.apiService.doSearch(keywords.join('|'))
        .subscribe(results => this.personData.next(results));
  }
}
