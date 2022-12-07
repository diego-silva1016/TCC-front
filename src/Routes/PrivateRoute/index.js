import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/LoginContext"

const PrivateRoute = ({children}) => {
    const { company } = useAuth()

    return company ? children : <Navigate to="/" replace={true} />
}

export default PrivateRoute