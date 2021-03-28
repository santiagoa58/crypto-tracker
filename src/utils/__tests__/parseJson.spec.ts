import { jsonToString } from "../parseJson";

test("Correctly converts object to JSON string", () => {
  const obj = { fruit: "apple", color: "red", expiration: 161 };
  const jsonString = jsonToString(obj);
  expect(jsonString).toBeDefined();
  expect(jsonString).toBe('{"fruit":"apple","color":"red","expiration":161}');

  expect(JSON.parse(jsonString!)).toEqual(obj);

  expect(jsonToString(123)).toEqual("123");
  expect(jsonToString("sample text")).toEqual('"sample text"');
  expect(jsonToString([1, 2, 3])).toEqual("[1,2,3]");
});

test("does not throw when attempting to convert to JSON string", () => {
  expect(jsonToString).not.toThrow();

  expect(jsonToString(Symbol(123))).toBeUndefined();
  expect(jsonToString(() => {})).toBeUndefined();
});
