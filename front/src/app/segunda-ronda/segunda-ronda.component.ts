import { Component } from '@angular/core';


@Component({
  selector: 'app-segunda-ronda',
  templateUrl: './segunda-ronda.component.html',
  styleUrls: ['./segunda-ronda.component.scss'],
  template: `<ng-katex [equation]="equation"></ng-katex>`
})
export class SegundaRondaComponent {

  formulaRespuesta: string = '';


  symbols: string[] = ['( )', '[ ]', '{ }', 'X', 'sin()', 'cos()', 'tan()', 'ln |x|', 'sec()', 'csc()', 'cot()', 'sinh()', 'cosh()', 'tanh()', 'e^x ', '√', 'arcsin()', 'arcos()', 'arctan()', 'arcsinh()','arcosh()','arcotanh()', 'arcsec()', 'arccsc()', 'arccot()', '÷'];

  onButtonClick(symbol: string) {

    this.formulaRespuesta += symbol;
  }


 /*  mathequations = ['H = \\ sum_ {i = 1} ^ {m} p_ {i} log_ {2} (p_ {i})']

  equation: string = '\\sum_{i=1}^nx_i';
 */
}
