import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .container {
      margin:20px;
    }
    mat-card {
      padding: 80px 120px;
    }
    hr{margin-bottom: 40px; margin-top: -20px}
    button{
      padding: 8px 60px;
    }
  `]
})
export class LoginComponent{

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  login(){
    this.authService.login()
      .subscribe( resp => {
        if(resp.id){
          this.router.navigate(['./heroes']);
        }
      })
  }

}
