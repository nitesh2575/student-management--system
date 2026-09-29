import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";

function EditStudent() {

  const { id } = useParams();

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

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");


  // =========================
  // Load Student
  // =========================

  const loadStudent = async () => {

    try {

      const response =
        await API.get(
          `/students/${id}`
        );

      const student =
        response.data.student;


      setForm({

        name: student.name || "",

        email: student.email || "",

        phone: student.phone || "",

        course: student.course || "",

        age: student.age || "",

        gender: student.gender || "",

        address: student.address || "",

        admissionDate:
          student.admissionDate
            ? new Date(
                student.admissionDate
              )
                .toISOString()
                .split("T")[0]
            : "",

        status:
          student.status || "Active",

      });


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to load student"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadStudent();

  }, [id]);


  // =========================
  // Handle Change
  // =========================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };


  // =========================
  // Update Student
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setSaving(true);

      setError("");


      try {

        await API.put(
          `/students/${id}`,
          {
            ...form,
            age: Number(form.age),
          }
        );


        alert(
          "Student updated successfully"
        );


        navigate("/students");


      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to update student"
        );

      } finally {

        setSaving(false);

      }

    };


  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="container text-center mt-5">

        <div
          className="spinner-border text-primary"
        />

        <p className="mt-3">
          Loading student...
        </p>

      </div>

    );

  }


  return (

    <div className="container py-4">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h2 className="fw-bold mb-4">
                ✏️ Edit Student
              </h2>


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
                      onChange={
                        handleChange
                      }
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
                      onChange={
                        handleChange
                      }
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
                      onChange={
                        handleChange
                      }
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
                      onChange={
                        handleChange
                      }
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
                      onChange={
                        handleChange
                      }
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
                      onChange={
                        handleChange
                      }
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
                      onChange={
                        handleChange
                      }
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
                      value={
                        form.admissionDate
                      }
                      onChange={
                        handleChange
                      }
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
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                </div>


                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={saving}
                  >

                    {saving
                      ? "Updating..."
                      : "💾 Update Student"}

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

export default EditStudent;