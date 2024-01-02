import{ auth, provider } from "../config/firebase";
import { signInWithPopup } from "@firebase/auth";
 
export const Login = () => {

    const signInWIthGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
    }

    return (<div>
        <p> Sign in with Google to Continue </p>
        <button onClick={signInWIthGoogle}> Sign in with Google</button>
        </div>
        );
}