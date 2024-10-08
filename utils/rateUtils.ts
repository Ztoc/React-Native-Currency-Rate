export const sortRates = (rates: any[]) =>
  [...rates].sort((a, b) => a.rate - b.rate);

export const filterUniqueRates = (
  lowestRate: any,
  highestRate: any,
  rates: any[]
) =>
  [
    lowestRate,
    highestRate,
    ...rates.filter((r) => r !== lowestRate && r !== highestRate),
  ].filter(Boolean);
