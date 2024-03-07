import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 

function AddReviewForm() {
    const [albumsId, setAlbumsId] = useState('');
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [usersId, setUsersId] = useState('');

    const handleSubmit = async (e) => {

        // wont allow users to submit empty form basically
        e.preventDefault(); 

        // constrains to 1-10 rating (we can do whatever range you want)
        const numericRating = parseInt(rating);
        if (numericRating < 1 || numericRating > 10 || isNaN(numericRating)) {
            alert('Rating must be a number between 1 and 10');
            return; 
        }

        try {
            await addDoc(collection(db, "reviews"), {
                albumsId: albumsId,
                rating: numericRating,
                reviewText: reviewText,
                usersId: usersId,
                reviewDate: new Date() // time stamp function :0
            });

            // try to use as many console logs as possible when you're developing it'll help people check if its working properly
            // if you want to check console logs in chrome go to the 3 dots in the corner > more tools > developer tools > console
            // it helps w debugging
            console.log('Review added successfully');

            // will clear the form for you, can remove if necessary
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
