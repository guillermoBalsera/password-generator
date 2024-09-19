import { Component } from '@angular/core';
import {GeneratorService} from "./services/generator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public password: string = 'passwordGenerator';

  constructor(private generator: GeneratorService) {
  }

  public callGenerator(): void {

  }

}
