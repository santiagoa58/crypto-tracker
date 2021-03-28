import { isDefined, isNumber } from "../isDefined";

test.each`
  value         | expected
  ${null}       | ${false}
  ${undefined}  | ${false}
  ${false}      | ${true}
  ${true}       | ${true}
  ${""}         | ${true}
  ${0}          | ${true}
  ${{}}         | ${true}
  ${NaN}        | ${true}
  ${[]}         | ${true}
  ${() => {}}   | ${true}
  ${Symbol(12)} | ${true}
`(
  "correctly determines if the value $value is defined",
  ({ value, expected }) => {
    expect(isDefined(value)).toBe(expected);
  },
);

test.each`
  value         | expected
  ${null}       | ${false}
  ${undefined}  | ${false}
  ${false}      | ${false}
  ${true}       | ${false}
  ${""}         | ${false}
  ${"123"}      | ${false}
  ${NaN}        | ${false}
  ${{}}         | ${false}
  ${[]}         | ${false}
  ${[1]}        | ${false}
  ${() => {}}   | ${false}
  ${Symbol(12)} | ${false}
  ${0}          | ${true}
  ${123}        | ${true}
`(
  "correctly determines if the value $value is a finite number",
  ({ value, expected }) => {
    expect(isNumber(value)).toBe(expected);
  },
);
