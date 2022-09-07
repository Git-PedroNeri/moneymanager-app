import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Transferencia } from "./models/transferencia.model";

@Injectable({
  providedIn: "root",
})
export class TransferenciaService {
  private url = "http://localhost:3000/transferencias/";
  private urlToPost = "http://localhost:3000/transferencia/";

  constructor(private http: HttpClient) {}

  buscarTransfrencias(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.url);
  }
  inserirTransfrencia(transferencia: Transferencia): Observable<Transferencia> {
    return this.http.post<Transferencia>(this.urlToPost, transferencia);
  }
}
