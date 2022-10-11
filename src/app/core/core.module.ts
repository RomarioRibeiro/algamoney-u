import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { NavbarComponent } from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';
import { AuthService } from './../seguranca/auth.service';
import { ErroHandlerService } from './erro-handler.service';
import { HttpLoaderFactory } from '../app.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports:[
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule

  ],
  providers:[
    ErroHandlerService,
    MessageService,
    ConfirmationService,
    TranslateService,
    AuthService,
    Title,
    DatePipe,
    {provide: LOCALE_ID,  useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
