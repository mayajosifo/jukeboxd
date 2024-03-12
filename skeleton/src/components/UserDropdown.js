import React, { useState } from 'react';
import './UserDropdown.css';

const UserDropdown = ({ title, userList }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="user-list-dropdown">
            <div onClick={toggleDropdown} className="dropdown-button">
                {title} ({userList.length})
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    {userList.length ? (
                        userList.map((user, index) => (
                            <div key={index} className="dropdown-item">
                                {user} {/* Adjust if your user structure is different */}
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