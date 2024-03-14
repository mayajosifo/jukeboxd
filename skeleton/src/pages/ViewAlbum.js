import AddReviewForm from '../components/AddReviewForm';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import styles from './ViewAlbum.css';
import AlbumAverageRating from '../components/AlbumAverageRating';
import Review from '../components/Review'


function ViewAlbum({userId}) {
    const [showReview, setShowReview] = useState(false);
    const [albumId, setAlbumId] = useState('');
    const [album, setAlbum] = useState(null);
    const [reviews, setReviews] = useState([]);

    const { id } = useParams(); 
    //console.log(id)

    useEffect(() => {
        // Set the albumId state variable when the component mounts
        const fetchAlbumAndReviews = async () => {
            const albumDoc = doc(db, 'albums', id);
            const albumSnapshot = await getDoc(albumDoc);
            if (albumSnapshot.exists()) {
                setAlbum(albumSnapshot.data());
            } else {
                console.error('Album not found');
            }
    
            const q = query(collection(db, "reviews"), where("albumsId", "==", id));
            const querySnapshot = await getDocs(q);
            const fetchedReviews = [];
    
            // Use Promise.all to execute all asynchronous operations concurrently
            await Promise.all(querySnapshot.docs.map(async reviewDoc => {
                const reviewData = { id: reviewDoc.id, ...reviewDoc.data() };
                const userDoc = await getDoc(doc(db, 'users', reviewData.usersId));
                const userData = userDoc.exists() ? userDoc.data() : null;
                const userName = userData ? userData.userName : 'Unknown';
                fetchedReviews.push({ ...reviewData, userName });
            }));
    
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
        <div className='page-container'>
            <h1 style={{textAlign: 'center'}}>Album Review Page</h1>
            {album && (
                <div className='album-container'>
                    {album.coverUrl && <img src={album.coverUrl} alt="Album Cover" style={{ width: 300, height: 300 }} />}
                    <div className='album-info'>
                        <h2>Name: {album.albumName}</h2>
                        <p>Artist: {album.artistName}</p>
                        <p>Year: {album.releaseYear}</p>
                    </div>
                </div>
            )}
            <AlbumAverageRating reviews={reviews} />
            <button onClick={handleButtonClick}>Add Review</button>
            {showReview && <AddReviewForm onClose={handleCloseForm} albumId={albumId} userId={userId}/>}
            <h2>Reviews:</h2>
            <div className={styles.reviewsContainer}>
                {reviews.map(review => (
                    <Review key={review.id} review={review} userName={review.userName} />
                ))}
            </div>
        </div>
    );
}
export default ViewAlbum 