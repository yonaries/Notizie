import { addDoc, collection } from "firebase/firestore";
import { database } from "../../../config/firebaseConfig";

const createFolder = async (uid, name) => {
  try {
    const foldersRef = collection(database, "folders");
    await addDoc(foldersRef, { uid: uid, name: name });
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default createFolder;
