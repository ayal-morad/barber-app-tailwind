import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { register } from "../firebase";
function RegisterBody({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex-col items-center justify-center mt-20">
      {/* name TextInput */}

      <TextInput
        onChangeText={(current) => setName(current)}
        placeholder="enter your name"
        className="border-black border-2 w-4/5 h-16 pl-2 mb-7 rounded-md"
      ></TextInput>

      {/* phone number TextInput */}

      <TextInput
        onChangeText={(current) => {
          setPhone(current);
        }}
        placeholder="enter your phone number"
        className="border-black border-2 w-4/5 h-16 pl-2 mb-7 rounded-md"
      ></TextInput>

      {/* email TextInput */}

      <TextInput
        onChangeText={(current) => setEmail(current)}
        placeholder="enter your email"
        className="border-black border-2 w-4/5 h-16 pl-2 mb-7 rounded-md"
      ></TextInput>

      {/* password TextInput */}

      <TextInput
        secureTextEntry={true}
        onChangeText={(current) => setPassword(current)}
        placeholder="enter your password"
        className="border-black border-2 w-4/5 h-16 pl-2 rounded-md"
      ></TextInput>

      {/* signUp button */}

      <TouchableOpacity onPress={() => register(email, password, name, phone)}>
        <View className="flex mt-5 bg-black w-40 h-10 justify-center items-center">
          <Text className="text-white">signUp</Text>
        </View>
      </TouchableOpacity>

      {/* login navigation text */}

      <View className="flex-row mt-2">
        <Text>if you have an account login </Text>
        <Text
          className="text-blue-600"
          onPress={() => navigation.navigate("LoginPage")}
        >
          here
        </Text>
      </View>
    </View>
  );
}
export default RegisterBody;
