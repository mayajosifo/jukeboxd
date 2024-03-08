import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchAlbum from './components/SearchAlbum'; // Adjust the path as necessary
import SearchUser from './components/SearchUser';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h1>Album Finder</h1>
        </header>
        <main>
          <SearchAlbum />
          <SearchUser />
        </main>
      </div>
    </Router>
  );
}

export default App;