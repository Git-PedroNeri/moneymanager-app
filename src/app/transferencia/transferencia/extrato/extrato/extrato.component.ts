import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Transferencia } from "app/transferencia/models/transferencia.model";
import { TransferenciaService } from "app/transferencia/transferencia.service";
import { map, tap } from "rxjs/operators";
import { minusculoValidator } from "./extrato.validator";
import { nomeEmailIguaisValidator } from "./nome-email-iguais.validator";

@Component({
  selector: "app-extrato",
  templateUrl: "./extrato.component.html",
  styleUrls: ["./extrato.component.css"],
})
export class ExtratoComponent implements OnInit {
  @Output() aoTransferir = new EventEmitter<any>();

  valor: number;
  destino: number;

  transferencias: any[];
  form_dados_pessoais: FormGroup;

  constructor(
    transferenciaService: TransferenciaService,
    private formBuider: FormBuilder
  ) {
    this.form_dados_pessoais = this.formBuider.group(
      {
        nomeOrigem: ["", [Validators.required, minusculoValidator]],
        email: [
          "",
          [Validators.required, Validators.minLength(3), Validators.email],
        ],
      },
      {
        validators: [nomeEmailIguaisValidator],
      }
    );
  }

  ngOnInit(): void {
    this.form_dados_pessoais.valueChanges
      .pipe(tap((e) => console.log(e)))
      .subscribe((a) => console.log(a));
  }

  transferir(transferenciaForm: FormControl) {
    console.log("Realizando Transferência");
    const trans = this.form_dados_pessoais.getRawValue() as Transferencia;
    this.form_dados_pessoais.valueChanges.subscribe((e) => {
      console.log(e);
    });
    console.log(trans);
    this.aoTransferir.emit(transferenciaForm);
  }
}
