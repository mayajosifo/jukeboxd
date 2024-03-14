import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Review from '../components/Review';
import UserListDropdown from '../components/UserDropdown';
import DeleteReview from '../components/DeleteReviewForm'; 
import AlbumDropdown from '../components/AlbumDropdown';

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
        console.error('User not found');
      }
    };

    fetchUserData();

  }, [userId]);

  const updateReviews = (reviewId) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
  };

  if (!user) {
    return <div>Loading...</div>; // Return a loading indicator while user data is being fetched
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome Back, {user.userName}</h1>
      </header>
      <main>
        <div>
          <div className="user-counts">
            <UserListDropdown title="Followers" userList={user.followersList || []} />
            <UserListDropdown title="Following" userList={user.followingList || []} />
            <AlbumDropdown title="Liked Albums" albumList={user.likedAlbumsList || []} />
          </div>
        </div>
        <header className="reviews-header">
          <h1>User Reviews:</h1>
        </header>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="meta-review-container">
              <div className="review">
                <Review review={review} userName={user.userName}/>
                <DeleteReview reviewIdToDelete={review.id} userId={userId} onUpdate={updateReviews}/> 
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default UserPage;
