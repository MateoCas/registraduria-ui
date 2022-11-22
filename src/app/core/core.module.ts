import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoComponent } from './components/candidato/candidato.component';



@NgModule({
  declarations: [
    CandidatoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CandidatoComponent
  ]
})
export class CoreModule { }
