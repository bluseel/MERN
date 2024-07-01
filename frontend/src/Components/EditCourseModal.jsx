import React from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';

const EditCourseModal = ({ isOpen, currentCourseName, newCourseName, handleEditCourse, setNewCourseName, setIsEditModalOpen }) => {
  const handleChange = (e) => {
    // console.log(e.target.value)
    setNewCourseName(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsEditModalOpen(false)}
      contentLabel="Edit Course"
      className={stl.modal}
      overlayClassName={stl.overlay}
    >
      <h2>Edit Course</h2>
      <input
        type="text"
        value={newCourseName}
        onChange={handleChange}
      />
      <button onClick={handleEditCourse}>Save</button>
      <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
    </Modal>
  );
};

export default EditCourseModal;
