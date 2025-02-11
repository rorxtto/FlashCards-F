import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Submateria } from '../../../models/submateria';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { SubmateriaService } from '../../../services/submateria.service';
import { Materia } from '../../../models/materia';
import { MateriaslistComponent } from "../../materias/materiaslist/materiaslist.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-submateriasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MateriaslistComponent],
  templateUrl: './submateriasdetails.component.html',
  styleUrl: './submateriasdetails.component.scss'
})
export class SubmateriasdetailsComponent {

  @Input("submateria") submateria: Submateria = new Submateria(new Materia());
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject (MdbModalService);
  @ViewChild("modalMaterias") modalMaterias!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  submateriaService = inject(SubmateriaService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number){
    
    this.submateriaService.findById(id).subscribe({

      next: retorno => {
        this.submateria = retorno;
      },
      error: erro => {
        alert('Ocorreu algum erro!');
      },

    })

  }

    save(){
      if (this.submateria.id > 0){

        this.submateriaService.update(this.submateria, this.submateria.id).subscribe({

          next: mensagem => {
            alert(mensagem);
            this.router2.navigate(["admin/submaterias"], {state: { submateriaEditada: this.submateria}})
            this.retorno.emit(this.submateria);
          },
          error: erro => {
            alert('Ocorreu algum erro!');
          },
    
        })} else {


        this.submateriaService.save(this.submateria).subscribe({

          next: mensagem => {
            alert(mensagem);
            this.router2.navigate(["admin/submaterias"], {state: { submateriaNova: this.submateria}})
            this.retorno.emit(this.submateria);
          },
          error: erro => {
            alert('Ocorreu algum erro!');
          },
    
        })
      }

      
    }

    buscarMateria(){
      this.modalRef = this.modalService.open(this.modalMaterias, {modalClass: 'modal-lg'})
    }

    retornoMateria( materia:Materia){
      this.submateria.materia = materia
      this.modalRef.close();
    }
}









