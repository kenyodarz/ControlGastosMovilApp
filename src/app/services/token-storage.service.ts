import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UsuarioService } from "src/app/services/usuario.service";

const TOKEN_KEY: string = "auth-token";
const USER_KEY: string = "auth-user";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor(private storage: Storage, private user: UsuarioService) {}

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    this.storage.set(TOKEN_KEY, token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  async getToken(): Promise<string> {
    const AUTH_TOKEN = await this.storage.get(TOKEN_KEY);
    //return sessionStorage.getItem(TOKEN_KEY);
    return AUTH_TOKEN;
  }

  public saveUser(user) {
    this.user.get(user.id).subscribe((UserResponse) => {
      this.storage.set(USER_KEY, UserResponse);
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(UserResponse));
    });
  }

  async getUser() {
    let AUTH_USER: any;
    await this.storage.get(USER_KEY).then((value) => {
      AUTH_USER = value;
    });
    //return JSON.parse(sessionStorage.getItem(USER_KEY));
    return AUTH_USER;
  }
}
