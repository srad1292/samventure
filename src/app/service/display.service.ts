import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DisplayService {

    private bgColorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('white');
    public bgColorObs: Observable<string> = this.bgColorSubject.asObservable();
    
    public defaultGradient: string = 'linear-gradient(to bottom right, pink, lightblue)';
    private bgGradientSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultGradient);
    public bgGradientOb: Observable<string> = this.bgGradientSubject.asObservable();


    constructor() {}

    setBackgroundColor(color: string): void {
        this.bgColorSubject.next(color);
    }

    setBackgroundGradient(gradient: string): void {
        this.bgGradientSubject.next(gradient);
    }
}
