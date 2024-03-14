import React from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import { useState } from 'react';

const LikeAlbum = ( {albumId, userId} ) => {

    //console.log("album ID:", albumId, "userID:", userId)

    const [likeButtonName, setLikeButtonName] = useState("Like")

    const handleLike = async () => {

        setLikeButtonName("Liked!")

        const userRef = doc(db, "users", userId);

        try {
            await updateDoc(userRef, {
                likedAlbumsList: arrayUnion(albumId)
            });

        } catch (error) {
            console.error('Error liking album: ', error);
        }
    };

    return <button onClick={handleLike}>{likeButtonName}</button>;

}
 
export default LikeAlbum;