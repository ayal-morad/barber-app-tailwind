import { Text, View, ImageBackground } from "react-native";
import { auth, database } from "../firebase";
import { get, child, ref } from "firebase/database";
import { useState, useEffect } from "react";
export default function UserProfilePage() {
  const [myAppointment, setAppointment] = useState("");
  useEffect(() => {
    get(child(ref(database), `FirasApp/Users/${auth.currentUser.uid}/IsBooked`))
      .then((snapshot) => {
        if (!snapshot.exists() || snapshot.val() == false) {
          setAppointment("Non");
        } else {
          const str = snapshot.val();
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
      })
      .catch(() => {
        setAppointment("proplem with you'r connection");
      });
  });
  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/94/eb/fd/94ebfd36d48139122e838e9b20497076.jpg",
      }}
      resizeMode="cover"
      className="flex-1 absolute top-0 bottom-0 left-0 right-0"
    >
      <View className="p-2">
        <Text className="text-white font-bold text-lg">User profile page</Text>
        <Text className="text-white font-bold text-lg">
          Email : {auth.currentUser.email}
        </Text>
        <Text className="text-white font-bold text-lg">
          IsVerified : {auth.currentUser.emailVerified ? "Yes" : "No"}
        </Text>
        <Text className="text-white font-bold text-lg">
          My appointment : {myAppointment}
        </Text>
      </View>
    </ImageBackground>
  );
}
