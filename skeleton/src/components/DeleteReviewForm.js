import React, { useState, useEffect } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import Swal from 'sweetalert2';

function DeleteReview({ reviewIdToDelete, userId, onUpdate}) { // Corrected parameter order
  const handleDelete = async () => {
    try {
      const userReviewsRef = doc(db, `users/${userId}/userReviews/${reviewIdToDelete}`);
      await deleteDoc(userReviewsRef);

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        showConfirmButton: false,
        timer: 1500,
      });

      onUpdate(reviewIdToDelete); // Notify parent component to update


      // Optionally update state or trigger a callback to handle updates
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
