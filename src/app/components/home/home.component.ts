import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor() {
    this.name = "";
   }

  public name:any;
  

  ngOnInit() {
  }

  onLeftClick(){
    this.name = "yaay";
  }

}
