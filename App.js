import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase";
{
  /* import pages */
}
import NavBar from "./components/nav_bar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import BookingPage from "./pages/bookingPage";
import EditDataPage from "./pages/editDataPage";
import UserProfilePage from "./pages/userProfilePage";
import ShowdataPage from "./pages/showdataPage";
import EditClientPage from "./pages/editClientPage";
{
  /* import pages */
}
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavBar></NavBar>
      <View className="bg-white pb-1"></View>
      <Stack.Navigator
        initialRouteName={auth.currentUser ? "homePage" : "LoginPage"}
      >
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
        <Stack.Screen
          name="editDataPage"
          component={EditDataPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userProfilePage"
          component={UserProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="showDataPage"
          component={ShowdataPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="editClientPage"
          component={EditClientPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
