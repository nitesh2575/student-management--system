import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";


function Register() {

  const navigate =
    useNavigate();


  const [form, setForm] =
    useState({

      name: "",
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

        await API.post(
          "/auth/register",
          form
        );


        alert(
          "Registration Successful"
        );


        navigate("/login");


      } catch (error) {

        setError(
          error.response?.data
            ?.message ||
          "Registration failed"
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
                🎓 Create Account
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
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>


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
                  className="btn btn-primary w-100"
                >
                  Register
                </button>

              </form>


              <p className="text-center mt-3">

                Already have an account?

                {" "}

                <Link to="/login">
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Register;