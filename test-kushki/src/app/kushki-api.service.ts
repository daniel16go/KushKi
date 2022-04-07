import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class KushkiApiService {
  
  httpOptions = {
    headers: new HttpHeaders({
      "Private-Merchant-Id": this.privateKey(),
      "Content-Type": "application/json"
    }),
  };
  
  constructor(private http: HttpClient) { }

  publicKey(){
    return "e48d1ea9047b4ee8a28f3ddcbb76ff50";
  }

  privateKey(){
    return "38f3c6301ede4f58a45a92fd9be03fdb";
  }

  serviceAPIPath(){
    return "https://api-uat.kushkipagos.com";
  }

  MakeaCharge(body:any){
    let path = this.serviceAPIPath()+"/card/v1/charges";
    console.log("MakeaCharge");
    console.log(path);
    console.log(body);
    return this.http.post(path, body,{
      headers: this.httpOptions.headers
    });
  }
    
  




  

  
  
}
