// Angular
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder, FormControl } from "@angular/forms";
// Ionic
import { NavController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
// Services
import { AuthService } from "src/app/services/auth.service";
import { TokenStorageService } from "src/app/services/token-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  roles: string[];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private navCrtl: NavController,
    private toastController: ToastController,
    private storage: Storage,
    private tokenStorage: TokenStorageService
  ) {}

  onLoginSubmit() {
    this.auth.login(this.loginForm.value).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.loginToast(data);
        this.tokenStorage.getUser().then((val) => {
          this.roles = val;
        });
        this.storage.set("isLoggedIn", true);
        this.navCrtl.navigateForward("/menu/home");
      },
      (error) => this.loginErrorToast(error.error.message)
    );
    this.loginForm.reset();
  }

  async loginToast(data) {
    const toast = await this.toastController.create({
      message: `Bienvenido ${data.name}`,
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  async loginErrorToast(error) {
    const toast = await this.toastController.create({
      message: `${error}`,
      duration: 2000,
      color: "danger",
      position: "middle",
    });
    toast.present();
  }

  goToRegister() {
    this.navCrtl.navigateForward("/register");
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }
}
