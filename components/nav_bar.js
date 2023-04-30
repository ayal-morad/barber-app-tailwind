import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get, child, onValue } from "firebase/database";
import { WrenchScrewdriverIcon, UserIcon } from "react-native-heroicons/solid";

function NavBar() {
  const myRef = ref(database);
  const [user, setUser] = useState(() => {
    if (auth.currentUser) {
      get(child(myRef, `FirasApp/Users/${auth.currentUser.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let flg = false;
            snapshot.forEach((child) => {
              if (child.key === "username") {
                return child.val();
              }
              if (child.key === "IsAdmin") {
                if (child.val() === true) {
                  setIsAdmin(true);
                  flg = true;
                }
              }
            });
            if (!flg) {
              setIsAdmin(false);
            }
          } else {
            return "";
          }
        })
        .catch((error) => {});
    } else {
      return "";
    }
  });
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(child(myRef, `FirasApp/Users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let flg = false;
              snapshot.forEach((child) => {
                if (child.key === "username") {
                  setUser(child.val());
                }
                if (child.key === "IsAdmin") {
                  if (child.val() === true) {
                    setIsAdmin(true);
                    flg = true;
                  }
                }
              });
              if (!flg) {
                setIsAdmin(false);
              }
            } else {
              setUser("");
            }
          })
          .catch((error) => {});
      } else {
        setUser(() => "");
      }
    });
  });

  useEffect(() => {
    if (auth.currentUser) {
      onValue(
        ref(database, `FirasApp/Users/${auth.currentUser.uid}/username`),
        (snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
          }
        }
      );
    }
  }, []);

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
      <View className="flex-row mt-2">
        <Text>{user}</Text>
        {isAdmin ? (
          <WrenchScrewdriverIcon color="black" className="h-8 w-8" />
        ) : (
          <UserIcon color="black" className="h-7 w-7" />
        )}
      </View>
    </View>
  );
}
export default NavBar;
