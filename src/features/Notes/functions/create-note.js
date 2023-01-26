import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../config/firebaseConfig";
import { toast } from "react-toastify";

const createNote = async (data) => {
  try {
    const foldersRef = collection(database, "notes");
    await addDoc(foldersRef, data);
    toast.success(`Note Created`, {
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
export default createNote;
