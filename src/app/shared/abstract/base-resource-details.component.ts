import { Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from "primeng/api";
import { BaseResourceModel } from "./base-resource.model";
import { BaseResourceService } from "./base-resource.service";

export abstract class BaseResourceDetailsComponent<T extends BaseResourceModel>
  implements OnInit
{
  confirmationService: ConfirmationService;
  resource: T;

  protected route: ActivatedRoute;
  protected router: Router;

  protected messageService: MessageService;

  protected constructor(
    protected injector: Injector,
    protected resourceService: BaseResourceService<T>
  ) {
    this.route = injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.messageService = injector.get(MessageService);
    this.confirmationService = this.injector.get(ConfirmationService);

    this.route.data.subscribe((data) => {
      if (data.dto) {
        this.resource = data.dto;
      }
    });
  }

  ngOnInit() {}

  editar(id: any) {
    const urlBase: string = this.router.routerState.snapshot.url.replace(
      "/detalhar",
      "/editar"
    );
    this.router.navigate([urlBase]);
  }

  protected getUrlLista(): string {
    const urlBase: string = this.router.routerState.snapshot.url.replace(
      this.route.snapshot.url
        .map(function (s) {
          return s.toString();
        })
        .join("/"),
      ""
    );
    return urlBase;
  }

  protected actionsForDelete() {
    this.messageService.add({
      key: "default_notification",
      life: environment.timoutMensagem,
      severity: "success",
      summary: "Mensagem",
      detail: "Exclusão realizada com sucesso!",
    });

    this.router.navigate([this.getUrlLista()]);
  }

  callDialogDelete(textoConfirmacao: string, param: any) {
    this.confirmationService.confirm({
      acceptLabel: "Sim",
      rejectLabel: "Não",
      header: "Confirmação",
      message: textoConfirmacao,
      accept: () => {
        this.delete(param);
      },
    });
  }

  delete(resource: T) {
    this.resourceService.delete(resource.id).subscribe(() => {
      this.actionsForDelete();
    });
  }
}
