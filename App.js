import * as React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import NavBar from "./components/nav_bar";
import HomePage from "./pages/HomePage";
import { auth } from "./firebase";
import AdminPage from "./pages/AdminPage";
import BookingPage from "./pages/bookingPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavBar></NavBar>
      <Stack.Navigator initialRouteName={auth.currentUser ? "homePage" : "LoginPage"}>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registerPage"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="homePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="adminPage"
          component={AdminPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bookingPage"
          component={BookingPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
