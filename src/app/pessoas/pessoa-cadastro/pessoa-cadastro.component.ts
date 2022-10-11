import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErroHandlerService } from 'src/app/core/erro-handler.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from 'src/app/core/lancamento.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {


  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messagemService: MessageService,
    private erroHandler: ErroHandlerService,
    private title: Title,
    private router: Router,
    private routes: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const codigoPessoa = this.routes.snapshot.params['codigo']

    this.title.setTitle('Nova Pessoa')

    if(codigoPessoa && codigoPessoa !== 'novo') {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  carregarPessoa(codigo: number)  {
    this.pessoaService.buscarPorCodigo(codigo)
    .then((pessoa: Pessoa) => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(error => this.erroHandler.handler(error));

  }

  salverPessoa(form: NgForm) {
    if(this.editando) {
      this.atualizarPessoas(form);
    }else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionarPessoa(this.pessoa)
    .then(() => {
      this.messagemService.add({ severity: 'success', detail: 'Pessoa criado com sucesso!' });

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(error => this.erroHandler.handler(error));

  }

  atualizarPessoas(form: NgForm) {
    this.pessoaService.atualizarPessoa(this.pessoa)
    .then((pessoa: Pessoa) => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();

      this.messagemService.add({ severity: 'success', detail: 'Pessoa criado com sucesso!' });


    })
    .catch(error => this.erroHandler.handler(error));

  }

  novo(form: NgForm) {
    this.router.navigate(['/pessoas/novo'])

  setTimeout(() => {
    this.pessoa = new Pessoa();
  }, 1)
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edidamdo Pessoa: ${this.pessoa.nome}`)
  }
}
