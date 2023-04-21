import { View, TextInput } from "react-native";
import NavBar from "../components/nav_bar";
import RegisterBody from "../components/register-body";
function RegisterPage({ navigation }) {
  return (
    <View>
      <NavBar></NavBar>
      <RegisterBody navigation={navigation}></RegisterBody>
    </View>
  );
}
export default RegisterPage;
