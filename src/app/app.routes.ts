import { Routes } from '@angular/router';
import { AtletaComponent } from './component/atleta/atleta.component';
import { HomeComponent } from './component/home/home.component';
export const routes: Routes = [
    {
       path:'',
       redirectTo:'/home',
       pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent,
    },
    {
        path:'cadastroAtleta',
        component:AtletaComponent
    }
];
