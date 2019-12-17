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
import { HealthConnectComponent } from './health-connect/health-connect.component';
import { HealthConnectChatComponent } from './health-connect-chat/health-connect-chat.component';
import { DocumentComponent } from './document/document.component';
import { ElectronicHealthComponent } from './electronic-health/electronic-health.component';
import { MedicalConditionComponent } from './medical-condition/medical-condition.component';
import { FamilyComponent } from './family/family.component';
import { FourCComponent } from './four-c/four-c.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ElectronicHealthTypeComponent } from './electronic-health-type/electronic-health-type.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientBillingComponent } from './patient-billing/patient-billing.component';
import { TelemedicineComponent } from './telemedicine/telemedicine.component';
import { EmergencyRoomComponent } from './emergency-room/emergency-room.component';
import { LabReportsComponent } from './lab-reports/lab-reports.component';
import { LabReportTypeComponent } from './lab-report-type/lab-report-type.component';
import { InsuranceProvComponent } from './insurance-prov/insurance-prov.component';
import { RecordsProviderComponent } from './records-provider/records-provider.component';
import { RecordsProvTypeComponent } from './records-prov-type/records-prov-type.component';
import { MedsComponent } from './meds/meds.component';

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
      { path: 'meds', component: MedsComponent },
      { path: 'insurance', component: InsuranceComponent },
      {
        path: 'document', component: DocumentComponent,
        children: [
          { path: ':id', component: DocumentTypeComponent }
        ]
      },
      {
        path: 'electronicHealth', component: ElectronicHealthComponent,
        children: [
          { path: ':id', component: ElectronicHealthTypeComponent }
        ]
      },
      { path: 'medicalCondition', component: MedicalConditionComponent },
      {
        path: 'healthconnect', component: HealthConnectComponent,
        children: [
          {
            path: 'healthconnectchat', component: HealthConnectChatComponent
          }
        ]
      },
      { path: 'family', component: FamilyComponent },
      { path: 'fourC', component: FourCComponent },
      {
        path: 'healthKnowledgeBase', component: HealthKnowledgeBaseComponent,
        children: [
          {
            path: 'healthKnowledgeContent', component: HealthKnowledgeContentComponent
          }
        ]
      },
      {
        path: 'fitnessTracker', component: MobileFitnessComponent,
        children: [
          { path: 'fitbit', component: TestComponent }
        ]
      },
      { path: 'pharmacy', component: PharmacyComponent },
      { path: 'emergency', component: EmergencyRoomComponent },
      { path: 'patientView', component: PatientViewComponent },
      { path: 'patientBilling', component: PatientBillingComponent },
      { path: 'teleMedicine', component: TelemedicineComponent },
      { path: 'insuranceProvider', component: InsuranceProvComponent },
      {
        path: 'recordsProvider', component: RecordsProviderComponent,
        children: [
          { path: ':id', component: RecordsProvTypeComponent }
        ]
      },
      {
        path: 'labReports', component: LabReportsComponent,
        children: [
          { path: ':id', component: LabReportTypeComponent }
        ]
      },
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
