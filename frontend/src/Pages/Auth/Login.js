import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom"
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';

import { Button } from "react-bootstrap"

// Styles
import "../../Styles/Login.css"

// Contexts
import { AuthContext } from "../../Contexts/AuthContext"

const Login = () => {
    const { login, User, pending, error } = useContext(AuthContext)

    // states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const HandleClick = async (e) => {
        e.preventDefault()

        await login(username, password, "/")
    }


    useEffect(() => {

        console.log(User, pending, error);

    }, [User, pending, error])

    return (
        <div className="login">
            {(User && <Navigate to="/" />) || (
                <MDBContainer>
                <MDBCard>
                    <MDBRow className='g-0'>
                        <MDBCol md='6' className='d-none d-md-block'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100 h-100' />
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>

                                <div className='d-flex flex-row mt-2'>
                                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                    <span className="h1 fw-bold mb-0">ATS Chat</span>
                                </div>

                                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg"
                                    value={username}
                                    onChange={e => {
                                        setUsername(e.target.value)
                                    }}
                                    />
                                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value)
                                    }}
                                    />

                                <Button variant='dark' className='mb-4' size='lg' onClick={HandleClick}>Login</Button>
                                <a className="small text-muted" href="#!">Forgot password?</a>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/auth/register" style={{ color: '#393f81' }}>Register here</Link></p>

                                <div className='d-flex flex-row justify-content-start'>
                                    <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                    <a href="#!" className="small text-muted">Privacy policy</a>
                                </div>

                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            </MDBContainer>
            )}
        </div>
    );
}

export default Login;