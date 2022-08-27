import localePt from "@angular/common/locales/pt";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableModule } from "primeng/table";

import { registerLocaleData } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AccordionModule } from "@syncfusion/ej2-angular-navigations";
import { BlockUIModule } from "ng-block-ui";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { PanelModule } from "primeng/panel";
import { RippleModule } from "primeng/ripple";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { CoreModule } from "./core/core.module";
import { ProdutosModule } from "./produtos/produtos/produtos.module";
import { SegurancaModule } from "./seguranca/seguranca.module";

registerLocaleData(localePt, "pt");

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
    ProdutosModule,
    AccordionModule,
    BrowserModule,
    BlockUIModule,
    ButtonModule,
    PanelModule,
    RippleModule,
    FormsModule,
  ],
  exports: [],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL",
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
