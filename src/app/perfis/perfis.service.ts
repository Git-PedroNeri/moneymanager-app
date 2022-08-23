import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "app/shared/abstract/base-resource.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";
import { Perfil } from "./models/Perfil";

@Injectable({
  providedIn: "root",
})
export class PerfisService extends BaseResourceService<Perfil> {
  constructor(protected injector: Injector) {
    super("perfis", injector, Perfil.fromJson);
  }

  buscarPerfis(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/perfis/buscarTodos");
  }
}
