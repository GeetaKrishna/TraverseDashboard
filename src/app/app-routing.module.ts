import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { HealthKnowledgeBaseComponent } from './health-knowledge-base/health-knowledge-base.component';
import { HealthKnowledgeContentComponent } from './health-knowledge-content/health-knowledge-content.component';
import { MyHeartComponent } from './my-heart/my-heart.component';
import { InsuranceComponent } from './insurance/insurance.component';

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
      { path: 'myHeart', component: MyHeartComponent },
      { path: 'medication', component: MedicationsComponent },
      { path: 'insurance', component: InsuranceComponent },
      {
        path: 'healthKnowledgeBase', component: HealthKnowledgeBaseComponent,
        children: [
          {
           path:'healthKnowledgeContent', component: HealthKnowledgeContentComponent
          }
        ]
      },
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
