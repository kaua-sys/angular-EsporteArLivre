import { Routes } from '@angular/router';
import { AtletaComponent } from './component/atleta/atleta.component';
import { HomeComponent } from './component/home/home.component';
import { CorridaComponent } from './component/corrida/corrida.component';
import { ListarAtletaComponent } from './component/listar-atleta/listar-atleta.component';
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
    },
    {
        path:'cadastroCorridas',
        component:CorridaComponent
    },
    {
        path:'listar-atleta',
        component:ListarAtletaComponent
    }
];
