import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminComponent } from "./admin/admin.component";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "primeng/api";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    CommonModule,
    SharedModule,
  ],
})
export class AdminModule {}
