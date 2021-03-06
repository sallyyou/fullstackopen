import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { setLogin, logout } from './reducers/loginReducer'
import './App.css'
import { initialUsers } from './reducers/userReducer'
import { Switch, Link, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialBlogs())
    }, [dispatch])
    useEffect(() => {
        dispatch(initialUsers())
    }, [dispatch])
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setLogin(user))
        }
    }, [dispatch])
    const user = useSelector(state => state.loggedUser)
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Blogs</Button>
                    <Button color="inherit" component={Link} to="/users">Users</Button>
                    {user
                        ? <em>{user.name} logged in <Button color="inherit" onClick={() => handleLogout()}>logout</Button></em>
                        : <Button color="inherit" component={Link} to="/login">
                            login
                          </Button>
                    }
                </Toolbar>
            </AppBar>
            <Notification />
            <Switch>
                <Route path="/user/:id">
                    <User />
                </Route>
                <Route path="/blog/:id">
                    <Blog />
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/">
                    <BlogList />
                </Route>
            </Switch>
        </Container>
    )
}
// const App = () => {
//     const [blogs, setBlogs] = useState([])
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [user, setUser] = useState(null)
//     const [errorMsg, setErrorMessage] = useState(null)
//     const [successMsg, setSuccessMsg] = useState(null)
//     const blogFormRef = useRef()
//     useEffect(() => {
//         const fetchData = async () => {
//             const blogs = await blogService.getAll()
//             setBlogs(blogs)
//         }
//         fetchData()
//     }, [])
//     useEffect(() => {
//         const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
//         if (loggedUserJSON) {
//             const user = JSON.parse(loggedUserJSON)
//             setUser(user)
//             blogService.setToken(user.token)
//         }
//     }, [])
//     const handleLogin = async (event) => {
//         event.preventDefault()
//         try {
//             const user = await loginService.login({
//                 username, password
//             })
//             window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
//             setUser(user)
//             blogService.setToken(user.token)
//             setUsername('')
//             setPassword('')
//             setSuccessMsg('Login success.')
//             setTimeout(() => {
//                 setSuccessMsg(null)
//             }, 2500)
//         }
//         catch (exception) {
//             console.log(exception)
//             setErrorMessage('Wrong credencial')
//             setTimeout(() => {
//                 setErrorMessage(null)
//             }, 2500)
//         }
//     }
//     const logout = () => {
//         window.localStorage.removeItem('loggedNoteappUser')
//         setUser(null)
//         blogService.setToken('')
//     }

//     const handleUsernameChange = ({ target }) => {
//         setUsername(target.value)
//     }
//     const handlePasswordChange = ({ target }) => {
//         setPassword(target.value)
//     }
//     const createBlog = async (blogObject) => {
//         try {
//             const res = await blogService.create(blogObject)
//             let newList = blogs.concat(res)
//             setBlogs(newList)
//             setSuccessMsg('Create blog success.')
//             setTimeout(() => {
//                 setSuccessMsg(null)
//             }, 2500)
//             blogFormRef.current.toggleVisibility()
//         } catch (exception) {
//             setErrorMessage(exception.message)
//             setTimeout(() => {
//                 setErrorMessage(null)
//             }, 2500)
//         }
//     }
//     const addLikes = async (blogObject) => {
//         try {
//             await blogService.update(blogObject)
//             let newList = await blogService.getAll()
//             setBlogs(newList)
//             setSuccessMsg('Update likes success.')
//             setTimeout(() => {
//                 setSuccessMsg(null)
//             }, 2500)
//         } catch (exception) {
//             setErrorMessage(exception.message)
//             setTimeout(() => {
//                 setErrorMessage(null)
//             }, 2500)
//         }
//     }
//     const removeBlog = async (blog) => {
//         try {
//             await blogService.del(blog)
//             const res = await blogService.getAll()
//             setBlogs(res)
//             setSuccessMsg('Remove blogs success.')
//             setTimeout(() => {
//                 setSuccessMsg(null)
//             }, 2500)
//         } catch (exception) {
//             setErrorMessage(exception.message)
//             setTimeout(() => {
//                 setErrorMessage(null)
//             }, 2500)
//         }
//     }
//     const NoteList = () => (
//         <>
//             <p>{user.username} logged in <button onClick={logout}>logout</button></p>
//             {blogs.map(blog =>
//                 <Blog key={blog.id} blog={blog} addLikes={addLikes} removeBlog={removeBlog} />
//             )}
//             <Togglable buttonLabel="new blog" canceLabel="close" ref={blogFormRef}>
//                 <BlogForm createBlog={createBlog} />
//             </Togglable>
//         </>
//     )
//     return (
//         <div>
//             <h2>blogs</h2>
//             {
//                 errorMsg !== null && <p className="notification error">{errorMsg}</p>
//             }
//             {
//                 successMsg !== null && <p className="notification success">{successMsg}</p>
//             }
//             {
//                 user === null ? <LoginForm
//                     handleSubmit={handleLogin}
//                     username={username}
//                     password={password}
//                     handleUsernameChange={handleUsernameChange}
//                     handlePasswordChange={handlePasswordChange}
//                 /> : NoteList()
//             }


//         </div>
//     )
// }

export default App