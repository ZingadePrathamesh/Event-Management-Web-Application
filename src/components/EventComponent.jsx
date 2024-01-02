import './EventComponent.css';
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginComponent from './LoginComponent';
import AuthProvider, { GetAuthContext } from './security/AuthContext';
import ErrorComponent from './ErrorComponent';
import EventListComponent from './EventListComponent';
import HeaderComponent from './HeaderComponent';
import LogoutComponent from './LogoutComponent';
import WelcomeComponent from './WelcomeComponent';
import EventFormComponent from './EventFormComponent';

export function Authenticate({children}){
    const authContext = GetAuthContext();
    if(authContext.isAuthenticated){
        return children;
    }
    else{
        return <Navigate to='/login'/>
    }
}


export default function EventComponent(){
    return (
        <AuthProvider>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route path='/welcome/:username' element={
                        <Authenticate>
                            <WelcomeComponent/>
                        </Authenticate>
                        }/>
                    <Route path='/events' element={
                        <Authenticate>
                            <EventListComponent/>
                        </Authenticate>}/>
                    <Route path='/event-form' element={
                        <Authenticate>
                            <EventFormComponent/>
                        </Authenticate>}/>
                    <Route path='/logout' element={
                        <Authenticate>
                            <LogoutComponent/>
                        </Authenticate>}/>
                    <Route path='*' element={<ErrorComponent/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}






