import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom';
import  LoadingPage  from './LoadingPage';

export default function ProtectedRoute({children}) {

    const { user, loading } = useAuth(); 

    if(loading){
        return <LoadingPage/>
    }

    if(!user){
        return <Navigate to="/login" />;
    }

   return <>{children}</>
}
