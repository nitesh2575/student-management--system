import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";


function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();


  const [form, setForm] =
    useState({

      email: "",
      password: "",

    });


  const [error, setError] =
    useState("");


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");


      try {

        const response =
          await API.post(
            "/auth/login",
            form
          );


        login(
          response.data.token,
          response.data.user
        );


        navigate("/dashboard");


      } catch (error) {

        setError(
          error.response?.data
            ?.message ||
          "Login failed"
        );

      }

    };


  return (

    <div className="container">

      <div className="row justify-content-center mt-5">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h3 className="text-center mb-4">
                🔐 Login
              </h3>


              {error && (

                <div className="alert alert-danger">
                  {error}
                </div>

              )}


              <form
                onSubmit={
                  handleSubmit
                }
              >

                <div className="mb-3">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


                <div className="mb-3">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={
                      form.password
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>


              <p className="text-center mt-3">

                Don't have an account?

                {" "}

                <Link to="/register">
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;