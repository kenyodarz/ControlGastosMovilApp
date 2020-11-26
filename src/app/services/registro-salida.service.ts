// Angular
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// Servicio Generico
import { CommonService } from "src/app/services/commons.service";
// Modelo
import { RegistroSalida } from "src/app/models/RegistroSalida";
// Enviroment
import { API_URL } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegistroSalidaService extends CommonService<
  RegistroSalida,
  number
> {
  protected API_URL: string = `${API_URL}/registroSalida/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
