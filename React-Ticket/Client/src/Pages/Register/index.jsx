import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, useHistory} from 'react-router-dom';
import {registerUser} from "../../service/authService";
import { validFname, validLname, validEmail, validPassword } from '../../Regex/regex';


const initialValue = {
    firstName: '',
    lastName:'',
    email: '',
    password: '',
}

const initialIsValidValue = {
    isfirstName: '',
    islastName: '',
    isemail: '',
    ispassword: '',
  }

const Register = () => {
    const history = useHistory();
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [user, setUser] = useState(initialValue);
    const { firstName, lastName, email, password } = user;

    const [isValid, setIsValid] = useState(initialIsValidValue);
    const { isfirstName, islastName, isemail, ispassword } = isValid;

    const validationMessageCSS = {color:'red',marginBottom:'20px'}

    const onChangeSetState=(e)=>{
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onValidate = (e,regEx) => {
        const RegExObj=new RegExp(regEx);
        const isValidKey='is'+e.target.name;
        
       
        if(e.target.value === "" || RegExObj.test(e.target.value))
        {
            setIsValid({...isValid,[isValidKey]:''});
            setUser({...user, [e.target.name]: e.target.value});
        }
        else{
            setIsValid({...isValid,[isValidKey]:'Invalid input..!!'});
          
        }
    }

    var flag=true;
  const validateDetailsFlag = Object.values(isValid).every(value => {
      if (value!==null && value!=='') {
          flag=false;
      }
      return flag;
  });

    const handleSignUp = async () => {
        // const data = {
        //     firstName: firstName,
        //     lastName: lastName,
        //     email: email,
        //     password: password
        // };

        // Sign Up API CALL
        if(validateDetailsFlag){await registerUser(user).then(response => {
          
            history.push("/sign-in");
        })}else{
            alert("Invalid input!! Please try again")
        }
        
        
    };

    return(
        <>
            <div className={"d-flex align-items-center justify-content-center"}>
                <div className={"card mt-5 p-4 w-25"}>
                    <h3>Sign Up</h3>
                    <TextField onChange={(event) => onValidate(event, validFname)} onBlur={(event) => onValidate(event, validFname)} name="firstName" value={firstName} className={"mt-2"} variant={"outlined"} label={"First Name"} size={"small"} />
                    <div style={validationMessageCSS}>{isfirstName}</div>
                    <TextField onChange={(event) => onValidate(event, validLname)} onBlur={(event) => onValidate(event, validLname)} name="lastName" value={lastName} className={"mt-2"} variant={"outlined"} label={"Last Name"} size={"small"} />
                    <div style={validationMessageCSS}>{islastName}</div>
                    <TextField onChange={(event) => onChangeSetState(event)} onBlur={(event) => onValidate(event,validEmail)} name="email" value={email} className={"mt-2"} variant={"outlined"} label={"Email"} size={"small"} />
                    <div style={validationMessageCSS}>{isemail}</div>
                    <TextField onChange={(event) => onChangeSetState(event)} onBlur={(event) => onValidate(event,validPassword)} name="password" value={password} type={"password"} className={"mt-2"} variant={"outlined"} label={"Password"} size={"small"} />
                    <div style={validationMessageCSS}>{ispassword}</div>
                    <Button disabled={firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0} className={"mt-3"} variant={"contained"} color={"primary"} size={"small"} onClick={handleSignUp} >Sign Up</Button>
                    <p className={"ml-auto mt-3"}>Already have an account? <Link to={'/sign-in'}>Sign In</Link></p>
                </div>
            </div>
        </>
    )
};

export default Register;