import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Questoes } from '../../../models/questoes';
import { Alternativas } from '../../../models/alternativas';
import { Submateria } from '../../../models/submateria';
import { QuestoesService } from '../../../services/questoes.service';
import { Router, RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { QuestoesdetailsComponent } from '../questoesdetails/questoesdetails.component';
import { Materia } from '../../../models/materia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-questoeslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, QuestoesdetailsComponent, CommonModule, FormsModule],
  templateUrl: './questoeslist.component.html',
  styleUrl: './questoeslist.component.scss'
})
export class QuestoeslistComponent {

  questoesServices = inject(QuestoesService)
  questoes: Questoes[]= []
  router = inject(Router)

  // Variáveis para paginação
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  
  // Variáveis para filtro e pesquisa
  filtroEnunciado: string = '';
  filtroSubmateria: string = '';
  submateriaId?: number;
  private searchTerms = new Subject<string>();
  carregando: boolean = false;

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
    
    this.loadQuestoesPaginated();
    
    // Configurar o debounce para a pesquisa
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 0; // Resetar para a primeira página ao pesquisar
      this.loadQuestoesPaginated();
    });
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

  loadQuestoesPaginated() {
    this.carregando = true;
    
    // Usar o método filtrado se houver algum filtro ativo
    if (this.filtroEnunciado || this.submateriaId) {
      this.questoesServices.findAllPaginatedAndFiltered(
        this.currentPage, 
        this.pageSize, 
        this.filtroEnunciado, 
        this.submateriaId
      ).subscribe({
        next: response => {
          this.questoes = response.content;
          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
          this.carregando = false;
        },
        error: erro => {
          alert('Ocorreu um erro ao carregar as questões!');
          this.carregando = false;
        }
      });
    } else {
      // Usar o método simples se não houver filtros
      this.questoesServices.findAllPaginated(this.currentPage, this.pageSize).subscribe({
        next: response => {
          this.questoes = response.content;
          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
          this.carregando = false;
        },
        error: erro => {
          alert('Ocorreu um erro ao carregar as questões!');
          this.carregando = false;
        }
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadQuestoesPaginated();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadQuestoesPaginated();
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadQuestoesPaginated();
    }
  }
  
  onSearch() {
    this.searchTerms.next(this.filtroEnunciado);
  }
  
  limparFiltros() {
    this.filtroEnunciado = '';
    this.submateriaId = undefined;
    this.currentPage = 0;
    this.loadQuestoesPaginated();
  }
  
  changePageSize() {
    this.currentPage = 0; // Resetar para a primeira página ao mudar o tamanho
    this.loadQuestoesPaginated();
  }
  
  // Método para mostrar um número limitado de páginas na paginação
  getPagesArray(): number[] {
    const maxPagesToShow = 5;
    const pages: number[] = [];
    
    if (this.totalPages <= maxPagesToShow) {
      // Se tiver menos páginas que o máximo, mostrar todas
      for (let i = 0; i < this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Caso contrário, mostrar um subconjunto com a página atual no centro quando possível
      let startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(this.totalPages - 1, startPage + maxPagesToShow - 1);
      
      // Ajustar se estiver no final
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(0, endPage - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  materiasList(){
    this.router.navigate(['admin/materias']);
  }

  deleteById(questoes: Questoes){
    if (confirm('Tem certeza que deseja excluir esta questão?')) {
      this.questoesServices.delete(questoes.id).subscribe({
        next: resposta => {
          alert(resposta);
          this.loadQuestoesPaginated();
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
  this.loadQuestoesPaginated();
  this.modalRef.close();
}

}