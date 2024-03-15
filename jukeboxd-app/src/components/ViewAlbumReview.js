// the same as review.js but, since it's already inside the ViewAlbum
// page, it doesn't need to show the album title

import React from 'react';
import { Link } from 'react-router-dom';
import './Review.css'; // Importing the CSS file

const Review = ({ review, userName }) => { 
    return (
        <div className="review-container">
            <div className='container-container'>
                {review.album && (
                    <div className="album-info-container">
                        {review.album.coverUrl && (
                            <div className="album-cover-container">
                                <Link to={`/album/${review.album.id}`}>
                                    <img src={review.album.coverUrl} alt="Album Cover" className="album-cover"/>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                <div className="review-content">
                    <h3>Review by: {userName}</h3>
                    <p className="review-rating">Rating: {review.rating}/10</p>
                    <p className="review-text">{review.reviewText}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;
