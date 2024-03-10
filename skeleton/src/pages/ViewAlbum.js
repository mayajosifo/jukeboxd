
import AddReviewForm from '../components/AddReviewForm';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ViewAlbum.module.css';

function ViewAlbum() {
    const [showReview, setShowReview] = useState(false);

    const handleButtonClick = () => {
        setShowReview(true);
    };

    const handleCloseForm = () => {
        setShowReview(false);
    };

    return (
        <div>
            <h1>Album Review Page</h1>
            <button onClick={handleButtonClick}>Add Review</button>
            {showReview && <AddReviewForm onClose={handleCloseForm} />}
        </div>
    );
}

export default ViewAlbum