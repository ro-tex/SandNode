'use strict';

// http://www.flawlessrhetoric.com/Dynamic-Programming-First-Principles

function getReturns(numPlants) {
  let returns = {};
  for (let i = 0; i < numPlants; ++i) {
    let numInvestments = Math.random() * (5 - 2) + 2; // b/n 2 and 5 investment units per plant
    returns[i] = {};
    for (let j = 1; j <= numInvestments; ++j) {
      returns[i][j] = Math.random() * 300; // ROI b/n 0 and 300% per investment unit
    }
  }
  return returns;
}

let returnsPerPlant = getReturns(3);

function getBestInvestmentsDsitribution(numInvestments, returnsPerPlant) {

  // calculate ROI per inv. unit
  // push all values into an array, value is (ROI, # inv. units, plantId)
  // heapify array, weight is ROI + # inv. units (for tie-breaker)

  // pop elements off the heap while we still have funds to invest
  // if we don't have enoug funds to invest in currently popped element - discard and pop the next one

}
