import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { resetPhoneNumber } from "../firebase";
import { auth, database } from "../firebase";
import { get, child, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
export default function UserProfilePage() {
  const [myAppointment, setAppointment] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  useEffect(() => {
    get(child(ref(database), `FirasApp/Users/${auth.currentUser.uid}`))
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (snapshot.exists()) {
            let flg = false;
            if (child.key == "IsBooked") {
              if (child.val() == false) {
                setAppointment("Non");
              } else {
                flg = true;
                const str = child.val();
                let st = "";
                let i = 0;
                let ind = 0;
                let flg = true;
                while (i < str.length) {
                  const pos = str.substring(ind + 1, i);
                  if (flg && pos == "FirasData") {
                    st = "Firas - ";
                    flg = false;
                  }
                  if (flg && pos == "JolianData") {
                    st = "Jolian - ";
                    flg = false;
                  }
                  if (
                    pos == "sunday" ||
                    pos == "monday" ||
                    pos == "tuesday" ||
                    pos == "wednesday" ||
                    pos == "thursday" ||
                    pos == "friday" ||
                    pos == "saturday"
                  ) {
                    st += pos + " - ";
                  }
                  if (str[i] == "/") {
                    ind = i;
                  }
                  i++;
                }
                st += str.substring(ind + 1);
                setAppointment(st);
              }
            }
            if (child.key == "phoneNumber") {
              setUserPhoneNumber(child.val());
            }
            if (!flg) {
              setAppointment("Non");
            }
          }
        });
      })
      .catch(() => {
        setAppointment("proplem with you'r connection");
      });
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/94/eb/fd/94ebfd36d48139122e838e9b20497076.jpg",
      }}
      resizeMode="cover"
      className="flex-1 absolute top-0 bottom-0 left-0 right-0"
    >
      <View className="p-2">
        <View className="bg-black w-44 items-center rounded-lg">
          <Text className="text-white font-bold text-lg">User profile</Text>
        </View>
        <View className="bg-black w-80 items-center rounded-lg mt-2">
          <Text className="text-white font-bold text-lg">
            Email : {auth.currentUser.email}
          </Text>
        </View>
        <View className="bg-black w-44 items-center rounded-lg mt-2">
          <Text className="text-white font-bold text-lg">
            IsVerified : {auth.currentUser.emailVerified ? "Yes" : "No"}
          </Text>
        </View>
        <View className="bg-black w-96 items-center rounded-lg mt-2">
          <Text className="text-white font-bold text-lg">
            My appointment : {myAppointment}
          </Text>
        </View>

        <View className="bg-black w-64 mr-1 items-center rounded-lg mt-2">
          <Text className="text-white font-bold text-lg">
            phone number : {userPhoneNumber}
          </Text>
        </View>
        <View className="flex-row">
          <TextInput
            onChangeText={(text) => {
              setNewPhoneNumber(() => text);
            }}
            placeholder="Chang you'r phone number"
            placeholderTextColor={"#FFFFFF"}
            inputMode="decimal"
            className="px-3 text-lg text-white flex-1 mr-2 bg-black mt-2 border-red-400 border-2 rounded-md"
          />
          <TouchableOpacity
            className="w-32 h-9 bg-red-500 rounded-lg mt-2 justify-center"
            onPress={() => {
              if (
                newPhoneNumber.length == 10 &&
                newPhoneNumber[0] == "0" &&
                newPhoneNumber[1] == 5
              ) {
                resetPhoneNumber(
                  `FirasApp/Users/${auth.currentUser.uid}/phoneNumber`,
                  newPhoneNumber
                );
                Alert.alert("Success", "Phone number has ben changed");
                setUserPhoneNumber(newPhoneNumber);
              } else {
                Alert.alert(
                  "Change error",
                  "you'r input is not correct please check you'r input"
                );
              }
            }}
          >
            <Text className="text-center text-white font-bold text-lg">
              Change
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
