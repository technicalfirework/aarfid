import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyAccountPage } from '../pages/my-account/my-account';
import { EventsPage } from '../pages/events/events';
import { ContactsPage } from '../pages/contacts/contacts';
import { WinnerPage } from '../pages/winner/winner';
import {HttpClientModule} from '@angular/common/http'
// import { FormsModule } from '@angular/forms';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ContactDetailsPage } from '../pages/contact-details/contact-details';
@NgModule({
  declarations: [
    MyApp,
    MyAccountPage,
    EventsPage,
    ContactsPage,
    WinnerPage,
    ContactDetailsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MyAccountPage,
    EventsPage,
    ContactsPage,
    WinnerPage,
    ContactDetailsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScreenOrientation
  ]
})
export class AppModule {}
