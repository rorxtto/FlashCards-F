import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Questoes } from '../../../models/questoes';
import { Alternativas } from '../../../models/alternativas';
import { Submateria } from '../../../models/submateria';
import { QuestoesService } from '../../../services/questoes.service';
import { Router, RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { QuestoesdetailsComponent } from '../questoesdetails/questoesdetails.component';
import { Materia } from '../../../models/materia';



@Component({
  selector: 'app-questoeslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, QuestoesdetailsComponent],
  templateUrl: './questoeslist.component.html',
  styleUrl: './questoeslist.component.scss'
})
export class QuestoeslistComponent {

  questoesServices = inject(QuestoesService)
  questoes: Questoes[]= []
  router = inject(Router)

  modalService = inject (MdbModalService);
  @ViewChild("modalQuestoesDetalhe") modalQuestoesDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  materiaInstance = new Materia(); // Cria uma instância de Materia
  submateriaInstance = new Submateria(this.materiaInstance); // Passa a instância de Materia para Submateria  
  questoesEdit: Questoes = new Questoes(this.submateriaInstance);


  constructor(){

    let questaoNova = history.state.questaoNova;
    let questaoEditada = history.state.questaoEditada;

    if(questaoEditada){
      let indice = this.questoes.findIndex(x => {return x.id == questaoEditada.id});
      this.questoes[indice] = questaoEditada;
    }

    if(questaoNova){
    this.questoes.push(questaoNova);

    }
    
    this.findAll();
  }

  findAll(){
    this.questoesServices.findAll().subscribe({
      next: lista => {
        this.questoes = lista;
      },
      error: erro => {
        alert('Ocorreu algum erro!');
      },
    })
  }

  materiasList(){
    this.router.navigate(['admin/materias']);
  }

  deleteById(questoes:Questoes){
    if (confirm("Tem certeza que deseja deletar esta questao?") ) {

      this.questoesServices.delete(questoes.id).subscribe({
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
    this.questoesEdit = new Questoes(this.submateriaInstance);
     this.modalRef = this.modalService.open(this.modalQuestoesDetalhe);
  }

  edit(questoes:Questoes){
    this.questoesEdit = Object.assign({}, questoes);
    this.modalRef = this.modalService.open(this.modalQuestoesDetalhe);
 }

 retornoDetalhe(questoes: Questoes){
  this.findAll();
  this.modalRef.close();
}




 
}






