import {
  impactCalculator
} from './helpers';

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impactCalculator({ ...data }, 10),
  severeImpact: impactCalculator({ ...data }, 50)
});

export const formatAPIResponse = (estimateValues) => covid19ImpactEstimator(estimateValues);

// export const formatAPIResponse = (estimateValues) => {
//   const { impact, severeImpact, data } = covid19ImpactEstimator(estimateValues);
//   const estimatedValues = {
//     data,
//     estimate: {
//       impact, severeImpact
//     }
//   };

//   return estimatedValues;
// };

export const jsonResponse = (request, response) => {
  const result = request.body;
  response.status(200).send(formatAPIResponse(result));
};

export default covid19ImpactEstimator;
