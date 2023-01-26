import { collection, deleteDoc, doc } from "firebase/firestore";
import { database } from "../../../config/firebaseConfig";
import { toast } from "react-toastify";

const deleteNote = async (ref) => {
  try {
    const foldersRef = doc(database, "notes", ref);
    await deleteDoc(foldersRef);
    toast.info(`Note Deleted`, {
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
export default deleteNote;
