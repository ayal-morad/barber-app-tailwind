import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import BarberCard from "../components/barberCard";
import { database } from "../firebase";
import { ref, get, child } from "firebase/database";
import { sendEmailVerification, onIdTokenChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { Bars3Icon } from "react-native-heroicons/outline";

export function HomePage({ navigation }) {
  {
    /* to get data from real time data base */
  }

  const myRef = ref(database);

  {
    /* if the user is admin as the constent is true else flase */
  }

  const [IsAdmin, setIsAdmin] = useState(false);
  const [weSentMessage, setweSentMessage] = useState(false);

  {
    /* check is the accunt virfid */
  }
  const [isVirfid, setIsVerfid] = useState(auth.currentUser.emailVerified);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (user) {
        user.reload();
        setIsVerfid(user.emailVerified);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  {
    /* get the IsAdmin from the data base */
  }

  function getClintAdmin() {
    get(child(myRef, `FirasApp/Users/${auth.currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists) {
          snapshot.forEach((child) => {
            if (child.key == "IsAdmin") {
              setIsAdmin(true);
            }
          });
        }
      })
      .catch();
  }
  getClintAdmin();

  return (
    <View className="flex-1 items-center">
      <View className="bg-gray-600 w-full h-20"></View>
      <View className="bg-gray-600 w-full h-1/3 rounded-b-full items-center">
        <Text className="text-black font-bold">Barber Shop</Text>
        <Text className="text-black font-bold text-2xl">Book now</Text>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/5e/9d/79/5e9d79ae91a5a946ac8695a1d45e05c2.jpg",
          }}
          className="absolute -bottom-10 h-24 w-24 rounded-full"
        />
      </View>
      <View className="w-full flex-col mt-24">
        <TouchableOpacity
          className="w-full items-center"
          onPress={() => {
            if (IsAdmin) {
              navigation.navigate("adminPage", {
                dn: "FirasData",
              });
            } else {
              if (isVirfid) {
                navigation.navigate("bookingPage", { dataName: "FirasData" });
              } else {
                if (!weSentMessage) {
                  sendEmailVerification(auth.currentUser)
                    .then(() => {
                      setweSentMessage(true);
                    })
                    .catch(() => {});
                }

                Alert.alert(
                  "Email Security",
                  "You'r email is not verified , pleaze check you'r email box we sent you a verifition link",
                  [
                    {
                      text: "OK",
                    },
                  ],
                  { cancelable: false }
                );
              }
            }
          }}
        >
          <BarberCard name="firas"></BarberCard>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full items-center mt-5"
          onPress={() => {
            if (IsAdmin) {
              navigation.navigate("adminPage", {
                dn: "JolianData",
              });
            } else {
              if (isVirfid) {
                navigation.navigate("bookingPage", {
                  dataName: "JolianData",
                });
              } else {
                if (!weSentMessage) {
                  sendEmailVerification(auth.currentUser)
                    .then(() => {
                      setweSentMessage(true);
                    })
                    .catch(() => {});
                }

                Alert.alert(
                  "Email Security",
                  "You'r email is not verified , pleaze check you'r email box we sent you a verifition link",
                  [
                    {
                      text: "OK",
                    },
                  ],
                  { cancelable: false }
                );
              }
            }
          }}
        >
          <BarberCard name="jolian"></BarberCard>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="absolute bottom-7 right-3"
        onPress={() => navigation.navigate("userProfilePage")}
      >
        <View className="h-14 w-14 rounded-full bg-white items-center justify-center border-2 border-blue-400">
          <Bars3Icon color={"#68BBE3"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomePage;
