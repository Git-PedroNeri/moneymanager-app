import { Component, Input, OnInit, Output } from "@angular/core";
import { Product } from "app/core/model";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input()
  product: Product;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
