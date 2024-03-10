
import AddReviewForm from '../components/AddReviewForm';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ViewAlbum.module.css';

function ViewAlbum({userId}) {
    const [showReview, setShowReview] = useState(false);
    const [albumId, setAlbumId] = useState('');

    const { id } = useParams(); 
    console.log(id)

    useEffect(() => {
        // Set the albumId state variable when the component mounts
        setAlbumId(id);
    }, [id]);                       

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
           {showReview && <AddReviewForm onClose={handleCloseForm} albumId={albumId} />}

            <h1>{albumId}</h1>
        </div>
    );
}
export default ViewAlbum