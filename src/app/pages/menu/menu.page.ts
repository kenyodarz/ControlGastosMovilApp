import { Component } from "@angular/core";
/** Ionic */
import { NavController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { MenuController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
/** Services */
import { TokenStorageService } from "src/app/services/token-storage.service";
/** Models */
import { User } from "src/app/models/user";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage {
  currentUser: User = {
    id: null,
    username: null,
    name: null,
    email: null,
  };
  showAdminBoard = false;
  private roles: string[];
  constructor(
    private menuController: MenuController,
    private nvCrtl: NavController,
    private toastController: ToastController,
    private storage: Storage,
    private alertController: AlertController,
    private token: TokenStorageService
  ) {}

  ionViewDidEnter(): void {
    this.obtenerUsuario();
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Cerrar Sesion!",
      message: "¿Esta Seguro que desea cerrar Sesion?",
      buttons: [
        {
          text: "Si, Cerrar Sesion",
          handler: () => {
            this.loginToast();
            this.storage.remove;
            this.nvCrtl.navigateRoot("/login");
          },
        },
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.cancelLogout();
            this.closeMenu();
          },
        },
      ],
    });
    await alert.present();
  }

  async loginToast() {
    const toast = await this.toastController.create({
      message: "Ha cerrado sesion Correctamente",
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  async cancelLogout() {
    const toast = await this.toastController.create({
      message: `La sesion continua abierta`,
      duration: 2000,
      color: "danger",
      position: "middle",
    });
    toast.present();
  }

  async obtenerUsuario() {
    let user: any;
    await this.token.getUser().then((data) => {
      user = data;
    });
    console.log(user);
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
    this.currentUser = user;
  }

  closeMenu() {
    this.menuController.close();
  }

  goToGastos() {
    this.nvCrtl.navigateRoot("/menu/gastos");
    this.menuController.close();
  }
  goToInformes(){
    this.nvCrtl.navigateRoot("/menu/informes");
    this.menuController.close();
  }
}
