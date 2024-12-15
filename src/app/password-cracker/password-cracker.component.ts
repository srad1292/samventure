import { Component } from '@angular/core';
import { LineOfCode } from '../interface/line-of-code.interface';

@Component({
  selector: 'app-password-cracker',
  templateUrl: './password-cracker.component.html',
  styleUrl: './password-cracker.component.scss'
})
export class PasswordCrackerComponent {

  minEightDigit: number = 268435456;
  maxEightDigit: number = 4294967295;

  startingBase10: number = 0;

  commands: string[] = ['ADD', 'MULT', 'SUB', 'EXP', 'GOTO', 'COND', 'SET', 'RET', 'END'];
  containers: string[] = ['%EAX', '%EBP', '%ESP', '%EDP'];
  codeDump: LineOfCode[] = [];

  ngOnInit() {
    let lengthOfCode = 82;
    this.generateStartingLine(lengthOfCode);
    this.createFakeCode(82);
  }

  public toggleDebug(line: LineOfCode) {
    line.debugging = !line.debugging;
  }

  generateStartingLine(numLinesOfCode: number) {
    this.startingBase10 = this.getRandomNumber(this.minEightDigit+800, this.maxEightDigit-numLinesOfCode-800);
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  convertBase10ToBase16(number: number) {
    return number.toString(16);
  }

  createFakeCode(numLinesOfCode: number) {
    let code = [];
    let command = '';
    let container1 = '';
    let container2 = '';
    let line = this.startingBase10;
    for(let x = 0; x<numLinesOfCode; x++) {
      command = this.commands[this.getRandomNumber(0, this.commands.length-1)].padEnd(5, '\u00A0'); // Use non-breaking space for rendering
      container1 = this.containers[this.getRandomNumber(0, this.containers.length-1)].padEnd(5, '\u00A0');;
      container2 = this.containers[this.getRandomNumber(0, this.containers.length-1)].padEnd(5, '\u00A0');;
      code.push(`0x${this.convertBase10ToBase16(line+x)}: ${command} ${container1} ${container2}`)
    }

    console.log(code[0]);

    this.codeDump = code.map((c) => { return {debugging: false, code: c}; });
  }
  

  
}
