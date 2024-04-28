import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SetThresholdComponent } from './components/set-threshold/set-threshold.component';
import { MotorDataComponent } from './pages/motor-data/motor-data.component';
import { ThresholdPageComponent } from './pages/threshold-page/threshold-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoaderComponent } from './pages/loader/loader.component';
import { ReportsComponent } from './pages/reports/reports.component';

@NgModule({
  declarations: [
    SetThresholdComponent,
    MotorDataComponent,
    ThresholdPageComponent,
    ReportsComponent
  ],
  imports: 
  [
    WelcomeRoutingModule
    ,FormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzDrawerModule,
    NzFormModule,
   NzDatePickerModule ,
   NzButtonModule,
   NzInputModule ,
   NzSelectModule,
   ReactiveFormsModule,
   NzTableModule,
   NzCardModule,
   FormlyNgZorroAntdModule,
   FormlyModule,
   NgxPermissionsModule,
   NzInputNumberModule,
   NzGridModule,
   NzFlexModule,
   NzImageModule,
   NzAvatarModule,
   NzPaginationModule,
   NzIconModule
  ]
})
export class WelcomeModule { }
