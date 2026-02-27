import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Header } from "../../shared/ui/header/header";
import { Footer } from "../../shared/ui/footer/footer";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}
