import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: string;
  senha!: string;

  router = inject(Router)

  logar(){
    if(this.usuario == "admin" && this.senha == "admin"){
      this.router.navigate(['admin/materias']);
    } else {
      alert("Usuario ou senha incerreta")
    }
  }

}
