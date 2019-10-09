import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MedicationsComponent } from './medications/medications.component';

const routes: Routes = [
 
  {path:'', component: LoginComponent },
  {path:'signUp', component: RegisterComponent },
  {path:'landing', component: LandingPageComponent },
  {path:'home', component: HomeComponent },
  {path:'dashboard', component: DashboardComponent },
  {path:'calendar', component: CalendarComponent },
  {path:'medication', component: MedicationsComponent },

  // { path: '/:id', component: CustomerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
