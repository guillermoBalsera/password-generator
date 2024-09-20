import {Component, OnInit} from '@angular/core';
import {GeneratorService} from "./services/generator.service";
import {ClipboardService} from "./services/clipboard/clipboard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public passwordLength: number = 50;
  public password: string = '';

  public charging: boolean = false;

  public btnText: string = 'Copiar';
  public copied: boolean = false;

  constructor(private generator: GeneratorService, protected clipboard: ClipboardService) {
  }

  public async callGenerator(): Promise<void> {
    this.charging = true;
    this.password = await this.generator.generate(this.passwordLength);
    this.charging = false;
  }

  ngOnInit(): void {
    this.callGenerator().then((): void => { });
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  public copyPassword(): void {
    this.clipboard.write(this.password);
    this.btnText = 'Copiado';
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
      this.btnText = 'Copiar';
    }, 1000);
  }

}
