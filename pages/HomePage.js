import { View, Text, TouchableOpacity } from 'react-native'
import BarberCard from '../components/barberCard';
import { database } from '../firebase';
import { ref, get, child } from "firebase/database";

export function HomePage({ navigation }) {
    const myRef = ref(database);
    function getClintAdmin() {
        get(child(myRef, `FirasApp/Users/${auth.currentUser.uid}`)).then(
            (snapshot) => {
                if (snapshot.exists) {
                    snapshot.forEach((child) => {
                        if (child.key == 'IsAdmin') {
                            return true;
                        }
                    })
                }
                return false;
            }
        ).catch()
        return false;
    }
    const IsAdmin = getClintAdmin();
    return (
        <View className="flex-col items-center mt-5">
            <View className="border-black border-2 rounded-lg px-7 py-1 bg-black">
                <Text className="text-white">Chose you'r barber</Text>
            </View>
            <View className="w-full flex-col items-center justify-center">
                <TouchableOpacity className="w-full items-center"// onPress={() => {
                //     if (IsAdmin) {
                //         navigation.navigate('adminPage');
                //     } else {
                //         navigation.navigate('bookingPage');
                //     }
                // }}
                >
                    <BarberCard name="firas" className="shadow-2xl shadow-black"></BarberCard>
                </TouchableOpacity>
                <TouchableOpacity className="w-full items-center" //onPress={() => {
                //     if (IsAdmin) {
                //         navigation.navigate('adminPage');
                //     } else {
                //         navigation.navigate('bookingPage');
                //     }
                // }
                // }
                >
                    <BarberCard name="jolian" className="shadow-2xl shadow-black"></BarberCard>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomePage

