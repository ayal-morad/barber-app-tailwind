import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
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
        auth.currentUser.reload();
        setIsVerfid(user.emailVerified);
      }
    });
    return unsubscribe;
  });

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
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/94/eb/fd/94ebfd36d48139122e838e9b20497076.jpg",
      }}
      resizeMode="cover"
      className="flex-1 absolute top-0 bottom-0 left-0 right-0"
    >
      <View className="flex-1 items-center mt-5">
        <View className="absolute top-8 border-black border-2 rounded-lg px-7 py-1 bg-black">
          <Text className="text-white">Chose you'r barber</Text>
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
          <View className="h-14 w-14 rounded-full bg-white items-center justify-center">
            <Bars3Icon color={"#68BBE3"} />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default HomePage;
