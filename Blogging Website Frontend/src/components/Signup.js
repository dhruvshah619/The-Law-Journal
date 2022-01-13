import React,{useState} from 'react'
import '../styling/Signup.css';
function Signup(props) {
    const [userName,setUserName]=useState('');
    const [userBio,setUserBio]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const handleUserNameChange=(e)=>{
        e.preventDefault();
        setUserName(e.target.value);
    }
    const handleEmailChange=(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handleUserBioChange=(e)=>{
        e.preventDefault();
        setUserBio(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange=(e)=>{
        e.preventDefault();
        setConfirmPassword(e.target.value);
    }
    const userAction = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({ name: userName,email:email,password:password,bio:userBio})
        };
        fetch('https://medium-clone-wim.herokuapp.com/users', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data1 = await response.json();
                const data = isJson && data1;
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    alert('Sorry! Couldn\'t sign up successfully! Please try again!')
                    return Promise.reject(error);
                }
                var id = data1["_id"]
                alert('Signed Up Successfully!');    
                props.settingUsername(email);
                props.settingName(userName);
                props.settingBio(userBio);
                props.settingId(id);
                props.toggleOpenHome(true);
                props.settingJoined();
                props.toggleSignup(false);
                props.toggleLogin(false);
            })
            .catch(error => {
                console.log(error)
                alert('Sorry! Couldn\'t sign up successfully! Please try again!')
            });
      }
    const checkSignup=(e)=>{    
        e.preventDefault();
        if(password===confirmPassword){
            userAction();
        }else{
            alert("Password and Confirm Password fields must match!")
        }
    }
    const checkLogin=(e)=>{
        e.preventDefault();
        props.toggleSignup(false);
        props.toggleLogin(true);
    }
    return (
        <div className="signUp">
            <h1 className="websiteName">The Law Journal</h1>
            <div className="signUpBox">
              <h1 className="welcomeMessage1">Join in Now!   </h1>
                <form name="signUpForm" className="signUpForm">
                    
                    <input type="email" placeholder="Email" name="email" id="email" value={email}
                    onChange={(e)=>handleEmailChange(e)}
                    ></input>

                    <input type="name" placeholder="Name" name="userName" id="userName" value={userName}
                        onChange={(e)=>handleUserNameChange(e)}
                        ></input>

                    <input type="text" placeholder="Bio" name="userBio" id="userBio" value={userBio}
                    onChange={(e)=>handleUserBioChange(e)}
                    ></input>

                    <input type="password" placeholder="Password" name="password" id="password1" value={password} onChange={(e)=>handlePasswordChange(e)}></input>

                    <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e)=>handleConfirmPasswordChange(e)}></input>

                    <button type="submit" id="btnsignUp" name="btnsignUp" onClick={(e)=>checkSignup(e)}>Signup</button>
                    <button name="loginOpt" id="loginOpt" onClick={(e)=>checkLogin(e)}>Already have an account? Login!</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
