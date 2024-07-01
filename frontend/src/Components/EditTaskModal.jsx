import React from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';

const EditTaskModal = ({
  isOpen,
  currentTaskName,
  currentTaskDescription,
  currentTaskDate,
  currentTaskLink,

  newTaskName,
  newTaskDescription,
  newTaskDate,
  newTaskLink,
  handleEditTask,
  setIsEditTaskModalOpen,
  setNewTaskName,
  setNewTaskDescription,
  setNewTaskDate,
  setNewTaskLink
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsEditTaskModalOpen(false)}
      contentLabel="Edit Task"
      className={stl.modal}
      overlayClassName={stl.overlay}
    >
      <h2>Edit Task</h2>
      <label>
        Task Name:
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
        />
      </label>
      <label>
        Link:
        <input
          type="text"
          placeholder = "Link must start with http://www. eg: http://www.google.com"
          value={newTaskLink}
          onChange={(e) => setNewTaskLink(e.target.value)}
        />
      </label>
      <button onClick={handleEditTask}>Save</button>
      <button onClick={() => setIsEditTaskModalOpen(false)}>Cancel</button>
    </Modal>
  );
};

export default EditTaskModal;
