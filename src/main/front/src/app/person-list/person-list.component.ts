import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from '../commons'
import {PersonService} from '../services/person.service';
import {Person} from '../domain';
import {Observable} from "rxjs/Observable";


@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, Table<Person> {

    personPage: PaginationPage<Person>;
    self: Table<Person>;

    constructor(private personService: PersonService,
                private router: Router) { }

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let observable: Rx.Observable<PaginationPage<Person>> = this.personService.getPersonList(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
    }

    search(input) {
      let observable: Rx.Observable<PaginationPage<any>> = this.lookupPerson(input, 0, 10, null);
      showLoading();
      observable.subscribe(doNothing, hideLoading, hideLoading);
    }

    lookupPerson(input, pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
      let observable: Rx.Observable<PaginationPage<Person>> = this.personService.lookup(input, pageNumber, pageSize, sort);
      observable.subscribe(personPage => this.personPage = personPage);
      return observable;
    }

    delete(person) {
      let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
      showLoading();
      observable.switchMap(() => {
        return this.fetchPage(0, 10, null);
      }).subscribe(doNothing, hideLoading, hideLoading);
    }

    goToDetails(person) {
      this.router.navigate(['person', person.id]);
    }

    goToEdit(person) {
      this.router.navigate(['edit', person.id]);
    }

    goToAddPage() {
      this.router.navigate(['add']);
    }

}
