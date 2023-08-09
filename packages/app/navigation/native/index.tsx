import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/home/screen";

const Stack = createNativeStackNavigator<{
    home: undefined;
}>();

export function NativeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
