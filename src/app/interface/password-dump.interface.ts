import { LineOfCode } from "./line-of-code.interface";

export interface PasswordDump {
    startingLine: number;
    code: LineOfCode[];
}