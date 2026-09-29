import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute
  from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Dashboard   from "./pages/Dashboard";
import AdminRoute
  from "./components/adminRoute";
import StudentDetails
  from "./pages/StudentDetails";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students/add"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students/edit/:id"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />
        <Route
  path="/students/:id"
  element={
    <ProtectedRoute>
      <StudentDetails />
    </ProtectedRoute>
  }
/>
        <Route
  path="/students/add"
  element={
    <AdminRoute>
      <AddStudent />
    </AdminRoute>
  }
/>

<Route
  path="/students/edit/:id"
  element={
    <AdminRoute>
      <EditStudent />
    </AdminRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;