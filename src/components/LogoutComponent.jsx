import { GetAuthContext } from "./security/AuthContext";

export default function LogoutComponent(){

    return(
        <div>
            <h1>You have been Logged Out!</h1>
            <h3>Login again to use the application
                <br/>
                Till then
                <br/>
                Have a great day!
            </h3>
        </div>
    );
}