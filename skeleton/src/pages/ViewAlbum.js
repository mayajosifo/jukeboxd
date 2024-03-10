
import AddReviewForm from '../components/AddReviewForm';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import styles from './ViewAlbum.module.css';


function ViewAlbum({userId}) {
    const [showReview, setShowReview] = useState(false);
    const [albumId, setAlbumId] = useState('');
    const [reviews, setReviews] = useState([]);

    const { id } = useParams(); 
    console.log(id)

    useEffect(() => {
        // Set the albumId state variable when the component mounts
        const fetchReviews = async () => {
            const q = query(collection(db, "reviews"), where("albumsId", "==", id));
            const querySnapshot = await getDocs(q);
            const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReviews(fetchedReviews);
        };

        fetchReviews();
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
            <h2>Reviews for Album ID: {albumId}</h2>
            <div className={styles.reviewsContainer}>
                {reviews.map(review => (
                    <div key={review.id} className={styles.reviewItem}>
                        <h3>User ID: {review.usersId}</h3>
                        <p>Rating: {review.rating}</p>
                        <p>Review: {review.reviewText}</p>
                    </div>
                ))}
            </div>
            <h1>{albumId}</h1>
        </div>
    );
}
export default ViewAlbum