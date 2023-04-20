import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import LoginBoby from "./components/login-body";
import NavBar from "./components/nav_bar";

export default function App() {
  return (
    <SafeAreaView>
      <NavBar></NavBar>
      <LoginBoby></LoginBoby>
    </SafeAreaView>
  );
}
