import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 

function AddReviewForm() {
    const [albumsId, setAlbumsId] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [usersId, setUsersId] = useState('');

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
                albumsId: albumsId,
                rating: numericRating,
                reviewText: reviewText,
                usersId: usersId,
                reviewDate: new Date() // Adds a timestamp
            });
    
            console.log('Review added successfully', docRef.id);
    
            // Add the same review document to the "userReviews" subcollection of the specific user
            await addDoc(collection(db, "users", usersId, "userReviews"), {
                reviewId: docRef.id, // Store the ID of the review from the "reviews" collection
                albumsId: albumsId,
                rating: numericRating,
                reviewText: reviewText,
                reviewDate: new Date() // Adds a timestamp
            });
    
            console.log('User review added successfully');
    
            // Clear the form fields after submission
            setAlbumsId('');
            setRating(''); 
            setReviewText('');
            setUsersId('');
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
                {/* NOTE: wont be used in final version*/}
                Album ID:
                <input type="text" value={albumsId} onChange={e => setAlbumsId(e.target.value)} />
            </label>
            <br />
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
            <label>
                {/* NOTE: wont be used in final version*/}
                User ID:
                <input type="text" value={usersId} onChange={e => setUsersId(e.target.value)} />
            </label>
            <br />
            {/* a button of submit type will trigger onSubmit :)*/}
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default AddReviewForm;
