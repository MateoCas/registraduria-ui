import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoComponent, NgCandidatoContent } from './components/candidato/candidato.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CandidatoComponent,
    NgCandidatoContent
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
