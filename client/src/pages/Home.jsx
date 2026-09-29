function Home() {

  return (

    <div className="container">

      <div className="text-center mt-5">

        <h1 className="display-4 fw-bold">
          🎓 Student Management System
        </h1>

        <p className="lead text-muted">
          Manage students easily with
          our MERN application.
        </p>

      </div>


      <div className="row mt-5">

        <div className="col-md-4">

          <div className="card shadow-sm text-center p-4">

            <h2>👨‍🎓</h2>

            <h4>
              Student Management
            </h4>

            <p className="text-muted">
              Add, edit and delete
              student records.
            </p>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center p-4">

            <h2>🔍</h2>

            <h4>
              Search
            </h4>

            <p className="text-muted">
              Quickly find students
              by name or course.
            </p>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center p-4">

            <h2>📊</h2>

            <h4>
              Dashboard
            </h4>

            <p className="text-muted">
              View student statistics
              and reports.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;