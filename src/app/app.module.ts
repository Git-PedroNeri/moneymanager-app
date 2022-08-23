<<<<<<< HEAD
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableModule } from "primeng/table";

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> ac15af8aaf74cf30c9450f5acda6854dec57680d
