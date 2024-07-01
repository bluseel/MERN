import React from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';

const CreateCourseModal = ({ isOpen, setIsCreateModalOpen, setNewCourseName,newCourseName, handleCreateCourse }) => {
  const handleChange = (e) => {
    setNewCourseName(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsCreateModalOpen(false)}
      contentLabel="Create Course"
      className={stl.modal}
      overlayClassName={stl.overlay}
    >
      <h2>Create Course</h2>
      <input
        type="text"
        value={newCourseName}
        onChange={handleChange}
        placeholder="Enter course name"
      />
      <button onClick={handleCreateCourse}>Create</button>
      <button onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
    </Modal>
  );
};

export default CreateCourseModal;
