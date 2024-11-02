import { act, cleanup, renderHook } from "@testing-library/react-native";
import useToggle from "../useToggle";

afterEach(cleanup);

describe("Testing 'useToggle' hook", () => {
    test("Boolean should flip after function is called", async () => {
        const { result } = renderHook(useToggle, { initialProps: false });

        await act(result.current[1]);
        expect(result.current[0]).toBe(true);

        await act(result.current[1]);
        expect(result.current[0]).toBe(false);
    });
});
