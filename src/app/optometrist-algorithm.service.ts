import { Injectable } from '@angular/core';
import { relative } from 'path';

@Injectable({
  providedIn: 'root'
})
export class OptometristAlgorithmService {
  currentSettings:Array<OptometristSetting>; 
  proposedSettings:Array<OptometristSetting>;

  constructor() { //normally this constructor would be an array
    this.currentSettings = [];
    this.currentSettings.push(new OptometristSetting(2,1));
    
    for(var i =0;i<this.currentSettings.length;i++){
      this.currentSettings[i].calculateFromChoice(false);
    }

    this.proposedSettings = [];
    this.proposedSettings.push(new OptometristSetting(2,1));
    
    for(var i =0;i<this.proposedSettings.length;i++){
      this.proposedSettings[i].calculateFromChoice(true);
    }
  }

  triggerSelection(acceptRight:boolean){
    console.log("triggerred");
    for(var i =0;i<this.currentSettings.length;i++){ // this goes through and recalculates
      this.currentSettings[i].calculateFromChoice(acceptRight);
    }
  }

  calculateFromSettings(toEvaluate:Array<OptometristSetting>){
    var value = toEvaluate[0].getCurrentValue().toFixed(4);
    return value;
  }

  updateFields(){
    var fields={
      optionLeft:"",
      optionRight:""
    };
    fields.optionLeft = this.calculateFromSettings(this.currentSettings);
    fields.optionRight = this.calculateFromSettings(this.proposedSettings);

    return fields;
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
  direction:any; // chosen isotropically p(g) function

  //outputs
  relativeAdjustment:number; //this is the important number 
                            //(last_relativeAdjustment)*(1+stepsize*direction)
  

  constructor(originalValue:number,baselineA:number){
    //INPUTS
    this.originalValue = originalValue;
    this.baselineA = baselineA;

    //ORIGINALS
    this.alpha = .1;
    this.beta = this.alpha/2;
    this.gamma = 1;
    this.direction = Math.random() >= 0.5;
    this.relativeAdjustment = 1;
  };

  directionCalculation(accept:boolean){
    //sample from student distribution
    if(accept){
      this.direction = this.direction;
    }else{
      this.direction = (!this.direction);
    }
    //p(direction) = (((v+N)/2-1)! / (v/2-1)!(pi*v)^(N/2))*(1+1/v*(GT*G))
  }

  calculateFromChoice(accept:boolean){
    if(accept){
      this.gamma = this.gamma+this.alpha
    }else{
      this.gamma = this.gamma-this.beta;
    }

    this.directionCalculation(accept);
    this.stepsize = this.baselineA * Math.exp(this.gamma);
    this.relativeAdjustment = this.relativeAdjustment*(1+this.stepsize);
  }

  getCurrentValue(){
    return this.originalValue * this.relativeAdjustment;
  }
}
