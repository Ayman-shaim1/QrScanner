import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ErrorMessageScreen, ScanQRCodeScreen, SuccessMessageScreen } from "../screens";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='ScannQr' component={ScanQRCodeScreen} />
        <Stack.Screen name='SuccessMessage' component={SuccessMessageScreen} />
        <Stack.Screen name='ErrorMessage' component={ErrorMessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
