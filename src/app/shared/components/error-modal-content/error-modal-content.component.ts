import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 're-error-modal-content',
  templateUrl: './error-modal-content.component.html',
  styleUrls: ['./error-modal-content.component.css']
})
export class ErrorModalContentComponent {

  @Input()
  messageToShow!: string;

  constructor(public activeModal: NgbActiveModal) {

  }
}
