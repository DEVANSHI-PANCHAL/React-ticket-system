import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, useHistory} from 'react-router-dom';
import {signin} from "../../service/authService";
import {useDispatch} from "react-redux";
import {setAuth} from "../../redux/action/authAction";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        const data = {
            email: email,
            password: password
        };

        signin(data).then(response => {
            dispatch(setAuth({user: response.data.result, token: response.data.token}));

            localStorage.setItem("token", response.data.token);
           localStorage.setItem("user",  JSON.stringify(response.data.result));
            history.push('/tickets')
        })
    };

    return(
        <>
            <div className={"d-flex align-items-center justify-content-center"}>
                <div className={"card mt-5 p-4 w-25"}>
                    <h3>Sign In</h3>
                    <TextField onChange={(event) => setEmail(event.target.value)} className={"mt-2"} variant={"outlined"} label={"Email"} size={"small"} />
                    <TextField onChange={(event) => setPassword(event.target.value)} type={"password"} className={"mt-2"} variant={"outlined"} label={"Password"} size={"small"} />
                    <Button className={"mt-3"} variant={"contained"} color={"primary"} size={"small"} onClick={handleSignIn} >Sign In</Button>
                    <p className={"ml-auto mt-3"}>Don't have an account? <Link to={'/sign-up'}>Register here.</Link></p>
                </div>
            </div>
        </>
    )
};

export default Login;