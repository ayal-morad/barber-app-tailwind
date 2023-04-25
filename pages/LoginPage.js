import { SafeAreaView, View } from "react-native";
import LoginBoby from "../components/login-body";

export function LoginPage({ navigation }) {
  return (
    <SafeAreaView>
      <View className="bg-white pb-2">
      </View>
      <LoginBoby navigation={navigation}></LoginBoby>
    </SafeAreaView>
  );
}

export default LoginPage;
