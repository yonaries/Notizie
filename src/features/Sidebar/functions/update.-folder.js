import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { database } from "../../../config/firebaseConfig";
import { toast } from "react-toastify";

const renameFolder = async (ref, name, uid) => {
  try {
    const foldersRef = doc(database, "folders", ref);
    await setDoc(foldersRef, {
      name: name,
      uid: uid,
    });
    toast.info(`Folder Renamed`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      icon: false,
    });
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default renameFolder;
