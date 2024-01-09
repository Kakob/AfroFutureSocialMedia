import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "@firebase/auth";

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const signUserOut = async() => {
        await signOut(auth);
    }
    return (
    <div className="navbar">
        <div className="links">
            <Link to="/"> Home </Link>
            {!user ? (<Link to ="/login"> Login </Link>) : 
            (<ul>
                <li><Link to="/createpost"> Create Post </Link></li>
                <li><Link to="/chats"> Chat </Link></li>
                <li><Link to="/settings"> Settings </Link></li>
            </ul>)}
        </div>
        <div className="user">
            {user && (
                <>
                    <p>{user?.displayName}</p>
                    <img alt="avatar" src={user?.photoURL || ""} width="25" height="25"/>
                    <button className="logOut" onClick={signUserOut}> Log Out </button>
                </>
            )}
        </div>
    </div>
    );
}