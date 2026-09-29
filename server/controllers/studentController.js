const Student = require("../models/Student");


// ===============================
// Add Student
// ===============================

const addStudent = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      course,
      age,
      gender,
      address,
      admissionDate,
      status,
    } = req.body;


    if (
      !name ||
      !email ||
      !phone ||
      !course ||
      !age ||
      !gender
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Name, email, phone, course, age and gender are required",

      });

    }


    const existingStudent =
      await Student.findOne({
        email,
      });


    if (existingStudent) {

      return res.status(400).json({

        success: false,

        message:
          "Student with this email already exists",

      });

    }


    const student =
      await Student.create({

        name,

        email,

        phone,

        course,

        age,

        gender,

        address,

        admissionDate,

        status,

      });


    res.status(201).json({

      success: true,

      message:
        "Student added successfully",

      student,

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ===============================
// Get All Students
// ===============================

const getStudents = async (req, res) => {
  try {

    const {
      page = 1,
      limit = 5,
      search = "",
      course = "",
      status = "",
    } = req.query;


    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip =
      (pageNumber - 1) * limitNumber;


    // Search filter
    const filter = {};


    if (search.trim() !== "") {

      filter.$or = [

        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },

      ];

    }


    // Course filter
    if (course) {

      filter.course = course;

    }


    // Status filter
    if (status) {

      filter.status = status;

    }


    // Total records
    const totalStudents =
      await Student.countDocuments(filter);


    // Students
    const students =
      await Student.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);


    const totalPages =
      Math.ceil(
        totalStudents / limitNumber
      );


    res.status(200).json({

      success: true,

      students,

      pagination: {

        currentPage: pageNumber,

        totalPages,

        totalStudents,

        limit: limitNumber,

      },

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};


// ===============================
// Get Single Student
// ===============================

const getStudent = async (req, res) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );


    if (!student) {

      return res.status(404).json({

        success: false,

        message:
          "Student not found",

      });

    }


    res.status(200).json({

      success: true,

      student,

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ===============================
// Update Student
// ===============================

const updateStudent = async (
  req,
  res
) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );


    if (!student) {

      return res.status(404).json({

        success: false,

        message:
          "Student not found",

      });

    }


    const updatedStudent =
      await Student.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,

          runValidators: true,
        }

      );


    res.status(200).json({

      success: true,

      message:
        "Student updated successfully",

      student: updatedStudent,

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ===============================
// Delete Student
// ===============================

const deleteStudent = async (
  req,
  res
) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );


    if (!student) {

      return res.status(404).json({

        success: false,

        message:
          "Student not found",

      });

    }


    await Student.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({

      success: true,

      message:
        "Student deleted successfully",

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ===============================
// Student Dashboard Statistics
// ===============================

const getStudentStats = async (req, res) => {

  try {

    // Total students
    const totalStudents =
      await Student.countDocuments();


    // Active students
    const activeStudents =
      await Student.countDocuments({
        status: "Active",
      });


    // Inactive students
    const inactiveStudents =
      await Student.countDocuments({
        status: "Inactive",
      });


    // Course-wise statistics
    const courseStats =
      await Student.aggregate([

        {
          $group: {

            _id: "$course",

            count: {
              $sum: 1,
            },

          },

        },

        {
          $sort: {
            count: -1,
          },
        },

      ]);


    res.status(200).json({

      success: true,

      statistics: {

        totalStudents,

        activeStudents,

        inactiveStudents,

        courseStats,

      },

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


module.exports = {

  addStudent,

  getStudents,

  getStudent,

  updateStudent,

  deleteStudent,

  getStudentStats,

};