import { cleanup, render, screen } from "@testing-library/react-native";

import Header from "../Header";

afterEach(cleanup);

describe("Testing 'Header' component", () => {
  test("Should render with default variant if no variant specified", () => {
    render(<Header />);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
