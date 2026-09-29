import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";


function Students() {

  // ==============================
  // User / Admin
  // ==============================

  const { user } = useAuth();

  const isAdmin = user?.role === "admin";


  // ==============================
  // States
  // ==============================

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [course, setCourse] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalStudents: 0,
    limit: 5,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==============================
  // Load Students
  // ==============================

  const loadStudents = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await API.get(
        `/students?page=${page}&limit=5&search=${encodeURIComponent(
          search
        )}&course=${encodeURIComponent(
          course
        )}&status=${encodeURIComponent(
          status
        )}`
      );


      // Students data

      setStudents(
        response.data.students || []
      );


      // Pagination data

      setPagination(
        response.data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalStudents: 0,
          limit: 5,
        }
      );


    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to load students"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==============================
  // Load when page/filter changes
  // ==============================

  useEffect(() => {

    loadStudents();

  }, [
    page,
    search,
    course,
    status,
  ]);


  // ==============================
  // Delete Student
  // ==============================

  const deleteStudent = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      await API.delete(
        `/students/${id}`
      );


      alert(
        "Student deleted successfully"
      );


      // Reload students

      loadStudents();


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete student"
      );

    }

  };


  // ==============================
  // Search Change
  // ==============================

  const handleSearch = (e) => {

    setSearch(e.target.value);

    // Reset page
    setPage(1);

  };


  // ==============================
  // Course Change
  // ==============================

  const handleCourse = (e) => {

    setCourse(e.target.value);

    // Reset page
    setPage(1);

  };


  // ==============================
  // Status Change
  // ==============================

  const handleStatus = (e) => {

    setStatus(e.target.value);

    // Reset page
    setPage(1);

  };


  // ==============================
  // Clear Filters
  // ==============================

  const clearFilters = () => {

    setSearch("");

    setCourse("");

    setStatus("");

    setPage(1);

  };


  // ==============================
  // Loading Screen
  // ==============================

  if (loading) {

    return (

      <div className="container text-center mt-5">

        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>

        <p className="mt-3">
          Loading students...
        </p>

      </div>

    );

  }


  // ==============================
  // Main UI
  // ==============================

  return (

    <div className="container py-4">


      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            👨‍🎓 Students
          </h2>

          <p className="text-muted mb-0">
            Manage all student records
          </p>

        </div>


        {/* Admin Only */}

        {isAdmin && (

          <Link
            to="/students/add"
            className="btn btn-primary"
          >
            ➕ Add Student
          </Link>

        )}

      </div>


      {/* ================================= */}
      {/* Error */}
      {/* ================================= */}

      {error && (

        <div className="alert alert-danger">

          {error}

        </div>

      )}


      {/* ================================= */}
      {/* Search & Filters */}
      {/* ================================= */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            🔍 Search & Filter
          </h5>


          <div className="row g-3">


            {/* Search */}

            <div className="col-md-5">

              <label className="form-label">
                Search
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email or phone..."
                value={search}
                onChange={handleSearch}
              />

            </div>


            {/* Course */}

            <div className="col-md-3">

              <label className="form-label">
                Course
              </label>

              <select
                className="form-select"
                value={course}
                onChange={handleCourse}
              >

                <option value="">
                  All Courses
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


            {/* Status */}

            <div className="col-md-2">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={handleStatus}
              >

                <option value="">
                  All
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>


            {/* Clear */}

            <div className="col-md-2 d-flex align-items-end">

              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={clearFilters}
              >
                Clear
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* Student Count */}
      {/* ================================= */}

      <div className="mb-3">

        <span className="text-muted">

          Total Students:

          <strong className="ms-1">
            {pagination.totalStudents}
          </strong>

        </span>

      </div>


      {/* ================================= */}
      {/* Student Table */}
      {/* ================================= */}

      <div className="card shadow-sm border-0">

        <div className="card-body p-0">

          {students.length === 0 ? (

            /* No Students */

            <div className="text-center py-5">

              <div className="fs-1">
                👨‍🎓
              </div>

              <h5 className="mt-3">
                No students found
              </h5>

              <p className="text-muted">
                Try changing your search or filters.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">


                {/* ================================= */}
                {/* Table Header */}
                {/* ================================= */}

                <thead className="table-dark">

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Name
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Phone
                    </th>

                    <th>
                      Course
                    </th>

                    <th>
                      Age
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                {/* ================================= */}
                {/* Table Body */}
                {/* ================================= */}

                <tbody>

                  {students.map(
                    (student, index) => (

                      <tr
                        key={student._id}
                      >


                        {/* Number */}

                        <td>

                          {(
                            (page - 1) * 5
                          ) + index + 1}

                        </td>


                        {/* Name */}

                        <td>

                          <strong>
                            {student.name}
                          </strong>

                        </td>


                        {/* Email */}

                        <td>
                          {student.email}
                        </td>


                        {/* Phone */}

                        <td>
                          {student.phone}
                        </td>


                        {/* Course */}

                        <td>

                          <span className="badge bg-info text-dark">

                            {student.course}

                          </span>

                        </td>


                        {/* Age */}

                        <td>
                          {student.age}
                        </td>


                        {/* Status */}

                        <td>

                          <span
                            className={
                              student.status ===
                              "Active"
                                ? "badge bg-success"
                                : "badge bg-secondary"
                            }
                          >

                            {student.status}

                          </span>

                        </td>


                        {/* Actions */}

                        <td>

                          {/* View - Everyone */}

                          <Link
                            to={`/students/${student._id}`}
                            className="btn btn-sm btn-info me-2"
                            title="View Student"
                          >
                            👁️
                          </Link>


                          {/* Admin Actions */}

                          {isAdmin && (

                            <>

                              {/* Edit */}

                              <Link
                                to={`/students/edit/${student._id}`}
                                className="btn btn-sm btn-warning me-2"
                                title="Edit Student"
                              >
                                ✏️
                              </Link>


                              {/* Delete */}

                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                title="Delete Student"
                                onClick={() =>
                                  deleteStudent(
                                    student._id
                                  )
                                }
                              >
                                🗑️
                              </button>

                            </>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* ================================= */}
      {/* Pagination */}
      {/* ================================= */}

      {pagination.totalPages > 1 && (

        <div className="d-flex justify-content-center mt-4">

          <div className="btn-group">


            {/* Previous */}

            <button
              type="button"
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
            >

              ← Previous

            </button>


            {/* Page Numbers */}

            {Array.from(
              {
                length:
                  pagination.totalPages,
              },
              (_, index) => {

                const pageNumber =
                  index + 1;


                return (

                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      page === pageNumber
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() =>
                      setPage(pageNumber)
                    }
                  >

                    {pageNumber}

                  </button>

                );

              }
            )}


            {/* Next */}

            <button
              type="button"
              className="btn btn-outline-primary"
              disabled={
                page ===
                pagination.totalPages
              }
              onClick={() =>
                setPage(page + 1)
              }
            >

              Next →

            </button>


          </div>

        </div>

      )}


    </div>

  );

}


export default Students;