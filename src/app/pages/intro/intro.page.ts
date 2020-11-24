import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.page.html",
  styleUrls: ["./intro.page.scss"],
})
export class IntroPage implements OnInit {
  slideOpts = {
    initalSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400,
  };
  slides = [];

  constructor(private router: Router, private storage: Storage) {}

  finish() {
    this.storage.set("isIntroShowed", true);
    this.router.navigate(["menu/home"]);
  }

  ngOnInit() {
    this.slides = [
      {
        title: "Control de Gastos Viaje",
        subTitle: "EN CUALQUIER LUGAR",
        description: "Registra los ingresos y egresos de los viajes realizados",
        icon: "airplane",
        imageSrc: "assets/img/logo.png",
        imageAlt: "Logo",
      },
      {
        title: "Control total",
        subTitle: "DE LOS CENTROS DE COSTOS",
        description:
          "Ingresas los ingresos y egresos al contrato que estas ejerciendo",
        icon: "paper-plane",
        imageSrc: "assets/img/logo.png",
        imageAlt: "Logo",
      },
      {
        title: "Visibilidad Web",
        subTitle: "TOTALMENTE COMPATIBLE CON EL MODULO WEB",
        description:
          "Podras tener el control de gastos en movil y en web.\n Ten reportes y acceso a lo que necesites, con esta app totalmente integrada",
        icon: "globe",
        imageSrc: "assets/img/logo.png",
        imageAlt: "Logo",
      },
    ];
  }
}
