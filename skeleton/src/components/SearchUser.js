import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './SearchUser.css';
import Review from './Review';
import FollowUser from './FollowUser'; // Import the FollowUser component
import { Link } from 'react-router-dom';

const SearchUser = ({ userId }) => { // This is the current user's userId
    console.log(userId)
    const [searchTerm, setSearchTerm] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(''); // State to store the searched user's name

    const [searchedUserId, setSearchedUserId] = useState(''); // Changed from userId to searchedUserId

    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);

        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("userName", "==", searchTerm));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            const searchID = userSnapshot.docs[0].id;
            setUserName(userData.userName); // Set the userName state
            setSearchedUserId(searchID); // Changed from setUserId to setSearchedUserId

            console.log(searchID)

            const q = query(collection(db, "reviews"), where("usersId", "==", searchID));
            const querySnapshot = await getDocs(q);
            const fetchedReviews = [];

            for (const doc of querySnapshot.docs) {
                const reviewData = doc.data();
                const albumId = reviewData.albumsId;

                if (albumId) {
                    const albumQuery = query(collection(db, "albums"), where("__name__", "==", albumId));
                    const albumSnapshot = await getDocs(albumQuery);
                    const albumData = albumSnapshot.docs[0].data();
                    reviewData.album = albumData;
                }

                fetchedReviews.push({ id: doc.id, ...reviewData, userName }); // userName still represents the searched user's name
            }

            setReviews(fetchedReviews);
        } else {
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