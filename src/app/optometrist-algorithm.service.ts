import { Injectable } from '@angular/core';
import { relative } from 'path';

@Injectable({
  providedIn: 'root'
})
export class OptometristAlgorithmService {
  currentSettings:Array<OptometristSetting>; 

  constructor() { 
    this.currentSettings.push(new OptometristSetting);
  }

  triggerSelection(acceptRight:boolean){
    for(var i =0;i<this.currentSettings.length;i++){ // this goes through and recalculates
      this.currentSettings[i].calculateFromChoice(acceptRight);
    }
  }

  rejectRight(){

  }
}

class OptometristSetting {
  //inputs
  originalValue:number;
  baselineA:number; //unknown user input
  
  //calculations
  beta:number; // .5 alpha
  alpha:number;
  gamma:number; //last_gamma +/- alpha/.5 alpha depending on accept/reject
  stepsize:number; //baselineA * exp(gamma)
  direction:number; // chosen isotropically p(g) function

  //outputs
  relativeAdjustment:number; //this is the important number 
                            //(last_relativeAdjustment)*(1+stepsize*direction)
  

  constructor(originalValue:number,baselineA:number){
    this.originalValue = originalValue;
    this.baselineA = baselineA;
  };

  p_function(){
    //sample from student distribution

    //p(direction) = (((v+N)/2-1)! / (v/2-1)!(pi*v)^(N/2))*(1+1/v*(GT*G))
  }

  calculateFromChoice(accept:boolean){
    if(accept){

    }else{

    }
  }

  getCurrentValue(){
    return this.originalValue + this.relativeAdjustment;
  }
}
