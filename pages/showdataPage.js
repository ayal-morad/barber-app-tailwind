import { View, Text, ScrollView, Button } from "react-native";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { onValue, ref, off } from "firebase/database";

export default function ShowdataPage({ route, navigation }) {
  const { dataName, day, date } = route.params;
  const [arr, setArr] = useState(() => []);

  useEffect(() => {
    const myRef = ref(database, `FirasApp/${dataName}/${day}/times`);
    const listener = onValue(myRef, (snapshot) => {
      if (snapshot.exists()) {
        const values = Object.values(snapshot.val());
        const keys = Object.keys(snapshot.val());
        const a = keys.map((val, ind) => {
          return [val, values[ind]];
        });
        setArr(() => a);
      }
    });

    if (myRef._events && myRef._events.value && !myRef._events.value.length) {
      myRef.on("value", listener);
    }

    return () => {
      off(myRef, "value", listener);
    };
  }, []);

  return (
    <View className="p-2">
      <Text>
        {dataName} {day} {date}
      </Text>
      {/* show the times array */}
      <ScrollView>
        {arr.map((val, ind) => {
          return (
            <View className="items-center mb-2" key={ind}>
              <View className="flex-row w-11/12 border-black border-2 rounded-md p-5">
                <Text className="flex-1 font-bold">{val[0]}</Text>
                {val[1] ? (
                  <Button
                    title="edit client"
                    onPress={() => {
                      navigation.navigate("editClientPage", {
                        path: `/FirasApp/Users/${val[1]}`,
                        timePath: `FirasApp/${dataName}/${day}/times/${val[0]}`,
                      });
                    }}
                  ></Button>
                ) : (
                  <Text className="font-bold">no client</Text>
                )}
              </View>
            </View>
          );
        })}
        <View className="h-10"></View>
      </ScrollView>
    </View>
  );
}
