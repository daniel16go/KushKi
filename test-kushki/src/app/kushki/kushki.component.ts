import { Component, OnInit } from '@angular/core';
import { Kushki } from '@kushki/js';
import { TokenResponse } from '@kushki/js/lib/types/remote/token_response';


@Component({
  selector: 'app-kushki',
  templateUrl: './kushki.component.html',
  styleUrls: ['./kushki.component.css']
})

export class KushkiComponent implements OnInit {

  cardnumber:string = "5451951574925480";
  fullname:string = "";
  mm:string = "";
  yy:string = "";
  cvc:string = "";
  mount:number = 0

  getToken():void{
    kushki.requestToken({
      amount: this.mount,
      currency: "COP",
      card: {
        name: this.fullname,
        number: this.cardnumber,
        cvc: this.cvc,
        expiryMonth: this.mm,
        expiryYear: this.yy,
      },
    }, (response:any) => {
      if(typeof response.code === 'undefined'){
        console.log("OK-");
        console.log(response);
      } else {
        console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
    });
  }

  checkProperty(object:any, property:any):any{
    return typeof object !== 'undefined' && object.hasOwnProperty(property);
  }

  constructor() { }

  ngOnInit() {
  }

}
const kushki = new Kushki({
  merchantId: 'e48d1ea9047b4ee8a28f3ddcbb76ff50', 
  inTestEnvironment: true
});