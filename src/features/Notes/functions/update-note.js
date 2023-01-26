import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { database } from "../../../config/firebaseConfig";
import { toast } from "react-toastify";

const updateNote = async (ref, data) => {
  try {
    const foldersRef = doc(database, "notes", ref);
    await setDoc(foldersRef, data);
    toast.info(`Note Updated`, {
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
export default updateNote;
