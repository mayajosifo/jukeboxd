
import AddReviewForm from '../components/AddReviewForm';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReviewAlbum.module.css';

function ReviewAlbum() {
    //AddReviewForm();



    return (
        <div>
            <h1>to album review page</h1>
            <AddReviewForm />
        </div>
    )

};

export default ReviewAlbum