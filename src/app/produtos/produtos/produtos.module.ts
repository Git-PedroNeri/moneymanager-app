import { ProdutosTableComponent } from "./../produtos-table/produtos-table.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";
import { BlockUIModule } from "ng-block-ui";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { PanelModule } from "primeng/panel";
import { SelectButtonModule } from "primeng/selectbutton";
import { TableModule } from "primeng/table";
import { MultiSelectModule } from "primeng/multiselect";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { ProdutosPesquisaComponent } from "../produtos-pesquisa/produtos-pesquisa.component";
import { ProdutoCadastroComponent } from "./../produto-cadastro/produto-cadastro.component";
import { ProdutosRoutingModule } from "./produtos-routing.module";
import { ProdutosSearchFilterComponent } from "../produtos-search-filter/produtos-search-filter.component";

@NgModule({
  exports: [ProdutosPesquisaComponent],
  declarations: [
    ProdutoCadastroComponent,
    ProdutosPesquisaComponent,
    ProdutosTableComponent,
    ProdutosSearchFilterComponent,
  ],
  imports: [
    MultiSelectModule,
    CommonModule,
    ProdutosRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    InputNumberModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    ProdutosRoutingModule,
    SharedModule,
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
})
export class ProdutosModule {}
