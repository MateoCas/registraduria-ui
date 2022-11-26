import { Component, createNgModule, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { ErrorModalContentComponent } from 'src/app/shared/components/error-modal-content/error-modal-content.component';
import { Candidato } from '../../models/candidato';
import { Partido } from '../../models/partido';
import { CandidatoService } from '../../services/candidato.service';
import { PartidosService } from '../../services/partidos.service';

@Component({
  selector: 're-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit, OnDestroy {

  allCandidatos!: Candidato[];
  candidatosSubscription!: Subscription;

  constructor(private candidatoService: CandidatoService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.susbcribeToAllCandidatos();
    this.subscribeToCandidatosAdded();
  }

  susbcribeToAllCandidatos(): void {
    this.candidatosSubscription = this.candidatoService.getAllCandidatos().subscribe({
      next: candidatos => this.allCandidatos = candidatos,
      error:  err => this.openErrorMessage(`Hubo un error consultando todos los candidatos, razón: ${err}`)
    });
  }

  subscribeToCandidatosAdded(): void {
    this.candidatoService.getSubscriptionOfCandidatosAddedAsObservable().subscribe({
      next: candidatoAdded => {
        if(this.candidatoService.isACandidato(candidatoAdded)) {
          this.allCandidatos.push(candidatoAdded);
        }
      }
    })
  }

  ngOnDestroy(): void {
    if(this.candidatosSubscription) {
      this.candidatosSubscription.unsubscribe();
    }
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
  selector: 're-candidato-modal-content',
  templateUrl: './modal-show-candidato.component.html',
  styleUrls: ['./modal-show-candidato.component.css']
})
export class NgCandidatoContent implements OnInit, OnDestroy {

  cedula!: string;
  nombre!: string;
  apellido!: string;
  resolucion!: string;
  allPartidos!: Partido[];
  partidosSubscription!: Subscription;
  candidatoSubscription!: Subscription;
  hasToShowErrorPartidoServiceMessage: boolean = false;
  errorServiceMessage!: string;

  candidatoToAdd: Candidato = {
    id: '',
    cedula:'',
    nombre: '',
    apellido: '',
    resolucion: '',
    partido: {
      _id: '',
      nombre: '',
      lema: ''
    }
  };

  constructor(private partidoService: PartidosService, private candidatoService: CandidatoService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.partidosSubscription = this.partidoService.getAllPartidos().subscribe({
      next: partidosResponse => {
        this.allPartidos = partidosResponse;
      },
      error: err => {
        this.hasToShowErrorPartidoServiceMessage = true;
        this.errorServiceMessage = err;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.partidosSubscription) {
      this.partidosSubscription.unsubscribe();
    }

    if(this.candidatoSubscription) {
      this.candidatoSubscription.unsubscribe();
    }
  }

  addNewCandidato(): void {
    this.candidatoSubscription = this.candidatoService.saveCandidato(this.candidatoToAdd).subscribe({
      next: candidatoSaved => {
        this.candidatoService.notifyNewCandidatoAdded(candidatoSaved);
        this.modalService.dismissAll();
        this.openErrorMessage(`El candidato fue almacenado con exito`);
      },
      error: err => this.openErrorMessage(`Hubo un error guardadndo el candidato, razón: ${err}`)
    });
  }

  private openErrorMessage(errMessage: String) {
    const modalRef = this.modalService.open(ErrorModalContentComponent);
    modalRef.componentInstance.messageToShow = errMessage;
  }
}
