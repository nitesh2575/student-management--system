import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import API from "../services/api";


function StudentDetails() {

  const { id } = useParams();

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const loadStudent = async () => {

    try {

      const response =
        await API.get(
          `/students/${id}`
        );


      setStudent(
        response.data.student
      );


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Student not found"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadStudent();

  }, [id]);


  if (loading) {

    return (

      <div className="container text-center mt-5">

        <div className="spinner-border text-primary" />

        <p className="mt-3">
          Loading student...
        </p>

      </div>

    );

  }


  if (error) {

    return (

      <div className="container mt-5">

        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/students"
          className="btn btn-primary"
        >
          ← Back to Students
        </Link>

      </div>

    );

  }


  return (

    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            👨‍🎓 Student Details
          </h2>

          <p className="text-muted">
            Complete student information
          </p>

        </div>


        <Link
          to="/students"
          className="btn btn-secondary"
        >
          ← Back
        </Link>

      </div>


      <div className="card shadow border-0">

        <div className="card-body p-4">

          <div className="row">


            <div className="col-md-6 mb-4">

              <small className="text-muted">
                Student Name
              </small>

              <h5>
                {student.name}
              </h5>

            </div>


            <div className="col-md-6 mb-4">

              <small className="text-muted">
                Email
              </small>

              <h5>
                {student.email}
              </h5>

            </div>


            <div className="col-md-6 mb-4">

              <small className="text-muted">
                Phone
              </small>

              <h5>
                {student.phone}
              </h5>

            </div>


            <div className="col-md-6 mb-4">

              <small className="text-muted">
                Course
              </small>

              <h5>
                {student.course}
              </h5>

            </div>


            <div className="col-md-4 mb-4">

              <small className="text-muted">
                Age
              </small>

              <h5>
                {student.age}
              </h5>

            </div>


            <div className="col-md-4 mb-4">

              <small className="text-muted">
                Gender
              </small>

              <h5>
                {student.gender}
              </h5>

            </div>


            <div className="col-md-4 mb-4">

              <small className="text-muted">
                Status
              </small>

              <div>

                <span
                  className={
                    student.status === "Active"
                      ? "badge bg-success"
                      : "badge bg-secondary"
                  }
                >
                  {student.status}
                </span>

              </div>

            </div>


            <div className="col-md-6 mb-4">

              <small className="text-muted">
                Admission Date
              </small>

              <h5>

                {student.admissionDate
                  ? new Date(
                      student.admissionDate
                    ).toLocaleDateString()
                  : "N/A"}

              </h5>

            </div>


            <div className="col-12">

              <small className="text-muted">
                Address
              </small>

              <h5>
                {student.address || "N/A"}
              </h5>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


export default StudentDetails;