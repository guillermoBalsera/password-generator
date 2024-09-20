import {Injectable} from '@angular/core';
import {WordsService} from "./words/words.service";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private password: string = '';

  constructor(private words: WordsService) {
  }

  public async generate(length: number): Promise<string> {
    length = Math.max(0, Math.min(length, 1000));
    this.password = '';

    for (let i: number = 0; i < length; i++) {
      this.password += await this.getChar();
    }

    return this.password;
  }

  private async getChar(): Promise<string> {
    let type_index: number = Math.floor(Math.random() * 10);
    switch (type_index) {
      case 0 | 5 | 6:
        return this.getRandomNumber(10).toString();
      case 1 | 7 | 8:
        return this.getRandomLowercaseLetter();
      case 2 | 9:
        return this.getRandomUppercaseLetter();
      case 3:
        return this.getRandomSymbol();
      case 4:
        return await this.getRandomSpell();
      default:
        return '';
    }
  }

  private getRandomNumber(x: number): number {
    return Math.floor(Math.random() * x);
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

  private async getRandomSpell(): Promise<string> {
    try {
      const data: any = await this.words.getSpells().toPromise();
      let index: number = this.getRandomNumber(data.length);
      return data[index].name.replaceAll(' ', '_');
    } catch (error) {
      console.error('Error fetching spells:', error);
      return '';
    }
  }
}
