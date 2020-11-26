// Angular
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// Servicio Generico
import { CommonService } from "src/app/services/commons.service";
// Modelo
import { RegistroEntrada } from "src/app/models/RegistroEntrada";
// Enviroment
import { API_URL } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegistroService extends CommonService<RegistroEntrada, number> {
  protected API_URL: string = `${API_URL}/registro/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
