import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "app/shared/abstract/base-resource.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";
import { Usuario } from "./models/usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService extends BaseResourceService<Usuario> {
  constructor(protected injector: Injector) {
    super("usuario", injector, Usuario.fromJson);
  }

  buscarPerfis(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/buscarTodos");
  }
}
