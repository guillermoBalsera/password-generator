import { Injectable } from '@angular/core';

declare let navigator: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  write(text: any): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then((): void => {
          console.log(`Text written/copied to the clipboard successfully: ${text}`);
        })
        .catch((err: any): void => {
          console.error('Oops, could not write/copy to the clipboard: ', err);
        });
    } else if (window.clipboardData) {
      window.clipboardData.setData("Text", text);
      console.log(`Text written/copied to the clipboard: ${text}`);
    }
  }

}
