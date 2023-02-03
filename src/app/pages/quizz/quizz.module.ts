import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzComponent } from './quizz.component';
import { RouterModule } from '@angular/router';
import { QuizzRoutes } from './quizz.routes';


@NgModule({
  declarations: [
    QuizzComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(QuizzRoutes)
  ]
})
export class QuizzModule { }
