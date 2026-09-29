const express =
  require("express");

const router =
  express.Router();
  const {
  adminOnly,
} = require("../middleware/roleMiddleware");


const {
  protect,
} =
  require(
    "../middleware/authMiddleware"
  );


const {

  addStudent,

  getStudents,

  getStudent,

  updateStudent,

  deleteStudent,

  getStudentStats,

} =
  require(
    "../controllers/studentController"
  );


// Dashboard
router.get(
  "/stats",
  protect,
  getStudentStats
);


// View Students - Admin + User
router.get(
  "/",
  protect,
  getStudents
);


// View Single Student - Admin + User
router.get(
  "/:id",
  protect,
  getStudent
);


// Add Student - Admin Only
router.post(
  "/",
  protect,
  adminOnly,
  addStudent
);


// Update Student - Admin Only
router.put(
  "/:id",
  protect,
  adminOnly,
  updateStudent
);


// Delete Student - Admin Only
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteStudent
);

module.exports = router;