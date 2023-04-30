import { View, Text } from "react-native";
import { database } from "../firebase";
import { onValue, ref } from "firebase/database";

export default function ShowdataPage({ route }) {
  const { dataName, day, date, times } = route.params;
  return (
    <View className="p-2">
      <Text>
        {dataName} {day} {date}
      </Text>
      {/* show the times array */}
      <View className="items-center">
        <View className="flex-row w-11/12 border-black border-2 rounded-md p-5">
          <Text className="flex-1 font-bold">{times[0][0]}</Text>
          <Text className="font-bold">{times[0][1] ? "yes" : "No"}</Text>
        </View>
      </View>
    </View>
  );
}
