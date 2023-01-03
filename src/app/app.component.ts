import { Component } from '@angular/core';
import { EncuestasService } from './services/encuestas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pablovilches3it';

  showAlert = false;
  message = '';
  constructor(private encuestaservicio : EncuestasService ){
  }

  ngOnInit(){
    this.encuestaservicio.alert$.subscribe((res: any) => {
      this.message = res.message;
      this.showAlert = true;
      setTimeout(() =>{
        this.showAlert = false;
      }, res.time);
    });
  }
}
