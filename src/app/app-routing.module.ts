import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MasterComponent } from './reports/master/master.component';
import { MonthlyReportComponent } from './reports/monthly-report/monthly-report.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/login'},
  {path:'login', component:LoginComponent},
  {path:'welcome',loadChildren:()=> import('./pages/welcome/welcome.module').then(m=>m.WelcomeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
