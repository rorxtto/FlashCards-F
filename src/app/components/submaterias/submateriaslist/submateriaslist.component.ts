import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Submateria } from '../../../models/submateria';
import { SubmateriasdetailsComponent } from '../submateriasdetails/submateriasdetails.component';
import { SubmateriaService } from '../../../services/submateria.service';
import { Materia } from '../../../models/materia';



@Component({
  selector: 'app-submateriaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, SubmateriasdetailsComponent],
  templateUrl: './submateriaslist.component.html',
  styleUrl: './submateriaslist.component.scss'
})
export class SubmateriaslistComponent {
  lista: Submateria[] = [];
  submateriaEdit: Submateria = new Submateria( new Materia());
  router = inject(Router);
  router2 = inject(ActivatedRoute);
  @Input() materiaId!: number; // Recebe o ID da matéria
  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>()

  modalService = inject (MdbModalService);
  @ViewChild("modalSubmateriaDetalhe") modalSubmateriaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  idMateria = 0;

  submateriaService = inject(SubmateriaService)

  constructor(){
    this.idMateria = this.router2.snapshot.params['idMateria'];

    let submateriaNova = history.state.submateriaNova;
    let submateriaEditada = history.state.submateriaEditada;

    if(submateriaEditada){
      let indice = this.lista.findIndex(x => {return x.id == submateriaEditada.id});
      this.lista[indice] = submateriaEditada;
    }

    if(submateriaNova){
    this.lista.push(submateriaNova);

    }

    this.findAll();
  }

  findAll(){
    this.submateriaService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Ocorreu algum erro!');
      },
    });
  }  

  

  deleteById(submateria: Submateria){
     if (confirm("Tem certeza que deseja deletar esta submateria?") ) {

      this.submateriaService.delete(submateria.id).subscribe({
        next: mensagem => {
          alert(mensagem);
          this.findAll();
        },
        error: erro => {
          alert('Ocorreu algum erro!');
        },
      });
     }
  }

  new(){
    if(this.idMateria > 0){
      let mat = new Materia();
      mat.id = this.idMateria;
      this.submateriaEdit = new Submateria(mat);
    }else
     this.submateriaEdit = new Submateria(new Materia());
    
     this.modalRef = this.modalService.open(this.modalSubmateriaDetalhe);
  }

  edit(submateria:Submateria){
  
       this.submateriaEdit = Object.assign({}, submateria);
    
       this.modalRef = this.modalService.open(this.modalSubmateriaDetalhe);
 }

  retornoDetalhe(submateria: Submateria){
    this.findAll();
    this.modalRef.close();
  }

  materiasList(){
    this.router.navigate(['admin/materias']);
  }

  select(submateria:Submateria){
    this.retorno.emit(submateria);
  }

  

  
}


