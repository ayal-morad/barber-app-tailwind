import { View, Text } from "react-native";
import RegisterBody from "../components/register-body";
function RegisterPage({ navigation }) {
  return (
    <View>
      <RegisterBody navigation={navigation}></RegisterBody>
      <Text className="self-center text-blue-500 ">Developer @Ayal-morad</Text>
    </View>
  );
}
export default RegisterPage;
