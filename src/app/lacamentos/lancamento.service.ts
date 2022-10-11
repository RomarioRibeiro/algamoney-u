import { Pessoa } from './../core/lancamento.model';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Lancamento } from '../core/lancamento.model';



export class LancamentoFiltro {
  descricao?: string
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  intensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoURL = 'http://localhost:8080/lancamentos';


  constructor(
    private http: HttpClient,
    private datePipe: DatePipe) { }

    pesquisar(filtro: LancamentoFiltro): Promise<any> {
      const headers = new HttpHeaders()
        .append('Authorization',
        'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      let params = new HttpParams();


      params = params.set('page', filtro.pagina);
      params = params.set('size', filtro.intensPorPagina);

      if (filtro.descricao) {
        params = params.set('descricao', filtro.descricao);
      }

      if (filtro.dataVencimentoInicio) {
        params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
      }

      if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
      }

      return this.http.get(`${this.lancamentoURL}?resumo`, { headers, params })
        .toPromise()
        .then((response: any) => {
          const lancamentos = response['content'];

          const resultado = {
            lancamentos,
            total: response['totalElements']
          };
          return resultado;
        });
    }

    excluir(codigo: number): Promise<any> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.delete(`${this.lancamentoURL}/${codigo}`,{ headers})
      .toPromise()
      .then(() => null);
    }

    adicionar(lancamento: Lancamento): Promise<Lancamento> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

        return firstValueFrom(this.http.post<Lancamento>(this.lancamentoURL, lancamento, { headers }));
    }



    atualizar(lancamento: Lancamento): Promise<Lancamento> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return this.http.put<Lancamento>(`${this.lancamentoURL}/${lancamento.codigo}`, lancamento, { headers })
        .toPromise()
        .then((response: any) => {
          this.converterStringsParaDatas([response]);

          return response;
        });
    }

    buscarPorCodigo(codigo: number): Promise<Lancamento> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return firstValueFrom(this.http.get<Lancamento>(`${this.lancamentoURL}/${codigo}`, { headers }))
      .then((response: any) => {
        this.converterStringsParaDatas([response]);
        return response;
      });

    }

    private converterStringsParaDatas(lacamentos: Lancamento[]) {
      for (const lancamento of lacamentos) {
        let offset = new Date().getTimezoneOffset() * 60000;

        lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

        if (lancamento.dataPagamento) {
          lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
        }
      }
    }

}


