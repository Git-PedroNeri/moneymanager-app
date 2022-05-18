import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SegurancaModule } from "./seguranca/seguranca.module";
import { AppRoutingModule } from "./app-routing.module";
import { CardComponent } from "./card/card.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { ProdutosModule } from "./produtos/produtos/produtos.module";
import { BlockUIModule } from "ng-block-ui";
import { PanelModule } from "primeng/panel";
import { RippleModule } from "primeng/ripple";
import { FormsModule } from "@angular/forms";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";

@NgModule({
  declarations: [AppComponent, CardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    SegurancaModule,
    AppRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    ProdutosModule,
    AccordionModule,
    BrowserModule,
    BlockUIModule,
    ButtonModule,
    PanelModule,
    RippleModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
