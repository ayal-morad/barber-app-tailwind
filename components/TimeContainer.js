import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "react-native-heroicons/solid";
import { set, get, child, ref } from "firebase/database";
import { auth, database } from "../firebase";

export default function TimeContainer({ time, day, dataName }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isBookedA, setIsBookedA] = useState("Book");

  function bookARole(dataName, day, time) {
    get(
      child(ref(database), `FirasApp/Users/${auth.currentUser.uid}/IsBooked`)
    ).then((snapshot) => {
      if (snapshot.exists() && snapshot.val() != false) {
        setIsBookedA("can't");
      } else {
        get(child(ref(database), `FirasApp/${dataName}/${day}/times/${time}`))
          .then((snap) => {
            if (snap.val() != false) {
              console.log("from bookarole isTaken : ", snapshot.val());
              setIsBookedA("can't");
            } else {
              set(
                ref(database, `FirasApp/${dataName}/${day}/times/${time}`),
                auth.currentUser.uid
              )
                .then(() => {
                  set(
                    ref(
                      database,
                      `FirasApp/Users/${auth.currentUser.uid}/IsBooked`
                    ),
                    `FirasApp/${dataName}/${day}/times/${time}`
                  )
                    .then(() => {
                      setIsBookedA("Booked");
                    })
                    .catch(() => {
                      setIsBookedA("!Net");
                    });
                })
                .catch(() => {
                  setIsBookedA("!Net");
                });
            }
          })
          .catch(() => {
            setIsBookedA("!Net");
          });
      }
    });
  }

  return (
    <View className="self-center mb-5 flex-row items-center justify-start w-11/12 h-14 bg-white p-2 rounded-md shadow-black shadow-lg">
      <Text className="flex-1">{time}</Text>
      {!isPressed ? (
        <TouchableOpacity onPress={() => setIsPressed(true)}>
          <ChevronDoubleRightIcon color={"#68BBE3"} />
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              setIsPressed(false);
              setIsBookedA("Book");
            }}
          >
            <ChevronDoubleLeftIcon color={"#FF0000"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bookARole(dataName, day, time);
            }}
          >
            <View className="py-1 px-3 ml-2 bg-black rounded-md">
              <Text className="text-white text-center">{isBookedA}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
