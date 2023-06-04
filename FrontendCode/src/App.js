import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Routes from './routes'
import { logout } from './store/User';
function App() {

  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate])

  function toggleClass() {
    setDropdown(!dropdown)
  }

  function userLogout(){
    let data ={
      userId : user.id,
      token: user.token,
    }
    dispatch(logout(data))
  }

  return (
    // <div className="App">
    // {process.env.REACT_APP_API_URL}
    // </div>
    //   <div>
    //   Hi, waleed
    //   <button onClick={() => dispatch(login({username:'waleed',password:'123'}))}>Login</button>
    // </div>
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            Ikonic Coding Challange
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <!-- Left Side Of Navbar --> */}
            <ul className="navbar-nav me-auto">

            </ul>

            {/* <!-- Right Side Of Navbar --> */}
            <ul className="navbar-nav ms-auto">
              {/* <!-- Authentication Links --> */}
              {
                user ?
                  <li className="nav-item dropdown">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle"
                      href="#" role="button"
                      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      onClick={toggleClass}
                    >
                      {user.name}
                    </a>

                    <div className={`dropdown-menu dropdown-menu-dark dropdown-menu-end ${dropdown ? "d-block" : "d-none"}`} aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to=""
                        onClick={userLogout}>
                        Logout
                      </Link>
                    </div>
                  </li>
                  :
                  <><li className="nav-item">
                    <Link className="nav-link" to="/">Login</Link>
                  </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>

              }


            </ul>
          </div>
        </div>
      </nav>
      <main className="py-4">
        <Routes />
      </main>
    </>
  );
}

export default App;
