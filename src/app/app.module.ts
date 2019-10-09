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
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatListModule, MatBottomSheetModule, MatMenuModule } from '@angular/material';
import { RatingModule } from 'ngx-rating';
import { AppInfoComponent } from './app-info/app-info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { FullCalendarModule } from '@fullcalendar/angular';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarComponent } from './calendar/calendar.component';
import { MedicationsComponent } from './medications/medications.component'; // for FullCalendar!

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
    MatListModule,
    MatMenuModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // }),
    FullCalendarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents:[AppInfoComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
