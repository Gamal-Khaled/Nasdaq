import { cleanup, render, screen } from "@testing-library/react-native";

import Header from "../Header";

afterEach(cleanup);

describe("Testing 'Header' component", () => {
  it("Should render", () => {
    render(<Header />);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
