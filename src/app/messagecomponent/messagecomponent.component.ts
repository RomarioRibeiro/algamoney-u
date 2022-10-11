import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-messagecomponent',
  template: `
   <p-message *ngIf="temErro()" text="{{ text }}"></p-message>
  `,
  styles: [
  `.p-message-error {
    margin: 0;
    margin-top: 4px;
    padding: 3px;
  }`
  ]
})
export class MessagecomponentComponent  {

  @Input() error: string ='';
  @Input() control:  any;
  @Input() text: string ='';

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
