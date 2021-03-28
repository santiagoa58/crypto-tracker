import { percentComparator } from "../columnDefinitions";

test("correctly sorts percentage values (highest value -> lowest value)", () => {
  let percentA: string | undefined = "40.5";
  let percentB: string | undefined = "12";
  //40.5 should be placed higher than 12
  expect(percentComparator(percentA, percentB)).toBeGreaterThan(0);

  percentA = "12";
  percentB = "50";
  //12 should be placed lower than 50
  expect(percentComparator(percentA, percentB)).toBeLessThan(0);

  percentA = undefined;
  percentB = "50";
  //empty value should be placed lower than anything
  expect(percentComparator(percentA, percentB)).toBeLessThan(0);

  percentA = "0.1";
  percentB = undefined;
  //0.1 should be placed higher than an empty value
  expect(percentComparator(percentA, percentB)).toBeGreaterThan(0);

  percentA = undefined;
  percentB = undefined;

  //empty value should be placed lower than anything
  expect(percentComparator(percentA, percentB)).toBeLessThan(0);

  percentA = "-8.4";
  percentB = "0.01";
  //-8.4 should be placed lower than 0.01
  expect(percentComparator(percentA, percentB)).toBeLessThan(0);

  percentA = "0";
  percentB = "-0.01";
  //0 should be placed higher than an -0.01
  expect(percentComparator(percentA, percentB)).toBeGreaterThan(0);

  percentA = "120";
  percentB = "120";
  //values should be equal
  expect(percentComparator(percentA, percentB)).toBe(0);
});
