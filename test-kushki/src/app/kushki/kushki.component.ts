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
  date:string = "";
  cvc:string = "";
  mount:number = 0

  ok:boolean = false;
  fail:boolean = false;

  ticket:string = "";
  message:string = "";

  private kushki:Kushki;

  getToken():void{
    this.ok = false;
    this.fail = false;
    var re = /-/g;
    let card = this.cardnumber.replace(re, "");

    this.kushki.requestToken({
      amount: this.mount,
      currency: "COP",
      card: {
        name: this.fullname,
        number: card,
        cvc: this.cvc,
        expiryMonth: this.date.split('/')[0],
        expiryYear: this.date.split('/')[1],
      },
    }, (response:any) => {
      if(typeof response.code === 'undefined'){
        this.enviarDatos(response.token, this.mount);
      } else {
        this.message = response.code+" - "+response.message;
        this.fail = true;
        
      }
    });
  }
  dateCheck(x:any){
    if(x.key !== 'Backspace'){
      if(this.date.length == 2){
        this.date += '/';
      }
    }
  }

  cardNumberCheck(x:any){
    
    if(x.key !== 'Backspace'){
      switch (this.cardnumber.length) {
        case 4:
        case 9:
        case 14:
          this.cardnumber += '-';
        break;
      }
    }
  }

  enviarDatos(token:string, amount:number):void{
    console.log("Ralizando la compra");
    this.kushkiService.MakeaCharge(
      {
        "token": token,
        "amount": {
          "subtotalIva": 0,
          "subtotalIva0": amount,
          "ice": 0,
          "iva": 0,
          "currency": "COP"
        },
        "fullResponse": true
      }
    )
    .subscribe((response:any) =>{
      if(typeof response.code === 'undefined'){
        if(typeof response.details.transactionStatus !== 'undefined' && response.details.transactionStatus == "APPROVAL"){
          this.message = response.details.responseText;
          this.ticket = "Ticket num: "+response.ticketNumber; 
          this.ok = true;
        }else{
          this.message = response.code+" - "+response.message;
          this.fail = true;
        }
      }else{
        this.message = response.code+" - "+response.message;
        this.fail = true;
      }
    })
  }

  constructor(private kushkiService:KushkiApiService) { 
    let plublicKey = kushkiService.publicKey();
    let min = 1000;
    let max = 10000000;

    this.mount = Math.trunc(Math.random()*(max - min)-min);

    this.kushki = new Kushki({
      merchantId: plublicKey, 
      inTestEnvironment: true
    });
  }

  ngOnInit() {
  }

}
