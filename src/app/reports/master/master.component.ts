import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DefaultService } from '../../services/default.service';
import { weeklyFields } from '../../pages/welcome/forms/master-report.fields';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {
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
  to:any;
  from:any;
  motors: any;

  constructor(private nzNotification: NzNotificationService,
    private dp: DatePipe,
    private domSanitizer: DomSanitizer,
    private fb: UntypedFormBuilder,
    private service:DefaultService){

  }

  ngOnInit(): void {     
    this.getAllMotors();
    this.fields=weeklyFields(this.motors);
  }

  toggle(visible: boolean) {
    this.visible = visible;
  }


  submit() {
    this.loading=true;
    const formData = this.form.value as {motorName :any ,fromDate:any,toDate:any};
    const reportData = {
      name: formData.motorName, 
      fromDate: this.dp.transform(formData.fromDate, 'yyyy-MM-dd'), 
      toDate: this.dp.transform(formData.toDate, 'yyyy-MM-dd'),
    };
    this.service.weeklyReport(reportData.name,reportData.fromDate,reportData.toDate)
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
      this.fields=weeklyFields(this.motors);
    })
  }

}
