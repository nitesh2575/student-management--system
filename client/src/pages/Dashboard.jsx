import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../services/api";


function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const loadStats = async () => {

    try {

      const response =
        await API.get(
          "/students/stats"
        );


      setStats(
        response.data.statistics
      );


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to load dashboard"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadStats();

  }, []);


  if (loading) {

    return (

      <div className="container text-center mt-5">

        <div
          className="spinner-border text-primary"
        />

        <p className="mt-3">
          Loading dashboard...
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

      </div>

    );

  }


  return (

    <div className="container py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            📊 Dashboard
          </h2>

          <p className="text-muted">
            Student Management Overview
          </p>

        </div>


        <Link
          to="/students/add"
          className="btn btn-primary"
        >
          ➕ Add Student
        </Link>

      </div>


      {/* Statistics Cards */}

      <div className="row g-4 mb-4">


        {/* Total */}

        <div className="col-md-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <p className="text-muted mb-1">
                    Total Students
                  </p>

                  <h2 className="fw-bold">
                    {stats.totalStudents}
                  </h2>

                </div>


                <div
                  className="fs-1"
                >
                  👨‍🎓
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Active */}

        <div className="col-md-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <p className="text-muted mb-1">
                    Active Students
                  </p>

                  <h2 className="fw-bold text-success">
                    {stats.activeStudents}
                  </h2>

                </div>


                <div className="fs-1">
                  🟢
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Inactive */}

        <div className="col-md-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <p className="text-muted mb-1">
                    Inactive Students
                  </p>

                  <h2 className="fw-bold text-secondary">
                    {stats.inactiveStudents}
                  </h2>

                </div>


                <div className="fs-1">
                  ⚪
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Course Statistics */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            📚 Course Statistics
          </h4>


          {stats.courseStats.length === 0 ? (

            <p className="text-muted">
              No student data available.
            </p>

          ) : (

            stats.courseStats.map(
              (course) => {

                const percentage =
                  stats.totalStudents > 0
                    ? Math.round(
                        (course.count /
                          stats.totalStudents) *
                          100
                      )
                    : 0;


                return (

                  <div
                    key={course._id}
                    className="mb-4"
                  >

                    <div className="d-flex justify-content-between mb-1">

                      <strong>
                        {course._id}
                      </strong>

                      <span>
                        {course.count} students
                      </span>

                    </div>


                    <div
                      className="progress"
                      style={{
                        height: "25px",
                      }}
                    >

                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      >

                        {percentage}%

                      </div>

                    </div>

                  </div>

                );

              }
            )

          )}

        </div>

      </div>


      {/* Quick Actions */}

      <div className="row g-4 mt-2">

        <div className="col-md-6">

          <Link
            to="/students"
            className="text-decoration-none"
          >

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h5>
                  📋 View All Students
                </h5>

                <p className="text-muted mb-0">
                  View, search, edit and
                  delete student records.
                </p>

              </div>

            </div>

          </Link>

        </div>


        <div className="col-md-6">

          <Link
            to="/students/add"
            className="text-decoration-none"
          >

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h5>
                  ➕ Add New Student
                </h5>

                <p className="text-muted mb-0">
                  Add a new student to
                  the system.
                </p>

              </div>

            </div>

          </Link>

        </div>

      </div>

    </div>

  );

}


export default Dashboard;