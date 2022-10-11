import { Title } from '@angular/platform-browser';
import { Pessoa } from './../../core/lancamento.model';
import { LancamentoService } from './../lancamento.service';
import { NgForm } from '@angular/forms';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErroHandlerService } from './../../core/erro-handler.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/core/lancamento.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private erroHandler: ErroHandlerService,
    private routes: ActivatedRoute,
    private router: Router,
    private title: Title

    ) { }

  ngOnInit(): void {
    const codigoLancamento =this.routes.snapshot.params['codigo']

    this.title.setTitle('Novo lançamento')

    if(codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategoria();
    this.carregarPessoas();
  }

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento: Lancamento = new Lancamento();


  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento
      this.atualizarTituloEdicao()
    })
    .catch(error => this.erroHandler.handler(error));
  }


  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  salvar(form: NgForm) {
    if(this.editando) {
      this.atualizarLancamento(form)

    }else {
      this.adicionarLancamento(form)
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento criado com sucesso!' });

      // form.reset();
      // this.lancamento = new Lancamento();
     this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
    })
    .catch(error => this.erroHandler.handler(error));
  }


  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .then((lancamento: Lancamento) => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao()
        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
      }
      ).catch(erro => this.erroHandler.handler(erro))
  }

  carregarCategoria() {
    this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map((c: { nome: any; codigo: any; }) =>({label: c.nome, value: c.codigo }));
    })
    .catch(error => this.erroHandler.handler(error));
  }


  carregarPessoas() {
    this.pessoasService.listarPessoa()
    .then(pessoas => {
      this.pessoas = pessoas.map((p: { nome: any; codigo: any; }) => ({label: p.nome, value: p.codigo}));
    })
  }

  novo(form: NgForm) {
    this.router.navigate(['/lancamentos/novo'])

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1)
  }


  atualizarTituloEdicao() {

    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`)
  }

}
