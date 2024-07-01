import React from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';

const DeleteTaskModal = ({ isOpen,currentCourseId, currentTaskName, currentTaskId, handleDeleteTask, setIsDeleteTaskModalOpen, setCurrentTaskId }) => {
  const handleDeleteTasklocal = ()=>{

    setCurrentTaskId(currentTaskId)
    handleDeleteTask()
  } 
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsDeleteTaskModalOpen(false)}
      contentLabel="Delete Task"
      className={stl.modal}
      overlayClassName={stl.overlay}
    >
      <h2>Delete Task</h2>
      <p>Are you sure you want to delete the task "{currentTaskName}"?</p>
      <button onClick={handleDeleteTasklocal}>Yes</button>
      <button onClick={() => setIsDeleteTaskModalOpen(false)}>No</button>
    </Modal>
  );
};

export default DeleteTaskModal;
