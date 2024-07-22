import React, { useState } from 'react';
import './styles.css';
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';

function SignupSigninComponent() {
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(false);

    function signupWithEmail(){
        setLoading(true);
        console.log("Name",name);
        console.log("email", email);
        console.log("password", password);
        console.log("confirmPassword", confirmPassword);

        if(name!="" && email!="" && password!="" && confirmPassword!=""){
            if (password==confirmPassword){
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(("User: ", user))
                    toast.success("User created!");
                    setLoading(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    createDoc(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setLoading(false);
                });
            }
            else{
                toast.error("Password and Confirm Password does not match.")
                setLoading(false);
            }
            
        } else {
            setLoading(false);
            toast.error("All fields are mandatory.")
        }
    }

    function loginUsingEmail(){
        console.log("Email", email);
        console.log("Password", password);

    }

    function createDoc(user){
        // makke sure that the oc with uid doesnt exist
        //create doc
    }

    return (
        <>
        {loginForm ? <div className='signup-wrapper'>
        <h2 className='title'>Login <span style={{color: 'var(--theme)'}}>FinTrack.</span></h2>
        <form>
            
            <Input label={"Email"} 
            type="email"
            state={email} 
            setState={setEmail} 
            placeholder={"johndoe@gmail.com"}
            />
            <Input label={"Password"} 
            type="password"
            state={password} 
            setState={setPassword} 
            placeholder={"*****"}
            />
            
            <Button 
            disabled={loading}
            text={loading ? "Loading" : "Login using Email and Password"} 
            onClick={loginUsingEmail} />
            <p className='p-login'>or</p>
            <Button text={loading ? "Loading" : "Login using Google"} blue={true}/>
            <p className='p-login' 
            style={{cursor:"pointer"}}
            onClick={()=> setLoginForm(!loginForm)}>Don't have an account already? Click Here</p>

        </form>
        </div> : <div className='signup-wrapper'>
        <h2 className='title'>Sign up on <span style={{color: 'var(--theme)'}}>FinTrack.</span></h2>
        <form>
            <Input label={"Full Name"} 
            state={name} 
            setState={setName} 
            placeholder={"John Doe"}
            />
            <Input label={"Email"} 
            type="email"
            state={email} 
            setState={setEmail} 
            placeholder={"johndoe@gmail.com"}
            />
            <Input label={"Password"} 
            type="password"
            state={password} 
            setState={setPassword} 
            placeholder={"*****"}
            />
            <Input label={"Confirm Password"} 
            type="password"
            state={confirmPassword} 
            setState={setConfirmPassword} 
            placeholder={"*****"}
            />
            <Button 
            disabled={loading}
            text={loading ? "Loading" : "Signup using Email and Password"} 
            onClick={signupWithEmail} />
            <p className='p-login'>or</p>
            <Button text={loading ? "Loading" : "Signup using Google"} blue={true}/>
            <p className='p-login'
            style={{cursor:"pointer"}}
            onClick={()=> setLoginForm(!loginForm)}>Have an account already? Click Here</p>

        </form>
        </div>}
        
        </>
    )
}

export default SignupSigninComponent;
