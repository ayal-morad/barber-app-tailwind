import { View, Text, Image } from "react-native";
import { AtSymbolIcon, ScissorsIcon } from "react-native-heroicons/solid";

export default function BarberCard(props) {
  return (
    <View className="bg-gray-300 w-3/4 rounded-lg p-3">
      <View className="flex-row items-center">
        <Image
          source={{
            uri: "https://images.squarespace-cdn.com/content/54b98b1ce4b0b6737df46009/1424555429439-LUIIC13XM32KXFRB9ETQ/barber.png?format=1000w&content-type=image%2Fpng",
          }}
          alt="logo"
          className="h-10 w-10"
        />
        <AtSymbolIcon color="black" />
        <Text className="flex-1 text-lg font-bold mr-2">{props.name}</Text>
        <ScissorsIcon color="black" />
        <Text className="text-lg font-bold">- - -</Text>
      </View>
    </View>
  );
}
