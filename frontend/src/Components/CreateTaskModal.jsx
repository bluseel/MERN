import React, { useState } from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';

const CreateTaskModal = ({ isOpen, onRequestClose, handleCreateTask, currentCourseId, setCurrentCourseId }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskLink, setNewTaskLink] = useState('');

  const handleCreate = () => {
    const newTask = {
      id: null,
      name: newTaskName,
      description: newTaskDescription,
      date: newTaskDate,
      link: newTaskLink
    };
    handleCreateTask(newTask);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Task"
      className={stl.modal}
      overlayClassName={stl.overlay}
    >
      <h2>Create Task</h2>
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
          onChange={(e) => setNewTaskLink(e.target.value)
          }
        />
      </label>
      <button onClick={handleCreate}>Create</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default CreateTaskModal;
