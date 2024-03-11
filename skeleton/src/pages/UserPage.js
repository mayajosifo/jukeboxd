
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchAlbum from '../components/SearchAlbum'; 
import SearchUser from '../components/SearchUser';
import Navbar from '../components/Navbar';
import AddReviewForm from '../components/AddReviewForm';

//import { Route, Routes, Navigate } from 'react-router-dom';

function UserPage({userId}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set the albumId state variable when the component mounts
    const fetchUser = async () => {

        const userDoc = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            setUser(userSnapshot.data());
        } else {
            console.log('User not found');
        }
    };

    fetchUser();
  });       


  return (
          <div className="App">
            <header className="App-header">
              <h1>Profile</h1>
              <p>User ID: {userId}</p>
            </header>
            <main>
              {user && (
                <div>
                  <h1>Username: {user.userName}</h1>
                </div>
              )}
            </main>
          </div>
      );
}



export default UserPage;