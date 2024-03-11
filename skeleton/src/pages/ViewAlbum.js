
import AddReviewForm from '../components/AddReviewForm';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import styles from './ViewAlbum.module.css';


function ViewAlbum({userId}) {
    const [showReview, setShowReview] = useState(false);
    const [albumId, setAlbumId] = useState('');
    const [album, setAlbum] = useState(null);
    const [reviews, setReviews] = useState([]);

    const { id } = useParams(); 
    console.log(id)

    useEffect(() => {
        // Set the albumId state variable when the component mounts
        const fetchAlbumAndReviews = async () => {

            const albumDoc = doc(db, 'albums', id);
            const albumSnapshot = await getDoc(albumDoc);
            if (albumSnapshot.exists()) {
                setAlbum(albumSnapshot.data());
            } else {
                console.log('Album not found');
            }

            const q = query(collection(db, "reviews"), where("albumsId", "==", id));
            const querySnapshot = await getDocs(q);
            const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReviews(fetchedReviews);
            setAlbumId(id);
        };

        fetchAlbumAndReviews();
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
            {showReview && <AddReviewForm onClose={handleCloseForm} albumId={albumId} userId={userId}/>}
            {album && (
                <div>
                    <h2>Name: {album.albumName}</h2>
                    <p>Artist: {album.artistName}</p>
                    {album.coverUrl && <img src={album.coverUrl} alt="Album Cover" style={{ width: 300, height: 300 }} />}
                    <p>Year: {album.releaseYear}</p>
                </div>
            )}
            <h2>Reviews: </h2>
            <div className={styles.reviewsContainer}>
                {reviews.map(review => (
                    <div key={review.id} className={styles.reviewItem}>
                        <h3>User ID: {review.usersId}</h3>
                        <p>Rating: {review.rating}</p>
                        <p>Review: {review.reviewText}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ViewAlbum