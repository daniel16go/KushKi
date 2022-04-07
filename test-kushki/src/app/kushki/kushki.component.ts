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

  message:string = "";

  private kushki:Kushki;

  getToken():void{
    this.ok = false;
    this.fail = false;
    this.kushki.requestToken({
      amount: this.mount,
      currency: "COP",
      card: {
        name: this.fullname,
        number: this.cardnumber,
        cvc: this.cvc,
        expiryMonth: this.date.split('/')[0],
        expiryYear: this.date.split('/')[0],
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
  dateCheck(){
    if(this.date.length >0 && this.date.length < 5){
      if((this.date.replace("/", "").length)%2 === 0 ){
        this.date += "/";
      }
    }
  }

  cardNumberCheck(){
    if(this.cardnumber.length >0 && this.cardnumber.length <19){
      let card = this.cardnumber.replace('-', '').length;
      if(card%4 === 0 ){
        console.log(card);
        this.cardnumber += '-';
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
          this.message = "Ticket num: "+response.ticketNumber+ "\n"+ response.details.responseText;
          this.ok = true;
        }

        
      }else{
        this.message = response.code+" - "+response.message;
        this.fail = true;
      }
    })
  }

  constructor(private kushkiService:KushkiApiService) { 
    let plublicKey = kushkiService.publicKey();
    this.kushki = new Kushki({
      merchantId: plublicKey, 
      inTestEnvironment: true
    });
  }

  ngOnInit() {
  }

}
