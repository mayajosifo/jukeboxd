import React from 'react';
import './App.css';
import SearchAlbum from './components/SearchAlbum'; // Adjust the path as necessary

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Album Finder</h1>
      </header>
      <main>
        <SearchAlbum />
      </main>
    </div>
  );
}

export default App;