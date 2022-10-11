import { ErroHandlerService } from './../../core/erro-handler.service';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit  {


  totalRegistros = 0;
  filtro = new LancamentoFiltro

  lancamentos: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandlerService: ErroHandlerService,
    private messagemService: MessageService,
    private confimationService: ConfirmationService,
    private title: Title
    ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos')
      // this.pesquisar();
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado =>  {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina)
  }

  confimacaoExclusao(lancamento: any) {
    this.confimationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    })
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() =>{
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.reset();
      }
      this.messagemService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
  })
  .catch(error => this.errorHandlerService.handler(error));;
  }
}
