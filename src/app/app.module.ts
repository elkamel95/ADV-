import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { ArraysComponent } from './arrays/arrays.component';
import { RouterModule, Routes } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { CcComponent } from './cc/cc.component';

const routes: Routes = [
  { path: 'arrays', component: ArraysComponent },
  { path: 'cc', component: CcComponent }

  
];

@NgModule({
  declarations: [
    AppComponent,
    ArraysComponent,
    CcComponent
  ],
  
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserModule,
    RouterModule.forRoot(routes),
     FormsModule,
     BrowserAnimationsModule,
     MatButtonModule,
     NgbModule,
     MatRadioModule,
     HttpClientModule 
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
