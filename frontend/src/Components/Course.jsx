import React, { useState } from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';
import CreateTaskModal from './CreateTaskModal';
import { API_BASE_URL } from '../../../.config';


const Course = ({ course, coursesWithOverdueTasks, openEditModal, openDeleteModal, openEditTaskModal, openDeleteTaskModal , isSignedIn, selectedSectionId, fetchTasks, currentCourseId, setCurrentCourseId}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskLink, setNewTaskLink] = useState('');

  const openNewTaskModal = () => {
    setIsNewTaskModalOpen(true);
    setNewTaskName('');
    setNewTaskDescription('');
    setNewTaskDate('');
    setNewTaskLink('');
  };
  
  const handleCreateTask = async (newTask) => {

    console.log('adding:',newTask);
    try {
      const response = await fetch(`${API_BASE_URL}/sections/${selectedSectionId}/courses/${course._id}/tasks/`, {
        method: "POST",
        body: JSON.stringify({ 
          name: newTask.name, 
          description: newTask.description, 
          date: newTask.date, 
          link: newTask.link 
        }), 
        headers:{
          "Content-Type":"application/json"
        }
      });
      const taskMade =  await response.json()
      console.log('taskmade:',taskMade);

      setIsNewTaskModalOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    fetchTasks()
  };
  


    // Function to format the date as dd/mm/yyyy
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

  return (
    <div className={stl.course} key={course.id}>
      <div
        className={`${stl.courseTitle} ${coursesWithOverdueTasks.some(c => c._id === course._id) ? stl.courseTitleRed : ''}`}
        onClick={toggleVisibility}
      >
        <div className={stl.courseName}>
          {course.name}
        </div>

        {isSignedIn && (
          <div className={stl.adminControls}>
            <button className={stl.editButton} onClick={() => openEditModal(course._id, course.name)}>
              <img  style={{cursor:"pointer"}} src="edit.svg" alt="Edit" />
            </button>
            <button className={stl.deleteButton} onClick={() => openDeleteModal(course._id, course.name)}>
              <img style={{cursor:"pointer"}} src="delete.svg" alt="Delete" />
            </button>
          </div>
        )}
      </div>
      <div className={`${stl.content} ${isVisible ? stl.show : stl.hide}`}>
        <table className={stl.tasktable}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Task Name</th>
              <th style={{ width: isSignedIn ? '60%' : '70%' }}>Description</th>
              <th style={{ width: '10%' }}>Date</th>
              <th style={{ width: '5%' }}>Link</th>
              {isSignedIn && <th style={{ width: '10%' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {course.tasks.map((task) => 
            
            (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{formatDate(task.date)}</td>
                <td>
                  <a href={task.link} target="_blank" rel="noopener noreferrer">Link</a>
                </td>
                {isSignedIn && (
                  
                  <td>
                    <div className={stl.adminControls}>
                      <button
                        className={stl.editButton}
                        onClick={() => openEditTaskModal(course._id, task._id, task.name, task.description, task.date, task.link)}
                      >
                        <img style={{cursor:"pointer"}} src="edit.svg" alt="Edit" />
                      </button>
                      <button className={stl.deleteButton} onClick={() => openDeleteTaskModal(course._id, task._id, task.name)}>
                        <img style={{cursor:"pointer"}} src="delete.svg" alt="Delete" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
            }

          </tbody>
        </table>
        {isSignedIn && <div className={stl.createContainer}>
          <button className={stl.blueButton} onClick={openNewTaskModal}>
            Add New Task
          </button>
        </div>
        }
      </div>

      <CreateTaskModal
        isOpen={isNewTaskModalOpen}
        onRequestClose={() => setIsNewTaskModalOpen(false)}
        handleCreateTask={handleCreateTask}
        currentCourseId = {currentCourseId}
        setCurrentCourseId = {setCurrentCourseId}

      />
    </div>

  );
};

export default Course;
