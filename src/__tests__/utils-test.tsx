import { cleanup, render, screen } from "@testing-library/react-native";
import { extractParam } from "../utils";

afterEach(cleanup);

describe("Testing extractParam utils", () => {
  it("Should extract a param from the url by name", () => {
    const result = extractParam("google.com?search=developer", "search");

    expect(result).toEqual("developer");
  });
  it("Should return undefined if the param doesn't exist", () => {
    const result = extractParam("google.com?search=developer", "limit");

    expect(result).toBeUndefined();
  });
});
