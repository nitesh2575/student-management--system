import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddStudent() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    age: "",
    gender: "",
    address: "",
    admissionDate: "",
    status: "Active",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      await API.post(
        "/students",
        {
          ...form,
          age: Number(form.age),
        }
      );


      alert(
        "Student added successfully"
      );

      navigate("/students");


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to add student"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="container py-4">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h2 className="fw-bold mb-4">
                ➕ Add Student
              </h2>


              {error && (

                <div className="alert alert-danger">
                  {error}
                </div>

              )}


              <form onSubmit={handleSubmit}>

                <div className="row">


                  {/* Name */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Student Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      required
                    />

                  </div>


                  {/* Email */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="student@gmail.com"
                      required
                    />

                  </div>


                  {/* Phone */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                    />

                  </div>


                  {/* Course */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Course
                    </label>

                    <select
                      name="course"
                      className="form-select"
                      value={form.course}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Course
                      </option>

                      <option value="BCA">
                        BCA
                      </option>

                      <option value="MCA">
                        MCA
                      </option>

                      <option value="BBA">
                        BBA
                      </option>

                      <option value="MBA">
                        MBA
                      </option>

                      <option value="B.Tech">
                        B.Tech
                      </option>

                      <option value="M.Tech">
                        M.Tech
                      </option>

                    </select>

                  </div>


                  {/* Age */}

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Age
                    </label>

                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      value={form.age}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      required
                    />

                  </div>


                  {/* Gender */}

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Gender
                    </label>

                    <select
                      name="gender"
                      className="form-select"
                      value={form.gender}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>


                  {/* Status */}

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={form.status}
                      onChange={handleChange}
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                    </select>

                  </div>


                  {/* Admission Date */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Admission Date
                    </label>

                    <input
                      type="date"
                      name="admissionDate"
                      className="form-control"
                      value={form.admissionDate}
                      onChange={handleChange}
                    />

                  </div>


                  {/* Address */}

                  <div className="col-12 mb-3">

                    <label className="form-label">
                      Address
                    </label>

                    <textarea
                      name="address"
                      className="form-control"
                      rows="3"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                    />

                  </div>

                </div>


                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >

                    {loading
                      ? "Saving..."
                      : "💾 Save Student"}

                  </button>


                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate("/students")
                    }
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AddStudent;