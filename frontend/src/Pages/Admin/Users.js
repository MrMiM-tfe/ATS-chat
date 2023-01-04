import { useEffect, useState } from "react";
import useUser from "../../Hooks/useUser";


// Styles
import "../../Styles/AdminUsers.css"

const Users = () => {

    // Hoocks
    const {Users, DeleteUser, Pending, EditUser, CreateUser} = useUser()
    const [Editing, setEditing] = useState(null)
    const [Name, setName] = useState("")
    const [Username, setUsername] = useState("")
    const [UserRole, setUserRole] = useState("user")
    const [UserEmail, setUserEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Deleting, setDeleting] = useState(null)


    useEffect(() => {
        if (!Pending){
            setEditing(null)
        }
    }, [Pending])

    const HandleEditSubmit = () => {

        const data = {
            name: Name,
            username: Username,
            role: UserRole,
            email: UserEmail
        }

        EditUser(Editing._id, data)
    }

    const HandleEdit = (user) => {
        setEditing(user)
        setName(user.name)
        setUsername(user.username)
        setUserRole(user.role)
        setUserEmail(user.email)
    }

    const HandleDelete = () => {
        DeleteUser(Deleting)
        setDeleting(null)
    }

    const HandleDeleteReq = (user) => {
        setDeleting(user)
    }

    const HandleNew = () => {
        setEditing("new")
    }

    const HandleNewSubmit = () => {
        console.log("ran");
        const data = {
            name: Name,
            username: Username,
            password: Password,
            role: UserRole,
            email: UserEmail
        }

        CreateUser(data)
    }

    const SubmitDelete = () => {

        if (Deleting === null) {
            return null
        }

        return (
            <div className="submit-background">
                <div className="submit-delete">
                    <h4>Are you sure?</h4>
                    <div className="d-flex">
                        <button className="btn btn-success" onClick={() => setDeleting(null)}>No</button>
                        <button className="btn btn-danger" onClick={HandleDelete}>Yes</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="users-page">
            <SubmitDelete />
            <div className="actions d-flex">
                <button className="btn btn-info" onClick={HandleNew}>New</button>
            </div>
            {/* user list */}
            <div className="user-list container-fluid mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((user, i) => (
                            <tr key={user._id}>
                                <th scope="row">{i}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn btn-light btn-sm" onClick={() => HandleEdit(user)}>Edit</button>
                                </td>
                                <td>
                                    {user.username !== "admin" && <button className="btn btn-danger btn-sm" onClick={() => HandleDeleteReq(user._id)}>Delete</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* END user list */}

            {Editing && <div className="user-info mt-2">
                <form className="form-group" onSubmit={(e) => {
                    e.preventDefault()
                    if (Editing === "new") {
                        return HandleNewSubmit()
                    }else {
                        return HandleEditSubmit()
                    }
                }}>
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <input className="form-control mb-1" type="text" id="name" placeholder="Name"
                        value={Name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        />
                    </div>
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input className="form-control mb-1" type="text" id="username" placeholder="Username"
                        value={Username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        />
                    </div>
                    {Editing === "new" && <div className="password">
                        <label htmlFor="password">Password</label>
                        <input className="form-control mb-1" type="password" id="password" placeholder="Password"
                        value={Password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        />
                    </div>}
                    <div className="role mt-2">
                        <label htmlFor="role">Role</label>
                        <select className="form-select" value={UserRole} onChange={(e) => setUserRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="email mt-2">
                        <label htmlFor="email">Email</label>
                        <input className="form-control mb-1" type="text" id="email" placeholder="Email"
                        value={UserEmail}
                        onChange={(e) => {
                            setUserEmail(e.target.value)
                        }}
                        />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-success btn-sm mx-1" type="submit">OK</button>
                        <button className="btn btn-danger btn-sm mx-1" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                </form>
            </div>}
        </div>
    );
}
 
export default Users;
