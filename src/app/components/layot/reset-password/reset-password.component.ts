import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  username: string = '';
  newPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  reset_password_container() {
    const payload = { username: this.username, newPassword: this.newPassword };


    // Logando o payload para depuração
    console.log('Payload enviado:', payload);

    this.http.post( environment.SERVIDOR + '/api/register/reset-password', payload).subscribe({
        next: (response) => {
            alert('Senha redefinida com sucesso!');
            this.router.navigate(['/login']); 
        },
        error: (err) => {
            console.error('Erro ao redefinir a senha:');
            alert(`Erro ao redefinir a senha!`);
        }
    });

  }

}


