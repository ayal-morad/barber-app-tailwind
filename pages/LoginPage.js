import { SafeAreaView, View } from "react-native";
import NavBar from "../components/nav_bar";
import LoginBoby from "../components/login-body";

export function LoginPage({ navigation }) {
  return (
    <SafeAreaView>
      <View className="bg-white pb-2">
        <NavBar></NavBar>
      </View>
      <LoginBoby navigation={navigation}></LoginBoby>
    </SafeAreaView>
  );
}

export default LoginPage;
