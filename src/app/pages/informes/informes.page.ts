//* Angular */
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
/** Ionic */
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { MenuController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
/** PrimeNG */
import { PrimeNGConfig } from "primeng/api";
//* Servicios */
import { AuthService } from "src/app/services/auth.service";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { DescriptionService } from "src/app/services/description.service";
import { ProyectoService } from "src/app/services/proyecto.service";
import { RegistroService } from "src/app/services/registro.service";
import { RegistroSalidaService } from "src/app/services/registro-salida.service";
import { SaldoService } from "src/app/services/saldo.service";
import { UsuarioService } from "src/app/services/usuario.service";
//* Modelos */
import { RegistroEntrada } from "src/app/models/RegistroEntrada";
import { RegistroSalida } from "src/app/models/RegistroSalida";
import { Description } from "src/app/models/description";
import { Proyecto } from "src/app/models/Proyecto";
import { Saldo } from "src/app/models/Saldo";
import { User } from "src/app/models/user";

@Component({
  selector: "app-informes",
  templateUrl: "./informes.page.html",
  styleUrls: ["./informes.page.scss"],
})
export class InformesPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private descriptionService: DescriptionService,
    private proyectoService: ProyectoService,
    private registroService: RegistroService,
    private registroSalidaService: RegistroSalidaService,
    private saldoService: SaldoService,
    private usuariosService: UsuarioService,
    private token: TokenStorageService,
    private menuController: MenuController,
    private toastController: ToastController,
    private config: PrimeNGConfig
  ) {}

  ngOnInit() {}
}
