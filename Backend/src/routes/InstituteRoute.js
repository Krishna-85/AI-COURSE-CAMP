import express from "express";
import auth from "../middleware/Auth.js";
import {
  createInstitute,
  addInstructor,
  loginInstitute,
  addCourse,
  addModule,
  addLecture,
  addQuestion,
  addQuiz,
  addTest,
  addExam,
  Instructors,
  courses,
  modules,
  Quizzes,
  Lectures,
} from "../controllers/Institutecontroller.js";

const router = express.Router();

router.post("/create", createInstitute);
router.post("/login", loginInstitute);
router.post("/addInstructor", auth, addInstructor);
router.get("/Instructors", auth,  Instructors);
router.post("/addCourse", auth, addCourse);
router.post("/addModule", auth, addModule);
router.get("/courses", auth, courses);
router.post("/addLecture", auth, addLecture);
router.get("/lecture", auth, Lectures);
router.get("/modules", auth, modules);
router.post("/addquestion", auth, addQuestion);
router.post("/addQuiz", auth, addQuiz);
router.get("/getQuizzes", auth, Quizzes);
router.post("/addTest", auth, addTest);
router.post("/addExam", auth, addExam);

export default router;
