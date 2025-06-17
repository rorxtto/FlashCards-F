import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  ngOnInit() {
    this.verificarAtualizacaoContadores();
    // Verifica a cada 5 minutos para garantir que não perca nenhuma atualização
    setInterval(() => this.verificarAtualizacaoContadores(), 5 * 60 * 1000);
  }

  private verificarAtualizacaoContadores() {
    const aux = localStorage.getItem('respostas');
    if (!aux) return;

    let respostas = JSON.parse(aux) as any[];
    const agora = new Date().getTime();
    let houveAlteracao = false;

    respostas = respostas.map(item => {
      const ultimaAtualizacao = new Date(item.ultimaAtualizacao || 0).getTime();
      const passou24h = (agora - ultimaAtualizacao) >= 24 * 60 * 60 * 1000;

      if (passou24h) {
        item.contador = 0;
        item.ultimaAtualizacao = new Date().toISOString();
        houveAlteracao = true;
      }

      return item;
    });

    if (houveAlteracao) {
      localStorage.setItem('respostas', JSON.stringify(respostas));
    }
  }
}
