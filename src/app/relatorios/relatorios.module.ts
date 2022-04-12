import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RelatoriosRoutingModule } from "./relatorios-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { RelatorioLancamentosComponent } from "./relatorio-lancamentos/relatorio-lancamentos.component";
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,
    SharedModule,
    RelatoriosRoutingModule,
    FormsModule,
    CalendarModule,
    ButtonModule,
  ],
})
export class RelatoriosModule {}
