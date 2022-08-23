import {
  AfterContentChecked,
  Component,
  Injectable,
  Injector,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { Observable, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { BaseResourceModel } from "./../abstract/base-resource.model";
import { BaseResourceService } from "./../abstract/base-resource.service";
import { NgForm } from "@angular/forms";
import { environment } from "environments/environment";
@Injectable()
export abstract class BaseResourceFormV2Component<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  debug: boolean = false;

  situacaoAtivoNull: boolean = false;
  currentAction: string;
  submittingForm: Boolean = false;
  formLoad: Subject<boolean> = new Subject();
  protected route: ActivatedRoute;
  private messageService: MessageService;
  confirmationService: ConfirmationService;

  protected constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.messageService = this.injector.get(MessageService);
    this.confirmationService = this.injector.get(ConfirmationService);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.loadResource();
    // if (this.currentAction === 'cadastrar') {
    //     if(!this.situacaoAtivoNull){
    //         this.resource['ativo'] = 'S';
    //     } else {

    //         this.resource['ativo'] = null;
    //     }
    // }
  }

  ngAfterContentChecked() {}

  submitForm(form: NgForm) {
    this.submittingForm = true;
    if (form.valid) {
      if (this.currentAction === "cadastrar") {
        this.createResource();
      } else {
        this.updateResource();
      }
    } else {
      this.msgValidacaoFormulario();
    }
  }

  // PRIVATE METHODS

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === "cadastrar") {
      this.currentAction = "cadastrar";
    } else {
      this.montarTitulo();
      this.currentAction =
        this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    }
  }

  protected loadResource() {
    this.route.data.subscribe((data) => {
      if (data.dto) {
        this.bindResource(data.dto);
      } else {
        const id = this.route.params["id"] ? this.route.params["id"] : null;
        if (id !== null) {
          this.route.paramMap
            .pipe(switchMap((params) => this.loadObjectEdit(params)))
            .subscribe(
              (resource) => {
                this.bindResource(resource);
              },
              (error) => {
                throw new Error(
                  "Ocorreu um erro interno. Por favor tente mais tarde."
                );
              }
            );
        }
      }
    });
  }

  protected bindResource(resource: T) {
    this.resource = resource;
  }

  protected loadObjectEdit(params: any): Observable<T> {
    return this.resourceService.getById(params.get("id"));
  }

  protected createResource() {
    const resource: T = this.resource;
    this.resourceService.create(resource).subscribe((r) => {
      this.actionsForSuccess(r);
      this.goBack();
    });
  }

  protected msgValidacaoFormulario() {
    this.messageService.add({
      key: "default_notification",
      life: environment.timoutMensagem,
      severity: "error",
      summary: "Mensagem",
      detail: "Atenção para os campos obrigatórios.",
    });
  }

  protected updateResource() {
    const resource: T = this.resource;
    this.resourceService.update(resource).subscribe((r) => {
      this.actionsForSuccess(r);
      this.goBack();
    });
  }

  protected actionsForSuccess(resource: T) {
    this.messageService.add({
      key: "default_notification",
      life: environment.timoutMensagem,
      severity: "success",
      summary: "Mensagem",
      detail: "Ação realizada com sucesso!",
    });
  }

  protected abstract montarTitulo();

  protected abstract cleanForm(form: NgForm);

  protected goBack() {
    window.history.back();
  }

  protected msgErro(msg: string) {
    this.messageService.add({
      key: "default_notification",
      life: environment.timoutMensagem,
      severity: "error",
      summary: "Mensagem",
      detail: msg,
    });
  }
}
