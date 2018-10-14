import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './Usuario';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {


  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/usuario';

  /** GET heroes from the server */
  getConfig(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }
}