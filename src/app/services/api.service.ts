import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from '../classes/person';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const graphqlHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/graphql' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'assets/data.json';
  private apiUrl = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // TODO: Awaiting GraphQL Function
  getAllPersons(): Observable<Person> {
    const query = `{
      person(id: 1) {
        id
        fullName
        internalEmployeeType {
          short
        }
        internalEmployeeStatus {
          short
        }
        degree {
          long
        }
        positionAppliedFor
        email
      }
    }`;
    return this.http.post<Person>(this.apiUrl, query, graphqlHttpOptions).pipe(
      tap((person: any) => this.log(`person w/ id=${person}`)),
      tap((test: any) => console.log({'return': test})),
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  // TODO: Pass in ID
  getPersonApi(givenPersonId: number): Observable<Person> {
    const query = `{
      person(id: ${givenPersonId}) {
        id
        fullName
        internalEmployeeType {
          short
        }
        internalEmployeeStatus {
          short
        }
        degree {
          long
        }
        positionAppliedFor
        email
      }
    }`;

    return this.http.post<Person>(this.apiUrl, query, graphqlHttpOptions).pipe(
      tap((person: any) => this.log(`person w/ id=${person}`)),
      tap((test: any) => console.log({'return': test})),
      map(res => this.graphQLPersonToPerson(res.data.person)),
      tap((test: any) => console.log({'return2': test})),
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  private graphQLPersonToPerson(givenPerson: any): Person {
    return {
      id: givenPerson.id,
      name: givenPerson.fullName,
      status: givenPerson.internalEmployeeStatus.short,
      degree: givenPerson.degree.long,
      date: givenPerson.date,
      clearance: givenPerson.clearance,
      pdfSrc: givenPerson.pdfSrc,
      // comments: this.graphQLCommentsToComments(givenPerson.comments)
    };
  }

  private graphQLCommentsToComments(givenComments: any[]): {
    comment: string, id: number, date: string, name: string }[] {
    return givenComments.map(givenComment => {
      return {
      id: givenComment.id,
      comment: givenComment.comment,
      date: givenComment.date,
      name: givenComment.name
      };
    });
  }

//   private graphQLPersonToPerson(givenPerson: any): Person {
//     const newPerson = new Person();
//     newPerson.id = givenPerson.id;
//     newPerson.name = givenPerson.fullName;
//     newPerson.status = givenPerson.internalEmployeeStatus.short;
//     newPerson.degree = givenPerson.degree.long;
//     return newPerson;
// }

  // TODO: Awaiting GraphQL functionality
  createPerson(givenPerson: Person): boolean {

    console.log({'person': givenPerson});

    const mutator = `
      mutation CreatePerson($givenPerson: Person!, $givenResume: Resume) {
        createPerson(person: $givenPerson, resume: $givenResume) {
          person{
            id
            name
          }
        }
      }
    `;
    return this.http.post<Person>(this.apiUrl, mutator, graphqlHttpOptions).pipe(
      tap((person: any) => this.log(`person w/ id=${person}`)),
      tap((test: any) => console.log({'return': test})),
      catchError(this.handleError<Person>('addPerson'))
    ), true;
  }


  /** GET all results from the server */
  getResults (): Observable<Person[]> {
    return this.http.get<Person[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched results')),
        catchError(this.handleError('getResults', [])),
        map(response => response['data'])
      );
  }

  // /** GET person by id. Return `undefined` when id not found */
  // getResultsNo404<Data>(id: number): Observable<Person> {
  //   const url = `${this.url}/?id=${id}`;
  //   return this.http.get<Person>(url)
  //     .pipe(
  //       map(response => response['data']),
  //       map(allPersons => allPersons.find(person => person.id === id)),
  //       tap(person => {
  //         const outcome = person ? `fetched` : `did not find`;
  //         this.log(`${outcome} result id=${id}`);
  //       }),
  //       catchError(this.handleError<Person>(`getResults id=${id}`)),
  //     );
  // }

  // /* GET peron(s) whose name contains search term */
  // searchPersons(term: string): Observable<Person[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty person array.
  //     return of([]);
  //   }
  //   return this.http.get<Person[]>(`${this.url}/?name=${term}`).pipe(
  //     tap(_ => this.log(`found persons matching "${term}"`)),
  //     catchError(this.handleError<Person[]>('searchPersons', []))
  //   );
  // }

  // //////// Save methods //////////

  // /** POST: add a new person to the server */
  // addPerson (givenPerson: Person): Observable<Person> {
  //   return this.http.post<Person>(this.url, givenPerson, httpOptions).pipe(
  //     tap((person: Person) => this.log(`added person w/ id=${person.id}`)),
  //     catchError(this.handleError<Person>('addPerson'))
  //   );
  // }

  // /** DELETE: delete the person from the server */
  // deletePerson (person: Person | number): Observable<Person> {
  //   const id = typeof person === 'number' ? person : person.id;
  //   const url = `${this.url}/${id}`;

  //   return this.http.delete<Person>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted person id=${id}`)),
  //     catchError(this.handleError<Person>('deletePerson'))
  //   );
  // }

  // /** PUT: update the person on the server */
  // updatePerson (person: Person): Observable<any> {
  //   return this.http.put(this.url, person, httpOptions).pipe(
  //     tap(_ => this.log(`updated person id=${person.id}`)),
  //     catchError(this.handleError<any>('updatePerson'))
  //   );
  // }

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
