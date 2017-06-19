import {Injectable} from '@angular/core';
import {Person} from '../domain'
import {PaginationPage, PaginationPropertySort} from '../pagination';
import {webServiceEndpoint} from '../commons';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import {Observable} from "rxjs/Observable";

@Injectable()
export class PersonService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getPersonList(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }
        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/person`, options).map(this.extractData).publish().refCount();
    }

    lookup(input: string, page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>>  {
        let params = new URLSearchParams();
        params.set('input', `${input}`);
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }
        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/person/lookup`, options).map(this.extractData).publish().refCount();
    }

    getPerson(id: number): Rx.Observable<Person> {
        return this.http.get(`${webServiceEndpoint}/person/${id}`).map(this.extractData).publish().refCount();
    }

    deletePerson(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/person/${id}`).publish().refCount();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    createPerson(person): Rx.Observable<Response>{
        return this.http.post(`${webServiceEndpoint}/person`, JSON.stringify(person), this.options);
    }

    editPerson(person, personId): Rx.Observable<Response> {
      person.id = personId;
      return this.http.put(`${webServiceEndpoint}/person/`, JSON.stringify(person), this.options);
    }

}
