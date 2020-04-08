const moneyLost = (infectionsByRequestedTime, percentageIncome, avgIncome, days) => {
  const estimatedLoss = infectionsByRequestedTime * percentageIncome * avgIncome * days;
  return Number.parseFloat(estimatedLoss).toFixed(2);
};

const calcluateDays = (periodType, value) => {
  switch (periodType) {
    case 'months':
      return value * 30;

    case 'weeks':
      return value * 7;

    default:
      return value;
  }
};

const infectionProjections = (currentlyInfected, days) => {
  const projection = currentlyInfected * (2 ** Math.trunc(days / 3));
  return projection;
};

const availableBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const occupied = 0.65 * totalHospitalBeds;
  const available = totalHospitalBeds - occupied;
  return available - severeCasesByRequestedTime;
};

const impactCalculator = ({
  reportedCases,
  totalHospitalBeds,
  periodType,
  timeToElapse,
  region
}) => {
  const numberOfDays = calcluateDays(periodType, timeToElapse);
  const currentlyInfected = reportedCases * 10;
  const infectionsByRequestedTime = infectionProjections(currentlyInfected, numberOfDays);
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: availableBeds(totalHospitalBeds, severeCasesByRequestedTime),
    casesForICUByRequestedTime: 0.05 * infectionsByRequestedTime,
    casesForVentilatorsByRequestedTime: 0.02 * infectionsByRequestedTime,
    dollarsInFlight: moneyLost(
      infectionsByRequestedTime,
      region.avgDailyIncomePopulation,
      region.avgDailyIncomeInUSD,
      numberOfDays
    )
  };
};

const severeImpactCalculator = ({
  reportedCases,
  totalHospitalBeds,
  periodType,
  timeToElapse,
  region
}) => {
  const numberOfDays = calcluateDays(periodType, timeToElapse);
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = infectionProjections(currentlyInfected, numberOfDays);
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: availableBeds(totalHospitalBeds, severeCasesByRequestedTime),
    casesForICUByRequestedTime: 0.05 * infectionsByRequestedTime,
    casesForVentilatorsByRequestedTime: 0.02 * infectionsByRequestedTime,
    dollarsInFlight: moneyLost(
      infectionsByRequestedTime,
      region.avgDailyIncomePopulation,
      region.avgDailyIncomeInUSD,
      numberOfDays
    )
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactCalculator({ ...data }),
  severeImpact: severeImpactCalculator({ ...data })
});

export default covid19ImpactEstimator;
