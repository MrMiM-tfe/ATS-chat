import { useEffect } from "react"
import { Link } from "react-router-dom"

// Context
import { useAuth } from "../Contexts/AuthContext"

const Profile = () => {

    const { User, adminCheck, IsAdmin} = useAuth()

    useEffect(() => {
        adminCheck()
    }, [])

    return (
        <div className="profile-page">
            {IsAdmin && (
                <Link to="/admin">Admin Page</Link>
            )}
        </div>
    );
}
 
export default Profile;