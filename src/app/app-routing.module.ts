import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
