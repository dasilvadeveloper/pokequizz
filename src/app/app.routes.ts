import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/quizz/quizz.module').then(x => x.QuizzModule)
    }
]