import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Materia } from '../../../models/materia';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MateriaService } from '../../../services/materia.service';


@Component({
  selector: 'app-materiasdetails',
  standalone: true,
  imports: [MdbFormsModule,FormsModule],
  templateUrl: './materiasdetails.component.html',
  styleUrl: './materiasdetails.component.scss'
})
export class MateriasdetailsComponent {

  @Input("materia") materia: Materia = new Materia(); // Ajusta para um único objeto
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  materiaService = inject(MateriaService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }
  


  findById(id: number){
    
    this.materiaService.findById(id).subscribe({

      next: retorno => {
        this.materia = retorno; // Certifique-se de que retorno é um array
      },
      error: erro => {
        alert('Ocorreu algum erro!');
      },

    })

  }

    save(){
      if (this.materia.id > 0){
        this.materiaService.update(this.materia, this.materia.id).subscribe({

          next: mensagem => {
            alert(mensagem);
            this.router2.navigate(["admin/materias"], {state: { materiaEditada: this.materia}})
            this.retorno.emit(this.materia);
          },
          error: erro => {
            alert('Ocorreu algum erro!');
          },
    
        })} else {


        this.materiaService.save(this.materia).subscribe({

          next: mensagem => {
            alert(mensagem);
            this.router2.navigate(["admin/materias"], {state: { materiaNova: this.materia}})
            this.retorno.emit(this.materia);
          },
          error: erro => {
            alert('Ocorreu algum erro!');
          },
    
        })
      }

      
    }
}


