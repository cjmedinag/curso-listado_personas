import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './loggingService.service';
import { Persona } from './persona.model';
import { Route } from '@angular/router';
import { DataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PersonasService {
  personas: Persona[] = [];

  saludar = new EventEmitter<number>();

  constructor(
    private loggingService: LoggingService,
    private dataService: DataService
  ) {}

  setPersonas(personas: Persona[]){
    this.personas = personas;
  }

  agregarPersona(persona: Persona) {
    this.loggingService.enviarMensajeAConsola(
      'agregamos persona:' + persona.nombre
    );
    if(this.personas == null){
      this.personas = [];
    }
    this.personas.push(persona);
    this.dataService.guardarPersonas(this.personas);
  }

  encontrarPersona(index: number) {
    let persona: Persona = this.personas[index];
    return persona;
  }

  modificarPersona(index: number, persona: Persona) {
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
    this.dataService.modificarPersona(index, persona);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
    this.dataService.eliminarPersona(index);
    //se vuelve a guardar el arreglo para que se regeneren los indices
    this.modificarPersonas();
  }

  modificarPersonas(){
    if(this.personas != null){
      this.dataService.guardarPersonas(this.personas);
    }
  }

  obtenerPersonas(): Observable<Persona[]>{
    return this.dataService.cargarPersonas();
  }
}
