import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //url BASE
  url= "http://localhost/api/php/";

  //vetor de cursos
  vetor:Curso[]=[];

  //Objeto da classe Curso
  curso = new Curso();

  //construtor
  constructor(private curso_servico: CursoService) { }

  //inicializador
  ngOnInit(): void { 
    //ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }

//Cadastro
  cadastro(curso:Curso):void{
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res:Curso[])=>{
        //adicionando dados ao vetor
        this.vetor=res;

        //limpar os atributos
        //this.curso.nomeCurso="";
        //this.curso.valorCurso=0;
        this.curso = new Curso();

        //Atualizar a listagem 
        this.selecao();
      }

    )
    
    }
  //Selecao
  selecao(){
    this.curso_servico.obterCursos().subscribe(
      (res:Curso[])=>{
        this.vetor=res;
      })
  }

   //alterar
  alterar(c:Curso){
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res)=> {
        //atualizar vetor
        this.vetor = res;

        //limpar os valores do objeto 
        this.curso.nomeCurso = "";
        this.curso.valorCurso=0;

        //Atualiza a listagem
        this.selecao();

      }
    )
  }

  //remover
  remover(c:Curso){
    this.curso_servico.removerCurso(this.curso).subscribe(
      (res:Curso[]) =>{
        this.vetor = res;

        this.curso.nomeCurso = "";
        this.curso.valorCurso=0;
      }
    ) 
  }

  //Selecionar curso específico
  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;

  }
  
}
