import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KushkiApiService {
  
  constructor() { }
  
  getPublicKey(){
    return "e48d1ea9047b4ee8a28f3ddcbb76ff50";
  }

  getPrivateKey(){
    return "38f3c6301ede4f58a45a92fd9be03fdb";
  }

  getServiceAPIPath(UAT:boolean){
    return UAT ? "https://api-uat.kushkipagos.com": "https://api.kushkipagos.com";
  }
  
}
