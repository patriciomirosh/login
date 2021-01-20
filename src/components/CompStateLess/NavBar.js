import React from 'react'
import {Link, NavLink,withRouter} from 'react-router-dom'

import {auth} from '../../firebase'

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Admin of Records</Link>
            <div>
                <div className="d-flex">
                   
                    {
                        props.firebaseUser !== null ? (
                            <NavLink 
                                className="btn btn-dark mr-2" 
                                to="/admin/home"
                            >
                                ABM
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                        <button 
                            className="btn btn-dark" 
                            onClick={() => cerrarSesion()}
                        >
                            Close Session
                        </button>
                        ): (
                        <NavLink 
                            className="btn btn-dark" 
                            to="/login"
                        >
                            Login
                        </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
