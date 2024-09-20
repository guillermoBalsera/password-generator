import {Component, OnInit, HostListener } from '@angular/core';
import {GeneratorService} from "./services/generator.service";
import {ClipboardService} from "./services/clipboard/clipboard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public passwordLength: number = 100;
  public password: string = '';

  public charging: boolean = false;
  public option: string = 'Generic';

  public btnText: string = 'Copy';
  public copied: boolean = false;

  public menuOpen: boolean = false;
  public active: string = 'background-color: #4F46E5; color: #ffffff;';

  constructor(private generator: GeneratorService, protected clipboard: ClipboardService) {}

  public async callGenerator(): Promise<void> {
    this.charging = true;
    this.password = await this.generator.generate(this.passwordLength, this.option);
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
    this.btnText = 'Copied';
    this.copied = true;
    setTimeout((): void => {
      this.copied = false;
      this.btnText = 'Copy';
    }, 1000);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    const menuButton: HTMLElement | null = document.getElementById('menu-button');
    if (menuButton && !menuButton.contains(target)) {
      this.menuOpen = false;
    }
  }

}
