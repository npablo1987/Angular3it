import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  urlencuestas = 'http://localhost:8080/api/encuesta/datag'
  urlgeneros = 'http://localhost:8080/api/genero/listar'

  private alertSource = new Subject();
  alert$ = this.alertSource.asObservable();



  constructor(private http: HttpClient) { }

  showAlert(message: string, time: number = 5000){
    this.alertSource.next({message, time});
  }

   getEncuestas(){
    let heades = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.http.get(this.urlencuestas,{ headers : heades});
  }

  getGeneros(){
    let heades = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.http.get(this.urlgeneros,{ headers : heades});
  }

  onInsertEncuesta(data: any) {
    console.log( "DATA ::: ",data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post('http://localhost:8080/api/encuesta/agregar', data, httpOptions)
  }


}
