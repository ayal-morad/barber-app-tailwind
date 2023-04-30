import { View, TextInput } from "react-native";
import RegisterBody from "../components/register-body";
function RegisterPage({ navigation }) {
  return (
    <View>
      <RegisterBody navigation={navigation}></RegisterBody>
    </View>
  );
}
export default RegisterPage;
