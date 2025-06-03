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
    setInterval(() => {
      const aux = localStorage.getItem('respostas');
  
      if (aux) {
        let respostas = JSON.parse(aux) as any[];
  
        const agora = new Date();
  
        respostas = respostas.map(item => {
          const dataItem = new Date(item.dataHoraUltimaMedia);
          const diffMs = agora.getTime() - dataItem.getTime();
  
          if (diffMs >= 24 * 60 * 60 * 1000) {  // 24 horas = 86.400.000 ms
            console.log(`${item.submateriaId}`);
            item.contador = 0;
          }
  
          return item;
        });
  
        localStorage.setItem('respostas', JSON.stringify(respostas));
      }
    }, 43200000); // Executa a cada 1 minuto
  }
  
  

}
