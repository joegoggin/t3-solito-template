import { render, screen } from "@testing-library/react-native";
import { Provider } from "app/provider";
import HomeScreen from "app/screens/home/HomeScreen";

describe("Home Screen", () => {
    test("Home Screen renders properly", async () => {
        render(
            <Provider>
                <HomeScreen />
            </Provider>
        );

        const heading = await screen.findByText("T3 Solito Template");

        expect(heading).toBeTruthy();
    });
});
