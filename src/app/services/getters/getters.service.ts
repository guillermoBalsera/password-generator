import {Injectable} from '@angular/core';
import {WordsService} from "../words/words.service";

@Injectable({
  providedIn: 'root'
})
export class GettersService {

  private verse: string[] = [];
  private catFact: string[] = [];

  constructor(private words: WordsService) {
  }

  public getRandomNumber(x: number): number {
    return Math.floor(Math.random() * x);
  }

  public getRandomLowercaseLetter(): string {
    const charCode: number = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(charCode);
  }

  public getRandomUppercaseLetter(): string {
    const charCode: number = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(charCode);
  }

  public getRandomSymbol(): string {
    const symbols: string[] = ['?', '!', '@', '#', ',', ';', '.', ':', '-', '_', '*', '%', '&', '/', '(', ')', '='];
    const randomIndex: number = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  }

  public async getRandomSpell(): Promise<string> {
    try {
      const data: any = await this.words.getSpells().toPromise();
      let index: number = this.getRandomNumber(data.length);
      let spell = data[index];
      if (index % 2 == 0 && spell.incantation != null) {
        return `!${spell.incantation.replaceAll(' ', '_')}!`
      }
      return `#${spell.name.replaceAll(' ', '_')}#`
    } catch (error) {
      console.warn('Error fetching spells');
      return '#U_R_A_WIZARD_HARRY#';
    }
  }

  public async getVerse(): Promise<string> {
    try {
      if (this.verse.length == 0) {
        const data: any = await this.words.getRandomVerse().toPromise();
        this.verse = data.text.split(" ");
      }
      return this.verse[this.getRandomNumber(this.verse.length)]
        .replaceAll(' ', '_').trim().toLowerCase();
    } catch (error) {
      console.warn('No more bible requests');
      return '*JESUS*';
    }
  }

  public async getCat(): Promise<string> {
    try {
      if (this.catFact.length == 0) {
        const data: any = await this.words.getCat().toPromise();
        this.catFact = data.text.split(" ");
      }
      console.log(this.catFact)
      return this.catFact[this.getRandomNumber(this.verse.length)]
        .toLowerCase()
    } catch (error) {
      console.warn('No more cats requests (1)');
      return this.getCat2();
    }
  }

  public async getCat2(): Promise<string> {
    try {
      const data: any = await this.words.getCat2().toPromise();
      let index: number = this.getRandomNumber(data.length);
      return `_${data[index].text.split(' ')[0]}_${data[-1].text.split(' ')[0]}_`
    } catch (error) {
      console.warn('No more cats requests (2)');
      return this.getCatPhrase();
    }
  }

  public getGlitch(): string {
    let glitches: string[] = [
      'N0N3?', '*z3r0', '3mPt7!', 'N1ghT$h4d3', 'V01d_L0rD', 'InfiN1Te?', 'Sh4d0wF4ll', 'G1T_ReKt!',
      '5p4rkl3$', 'Cr4ck3D!', '0M3nZ', 'L1f3!L3$$', 'Ph4nt0mZ0n3', 'R3mN4nt$', 'Cyb3rGh0$t',
      'Fr0z3n!Fl4m3', 'D3c0d3r!', 'Gl!tch_M4st3r', 'H4cKTh3W0rLd', 'M3ltD0wn?'
    ]
    let index: number = this.getRandomNumber(glitches.length);
    return glitches[index];
  }

  private getCatPhrase(): string {
    let catPhrases: string[] = [
      'WhiskersOn!', 'Fluff_Ball', 'PurrMachine', 'TailTwitch', 'ClawsOut', 'CatNap', 'FurMissile',
      'NyaN!Nyan', 'MeowLord', 'TinyTiger', 'HappyPaws', 'SneakerCar', 'CatZilla!',
      'SoftPawz', 'MidNightPurr', 'LazyWhiskers', 'FelineQueen', 'FatCats', 'SharpClaws'
    ];
    let index: number = this.getRandomNumber(catPhrases.length);
    return catPhrases[index];

  }

}
