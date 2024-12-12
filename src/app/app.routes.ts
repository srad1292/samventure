import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: "home"},
    { path: 'home', 
      children: [
        { path: '', pathMatch: 'full', component: HomeComponent},
      ]
    },
    { path: '**', redirectTo: "home"}

];
