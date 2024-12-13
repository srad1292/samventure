import { Component, HostListener } from '@angular/core';
import { DisplayService } from '../service/display.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isActive = false;
  stateWelcome = true;
  stateTerminal = false;

  constructor(private displayService: DisplayService) {}

  ngOnInit() {
    this.displayService.setBackgroundColor('plum');
  }

  onButtonClick(event: Event) {
    event.stopPropagation();
    this.isActive = true;
    this.showTerminal();
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isActive = false;
  }

  private showTerminal(): void {
    this.stateWelcome = false;
    this.stateTerminal = true;
    this.displayService.setBackgroundColor('azure');
  }



}
