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

    this.populateFields();
   }

  public optionLeft:any;
  public optionRight:any;
  public optometristService:OptometristAlgorithmService;
  

  ngOnInit() {
  }

  triggerSelection(acceptRight:boolean){
    this.optometristService.triggerSelection(acceptRight);
  }

  populateFields(){
    //iterate through optometristService, recalculating
    var fields = this.optometristService.updateFields();
    this.optionLeft = fields.optionLeft;
    this.optionRight = fields.optionRight
  }

}
