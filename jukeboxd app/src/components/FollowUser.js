import React from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import { useState } from 'react';

function FollowUser({ currentUserId, otherUserId }) {

    const [followButtonName, setFollowButtonName] = useState("Follow")

    const handleFollow = async () => {
        if (currentUserId === otherUserId) {
            setFollowButtonName('You cannot follow yourself.');
            return; 
        }

        setFollowButtonName("Followed!")

        const currentUserRef = doc(db, "users", currentUserId);
        const otherUserRef = doc(db, "users", otherUserId);

        try {
            await updateDoc(currentUserRef, {
                followingList: arrayUnion(otherUserId)
            });

            await updateDoc(otherUserRef, {
                followersList: arrayUnion(currentUserId)
            });

            //console.log('Follow successful');
        } catch (error) {
            console.error('Error following user: ', error);
        }
    };

    return <button onClick={handleFollow}>{followButtonName}</button>;
}

export default FollowUser;
