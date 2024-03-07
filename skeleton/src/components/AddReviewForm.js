import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 

function AddReviewForm() {
    const [albumId, setAlbumId] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        
        const numericRating = parseInt(rating);
        if (numericRating < 1 || numericRating > 10 || isNaN(numericRating)) {
            alert('Rating must be a number between 1 and 10');
            return; 
        }

        try {
            await addDoc(collection(db, "reviews"), {
                albumId: albumId,
                rating: numericRating,
                reviewText: reviewText,
                userId: userId,
                reviewDate: new Date() 
            });
            console.log('Review added successfully');
            setAlbumId('');
            setRating(''); 
            setReviewText('');
            setUserId('');
        } catch (error) {
            console.error('Error adding review:', error); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Album Review</h2>
            <label>
                Album ID:
                <input type="text" value={albumId} onChange={e => setAlbumId(e.target.value)} />
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
                User ID:
                <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default AddReviewForm;
