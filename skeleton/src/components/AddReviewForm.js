import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 

function AddReviewForm({ onClose, albumId, userId }){
    const [albumsId, setAlbumsId] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission action
    
        // Convert rating to a number and check if it's between 1 and 10
        const numericRating = parseInt(rating);
        if (numericRating < 1 || numericRating > 10 || isNaN(numericRating)) {
            alert('Rating must be a number between 1 and 10');
            return;
        }
    
        try {
            // Add a new review document to the "reviews" collection
            const docRef = await addDoc(collection(db, "reviews"), {
                albumsId: albumId, // use albumId prop here
                rating: numericRating,
                reviewText: reviewText,
                usersId: userId,
                reviewDate: new Date() // Adds a timestamp
            });
    
            console.log('Review added successfully', docRef.id);
    
            // Add the same review document to the "userReviews" subcollection of the specific user
            await addDoc(collection(db, "users", userId, "userReviews"), {
                reviewId: docRef.id, // Store the ID of the review from the "reviews" collection
                albumsId: albumId, // use albumId prop here
                rating: numericRating,
                reviewText: reviewText,
                reviewDate: new Date() // Adds a timestamp
            });

            await addDoc(collection(db, "albums", albumId, "albumReviews"), {
                reviewId: docRef.id, // Store the ID of the review from the "reviews" collection
                albumsId: albumId, // use albumId prop here
                rating: numericRating,
                reviewText: reviewText,
                usersId: userId,
                reviewDate: new Date() // A
            });
    
            console.log('User review added successfully');
    
            // Clear the form fields after submission
            setAlbumsId('');
            setRating(''); 
            setReviewText('');
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };
    

    return (
        // NOTE: this is NOT the final form we will use, it's here for testing.
        // Ideally, users will not add in their userID or albumID, this should be managed by the user state/session
        <form onSubmit={handleSubmit}>
            <h2>Add Album Review</h2>
            <label>
                Rating (1-10):
                <input 
                    type="number" 
                    value={rating} 
                    onChange={e => setRating(e.target.value)} 
                    min="1" 
                    max="10" 
                />
            </label>
            <br />
            <label>
                Review Text:
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} />
            </label>
            <br />
            {/* a button of submit type will trigger onSubmit :)*/}
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default AddReviewForm;
