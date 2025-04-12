import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Register from '../pages/Register'
import InstituteLogin from '../pages/Login'
import AddInstructor from '../pages/AddInstructor'
import AddCourse from '../pages/AddCourse'
import AddModule from '../pages/AddModule'
import AddLecture from '../pages/AddLecture'
import AddQuestionForm from '../pages/AddQuestions'
import AddQuizForm from '../pages/AddQuizzes'
const AppRoutes = () => {
  return (
    <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<InstituteLogin/>}/>
    <Route path='/add-instructor' element={<AddInstructor/>}/>
    <Route path='/add-course' element={<AddCourse/>}/>
    <Route path='/add-module' element={<AddModule/>}/>
    <Route path='/add-lecture' element={<AddLecture/>}/>
    <Route path='/add-question' element={<AddQuestionForm/>}/>
    <Route path='/add-quizz' element={<AddQuizForm/>}/>


    </Routes>
  )
}

export default AppRoutes
