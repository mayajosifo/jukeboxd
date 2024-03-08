import React from 'react';
import './App.css';
import SearchAlbum from './components/SearchAlbum'; // Adjust the path as necessary
import SearchUser from './components/SearchUser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Album Finder</h1>
      </header>
      <main>
        <SearchAlbum />
        <SearchUser />
      </main>
    </div>
  );
}

export default App;