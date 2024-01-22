import React, { useState } from 'react'
// import StudentContext from './StudentContext'
import { createContext } from "react";
import Swal from 'sweetalert2'

export const StudentContext = createContext();



const StudentState = (props) => {

  const [loggedInPerson, setLoggedInperson] = useState();
  const [demoStudent, setDemoStudent] = useState()
  const [allCounselor ,setAllCounselor] = useState()
  const [runningBatch,setRunningBatch] = useState()
  const [progress, setProgress]  = useState(0)
  const [barStatus, setBarStatus]  = useState(false)
  const [currentBatch, setCurrentBatch] = useState()
  const [studentId, setStudentId] = useState([])

  const [student, setStudent] = useState({
    Name: "",
    Number: "",
  })

  const [teacher, setTeacher] = useState({
    TrainerName: "",
    trainernumber: "",
  })
  const [Admin, setAdmin] = useState({
    TrainerName: "",
    trainernumber: "",
  })


  
  const getAllMainSubCourse = async (id) => {
    let AllCourse = await fetch(`http://localhost:8000/allSubMainCourse`, {
      method: "GET",
    });

    AllCourse = await AllCourse.json()
    return AllCourse
  }

  const updateProgress = (length)=>{

    setProgress(length)
    console.log('progress length =',length)
    
  }
  const updateBarStatus = (value)=>{
    setBarStatus(value)
  }

  
  const getAllMainCourse = async () => {
    let allMainCourse = await fetch("http://localhost:8000/getAllMainCourse",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    allMainCourse = await allMainCourse.json()
    return allMainCourse
  }

  
  const getAllCounselor = async () => {
    let allCounselor = await fetch("http://localhost:8000/getAllCounselor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    allCounselor = await allCounselor.json()
    console.log('state counselor =',allCounselor)
    setAllCounselor(allCounselor)
    return allCounselor
  }
  const getAllTrainer = async () => {
    let allTrainer = await fetch("http://localhost:8000/trainer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    allTrainer = await allTrainer.json()
    return allTrainer
  }

  

  const getRegisterStudent = async()=>{
   
    try{
    let registerStudent = await fetch('http://localhost:8000/getregisterStudent',{
      method:'GET'
    })

    registerStudent = await registerStudent.json() 
    return registerStudent 

  }
  catch(error){
    Swal.fire({   
      icon:  'error',
      title: 'Oops...',
      text:  'Something went Wrong Try Again',
    }) 
  
  }   
  }

  const SuccessMsg=()=>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Candidate Has Been Registered',
      showConfirmButton: false,
      timer: 1500
    })
    
  }

  
  return (
    <div>
      <StudentContext.Provider value={{getRegisterStudent:getRegisterStudent, getAllTrainer:getAllTrainer,getAllCounselor:getAllCounselor, getAllMainSubCourse:getAllMainSubCourse, updateProgress:updateProgress,updateBarStatus:updateBarStatus,SuccessMsg:SuccessMsg,progress:progress,barStatus:barStatus}}>
        {props.children}
      </StudentContext.Provider>
    </div>
  )
}

export default StudentState;