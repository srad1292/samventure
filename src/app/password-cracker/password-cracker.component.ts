import { Component } from '@angular/core';
import { LineOfCode } from '../interface/line-of-code.interface';
import { PasswordGameService } from '../service/password-game.service';
import { PasswordDump } from '../interface/password-dump.interface';

@Component({
  selector: 'app-password-cracker',
  templateUrl: './password-cracker.component.html',
  styleUrl: './password-cracker.component.scss'
})
export class PasswordCrackerComponent {

  minEightDigit: number = 268435456;
  maxEightDigit: number = 4294967295;

  startingBase10: number = 0;
  currentLineNumber: number = 0;


  commands: string[] = ['ADD', 'MULT', 'SUB', 'EXP', 'GOTO', 'COND', 'SET', 'RET', 'END'];
  containers: string[] = ['%EAX', '%EBP', '%ESP', '%EDP'];
  codeDump: LineOfCode[] = [];

  registers: any = {
    '%eax': 0,
    '%ebx': 0,
    '%ecx': 0,
    '%edx': 0,
    '%esp': 0,
  };

  nbsp: string = '\u00A0';

  constructor(private _passwordGameService: PasswordGameService) {}

  ngOnInit() {
    let passwordDump: PasswordDump = this._passwordGameService.getTestGame();
    this.codeDump = passwordDump.code;
    this.registers['%esp'] = this.codeDump[0].code.replace(/( |\u00A0)+/g, ' ').split(' ')[0];
  }

  public toggleDebug(line: LineOfCode) {
    line.debugging = !line.debugging;
  }

  public runLine(): void {
    //[lineNumber, instruction, ...args]
    let parts = this.codeDump[this.currentLineNumber].code.replace(/( |\u00A0)+/g, ' ').split(' ');
    let instruction = parts[1];
    switch(instruction) {
      case 'SET':
        this.performSet(parts);
        break;
      case 'GOTO':
        this.performGoto(parts);
        break;
      case 'ADD':
        this.performAdd(parts);
        break;
      case 'MULT':
        this.performMult(parts);
        break;
      case 'END':
        this.performEnd();
        break;
      default:
        console.log(`INSTRUCTION ${instruction} NOT IMPLEMENTED`);
        break;
    }
    
  }

  private finishStep(destination: number): void {
    this.currentLineNumber = destination;
    this.registers['%esp'] = this.codeDump[this.currentLineNumber].code.split(this.nbsp)[0];
  }

  private performSet(parts: string[]): void {
    if(parts[2].startsWith('%')) {
      this.registers[parts[3]] = this.registers[parts[2]]; 
    } else {
      this.registers[parts[3]] = parseInt(parts[2]);
    }
    this.finishStep(this.currentLineNumber + 1);
  }

  private performGoto(parts: string[]): void {
    this.finishStep(this.codeDump[this.currentLineNumber].offset);
  }

  private performAdd(parts: string[]): void {
    if(parts[2].startsWith('%')) {
      this.registers[parts[3]] = this.registers[parts[3]] + this.registers[parts[2]]; 
    } else {
      this.registers[parts[3]] = this.registers[parts[3]] + parseInt(parts[2]);
    }
    this.finishStep(this.currentLineNumber + 1);
  }

  private performMult(parts: string[]): void {
    if(parts[2].startsWith('%')) {
      this.registers[parts[3]] = this.registers[parts[3]] * this.registers[parts[2]]; 
    } else {
      this.registers[parts[3]] = this.registers[parts[3]] * parseInt(parts[2]);
    }
    this.finishStep(this.currentLineNumber + 1);
  }

  private performEnd(): void {

  }


  

  
  

  
}
