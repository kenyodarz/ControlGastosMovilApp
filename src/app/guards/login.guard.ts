import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}
  async canActivate() {
    const isLoggedIn = await this.storage.get("isLoggedIn");
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
