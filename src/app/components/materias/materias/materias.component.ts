import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Materia } from '../../../models/materia';
import { MateriaService } from '../../../services/materia.service';
import { CommonModule } from '@angular/common';
import { SubmateriaslistComponent } from "../../submaterias/submateriaslist/submateriaslist.component";
import { Submateria } from '../../../models/submateria';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Router, RouterLink } from '@angular/router';
import { QuestoesService } from '../../../services/questoes.service';
import { SubmateriaService } from '../../../services/submateria.service';


@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, SubmateriaslistComponent, MdbModalModule, RouterLink],  // Importando módulos necessários
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'] // Corrigido para styleUrls
})
export class MateriasComponent {

  modalService = inject (MdbModalService);
  @ViewChild("modalSubmaterias") modalSubmaterias!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Materia[] = [];  // Lista de todas as matérias
  submaterias: Submateria[] = [];  // Lista de submatérias associadas à matéria selecionada
  materiaSelecionada!: Materia;  // Propriedade para armazenar a matéria selecionada
  router = inject(Router);

  constructor(
    private materiaService: MateriaService,
    private questoesService: QuestoesService,
    private submateriaService: SubmateriaService

  ) {
    this.findAll();
  }
    
  findAll(){
    this.materiaService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Ocorreu algum erro!');
      },
    });
  }
  
  buscarSubmateria(id: number): void {
    this.materiaService.findById(id).subscribe({
      next: materia => {
        this.materiaSelecionada = materia;
        this.submaterias = materia.submateria;
  
        // Primeiro, mantém o loop atual para preencher a quantidadeRespondida
        for (let i = 0; i < this.submaterias.length; i++) {
          this.submaterias[i].quantidadeRespondida = this.questoesService.retornarContador(this.submaterias[i].id);
        }
  
        // Agora, busca a quantidade de questões (você pode manter o `findSubmateriasComQuantidadeQuestoes`)
        this.submateriaService.findSubmateriasComQuantidadeQuestoes().subscribe({
          next: submateriasComQuantidade => {
            // Atribua a quantidade de questões para cada submatéria
            this.submaterias.forEach(submateria => {
              const submateriaEncontrada = submateriasComQuantidade.find(sm => sm.id === submateria.id);
              if (submateriaEncontrada) {
                submateria.quantidadeQuestoes = submateriaEncontrada.quantidadeQuestoes;
              }
            });
          
          },
          error: erro => {
            alert('Erro ao buscar quantidade de questões!');
          }
        });
  
        // Abre o modal
        this.modalRef = this.modalService.open(this.modalSubmaterias);
      },
      error: erro => {
        alert('Erro ao buscar as submatérias!');
      }
    });
  }
  
  

  retornoSubmateria(submateria : Submateria){

  }

  flashcards(){
    this.router.navigate(['admin/flashcards']);
    this.modalRef.close();
  }

}





