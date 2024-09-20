import {Injectable} from '@angular/core';
import {WordsService} from "./words/words.service";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private password: string = '';

  private verse: string[] = [];
  private catFact: string[] = [];

  constructor(private words: WordsService) { }

  public async generate(length: number): Promise<string> {
    length = Math.max(0, Math.min(length, 1000));
    this.password = '';
    let char: string = '';
    for (let i: number = 0; i < length; i += char.length) {
      char = await this.getChar();
      if (char.length >= length - i) {
        char = char.slice(0, length - i);
      }
      this.password += char;
    }
    console.log(`Generated password: ${this.password}`)
    return this.password;
  }

  private async getChar(): Promise<string> {
    let type_index: number = Math.floor(Math.random() * 22);
    switch (type_index) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        return this.getRandomNumber(33).toString();
      case 12:
      case 13:
      case 14:
      case 15:
        return this.getRandomLowercaseLetter();
      case 16:
      case 17:
        return this.getRandomUppercaseLetter();
      case 18:
        return this.getRandomSymbol();
      case 19:
        return await this.getRandomSpell();
      case 20:
        return await this.getVerse();
      case 21:
        return await this.getCat();
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
      return data[index].name.replaceAll(' ', this.getRandomSymbol());
    } catch (error) {
      console.error('Error fetching spells:', error);
      return '';
    }
  }

  private async getVerse(): Promise<string> {
    try {
      if (this.verse.length == 0) {
        const data: any = await this.words.getRandomVerse().toPromise();
        this.verse = data.text.split(" ");
      }
      return this.verse[this.getRandomNumber(this.verse.length)]
        .toLowerCase()
        .replaceAll('a', 'AcDc')
        .replaceAll('e', '3m1N3m')
        .replaceAll('i', 'K1ss')
        .replaceAll('o', '00h')
        .replaceAll('u', 'U2')
    } catch (error) {
      console.info('No more bible requests');
      return '';
    }
  }

  private async getCat(): Promise<string> {
    try {
      if (this.catFact.length == 0) {
        const data: any = await this.words.getCat().toPromise();
        this.catFact = data.text.split(" ");
      }
      console.log(this.catFact)
      return this.catFact[this.getRandomNumber(this.verse.length)]
        .toLowerCase()
    } catch (error) {
      return this.getCat2();
    }
  }

  private async getCat2(): Promise<string> {
    try {
      const data: any = await this.words.getCat2().toPromise();
      let index: number = this.getRandomNumber(data.length);
      return data[index].text.split(' ')[0];
    } catch (error) {
      console.info('No more cats requests');
      return '';
    }
  }

}
