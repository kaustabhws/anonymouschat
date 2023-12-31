import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './User.css'

export default function Signup(props) {

    const [creds, setCreds] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    let history = useNavigate()

    const onChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }

    const [showAlert, setShowAlert] = useState(false);

    const [showStat, setShowStat] = useState(false);

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (creds.password !== creds.cpassword) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return;
        }

        setShowAlert(false);

        const url = "https://anonymous-chat-backend-dbff383357d6.herokuapp.com/api/auth/createuser"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password }),
        });
        const json = await response.json()
        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken)
            setShowStat(true)
            setTimeout(() => {
                setShowStat(false);
                history("/")
                window.location.reload();
            }, 2000);
        } else {
            setError(true)
            setErrorMessage(json.error)
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
    }

    const togglePass = () => {
        let input = document.getElementById('password')

        if (input.type === 'password') {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
    }

    const toggleCPass = () => {
        let input = document.getElementById('cpassword')

        if (input.type === 'password') {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
    }

    return (
        <main className={`main ${props.mode}-main`}>
            <div className="containers">
                <section className="wrapper">
                    <div className="heading">
                        <h1 className="text text-large">Create an account</h1>
                        <p className="text text-normal">
                            Already have an account?{" "}
                            <span>
                                <Link to="/login" className="text text-links">
                                    Sign in
                                </Link>
                            </span>
                        </p>
                    </div>
                    <form name="signin" className="form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <label htmlFor="name" className="input-label" hidden="true">
                                Name
                            </label>
                            <input
                                type="text"
                                onChange={onChange}
                                name="name"
                                id="name"
                                className="input-field"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden="true">
                                Email Address
                            </label>
                            <input
                                type="email"
                                onChange={onChange}
                                name="email"
                                id="email"
                                className="input-field"
                                placeholder="Email Address"
                                required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden="true">
                                Password
                            </label>
                            <input
                                type="password"
                                onChange={onChange}
                                name="password"
                                id="password"
                                className="input-field"
                                placeholder="Password"
                                minLength={5}
                                required
                            />
                            <i class="fa-regular fa-eye" style={{ color: '#000000' }} onClick={togglePass}></i>
                        </div>
                        <div className="input-control">
                            <label htmlFor="cpassword" className="input-label" hidden="true">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                onChange={onChange}
                                name="cpassword"
                                id="cpassword"
                                className="input-field"
                                placeholder="Confirm Password"
                                minLength={5}
                                required
                            />
                            <i class="fa-regular fa-eye" style={{ color: '#000000' }} onClick={toggleCPass}></i>
                        </div>
                        <div id="liveAlertPlaceholder">
                            {showStat && (
                                <div className="alert alert-success">Account created successfully. <br /> Logging in...</div>
                            )}
                        </div>
                        <div id="liveAlertPlaceholder">
                            {showAlert && (
                                <div className="alert alert-danger">Passwords do not match</div>
                            )}
                        </div>
                        <div id="liveAlertPlaceholder">
                            {error && (
                                <div className="alert alert-danger sign-error">{errorMessage}</div>
                            )}
                        </div>
                        <div className="input-control-signBtn">
                            <button
                                type="submit"
                                name="submit"
                                className="input-submit"
                            > Create Account </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}
