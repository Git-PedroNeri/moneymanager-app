import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MessageComponent } from "./message/message.component";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MessageValidateComponent } from "./message-validate/message-validate.component";

@NgModule({
  imports: [CommonModule, MessagesModule, MessageModule],
  declarations: [MessageComponent, MessageValidateComponent],
  exports: [MessageComponent, MessageValidateComponent],
})
export class SharedModule {}
