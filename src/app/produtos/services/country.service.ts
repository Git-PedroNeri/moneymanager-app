import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) {}

    getCountries() {
        return this.http.get('showcase/resources/data/countries.json')
                    .toPromise()
                    .then(res => <any[]> res)
                    .then(data => { return data; });
    }
}
