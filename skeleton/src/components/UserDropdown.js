import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './UserDropdown.css';

const UserDropdown = ({ title, userList }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [usersInfo, setUsersInfo] = useState([]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const fetchUsersInfo = async () => {
            const userInfoPromises = userList.map(async userId => {
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    return { ...userSnap.data(), id: userId }; // Add more fields as needed
                } else {
                    return { userName: 'Unknown', id: userId }; // Handle non-existent user
                }
            });
            const users = await Promise.all(userInfoPromises);
            setUsersInfo(users);
        };

        if (userList.length > 0) {
            fetchUsersInfo();
        }
    }, [userList]); // Run this effect whenever the userList changes

    return (
        <div className="user-list-dropdown">
            <div onClick={toggleDropdown} className="dropdown-button">
                {title} ({usersInfo.length})
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    {usersInfo.length ? (
                        usersInfo.map((user, index) => (
                            <div key={index} className="dropdown-item">
                                {user.userName} {/* Display the fetched userName */}
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
export default UserDropdown;
