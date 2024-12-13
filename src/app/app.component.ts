import { Component, OnInit, Renderer2 } from '@angular/core';
import { DisplayService } from './service/display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'samventure';
  bgColor: string = 'plum'; // Default background color
  gradient: string = this.displayService.defaultGradient;

  constructor(private renderer: Renderer2, private displayService: DisplayService) {}

  ngOnInit(): void {
    this.displayService.bgColorObs.subscribe(color => {
      this.bgColor = color;
      this.updateBodyBackgroundColor(color);
    });

    this.displayService.bgGradientOb.subscribe(gradient => {
      this.gradient = gradient;
      this.renderer.setStyle(document.body, 'backgroundImage', gradient);
    });
  }

  updateBodyBackgroundColor(color: string): void {
    this.renderer.setStyle(document.body, 'backgroundColor', color);
    this.renderer.removeStyle(document.body, 'backgroundImage');
  }
}
