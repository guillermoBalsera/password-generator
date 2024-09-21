import {Injectable} from '@angular/core';
import {WordsService} from "./words/words.service";
import {GettersService} from "./getters/getters.service";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private password: string = '';

  constructor(private getters: GettersService) {
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
      return this.getters.getRandomNumber(10).toString();
    } else if (type_index % 3 == 0) {
      return this.getters.getRandomLowercaseLetter();
    } else if (type_index % 5 == 0) {
      return this.getters.getRandomSymbol();
    } else if (type_index % 7 == 0) {
      switch (option) {
        case 'Magic':
          return await this.getters.getRandomSpell();
        case 'Cats':
          return await this.getters.getCat();
        case 'Bible':
          return await this.getters.getVerse();
        default:
          return this.getters.getGlitch();
      }
    } else {
      return this.getters.getRandomUppercaseLetter();
    }
  }
}


