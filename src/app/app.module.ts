import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { QuizzModule } from './pages/quizz/quizz.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterOutlet,
    BrowserModule,
    HttpClientModule,
    QuizzModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
