import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OptometristAlgorithmService } from '../../optometrist-algorithm.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(optometristService:OptometristAlgorithmService) {
    this.optometristService = optometristService;
    this.name = this.optometristService.getCounter()
   }

  public name:any;
  public optometristService:OptometristAlgorithmService;
  

  ngOnInit() {
  }

  onLeftClick(){
    this.optometristService.incrementCounter();
    this.name = this.optometristService.getCounter();
  }

}
