import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { CandidatoComponent } from '../core/components/candidato/candidato.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {path: 'candidatos', component: CandidatoComponent, canActivate: [AuthGuardService]}
    ])
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CoreModule
  ]
})
export class LayoutModule { }
