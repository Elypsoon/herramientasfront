import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { NuevoLoginComponent } from './screens/nuevo-login/nuevo-login.component';
import { ProductoRegistroScreenComponent } from './screens/producto-registro-screen/producto-registro-screen.component';
import { MateriasScreenComponent } from './screens/materias-screen/materias-screen.component';
const routes: Routes = [
  { path: '', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'registro/:id', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full' },
  { path: 'home/:materias', component: HomeScreenComponent, pathMatch: 'full' },
  { path: 'nuevoLogin', component: NuevoLoginComponent, pathMatch: 'full' },
  { path: 'productos', component: ProductoRegistroScreenComponent, pathMatch: 'full'},
  { path: 'registro-mat', component: MateriasScreenComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
