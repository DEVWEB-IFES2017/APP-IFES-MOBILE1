import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IFESApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceLogin , Evento} from '../providers/servicelogin/servicelogin';
import { HttpModule } from '@angular/http';
import{NovoeventoPageModule} from '../pages/novoevento/novoevento.module';

@NgModule({
  declarations: [
    IFESApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,    
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(IFESApp),
    IonicStorageModule.forRoot(),
    NovoeventoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IFESApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceLogin,
    Evento,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
