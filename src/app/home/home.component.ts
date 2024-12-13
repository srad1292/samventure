import { Component, HostListener } from '@angular/core';
import { DisplayService } from '../service/display.service';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isActive = false;
  stateWelcome = true;
  stateTerminal = false;
  currentTime: string = this.dateTo12Hr();
  private destroy$: Subject<void> = new Subject();

  constructor(private displayService: DisplayService) {}

  ngOnInit() {
    this.displayService.setBackgroundColor('plum');
    this.displayService.setBackgroundGradient(this.displayService.defaultGradient);
    this.setupClock();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onButtonClick(event: Event) {
    event.stopPropagation();
    this.isActive = true;
    this.showTerminal();
    this.isActive = false;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isActive = false;
  }

  private showTerminal(): void {
    this.stateWelcome = false;
    this.stateTerminal = true;
    this.currentTime = this.dateTo24Hr();
    this.displayService.setBackgroundColor('#1f2124');
  }

  private setupClock(): void {
    interval(1000)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.currentTime = this.stateWelcome ? this.dateTo12Hr() : this.dateTo24Hr();
    });
  }

  private dateTo12Hr(): string {
    const now = new Date();
    // 0-11=am 12-23=pm
    let hours = now.getHours();
    let amOrPm = now.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours >= 12 ? hours - 12 : hours;
    return `${hours.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${amOrPm}`;
  }

  private dateTo24Hr(): string {
    const now = new Date();
    let hours = now.getHours();
    hours = hours >= 12 ? hours - 12 : hours;
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  }



}
