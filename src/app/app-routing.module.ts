import { SegurancaModule } from './seguranca/seguranca.module';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { LancamentoCadastroComponent } from "./lacamentos/lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoPesquisaComponent } from "./lacamentos/lancamento-pesquisa/lancamento-pesquisa.component";
import { PessoaPesquisaComponent } from "./pessoas/pessoa-pesquisa/pessoa-pesquisa.component";
import { LoginFormComponent } from './seguranca/login-form/login-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  {path: 'lancamentos', component: LancamentoPesquisaComponent},
  {path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  {path: 'lancamentos/:codigo', component: LancamentoCadastroComponent},
  {path: 'pessoas', component: PessoaPesquisaComponent},
  {path: 'pessoas/novo', component: PessoaCadastroComponent},
  {path: 'pessoas/:codigo', component: PessoaCadastroComponent},
  {path: 'login', component: LoginFormComponent},

  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}
]

@NgModule({

  imports: [

    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,
  ]
})
export class  AppRoutingModule { }
