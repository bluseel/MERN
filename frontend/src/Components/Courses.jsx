import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';
import Course from './Course';
import EditCourseModal from './EditCourseModal';
import DeleteCourseModal from './DeleteCourseModal';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import CreateCourseModal from './CreateCourseModal';
import SigninModal from './SigninModal';

Modal.setAppElement('#root'); // This is important for accessibility reasons

const Courses = (props) => {
  //rerender on change of section
  useEffect(()=>{
    fetchCourses()
    setIsSignedIn(false)
  }, [props.selectedSection])




  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState({});
  const [coursesWithOverdueTasks, setCoursesWithOverdueTasks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentCourseName, setCurrentCourseName] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentTaskName, setCurrentTaskName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [currentTaskDescription, setCurrentTaskDescription] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [currentTaskDate, setCurrentTaskDate] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [currentTaskLink, setCurrentTaskLink] = useState('');
  const [newTaskLink, setNewTaskLink] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false); //creatingClass
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); //creatingClass
  const [updatedTask, setupdatedTask] = useState(); 
  
    

  const [isSignedIn, setIsSignedIn] = useState(false); 
  const handleSignIn = () => {
    if(!isSignedIn){
      setIsSignInModalOpen(true)
    }else{
      setIsSignedIn(false);
    }
  };

    //to get the signedIn state above in app
    useEffect(()=>{
      props.setIsSignedInAPP(isSignedIn)
    }, [isSignedIn])


  const toggleVisibility = (courseId) => {
    setVisibleCourses((prevVisibleCourses) => ({
      ...prevVisibleCourses,
      [courseId]: !EditCourseModal[courseId],
    }));
  };

  //its createModel
  const openNewModal = () => {
    setIsNewModalOpen(true);
    setNewCourseName(''); // Clear previous input if any
  };

  const openEditModal = (courseId, currentName) => {
    setCurrentCourseId(courseId);
    setCurrentCourseName(currentName);
    setNewCourseName(currentName);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (courseId, courseName) => {
    setCurrentCourseId(courseId);
    setCurrentCourseName(courseName);
    setIsDeleteModalOpen(true);
  };

  const openEditTaskModal = (courseId, taskId, taskName, taskDescription, taskDate, taskLink) => {
    setCurrentCourseId(courseId);
    setCurrentTaskId(taskId);
    setCurrentTaskName(taskName);
    setCurrentTaskDescription(taskDescription);
    setCurrentTaskDate(taskDate);
    setCurrentTaskLink(taskLink);
    setNewTaskName(taskName);
    setNewTaskDescription(taskDescription);
    setNewTaskDate(taskDate);
    setNewTaskLink(taskLink);
    setIsEditTaskModalOpen(true);
  };

  const openDeleteTaskModal = (courseId, taskId, taskName) => {
    setCurrentCourseId(courseId);
    setCurrentTaskId(taskId);
    setCurrentTaskName(taskName);
    setIsDeleteTaskModalOpen(true);
  };

  const handleEditCourse = async () => {
    const currentSectionId = props.selectedSection.id
    console.log('editing:',currentCourseId);
    try {
      const response = await fetch(`http://localhost:5000/sections/${currentSectionId}/courses/${currentCourseId}`, {
        method: "PUT",
        body: JSON.stringify({ courseName: newCourseName }), 
        headers:{
          "Content-Type":"application/json"
        }
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    fetchCourses()

  };

  const handleDeleteCourse = async () => {
    const currentSectionId = props.selectedSection.id
    console.log(currentCourseId);
    try {
      const response = await fetch(`http://localhost:5000/sections/${currentSectionId}/courses/${currentCourseId}`, {
        method: "DELETE",
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    fetchCourses()
  };

  const handleEditTask = async () => {


    const currentSectionId = props.selectedSection.id


    
    try {
      const response = await fetch(`http://localhost:5000/sections/${currentSectionId}/courses/${currentCourseId}/tasks/${currentTaskId}`, {
        method: "PUT",
        body: JSON.stringify({ 
          name: newTaskName, 
          description: newTaskDescription, 
          date: newTaskDate, 
          link: newTaskLink
        }), 
        headers:{
          "Content-Type":"application/json"
        }
      }
    );

    setIsEditTaskModalOpen(false);

    } catch (error) {
      console.error("An error occurred:", error);
    }

    fetchCourses()

    // setIsEditTaskModalOpen(false);
  };

  const handleDeleteTask = async () => {

    const currentSectionId = props.selectedSection.id
    try {
      const response = await fetch(`http://localhost:5000/sections/${currentSectionId}/courses/${currentCourseId}/tasks/${currentTaskId}`, {
        method: "DELETE",
      });
      setIsDeleteTaskModalOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    fetchCourses()
  };

  const handleCreateCourse = async () => {
    if (newCourseName.trim() === '') {
      return;
    }

    const currentSectionId = props.selectedSection.id
    try {
      const response = await fetch(`http://localhost:5000/sections/${currentSectionId}/courses/`, {
        method: "POST",
        body: JSON.stringify({ name: newCourseName }), 
        headers:{
          "Content-Type":"application/json"
        }
      });
      setIsNewModalOpen(false);
      fetchCourses()
    } catch (error) {
      console.error("An error occurred:", error);
    }
  
  };

  const fetchCourses = async () => {
    
    const selectedSectionID = props.selectedSection.id;
    try {
      const response = await fetch(`http://localhost:5000/sections/${selectedSectionID}/courses/`, {
        method: "GET"
      });
      const data = await response.json();
      console.log(data);


      setCourses(data);
      checkOverdueTasks(data);
      
    } catch (error) {
      console.error("An error occurred:", error);
      setCourses(props.selectedSection.courses);
      checkOverdueTasks(props.selectedSection.courses);
      
    }
    
  };

  const fetchTasks = async () => {

    
    const selectedSectionID = props.selectedSection.id;
    try {
      const response = await fetch(`http://localhost:5000/sections/${selectedSectionID}/courses/`, {
        method: "GET"
      });
      const data = await response.json();
      console.log(data);

      setCourses(data);
      checkOverdueTasks(data);
      
    } catch (error) {
      console.error("An error occurred:", error);
      setCourses(props.selectedSection.courses);
      checkOverdueTasks(props.selectedSection.courses);
      
    }
    
  };


  const checkOverdueTasks = (courses) => {
    const today = new Date().toISOString().slice(0, 10);
    const overdueCourses = courses.filter((course) =>
      course.tasks.some((task) => new Date(task.date) > new Date(today))
    );
    setCoursesWithOverdueTasks(overdueCourses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className={stl.container}>
      <h2 className={stl.heading}>-- Select a Course --</h2>
      <div className={stl.allcourses}>
        {courses.map((course) => (
          <Course
            key={course._id}
            course={course}
            coursesWithOverdueTasks={coursesWithOverdueTasks}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
            openEditTaskModal={openEditTaskModal}
            openDeleteTaskModal={openDeleteTaskModal}
            isSignedIn={isSignedIn}
            setCourses={setCourses}
            selectedSectionId = {props.selectedSection.id}
            setCurrentTaskId = {setCurrentTaskId}
            fetchTasks = {fetchTasks}
          />
        ))}
      </div>

      <EditCourseModal
        isOpen={isEditModalOpen}
        currentCourseName={currentCourseName}
        newCourseName={newCourseName}
        setNewCourseName={setNewCourseName} // Ensure setNewCourseName is passed
        handleEditCourse={handleEditCourse}
        setIsEditModalOpen={setIsEditModalOpen}
      />

      <DeleteCourseModal
        isOpen={isDeleteModalOpen}
        currentCourseName={currentCourseName}
        handleDeleteCourse={handleDeleteCourse}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />

      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        currentTaskName={currentTaskName}
        currentTaskDescription={currentTaskDescription}
        currentTaskDate={currentTaskDate}
        currentTaskLink={currentTaskLink}
        newTaskName={newTaskName}
        newTaskDescription={newTaskDescription}
        newTaskDate={newTaskDate}
        newTaskLink={newTaskLink}
        handleEditTask={handleEditTask}
        setIsEditTaskModalOpen={setIsEditTaskModalOpen}
        setNewTaskName={setNewTaskName}
        setNewTaskDescription={setNewTaskDescription}
        setNewTaskDate={setNewTaskDate}
        setNewTaskLink={setNewTaskLink}
      />

      <DeleteTaskModal
        isOpen={isDeleteTaskModalOpen}
        currentCourseId = {currentCourseId }
        currentTaskName={currentTaskName}
        currentTaskId={currentTaskId}
        handleDeleteTask={handleDeleteTask}
        setIsDeleteTaskModalOpen={setIsDeleteTaskModalOpen}
        setCurrentTaskId = {setCurrentTaskId } 
      />


      <CreateCourseModal
        isOpen={isNewModalOpen}
        setIsCreateModalOpen={setIsNewModalOpen}
        setNewCourseName = {setNewCourseName}
        newCourseName={newCourseName}
        handleCreateCourse={handleCreateCourse}
      />
      
      <SigninModal
        isOpen={isSignInModalOpen}
        setIsSignInModalOpen = {setIsSignInModalOpen} 
        setIsSignedIn={setIsSignedIn}
        section={props.selectedSection}
        isSuperUser={props.isSuperUser}
        setIsSuperUser={props.setIsSuperUser}

      />


        <div className={stl.signInButtonContainer}>
          <button className={stl.signInButton} onClick={handleSignIn}> {isSignedIn? 'Sign Out':'Sign In'}</button>
        </div>
        
        {isSignedIn &&
          <div className={stl.createContainer}>
            <button className={stl.blueButton} onClick={openNewModal}>Add New Course</button>
          </div>
        }
        
    </div>
  );
};

export default Courses;
