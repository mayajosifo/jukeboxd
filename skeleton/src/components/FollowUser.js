import React from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase'; 

function FollowUser({ currentUserId, otherUserId }) {

    const handleFollow = async () => {
        if (currentUserId === otherUserId) {
            alert('You cannot follow yourself.');
            return; 
        }

        const currentUserRef = doc(db, "users", currentUserId);
        const otherUserRef = doc(db, "users", otherUserId);

        try {
            await updateDoc(currentUserRef, {
                followingList: arrayUnion(otherUserId)
            });

            await updateDoc(otherUserRef, {
                followersList: arrayUnion(currentUserId)
            });

            console.log('Follow successful');
        } catch (error) {
            console.error('Error following user: ', error);
        }
    };

    return <button onClick={handleFollow}>Follow</button>;
}

export default FollowUser;
