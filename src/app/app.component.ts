import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Usuario } from './Usuario';
import { UsuarioService } from './componemt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'app works!';
  usuarioList: Usuario[];
  usuarioArray: any[];

  ngOnInit() {
    this.getUsuarios();
  }

  constructor(private usuarioService: UsuarioService) { }

  getUsuarios(): void {
    this.usuarioService.getConfig()
      .subscribe(usuarios => this.usuarioList = usuarios);
  }

  print() {
    this.usuarioArray = [];
    this.getUsuarios();
    console.log(this.usuarioList);

    this.usuarioList.forEach(element => {
      this.usuarioArray.push(element.nome)
    });

    console.log(this.usuarioArray);
    //called first time before the ngOnInit()
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    var dd = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              this.usuarioArray,
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(dd).download();
  }

}
