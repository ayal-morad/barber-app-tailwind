import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, set, update, ref, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTUOunp6CFyfGvSZJim4-NsSspOezn_hM",
  authDomain: "my-app-2641d.firebaseapp.com",
  projectId: "my-app-2641d",
  storageBucket: "my-app-2641d.appspot.com",
  messagingSenderId: "114134264187",
  appId: "1:114134264187:web:88fbfb2589cc10221275de",
  databaseURL: "https://my-app-2641d-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// get RealTime database reference
export const database = getDatabase(app);

//create the time data

// export function setOneTimeData() {
//   const daysArr = [
//     "sunday",
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
//   ];

//   daysArr.forEach((day) => {
//     set(ref(database, `FirasApp/FirasData/${day}`), {
//       date: "",
//       isWorkDay: false,
//       times: [],
//     }).then(() => {
//       console.log("fire base : Firas data is ok");
//       set(ref(database, `FirasApp/JolianData/${day}`), {
//         date: "",
//         isWorkDay: false,
//         times: [],
//       }).then(() => {
//         console.log("fire base : Jolian data is ok");
//       });
//     });
//   });
// }

// set the time array
function deleteTimeData(dataName, day, date, isWorkDay) {
  set(ref(database, `FirasApp/${dataName}/${day}/`), {
    times: {},
    date: date,
    isWorkDay: isWorkDay,
  })
    .then(() => (flg = true))
    .catch(() => (flg = false));
}

export function setData(dataName, day, timeArray, date, isWorkDay) {
  let flg = false;
  deleteTimeData(dataName, day, date, isWorkDay);
  if (isWorkDay == "Yes") {
    timeArray.forEach((element) => {
      set(
        ref(database, `FirasApp/${dataName}/${day}/times/${element[0]}`),
        false
      )
        .then(() => (flg = true))
        .catch(() => (flg = false));
    });
  }
  return flg;
}

// return all the snapshot
export function getAllSnapshot(dataName) {
  get(child(ref(database), `FirasApp/${dataName}`))
    .then((snapshot) => {
      console.log("from fire base " + snapshot);
      return snapshot;
    })
    .catch(() => {
      return null;
    });
  return null;
}

// set the phone number
export function resetPhoneNumber(path, str) {
  set(ref(database, path), str).then().catch();
}
