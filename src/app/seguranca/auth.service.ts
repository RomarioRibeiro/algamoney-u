import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient) { }



  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');


    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return firstValueFrom(this.http.post<void>(this.authURL , body, { headers }))
    .then(response => {
      console.log(response)
    })
    .catch(response => {
      console.log(response)

    })
  }


}
