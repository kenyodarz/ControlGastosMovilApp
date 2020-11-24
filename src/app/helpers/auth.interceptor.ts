import { Injectable } from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpEvent,
} from "@angular/common/http";
import { HttpHandler, HttpRequest } from "@angular/common/http";

import { TokenStorageService } from "../services/token-storage.service";
import { from } from "rxjs";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    let authReq = req;
    const token = await this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
      });
    }
    return next.handle(authReq).toPromise();
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
