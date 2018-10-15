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
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  constructor(private usuarioService: UsuarioService) { }

  getUsuarios(): void {
    this.usuarioService.getConfig()
      .subscribe(usuarios => this.usuarioList = usuarios);
  }

  print() {
    this.usuarioArray = [];    

    this.usuarioArray.push([{text: 'Nome',margin: [15, 15, 0, 0],bold: true}]);
    this.usuarioList.forEach(element => {
      this.usuarioArray.push([{text: element.nome,margin: [10, 0, 0, 0]}])
    });

    pdfMake.tableLayouts = {
      exampleLayout: {
        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 0;
          }
          return (i === node.table.headerRows) ? 2 : 1;
        },
        vLineWidth: function (i) {
          return 0;
        },
        hLineColor: function (i) {
          return i === 1 ? 'black' : '#aaa';
        },
        paddingLeft: function (i) {
          return i === 0 ? 0 : 8;
        },
        paddingRight: function (i, node) {
          return (i === node.table.widths.length - 1) ? 0 : 8;
        }
      }
    };

    var dd = {
      header: {
        text: 'Lista de ramais',
        alignment: 'center',
        margin: [0, 15, 0, 20],
        fontSize: 18,
        bold: true
      },      
      footer: function(currentPage, pageCount) { 
        return {
          text: currentPage.toString() + ' de ' + pageCount,
          alignment: 'center',
          margin: [0, 15, 0, 0]
        }; 
      },
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['*'],

            body: this.usuarioArray
          }
        }
      ]
    };
    pdfMake.createPdf(dd).download();
  }
}
