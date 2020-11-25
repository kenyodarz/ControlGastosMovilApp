//* Angular */
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators, FormBuilder } from "@angular/forms";
/** Ionic */
import { ToastController } from "@ionic/angular";
/** PrimeNG */
import { PrimeNGConfig } from "primeng/api";
//* Servicios */
import { TokenStorageService } from "src/app/services/token-storage.service";
import { DescriptionService } from "src/app/services/description.service";
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
  selector: "app-gastos",
  templateUrl: "./gastos.page.html",
  styleUrls: ["./gastos.page.scss"],
})
export class GastosPage implements OnInit {
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
  usuarios: User[];
  selectedUsuario: User;
  descriptions: Description[];
  selectedDescription: Description;
  proyectos: Proyecto[];
  selectedProyecto: Proyecto = {
    idProyecto: null,
    nombre: null,
  };
  registrosSalida: RegistroSalida[] = [];
  registroSalida: RegistroSalida = {
    idRegistroSalida: null,
    cantidad: null,
    description: null,
    fecha: null,
    observaciones: null,
    tipo: null,
    users: null,
    informe: null,
  };
  selectedRegistroSalida: RegistroSalida;
  registrosEntrada: RegistroEntrada[] = [];
  saldos: Saldo[] = [];
  selectedSaldo: Saldo[] = [];
  cols: any[];
  form: any = {};
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = "";
  displaySaveEditDialog: boolean = false;
  total: number = 0;
  formRegistroSalida: FormGroup;
  showAdminBoard = false;
  showActions = false;
  hablilitarBotonCerrar = false;
  cerrarTodosRegistros: boolean;

  constructor(
    private fb: FormBuilder,
    private descriptionService: DescriptionService,
    private registroService: RegistroService,
    private registroSalidaService: RegistroSalidaService,
    private saldoService: SaldoService,
    private usuariosService: UsuarioService,
    private token: TokenStorageService,
    private toastController: ToastController,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.formRegistroSalida = this.fb.group({
      idRegistroSalida: new FormControl(),
      observaciones: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      cantidad: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
      ]),
      users: new FormControl(),
    });
    this.config.setTranslation({
      dayNames: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
      ],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ],
      monthNamesShort: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
      ],
      today: "Hoy",
      clear: "Borrar",
    });
  }

  async ionViewDidEnter(): Promise<void> {
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      await this.obtenerUsuario();
    }
    if (this.showAdminBoard) {
      this.selectedUsuario = this.currentUser;
      this.registrosEntrada = null;
      this.obtenerUsuarios();
      this.currentUser = null;
    }
    this.obtenerDescripciones();
    this.obtenerRegistrosEntrada();
    this.obtenerSaldos();
    this.obtenerRegistrosSalid();

    this.cols = [
      { field: "fecha", header: "Fecha" },
      { field: "description", subfield: "nombre", header: "Descripcion" },
      { field: "observaciones", header: "Observaciones" },
      { field: "cantidad", header: "Cantidad" },
    ];
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

  obtenerUsuarios(): void {
    if (this.showAdminBoard) {
      this.usuariosService.getAll().subscribe(
        (result: any) => {
          let users: User[] = [];
          for (let index = 0; index < result.length; index++) {
            let user = result[index] as User;
            users.push(user);
          }
          this.usuarios = users;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  obtenerDescripciones(): void {
    this.descriptionService.getAll().subscribe((result: any) => {
      let descriptions: Description[] = [];
      for (let index = 0; index < result.length; index++) {
        let description = result[index] as Description;
        if (description.tipoDescripcion == "GASTO") {
          descriptions.push(description);
        }
      }
      this.descriptions = descriptions.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // Cuando a y b Son iguales
        return 0;
      });
    });
  }

  obtenerRegistrosEntrada(): void {
    this.registroService.getAll().subscribe(
      (result: any) => {
        let registrosEntradas: RegistroEntrada[] = [];
        for (let index = 0; index < result.length; index++) {
          let registroEntrada = result[index] as RegistroEntrada;
          if (this.showAdminBoard) {
            if (this.currentUser.username == registroEntrada.users.username) {
              if (registroEntrada.informe === null) {
                registrosEntradas.push(registroEntrada);
              }
            }
          } else {
            if (this.currentUser.username == registroEntrada.users.username) {
              if (registroEntrada.informe === null) {
                registrosEntradas.push(registroEntrada);
              }
            }
          }
        }
        this.registrosEntrada = registrosEntradas.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
            return -1;
          }
          // Si a y b son iguales
          return 0;
        });
        this.sumTotal();
      },
      (error) => {
        console.log(error);
      }
    );
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
            if (this.currentUser) {
              if (this.currentUser.username === registroSalida.users.username) {
                if (registroSalida.informe === null) {
                  registrosSalidas.push(registroSalida);
                }
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
        this.sumTotal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerSaldos() {
    this.saldoService.getAll().subscribe((result: any) => {
      let saldos: Saldo[] = [];
      for (let index = 0; index < result.length; index++) {
        let saldo = result[index] as Saldo;
        if (true) {
          saldos.push(saldo);
        }
      }
      this.saldos = saldos.sort(function (a, b) {
        if (a.fecha > b.fecha) {
          return 1;
        }
        if (a.fecha < b.fecha) {
          return 0;
        }
        // Cuando Son Iguales Retornamos 0
        return 0;
      });
    });
  }

  sumTotal() {
    this.total = 0;
    let debito: number = 0;
    let credito: number = 0;
    if (this.registrosEntrada) {
      this.registrosEntrada.forEach((e) => {
        debito += e.cantidad;
      });
    }
    if (this.selectedSaldo) {
      this.selectedSaldo.forEach((e) => {
        debito += e.cantidad;
      });
    }
    if (this.registrosSalida) {
      this.registrosSalida.forEach((e) => {
        credito += e.cantidad;
      });
    }
    this.total = debito - credito;
    if (this.registrosEntrada) {
      if (this.registrosEntrada.length > 0) {
        this.showActions = true;
      }
    }
  }
  cargarValores() {
    this.cerrarTodosRegistros = false;
    this.obtenerRegistrosSalid();
    this.obtenerRegistrosEntrada();
    this.saldoxRegistros();
    this.formRegistroSalida.reset();
  }

  saldoxRegistros() {
    this.selectedSaldo = [];
    if (this.saldos.length != 0) {
      this.saldos.forEach((e) => {
        if (e.users == this.currentUser.username) {
          this.selectedSaldo.push(e);
        }
      });
    }
  }

  onSubmit() {
    this.formRegistroSalida.patchValue({
      // registroEntrada: this.selectedRegistroEntrada,
    });
    this.formRegistroSalida.patchValue({
      proyecto: this.selectedProyecto,
    });
    this.formRegistroSalida.patchValue({
      users: this.currentUser,
    });
    this.registroSalida = this.formRegistroSalida.value;
    if (this.selectedRegistroSalida) {
      let a =
        this.selectedRegistroSalida.cantidad - this.registroSalida.cantidad;
      if (this.total + a < 0) {
        this.toastError(
          `Se excede la cantidad disponible por + ${this.total + a}`
        );
        this.formRegistroSalida.reset();
        this.selectedRegistroSalida = null;
        return;
      }
      this.guardarRegistroSalida();
      this.selectedRegistroSalida = null;
    } else {
      if (this.total >= this.formRegistroSalida.value.cantidad) {
        this.guardarRegistroSalida();
      } else {
        this.toastError("El gasto ingresado excede el dinero disponible");
      }
    }
    this.sumTotal();
  }

  guardarRegistroSalida(): void {
    this.registroSalidaService
      .save(this.registroSalida)
      .subscribe((result: any) => {
        let registroSalida = result as RegistroSalida;
        this.validarRegistroSalida(registroSalida);
        this.toastSuccess("Se guardo el registro correctamente");
        this.displaySaveEditDialog = false;
      });
    (error) => {
      console.log(error);
      this.toastError("Se genero un error al guardar el Registro");
    };
    this.formRegistroSalida.reset();
  }

  validarRegistroSalida(registroSalida: RegistroSalida) {
    let index = this.registrosSalida.findIndex(
      (e) => e.idRegistroSalida == registroSalida.idRegistroSalida
    );
    if (index != -1) {
      this.registrosSalida[index] = registroSalida;
    } else {
      this.registrosSalida.push(registroSalida);
    }
    this.obtenerRegistrosSalid();
  }

  guardarSaldo(s: Saldo, stado: string) {
    this.saldoService.save(s).subscribe(
      (result: any) => {
        let saldo = result as Saldo;
        this.toastSuccess(
          `"Se ha ${stado} el saldo: ${saldo.observaciones}correctamente`
        );
        // this.visibleSidebarSaldo = false;
      },
      (error) => {
        console.log(error);
        this.toastError(`Se ha Producido el siguiente Error: ${error}`);
      }
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

  onUserChange() {
    this.currentUser = this.selectedUsuario;
    this.showActions = false;
    this.total = 0;
    this.hablilitarBotonCerrar = false;
    this.selectedProyecto = null;
    this.registrosEntrada = null;
    this.obtenerDescripciones();
    this.obtenerRegistrosEntrada();
    this.obtenerSaldos();
  }
}
