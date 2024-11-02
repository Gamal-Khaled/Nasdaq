import { cleanup, render, screen } from "@testing-library/react-native";

import variants from "../TextVariants";
import Text from "../Text";

afterEach(cleanup);

describe("Testing 'Text' component", () => {
  test("Should render with default variant if no variant specified", () => {
    render(<Text>Test Text</Text>);

    expect(screen.toJSON()).toMatchSnapshot();
  });
  test("Should render with the specified variant", () => {
    render(
      <Text variant="subtitle" testID="testText">
        Test Text
      </Text>
    );

    expect(screen.getByTestId("testText")).toHaveStyle(variants.subtitle);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
