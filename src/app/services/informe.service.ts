// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from "src/app/services/commons.service";
// Modelo
import { Informe } from 'src/app/models/Informe';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class InformeService extends CommonService<Informe, number> {
  protected API_URL: string = `${API_URL}/description/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
