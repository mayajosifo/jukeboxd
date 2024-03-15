import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './UserDropdown.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const AlbumDropdown = ({ title, albumList }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [usersInfo, setUsersInfo] = useState([]);
    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const fetchUsersInfo = async () => {
            const userInfoPromises = albumList.map(async albumId => {
                const userRef = doc(db, "albums", albumId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    return { ...userSnap.data(), id: albumId }; // Add more fields as needed
                } else {
                    return { userName: 'Unknown', id: albumId }; // Handle non-existent user
                }
            });
            const users = await Promise.all(userInfoPromises);
            setUsersInfo(users);
        };

        if (albumList.length > 0) {
            fetchUsersInfo();
        }
    }, [albumList]); // Run this effect whenever the userList changes

    const handleDropdownItemClick = (albumId) => {
        // redirect to album page when an album name is clicked
        navigate(`/album/${albumId}`); 
    };

    return (
        <div className="user-list-dropdown">
            <div onClick={toggleDropdown} className="dropdown-button">
                {title} ({usersInfo.length})
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    {usersInfo.length ? (
                        usersInfo.map((album, index) => (
                            <div key={index} className="dropdown-item" onClick={() => handleDropdownItemClick(album.id)}>
                                {album.albumName}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-item">No {title.toLowerCase()}.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AlbumDropdown;
