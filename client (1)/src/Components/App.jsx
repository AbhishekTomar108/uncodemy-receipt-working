import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'


import { useContext } from 'react';
import { StudentContext } from '../context/StudentState';
import StudentState from '../context/StudentState'
import './style.css'
import './responsive.css'
import RegisteredStudent from './RegisteredStudent'
import RegisterStudentAdd from './Counselor/RegisterStudentAdd'

import Swal from 'sweetalert2'
import AddRegisteredStudent from '../Students/AddRegisteredStudent'
import RegisterStudent from './RegisterStudent'


import AllCourse from './AllCourse'

import { Filter } from '@mui/icons-material'

import BarLoading from '../Students/BarLoading'
import RegistrationReceipt from '../Students/RegistrationReceipt'

// import Navbaar from './components/Navbaar';
export default function App() {
  let ContextValue = useContext(StudentContext);
  return (
      <BrowserRouter>
        <StudentState>
          <Routes>
            

            <Route exact path='/loading' element={<BarLoading />} />
            {/* <Route exact path='/filter' element={<FilterSection />} /> */}
            {/* <Route exact path='/' element={<LogIn />} /> */}
            <Route exact path='/' element={<Home />} />
            {/* <Route exact path='/' element={<RegistartionHome />} /> */}
            
            <Route exact path='/Add-Registered-Student' element={<RegisterStudentAdd/>} />
            <Route exact path='Registered-Student/Add-Registered-Student' element={<AddRegisteredStudent/>} />
            {/* <Route exact path='admin/AllCourse' element={<AllCourse />} /> */}
            <Route exact path='/AllCourse' element={<AllCourse />} />
           
            <Route exact path='/Registered-Student' element={<RegisterStudent />} />
            {/* <Route exact path='admin/Registered-Student/Add-Registered-Student' element={<RegisterStudent />} /> */}
          
           
            
            {/* <Route exact path='admin/attendenceSheet' element={<AttandanceSheet />} /> */}
            <Route exact path='admin/Add-Registered-Student' element={<AddRegisteredStudent />} />
           
            
        
          
            <Route exact path="admin/RegisteredStudent" element={<RegisteredStudent />} />
   
            <Route exact path="Add-Registered-Student/registrationReceipt" element={<RegistrationReceipt/>} />
          </Routes>
          <Footer />
        </StudentState >
      </BrowserRouter >
     

  )
}
