import fs from 'fs';

export const calcluateDays = (periodType, value) => {
  switch (periodType) {
    case 'months':
      return value * 30;

    case 'weeks':
      return value * 7;

    default:
      return value;
  }
};

export const availableBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const occupied = 0.65 * totalHospitalBeds;
  const available = totalHospitalBeds - occupied;
  return Math.trunc(available - severeCasesByRequestedTime);
};

export const infectionProjections = (currentlyInfected, days) => {
  const projection = currentlyInfected * (2 ** Math.floor(days / 3));
  return projection;
};

export const moneyLost = (infectionsByRequestedTime, percentageIncome, avgIncome, days) => {
  const estimatedLoss = (infectionsByRequestedTime * percentageIncome * avgIncome) / days;
  return Math.floor(estimatedLoss);
};

export const impactCalculator = ({
  reportedCases,
  totalHospitalBeds,
  periodType,
  timeToElapse,
  region
}, reportedCasesMultiplyer) => {
  const numberOfDays = calcluateDays(periodType, timeToElapse);
  const currentlyInfected = reportedCases * reportedCasesMultiplyer;
  const infectionsByRequestedTime = infectionProjections(currentlyInfected, numberOfDays);
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: availableBeds(totalHospitalBeds, severeCasesByRequestedTime),
    casesForICUByRequestedTime: Math.floor(0.05 * infectionsByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.floor(0.02 * infectionsByRequestedTime),
    dollarsInFlight: moneyLost(
      infectionsByRequestedTime,
      region.avgDailyIncomePopulation,
      region.avgDailyIncomeInUSD,
      numberOfDays
    )
  };
};


export const getTimeInMilliseconds = (startTime) => {
  const NS_PER_SEC = 1e9; // time in nano seconds
  const NS_TO_MS = 1e6; // time in milli seconds
  const timeDifference = process.hrtime(startTime);
  return (timeDifference[0] * NS_PER_SEC + timeDifference[1]) / NS_TO_MS;
};

export const saveToFile = (data, filename) => {
  fs.appendFile(filename, `${data}\n`, (err) => {
    if (err) {
      throw new Error('The data could not be saved');
    }
  });
};

export const formatData = (data) => ({
  region: {
    name: data.name,
    avgAge: data.avgAge,
    avgDailyIncomeInUSD: data.avgDailyIncomeInUSD,
    avgDailyIncomePopulation: data.avgDailyIncomePopulation
  },

  periodType: data.periodType,
  timeToElapse: data.timeToElapse,
  reportedCases: data.reportedCases,
  population: data.population,
  totalHospitalBeds: data.totalHospitalBeds
});

export const convertObjectToArrayOfObjects = (object) => {
  const objectArray = Object.keys(object).map((i) => ({ [i]: object[i] }));
  return objectArray;
};
