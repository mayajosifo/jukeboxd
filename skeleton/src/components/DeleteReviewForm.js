import React, { useState, useEffect } from 'react';
import { collection, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import Swal from 'sweetalert2';

function DeleteReview() {
  const [userId, setUserId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewIdToDelete, setReviewIdToDelete] = useState('');

  const getReviews = async () => {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setReviews(reviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleDelete = () => {
    if (!reviewIdToDelete) {
      // Display an error message or handle the case where the input is empty
      return;
    }

    const id = reviewIdToDelete;

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [selectedReview] = reviews.filter(review => review.id === id);

        if (selectedReview) {
          // Only proceed if selectedReview is defined
          deleteDoc(doc(db, 'reviews', selectedReview.id));

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1500,
          });

          const reviewsCopy = reviews.filter(review => review.id !== id);
          setReviews(reviewsCopy);
          setReviewIdToDelete(''); // Clear the input after successful deletion
        } else {
          // Handle the case when no matching review is found
          console.error('No review found with the given ID:', id);
        }
      }
    });
  };

    return (
      <div>
        <h1>Delete Review</h1>
        <label>
          Enter Review ID:
          <input
            type="text"
            value={reviewIdToDelete}
            onChange={e => setReviewIdToDelete(e.target.value)}
          />
        </label>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );

}

export default DeleteReview;
    

