import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UsuariosRoutingModule } from "./usuarios-routing.module";

import { FieldsetModule } from "primeng/fieldset";
import { UsuarioSearchComponent } from "./usuario-search/usuario-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputMaskModule } from "primeng/inputmask";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { UsuarioService } from "./usuario.service";
import { UsuarioFormComponent } from "./usuario-form/usuario-form.component";

@NgModule({
  declarations: [UsuarioSearchComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FieldsetModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    ButtonModule,
    RadioButtonModule,
    InputTextModule,
    TableModule,
  ],
  providers: [UsuarioService],
})
export class UsuariosModule {}
