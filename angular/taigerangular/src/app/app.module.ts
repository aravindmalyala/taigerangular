 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubComponent } from './github/github.component';
import {   RouterModule,Routes  } from '@angular/router';
 import { HttpClientModule   } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
 
const routes:Routes=[]; 
@NgModule({
  declarations: [
    AppComponent,
    GithubComponent
  ],
  providers: [
  //  ModalService
],
  imports: [
    [RouterModule.forRoot(routes)],
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule   
  ],
  exports:[RouterModule ] ,
 
  bootstrap: [AppComponent]
})
export class AppModule { }
