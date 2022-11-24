import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 're-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
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
