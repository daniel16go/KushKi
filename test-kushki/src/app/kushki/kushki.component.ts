import { Component, OnInit } from '@angular/core';
import { Kushki } from '@kushki/js';
import { KushkiApiService } from '../kushki-api.service';


@Component({
  selector: 'app-kushki',
  templateUrl: './kushki.component.html',
  styleUrls: ['./kushki.component.css']
})

export class KushkiComponent implements OnInit {

  cardnumber:string = "";
  fullname:string = "";
  mm:string = "";
  yy:string = "";
  cvc:string = "";
  mount:number = 0

  private kushki:Kushki;

  getToken():void{
    this.kushki.requestToken({
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
        console.log(response);
      } else {
        console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
    });
  }

  constructor(private kushkiService:KushkiApiService) { 
    let plublicKey = kushkiService.getPublicKey();
    this.kushki = new Kushki({
      merchantId: plublicKey, 
      inTestEnvironment: true
    });
  }

  ngOnInit() {
  }

}
