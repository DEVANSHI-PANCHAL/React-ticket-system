import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, useHistory} from 'react-router-dom';
import {registerUser} from "../../service/authService";

const Register = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        // Sign Up API CALL
        registerUser(data).then(response => {
            console.log("SIGN UP ", response)
            history.push("/sign-in");
        })
        
    };

    return(
        <>
            <div className={"d-flex align-items-center justify-content-center"}>
                <div className={"card mt-5 p-4 w-25"}>
                    <h3>Sign Up</h3>
                    <TextField onChange={(event) => setFirstName(event.target.value)} className={"mt-2"} variant={"outlined"} label={"First Name"} size={"small"} />
                    <TextField onChange={(event) => setLastName(event.target.value)} className={"mt-2"} variant={"outlined"} label={"Last Name"} size={"small"} />
                    <TextField onChange={(event) => setEmail(event.target.value)} className={"mt-2"} variant={"outlined"} label={"Email"} size={"small"} />
                    <TextField onChange={(event) => setPassword(event.target.value)} type={"password"} className={"mt-2"} variant={"outlined"} label={"Password"} size={"small"} />
                    <Button className={"mt-3"} variant={"contained"} color={"primary"} size={"small"} onClick={handleSignUp} >Sign Up</Button>
                    <p className={"ml-auto mt-3"}>Already have an account? <Link to={'/sign-in'}>Sign In</Link></p>
                </div>
            </div>
        </>
    )
};

export default Register;