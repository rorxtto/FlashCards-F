import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login: Login = new Login();

  loginService = inject(LoginService)
  router = inject(Router)


  constructor(){
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => { 
        console.log(token);
        if (token) this.loginService.addToken(token);
        this.router.navigate(['/admin/materiasRenderizadas']);
        
      },
      error: erro => { 
        if (erro.status === 403) {
          alert('Seu plano não está ativo. Renove sua assinatura para continuar.');
        } else {
          alert('Erro ao tentar logar. Verifique se suas credenciais estão corretas.');
        }
        console.error(erro);
      }
    });
  }
  

}
