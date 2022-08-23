import { environment } from "./../../../environments/environment";
import { Injector } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { BaseResourceModel } from "./base-resource.model";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseFiltroModel } from "./base-filtro.model";

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  protected constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getPageable(params: HttpParams): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${this.apiPath}/paginado`, { params })
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<T[]> {
    return this.http
      .get(`${environment.apiUrl}/${this.apiPath}`)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

  getAllBySituacao(situacao: string): Observable<T[]> {
    const params: HttpParams = new HttpParams().set("sim", situacao);
    return this.http
      .get(`${environment.apiUrl}/${this.apiPath}/situacao`, { params })
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

  getById(id: any): Observable<T> {
    const url = `${environment.apiUrl}/${this.apiPath}/${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  get(path: string): Observable<T[]> {
    return this.http
      .get(path)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

  create(resource: T): Observable<T> {
    debugger
    return this.http
      .post(`${environment.apiUrl}/${this.apiPath}`, resource)
      .pipe(catchError(this.handleError));
  }

  update(resource: T): Observable<T> {
    const url = `${environment.apiUrl}/${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: any): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  ativar(resource: T): Observable<T> {
    let headers = new HttpHeaders();
    const csrfToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    headers = headers.set("X-XSRF-TOKEN", csrfToken);
    const url = `${environment.apiUrl}/${this.apiPath}/${resource.id}/ativar`;
    return this.http.put(url, resource, { headers: headers }).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  inativar(resource: T): Observable<T> {
    let headers = new HttpHeaders();
    const csrfToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    headers = headers.set("X-XSRF-TOKEN", csrfToken);
    const url = `${environment.apiUrl}/${this.apiPath}/${resource.id}/inativar`;
    return this.http.put(url, resource, { headers: headers }).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any): T[] {
    const resources: T[] = [];
    if (jsonData.content) {
      jsonData.content.forEach((element) =>
        resources.push(this.jsonDataToResourceFn(element))
      );
    } else {
      jsonData.forEach((element) =>
        resources.push(this.jsonDataToResourceFn(element))
      );
    }
    return resources;
  }

  protected handleError(error: any): Observable<any> {
    return throwError(error);
  }

  searchPageable(parametros: BaseFiltroModel, params: HttpParams) {
    if (parametros) {
      Object.entries(parametros).forEach(([key, value]) => {
        if (value instanceof Array) {
          if (value.length > 0) {
            params = params.append(key, value.toString());
          }
        } else {
          if (value != null) {
            params = params.append(key, value.toString());
          }
        }
      });
    }
    return this.http
      .get(`${environment.apiUrl}/${this.apiPath}/consulta/`, { params })
      .pipe(catchError(this.handleError));
  }

  getApiPath() {
    return this.apiPath;
  }

  createParamsByFiltro(parametros: BaseFiltroModel): HttpParams {
    console.log(parametros);
    let params = new HttpParams();

    if (parametros) {
      Object.entries(parametros).forEach(([key, value]) => {
        if (value instanceof Array) {
          if (value.length > 0) {
            params = params.append(key, value.toString());
          }
        } else {
          if (value != null) {
            params = params.append(key, value.toString());
          }
        }
      });
    }
    return params;
  }

  gerarCsv(parametros: BaseFiltroModel, nomeArquivo: string): Observable<any> {
    let headers = new HttpHeaders();
    const params = this.createParamsByFiltro(parametros);
    headers = headers.set("Accept", "text/csv");
    return this.http.get(
      `${environment.apiUrl}/${this.apiPath}/csv/${nomeArquivo}`,
      { params: params, headers: headers, responseType: "arraybuffer" }
    );
  }

  gerarExcel(
    parametros: BaseFiltroModel,
    nomeArquivo: string
  ): Observable<any> {
    let headers = new HttpHeaders();
    const params = this.createParamsByFiltro(parametros);
    headers = headers.set(
      "Accept",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    return this.http.get(
      `${environment.apiUrl}/${this.apiPath}/excel/${nomeArquivo}`,
      { params: params, headers: headers, responseType: "arraybuffer" }
    );
  }
  gerarPdf(parametros: BaseFiltroModel, nomeArquivo: string): Observable<any> {
    let headers = new HttpHeaders();
    const params = this.createParamsByFiltro(parametros);
    headers = headers.set("Accept", "application/pdf");
    return this.http.get(
      `${environment.apiUrl}/${this.apiPath}/pdf/${nomeArquivo}`,
      { params: params, headers: headers, responseType: "arraybuffer" }
    );
  }

  visualizar(parametros: BaseFiltroModel, nomeArquivo: string) {
    let headers = new HttpHeaders();
    const params = this.createParamsByFiltro(parametros);
    headers = headers.set("Accept", "application/pdf");
    this.http
      .get(`${environment.apiUrl}/${this.apiPath}/pdf/${nomeArquivo}`, {
        params: params,
        headers: headers,
        responseType: "arraybuffer",
      })
      .subscribe((fileData: any) => {
        let b: any = new Blob([fileData], { type: "application/pdf" });
        var url = window.URL.createObjectURL(b);
        window.open(url);
      });
  }
}
