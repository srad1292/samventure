import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DisplayService {

    private bgColorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('defaultColor');
    public bgColorObs: Observable<string> = this.bgColorSubject.asObservable();
    
    constructor() {}

    setBackgroundColor(color: string): void {
        this.bgColorSubject.next(color);
    }
}
