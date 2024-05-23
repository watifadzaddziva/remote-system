import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DefaultService } from '../../../../services/default.service';
import { thresholdFields } from '../../forms/motor-data.fields';

@Component({
  selector: 'app-set-threshold',
  templateUrl: './set-threshold.component.html',
  styleUrl: './set-threshold.component.css'
})
export class SetThresholdComponent {

  visible = false;
  form = new FormGroup({});
  fields !: FormlyFieldConfig[];
  @Input() threshold!: any;
  @Output() output = new EventEmitter();
  fileList: any = [];
  options: any;
  isLoaded:boolean= false;
  isLoading:boolean=false;
  motors:any;


  constructor(private service: DefaultService, 
    private notification: NzNotificationService, 
    private injector: Injector) {
  }

  ngOnInit(): void {
    this.getMotors();
    this.fields = thresholdFields(this.motors);
  }

  ngOnChanges() {
    this.threshold = { ...this.threshold };
    this.fields = thresholdFields(this.motors);
  }

  toggle(visible: boolean): void {
    this.visible = visible;
  }

 
submit() {
  if (this.form.valid) {
    this.isLoading=true;
    var svc;
    this.threshold.id ? svc = this.service.putThreshold( this.threshold) : 
    svc = this.service.postThreshold( this.threshold);
    svc.subscribe(res => {
      this.notification.success('Saved', 'Threshold Saved Successfully!', { nzDuration: 10000 });
      this.isLoading=false;
      this.output.emit(res); 
      this.toggle(false);
      this.fileList = []
    },error=>{
      this.isLoading=false;
      if(error && error.error && error.error.message){
        this.notification.error('Error', error.error.message);
        
      }
    }).add(() => {
      this.isLoading = false; 
    });
  }
}

getMotors(){
  this.service.getMotors().subscribe((res)=>{
    this.motors=res.map((motor:any)=>{
      return {label:motor.motorName,value:motor.motorName}
    });
    this.fields=thresholdFields(this.motors);
  })
}

}
