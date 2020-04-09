import {
  impactCalculator
} from './helpers';

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactCalculator({ ...data }, 10),
  severeImpact: impactCalculator({ ...data }, 50)
});

export default covid19ImpactEstimator;
