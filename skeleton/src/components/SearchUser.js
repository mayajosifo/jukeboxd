import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import './SearchUser.css';
import Review from './Review';
import FollowUser from './FollowUser'; // Import the FollowUser component
import { Link } from 'react-router-dom';

const SearchUser = ({userId}) => {
  const [searchTerm, setSearchTerm] = useState('');         //state variables
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(''); // State to store the searched user's name
  const [searchedUserId, setSearchedUserId] = useState(''); // State to store the ID of the searched user


  const handleSearch = async () => {
    if (!searchTerm) return;      //return if search term is empty
    setLoading(true);


    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("userName", "==", searchTerm));
    const userSnapshot = await getDocs(userQuery);
      


    if (!userSnapshot.empty){
      const firstDoc = userSnapshot.docs[0];
      setUser(firstDoc.data());
      setUserName(firstDoc.data().userName); // Set the userName state
      setSearchedUserId(firstDoc.id); // Set the searchedUserId state

      const userId = firstDoc.id;

        
      const userReviewsRef = collection(db, 'users', userId, 'userReviews');
      const userReviewsSnapshot = await getDocs(userReviewsRef);
      const reviewsWithAlbums = [];

      for (const reviewDoc of userReviewsSnapshot.docs) {
          const reviewData = reviewDoc.data();
          const albumId = reviewData.albumsId;
          
          if (albumId) {
              const albumDocRef = doc(db, 'albums', albumId);
              const albumSnapshot = await getDoc(albumDocRef);
              if (albumSnapshot.exists()) {
                  reviewData.album = { id: albumId, ...albumSnapshot.data() }; // Add the album data to the review object
              }
          }
          reviewsWithAlbums.push({ id: reviewDoc.id, ...reviewData });
      }

      setReviews(reviewsWithAlbums);
    
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
              placeholder="Search by Username"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
        </div>
        {userName && (
            <div className="user-reviews-header">
                <h2>{userName}'s reviews</h2>
                <FollowUser currentUserId={userId} otherUserId={searchedUserId} /> 
            </div>
        )}
        <div className="reviews-container">
            {reviews.map(review => (
                <Review key={review.id} review={review} userName={review.userName}/>
            ))}
        </div>
      </div>
    );
};

export default SearchUser;