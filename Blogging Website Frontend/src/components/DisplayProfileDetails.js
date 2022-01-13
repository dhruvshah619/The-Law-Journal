import React,{useState,useEffect} from 'react'
import '../styling/DisplayProfileDetails.css'

function DisplayProfileDetails(props) {

    /*
        Fetch data based on another user id:
    */
        // var anotherUserId = props.anotherUserId;
        const [userName,setUserName] =useState('');
        const [userBio,setUserBio] =useState('');
        const [follows,setFollows] =useState(false);
        const userId = props.anotherUserId;
        const currentUser =props.id;
        const[followingOfAnotherUser,setFollowingOfAnotherUser] = useState([]);
        const[followersOfAnotherUser,setFollowersOfAnotherUser] = useState([]);
        const[followersOfCurrentUser,setFollowersOfCurrentUser] = useState([]);
        const[followingOfCurrentUser,setFollowingOfCurrentUser] = useState([]);
        useEffect(()=>{
            getDetails();

            getFollowersOfCurrentUser();
            getFollowingOfCurrentUser();
            
            getFollowersOfAnotherUser();
            getFollowingOfAnotherUser();
           
            //Fetch the details of the user with id as anotherUserId
        },[])
    
    useEffect(()=>{
        //Here check if you follow the user id already
        followingOfCurrentUser.map(follower=>{
            if(follower["following"]===userId){
                setFollows(true);
            }
        })
    },[followersOfCurrentUser])

    
    //FOLLOWERS=================================================================================
    const getFollowingOfCurrentUser =  () =>{
        fetch('https://medium-clone-wim.herokuapp.com/following/'+currentUser)
        .then(async response => {
            const data = await response.json();
  
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                alert('Sorry!Couldn\'t fetch all followers!');
                return Promise.reject(error);
            }
            setFollowingOfCurrentUser(data);

        })
        .catch(error => {
          alert('Sorry!Couldn\'t fetch all the followers!');
        });
    }

    const getFollowersOfCurrentUser = () =>{
        fetch('https://medium-clone-wim.herokuapp.com/follower/'+currentUser)
        .then(async response => {
            const data = await response.json();
  
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                alert('Sorry!Couldn\'t fetch all followers!');
                return Promise.reject(error);
            }
            setFollowersOfCurrentUser(data);

        })
        .catch(error => {
          alert('Sorry!Couldn\'t fetch all the followers!');
        });
    }



   
    //ANOTHER USER KA 
    const getFollowingOfAnotherUser = () =>{
        fetch('https://medium-clone-wim.herokuapp.com/following/'+userId)
        .then(async response => {
            const data = await response.json();
  
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                alert('Sorry!Couldn\'t fetch all followers!');
                return Promise.reject(error);
            }
            setFollowingOfAnotherUser(data);

        })
        .catch(error => {
          alert('Sorry!Couldn\'t fetch all the followers!');
        });
    }

    const getFollowersOfAnotherUser = () =>{
        fetch('https://medium-clone-wim.herokuapp.com/follower/'+userId)
        .then(async response => {
            const data = await response.json();
  
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                alert('Sorry!Couldn\'t fetch all followers!');
                return Promise.reject(error);
            }
            setFollowersOfAnotherUser(data);

        })
        .catch(error => {
          alert('Sorry!Couldn\'t fetch all the followers!');
        });
    }



    
    
    
    //FOLLOWING=================================================================================




    //This is UNTOUCHABLE=========================================================================
    
    
    const getDetails= ()=>{
        fetch('https://medium-clone-wim.herokuapp.com/users/'+userId)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            setUserName(data["name"]);
            setUserBio(data["bio"]);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

    const followUser = ()=>{

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({ follower:currentUser,following:userId})
        };
        fetch('https://medium-clone-wim.herokuapp.com/following', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data1 = await response.json();
                const data = isJson && data1;
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    alert('Sorry! Couldn\'t Follow successfully! Please try again!')
                    return Promise.reject(error);
                }
                setFollows(true);
                getFollowersOfAnotherUser();   
            })
            .catch(error => {
                console.log(error)
                alert('Sorry! Couldn\'t Follow successfully! Please try again!')
            });

    }

    return (
        <div className = "displayProfileDetails">
            {/* <img id="profilePhoto" name = "profilePhoto" src={userProfilePic}></img> */}
            <div className="row">
                <div className="col-sm-4">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4 id="nameOfUser" name = "userName">{userName}</h4>
                            <h6 id="bioOfUser" name = "userBio">{userBio}</h6>
                        </div>
                        <div className="col-sm-2">

                        {currentUser!==userId?follows?<h4 id="followBtn">Following</h4>:<button id="followBtn" onClick={followUser}>Follow</button>:''}     
                        </div>
                    </div>
                </div>
                <div className="counter col-sm-1">
                    <h4 className="numberOfFollowers">{followersOfAnotherUser.length}</h4>
                    <h6 className="hinter">Followers</h6>
                </div>
                <div className="col-sm-1">
                    
                </div>
                <div className="counter col-sm-1">
                    <h4 className="numberOfFollowers">{followingOfAnotherUser.length}</h4>
                    <h6 className="hinter">Following</h6>
                </div>
            </div>
          
            
        </div>
    )
}

export default DisplayProfileDetails
