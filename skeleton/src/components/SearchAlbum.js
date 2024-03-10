import React, { useState } from 'react';
import { db } from '../config/firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const SearchAlbum = () => {
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
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`Search for ${searchBy === 'album' ? 'albums' : 'artists'}...`}
      />
      <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
        <option value = "album">Album</option>
        <option value = "artist">Artist</option>
      </select>
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      <div className="albums-container">
        {albums.map(album => (
          <div className="album-item" key={album.id}>
            <h3>{album.albumName}</h3>
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