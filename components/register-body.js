import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView } from "react-native";
import { database, auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { set, ref } from "firebase/database";
import { supMessage } from "./login-body";

function RegisterBody({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(() => "");
  const [isRegistered, setIsRegitered] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    if (code != "Fj$#") {
      setErrorMessage("the barber code not correct");
    } else {
      if (name.length < 3) {
        setErrorMessage("user name not correct");
      } else {
        if (phone.length != 10 || (phone[0] != "0" && phone[1] != "5")) {
          setErrorMessage("phone number not correct");
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const US = userCredential.user;
              set(ref(database, "FirasApp/Users/" + US.uid), {
                username: name,
                phoneNumber: phone,
              }).then(() => {
                setIsRegitered(true);
                sendEmailVerification(auth.currentUser).then(() => { });
                Alert.alert(
                  "Success",
                  "We sent to you'r email a verification message check it"
                );
                navigation.navigate("homePage");
              }).catch(() => { });
            }).catch((error) => {
              setErrorMessage(supMessage(error.message));
            });
        }
      }

    }

  }

  return (
    <ScrollView>
      <View className="flex-col items-center justify-center mt-20">
        {/* error text */}
        <Text className="text-red-500">{errorMessage}</Text>
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
          inputMode="decimal"
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
          className="border-black border-2 w-4/5 h-16 pl-2  mb-7 rounded-md"
        ></TextInput>

        {/* code input */}
        <TextInput
          onChangeText={(current) => setCode(current)}
          placeholder="enter your barber code"
          className="border-red-500 border-2 w-3/5 h-16 pl-2 rounded-md"
        ></TextInput>

        {/* signUp button */}

        <TouchableOpacity
          onPress={() => {
            register();
          }}
        >
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
    </ScrollView>
  );
}
export default RegisterBody;
