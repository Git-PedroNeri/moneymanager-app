import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-message-validate",
  template: `
    <p-message *ngIf="temErro()" severity="error" text="{{ text }}"></p-message>
  `,
  styles: [
    `
      .p-message-error {
        padding: 3px;
        margin: 0;
        margin-top: 4px;
      }
    `,
  ],
})
export class MessageValidateComponent {
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro(): boolean {
    return (
      this.control.hasError(this.error) &&
      (this.control.dirty || this.control.touched)
    );
  }
}
