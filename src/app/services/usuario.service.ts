// Angular
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// Servicio Generico
import { CommonService } from "src/app/services/commons.service";
// Modelo
import { User } from "src/app/models/User";
// Enviroment
import { API_URL } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService extends CommonService<User, number> {
  protected API_URL: string = `${API_URL}/user/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
