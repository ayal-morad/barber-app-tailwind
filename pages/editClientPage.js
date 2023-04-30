import { View, Text, Button } from "react-native";
import { database } from "../firebase";
import { useEffect, useState } from "react";
import { get, set, ref, child } from "firebase/database";
export default function EditClientPage({ navigation, route }) {
  const [userName, setUserName] = useState();
  const [userPhone, setUserPhone] = useState();
  const { path, timePath } = route.params;
  useEffect(() => {
    get(child(ref(database), path)).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          if (child.key == "username") {
            setUserName(child.val());
          }
          if (child.key == "phoneNumber") {
            setUserPhone(child.val());
          }
        });
      }
    });
  }, []);

  function DELETERULE() {
    set(ref(database, path + "/IsBooked"), false)
      .then(() => {
        set(ref(database, timePath), false)
          .then(() => {
            setUserName("DELETED");
          })
          .catch(() => {
            setUserName("network error");
          });
      })
      .catch(() => {
        setUserName("network error");
      });
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-row w-11/12 h-16 bg-white justify-center rounded-lg p-3">
        <Text className="flex-1">
          {userName} : {userPhone}
        </Text>
        <View className="w-24">
          <Button
            title="DELETE"
            color={"#FF0000"}
            onPress={() => {
              DELETERULE();
            }}
          ></Button>
        </View>
      </View>
      <View className="mt-4">
        <Button
          title="Go Back"
          color={"#000000"}
          onPress={() => {
            navigation.goBack();
          }}
        ></Button>
      </View>
    </View>
  );
}
