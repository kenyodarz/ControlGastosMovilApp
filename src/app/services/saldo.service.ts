// Angular
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// Servicio Generico
import { CommonService } from "src/app/services/commons.service";
// Modelo
import { Saldo } from "src/app/models/Saldo";
// Enviroment
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SaldoService extends CommonService<Saldo, number> {
  protected API_URL: string = `${environment.API_URL}/saldo/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
