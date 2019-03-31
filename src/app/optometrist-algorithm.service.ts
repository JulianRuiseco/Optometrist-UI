import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptometristAlgorithmService {
  currentSettings:Array<OptometristSetting>; 
  nextSettings:Array<OptometristSetting>;

  constructor() { 
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
  

  constructor(){};

  p_function(){
    //sample from student distribution

    //p(direction) = (((v+N)/2-1)! / (v/2-1)!(pi*v)^(N/2))*(1+1/v*(GT*G))
  }

}
