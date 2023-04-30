import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import DayButtonContainer from "../components/DayButtonContainer";
import TimeContainer from "../components/TimeContainer";
import { useState, useEffect } from "react";
import { get, child, ref } from "firebase/database";
import { database } from "../firebase";
import { Bars3Icon } from "react-native-heroicons/outline";

export default function BookingPage({ route, navigation }) {
  const date = new Date();
  let day = date.getDay();
  const weekday = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  for (let i = 0; i < day; i++) {
    let st = weekday[0];
    for (let j = 0; j < 6; j++) {
      weekday[j] = weekday[j + 1];
    }
    weekday[6] = st;
  }

  const { dataName } = route.params;
  const [loading, setLoading] = useState(true);
  const [bookingDay, setBookingDay] = useState(weekday[0]);
  const [toDayDate, setToDayDate] = useState("");
  const [isDayWorkDay, setIsDayWorkDay] = useState(false);
  const [timeArray, setTimeArray] = useState(() => {
    setLoading(true);
    let snp = [];
    get(child(ref(database), "FirasApp/" + dataName + "/" + bookingDay))
      .then((snapshot) => {
        if (snapshot.exists) {
          let timeIsExest = false;
          snapshot.forEach((child) => {
            if (child.key == "date") {
              setToDayDate(child.val());
            }
            if (child.key == "isWorkDay") {
              setIsDayWorkDay(child.val());
            }
            if (child.key === "times") {
              timeIsExest = true;
              Object.entries(child.val()).forEach(([key, value]) => {
                // times[["12;00" , false] , ["12;30" , false] , ["13;00" , true]]
                snp.push([key, value]);
              });
            }
          });
          if (!timeIsExest) {
            return [];
          }

          return snp;
        } else {
          return [];
        }
      })
      .then(() => {
        setLoading(() => false);
        console.log(loading);
      })
      .catch(() => []);

    return snp;
  });

  useEffect(() => {
    let snp = [];
    get(child(ref(database), "FirasApp/" + dataName + "/" + bookingDay))
      .then((snapshot) => {
        if (snapshot.exists) {
          let timeIsExest = false;
          snapshot.forEach((child) => {
            if (child.key === "date") {
              setToDayDate(child.val());
            }
            if (child.key === "times") {
              timeIsExest = true;
              Object.entries(child.val()).forEach(([key, value]) => {
                // times[["12;00" , false] , ["12;30" , false] , ["13;00" , true]]
                snp.push([key, value]);
              });
              setTimeArray(snp);
            }
            if (child.key == "isWorkDay") {
              setIsDayWorkDay(child.val());
            }
          });
          if (!timeIsExest) {
            setTimeArray([]);
          }
        } else {
          setTimeArray([]);
        }
      })
      .catch(() => []);
  }, [bookingDay]);

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/94/eb/fd/94ebfd36d48139122e838e9b20497076.jpg",
      }}
      resizeMode="cover"
      className="flex-1 absolute top-0 bottom-0 left-0 right-0"
    >
      <View className="h-20">
        <ScrollView horizontal={true}>
          <View className="flex-row mt-3 mr-2 ml-2">
            {weekday.map((str, ind) => {
              return (
                <TouchableOpacity
                  key={ind}
                  onPress={() => {
                    setBookingDay(str);
                  }}
                >
                  <View
                    className={
                      bookingDay == str
                        ? "border-2 border-red-400 rounded-2xl w-32 items-center justify-center"
                        : ""
                    }
                  >
                    <DayButtonContainer day={str} />
                    {bookingDay == str && (
                      <Text className="text-white font-bold">{toDayDate}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ScrollView className="self-center w-full">
        {!loading ? (
          <>
            {timeArray.map((arrChild, ind) => {
              if (arrChild[1] == false) {
                return (
                  <TimeContainer
                    time={arrChild[0]}
                    dataName={dataName}
                    day={bookingDay}
                    key={ind}
                  />
                );
              }
            })}
            <View className="h-20"></View>
          </>
        ) : (
          <ActivityIndicator color={"#ffffff"} />
        )}
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-7 right-3"
        onPress={() => navigation.navigate("userProfilePage")}
      >
        <View className="h-14 w-14 rounded-full bg-white items-center justify-center border-blue-400 border-2">
          <Bars3Icon color={"#68BBE3"} />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
