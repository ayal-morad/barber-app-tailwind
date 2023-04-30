import { View, Text } from "react-native";
export default function DayButtonContainer({ day }) {
  return (
    <View className="flex w-32 h-10 rounded-2xl bg-gray-100 items-center justify-center mx-3 shadow-lg shadow-black">
      <Text className="text-center text-black">{day}</Text>
    </View>
  );
}
