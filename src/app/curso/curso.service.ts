import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  //url
  url = "http://localhost/api/php/";

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
/**
  //Cadastrar curso
  cadastrarCurso(c:Curso):Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar',{cursos:c}).pipe(map((res:any)=>{
    if(res){
      this.vetor.push(res['cursos']);
    }
      return this.vetor;
    }))
  }
   */

    
    cadastrarCurso(c:Curso):Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar',{cursos:c}).pipe(map((res :any)=>{
      if(res){
        this.vetor.push(res['cursos']);
      }
    
      return this.vetor;
    }))
  }

  //Remover curso
  removerCurso(c:Curso):Observable<Curso[]>{

    const params = new HttpParams().set("idCurso", c.idCurso.toString());

    return this.http.delete(this.url+'excluir',{params: params}).pipe(map((res)=>{

      const filtro = this.vetor.filter((curso)=>{
        return +curso['idCurso'] !== +c.idCurso;
      });
      return this.vetor=filtro;
    })
    )
  }


  //atualizar curso
  atualizarCurso(c:Curso):Observable<Curso[]>{
    //executa a alteração via URL
    return this.http.put(this.url+'alterar', {cursos:c})
    //percorre o vetor para saber qual é o id do curso alterado
    .pipe(map((res) =>{
      const cursoAlterado = this.vetor.find((item) =>{
        return +item['idCurso'] === +['idCurso']
      });

      //Altero o valor do vetor local
      if(cursoAlterado){
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];

      }
      //Retorno
      return this.vetor;
    }))

  }
}
