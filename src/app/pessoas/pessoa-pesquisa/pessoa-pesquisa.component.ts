import { ErroHandlerService } from './../../core/erro-handler.service';
import { Table } from 'primeng/table';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {
  pessoas = [];
  filtro = new PessoaFiltro
  totalRegistro = 0;

  @ViewChild('tabela') grid!: Table;


  constructor(
    private pessoaService: PessoaService,
    private messagemService: MessageService,
    private erroHandler: ErroHandlerService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pessoa Pesquisa')

    // this.pesquisar();
    // this.listaPessoa();
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then((resultado: any) => {
        this.totalRegistro = resultado.total
        this.pessoas = resultado.pessoas;
      });
    }

    listaPessoa() {
      this.pessoaService.listarPessoa()
      .then(pessoas => this.pessoas = pessoas)
      .catch(error => this.erroHandler.handler(error));
    }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmacaoExclusao(pessoa: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    })
  }

  excluir(pessoas: any) {
    this.pessoaService.excluir(pessoas.codigo)

      .then(() => {
        this.grid.reset();

        this.messagemService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' })

      })
      .catch(error => this.erroHandler.handler(error));

  }

  mudarStatus(pessoa: any) {
const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo,novoStatus)
    .then(() => {
      const acao = novoStatus ? 'Ativada' : 'Desativada';

      pessoa.ativo = novoStatus;
      this.messagemService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso` });

    })
    .catch(error => this.erroHandler.handler(error));
  }
}
