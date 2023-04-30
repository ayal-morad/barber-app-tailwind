import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { setData } from "../firebase";
export default function EditDataPage({ route, navigation }) {
  const { data } = route.params;
  const [isWorkDay, setIsWorkDay] = useState("Yes");
  const [isNotWorkDay, setIsNotWorkDay] = useState("No");
  const [date, setDate] = useState(data.date);
  const [array, setArray] = useState(data.times);
  const [count, setCount] = useState(0);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  {
    /* delete an index from the array */
  }

  function deleteIndFromArray(ind) {
    setArray(() => {
      const arr = array;
      arr.splice(ind, 1);
      return arr;
    });
  }

  {
    /* adding rule to the array */
  }
  function addARule() {
    const str = hour + ":" + minute;
    const h = Number(hour);
    const m = Number(minute);
    let ind = 0;
    const arr = array;
    for (let i = 0; i < arr.length; i++) {
      let ha = Number(arr[i][0].substring(0, arr[i][0].indexOf(":")));
      let ma = Number(arr[i][0].substring(arr[i][0].indexOf(":") + 1));
      console.log(ha, ma);
      if (ha > h || (ha == h && ma > m)) {
        break;
      }
      ind++;
    }
    console.log(ind);
    arr.splice(ind, 0, [str, false]);
    setArray(() => arr);
  }
  return (
    <ScrollView className="flex-col">
      {/* Text that contain name of data that we wont to chang and name of the day that we changing */}

      <View>
        <Text className="text-lg self-center">
          {data.dataName} ={">"} {data.day} | {data.date}
        </Text>
      </View>
      {/* changing the string of date */}

      <View className="self-center w-5/6 bg-black h-28 mt-4 rounded-lg">
        <Text className="text-white self-center mt-2">Chang date {date}</Text>
        <TextInput
          onChangeText={(text) => setDate(text)}
          className="self-center mt-3 w-10/12 h-14 text-white text-center border-white rounded-lg border-2"
          placeholder="enter new date"
          placeholderTextColor={"#ffffff"}
        ></TextInput>
      </View>
      {/* changing the boolean of isWorkDay */}

      <View className="self-center w-5/6 bg-black h-28 mt-4 rounded-lg ">
        <Text className="text-white self-center mt-2">
          is work day ? "{isWorkDay}"
        </Text>
        <TouchableOpacity
          className="self-center mt-3 w-10/12 h-14 text-white text-center border-white rounded-lg border-2"
          onPress={() => {
            if (isWorkDay === "Yes") {
              setIsWorkDay("No");
              setIsNotWorkDay("Yes");
            } else {
              setIsWorkDay("Yes");
              setIsNotWorkDay("No");
            }
          }}
        >
          <View className="w-full h-full felx justify-center items-center">
            <Text className="text-white">
              click to change to {isNotWorkDay}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* array view */}

      {array.map((val, ind) => {
        return (
          <View
            key={ind}
            className="self-center flex-row items-center w-5/6 bg-black h-20 mt-4 rounded-3xl border-gray-600 border-2"
          >
            <View className="flex items-center justify-center ml-4 border-r-2 border-white h-16  w-20">
              <Text className="text-white">Rule :</Text>
              <Text className="text-white">{val[0]}</Text>
            </View>
            <View className="ml-auto mr-3  w-52 h-12">
              <TouchableOpacity
                onPress={() => {
                  deleteIndFromArray(ind);
                  setCount(count + 1);
                }}
              >
                <View className="flex justify-center items-center bg-red-600 rounded-xl h-10">
                  <Text>DELETE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      {/* adding to the array */}
      <View className="flex-row w-5/6 space-x-1 h-20 mt-4 self-center p-2 border-black border-2 rounded-md">
        <TextInput
          onChangeText={(text) => setHour(text)}
          className=" text-black text-center text-sm  w-1/2  rounded-3xl   border-gray-600 border-2 h-full"
          placeholder="enter a new rule Hour"
          placeholderTextColor={"#000000"}
        />
        <TextInput
          onChangeText={(text) => setMinute(text)}
          className=" text-black text-sm text-center  w-1/2  rounded-3xl   border-gray-600 border-2 h-full"
          placeholder="enter a new rule Minutes"
          placeholderTextColor={"#000000"}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          addARule();
          setCount(count + 1);
          console.log(array);
        }}
        className="mt-1 mb-3 self-center bg-blue-400 w-2/6 h-10 rounded-lg justify-center border-2 border-black"
      >
        <Text className="text-center">Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setArray([
            ["12:00", false],
            ["12:30", false],
            ["13:00", false],
            ["13:30", false],
            ["14:00", false],
            ["14:30", false],
            ["15:00", false],
            ["15:30", false],
            ["16:00", false],
            ["16:30", false],
            ["17:00", false],
            ["17:30", false],
            ["18:00", false],
            ["18:30", false],
            ["19:00", false],
            ["19:30", false],
            ["20:00", false],
          ]);
        }}
        className="mt-1 mb-3 self-center bg-blue-400 w-2/6 h-10 rounded-lg justify-center border-2 border-black"
      >
        <Text className="text-center text-white">generate times</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setData(data.dataName, data.day, array, date, isWorkDay);
          navigation.goBack();
        }}
        className="mt-1 mb-10 self-center bg-black w-2/6 h-10 rounded-lg justify-center"
      >
        <Text className="text-center text-white">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
