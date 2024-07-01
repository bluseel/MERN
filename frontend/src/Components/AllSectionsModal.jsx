// src/ScrollableModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import stl from './Modal.module.css';

const AllSectionsModal = ({ isOpen, onRequestClose, sections, onSelectSection, fetchAllSections, isSignedIn, isSuperUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newSectionName, setNewSectionName] = useState('');

  // Filter sections based on search term
  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onCreateSection = async (newSectionName) => {
    try {
      const response = await fetch(`http://localhost:5000/sections/`, {
        method: "POST",
        body: JSON.stringify({ name: newSectionName }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetchAllSections();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const onEditSection = async (sectionId, sectionName) => {
    try {
      const response = await fetch(`http://localhost:5000/sections/${sectionId}`, {
        method: "PATCH",
        body: JSON.stringify({ name: sectionName }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetchAllSections();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const onDeleteSection = async (sectionId) => {
    try {
      const response = await fetch(`http://localhost:5000/sections/${sectionId}`, {
        method: "DELETE"
      });
      fetchAllSections();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select Section"
      className={stl.modal}
      overlayClassName={stl.overlay}
    >
      <h2>Select Section</h2>
      <div className={stl.searchContainer}>
        <input
          type="text"
          placeholder="Search sections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={stl.searchInput}
        />
      </div>
      <div className={stl.scrollContainer}>
        {filteredSections.map((section) => (
          <div key={section._id} className={stl.sectionItem} onClick={() => onSelectSection(section)}>
            <div>{section.name}</div>
            {isSuperUser && (
              <div>
                <button onClick={() => {
                  const response = window.confirm(`Are you sure you want to delete section "${section.name}"?`);
                  if (response) {
                    onDeleteSection(section._id);
                    console.log(`Deleted section "${section.name}"`);
                  }
                }} className={stl.deleteButton}>Delete</button>
                <button onClick={() => {
                  const newName = window.prompt(`Enter new name for section "${section.name}":`, section.name);
                  if (newName !== null && newName !== section.name) {
                    onEditSection(section._id, newName);
                    console.log(`Edited section "${section.name}" to "${newName}"`);
                  }
                }} className={stl.editButton}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {isSuperUser && (
        <button onClick={() => {
          const newSectionName = window.prompt('Enter name for new section:');
          if (newSectionName) {
            onCreateSection(newSectionName);
            console.log(`Created new section "${newSectionName}"`);
          }
        }} className={stl.addButton}>Add Section</button>
      )}
      <button onClick={onRequestClose} className={stl.closeButton}>Close</button>
    </Modal>
  );
};

export default AllSectionsModal;
