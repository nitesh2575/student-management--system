import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";


function Navbar() {

  const {
    user,
    logout,
  } = useAuth();


  const navigate =
    useNavigate();


  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold"
        >
          🎓 Student Management
        </Link>


        <div className="navbar-nav ms-auto">

          {user ? (

            <>

              <Link
                to="/dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>


              <Link
                to="/students"
                className="nav-link"
              >
                Students
              </Link>


              <span className="nav-link text-info">
                👤 {user.name}
              </span>


              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"
                className="nav-link"
              >
                Login
              </Link>


              <Link
                to="/register"
                className="nav-link"
              >
                Register
              </Link>

            </>

          )}

        </div>

      </div>

    </nav>

  );
}

export default Navbar;