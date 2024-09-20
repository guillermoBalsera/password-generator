import {Injectable} from '@angular/core';
import {WordsService} from "./words/words.service";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private password: string = '';

  private verse: string[] = [];
  private catFact: string[] = [];

  constructor(private words: WordsService) {
  }

  public async generate(length: number, option: string): Promise<string> {
    length = Math.max(0, Math.min(length, 1000));
    this.password = '';
    let char: string = '';
    for (let i: number = 0; i < length; i += char.length) {
      char = await this.getChar(option);
      if (char.length >= length - i) {
        char = char.slice(0, length - i);
      }
      this.password += char;
    }
    return this.password.trim().replaceAll(' ', '');
  }

  private async getChar(option: string): Promise<string> {
    let type_index: number = Math.floor(Math.random() * 100);
    if (type_index % 2 == 0) {
      return this.getRandomNumber(10).toString();
    } else if (type_index % 3 == 0) {
      return this.getRandomLowercaseLetter();
    } else if (type_index % 5 == 0) {
      return this.getRandomSymbol();
    } else if (type_index % 7 == 0) {
      switch (option) {
        case 'Magic':
          return await this.getRandomSpell();
        case 'Cats':
          return await this.getCat();
        case 'Bible':
          return await this.getVerse();
        default:
          return ['N0N3?', '*z3r0', '3mPt7!'][this.getRandomNumber(3)]
      }
    } else {
      return this.getRandomUppercaseLetter();
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
      let spell = data[index];
      if (index % 2 == 0 && spell.incantation != null) {
        return `!${spell.incantation.replaceAll(' ', '_')}!`
      }
      return `#${spell.name.replaceAll(' ', '_')}#`
    } catch (error) {
      console.error('Error fetching spells');
      return '#U_R_A_WIZARD#';
    }
  }

  private async getVerse(): Promise<string> {
    try {
      if (this.verse.length == 0) {
        const data: any = await this.words.getRandomVerse().toPromise();
        this.verse = data.text.split(" ");
      }
      return this.verse[this.getRandomNumber(this.verse.length)]
        .replaceAll(' ', '_').trim().toLowerCase();
    } catch (error) {
      console.info('No more bible requests');
      return '*JESUS*';
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
      console.info('No more cats requests (1)');
      return this.getCat2();
    }
  }

  private async getCat2(): Promise<string> {
    try {
      const data: any = await this.words.getCat2().toPromise();
      let index: number = this.getRandomNumber(data.length);
      return `_${data[index].text.split(' ')[0]}_${data[-1].text.split(' ')[0]}_`
    } catch (error) {
      console.info('No more cats requests (2)');
      return ['.I_Love_Cats.', '_PrRrRrRr_', 'Aegean', 'Bambino', 'Bombay', 'LaPerm', 'Pixie-bob'][this.getRandomNumber(7)]
    }
  }

}
