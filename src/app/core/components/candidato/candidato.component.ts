import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalContentComponent } from 'src/app/shared/components/error-modal-content/error-modal-content.component';
import { Candidato } from '../../models/candidato';
import { CandidatoService } from '../../services/candidato.service';

@Component({
  selector: 're-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {

  allCandidatos!: Candidato[];

  constructor(private candidatoService: CandidatoService, private modalService: NgbModal) {}

  ngOnInit(): void {

    this.candidatoService.getAllCandidatos().subscribe({
      next: candidatos => {
        this.allCandidatos = candidatos
        console.log(this.allCandidatos)
      },
      error:  err => this.openErrorMessage(`Hubo un error consultando todos los candidatos, razón: ${err}`)
    });
  }

  private openErrorMessage(errMessage: String) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ErrorModalContentComponent);
    modalRef.componentInstance.messageToShow = errMessage;
  }

  addCandidato(): void {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(NgCandidatoContent);
  }

}

@Component({
  selector: 'ngcandidato-modal-content',
  templateUrl: './modal-show-candidato.component.html',
  styleUrls: ['./modal-show-candidato.component.css']
})
export class NgCandidatoContent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
