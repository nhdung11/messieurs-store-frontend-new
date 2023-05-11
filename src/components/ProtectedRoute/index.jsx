import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import NotPermission from "./notPermission"

const RoleRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin")
    const user = useSelector(state => state.account.user)
    const userRole = user.role;
    if (isAdminRoute && userRole === "ADMIN" ||
        !isAdminRoute && (userRole === "USER" || userRole === "ADMIN")) {
        return (
            <>{props.children}</>
        )
    } else {
        return (
            <NotPermission />
        )
    }
}



const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    return (
        <>
            {isAuthenticated === true ?
                <RoleRoute>
                    {props.children}
                </RoleRoute>
                :
                <Navigate to='/login' replace></Navigate>}
        </>
    )
}

export default ProtectedRoute