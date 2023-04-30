import { child, get, ref } from "firebase/database";
import { database } from "../firebase";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { BanknotesIcon } from "react-native-heroicons/solid";

export default function AdminPage({ navigation, route }) {
  const { dn } = route.params;
  const [dataName, setDataName] = useState(dn);
  const [day, setDay] = useState("sunday");
  const [isWork, setIsWork] = useState("No");
  const [isLoading, setIsLoading] = useState(() => true);
  const [date, setDate] = useState("");

  const [times, setTimes] = useState(() => {
    let snp = [];
    get(child(ref(database), "FirasApp/" + dataName + "/" + day))
      .then((snapshot) => {
        if (snapshot.exists) {
          let timeIsExest = false;
          snapshot.forEach((child) => {
            if (child.key == "date") {
              setDate(child.val());
            }
            if (child.key == "isWorkDay") {
              setIsWork(child.val());
            }
            if (child.key === "times") {
              timeIsExest = true;
              Object.entries(child.val()).forEach(([key, value]) => {
                // times[["12;00" , false] , ["12;30" , false] , ["13;00" , true]]
                snp.push([key, value]);
              });
              return snp;
            }
          });
          if (!timeIsExest) {
            return [];
          }
        } else {
          return [];
        }
      })
      .catch(() => []);
    return snp;
  });

  useEffect(() => {
    setIsLoading(true);
    let snp = [];
    get(child(ref(database), "FirasApp/" + dataName + "/" + day))
      .then((snapshot) => {
        if (snapshot.exists) {
          let timeIsExest = false;
          snapshot.forEach((child) => {
            if (child.key === "date") {
              setDate(child.val());
            }
            if (child.key === "times") {
              timeIsExest = true;
              Object.entries(child.val()).forEach(([key, value]) => {
                // times[["12;00" , false] , ["12;30" , false] , ["13;00" , true]]
                snp.push([key, value]);
              });
              setTimes(snp);
            }
            if (child.key == "isWorkDay") {
              setIsWork(child.val());
            }
          });
          if (!timeIsExest) {
            setTimes([]);
          }
        } else {
          setTimes([]);
        }
      })
      .catch(() => []);
    setTimes(snp);
  }, [day, dataName]);

  const [jsxE, setjsxE] = useState(() => {
    let arr = times.map((val, ind) => {
      return (
        <View key={ind}>
          <Text>{val[0]}</Text>
        </View>
      );
    });
    return arr;
  });
  // map changs
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimes((prevArray) => [...prevArray]);
      setIsLoading(false);
    });
    let arr = times.map((val, ind) => {
      return (
        <View key={ind}>
          <Text>{val[0]}</Text>
        </View>
      );
    });
    setjsxE(arr);

    return () => clearInterval(intervalId);
  }, [times]);

  return (
    <View className="flex-col items-start mt-2">
      <View className="flex-row ml-2 self-center">
        <TouchableOpacity
          className="mr-2"
          onPress={() => {
            setDataName("FirasData");
          }}
        >
          <View className="bg-black py-2 px-8 rounded-md">
            <Text className="text-white">Firas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDataName("JolianData");
          }}
        >
          <View className="bg-black py-2 px-8 rounded-md">
            <Text className="text-white">Jolian</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row">
        {/* day's */}

        <View className="mt-5 ml-2">
          {/* data name */}
          <Text className="text-lg ml-2">{dataName}</Text>

          {/* sunday */}
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              setDay("sunday");
            }}
          >
            <View className="bg-black py-1 px-8 rounded-2xl">
              <Text className="text-white text-lg">Sun</Text>
            </View>
          </TouchableOpacity>

          {/* monday */}
          <TouchableOpacity
            className="mt-4"
            onPress={async () => {
              setDay((pres) => "monday");
            }}
          >
            <View className="bg-black py-1 px-8 rounded-2xl">
              <Text className="text-white text-lg">Mon</Text>
            </View>
          </TouchableOpacity>

          {/* tuesday */}
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              setDay("tuesday");
            }}
          >
            <View className="bg-black py-1 px-8 rounded-2xl">
              <Text className="text-white text-lg">Tue</Text>
            </View>
          </TouchableOpacity>

          {/* wednesday */}
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              setDay("wednesday");
            }}
          >
            <View className="bg-black py-1 px-8 rounded-2xl">
              <Text className="text-white text-lg">Wed</Text>
            </View>
          </TouchableOpacity>

          {/* thursday */}
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              setDay("thursday");
            }}
          >
            <View className="bg-black py-1 px-8 rounded-2xl">
              <Text className="text-white text-lg">Thu</Text>
            </View>
          </TouchableOpacity>

          {/* friday */}
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              setDay("friday");
            }}
          >
            <View className="bg-black py-1 px-8 rounded-2xl">
              <Text className="text-white text-lg">Fri</Text>
            </View>
          </TouchableOpacity>

          {/* saturday */}
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              setDay("saturday");
            }}
          >
            <View className="bg-black py-1 px-8 rounded-2xl">
              <Text className="text-white text-lg">Sat</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* display data */}

        <View className="flex-1 h-4/4 bg-white mt-5 ml-2 mr-2 shadow-xl shadow-black pl-2 pb-1">
          <View className="flex-row items-center">
            {isLoading ? (
              <ActivityIndicator color="#000000" size={"small"} />
            ) : (
              <Text className="text-sm">
                {isWork == "Yes" ? "work day :" : "not work day :"}
              </Text>
            )}
            <Text className="text-lg">
              {day} | {date}
            </Text>
            <BanknotesIcon color="#000000" />
          </View>

          {jsxE}
        </View>
      </View>
      {/* edit button */}
      <View className="flex-row self-center mt-5 ">
        <TouchableOpacity
          onPress={() => {
            data = {
              dataName,
              day,
              date,
              times,
            };
            navigation.navigate("editDataPage", { data });
          }}
        >
          <View className="bg-black py-2 px-8 rounded-md">
            <Text className="text-white">Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="ml-5"
          onPress={() => {
            navigation.navigate("showDataPage", {
              dataName: dataName,
              day: day,
              date: date,
            });
          }}
        >
          <View className="bg-black py-2 px-8 rounded-md">
            <Text className="text-white">Show</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
