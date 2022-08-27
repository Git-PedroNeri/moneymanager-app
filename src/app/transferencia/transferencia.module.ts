import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";
import { TransferenciaRoutingModule } from "./transferencia-routing.module";
import { ExtratoComponent } from "./transferencia/extrato/extrato/extrato.component";
import { HistoricoTransacoesComponent } from "./transferencia/historico-transacoes/historico-transacoes.component";
import { TransferenciaComponent } from "./transferencia/transferencia.component";

@NgModule({
  declarations: [
    ExtratoComponent,
    TransferenciaComponent,
    HistoricoTransacoesComponent,
  ],
  imports: [
    CommonModule,
    TransferenciaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    HttpClientModule,
  ],
})
export class TransferenciaModule {}
