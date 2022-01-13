import React,{useState,useEffect} from 'react'
import '../styling/PostsContainer.css'
import addPost from './../images/add.png'
import NewPost from './NewPost.js'
import bg from './../images/background2.png'
import Blog from './Blog.js'
const categories=[
    'Show All',
    'Bankruptcy',
    'Corporate',
    'Constitutional',
    'Criminal Defence',
    'Employment and Labor',
    'Entertainment',
    'Estate Planning',
    'Family',
    'Immigration',
    'Intellectual Property',
    'Personal Injury',
    'Tax'
];

function PostsContainer(props) {
    const [allBlogs,setAllBlogs]=useState([]);
    const [filteredBlogs,setFilteredBlogs]=useState([]);
    const [filterCategory,setFilterCategory]=useState('Show All');
    const [openCreatePost,setOpenCreatePost]=useState(false);
    const [searchText,setSearchText] =useState('');
    const [allUsers,setAllUsers] = useState([]);
    const [fetchAllBlogs,setfetchAllBlogs] = useState([]);
    const [calledAllUsers,setCalledAllUsers] = useState(false);
    const [selectedUserBlog,setSelectedUserBlog] = useState('');
    const id = props.id;


    const[allUsersIFollow,setAllUsersIFollow] = useState([]);
    const[blogsOfallUsersIFollow,setBlogsOfAllUsersIFollow] = useState([]);

    const handleFilterCategoryChange=(e)=>{
        e.preventDefault();
        setFilterCategory(e.target.value);
    }

    const settingCalledAllUsers=(val)=>{
        setCalledAllUsers(val)
    }

    const getAllUsers = async () => {

        fetch('https://medium-clone-wim.herokuapp.com/users')
        .then(async response => {
            const data = await response.json();
  
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                console.log('Sorry!Couldn\'t fetch all the users!');
                return Promise.reject(error);
            }
            setAllUsers(data);
        })
        .catch(error => {
            console.log('Sorry!Couldn;t fetch all the users!');
        });
      }
      const getAllBlogs = async () => {
        
        fetch('https://medium-clone-wim.herokuapp.com/blogs')
        .then(async response => {
            const data = await response.json();
  
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                console.log('Sorry!Couldn\'t fetch all the users!');
                return Promise.reject(error);
            }
            setfetchAllBlogs(data);
        })
        .catch(error => {
            console.log('Sorry!Couldn;t fetch all the blogs!');
        });
      }

      useEffect(() => {
       getAllUsers();
       getAllBlogs();
    }, [])

    useEffect(() => {
        setAllBlogs(filteredBlogs.filter(blog=>{
            return blog.blogPost.category===filterCategory
        }))
    }, [filterCategory])
    const handleCreatePost=(e)=>{
        setOpenCreatePost(!openCreatePost);
    }
    const handleSearchTextChange=(e)=>{
        e.preventDefault();
        setSearchText(e.target.value);
    }

    const handleNavigateUser=(e)=>{
        document.querySelector('input[list]').addEventListener('input', function(e) {
            var input = e.target,
                list = input.getAttribute('list'),
                options = document.querySelectorAll('#' + list + ' option'),
                inputValue = input.value;
        
            for(var i = 0; i < options.length; i++) {
                var option = options[i];
        
                if(option.innerText === inputValue) {
                    var id = option.getAttribute('data-value');
                    openUserOrBlog(id);
                    //Now open it from here!
                    break;
                }
            }
        });
    }

    const togglingBlogViewer=(blogId,blogPost)=>{
        props.settingBlogToOpen(blogPost);
        props.settingBlogToOpenID(blogId);
        props.settingOpenBlogViewer(true);
        props.toggleOpenMyBlogs(false);
        props.toggleOpenLikedBlogs(false);
        props.toggleOpenHome(false);
        props.toggleOpenEditBlog(false);
        props.toggleOpenMyProfile(false);
    }

    const togglingMyProfile=(anotherUserId)=>{ 
        props.settingAnotherUserId(anotherUserId);
        props.toggleOpenHome(false);    
        props.toggleOpenMyBlogs(false);
        props.toggleOpenLikedBlogs(false);
        props.settingBlogToOpen(false);
        props.toggleOpenMyProfile(true);
    }


    const openUserOrBlog = (id) =>{
        if(checkIfUser(id)){

            fetch('https://medium-clone-wim.herokuapp.com/users/'+id)
            .then(async response => {
                const data = await response.json();
      
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    console.log('Sorry!Couldn\'t fetch the Blog!');
                    return Promise.reject(error);
                }
                //Toggle and open the My Profile by passing in the anotherUserId as we've got
                togglingMyProfile(id);
            })
            .catch(error => {
                console.log(error); 
                console.log('Sorry!Couldn\'t fetch the Blog!');
            });

        
            //OPEN MY PROFILE

        }else if(checkIfBlog(id)){

            //Fetch the blogPost;

            fetch('https://medium-clone-wim.herokuapp.com/blogs/'+id)
                    .then(async response => {
                        const data = await response.json();
              
                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = (data && data.message) || response.statusText;
                            console.log('Sorry!Couldn\'t fetch the Blog!');
                            return Promise.reject(error);
                        }
                        togglingBlogViewer(id,data);
                    })
                    .catch(error => {
                        console.log(error); 
                        console.log('Sorry!Couldn\'t fetch the Blog!');
                    });

            
            //OPEN IN BLOG VIEWER


        }else{}
    }
    
    const checkIfUser = (id)=>{
        var ifFound = allUsers.some(ele=>ele["_id"]===id);
        return ifFound;
    }
    const checkIfBlog = (id)=>{
        var ifFound = fetchAllBlogs.some(ele=>ele["_id"]===id);
        return ifFound;
    }


    useEffect(() => {
        setAllBlogs(filteredBlogs.filter(blog=>{
            return blog.blogPost.category===filterCategory
        }))
    }, [searchText])

    useEffect(()=>{
        //This function would load all the blogs of the user that they follow!

        //First get the list of users that they follow and store it in a variable

        getFollowers();

        //Next Get all their blogs and add it into the array
        
        
        //sort this array by the  createdAt field

        sortTheBlogsArray();

    },[])


    const getFollowers = () =>{
        const user_id = id;
        fetch('https://medium-clone-wim.herokuapp.com/following/'+id)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                console.log('Sorry!Couldn\'t fetch all followers!');
                return Promise.reject(error);
            }
            data.map(ele=>{
               var id = ele["following"];
                setAllUsersIFollow(oldArray=>[...oldArray,id]);
            })
            
        }).then(()=>{
            console.log("KHATAM!");
            settingCalledAllUsers(true);
        })
        .catch(error => {
            console.log('Sorry!Couldn\'t fetch all the followers!');
        });
    }
    useEffect(()=>{
        if(calledAllUsers){
            getAllBlogsOfPeopleIFollow();
        }
    },[calledAllUsers])
    
    const getAllBlogsOfPeopleIFollow = () =>{
        setBlogsOfAllUsersIFollow([])
        console.log("Called!")
        allUsersIFollow.length>0?
        allUsersIFollow.map(userId=>{
            console.log("Inside as :"+userId)
            // var currentUserId = user["_id"];
            fetch('https://medium-clone-wim.herokuapp.com/blogs/userid/'+userId)
            .then(async response => {
                const data = await response.json();
      
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    console.log('Sorry!Couldn\'t fetch all followers!');
                    return Promise.reject(error);
                }
                // 
                data.map(ele=>{
                    setBlogsOfAllUsersIFollow(oldArray => [...oldArray,ele]);
                })
               
                // console.log('New Size : '+data);
                // setAllUsersIFollow(oldArray);
            })
            .catch(error => {
                console.log('Sorry!Couldn\'t fetch all the followers!');
            });
        }):doNothing();
    }

    useEffect(()=>{
        setFilteredBlogs([]);
        blogsOfallUsersIFollow.length> 0?
        blogsOfallUsersIFollow.map(ele=>{     
                    setFilteredBlogs(oldArray => [...oldArray,
                    {
                        id:ele["_id"],
                        blogPost:ele
                    }]);
                })
          :doNothing()
    },[blogsOfallUsersIFollow])

    const doNothing=()=>{} 

    const sortTheBlogsArray=()=>{
        
    }
    
    return (
        <div className="postsContainer">
            {openCreatePost?
                <NewPost type="create" username={props.username} name={props.name} bio={props.bio} id={props.id} toggleOpen={handleCreatePost}/>
                :
                    <>
                        <div className="filters">
                        <div className = "categories row">
                            <div className="col-9">
                                    <input list="browsers" name="search" placeholder="Search User,Blogs,Tags.." id="search"  onSelect={(e)=>handleNavigateUser(e)}></input>
                                        <datalist id="browsers" type="hidden" placeholder="Search" >
                                        {
                                            allUsers.map(user=>(
                                                <option key={user["_id"]} data-value={user["_id"]}>{user["name"]}</option>
                                            ))
                                        }
                                        {
                                            fetchAllBlogs.map(blog=>(
                                                <option key={blog["_id"]} data-value={blog["_id"]}>{blog["title"]}</option>
                                            ))
                                        }
                                        {
                                            fetchAllBlogs.map(blog=>(
                                                <option key={blog["_id"]}  data-value={blog["_id"]}>{blog["tags"]}</option>
                                            ))
                                        }
                                    </datalist>
                                    </div>
                                  
                                    <select id="filterCategory" onChange={(e)=>handleFilterCategoryChange(e)}>
                                    {
                                        categories.map(category=>(
                                        <option key={category} value={category} className="filtersBtn">{category} </option>
                                        ))
                                    }
                                    </select>
                                </div>
                            <div className = "row">
                                <div className="allBlogs ">  
                                {
                                    filterCategory==='Show All'?
                                            filteredBlogs.length > 0 ?
                                            filteredBlogs.map(({id,blogPost})=>(
                                                <Blog key={id} id={id} blogPost={blogPost} setBlogToOpen={props.settingBlogToOpen}  toggleOpenMyProfile={props.toggleOpenMyProfile}
                                                toggleOpenBlogViewer={props.settingOpenBlogViewer} setBlogToOpenID={props.settingBlogToOpenID} toggleOpenMyBlogs={props.toggleOpenMyBlogs} toggleOpenLikedBlogs={props.toggleOpenLikedBlogs} toggleOpenHome={props.toggleOpenHome} toggleOpenEditBlog={props.toggleOpenEditBlog} type='home'
                                                />)):<><img width="500px" height="400px" src={bg} id="sorry"></img><h1 id="sorryMsg">Sorry!No Blogs have been Blogs Posted Yet!</h1></>
                                        : 
                                        allBlogs.length > 0 ?
                                            allBlogs.map(({id,blogPost})=>(
                                                <Blog key={id} id={id} blogPost={blogPost} setBlogToOpen={props.settingBlogToOpen} toggleOpenMyProfile={props.toggleOpenMyProfile}
                                                toggleOpenBlogViewer={props.settingOpenBlogViewer} setBlogToOpenID={props.settingBlogToOpenID} toggleOpenMyBlogs={props.toggleOpenMyBlogs} toggleOpenLikedBlogs={props.toggleOpenLikedBlogs} toggleOpenHome={props.toggleOpenHome} toggleOpenEditBlog={props.toggleOpenEditBlog} type='homeBlogs'
                                                />
                                        )): 
                                        <><img width="500px" height="400px" src={bg} id="sorry"></img><h1 id="sorryMsg">Sorry! No Blogs of  {filterCategory} Category have been Posted Yet :(</h1></>
                                }
                                </div>
                            </div>
                        </div>
                        <button id="addButton">
                            <img src={addPost} onClick={(e)=>handleCreatePost(e)}></img>
                        </button>
                    </>
                }
        </div>
    )
}
export default PostsContainer

