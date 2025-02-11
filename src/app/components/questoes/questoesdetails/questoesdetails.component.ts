import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Questoes } from '../../../models/questoes';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestoesService } from '../../../services/questoes.service';
import { Submateria } from '../../../models/submateria';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SubmateriaslistComponent } from '../../submaterias/submateriaslist/submateriaslist.component';
import { Materia } from '../../../models/materia';
import { Alternativas } from '../../../models/alternativas';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-questoesdetails',
  standalone: true,
  imports: [MdbFormsModule,FormsModule, SubmateriaslistComponent, CommonModule],
  templateUrl: './questoesdetails.component.html',
  styleUrl: './questoesdetails.component.scss'
})
export class QuestoesdetailsComponent implements OnInit {

 
  materiaInstance = new Materia(); // Cria uma instância de Materia
  submateriaInstance = new Submateria(this.materiaInstance); // Passa a instância de Materia para Submateria  
  @Input("questoes") questoes: Questoes = new Questoes(this.submateriaInstance );
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject (ActivatedRoute)
  router2 = inject(Router);

  modalService = inject (MdbModalService);
  @ViewChild("modalSubmaterias") modalSubmaterias!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;



  questoesService = inject(QuestoesService);


  constructor() {
   
  }

  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];
    if (this.questoes.id > 0) {
      this.findById(this.questoes.id);
    }else {
      if(this.questoes.id > 0){
        this.questoes.alternativas.sort((a: Alternativas, b: Alternativas) => a.ordem - b.ordem);

      }else{

        if(this.questoes.alternativas == null)
          this.questoes.alternativas = [];

        this.questoes.alternativas.sort((a: Alternativas, b: Alternativas) => a.ordem - b.ordem);


        this.questoes.alternativas.push(new Alternativas(1));
        this.questoes.alternativas.push(new Alternativas(2));
        this.questoes.alternativas.push(new Alternativas(3));
        this.questoes.alternativas.push(new Alternativas(4));
        this.questoes.alternativas.push(new Alternativas(5));
      }
    }
  }

  findById(id: number) {
    this.questoesService.findById(id).subscribe({
        next: retorno => {

            retorno.alternativas.sort((a: Alternativas, b: Alternativas) => a.ordem - b.ordem);

            this.questoes = retorno;

            for (let i = 0; i < this.questoes.alternativas.length; i++) {

              if (this.questoes.alternativas[i].id === this.questoes.alternativaCorreta?.id) {
                this.questoes.alternativas[i].correta = true;
              } else {
                this.questoes.alternativas[i].correta = false;
              }
            }
        },
        error: erro => {
            alert('Ocorreu algum erro!');
        },
    });
}

  


  
  
  

  save(){
    if (this.questoes.id > 0){

     /*   this.questoes.muitoFacil = 0;
        this.questoes.facil = 0;
        this.questoes.medio = 0;
        this.questoes.dificil = 0;
        this.questoes.muitoDificil = 0;*/

      this.questoesService.update(this.questoes, this.questoes.id).subscribe({

        next: mensagem => {
          alert(mensagem);
          this.router2.navigate(["admin/questoes"], {state: { questaoEditada: this.questoes}})
          this.retorno.emit(this.questoes);
        },
        error: erro => {
          console.log('Erro no update:', erro);
          alert('Ocorreu algum erro!');
        }
        
  
      })} else {
/*
        this.questoes.muitoFacil = 0;
        this.questoes.facil = 0;
        this.questoes.medio = 0;
        this.questoes.dificil = 0;
        this.questoes.muitoDificil = 0;*/


      this.questoesService.save(this.questoes).subscribe({

        next: mensagem => {
          alert(mensagem);
          this.router2.navigate(["admin/questoes"], {state: { questaoNova: this.questoes}})
          this.retorno.emit(this.questoes);
        },
        error: erro => {
          console.log(erro);
          alert('Ocorreu algum erro!');
        },
  
      })
    }

    
  }

  buscarSub(){
    this.modalRef = this.modalService.open(this.modalSubmaterias, {modalClass: 'modal-lg'})
  }

  retornoSubmateria( submateria:Submateria){
    this.questoes.submateria = submateria
    this.modalRef.close();
  }


  getLetter(index: number): string {
    return String.fromCharCode(97 + index); 
  }


  marcarCorreta(alternativa: Alternativas){
    
    for(let i=0; i<this.questoes.alternativas.length; i++){
      this.questoes.alternativas[i].correta = false;
    }

    alternativa.correta = true;

    this.questoes.alternativaCorreta = alternativa;
  }


}





