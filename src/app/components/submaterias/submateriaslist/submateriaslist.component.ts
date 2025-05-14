import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Submateria } from '../../../models/submateria';
import { SubmateriasdetailsComponent } from '../submateriasdetails/submateriasdetails.component';
import { SubmateriaService } from '../../../services/submateria.service';
import { Materia } from '../../../models/materia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';



@Component({
  selector: 'app-submateriaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, SubmateriasdetailsComponent, CommonModule, FormsModule],
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

  // Variáveis para paginação
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  
  // Variáveis para filtro e pesquisa
  filtroNome: string = '';
  private searchTerms = new Subject<string>();
  carregando: boolean = false;
  
  // Flag para controlar o tipo de carregamento
  usarCarregamentoOtimizado: boolean = true;

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

    // Configurar o debounce para a pesquisa
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 0; // Resetar para a primeira página ao pesquisar
      this.loadSubmateriasPaginated();
    });

    this.loadSubmateriasPaginated();
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

  loadSubmateriasPaginated() {
    this.carregando = true;
    
    // Verificar se deve usar o carregamento otimizado
    if (this.usarCarregamentoOtimizado && (this.idMateria > 0 || this.materiaId)) {
      this.loadSubmateriasComQuantidadeQuestoes();
      return;
    }
    
    // Se tiver ID de matéria e filtro de nome
    if ((this.idMateria > 0 || this.materiaId) && this.filtroNome) {
      const id = this.idMateria > 0 ? this.idMateria : this.materiaId;
      this.submateriaService.findAllPaginatedAndFiltered(
        this.currentPage, 
        this.pageSize, 
        this.filtroNome, 
        id
      ).subscribe({
        next: response => this.handlePaginatedResponse(response),
        error: erro => this.handleError(erro)
      });
    }
    // Se tiver apenas ID de matéria
    else if (this.idMateria > 0 || this.materiaId) {
      const id = this.idMateria > 0 ? this.idMateria : this.materiaId;
      this.submateriaService.findAllPaginatedByMateriaId(
        this.currentPage, 
        this.pageSize, 
        id
      ).subscribe({
        next: response => this.handlePaginatedResponse(response),
        error: erro => this.handleError(erro)
      });
    }
    // Se tiver apenas filtro de nome
    else if (this.filtroNome) {
      this.submateriaService.findAllPaginatedAndFiltered(
        this.currentPage, 
        this.pageSize, 
        this.filtroNome
      ).subscribe({
        next: response => this.handlePaginatedResponse(response),
        error: erro => this.handleError(erro)
      });
    }
    // Se não tiver nenhum filtro
    else {
      this.submateriaService.findAllPaginated(
        this.currentPage, 
        this.pageSize
      ).subscribe({
        next: response => this.handlePaginatedResponse(response),
        error: erro => this.handleError(erro)
      });
    }
  }
  
  loadSubmateriasComQuantidadeQuestoes() {
    this.carregando = true;
    
    if (this.idMateria > 0 || this.materiaId) {
      const id = this.idMateria > 0 ? this.idMateria : this.materiaId;
      this.submateriaService.findSubmateriasComQuantidadeQuestoesByMateriaId(id).subscribe({
        next: submaterias => {
          this.lista = submaterias;
          this.totalItems = submaterias.length;
          this.totalPages = 1;
          this.carregando = false;
        },
        error: erro => this.handleError(erro)
      });
    } else {
      this.submateriaService.findSubmateriasComQuantidadeQuestoes().subscribe({
        next: submaterias => {
          this.lista = submaterias;
          this.totalItems = submaterias.length;
          this.totalPages = 1;
          this.carregando = false;
        },
        error: erro => this.handleError(erro)
      });
    }
  }
  
  private handlePaginatedResponse(response: any) {
    this.lista = response.content;
    this.totalItems = response.totalElements;
    this.totalPages = response.totalPages;
    this.carregando = false;
  }
  
  private handleError(erro: any) {
    alert('Ocorreu um erro ao carregar as submaterias!');
    this.carregando = false;
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadSubmateriasPaginated();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadSubmateriasPaginated();
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadSubmateriasPaginated();
    }
  }
  
  onSearch() {
    // Quando pesquisar, desativar o carregamento otimizado para permitir filtro por nome
    if (this.filtroNome) {
      this.usarCarregamentoOtimizado = false;
    } else {
      this.usarCarregamentoOtimizado = true;
    }
    this.searchTerms.next(this.filtroNome);
  }
  
  limparFiltros() {
    this.filtroNome = '';
    this.currentPage = 0;
    this.usarCarregamentoOtimizado = true;
    this.loadSubmateriasPaginated();
  }
  
  changePageSize() {
    this.currentPage = 0; // Resetar para a primeira página ao mudar o tamanho
    this.loadSubmateriasPaginated();
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

  deleteById(submateria: Submateria){
     if (confirm("Tem certeza que deseja deletar esta submateria?") ) {

      this.submateriaService.delete(submateria.id).subscribe({
        next: mensagem => {
          alert(mensagem);
          this.loadSubmateriasPaginated();
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
    this.loadSubmateriasPaginated();
    this.modalRef.close();
  }

  materiasList(){
    this.router.navigate(['admin/materias']);
  }

  select(submateria:Submateria){
    this.retorno.emit(submateria);
  }
}