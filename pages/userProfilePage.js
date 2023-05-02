import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { resetPhoneNumber } from "../firebase";
import { auth, database } from "../firebase";
import { get, child, ref } from "firebase/database";
import {
  CheckIcon,
  ClipboardDocumentCheckIcon,
} from "react-native-heroicons/outline";
import { useState, useEffect } from "react";
export default function UserProfilePage() {
  const [myAppointment, setAppointment] = useState("Non");
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
                setAppointment(() => "Non");
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
                setAppointment(() => st);
              }
            }
            if (child.key == "phoneNumber") {
              setUserPhoneNumber(child.val());
            }
          }
        });
      })
      .catch(() => {
        setAppointment("proplem with you'r connection");
      });
  }, []);

  return (
    <ScrollView>
      <View className="p-2">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
            }}
            className="h-16 w-16 rounded-full z-30"
          />
          <View className="relative -left-3 bg-white w-80 h-10 items-center rounded-lg border-b-2 border-t-2 border-r-2">
            <Text className="text-black font-bold ">User profile</Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1">
          <Image
            source={{
              uri: "https://m.media-amazon.com/images/I/31JCDJ7rZ5L.png",
            }}
            className="h-16 w-16 rounded-full z-30"
          />
          <View className="relative -left-3 bg-white w-80 items-center rounded-lg border-b-2 border-t-2 border-r-2">
            <Text className="text-black font-bold ">
              {auth.currentUser.email}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1">
          <Image
            source={{
              uri: "https://freeiconshop.com/wp-content/uploads/edd/phone-flat.png",
            }}
            className="w-16 h-16 rounded-full z-30"
          />
          <View className="relative -left-3 bg-white w-80 items-center rounded-lg border-b-2 border-t-2 border-r-2">
            <Text className="text-black font-bold ">{userPhoneNumber}</Text>
          </View>
        </View>
        <View className="bg-gray-600 w-44 items-center rounded-lg mt-2 self-center py-3">
          <Text className="text-white font-bold">
            {auth.currentUser.emailVerified ? (
              <CheckIcon color={"#00ff00"} />
            ) : (
              "No"
            )}
            {"   "} : IsVerified
          </Text>
        </View>
        <View className="bg-gray-600 w-80 self-center py-3 items-center rounded-lg mt-2">
          <Text className="text-white font-bold ">
            <ClipboardDocumentCheckIcon color={"#00ff00"} />
            {"   "} : {myAppointment}
          </Text>
        </View>
        <View className="mt-20">
          <TextInput
            onChangeText={(text) => {
              setNewPhoneNumber(() => text);
            }}
            placeholder="Enter now phone number"
            placeholderTextColor={"#FFFFFF"}
            inputMode="decimal"
            className="px-3 text-white mr-2 h-10 bg-gray-600 border-blue-400 border-2 rounded-md"
          />
          <TouchableOpacity
            className="w-32 h-9 bg-red-500 rounded-lg mt-2 justify-center self-center"
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
                  "you'r input is not correct please check it"
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
    </ScrollView>
  );
}
