import firebase from 'firebase/app';
import 'firebase/database';

// const firebaseConfig = {
//   apiKey: "AIzaSyDQPWh18lMx2Z91WjV_O-ZP2Pwythl8x8I",
//   authDomain: "symphony-5a87f.firebaseapp.com",
//   projectId: "symphony-5a87f",
//   storageBucket: "symphony-5a87f.appspot.com",
//   messagingSenderId: "569969649358",
//   appId: "1:569969649358:web:c487ecfd8340eb109f529f"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCK6YK8B57lwUwcbH-nFCA2l0v9P_4dQE0",
  authDomain: "dolbyio-classroom-demo-5798a.firebaseapp.com",
  databaseURL: "https://dolbyio-classroom-demo-5798a-default-rtdb.firebaseio.com",
  projectId: "dolbyio-classroom-demo-5798a",
  storageBucket: "dolbyio-classroom-demo-5798a.appspot.com",
  messagingSenderId: "165153492685",
  appId: "1:165153492685:web:94d90522cf2bb6c6ed6384",
  measurementId: "G-36MB6Y7J35"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export { db };
