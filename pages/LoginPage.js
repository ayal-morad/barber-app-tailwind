import { ImageBackground, SafeAreaView, View } from "react-native";
import LoginBoby from "../components/login-body";

export function LoginPage({ navigation }) {
  return (
    <SafeAreaView>
      <LoginBoby navigation={navigation}></LoginBoby>
    </SafeAreaView>
  );
}

export default LoginPage;
