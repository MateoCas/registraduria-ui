import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoComponent } from './components/candidato/candidato.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CandidatoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CandidatoComponent,
    SharedModule
  ]
})
export class CoreModule { }
