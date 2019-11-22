import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatListModule, MatBottomSheetModule, MatMenuModule, MatIconModule } from '@angular/material';
// import {MatDatepickerModule} from '@angular/material/datepicker';

import { RatingModule } from 'ngx-rating';
import { AppInfoComponent } from './app-info/app-info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar.component';
import { MedicationsComponent } from './medications/medications.component'; // for FullCalendar!
import { MobileFitnessComponent } from './mobile-fitness/mobile-fitness.component';
import { TestComponent } from './test/test.component';
import { AdminComponent } from './admin/admin.component';
import { HealthKnowledgeBaseComponent } from './health-knowledge-base/health-knowledge-base.component';
import { HealthKnowledgeContentComponent } from './health-knowledge-content/health-knowledge-content.component'; // for FullCalendar!
import { MyHeartComponent } from './my-heart/my-heart.component'; // for FullCalendar!

import { MatTabsModule } from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';

import { InsuranceComponent } from './insurance/insurance.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HealthConnectComponent } from './health-connect/health-connect.component';
import { AvatarModule } from 'ngx-avatar';
import { HealthConnectChatComponent } from './health-connect-chat/health-connect-chat.component';
import { DocumentComponent } from './document/document.component';
import { ElectronicHealthComponent } from './electronic-health/electronic-health.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FilterPipe } from './filter.pipe';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppInfoComponent,
    LandingPageComponent,
    CalendarComponent,
    MedicationsComponent,
    MobileFitnessComponent,
    TestComponent,
    AdminComponent,
    HealthKnowledgeBaseComponent,
    HealthKnowledgeContentComponent,
    MyHeartComponent,
    InsuranceComponent,
    HealthConnectComponent,
    HealthConnectChatComponent,
    DocumentComponent,
    ElectronicHealthComponent,
    FilterPipe,
    MedicalConditionComponent,
    FamilyComponent,
    FourCComponent,
    DocumentTypeComponent,
    ElectronicHealthTypeComponent,
    PharmacyComponent,
    PatientViewComponent,
    PatientBillingComponent,
    TelemedicineComponent,
    EmergencyRoomComponent,
    LabReportsComponent,
    LabReportTypeComponent,
    InsuranceProvComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RatingModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    AvatarModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // }),
    // FullCalendarModule,
    NgbModalModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatTabsModule,
    MatSidenavModule,
    NgxFileDropModule
    // FullCalendarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe,
    MatDatepickerModule
  ],
  entryComponents: [AppInfoComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
