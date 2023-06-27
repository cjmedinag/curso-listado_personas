import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { LoginService } from './login/login.service';

@Injectable()
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  guardarPersonas(personas: Persona[]) {
    const token = this.loginService.getIdToke();
    this.httpClient
      .put(
        'https://listado-personas-91222-default-rtdb.firebaseio.com/datos.json?auth=' + token,
        personas
      )
      .subscribe(
        (response) => {
          console.log('resultado de guardar personas' + personas);
        },
        (error) => console.log('error al guardar persoas' + error)
      );
  }

  cargarPersonas() {
    const token = this.loginService.getIdToke();
    return this.httpClient.get<Persona[]>(
      'https://listado-personas-91222-default-rtdb.firebaseio.com/datos.json?auth=' + token
    );
  }

  modificarPersona(indice: number, persona: Persona) {
    const token = this.loginService.getIdToke();
    let url: string;
    url =
      'https://listado-personas-91222-default-rtdb.firebaseio.com/datos/' +
      indice +
      '.json?auth=' + token;
    this.httpClient.put(url, persona).subscribe(
      (response) => console.log('resultado de modificarl el objeto persona'),
      (error) => console.log('error en modificar persona:' + error)
    );
  }

  eliminarPersona(indice: number) {
    const token = this.loginService.getIdToke();
    let url: string;
    url =
      'https://listado-personas-91222-default-rtdb.firebaseio.com/datos/' +
      indice +
      '.json?auth=' + token;
    this.httpClient.delete(url).subscribe(
      (response) => console.log('resultado de eliminar el objeto persona'),
      (error) => console.log('error en eliminar persona:' + error)
    );
  }
}
