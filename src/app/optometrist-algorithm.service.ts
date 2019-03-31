import { Injectable } from '@angular/core';
import { relative } from 'path';

@Injectable({
  providedIn: 'root'
})
export class OptometristAlgorithmService {
  currentSettings:Array<OptometristSetting>; 
  proposedLeftSettings:Array<OptometristSetting>;
  proposedRightSettings:Array<OptometristSetting>;

  constructor() { //normally this constructor would be an array
    this.currentSettings = [];
    this.currentSettings.push(new OptometristSetting(2,1));

    this.calculateFromCurrent();
  }

  triggerSelection(acceptRight:boolean){
    if(acceptRight){
      this.currentSettings = this.proposedRightSettings;
    }else{
      this.currentSettings = this.proposedRightSettings;
    }

    this.calculateFromCurrent();
  }

  calculateFromCurrent(){
    this.proposedLeftSettings = [];
    this.proposedRightSettings = [];

    for(var i =0;i<this.currentSettings.length;i++){ // this goes through and recalculates
      this.proposedLeftSettings.push(this.currentSettings[i].clone());
      this.proposedRightSettings.push(this.currentSettings[i].clone());
      
      this.proposedLeftSettings[i].calculateFromChoice(false);
      this.proposedRightSettings[i].calculateFromChoice(true);
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
    fields.optionLeft = this.calculateFromSettings(this.proposedLeftSettings);
    fields.optionRight = this.calculateFromSettings(this.proposedRightSettings);

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

  clone(){
    var Clone = new OptometristSetting(this.originalValue,this.baselineA);

    Clone.alpha = this.alpha;
    Clone.beta = this.beta;
    Clone.gamma = this.gamma;
    Clone.stepsize = this.stepsize;
    Clone.direction = this.direction;
    Clone.relativeAdjustment = this.relativeAdjustment;

    return Clone;
  }
}
