import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EncuestasService } from '../services/encuestas.service';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {

  generos: any[] = [];
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  form = new FormGroup({
    genero_id: new FormControl(''),
    correo: new FormControl('',[Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)])
  })

  constructor(private encuestaService: EncuestasService) {
    this.encuestaService.getGeneros().subscribe((resp: any) => {
      console.log(resp);
      this.generos = resp;
    });
  }
  async ngOnInit() {
  }
  onResertFrom(){
    this.form.reset();
  }
  submitForm() {
    if(this.form.valid){
      console.log(this.form.value)
      this.encuestaService.onInsertEncuesta(this.form.value).subscribe((resp: any) => {
        console.log({resp});
      })
      this.onResertFrom();
      this.encuestaService.showAlert('Encuesta Agregada Correctamente');
    }  else {
      console.log('No Validado!');
      this.encuestaService.showAlert('Error al Agregar Encuesta, Verifique que sea un E-mail Valido');
    }
  }

  get correo() {return this.form.get('correo');}

}

