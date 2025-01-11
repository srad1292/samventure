import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PasswordDump } from "../interface/password-dump.interface";
import { LineOfCode } from "../interface/line-of-code.interface";

@Injectable({
    providedIn: 'root'
})
export class PasswordGameService {

    minEightDigit: number = 268435456;
    maxEightDigit: number = 4294967295;
    nbsp: string = '\u00A0';

    constructor() {}

    public getTestGame(): PasswordDump {
        let instructionSet = this._getTestGameOne();
        let startingLine = this._generateStartingLine(instructionSet.length);
        let line = 0;
        let code: LineOfCode[] = instructionSet.map((instruction: string) => {
            let offset: number = 0;
            instruction = `0x${this.convertBase10ToBase16(startingLine+line)} ${instruction}`;
            let parsed: string = instruction.replace(
                /\[(\d+)\]/, 
                (match, p1) => { 
                    offset = parseInt(p1); 
                    return `0x${this.convertBase10ToBase16(startingLine + offset)}`; 
                }
            )
            .split(' ')
            .map((part, index) => part.padEnd(index === 0 ? 15 : index === 1 ? 8 : 5, '\u00A0'))
            .join('');
            //.replace(/ /g, this.nbsp);


            line++;
            return {
                debugging: false,
                code: parsed,
                offset,
            }
        });

        return {
            code,
            startingLine
        }

    }

    private _generateStartingLine(numLinesOfCode: number): number {
        return this._getRandomNumber(this.minEightDigit+800, this.maxEightDigit-numLinesOfCode-800);
    }

    private _getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public convertBase10ToBase16(number: number) {
        return number.toString(16);
    }

    private _getTestGameOne(): string[] {
        return [
            "SET 0x14 %eax <tst_func_lng_name>",
            "SET 0x1e %edx",
            "GOTO [6]",
            "MULT %eax %eax",
            "SET %eax %edx",
            "END",
            "ADD %edx %eax",
            "GOTO [3]"

        ]
    }




    // generateStartingLine(numLinesOfCode: number) {
    //   this.startingBase10 = this.getRandomNumber(this.minEightDigit+800, this.maxEightDigit-numLinesOfCode-800);
    // }

    // getRandomNumber(min: number, max: number): number {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // convertBase10ToBase16(number: number) {
    //   return number.toString(16);
    // }

    // createFakeCode(numLinesOfCode: number) {
    //   let code = [];
    //   let command = '';
    //   let container1 = '';
    //   let container2 = '';
    //   let line = this.startingBase10;
    //   for(let x = 0; x<numLinesOfCode; x++) {
    //     command = this.commands[this.getRandomNumber(0, this.commands.length-1)].padEnd(5, '\u00A0'); // Use non-breaking space for rendering
    //     container1 = this.containers[this.getRandomNumber(0, this.containers.length-1)].padEnd(5, '\u00A0');
    //     container2 = this.containers[this.getRandomNumber(0, this.containers.length-1)].padEnd(5, '\u00A0');
    //     code.push(`0x${this.convertBase10ToBase16(line+x)}: ${command} ${container1} ${container2}`)
    //   }

    //   console.log(code[0]);

    //   this.codeDump = code.map((c) => { return {debugging: false, code: c}; });
    // }
}
