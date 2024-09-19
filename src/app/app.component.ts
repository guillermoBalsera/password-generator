import {Component, OnInit} from '@angular/core';
import {GeneratorService} from "./services/generator.service";
import {ClipboardService} from "./services/clipboard/clipboard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public passwordLength: number = 10;
  public password: string = 'passwordGenerator';

  constructor(private generator: GeneratorService, protected clipboard: ClipboardService) { }

  public callGenerator(): void {
    this.password = this.generator.generate(this.passwordLength);
  }

  ngOnInit(): void {
    this.callGenerator()
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

}
