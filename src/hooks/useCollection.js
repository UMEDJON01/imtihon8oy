import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export function useCollection(col, _q){
    const [documents, setDocuments] = useState(null)

    const q = query(collection(db, col), where(..._q))

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results = [];
            snapshot.docs.forEach((doc) => {
                const recipe = { id:doc.id, ...doc.data() }
                results.push(recipe);
            })
            setDocuments(results)
        });

        return () => unsubscribe();
    }, [])
    return {documents}
}