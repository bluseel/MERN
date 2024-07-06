import React, {useEffect, useState } from 'react'
import Courses from './Components/Courses'
import Header from './Header'

export const App = () => {
  const dummySectoin= {
    "_id": "61826f2d61bb28a52e7aa8e3",
    "name": "Find_your_section",
    "courses": [
        {
            "name": "Click to see how to use this site",
            "_id": "61826f2d61bb28a52e7aa8e3s",
            "tasks": [
                {
                    "name": "Finding Section",
                    "description": "Look up in header and click --Find your section--",
                    "date": "now",
                    "link": "http://www.google.com",
                    "_id": "61826f2d61bb28a52e7aa8e3sa"
                },
                {
                  "name": "Tutorial for moderators",
                  "description": "Click the link to see how to add courses and tasks",
                  "date": "now",
                  "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_id": "61826f2d61bb28a52e7aa8e3saq"
                },
                {
                  "name": "Add your section",
                  "description": "Contact me via my email fa22-bcs-164@cuilahore.edu.pk, I will add your section and give you login info",
                  "date": "now",
                  "link": "FA22-BCS-164@cuilahore.edu.pk",
                  "_id": "61826f2d61bb28a52e7aa8e3saq"
                }
            ]
        }
    ],
    "__v": 6
}

  const [selectedSection, setSelectedSection] = useState(() => {
    //Get the initial value from localStorage if it exists
    const savedSection = localStorage.getItem('taskTrackerSelectedSection');
    return savedSection ? JSON.parse(savedSection) : dummySectoin;
  });


  const [isSignedIn, setIsSignedIn] = useState('');
  const [isSuperUser, setIsSuperUser] = useState(false);

  // Save to localStorage whenever selectedSection changes
  useEffect(() => {
    if (selectedSection) {
      localStorage.setItem('taskTrackerSelectedSection', JSON.stringify(selectedSection));
    }
  }, [selectedSection]);





  useEffect(() => {
    // console.log('suuuuuuuuuuuuuuuuuuuuper')
  }, [isSuperUser])

  useEffect(() => {
    if(isSignedIn === false){
      setIsSuperUser(false)
    }
  }, [isSignedIn])

  
  
  return (


    <div>
        <Header 
          selectedSection = {selectedSection} 
          setSelectedSection= {setSelectedSection}
          isSignedIn = {isSignedIn}
          isSuperUser = {isSuperUser}
          />
        <Courses 
          selectedSection={selectedSection}  
          setSelectedSection= {setSelectedSection} 
          dummySectoin={dummySectoin} 
          setIsSignedInAPP={setIsSignedIn} 
          isSuperUser = {isSuperUser} setIsSuperUser={setIsSuperUser}/>
    </div>
  )
}

export default App
