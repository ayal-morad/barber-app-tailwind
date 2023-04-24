import { View, TextInput } from "react-native";
import NavBar from "../components/nav_bar";
import RegisterBody from "../components/register-body";
function RegisterPage({ navigation }) {
  return (
    <View>
      <View className="bg-white pb-2">
        <NavBar></NavBar>
      </View>
      <RegisterBody navigation={navigation}></RegisterBody>
    </View>
  );
}
export default RegisterPage;
