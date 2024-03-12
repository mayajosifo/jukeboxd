import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './SearchUser.css';
import { Link } from 'react-router-dom';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');         //state variables
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm) return;      //return if search term is empty
        setLoading(true);

        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("userName", "==", searchTerm));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty){
          const searchID = userSnapshot.docs[0].id;
          console.log(searchID)

          const q = query(collection(db, "reviews"), where("usersId", "==", searchID)); //query to fetch reviews by userId
          const querySnapshot = await getDocs(q);
          const fetchedReviews = [];            //stores fetched reviews

          for (const doc of querySnapshot.docs) {         //loops through each document
              const reviewData = doc.data();              //gets review data from each document
              const albumId = reviewData.albumsId;        //extracts the album id from review data
      
      
              if (albumId) {
                  const albumQuery = query(collection(db, "albums"), where("__name__", "==", albumId));   //use album id to query and fetch the album data
                  const albumSnapshot = await getDocs(albumQuery);
                  const albumData = albumSnapshot.docs[0].data();
                  reviewData.album = albumData;                     //attaches album to review data
              }
      
              fetchedReviews.push({id: doc.id, ...reviewData });  //adds review data to fectched reviews array
          }

          setReviews(fetchedReviews);
        }
        else {
          setReviews([]);
        }
      setLoading(false);
    };  


    return (
      <div className='search-user'>
        <div className="input-and-button">
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search by Username`}
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
          </div>
          <div className="albums-container">
            {reviews.map(review => (
              <div key={review.id}>
                <h1>Rating: {review.rating}/10</h1>
                <h2>Review: {review.reviewText} </h2>
                {review.album && (
                    <div>
                        <p>Album Name: {review.album.albumName}</p>
                        <p>Artist Name: {review.album.artistName}</p>
                        <Link to={`/album/${review.album.id}`}> 
                          {review.album.coverUrl && <img src={review.album.coverUrl} alt="Album Cover" style={{ width: 300, height: 300 }} />}
                        </Link>
                        <p>Year: {review.album.releaseYear}</p>
                    </div>
                )}
              </div>
            ))}
          </div>
      </div>
    );
 };

export default SearchUser;
