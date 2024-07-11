import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/firebaseConfig'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { isAuthReady, login } from '../features/user/userSlice'

export function useSignup(){
    const dispatch = useDispatch();
    // Login with email and password
    const signup = (displayName, email, password, photoURL) => {
        createUserWithEmailAndPassword(auth, email, password, photoURL)
            .then(async (userCredential) => {
                await updateProfile(auth.currentUser, {
                    displayName,
                    photoURL,
                });
                toast.success(`Welcome ${displayName}!`)
                dispatch(userCredential.user)
                dispatch(isAuthReady(true))

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    // Login with gmail with popup
    const signUpWithGoogleProvider = () => {
        signInWithPopup(auth, googleProvider)
           .then((result) => {
                GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                dispatch(login(user))
                toast.success(`Welcome ${user.displayName} !`)
                dispatch(isAuthReady(true))

            })
           .catch((error) => {
                const errorMessage = error.message; 
                console.log(errorMessage);
                toast.error(errorMessage);
            });
    };

    return { signUpWithGoogleProvider, signup };
}