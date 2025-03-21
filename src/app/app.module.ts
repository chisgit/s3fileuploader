import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { S3Service } from './services/s3.service';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [S3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }