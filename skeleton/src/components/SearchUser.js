import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reviews, setReviews] = useState([]);

    const handleSearch = async () => {
        if (!searchTerm) return;
    
        const q = query(collection(db, "reviews"), where("usersId", "==", searchTerm));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = [];
        //const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //setReviews(fetchedReviews);
    
    

        for (const doc of querySnapshot.docs) {
            const reviewData = doc.data();
            const albumId = reviewData.albumsId;
    
    
            if (albumId) {
                const albumQuery = query(collection(db, "albums"), where("__name__", "==", albumId));
                const albumSnapshot = await getDocs(albumQuery);
                const albumData = albumSnapshot.docs[0].data();
                //const albumDoc  = await getDoc(doc(db, "albums", albumId));
                //const albumData = albumDoc.data();
                reviewData.album = albumData;
                console.log("Test")
                console.log("Fetched Album Data:", albumData);
            }
    
            fetchedReviews.push({id: doc.id, ...reviewData });
        }

    setReviews(fetchedReviews);


};


    return (
      <div>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by User`}
          />
          <button onClick={handleSearch}>Search</button>
          <div>
            {reviews.map(review => (
              <div key={review.id}>
                <h3>{review.id}</h3>
                <p>Rating: {review.rating}</p>
                <p>Review: {review.reviewText} </p>
                <p>User ID: {review.usersId}</p>
                <p>Album ID: {review.albumsId}</p>
                {review.album && (
                    <div>
                        <p>Album Name: {review.album.albumName}</p>
                        <p>Artist Name: {review.album.artistName}</p>
                        {review.album.coverUrl && <img src={review.album.coverUrl} alt="Album Cover" style={{ width: 300, height: 300 }} />}
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



