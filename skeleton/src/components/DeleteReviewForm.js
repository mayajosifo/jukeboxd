import React, { useState, useEffect } from 'react';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import Swal from 'sweetalert2';

function DeleteReview({ reviewIdToDelete, userId, onUpdate}) { // Corrected parameter order
  const handleDelete = async () => {
    try {
      const userReviewsRef = doc(db, `users/${userId}/userReviews/${reviewIdToDelete}`);
      const userReviewsDoc = await getDoc(userReviewsRef);
  
      if (!userReviewsDoc.exists()) {
        throw new Error("User review document doesn't exist");
      }
  
      const userDocData = userReviewsDoc.data();
      const otherReviewDoc = doc(db, "reviews", userDocData.reviewId);
  
      await Promise.all([
        deleteDoc(userReviewsRef),
        deleteDoc(otherReviewDoc)
      ]);
  
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        showConfirmButton: false,
        timer: 1500,
      });
  
      onUpdate(reviewIdToDelete); // Notify parent component to update
    } catch (error) {
      console.error('Error deleting review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the review',
      });
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteReview;
