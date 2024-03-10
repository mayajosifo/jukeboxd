import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchAlbum from '../components/SearchAlbum'; 
import SearchArtist from '../components/SearchArtist';
import SearchUser from '../components/SearchUser';
import './SearchPage.css';

const SearchPage = () => {

  const [searchBy, setSearchBy] = useState('album');

  return ( 
    <div className="search-page">
      <Navbar />

      <select value={searchBy} onChange={
        (e) => setSearchBy(e.target.value)}>
        <option value = "album">Album</option>
        <option value = "artist">Artist</option>
        <option value = "user">User</option>
      </select>

      {searchBy === 'album' ? <SearchAlbum searchByProp={searchBy} /> :
        searchBy === 'artist' ? <SearchArtist searchByProp={searchBy} /> :
        <SearchUser />}
    </div>
  );
}
 
export default SearchPage;