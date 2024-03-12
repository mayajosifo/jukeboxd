import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Review from '../components/Review'; // Assuming you have a Review component

function UserPage({ userId }) {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setUser(userSnapshot.data());

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
      } else {
        console.log('User not found');
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
      </header>
      <main>
        {user && (
          <div>
            <h1>Username: {user.userName}</h1>
          </div>
        )}
        <div className="reviews-grid">
          {reviews.map(review => (
            <Review key={review.id} review={review} userName={user ? user.userName : 'Unknown User'} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default UserPage;
