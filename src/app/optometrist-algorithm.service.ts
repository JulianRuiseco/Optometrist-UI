import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptometristAlgorithmService {
  myCounter:number;

  constructor() { 
    this.myCounter = 1;
  }

  incrementCounter(){
    this.myCounter++;
  }

  getCounter(){
    return this.myCounter;
  }
}
