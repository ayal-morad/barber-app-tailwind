import { SafeAreaView } from "react-native";
import NavBar from "../components/nav_bar";
import LoginBoby from "../components/login-body";

export function LoginPage({ navigation }) {
  return (
    <SafeAreaView>
      <NavBar></NavBar>
      <LoginBoby navigation={navigation}></LoginBoby>
    </SafeAreaView>
  );
}

export default LoginPage;
