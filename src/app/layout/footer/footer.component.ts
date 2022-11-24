import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 're-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateAuthentication();
  }

  updateAuthentication(): void {
    this.authService.getIsAuthenticatedSubjectAsObservable().subscribe({
      next: isAuthenticatedResponse => {
        if(typeof isAuthenticatedResponse == "boolean" && !this.isAuthenticated) {
          this.isAuthenticated = isAuthenticatedResponse
        }
      }
    });
  }
}
