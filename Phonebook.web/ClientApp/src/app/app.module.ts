import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { PhonebookEntriesListComponent } from './components/phonebooks/phonebook-entries-list/phonebook-entries-list.component';
import { PhonebookListComponent } from './components/phonebooks/phonebook-list/phonebook-list.component';
import { PhonebookEntryComponent } from './components/phonebooks/phonebook-entry/phonebook-entry.component';
import { PhonebookComponent } from './components/phonebooks/phonebook/phonebook.component';
//import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PhonebookComponent,
    PhonebookEntryComponent,
    PhonebookListComponent,
    PhonebookEntriesListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    NgbModule,
    // ToastrModule.forRoot({
    //   positionClass: 'toast-bottom-right'
    // }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0)',
      fullScreenBackdrop: true,
      primaryColour: '#007bff', //1287fc
      secondaryColour: '#007bff',
      tertiaryColour: '#007bff'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
