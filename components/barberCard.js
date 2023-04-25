import { View, Text, Image } from 'react-native'
import { AtSymbolIcon, ScissorsIcon } from "react-native-heroicons/solid";
import { FirasData, JolianData } from './TimeData';

export default function BarberCard(props) {
    {/* get the time data */ }
    let arr = [];
    if (props.name === 'firas') {
        {/* firas data */ }
        Object.keys(FirasData).forEach((key) => {
            console.log(FirasData[key].isWorkDay)
            if (FirasData[key].isWorkDay === true) {
                console.log(FirasData[key].date)
                arr.push(FirasData[key].date)
            }
        })
    } else {
        {/* jolian data */ }
        Object.keys(JolianData).forEach((key) => {
            if (JolianData[key].isWorkDay === true) {
                arr.push(JolianData[key].date)
            }
        })
    }
    {/* get the time data */ }
    return (
        <View className="bg-gray-300 mt-4 w-3/4 rounded-lg p-3">
            <View className="flex-row items-center">
                <Image
                    source={{ uri: 'https://images.squarespace-cdn.com/content/54b98b1ce4b0b6737df46009/1424555429439-LUIIC13XM32KXFRB9ETQ/barber.png?format=1000w&content-type=image%2Fpng' }}
                    alt='logo'
                    className="h-10 w-10"
                />
                <AtSymbolIcon color="black" />
                <Text className="flex-1 text-lg font-bold mr-2">{props.name}</Text>
                <ScissorsIcon color="black" />
                <Text className="text-lg font-bold">- - -</Text>
            </View>
            <Text className="mt-3">work days :</Text>
            <View className="flex-auto">
                {
                    arr.map((val, index) => {
                        if (index > 3) {
                            return;
                        }
                        return (<View key={index} className="border-black border-2 rounded-lg px-2 py-1 bg-black mt-1">
                            <Text className="text-white text-center">{val}</Text>
                        </View>)
                    })
                }
            </View>

        </View>
    )
}