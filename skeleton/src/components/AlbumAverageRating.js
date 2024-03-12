import React from 'react';

const AlbumAverageRating = ({ reviews }) => {
    const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;

    return (
        <div>
            <h2>Average Rating: {isNaN(averageRating) ? 'N/A' : averageRating.toFixed(2)}</h2>
        </div>
    );
};

export default AlbumAverageRating;
