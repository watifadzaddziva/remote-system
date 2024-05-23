import { Injectable } from '@angular/core';
import { map, Observable, of, Subject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DefaultService {
  baseUrl='http://16.16.211.66:8025'
  static NAME = 'token';
  static TOKEN: string;
  token: string;
  tokenPayload: any;

    constructor(public jwtHelper: JwtHelperService,private permissionsService:NgxPermissionsService, private http: HttpClient) {
      this.token = DefaultService.TOKEN = <string>this.getToken();
      if (!this.token) return;
      this.setTokenPayload();
     
    }
  
    setToken(token: string) {
      this.token=token;
      sessionStorage.setItem(DefaultService.NAME, token)
  }
  
  getToken() {
      return sessionStorage.getItem(DefaultService.NAME)
      
  }
  
  public setTokenPayload() {
    this.tokenPayload = this.decodeToken();
    if (this.tokenPayload) {
      const role = this.tokenPayload?.resource_access?.backend?.roles;
      const user = this.tokenPayload.sub;
      this.permissionsService.loadPermissions([role]);
    } else {
      let data: any = {};
      this.tokenPayload = data;
    }
  }
  
  public clearToken() {
      sessionStorage.clear();
  }
  
  public decodeToken() {
    const decodedToken= this.jwtHelper.decodeToken(this.token)
      return decodedToken;
  }
  
  public isAuthenticated():boolean {
      return !this.jwtHelper.isTokenExpired(this.token);
  }
  
  public isLoggedIn(){
      return this.getToken() ? true : false
  }
  
login(user :any):Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/auth/login`,user)
   
  }

  postThreshold(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/threshold/set_values`, data)

  }

  putThreshold( data: any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/threshold/update_thresholds`, data)
  }
  getThreshold():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/threshold/get_current_values`)

  }
  
  getImage():Observable<any>{
    return this.http.get(`${this.baseUrl}/motor/image`)
  }

  getAllMotorData(): Observable<any>{
return this.http.get(`${this.baseUrl}/motor/latest_sensor_data`)
  }

  getMotors():Observable<any>{
    return this.http.get(`${this.baseUrl}/motor/all-motors`)
  }
  getByName(){

  }  
  
  weeklyReport(name:any, fromDate:any,toDate:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/report/weekly_report?motorName=${name}&fromDate=${fromDate}&toDate=${toDate}`,{responseType:'blob' as 'json'}).pipe(map(data=>{
      return data;
    }))

  }

 monthlyReport(name:any,month:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/report/monthly_report?motorName=${name}&month=${month}`,{responseType:'blob' as 'json'}).pipe(map(data=>{
      return data;
    }))

}
} 
  
