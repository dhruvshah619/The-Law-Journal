import React,{useState} from 'react'
import '../styling/Login.css';
function Login(props) {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const handleUsernameChange=(e)=>{
        e.preventDefault();
        setUsername(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    const userAction = async () => {

        fetch('https://medium-clone-wim.herokuapp.com/users/login?email='+username+'&password='+password)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                alert('Invalid Username/Password');
                return Promise.reject(error);
            }
            var name = data["name"] 
            var bio = data["bio"]
            var id = data["_id"]
            alert('Logged In Successfully!');    
            props.settingUsername(username);
            props.settingName(name);
            props.settingBio(bio);
            props.settingId(id);
            props.settingJoined();
            props.toggleOpenHome(true);
            props.toggleLogin(false);
            props.toggleSignup(false);
        })
        .catch(error => {
            alert('Invalid Username/Password');
            console.error('There was an error!', error);
        });
      }
    const checkLogin=(e)=>{
        e.preventDefault();
        userAction();
    }
    const togglingSignUp=(e)=>{
        props.toggleSignup(true);
        props.toggleLogin(false);
    }
    return (
        <div className="login">
            <h1 className="websiteName">The Law Journal</h1>
            <div className="loginBox">
                <h3 className="welcomeMessage">Welcome Back!</h3>
                <form name="loginForm " className="loginForm">
                    <input type="email" name="username" id="username" value={username} 
                    onChange={(e)=>handleUsernameChange(e)} autoComplete="off" placeholder="Email"
                    ></input>
                    <input type="password" name="password" id="password" value={password} onChange={(e)=>handlePasswordChange(e)} autoComplete="off" placeholder="Password"></input>
                    <button id="btnLogin" name="btnLogin" onClick={(e)=>checkLogin(e)}>Login</button>
                    <button type="submit" name="signupOpt" id="signupOpt" onClick={(e)=>togglingSignUp(e)}>Don't  have an account? Signup!</button>
                </form>
            </div>  
        </div>


        // <div className="base-container" ref={this.props.containerRef}>
        // <div className="header">Login</div>
        // <div className="content">
        // <div className="image">
        //     <img src={loginImg} />
        // </div>
        // <div className="form">
        //     <div className="form-group">
        //     <label htmlFor="username">Username</label>
        //     <input type="text" name="username" placeholder="Username" />
        //     </div>
        //     <div className="form-group">
        //     <label htmlFor="password">Password</label>
        //     <input type="password" name="password" placeholder="Password" />
        //     </div>
        // </div>
        // </div>
        // <div className="footer">
        // <button type="button" className="btn">
        //     Login
        // </button>
        // </div>
        // </div>


    )
}

export default Login
