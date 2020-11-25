//* Angular */
import { Component } from "@angular/core";
/** Ionic */
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
//* Servicios */
import { TokenStorageService } from "src/app/services/token-storage.service";
import { RegistroSalidaService } from "src/app/services/registro-salida.service";
//* Modelos */
import { RegistroSalida } from "src/app/models/RegistroSalida";
import { User } from "src/app/models/user";

@Component({
  selector: "app-informes",
  templateUrl: "./informes.page.html",
  styleUrls: ["./informes.page.scss"],
})
export class InformesPage {
  currentUser: any = {
    accessToken: null,
    email: null,
    id: null,
    name: null,
    roles: [],
    tokenType: null,
    username: null,
  };
  private roles: string[];
  isLoggedIn = false;
  selectedUsuario: User;
  registrosSalida: RegistroSalida[] = [];
  showAdminBoard = false;

  constructor(
    private registroSalidaService: RegistroSalidaService,
    private token: TokenStorageService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ionViewDidEnter(): Promise<void> {
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      await this.obtenerUsuario();
    }
    if (this.showAdminBoard) {
      this.selectedUsuario = this.currentUser;
      this.currentUser = null;
    }
    this.obtenerRegistrosSalid();
  }

  async obtenerUsuario() {
    let user: any;
    await this.token.getUser().then((data) => {
      user = data;
    });
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
    this.currentUser = user;
  }

  obtenerRegistrosSalid() {
    this.registroSalidaService.getAll().subscribe(
      (result: any) => {
        let registrosSalidas: RegistroSalida[] = [];
        for (let index = 0; index < result.length; index++) {
          let registroSalida = result[index] as RegistroSalida;
          if (this.showAdminBoard) {
            if (this.currentUser.username == registroSalida.users.username) {
              if (registroSalida.informe === null) {
                registrosSalidas.push(registroSalida);
              }
            }
          } else {
            if (this.currentUser.username == registroSalida.users.username) {
              if (registroSalida.informe === null) {
                registrosSalidas.push(registroSalida);
              }
            }
          }
        }
        this.registrosSalida = registrosSalidas.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
            return -1;
          }
          // Si a y b son iguales
          return 0;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async eliminar(registro: RegistroSalida) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Atencion",
      message: "¿Está seguro que desea eliminar el registro?",
      buttons: [
        {
          text: "Si, Eliminar",
          handler: () => {
            this.registroSalidaService
              .delete(registro.idRegistroSalida)
              .subscribe((result: any) => {
                this.toastSuccess(
                  `Se elimino el registro de ${result.observaciones} correctamente`
                );
                this.eliminarRegistroSalida(result.idRegistro);
              });
          },
        },
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.toastError("Accion cancelada");
          },
        },
      ],
    });
    await alert.present();
  }
  eliminarRegistroSalida(idRegistro: number) {
    this.registrosSalida.splice(
      this.registrosSalida.findIndex((e) => e.idRegistroSalida == idRegistro),
      1
    );
  }

  async toastError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: "danger",
      position: "middle",
    });
    toast.present();
  }

  async toastSuccess(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: "success",
      position: "top",
    });
    toast.present();
  }
}
