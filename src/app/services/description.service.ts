// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from "src/app/services/commons.service";
// Modelo
import { Description } from 'src/app/models/Description';
import { Observable } from 'rxjs';
// Enviroment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class DescriptionService extends CommonService<Description, number> {
  protected API_URL: string = `${environment.API_URL}/description/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
