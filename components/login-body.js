import { useState } from "react";
import { register, login } from "../firebase";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";

function LoginBoby() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex-col items-center justify-center">
      <TextInput
        onChangeText={(current) => setEmail(current)}
        placeholder="enter your email"
        className="border-black border-2 w-4/5 h-16 pl-2 mt-48 mb-7 rounded-md"
      ></TextInput>
      <TextInput
        onChangeText={(current) => setPassword(current)}
        placeholder="enter your password"
        className="border-black border-2 w-4/5 h-16 pl-2 rounded-md"
      ></TextInput>
      <TouchableOpacity onPress={() => login(email, password)}>
        <View className="flex mt-5 bg-black w-40 h-10 justify-center items-center">
          <Text className="text-white">SignIn</Text>
        </View>
      </TouchableOpacity>
      <View className="flex-row mt-2">
        <Text>to signup click</Text>
        <Text className="text-blue-600"> here</Text>
      </View>
    </View>
  );
}
export default LoginBoby;
