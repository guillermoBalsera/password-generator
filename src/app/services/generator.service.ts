import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private password: string = '';

  constructor() {
  }

  protected generate(length: number): string {
    for (let i: number = 0; i < length; i++) {
      this.password += this.getChar();
    }
    return this.password;
  }

  private getChar(): any {
    let type_index: number = Math.floor(Math.random() * 3);
    switch (type_index) {
      case 0:
        return this.getRandomNumber();
      case 1:
        return this.getRandomLowercaseLetter();
      case 2:
        return this.getRandomUppercaseLetter();
      case 3:
        return this.getRandomSymbol();
    }
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 10);
  }

  private getRandomLowercaseLetter(): string {
    const charCode: number = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(charCode);
  }

  private getRandomUppercaseLetter(): string {
    const charCode: number = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(charCode);
  }

  private getRandomSymbol(): string {
    const symbols: string[] = ['?', '!', '@', '#', ',', ';', '.', ':', '-', '_', '*', '%', '&', '/', '(', ')', '='];
    const randomIndex: number = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  }

}
