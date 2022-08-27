import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Transferencia } from "./models/transferencia.model";

@Injectable({
  providedIn: "root",
})
export class TransferenciaService {
  private url = "http://localhost:3000/transferencias/";

  constructor(private http: HttpClient) {}

  buscarTransfrencias(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.url);
  }
}
