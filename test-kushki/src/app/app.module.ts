import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KushkiApiService } from './kushki-api.service';
import { KushkiComponent } from './kushki/kushki.component';

@NgModule({
  declarations: [	
    AppComponent,
      KushkiComponent
   ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [KushkiApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }


