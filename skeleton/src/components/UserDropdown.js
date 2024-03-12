import React, { useState } from 'react';

const UserListDropdown = ({ title, userList }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="user-list-dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
                {title} ({userList.length})
            </button>
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

export default UserListDropdown;
