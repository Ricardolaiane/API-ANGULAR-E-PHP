import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  //url
  url = "localhost/api/php/";

  // vetor
  vetor:Curso[] = [];

  //construtor
  constructor(private http: HttpClient) { }

  //obter todos os cursos
  obterCursos():Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url+'listar').pipe(
      map((res)=>{
        this.vetor = res['cursos'];
        return this.vetor;
      })
    )
  }

  //Cadastrar curso
  cadastrarCurso(c:Curso):Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar',{cursos:c}).pipe(map((res)=>{
      this.vetor.push(res['cursos']);
      return this.vetor;
    }))
  }



}
