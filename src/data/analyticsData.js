export const historicalData = [
  { day: 'Day 1', avgFill: 40, "BIN-001": 20, "BIN-002": 50, "BIN-003": 50 },
  { day: 'Day 2', avgFill: 50, "BIN-001": 22, "BIN-002": 65, "BIN-003": 63 },
  { day: 'Day 3', avgFill: 65, "BIN-001": 24, "BIN-002": 72, "BIN-003": 99 }
];

export const calculatePrediction = (currentFill, pastFill) => {
  const delta = currentFill - pastFill;
  const prediction = currentFill + delta;
  return prediction > 100 ? 100 : prediction < 0 ? 0 : prediction;
};
