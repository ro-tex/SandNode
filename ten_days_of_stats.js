'use strict';

// See https://www.hackerrank.com/domains/tutorials/10-days-of-statistics

function comp(x, y) {
  return (x > y) ? 1 : ((x === y) ? 0 : -1);
}

function median(arr) {
  arr.sort(comp);

  let median;
  let lower;
  let upper;
  if (arr.length % 2 === 0) {
    let idx = arr.length / 2;
    median = (arr[idx - 1] + arr[idx]) / 2;
    lower = arr.slice(0, idx);
    upper = arr.slice(idx);
  } else {
    let idx = (arr.length - 1) / 2;
    median = arr[idx];
    lower = arr.slice(0, idx);
    upper = arr.slice(idx + 1);
  }

  return {
    median: median,
    lower: lower,
    upper: upper,
  };
}

function quartiles(arr) {
  let med1 = median(arr);
  let med2 = median(med1.lower);
  let med3 = median(med1.upper);

  return {
    q1: med2.median,
    q2: med1.median,
    q3: med3.median,
    quart1: med2.lower,
    quart2: med2.upper,
    quart3: med3.lower,
    quart4: med3.upper,
  };
}

function stdDeviation(arr) {
  let mean = arr.reduce((n, sum) => n + sum, 0) / arr.length;
  let variance = arr.map((n) => (n - mean) ** 2).reduce((n, sum) => n + sum, 0) / arr.length;
  return Math.sqrt(variance);
}
