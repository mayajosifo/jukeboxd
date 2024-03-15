import React from 'react';
import { Link } from 'react-router-dom';
import './Review.css'; // Importing the CSS file

const Review = ({ review, userName }) => { 
    return (
        <div className="review-container">
    {review.album && (
        <div className="album-info-container">
            {review.album.coverUrl && (
                <div className="album-cover-container">
                    <Link to={`/album/${review.album.id}`}>
                        <img src={review.album.coverUrl} alt="Album Cover" className="album-cover"/>
                    </Link>
                </div>
            )}
            <Link to={`/album/${review.album.id}`} className="album-title-link">
                <h4 className="album-title">{review.album.albumName}</h4> 
            </Link>
        </div>
    )}
    <div className="review-content" style={{ marginLeft: '30px' }}> 
        <h3>Review by: {userName}</h3>
        <p className="review-rating">Rating: {review.rating}/10</p>
        <p className="review-text">{review.reviewText}</p>
    </div>
</div>

    );
};

export default Review;
