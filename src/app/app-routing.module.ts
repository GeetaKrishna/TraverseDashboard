import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MobileFitnessComponent } from './mobile-fitness/mobile-fitness.component';
import { TestComponent } from './test/test.component';
import { MedicationsComponent } from './medications/medications.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'signUp', component: RegisterComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'landing', component: LandingPageComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'medication', component: MedicationsComponent },
      {
        path: 'fitnessTracker', component: MobileFitnessComponent,
        children: [
          { path: 'fitbit', component: TestComponent }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'admin/landing' }
  // { path: '/:id', component: CustomerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
