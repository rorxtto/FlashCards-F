import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Materia } from '../../../models/materia';
import { RouterLink } from '@angular/router';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { MateriasdetailsComponent } from '../materiasdetails/materiasdetails.component';
import { MateriaService } from '../../../services/materia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materiaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MateriasdetailsComponent],
  templateUrl: './materiaslist.component.html',
  styleUrls: ['./materiaslist.component.scss'],
})
export class MateriaslistComponent {
  lista: Materia[] = [];
  materiaEdit: Materia = new Materia(); // Instancia sem argumentos

  @Input('esconderBotoes') esconderBotoes: boolean = false;
  @Output('retorno') retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild('modalMateriaDetalhe') modalMateriaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  materiaService = inject(MateriaService);
  router = inject(Router);

  constructor() {
    let materiaNova = history.state.materiaNova;
    let materiaEditada = history.state.materiaEditada;

    if (materiaEditada) {
      let indice = this.lista.findIndex((x) => {
        return x.id == materiaEditada.id;
      });
      this.lista[indice] = materiaEditada;
    }

    if (materiaNova) {
      this.lista.push(materiaNova);
    }

    this.findAll();
  }

  findAll() {
    this.materiaService.findAll().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert('Ocorreu algum erro!');
      },
    });
  }

  deleteById(materia: Materia) {
    if (confirm('Tem certeza que deseja deletar esta materia?')) {
      this.materiaService.delete(materia.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.findAll();
        },
        error: (erro) => {
          alert('Ocorreu algum erro!');
        },
      });
    }
  }

  new() {
    this.materiaEdit = new Materia();
    this.modalRef = this.modalService.open(this.modalMateriaDetalhe);
  }

  edit(materia: Materia) {
    this.materiaEdit = Object.assign({}, materia);
    this.modalRef = this.modalService.open(this.modalMateriaDetalhe);
  }

  retornoDetalhe(materia: Materia) {
    this.findAll();
    this.modalRef.close();
  }

  select(materia: Materia) {
    this.retorno.emit(materia);
  }

  submateriasList(idMateria: number = 0) {
    if (idMateria > 0)
      this.router.navigate(['admin/submaterias/'+idMateria]);
    else
       this.router.navigate(['admin/submaterias']);
  }

  questoesList() {
    this.router.navigate(['admin/questoes']);
  }
}


