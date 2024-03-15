import React from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

function LikeButton({ reviewId, userId }) {
    const handleLike = async () => {
        const reviewRef = doc(db, 'reviews', reviewId);


        try {
            await updateDoc(reviewRef, {
                likes: arrayUnion(userId)
            });
            //console.log('Review liked successfully');
        } catch (error) {
            console.error('Error liking review:', error);
        }
    };

    return (
        <button onClick={handleLike}>Like</button>
    );
}

export default LikeButton;
