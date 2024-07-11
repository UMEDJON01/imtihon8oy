import toast from "react-hot-toast";
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { Navigate } from "react-router-dom";

function useDeleteDoc(){
    const deleteTodo = async (col, id) => {
        await deleteDoc(doc(db, col, id))
        toast.success("You deleted this recipe")
    }
    return { deleteTodo }
}

export { useDeleteDoc }