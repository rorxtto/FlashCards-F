import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-register',
     standalone: true,
      imports: [FormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    user = { username: '', password: '' };

    constructor(private http: HttpClient, private router: Router) {}

    registerUser() {
        this.http.post('http://localhost:8080/api/register/register', this.user, { responseType: 'text' }).subscribe({
            next: (res) => {
                alert(res); 
                this.router.navigate(['/login']); // Redireciona para a página de login
            },
            error: (err) => {
                console.error('Erro ao registrar usuário:', err);
                alert(`Erro ao registrar o usuário!`);
            }
        });
    }
    

}
