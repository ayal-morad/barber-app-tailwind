import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get, child } from "firebase/database";

function NavBar() {
  const myRef = ref(database)
  const [user, setUser] = useState("hello");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(child(myRef, `FirasApp/Users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
              if (child.key === "username") {
                setUser(child.val());
              }
            })
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  });
  return (
    <View className="flex-row mt-11 mx-1">
      <View className="flex-row flex-1">
        <Image
          source={{
            uri: "https://graphicriver.img.customer.envatousercontent.com/files/346739128/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=926b2d00e1a79d311ab9e1c85b5787f3",
          }}
          className="w-14 h-14 rounded-full"
        />
        <View className="ml-1">
          <Text className="text-xl font-bold">Wellcome Back</Text>
          <Text>Firas barber!</Text>
        </View>
      </View>
      <Text>{user}</Text>
    </View>
  );
}
export default NavBar;
