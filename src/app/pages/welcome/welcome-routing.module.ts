import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { MotorDataComponent } from './pages/motor-data/motor-data.component';
import { ThresholdPageComponent } from './pages/threshold-page/threshold-page.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { MasterComponent } from '../../reports/master/master.component';
import { MonthlyReportComponent } from '../../reports/monthly-report/monthly-report.component';


const routes: Routes = [
  {path: '', component:WelcomeComponent,
children:[
  {path:'', component:MotorDataComponent},
  {path:'motor', component:MotorDataComponent},
  {path:'threshold', component:ThresholdPageComponent},
  {path:'reports', component:ReportsComponent, children:[
    {path: 'weekly', component:MasterComponent},
    {path:'monthly',component:MonthlyReportComponent}
  ]}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
