import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from '../classes/person';

import { MessageService } from './message.service';

const graphqlHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/graphql' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient, private messageService: MessageService) { }

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

    return this.http.post<{data: {person}}>(this.apiUrl, query, graphqlHttpOptions).pipe(
      map(res => this.graphQLPersonToPerson(res.data.person)),
      catchError(this.handleError<Person>('getPerson'))
    );
  }

  doSearch(givenKeywords: string): Observable<Person[]> {
    const query = `{
      keywordSearchResumes(keywords: "${givenKeywords}") {
        person {
          id
          fullName
          internalEmployeeType {
            short
          }
          degree {
            long
          }
          securityClearance {
            long
          }
        }
      }
    }`;

    return this.http.post<{data: {keywordSearchResumes}}>(this.apiUrl, query, graphqlHttpOptions).pipe(
      map(res => res.data.keywordSearchResumes.map(person => this.graphQLPersonToPerson(person.person))),
      catchError(this.handleError('doSearch'))
    );
  }

  private graphQLPersonToPerson(givenPerson: any): Person {
    return {
      id: givenPerson.id,
      name: givenPerson.fullName,
      status: givenPerson.internalEmployeeType.short,
      degree: givenPerson.degree.long,
      date: givenPerson.date,
      clearance: givenPerson.securityClearance.long,
      pdfSrc: givenPerson.pdfSrc,
      // comments: this.graphQLCommentsToComments(givenPerson.comments)
    };
  }

  // TODO: To be implemented
  // private graphQLCommentsToComments(givenComments: any[]): {
  //   comment: string, id: number, date: string, name: string }[] {
  //   return givenComments.map(givenComment => {
  //     return {
  //     id: givenComment.id,
  //     comment: givenComment.comment,
  //     date: givenComment.date,
  //     name: givenComment.name
  //     };
  //   });
  // }

//   private graphQLPersonToPerson(givenPerson: any): Person {
//     const newPerson = new Person();
//     newPerson.id = givenPerson.id;
//     newPerson.name = givenPerson.fullName;
//     newPerson.status = givenPerson.internalEmployeeStatus.short;
//     newPerson.degree = givenPerson.degree.long;
//     return newPerson;
// }

  // TODO: To be implemented
  // createPerson(givenPerson: Person): boolean {
  //   const mutator = `
  //     mutation CreatePerson($givenPerson: Person!, $givenResume: Resume) {
  //       createPerson(person: $givenPerson, resume: $givenResume) {
  //         person{
  //           id
  //           name
  //         }
  //       }
  //     }
  //   `;
  //   return this.http.post<Person>(this.apiUrl, mutator, graphqlHttpOptions).pipe(
  //     catchError(this.handleError<Person>('createPerson'))
  //   ), true;
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
