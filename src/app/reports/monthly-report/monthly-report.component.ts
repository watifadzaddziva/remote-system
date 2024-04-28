import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DefaultService } from '../../services/default.service';
import { monthlyFields } from '../../pages/welcome/forms/monthly.reports.fields';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrl: './monthly-report.component.css'
})
export class MonthlyReportComponent {

  url!: string;
  disabled = true;
  loading: boolean = false;
  visible!: boolean;
  form = new FormGroup({});
  fields !: FormlyFieldConfig[];
  @Input() report!: any;
  @Output() output = new EventEmitter();
  pdfSrc!: string;
  safeUrl: any;
  isLoaded:boolean =false;
  options:any;
  month:any;
  motors: any;

  constructor(private nzNotification: NzNotificationService,
    private dp: DatePipe,
    private domSanitizer: DomSanitizer,
    private fb: UntypedFormBuilder,
    private service:DefaultService){

  }

  ngOnInit(): void {    
    this.form=this.fb.group({
      month:[],
    }) 
    this.getAllMotors();
    this.fields=monthlyFields(this.motors);
  }

  toggle(visible: boolean) {
    this.visible = visible;
  }


  submit() {
    this.loading=true;
    const formData = this.form.value as {motorName :any ,month:any,};
    const reportData = {
      name: formData.motorName, 
      month: this.dp.transform(formData.month, 'yyyy-MM'), 
    };
    this.service.monthlyReport(reportData.name,reportData.month)
      .subscribe(
         (res:any) => {
          const file = new Blob([res], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(fileURL);
          this.isLoaded = true;
          this.loading=false;
          this.toggle(false);

        },
        error=>{
          this.loading= false;
        }
      );   
  }

  getAllMotors(){
    this.service.getAllMotorData().subscribe((res)=>{
      this.motors=res.map((motor:any)=>{
        return {label:motor.motorName,value:motor.motorName}
      });
      this.fields=monthlyFields(this.motors);
    })
  }
}
