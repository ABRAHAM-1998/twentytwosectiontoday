import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';  


import { HttpClientModule } from '@angular/common/http';
// MATERIAL_imports
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { ApiserviceService } from "./SHARED/apiservice.service";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './COMPfOLDER/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './COMPfOLDER/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";;
import { MatListModule } from "@angular/material/list";
import { HomeComponent } from './COMPfOLDER/home/home.component';
import { ProfileComponent } from './COMPfOLDER/PROFILE-C/profile/profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CreatepostComponent } from './COMPfOLDER/createpost/createpost.component';
import { FormsModule } from "@angular/forms";

import {MatGridListModule} from '@angular/material/grid-list';
import { FriendsComponent } from './COMPfOLDER/friends/friends.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UserprofileComponent } from './COMPfOLDER/PROFILE-C/userprofile/userprofile.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material/expansion';

import {  UserService, AlwaysAuthGuard, AlwaysAuthChildrenGuard, OnlyLoggedInUsersGuard, } from './SHARED/authgurd.service';
import { ChatComponent } from './COMPfOLDER/CHATFOLDER/chat/chat.component';
import { PRIVATECHATComponent } from './COMPfOLDER/CHATFOLDER/privatechat/privatechat.component';
import { VideoComponent } from './COMPfOLDER/CHATFOLDER/video/video.component';

// import { AuthGuardService } from "module";




// ...


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarMainComponent,
    HomeComponent,
    ProfileComponent,
    CreatepostComponent,
    FriendsComponent,
    UserprofileComponent,
    ChatComponent,
    PRIVATECHATComponent,
    VideoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ModalModule,
    FormsModule,


    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatAutocompleteModule,
    MatTabsModule,

    


    BrowserAnimationsModule,
    ImageCropperModule,
    MatGridListModule,
    MatExpansionModule,
    


    NgbModule,
    CdkScrollableModule,
      ScrollingModule,
    InfiniteScrollModule,
 
  ],
  providers: [
    UserService,
    AlwaysAuthGuard,
    AlwaysAuthChildrenGuard,
    OnlyLoggedInUsersGuard,
    ApiserviceService,
    DatePipe

  ],
  exports:[],
  
  bootstrap: [AppComponent],
})
export class AppModule {  }

// ng serve --proxy-config proxy.conf.json
