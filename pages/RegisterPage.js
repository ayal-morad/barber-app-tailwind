import { View, TextInput } from "react-native";
import RegisterBody from "../components/register-body";
function RegisterPage({ navigation }) {
  return (
    <View>
      <View className="bg-white pb-2">
      </View>
      <RegisterBody navigation={navigation}></RegisterBody>
    </View>
  );
}
export default RegisterPage;
