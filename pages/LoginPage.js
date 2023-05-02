import { SafeAreaView, Text } from "react-native";
import LoginBoby from "../components/login-body";

export function LoginPage({ navigation }) {
  return (
    <SafeAreaView>
      <LoginBoby navigation={navigation}></LoginBoby>
      <Text className="self-center text-blue-500 ">Developer @Ayal-morad</Text>
    </SafeAreaView>
  );
}

export default LoginPage;
