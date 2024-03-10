import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchAlbum from '../components/SearchAlbum'; 
import SearchUser from '../components/SearchUser';
import Navbar from '../components/Navbar';
import AddReviewForm from '../components/AddReviewForm';

//import { Route, Routes, Navigate } from 'react-router-dom';

function userPage() {

    return (
          <div className="App">
            <Navbar />
            <header className="App-header">
              <h1>Album Finder</h1>
            </header>
            <main>
              <SearchAlbum />
              <SearchUser />
              <AddReviewForm />
            </main>
          </div>
      );
}



export default userPage;