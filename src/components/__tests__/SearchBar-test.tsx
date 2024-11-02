import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";

import SearchBar from "../SearchBar";

afterEach(cleanup);

describe("Testing 'SearchBar' component", () => {
  it("Should render", () => {
    render(<SearchBar onSearch={jest.fn()} />);

    expect(screen.toJSON()).toMatchSnapshot();
  });
  test("Typing should change the input value and onSearch should be called only after timeout once", async () => {
    const mockSearchHandler = jest.fn();
    render(<SearchBar onSearch={mockSearchHandler} />);

    jest.useFakeTimers();
    const user = userEvent.setup();

    const input = screen.getByTestId("searchBar");
    await act(async () => {
      await user.type(input, "test");
    });

    expect(input).toHaveProp("value", "test");
    expect(mockSearchHandler).toHaveBeenCalledTimes(0);

    jest.runAllTimers();
    expect(mockSearchHandler).toHaveBeenCalledWith("test");
  });
  test("onSearch should be called when the user submits", async () => {
    const mockSearchHandler = jest.fn();
    render(<SearchBar onSearch={mockSearchHandler} />);

    jest.useFakeTimers();
    const user = userEvent.setup();

    const input = screen.getByTestId("searchBar");
    await act(async () => {
      await user.type(input, "test");
    });

    expect(input).toHaveProp("value", "test");
    expect(mockSearchHandler).toHaveBeenCalledTimes(0);

    fireEvent(input, "onSubmitEditing");
    expect(mockSearchHandler).toHaveBeenCalledWith("test");
  });
});
