import { CommonModule, DecimalPipe } from "@angular/common";
import { NgModule } from "@angular/core";

import { ChartModule } from "primeng/chart";
import { PanelModule } from "primeng/panel";

import { SharedModule } from "./../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { FieldsetModule } from "primeng/fieldset";

@NgModule({
  imports: [
    CommonModule,

    FieldsetModule,

    PanelModule,
    ChartModule,

    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardComponent],
  providers: [DecimalPipe],
})
export class DashboardModule {}
