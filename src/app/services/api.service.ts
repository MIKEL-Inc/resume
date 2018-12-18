import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from '../classes/person';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'assets/data.json';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET all results from the server */
  getResults (): Observable<Person[]> {
    return this.http.get<Person[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched results')),
        catchError(this.handleError('getResults', [])),
        map(response => response['data'])
      );
  }

  /** GET person by id. Return `undefined` when id not found */
  getResultsNo404<Data>(id: number): Observable<Person> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Person>(url)
      .pipe(
        map(response => response['data']),
        map(allPersons => allPersons.find(person => person.id === id)),
        tap(person => {
          const outcome = person ? `fetched` : `did not find`;
          this.log(`${outcome} result id=${id}`);
        }),
        catchError(this.handleError<Person>(`getResults id=${id}`)),
      );
  }

  /* GET peron(s) whose name contains search term */
  searchPersons(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if not search term, return empty person array.
      return of([]);
    }
    return this.http.get<Person[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found persons matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchPersons', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new person to the server */
  addPerson (givenPerson: Person): Observable<Person> {
    return this.http.post<Person>(this.url, givenPerson, httpOptions).pipe(
      tap((person: Person) => this.log(`added person w/ id=${person.id}`)),
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  /** DELETE: delete the person from the server */
  deletePerson (person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Person>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  /** PUT: update the person on the server */
  updatePerson (person: Person): Observable<any> {
    return this.http.put(this.url, person, httpOptions).pipe(
      tap(_ => this.log(`updated person id=${person.id}`)),
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
