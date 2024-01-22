import React, { useState, useEffect, useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { adddata, deldata, updatedata } from "../context/ContextProvider";
import Swal from "sweetalert2";
import { StudentContext } from "../context/StudentState";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";

export default function Home() {
  let ContextValue = useContext(StudentContext);

  document.title = "StudentDashboard - Admin panel";

  const navigate = useNavigate();

  // const [searchQuery, setSearchQuery] = useState();
  const [register, setRegister] = useState();
  const [allCourse, setAllCourse] = useState();
  const [allCourseLength, setAllCourseLength] = useState();
  const [course, setCourse] = useState();
  const [currentRegisterdata, setCurrentRegister] = useState()

  const getAllCourses = async () => {
    console.log("all course function");
    ContextValue.updateProgress(30);
    ContextValue.updateBarStatus(true);

    let allCourse = await ContextValue.getAllMainSubCourse();

    console.log("all course =", allCourse);
    setAllCourse(allCourse.allCourse);
    setAllCourseLength(allCourse.courses.length);
    setCourse(allCourse.courses);
    ContextValue.updateProgress(100);
    ContextValue.updateBarStatus(false);
  };


  useEffect(() => {
    // fetchAdminStatus();
    getRegisteredStudent()
    getAllCourses();
  }, []);

  const getRegisteredStudent = async()=>{
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)

    let registeredStudent = await ContextValue.getRegisterStudent()
    setRegister(registeredStudent)
    setCurrentRegister(registeredStudent)

    ContextValue.updateProgress(100)
        ContextValue.updateBarStatus(false)
  }
 

  //search
   const moveToRegisterStudent = () => {
    navigate("Registered-Student", { state: { registerStudent: register } });
  };
  const moveToAddStudent = () => {
    navigate("Add-Registered-Student");
  }; 

  const moveToAllCourses = () => {
    navigate("AllCourse", { state: { course: course, allCourse: allCourse } });
  };

  return (
    <>
      <Header/>
      <div className="sidebar-main-container">
        {/* <Sidebar /> */}
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="row total-detail-container">
              <div className="detail-card"> 

                <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-secondary">
                    <div className="card-body" onClick={moveToAddStudent}>
                      <div className="media">
                        <span className="mr-3">
                        <i class="fa-solid fa-plus"/>
                        </span>
                        <div
                          className="media-body text-white"
                          
                        >
                          <p className="mb-1">Add Registration</p>
                          {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                          {/* <small>76% Increase in 20 Days</small> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  

                <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card p-0 bg-secondary">
                <div className="card-body" onClick={moveToRegisterStudent}>
                  <div className="media">
                    <span className="mr-3">
                    <i class="fa-regular fa-address-card"/>
                    </span>
                    <div className="media-body text-white" >
                      <p className="mb-1">Total Registration</p>
                      <h3 className="text-white">{register && register.length}</h3>
                      {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div> */}
                      {/* <small>76% Increase in 20 Days</small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>  

            <div className="col-xl-3 col-xxl-3 col-sm-6">
                  <div className="widget-stat card p-0 bg-danger">
                    <div className="card-body">
                      <div className="media">
                        <span className="mr-3">
                          <i class="fa-regular fa-newspaper" />
                        </span>
                        <div
                          className="media-body text-white"
                          onClick={moveToAllCourses}
                        >
                          <p className="mb-1">All Course</p>
                          <h3 className="text-white">
                            {allCourseLength && allCourseLength}
                          </h3>
                          {/* <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "30%" }}
                        />
                      </div> */}
                          {/* <small>30% Increase in 30 Days</small> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
              
              
              </div>
            

              {/* <div className='right-left-arrow'>
            <i class="fa-solid fa-left-long" onClick={backItem}></i>
            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
            </div> */}
            </div>
          </div>
        </div>
      </div>

      {/***********************************
      Content body end
*/}
    </>
  );
}
