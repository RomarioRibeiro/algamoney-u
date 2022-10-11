
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LacamentosModule } from './lacamentos/lacamentos.module';



import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { MessagecomponentComponent } from './messagecomponent/messagecomponent.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}




@NgModule({
  declarations: [
    AppComponent,
    MessagecomponentComponent,
  ],
  imports: [

    MessagesModule,
    MessageModule,
    LacamentosModule,
    SidebarModule,
    PessoasModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule



  ],
  exports: [

  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
