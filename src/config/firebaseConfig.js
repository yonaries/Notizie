import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDphC_kerjxxNgODcdnh53Uh3MVXc8o_6g",
  authDomain: "notizie-516e7.firebaseapp.com",
  projectId: "notizie-516e7",
  storageBucket: "notizie-516e7.appspot.com",
  messagingSenderId: "142345999137",
  appId: "1:142345999137:web:45a4e5e30c30ee4e826460",
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
