import React, { useState } from 'react';
import './SearchArtist.css';
import { db } from '../config/firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import LikeAlbum from './LikeAlbum';

const SearchAlbum = ( {tempsearchBy, userId} ) => {

  //console.log("searchalbum user id:", userId)

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('album');
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);

    let fieldToSearch
    if (searchBy === 'album') {
      fieldToSearch = "albumName";
    } else if (searchBy === 'artist') {
      fieldToSearch = "artistName";
    }
    const q = query(collection(db, "albums"), where(fieldToSearch, "==", searchTerm));
    const querySnapshot = await getDocs(q);
    const fetchedAlbums = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAlbums(fetchedAlbums);
    setLoading(false)

  };

  return (
    <div className="search-album">

      <div className="input-and-button">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search for ${searchBy === 'album' ? 'albums' : 'artists'}...`}
        />
        <button onClick={handleSearch}>Search</button>
        {loading && <p>Loading...</p>}
      </div>

      <div className="albums-container">
        {albums.map(album => (
          <div className="album-item" key={album.id}>
            <h3>{album.albumName}</h3>
            <LikeAlbum albumId={album.id} userId={userId}/> 
            <p>Artist: {album.artistName}</p>
            <Link to={`/album/${album.id}`}> 
            {album.coverUrl && <img src={album.coverUrl} alt="Album Cover" style={{ width: 300, height: 300 }} />}
            </Link>
            <p>Year: {album.releaseYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAlbum;