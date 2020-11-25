// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from "src/app/services/commons.service";
// Modelo
import { Proyecto } from 'src/app/models/Proyecto';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class ProyectoService extends CommonService<Proyecto, string> {
  protected API_URL: string = `${API_URL}/proyecto/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
