import { Component, OnInit } from '@angular/core';
import { Kushki } from '@kushki/js';

@Component({
  selector: 'app-kushki',
  templateUrl: './kushki.component.html',
  styleUrls: ['./kushki.component.css']
})
export class KushkiComponent implements OnInit {
  
  kushki = new Kushki({
    merchantId: 'public-merchant-id', 
    inTestEnvironment: true,
    regional:false
  });

  constructor() { }

  ngOnInit() {
  }

}
