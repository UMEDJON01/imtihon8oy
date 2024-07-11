import { collection, addDoc } from "firebase/firestore"
import { db } from '../firebase/firebaseConfig'
import { useState } from "react"
import toast from "react-hot-toast"

export function useAddNewDoc(){
    const [newRecipe, setNewRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const addNewDoc = async (col, data) => {
        setIsPending(true)
        const docRef = await addDoc(collection(db, col), data);
        setIsPending(false);
        setNewRecipe(docRef);
        toast.success("New Recipe added successfully")
    }

    return { addNewDoc, newRecipe, isPending }
}