import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import stl from '../Courses.module.css';
import { API_BASE_URL } from '../../../.config';

const SignInModal = ({ isOpen, onClose, setIsSignInModalOpen, setIsSignedIn, section, isSuperUser, setIsSuperUser }) => {
  const [userName, setUserName] = useState()
  const [userPassword, setUserPassword] = useState()
  const [signinProcessStatus, setSigninProcessStatus] = useState()

  //user name keep is scetino name so it should change alonside
  useEffect(() => {
    setUserName(section.name)
  }, [section.name])

  //resetPassword to null because it variable stores it even after closing modal. and error message too
  useEffect(() => {
    setUserPassword('')
    setSigninProcessStatus('')
  }, [isOpen])



  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
      console.log('Submitting with:', userName, userPassword); // Log before fetch
      setSigninProcessStatus('Signin you in, hang tight ...')
  
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        body: JSON.stringify({ userName, userPassword, setIsSuperUser}),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const successfullSignedIn= await response.json()  
  
      if (successfullSignedIn) {
        console.log('Successful sign-in'); // Log success
        setIsSignedIn(true); 
        setIsSignInModalOpen(false);
        setSigninProcessStatus('You have signed in successfully')
        
        //if user="Find_you_section" and successfull sign in
        if(userName === 'Find_your_section'){
          setIsSuperUser(true)
          setSigninProcessStatus('Hi bluseel!')
          console.log('Hi bluseel!')
        }else{
          setIsSuperUser(false)
        }
      } else {
        console.log('Sign-in failed:'); // Log failure
        setSigninProcessStatus('Incorrect Password. Try again')
      }
    } catch (error) {
      setSigninProcessStatus('An error occured:', error )
      console.error('Error signing in:', error); // Log specific error
      console.error('Error status text:', error.response?.statusText); // Log error status text if available
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Sign In Modal"
      className={stl.modal} // Apply custom modal style
      overlayClassName={stl.overlay} // Apply custom overlay style
    >
      <div className={stl.scrollContainer}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Password:
            <input type="password" name="signInPassword" className={stl.input}  onChange={(e) => setUserPassword(e.target.value)}/>
          </label>
          <br />
          <button type="submit" disabled={userPassword === ''} 
            style={userPassword === ''?  { backgroundColor: 'gray', pointerEvents: 'none' }:{}}

              >Sign In</button>
          <button className={stl.button} onClick={()=>setIsSignInModalOpen(false)}>Close</button>
        </form>
        <label>{signinProcessStatus}</label>
      </div>
    </Modal>
  );
};

export default SignInModal;
