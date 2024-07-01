  // src/Header.js
  import React, { useState } from 'react';
  import './index.css';
  import logo from '/logo.png';
  import stl from './header.module.css';
  import AllSectionsModal from './Components/AllSectionsModal';

  const Header = (props) => {
  const selectedSection = props.selectedSection 
  const setSelectedSection = props.setSelectedSection   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sections, setSections] = useState([]);
  
    const fetchAllSections = async () => {
      try {
        const response = await fetch("http://localhost:5000/sections", {
          method: "GET"
        });
        const result = await response.json();
        setSections(result); // Set the fetched sections to state
        setIsModalOpen(true); // Open the modal

      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleSelectSection = (section) => {
      setSelectedSection({ id: section._id, name: section.name });
      setIsModalOpen(false);
    };

    return (
      <div className={stl.header}>
        <img src={logo} alt="Logo" className="logo" />
        <div className={stl.nameTitle}>
          <div className={stl.univName}>COMSATS University</div>
          <div className={stl.campus}>Islamabad</div>
          <button className={stl.sectionName} onClick={fetchAllSections}>
            {selectedSection.name}
          </button>
        </div>

        <AllSectionsModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          sections={sections}
          onSelectSection={handleSelectSection}
          fetchAllSections={fetchAllSections}
          isSignedIn = {props.isSignedIn}
          isSuperUser = {props.isSuperUser}
        />
      </div>
    );
  };

  export default Header;
