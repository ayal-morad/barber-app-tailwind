import { useState } from "react";
import { auth, database } from "../firebase";
import { get, child, set, ref } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export function supMessage(mes) {
  const len = mes.length;
  let st = "";
  let i = 0;
  while (i < len && mes[i] != "/") {
    i++;
  }
  i++;
  while (i < len && mes[i] != ")") {
    st += mes[i];
    i++;
  }
  return st;
}

function LoginBoby({ navigation }) {
  const [Emessage, setEMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        get(
          child(
            ref(database),
            `FirasApp/Users/${auth.currentUser.uid}/IsBooked`
          )
        ).then((snapshot) => {
          if (snapshot.exists() && snapshot.val() != false) {
            get(child(ref(database), snapshot.val())).then((snp) => {
              if (!snp.exists() || snp.val() != auth.currentUser.uid) {
                set(
                  ref(
                    database,
                    `FirasApp/Users/${auth.currentUser.uid}/IsBooked`
                  ),
                  false
                );
              }
            });
          }
        });
        navigation.navigate("homePage");
      })
      .catch((error) => {
        setEMessage(supMessage(error.message));
      });
  }

  return (
    <View className="flex-col items-center justify-center">
      <View className="absolute top-10">
        <Image
          source={{
            uri: "https://www.pngkit.com/png/full/181-1816831_book-now-barber-shop-chair-vector.png",
          }}
          className="w-32 h-36"
        />
      </View>
      <Text className="mt-48 text-red-500">{Emessage}</Text>
      <TextInput
        onChangeText={(current) => setEmail(current)}
        placeholder="enter your email"
        className="border-black border-2 w-4/5 h-16 pl-2 mb-7 rounded-md"
      ></TextInput>
      <TextInput
        secureTextEntry={true}
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
        <Text>to signup click </Text>
        <Text
          className="text-blue-600"
          onPress={() => navigation.navigate("registerPage")}
        >
          here
        </Text>
      </View>
    </View>
  );
}
export default LoginBoby;
