// /src/modals/DeleteCourseModal.js

import React from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css'; // Example path to CSS module

const DeleteCourseModal = ({ isOpen, currentCourseName, handleDeleteCourse, setIsDeleteModalOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsDeleteModalOpen(false)}
      contentLabel="Delete Course"
      className={stl.modal}
      overlayClassName={stl.overlay}
    >
      <h2>Delete Course</h2>
      <p>Are you sure you want to delete the course "{currentCourseName}"?</p>
      <button onClick={handleDeleteCourse}>Yes</button>
      <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
    </Modal>
  );
};

export default DeleteCourseModal;
