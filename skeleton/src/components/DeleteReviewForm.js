import React, { useState } from 'react';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 

function deleteReview(){
    const [userId, setUserId] = useState('');

    const handleDelete = async() => {
       
            const reviewToDelete = await doc(db, 'reviews', userId);
    
            try {
                if (reviewToDelete.exists){
                    await deleteDoc(reviewToDelete);
     
                 }

                console.log('Review deleted successfully');
                setUserId('');

            } catch (error) {
                console.error('Review does not exist:', error); 
            }
    
    };


    return(
        <form onSubmit={handleDelete}>
            <h2>Delete User Review</h2>
            <label>
                Review ID:
                <input type="text" value={id} onChange={e => setUserId(e.target.value)} />
            </label>
            <br />
        </form>
    
    );

}

export default deleteReview;
    

